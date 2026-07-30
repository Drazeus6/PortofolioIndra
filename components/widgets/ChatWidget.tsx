'use client';

import React, { useState } from 'react';
import { Bot, Send, User, Sparkles, RefreshCw, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTED_PROMPTS = [
  'Latar belakang & IPK Indra Mulyana?',
  'Jurnal Deepfake AI & UU ITE 2024?',
  'Magang Pengadilan Negeri & Agama?',
  'Keahlian Hukum & MOS Word Certified?',
];

export function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        'Halo! Saya **Indra AI Assistant**. Tanya mengenai kualifikasi hukum, riset peradilan, keahlian IT, atau riwayat magang Indra Mulyana, S.H.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (queryText: string) => {
    if (!queryText.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: queryText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      if (!response.ok) {
        throw new Error('Gagal menghubungi AI Assistant.');
      }

      const data = await response.json();
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || 'Maaf, terjadi kendala teknis.',
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Maaf, sistem AI sedang offline. Anda dapat menghubungi Indra Mulyana langsung via WhatsApp: 0813 9570 1071.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full rounded-md bg-dark-surface border border-dark-border shadow-2xl overflow-hidden flex flex-col h-[560px] font-mono">
      {/* Header */}
      <div className="p-3 bg-dark-base border-b border-dark-border flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-sm bg-blue-950/80 border border-blue-800 flex items-center justify-center text-blue-400">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-xs text-white flex items-center gap-1">
              Indra AI Assistant
              <Sparkles className="w-3 h-3 text-amber-400" />
            </h3>
            <p className="text-[10px] text-blue-400">● Streaming LLM Agentic</p>
          </div>
        </div>
        <button
          onClick={() =>
            setMessages([
              {
                id: 'welcome',
                role: 'assistant',
                content:
                  'Halo! Saya **Indra AI Assistant**. Tanya mengenai kualifikasi hukum, riset peradilan, keahlian IT, atau riwayat magang Indra Mulyana, S.H.',
              },
            ])
          }
          className="p-1.5 rounded-sm bg-dark-card hover:bg-dark-border text-slate-400 hover:text-white transition-colors"
          title="Reset Chat"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs md:text-sm">
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="w-7 h-7 rounded-sm bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400 shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}
              <div
                className={`max-w-[85%] p-3 rounded-md text-xs leading-relaxed font-mono ${
                  m.role === 'user'
                    ? 'bg-blue-600 text-white border border-blue-400'
                    : 'bg-dark-card border border-dark-border text-slate-200'
                }`}
              >
                {m.content}
              </div>
              {m.role === 'user' && (
                <div className="w-7 h-7 rounded-sm bg-dark-border flex items-center justify-center text-slate-300 shrink-0">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <div className="flex items-center gap-2 text-xs text-blue-400 font-mono animate-pulse">
            <Bot className="w-3.5 h-3.5" />
            <span>Indra AI streaming response...</span>
          </div>
        )}
      </div>

      {/* Suggested Prompts */}
      <div className="px-3 py-2 bg-dark-base border-t border-dark-border flex items-center gap-1.5 overflow-x-auto scrollbar-none font-mono">
        {SUGGESTED_PROMPTS.map((p, idx) => (
          <button
            key={idx}
            onClick={() => sendMessage(p)}
            className="text-[10px] whitespace-nowrap px-2.5 py-1 rounded-sm bg-dark-card hover:bg-blue-600/30 border border-dark-border hover:border-blue-500 text-slate-300 transition-colors"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
        className="p-2.5 bg-dark-base border-t border-dark-border flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type prompt here..."
          className="flex-1 bg-dark-card border border-dark-border rounded-sm px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-mono placeholder:text-slate-500"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="p-2 rounded-sm bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 transition-colors"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
