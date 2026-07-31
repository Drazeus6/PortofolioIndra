'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Bot, Send, User, Sparkles, RefreshCw, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShimmerSkeleton } from '@/components/ui/ShimmerSkeleton';

import { useLanguage } from '@/context/LanguageContext';
import { UI_TRANSLATIONS } from '@/lib/i18n';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const WELCOME_MESSAGES = {
  id: 'Halo! Saya **Indra AI Assistant** — didukung Groq Llama 3.3 (70B). Tanya mengenai kualifikasi hukum, riset peradilan, keahlian Fullstack Web/Database, atau riwayat magang Indra Mulyana, S.H.',
  en: 'Hello! I am **Indra AI Assistant** — powered by Groq Llama 3.3 (70B). Ask about legal qualifications, judicial research, Fullstack Web/Database skills, or internship history of Indra Mulyana, S.H.',
};

const SUGGESTED_PROMPTS = {
  id: [
    'Latar belakang & IPK Indra Mulyana?',
    'Jurnal Deepfake AI & UU ITE 2024?',
    'Magang Pengadilan Negeri & Agama?',
    'Keahlian Fullstack Web & Database?',
    'Aplikasi web yang sudah dibuat?',
  ],
  en: [
    'Indra Mulyana background & GPA?',
    'Deepfake AI & ITE Law 2024 research?',
    'District & Religious Court internship?',
    'Fullstack Web & Database skills?',
    'Web applications built?',
  ],
};

function genId() {
  return Math.random().toString(36).slice(2, 10);
}

// Render **bold** markdown inline
function renderContent(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
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
  const { language } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    { id: 'welcome', role: 'assistant', content: WELCOME_MESSAGES[language] },
  ]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update welcome message when language toggles if it's the only message
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === 'welcome') {
        return [{ id: 'welcome', role: 'assistant', content: WELCOME_MESSAGES[language] }];
      }
      return prev;
    });
  }, [language]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isStreaming]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isStreaming) return;
    setError(null);

    const userMsg: Message = { id: genId(), role: 'user', content: text };
    const assistantId = genId();
    const assistantMsg: Message = { id: assistantId, role: 'assistant', content: '' };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setIsStreaming(true);

    // Build history for API (last 10 messages max)
    const history = [...messages, userMsg].slice(-10).map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      abortRef.current = new AbortController();
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
        throw new Error(err.error || `HTTP ${res.status}`);
      }

      const contentType = res.headers.get('content-type') || '';

      // --- Streaming response (streamText toDataStreamResponse) ---
      if (contentType.includes('text/plain') || contentType.includes('octet-stream') || contentType.includes('x-ndjson')) {
        const reader = res.body!.getReader();
        const decoder = new TextDecoder();
        let accumulated = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });

          // AI SDK data stream format: lines like `0:"token"\n`
          const lines = chunk.split('\n');
          for (const line of lines) {
            if (line.startsWith('0:')) {
              try {
                const token = JSON.parse(line.slice(2));
                accumulated += token;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId ? { ...m, content: accumulated } : m
                  )
                );
              } catch {}
            }
          }
        }

        // Fallback: if nothing was parsed from stream format, use raw text
        if (accumulated === '') {
          const text = await res.text().catch(() => '');
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, content: text || 'Tidak ada respons.' } : m
            )
          );
        }
      } else {
        // --- JSON fallback response ---
        const data = await res.json();
        const reply = data.reply || data.text || data.content || 'Maaf, tidak ada respons.';
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: reply } : m))
        );
      }
    } catch (err: any) {
      if (err?.name === 'AbortError') return;
      const errMsg = err?.message || 'Gagal menghubungi AI. Coba lagi.';
      setError(errMsg);
      setMessages((prev) => prev.filter((m) => m.id !== assistantId));
    } finally {
      setIsStreaming(false);
    }
  }, [messages, isStreaming]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const text = input;
    setInput('');
    sendMessage(text);
  };

  const resetChat = () => {
    abortRef.current?.abort();
    setMessages([{ id: 'welcome', role: 'assistant', content: WELCOME_MESSAGES[language] }]);
    setInput('');
    setError(null);
    setIsStreaming(false);
  };

  return (
    <div className="w-full rounded-md bg-dark-surface border border-dark-border shadow-2xl overflow-hidden flex flex-col h-[420px] sm:h-[480px] lg:h-[560px] font-mono">
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
              <span className="text-[9px] bg-amber-950 border border-amber-800 text-amber-300 px-1.5 py-0.5 rounded-sm uppercase tracking-wider font-bold flex items-center gap-1">
                <Zap className="w-2.5 h-2.5" /> Groq AI
              </span>
            </h3>
            <p className={`text-[10px] ${isStreaming ? 'text-amber-400 animate-pulse' : 'text-blue-400'}`}>
              {isStreaming ? UI_TRANSLATIONS.playground.chatStreaming[language] : UI_TRANSLATIONS.playground.chatIdle[language]}
            </p>
          </div>
        </div>
        <button
          onClick={resetChat}
          className="p-1.5 rounded-sm bg-dark-card hover:bg-dark-border text-slate-400 hover:text-white transition-colors"
          title="Reset Chat"
          aria-label="Reset percakapan AI"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Messages */}
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
                className={`max-w-[85%] p-3 rounded-md text-xs leading-relaxed font-mono whitespace-pre-wrap break-words ${
                  m.role === 'user'
                    ? 'bg-blue-600 text-white border border border-blue-400'
                    : 'bg-dark-card border border-dark-border text-slate-200'
                }`}
              >
                {m.content === '' && m.role === 'assistant' ? (
                  <div className="space-y-1.5 py-1 w-48">
                    <ShimmerSkeleton className="h-3 w-full" />
                    <ShimmerSkeleton className="h-3 w-3/4" />
                  </div>
                ) : m.role === 'assistant' ? (
                  renderContent(m.content)
                ) : (
                  m.content
                )}
              </div>
              {m.role === 'user' && (
                <div className="w-7 h-7 rounded-sm bg-dark-border flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Streaming bounce indicator */}
        {isStreaming && messages[messages.length - 1]?.content === '' && (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-sm bg-blue-950 border border-blue-800 flex items-center justify-center shrink-0">
              <Bot className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="bg-dark-card border border-dark-border rounded-md px-3 py-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0ms]" />
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-xs text-red-400 font-mono bg-red-950/60 border border-red-800 rounded-sm px-3 py-2">
            ⚠ {error}
          </div>
        )}
      </div>

      {/* Suggested Prompts */}
      <div className="px-3 py-2 bg-dark-base border-t border-dark-border flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
        {SUGGESTED_PROMPTS[language].map((p, idx) => (
          <button
            key={idx}
            onClick={() => { setInput(''); sendMessage(p); }}
            disabled={isStreaming}
            aria-label={`Kirim pertanyaan: ${p}`}
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
          id="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={UI_TRANSLATIONS.playground.chatPlaceholder[language]}
          disabled={isStreaming}
          aria-label="Ketik pertanyaan untuk Indra AI Assistant"
          autoComplete="off"
          className="flex-1 bg-dark-card border border-dark-border rounded-sm px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-mono placeholder:text-slate-500 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={isStreaming || !input.trim()}
          aria-label="Kirim pesan ke AI"
          className="p-2 rounded-sm bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 transition-colors"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
