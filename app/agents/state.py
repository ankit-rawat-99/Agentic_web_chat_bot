from typing import TypedDict, List, Annotated
import operator


class AgentState(TypedDict):

    # Conversation history
    messages: Annotated[List[dict], operator.add]

    # Current user query
    current_query: str

    # Retrieved documents from Qdrant
    documents: List[dict]

    # Context passed to the LLM
    context: str

    plan: List[str]
    
    # Current workflow status
    status: str

    # Final answer
    final_answer: str

    # Error message (optional)
    error: str
 
