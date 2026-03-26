"use client";

import { useState, useRef, useEffect, FormEvent, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ApiMessage {
  role: "user" | "assistant";
  content: string;
}

// Clean, minimal chat bubble SVG — professional assistant look
function AssistantIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 0 1-4.255-.964L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="12" r="1" fill="currentColor" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <circle cx="15" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

export function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hey there! 👋 I'm your Beyond Intern Assistant. I can help you pick the perfect course track, explain platform benefits, or answer any questions. What can I help you with today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);
    setError(null);

    // Placeholder assistant bubble — filled by streaming chunks
    const assistantId = `ai-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: assistantId, role: "assistant", content: "" },
    ]);

    try {
      const apiMessages: ApiMessage[] = updatedMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!res.ok) {
        // Try to read JSON error body from our API
        let errMsg = `API error: ${res.status}`;
        try {
          const errBody = await res.json();
          if (errBody.error) errMsg = errBody.error;
        } catch {
          // Couldn't parse JSON, use generic message
        }
        throw new Error(errMsg);
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error("No response body");

      let accumulated = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        const current = accumulated;
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: current } : m
          )
        );
      }

      // Flush remaining bytes
      const remaining = decoder.decode();
      if (remaining) {
        accumulated += remaining;
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: accumulated } : m
          )
        );
      }

      // If we got zero content back, show a fallback
      if (!accumulated.trim()) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? { ...m, content: "I couldn't generate a response. Please try again." }
              : m
          )
        );
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(message);
      // Remove the empty placeholder on error
      setMessages((prev) => prev.filter((m) => m.id !== assistantId));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-4 z-50 w-[92vw] sm:w-[380px] max-h-[70vh] rounded-2xl overflow-hidden flex flex-col shadow-[0_8px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl bg-slate-900/80 border border-slate-700/50"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700/40 bg-slate-900/60 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-9 w-9 rounded-xl bg-linear-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <AssistantIcon className="h-5 w-5 text-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 border-2 border-slate-900" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    BI Assistant
                  </p>
                  <p className="text-[10px] text-emerald-400 font-medium">
                    Online
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white hover:bg-white/5 h-8 w-8 rounded-lg"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[200px]">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="h-7 w-7 rounded-lg bg-linear-to-br from-blue-500 to-cyan-400 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                      <AssistantIcon className="h-3.5 w-3.5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-linear-to-br from-blue-500 to-cyan-500 text-white rounded-br-sm shadow-md shadow-blue-500/20"
                        : "bg-slate-800/60 text-slate-200 rounded-bl-sm border border-slate-700/40"
                    }`}
                  >
                    {msg.content ? (
                      msg.content.split("\n").map((line, i, arr) => (
                        <span key={i}>
                          {line}
                          {i < arr.length - 1 && <br />}
                        </span>
                      ))
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-slate-400">
                        <Sparkles className="h-3 w-3 animate-pulse" />
                        <span className="inline-block w-1.5 h-4 bg-slate-500 animate-pulse rounded-sm" />
                      </span>
                    )}
                  </div>
                  {msg.role === "user" && (
                    <div className="h-7 w-7 rounded-lg bg-slate-800/60 flex items-center justify-center shrink-0 mt-1 border border-slate-700/40">
                      <User className="h-3.5 w-3.5 text-slate-300" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Error banner */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2.5 justify-start"
                >
                  <div className="h-7 w-7 rounded-lg bg-linear-to-br from-rose-500 to-red-500 flex items-center justify-center shrink-0 mt-1">
                    <X className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div className="max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed bg-rose-500/10 text-rose-300 border border-rose-500/20 rounded-bl-sm">
                    Error: Connection lost. Please try again. 🔌
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-slate-700/40 p-3 bg-slate-900/40 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  id="chat-input"
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  className="flex-1 h-10 rounded-xl bg-slate-800/50 border border-slate-700/40 px-4 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition-all disabled:opacity-50"
                />
                <Button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  size="icon"
                  className="h-10 w-10 rounded-xl bg-linear-to-br from-blue-500 to-cyan-500 text-white hover:opacity-90 disabled:opacity-30 shadow-lg shadow-blue-500/20 transition-all"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Bubble */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30 cursor-pointer"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        {!isOpen && (
          <motion.div
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-2xl border-2 border-blue-400"
          />
        )}
      </motion.button>
    </>
  );
}