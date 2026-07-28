from app.agents.state import AgentState
from app.gateway import get_langchain_llm
import logfire

# Portkey-backed LLM: fallback + cache + retry — same .invoke() interface as ChatGroq
llm = get_langchain_llm(feature="planner")

def planner_node(state: AgentState):
    """
    The Planner determines if a search is needed based on the ENTIRE conversation.
    """
    # Get the conversation history (excluding the latest message)
    history = ""
    for msg in state["messages"][:-1]:
        role = "User" if msg["role"] == "user" else "Assistant"
        history += f"{role}: {msg['content']}\n"
    
    user_message = state["messages"][-1]["content"] if state["messages"] else ""
        
    prompt = f"""
    You are the planner for an AI Course Website assistant.

    Your job is to decide whether the user's question requires searching the website knowledge base.

    CONVERSATION HISTORY:
    {history}

    LATEST MESSAGE:
    "{user_message}"

    Rules:

    Return ONLY the word CONVERSATIONAL if the user is:

    - greeting
    - thanking
    - saying goodbye
    - asking about previous conversation
    - asking something that can be answered ONLY from chat history

    Examples:
    Hi
    Hello
    Thanks
    Bye
    What was my previous question?
    What is my name?

    ------------------------------------------------------------

    For EVERYTHING related to the website, return a search query.

    Examples:

    User:
    What courses do you have?

    Output:
    available courses

    ---------------------

    User:
    Tell me about Agentic AI Bootcamp

    Output:
    Agentic AI Bootcamp

    ---------------------

    User:
    What is the duration of Agentic AI Bootcamp?

    Output:
    Agentic AI Bootcamp duration

    ---------------------

    User:
    How much does Agentic AI Bootcamp cost?

    Output:
    Agentic AI Bootcamp price

    ---------------------

    User:
    Who is the instructor?

    Output:
    Agentic AI Bootcamp instructor

    ---------------------

    User:
    Suggest a beginner AI course

    Output:
    beginner AI courses

    ------------------------------------------------------------

    Never return CONVERSATIONAL for questions about:

    - courses
    - bootcamps
    - pricing
    - fees
    - duration
    - instructor
    - curriculum
    - syllabus
    - roadmap
    - certification
    - rating
    - students
    - enrollment
    - AI
    - RAG
    - CrewAI
    - AutoGen
    - LangGraph
    - LLMs

    Output ONLY:

    - CONVERSATIONAL

    OR

    - a short search query
    """
    with logfire.span("🧠 Planner Decision"):
        decision = llm.invoke(prompt).content.strip()
        logfire.info(f"Intent identified: {decision}")
    
    if decision == "CONVERSATIONAL":
        return {
            "current_query": "CONVERSATIONAL",
            "status": "Handling conversationally (using memory)...",
            "plan": ["Intent: Conversational/Memory", "Retrieval: Skipped"]
        }
    
    return {
        "current_query": decision,
        "status": f"Technical research needed. Searching for: {decision}",
        "plan": ["Intent: Technical", f"Search Term: {decision}"]
    }
