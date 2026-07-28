import streamlit as st
import requests
import uuid

# ----------------------------
# Configuration
# ----------------------------
API_URL = "http://127.0.0.1:8000/query"

st.set_page_config(
    page_title="Web AI Agent",
    page_icon="🤖",
    layout="wide"
)

st.title("🤖 Web AI Agent")
st.caption("Powered by LangGraph + OpenAI + Qdrant")

# ----------------------------
# Session State
# ----------------------------
if "messages" not in st.session_state:
    st.session_state.messages = []

if "thread_id" not in st.session_state:
    st.session_state.thread_id = str(uuid.uuid4())

# ----------------------------
# Display Chat History
# ----------------------------
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# ----------------------------
# User Input
# ----------------------------
if prompt := st.chat_input("Ask something..."):

    # Show user message
    st.session_state.messages.append(
        {
            "role": "user",
            "content": prompt,
        }
    )

    with st.chat_message("user"):
        st.markdown(prompt)

    # Assistant Response
    with st.chat_message("assistant"):

        with st.spinner("Thinking..."):

            try:

                response = requests.post(
                    API_URL,
                    json={
                        "q": prompt,
                        "thread_id": st.session_state.thread_id,
                    },
                    timeout=120,
                )

                response.raise_for_status()

                data = response.json()

                answer = data.get(
                    "answer",
                    "No response received.",
                )

                st.markdown(answer)

                st.session_state.messages.append(
                    {
                        "role": "assistant",
                        "content": answer,
                    }
                )

            except Exception as e:

                error = f"❌ Error: {e}"

                st.error(error)

                st.session_state.messages.append(
                    {
                        "role": "assistant",
                        "content": error,
                    }
                )