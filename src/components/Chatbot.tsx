/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: "Welcome to **Koth Challenges**! I am your AI Styling Concierge, crafted by **iWebNext**. Ask me about our fine Oklahoma wool outerwear, custom-pigment sweatshirts, size guides (XS-XXL), or how to style coordinates for your next event under the plains sky!",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userText = inputMessage.trim();
    setInputMessage('');
    setErrorStatus(null);

    // Save user message
    const userMsg: ChatMessage = { sender: 'user', text: userText, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          history: messages.map(m => ({
            role: m.sender === 'user' ? 'user' : 'model',
            text: m.text
          }))
        })
      });

      if (!response.ok) {
        throw new Error("Stylist API encountered an error. Please try again.");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.message || data.error);
      }

      // Save AI message
      const aiMsg: ChatMessage = {
        sender: 'ai',
        text: data.response,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      console.error("Chatbot request failure:", err);
      setErrorStatus(err.message || "Failed to contact styling server.");
    } finally {
      setIsLoading(false);
    }
  };

  // Simple Markdown formatting parser helper for rendering in lists
  const formatText = (text: string) => {
    // Escape simple strong markdown '**text**' to bold tags and list bullet points
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      let processed = line;
      
      // Bold tags regex replace
      processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      processed = processed.replace(/\*(.*?)\*/g, '<em>$1</em>');

      // Check if bullet point
      const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('* ');
      if (isBullet) {
        const cleaned = processed.trim().replace(/^[\-\*]\s+/, '');
        return (
          <li key={idx} className="ml-4 list-disc text-sm py-0.5 leading-relaxed" 
              dangerouslySetInnerHTML={{ __html: cleaned }} />
        );
      }
      
      return (
        <p key={idx} className="text-sm leading-relaxed mb-1.5 min-h-[1rem]" 
           dangerouslySetInnerHTML={{ __html: processed }} />
      );
    });
  };

  return (
    <>
      {/* Floating Circular Trigger Badge */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-300 border border-zinc-800 dark:border-zinc-200 cursor-pointer"
          id="chatbot-trigger-btn"
          whileHover={{ y: -3 }}
        >
          {isOpen ? <X size={24} /> : (
            <div className="relative">
              <MessageSquare size={24} />
              <span className="absolute -top-2 -right-2 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
          )}
        </motion.button>
      </div>

      {/* Floating Chat Draw Dialogue */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: 'spring', damping: 20, stiffness: 150 }}
            className="fixed bottom-24 right-6 w-[360px] sm:w-[410px] h-[550px] max-h-[calc(100vh-140px)] rounded-2xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl z-50 overflow-hidden flex flex-col"
            id="chatbot-viewport"
          >
            {/* Design header */}
            <div className="bg-zinc-950 text-white px-5 py-4 flex items-center justify-between border-b border-zinc-800">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded bg-white/10 flex items-center justify-center">
                  <Sparkles size={16} className="text-amber-400 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold tracking-widest uppercase">KOTH Stylist</h4>
                  <p className="text-[10px] text-zinc-400">AI Fashion Assistant • iWebNext</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                id="close-chat-btn"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-zinc-900/50">
              {messages.map((msg, idx) => {
                const isUser = msg.sender === 'user';
                return (
                  <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm text-sm ${
                      isUser
                        ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 rounded-tr-none'
                        : 'bg-white dark:bg-zinc-850 text-zinc-800 dark:text-zinc-100 border border-zinc-100 dark:border-zinc-800 rounded-tl-none'
                    }`}>
                      {isUser ? <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p> : (
                        <div>
                          {formatText(msg.text)}
                        </div>
                      )}
                      <span className={`text-[9px] block mt-1.5 text-right opacity-50`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Typing loader state */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-zinc-850 border border-zinc-100 dark:border-zinc-800 rounded-2xl rounded-tl-none px-4 py-3 text-sm">
                    <div className="flex items-center space-x-1.5 py-1">
                      <div className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-bounce" style={{ animationDelay: '0s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Error messages box */}
              {errorStatus && (
                <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40 rounded-xl p-3 text-rose-600 dark:text-rose-400 text-xs flex gap-2">
                  <AlertCircle size={16} className="shrink-0" />
                  <div>
                    <span className="font-semibold block mb-0.5">Styling Agent error</span>
                    {errorStatus}
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input Message Form */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex gap-2">
              <input
                type="text"
                placeholder="Ask about materials, sizing, styling..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={isLoading}
                id="chatbot-input-field"
                className="flex-1 py-2.5 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:border-zinc-950 dark:focus:border-white focus:outline-none text-xs sm:text-sm bg-gray-50 dark:bg-zinc-850 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="p-2.5 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:opacity-90 active:scale-95 disabled:opacity-40 transition-all flex items-center justify-center shrink-0 cursor-pointer"
                id="submit-chat-btn"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
