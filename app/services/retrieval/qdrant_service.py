import logfire
from qdrant_client import QdrantClient

from app.config import settings
from app.services.retrieval.embedding import embed_query


client = QdrantClient(
    url=settings.QDRANT_URL,
    api_key=settings.QDRANT_API_KEY,
)


def search_enterprise_knowledge(query: str, limit: int = 5):

    with logfire.span(
        "Searching Qdrant",
        query=query,
        limit=limit,
    ):

        try:

            query_vector = embed_query(query)

            logfire.info("Query embedding generated.")

            response = client.query_points(
                collection_name=settings.QDRANT_COLLECTION,
                query=query_vector,
                limit=limit,
                with_payload=True,
            )

            logfire.info(
                f"Retrieved {len(response.points)} documents."
            )

            results = []

            for point in response.points:

                results.append(
                    {
                        "content": point.payload.get("text", ""),
                        "page": point.payload.get("page"),
                        "title": point.payload.get("title"),
                        "section": point.payload.get("section"),
                        "source": point.payload.get("source"),
                        "score": round(point.score, 4),
                    }
                )

            return results

        except Exception:
            logfire.exception("Qdrant search failed.")
            return []