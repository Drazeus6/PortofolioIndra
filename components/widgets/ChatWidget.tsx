'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { Bot, Send, User, Sparkles, RefreshCw, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SUGGESTED_PROMPTS = [
  'Latar belakang & IPK Indra Mulyana?',
  'Jurnal Deepfake AI & UU ITE 2024?',
  'Magang Pengadilan Negeri & Agama?',
  'Keahlian Fullstack Web & Database?',
  'Aplikasi web yang sudah dibuat?',
];

// Render **bold** markdown inline
function renderContent(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} className="text-white font-bold">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export function ChatWidget() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');

  // useChat v4 API: uses sendMessage, status, messages, setMessages, error
  const { messages, sendMessage, setMessages, status, error } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content:
          'Halo! Saya **Indra AI Assistant** — didukung Google Gemini AI. Tanya mengenai kualifikasi hukum, riset peradilan, keahlian Fullstack Web/Database, atau riwayat magang Indra Mulyana, S.H.',
        parts: [{ type: 'text', text: 'Halo! Saya **Indra AI Assistant** — didukung Google Gemini AI. Tanya mengenai kualifikasi hukum, riset peradilan, keahlian Fullstack Web/Database, atau riwayat magang Indra Mulyana, S.H.' }],
      },
    ],
  });

  const isLoading = status === 'streaming' || status === 'submitted';

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = (text: string) => {
    if (!text.trim() || isLoading) return;
    setInput('');
    sendMessage({ role: 'user', content: text });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  const resetChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: 'Halo! Saya **Indra AI Assistant** — didukung Google Gemini AI. Tanya mengenai kualifikasi hukum, riset peradilan, keahlian Fullstack Web/Database, atau riwayat magang Indra Mulyana, S.H.',
        parts: [{ type: 'text', text: 'Halo! Saya **Indra AI Assistant** — didukung Google Gemini AI.' }],
      },
    ]);
    setInput('');
  };

  return (
    <div className="w-full rounded-md bg-dark-surface border border-dark-border shadow-2xl overflow-hidden flex flex-col h-[560px] font-mono">
      {/* Header */}
      <div className="p-3 bg-dark-base border-b border-dark-border flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-sm bg-blue-950/80 border border-blue-800 flex items-center justify-center text-blue-400">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-xs text-white flex items-center gap-1.5">
              Indra AI Assistant
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span className="text-[9px] bg-blue-950 border border-blue-800 text-blue-300 px-1.5 py-0.5 rounded-sm uppercase tracking-wider font-bold flex items-center gap-1">
                <Zap className="w-2.5 h-2.5" /> Gemini AI
              </span>
            </h3>
            <p className={`text-[10px] ${isLoading ? 'text-amber-400 animate-pulse' : 'text-blue-400'}`}>
              {isLoading ? '● Generating response...' : '● Gemini 1.5 Flash — Real Streaming'}
            </p>
          </div>
        </div>
        <button
          onClick={resetChat}
          className="p-1.5 rounded-sm bg-dark-card hover:bg-dark-border text-slate-400 hover:text-white transition-colors"
          title="Reset Chat"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs">
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="w-7 h-7 rounded-sm bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}
              <div
                className={`max-w-[85%] p-3 rounded-md text-xs leading-relaxed font-mono whitespace-pre-wrap ${
                  m.role === 'user'
                    ? 'bg-blue-600 text-white border border-blue-400'
                    : 'bg-dark-card border border-dark-border text-slate-200'
                }`}
              >
                {m.role === 'assistant' ? renderContent(m.content) : m.content}
              </div>
              {m.role === 'user' && (
                <div className="w-7 h-7 rounded-sm bg-dark-border flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Streaming Bounce Indicator */}
        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-blue-400 font-mono">
            <div className="w-7 h-7 rounded-sm bg-blue-950 border border-blue-800 flex items-center justify-center shrink-0">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="bg-dark-card border border-dark-border rounded-md px-3 py-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0ms]" />
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="text-xs text-red-400 font-mono bg-red-950/60 border border-red-800 rounded-sm px-3 py-2">
            ⚠ {error.message || 'Gagal menghubungi AI. Coba lagi.'}
          </div>
        )}
      </div>

      {/* Suggested Prompts */}
      <div className="px-3 py-2 bg-dark-base border-t border-dark-border flex items-center gap-1.5 overflow-x-auto scrollbar-none font-mono shrink-0">
        {SUGGESTED_PROMPTS.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p)}
            disabled={isLoading}
            className="text-[10px] whitespace-nowrap px-2.5 py-1 rounded-sm bg-dark-card hover:bg-blue-600/30 border border-dark-border hover:border-blue-500 text-slate-300 transition-colors disabled:opacity-50"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-2.5 bg-dark-base border-t border-dark-border flex items-center gap-2 shrink-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tanya Indra AI tentang profil, keahlian, atau proyek..."
          disabled={isLoading}
          className="flex-1 bg-dark-card border border-dark-border rounded-sm px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-mono placeholder:text-slate-500 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="p-2 rounded-sm bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 transition-colors"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
