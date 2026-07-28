from typing import Literal

OFF_TOPIC_KEYWORDS = [
    "website ai assistant",
    "unrelated topics",
    "can't help with unrelated topics",
]

JAILBREAK_KEYWORDS = [
    "follow my safety guidelines",
    "answer questions related to this website",
    "i'm here to answer questions related to this website",
]

DIRECT_REPLY_KEYWORDS = [
    "hello! i'm your website ai assistant",
    "feel free to ask me anything about this website",
    "i can answer questions about this website",
    "help users navigate the website",
    "goodbye! thanks for visiting",
]


def normalize_text(text: str) -> str:
    return " ".join(text.strip().lower().split())


def contains_any(normalized_text: str, keywords: list[str]) -> bool:
    return any(keyword in normalized_text for keyword in keywords)


def should_block(user_message: str, rails_response: str) -> tuple[bool, str | None, Literal["block", "handle", "pass"]]:
    if not rails_response:
        return False, None, "pass"

    normalized_response = normalize_text(rails_response)

    if contains_any(normalized_response, OFF_TOPIC_KEYWORDS):
        return True, rails_response, "block"

    if contains_any(normalized_response, JAILBREAK_KEYWORDS):
        return True, rails_response, "block"

    if contains_any(normalized_response, DIRECT_REPLY_KEYWORDS):
        return True, rails_response, "handle"

    return False, None, "pass"