import logfire

from app.agents.state import AgentState
from app.services.retrieval.qdrant_service import search_enterprise_knowledge
from app.services.retrieval.ranking_service import rerank_documents


def retrieve_node(state: AgentState):

    query = state["current_query"]

    with logfire.span("🔍 Knowledge Retrieval"):

        logfire.info(f"Searching Qdrant for: {query}")

        raw_results = search_enterprise_knowledge(
            query,
            limit=15
        )

        logfire.info(f"Retrieved {len(raw_results)} candidates")

        # ---------- DEBUG ----------
        for i, doc in enumerate(raw_results):
            logfire.info(
                f"""
==============================
Document {i+1}

Title   : {doc.get('title')}
Page    : {doc.get('page')}
Section : {doc.get('section')}
Score   : {doc.get('score')}

Content:
{doc.get('content')[:300]}
==============================
"""
            )

        # --------------------------

        doc_contents = [
            doc["content"]
            for doc in raw_results
        ]

        reranked_contents = rerank_documents(
            query,
            doc_contents,
            top_n=5,
        )

        context = ""

        for content in reranked_contents:
            for doc in raw_results:

                if doc["content"] == content:

                    context += f"""

Title:
{doc.get("title")}

Section:
{doc.get("section")}

Page:
{doc.get("page")}

Content:
{doc.get("content")}

--------------------------------------------------

"""

        return {
            "documents": raw_results,
            "context": context,
            "status": "Knowledge retrieved",
            "plan": state["plan"] + ["Retrieved Context"],
        }