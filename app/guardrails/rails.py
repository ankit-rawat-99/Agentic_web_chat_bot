import logfire
from langchain_openai import ChatOpenAI
from app.guardrails.classifier import should_block
from nemoguardrails import RailsConfig, LLMRails

from app.config import settings
from app.guardrails.colang_rules import COLANG_CONTENT, YAML_CONTENT


_rails: LLMRails | None = None


def initialize_rails() -> None:
    """
    Build the NeMo LLMRails singleton at app startup.
    Uses gpt-4.1-nano for fast intent classification at the gate —
    the heavier gpt-4.1-mini is reserved for the RAG pipeline.
    """
    global _rails

    guard_llm = ChatOpenAI(
        api_key=settings.OPENAI_API_KEY,
        model="gpt-4.1-nano",
        temperature=0
    )


    config = RailsConfig.from_content(
        colang_content=COLANG_CONTENT,
        yaml_content=YAML_CONTENT
    )

    _rails = LLMRails(config, llm=guard_llm)
    logfire.info("🛡️ NeMo Guardrails initialised (gpt-4.1-nano)).")
    
    

def guard(message: str) -> tuple[bool, str | None, str]:
    if _rails is None:
        logfire.warning("⚠️ Guardrails not initialised.")
        return False, None, "pass"

    with logfire.span("🛡️ Guardrails Check"):

        result = _rails.generate(
            messages=[
                {
                    "role": "user",
                    "content": message
                }
            ]
        )

        logfire.info(f"Rails Output: {result}")

        content = (
            result.get("content", "").strip()
            if isinstance(result, dict)
            else str(result).strip()
        )

        blocked, response, action = should_block(message, content)

        if action == "block":
            logfire.info(f"🛡️ Guardrails blocked: {message}")
            return True, response, "blocked"

        if action == "handle":
            logfire.info(f"🛡️ Guardrails handled: {message}")
            return True, response, "handled"

        logfire.info("✅ Guardrails passed.")
        return False, None, "pass"