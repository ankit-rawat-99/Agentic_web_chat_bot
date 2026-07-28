from app.services.retrieval.qdrant_service import search_enterprise_knowledge

results = search_enterprise_knowledge(
    "Do you provide refunds?"
)

for r in results:
    print("=" * 50)
    print(r["score"])
    print(r["title"])
    print(r["content"])

#uv run python test_search.py
# ==================================================
# 0.94

# FAQ — AgentVerse Academy

# question: Can I get a refund?
# answer: 7-day no-questions refund on any individual course.