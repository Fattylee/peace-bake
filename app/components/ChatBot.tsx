"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, MessageCircle } from "lucide-react";
import { CHATBOT_FAQS, ChatMessage } from "../data/chatbotFaqs";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial",
      text: "Hello! 👋 Welcome to Peace Bake Bakery. I'm here to help! What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
      suggestions: [
        "About us",
        "Products",
        "Opening hours",
        "Contact",
        "Delivery",
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const timestamp = new Date();
    const messageId = `user-${timestamp.getTime()}`;

    // Add user message
    const userMessage: ChatMessage = {
      id: messageId,
      text,
      sender: "user",
      timestamp,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Smart matching with keyword search
    const userInput = text.toLowerCase().trim();
    let faq = CHATBOT_FAQS.find(
      (item) =>
        item.question.toLowerCase() === userInput || item.id === userInput
    );

    // If no exact match, try keyword matching
    if (!faq) {
      faq = CHATBOT_FAQS.find((item) => {
        const keywords = (item as any).keywords || [];
        return keywords.some(
          (keyword: string) =>
            userInput.includes(keyword) || keyword.includes(userInput)
        );
      });
    }

    // If still no match, try partial word matching
    if (!faq) {
      const words = userInput.split(" ");
      faq = CHATBOT_FAQS.find((item) => {
        const keywords = (item as any).keywords || [];
        return words.some((word) =>
          keywords.some(
            (keyword: string) =>
              keyword.includes(word) ||
              (word.length > 3 && keyword.includes(word))
          )
        );
      });
    }

    // Add bot response with slight delay
    setTimeout(() => {
      let botText = "";
      let suggestions: string[] | undefined;

      if (faq) {
        botText = faq.answer;
        suggestions = faq.suggestions;
      } else {
        // Smarter fallback with context-based suggestions
        botText =
          "I'm not sure about that. 🤔 Here are some topics I can help with:";
        suggestions = [
          "About us",
          "Products",
          "Opening hours",
          "Contact",
          "Delivery",
        ];
      }

      const botMessage: ChatMessage = {
        id: `bot-${new Date().getTime()}`,
        text: botText,
        sender: "bot",
        timestamp: new Date(),
        suggestions,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 300);
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-96 max-w-[calc(100vw-2rem)] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl flex flex-col h-[500px] z-40 transition-all">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div>
              <h3 className="font-bold">Peace Bake Bot</h3>
              <p className="text-sm text-amber-100">Always here to help</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-amber-600 p-1 rounded transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-slate-900">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-amber-600 text-white rounded-br-none"
                      : "bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-100 rounded-bl-none shadow-sm"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}

            {/* Suggestions */}
            {messages[messages.length - 1]?.suggestions && (
              <div className="flex flex-wrap gap-2">
                {messages[messages.length - 1].suggestions!.map(
                  (suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSendMessage(suggestion)}
                      className="text-xs px-3 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded-full hover:bg-amber-200 dark:hover:bg-amber-800 transition"
                    >
                      {suggestion}
                    </button>
                  )
                )}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t dark:border-slate-700 p-4 flex gap-2 bg-white dark:bg-slate-800">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage(input)}
              placeholder="Type a message..."
              className="flex-1 border dark:border-slate-600 rounded-lg px-3 py-2 text-sm dark:bg-slate-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
            <button
              onClick={() => handleSendMessage(input)}
              className="bg-amber-600 hover:bg-amber-700 text-white p-2 rounded-lg transition"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-amber-600 hover:bg-amber-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all z-40"
      >
        <MessageCircle size={24} />
      </button>
    </>
  );
}
