import { useState, useRef, useEffect } from "react";
import type { CardData } from "@/types/card";
import GenieResults from "./GenieResults";

declare global {
  interface Window {
    puter?: {
      ai: {
        chat: (
          prompt: string,
          options?: { model?: string }
        ) => Promise<string>;
      };
    };
  }
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface GenieChatProps {
  allCards: CardData[];
}

function buildCardsSummary(cards: CardData[]): string {
  return cards
    .map((c) => {
      const fee = c.charges.find((ch) =>
        ch.label.toLowerCase().includes("annual")
      );
      const rate = c.rewardProgram?.effectiveCashbackPercent ?? 0;
      return `- ${c.name} (${c.bank}): Annual fee ₹${fee?.amount ?? 0}, reward rate ${rate}%, ${c.tagline}`;
    })
    .join("\n");
}

export default function GenieChat({ allCards }: GenieChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Card Genie. Tell me about your spending habits, monthly expenses, and what you look for in a card — I'll recommend the best cards for you.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendedIds, setRecommendedIds] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const cardsSummary = buildCardsSummary(allCards);
  const cardIdList = allCards.map((c) => c.id).join(", ");

  const systemPrompt = `You are Card Genie, an AI assistant that recommends Indian credit/debit/prepaid cards based on user spending patterns.

Available cards:
${cardsSummary}

Card IDs: ${cardIdList}

Instructions:
- Ask about monthly spending in categories: dining, travel, groceries, fuel, online shopping, entertainment.
- Ask about priorities: cashback, travel perks, lounge access, low fees, rewards points.
- Recommend 2-5 cards based on their profile.
- At the end of your final recommendation, include a line: CARDS: card-id-1,card-id-2,card-id-3
- Keep responses concise and helpful.
- Use INR amounts. Do not recommend cards not in the list above.`;

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const history = [...messages, userMsg]
        .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
        .join("\n");

      const fullPrompt = `${systemPrompt}\n\nConversation:\n${history}\n\nAssistant:`;

      const puter = window.puter;
      if (!puter?.ai?.chat) {
        throw new Error("Puter.js AI not loaded. Please refresh the page and try again.");
      }

      const response = await puter.ai.chat(fullPrompt);
      const content =
        typeof response === "string" ? response : String(response);

      // Extract card IDs from response
      const cardsMatch = content.match(/CARDS:\s*([\w-,]+)/);
      if (cardsMatch && cardsMatch[1]) {
        const ids = cardsMatch[1]
          .split(",")
          .map((s) => s.trim())
          .filter((id) => allCards.some((c) => c.id === id));
        setRecommendedIds(ids);
      }

      // Clean up the response (remove CARDS: line for display)
      const cleanContent = content.replace(/\n?CARDS:.*$/m, "").trim();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: cleanContent },
      ]);
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: errorMsg },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="flex flex-col h-[600px] max-w-3xl mx-auto">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 rounded-t-2xl bg-bg-secondary border border-border-default border-b-0">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-gold text-bg-primary rounded-br-md"
                  : "bg-bg-tertiary text-text-primary rounded-bl-md"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="px-4 py-3 rounded-2xl bg-bg-tertiary text-text-secondary text-sm rounded-bl-md">
              <span className="inline-flex gap-1">
                <span className="w-2 h-2 rounded-full bg-text-tertiary animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-text-tertiary animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-text-tertiary animate-bounce" style={{ animationDelay: "300ms" }} />
              </span>
            </div>
          </div>
        )}

        {recommendedIds.length > 0 && (
          <GenieResults cardIds={recommendedIds} allCards={allCards} />
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2 p-4 rounded-b-2xl bg-bg-secondary border border-border-default border-t-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tell me about your spending habits..."
          disabled={loading}
          className="flex-1 px-4 py-3 rounded-xl bg-bg-tertiary border border-border-default text-text-primary text-sm placeholder:text-text-tertiary focus:outline-none focus:border-gold/50 disabled:opacity-50"
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="px-5 py-3 rounded-xl bg-gold text-bg-primary font-semibold text-sm hover:bg-gold-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>
    </div>
  );
}
