import { useState, type FormEvent } from "react";
import { Bot, MessageCircle, SendHorizonal, X } from "lucide-react";

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  text: string;
};

const starterMessages: ChatMessage[] = [
  {
    id: 1,
    role: "assistant",
    text: "Hello! I'm your AI assistant. Ask me about courses, projects, or how to get started.",
  },
];

export function WhatsAppFab() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] =
    useState<ChatMessage[]>(starterMessages);

  // One conversation id per visitor
  const [threadId] = useState(() => crypto.randomUUID());

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const trimmed = input.trim();

    if (!trimmed || loading) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      role: "user",
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/query",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            q: trimmed,
            thread_id: threadId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Backend request failed");
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: Date.now() + 1,
        role: "assistant",
        text:
          data.answer ??
          data.final_answer ??
          "Sorry, I couldn't generate a response.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: "⚠️ Unable to connect to the AI server.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="w-[min(92vw,360px)] overflow-hidden rounded-3xl border border-border/70 bg-background/95 shadow-2xl backdrop-blur">

          <div className="flex items-center justify-between border-b border-border/70 bg-gradient-to-r from-cyan-600 to-violet-600 px-4 py-3 text-white">

            <div className="flex items-center gap-2">
              <div className="rounded-full bg-white/20 p-2">
                <Bot className="h-4 w-4" />
              </div>

              <div>
                <p className="text-sm font-semibold">
                  Agent Assistant
                </p>

                <p className="text-xs text-white/80">
                  Always ready to help
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1.5 hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex h-80 flex-col gap-3 overflow-y-auto bg-muted/20 p-3">

            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
                  message.role === "assistant"
                    ? "self-start bg-white text-black border border-border/20"
                    : "ml-auto bg-primary text-white"
                }`}
              >
                {message.text}
              </div>
            ))}

            {loading && (
              <div className="self-start rounded-2xl border bg-white px-3 py-2 text-sm text-black">
                Typing...
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-border/70 bg-background p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask the agent..."
              disabled={loading}
              className="h-10 flex-1 rounded-full border border-input bg-background px-3 text-sm outline-none focus:border-primary"
            />

            <button
              type="submit"
              disabled={loading}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              <SendHorizonal className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 text-white shadow-lg transition-transform hover:scale-105"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>
    </div>
  );
}