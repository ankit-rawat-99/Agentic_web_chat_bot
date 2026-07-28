import os
import sys
import uuid
import json
import logfire

from qdrant_client import QdrantClient
from qdrant_client.http import models

from app.config import settings
from app.services.retrieval.embedding import embed_texts, get_embedding_dim


logfire.configure(service_name="Web-Chat-Agent-Ingestion")

# Local folder where parsed + chunked JSON metadata is saved (replaces GCS processed bucket)
PROCESSED_DATA_DIR = "processed_data"

# Initialize Qdrant Client
qdrant_client = QdrantClient(
    url=settings.QDRANT_URL,
    api_key=settings.QDRANT_API_KEY,
)


def save_processed_locally(data: dict, source_type: str, filename: str) -> str:
    """Save parsed chunk metadata as JSON in processed_data/<source_type>/."""
    folder = os.path.join(PROCESSED_DATA_DIR, source_type)
    os.makedirs(folder, exist_ok=True)
    dest = os.path.join(folder, f"{filename}.json")
    with open(dest, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    return dest


def process_file(file_path: str):

    with logfire.span("Processing JSON File", file=file_path):

        try:
            # ---------------- Read JSON ----------------
            with logfire.span("Reading JSON"):
                with open(file_path, "r", encoding="utf-8") as f:
                    data = json.load(f)

                logfire.info(
                    f"Successfully loaded JSON: {file_path}"
                )

            chunks = []
            payloads = []

            # ---------------- Extract Text ----------------
            with logfire.span("Extracting Text"):

                if isinstance(data, dict):

                     logfire.info("Detected JSON Object")

                     page = data.get("page", "")
                title = data.get("title", "")

                # Iterate through every key
                for key, value in data.items():

                    # Skip metadata
                    if key in ("page", "title"):
                        continue

                    if isinstance(value, list):

                        for item in value:

                            if not isinstance(item, dict):
                                continue

                            text_parts = []

                            for v in item.values():
                                if isinstance(v, str):
                                    text_parts.append(v)

                            text = "\n".join(text_parts)

                            if not text.strip():
                                continue

                            chunks.append(text)

                            payloads.append(
                                {
                                    "page": page,
                                    "title": title,
                                    "section": key,
                                    "source": file_path,
                                }
                            )
                else:

                    logfire.info("Detected JSON Object")

                    text = (
                        data.get("content")
                        or data.get("answer")
                        or data.get("text")
                        or ""
                    )

                    if text:

                        chunks.append(text)

                        payloads.append(
                            {
                                "source": file_path,
                                "title": data.get("title"),
                                "category": data.get("category"),
                                "url": data.get("url"),
                            }
                        )

                logfire.info(
                    f"Extracted {len(chunks)} text chunks."
                )

            if not chunks:
                logfire.warning(
                    f"No valid chunks found in {file_path}. Skipping."
                )
                return

            # ---------------- Embedding ----------------
            with logfire.span(
                "Generating Embeddings",
                chunks=len(chunks)
            ):

                embeddings = embed_texts(chunks)

                logfire.info(
                    f"Generated {len(embeddings)} embeddings."
                )

            # ---------------- Build Qdrant Points ----------------
            with logfire.span("Preparing Qdrant Points"):

                points = []

                for text, vector, payload in zip(
                    chunks,
                    embeddings,
                    payloads,
                ):

                    payload["text"] = text

                    points.append(
                        models.PointStruct(
                            id=str(uuid.uuid4()),
                            vector=vector,
                            payload=payload,
                        )
                    )

                logfire.info(
                    f"Prepared {len(points)} Qdrant points."
                )

            # ---------------- Upload ----------------
            with logfire.span(
                "Uploading to Qdrant",
                collection=settings.QDRANT_COLLECTION,
            ):

                qdrant_client.upsert(
                    collection_name=settings.QDRANT_COLLECTION,
                    points=points,
                )

                logfire.info(
                    f"Successfully indexed {len(points)} vectors into '{settings.QDRANT_COLLECTION}'."
                )

        except Exception as e:
            logfire.exception(
                "Failed to process JSON file",
                file=file_path,
            )

def process_directory(directory: str):

    with logfire.span("Scanning Knowledge Directory", path=directory):

        files = [
            f for f in os.listdir(directory)
            if f.endswith(".json")
        ]

        logfire.info(f"Found {len(files)} JSON files.")

        for index, filename in enumerate(files, start=1):

            logfire.info(
                f"[{index}/{len(files)}] Processing {filename}"
            )

            process_file(
                os.path.join(directory, filename)
            )

        logfire.info("Knowledge ingestion completed.")

def run_universal_ingestion():

    with logfire.span("Knowledge Base Ingestion"):

        if not qdrant_client.collection_exists(
            settings.QDRANT_COLLECTION
        ):

            logfire.info("Creating new Qdrant collection.")

            qdrant_client.create_collection(
                collection_name=settings.QDRANT_COLLECTION,
                vectors_config=models.VectorParams(
                    size=get_embedding_dim(),
                    distance=models.Distance.COSINE,
                ),
            )

            logfire.info(
                f"Collection '{settings.QDRANT_COLLECTION}' created."
            )

        else:
            logfire.info(
                f"Collection '{settings.QDRANT_COLLECTION}' already exists."
            )

        process_directory("knowledge")

        logfire.info("Entire ingestion pipeline completed successfully.")


if __name__ == "__main__":

    try:
        logfire.info("Starting knowledge ingestion...")

        run_universal_ingestion()

        logfire.info("Knowledge ingestion completed successfully.")

    except Exception:
        logfire.exception("Knowledge ingestion failed.")
        raise