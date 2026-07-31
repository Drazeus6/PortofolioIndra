'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useViewMode } from '@/context/ViewModeContext';
import { Badge } from '@/components/ui/Badge';
import { Network, MessageSquareCode } from 'lucide-react';
import { motion } from 'framer-motion';

import { useLanguage } from '@/context/LanguageContext';
import { UI_TRANSLATIONS } from '@/lib/i18n';

const ChatWidget = dynamic(
  () => import('@/components/widgets/ChatWidget').then((mod) => mod.ChatWidget),
  {
    ssr: false,
    loading: () => (
      <div className="h-[420px] sm:h-[480px] lg:h-[560px] bg-dark-surface border border-dark-border rounded-md animate-pulse flex items-center justify-center text-slate-400 font-mono text-xs">
        Loading AI Assistant Widget...
      </div>
    ),
  }
);

const DecisionTree = dynamic(
  () => import('@/components/widgets/DecisionTree').then((mod) => mod.DecisionTree),
  {
    ssr: false,
    loading: () => (
      <div className="h-[360px] sm:h-[440px] lg:h-[520px] bg-dark-surface border border-dark-border rounded-md animate-pulse flex items-center justify-center text-slate-400 font-mono text-xs">
        Loading Decision Tree Graph...
      </div>
    ),
  }
);

export default function PlaygroundPage() {
  const { viewMode } = useViewMode();
  const { language } = useLanguage();
  const isDev = viewMode === 'developer';

  return (
    <div
      className={`min-h-screen pt-28 pb-20 text-white transition-colors duration-500 ${
        isDev ? 'bg-flowchart-grid' : 'bg-flowchart-grid-legal'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge variant={isDev ? 'blue' : 'amber'}>{UI_TRANSLATIONS.playground.badge[language]}</Badge>
          <h1 className="text-3xl md:text-5xl font-extrabold mt-3 tracking-tight font-sans">
            {UI_TRANSLATIONS.playground.titlePrefix[language]}{' '}
            <span className={`font-mono ${isDev ? 'text-blue-400' : 'text-amber-400'}`}>
              {UI_TRANSLATIONS.playground.titleSuffix[language]}
            </span>
          </h1>
          <p className="text-slate-400 text-xs md:text-sm mt-3 max-w-2xl mx-auto font-mono">
            {UI_TRANSLATIONS.playground.sub[language]}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* AI Chat Widget (5 Columns) */}
          <div className="lg:col-span-5 space-y-3 font-mono">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
              <MessageSquareCode className={`w-4 h-4 ${isDev ? 'text-blue-400' : 'text-amber-400'}`} />
              <span>{UI_TRANSLATIONS.playground.chatSectionHeader[language]}</span>
            </div>
            <ChatWidget />
          </div>

          {/* Legal & Deepfake AI Flow Simulator (7 Columns) */}
          <div className="lg:col-span-7 space-y-3 font-mono">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
              <Network className={`w-4 h-4 ${isDev ? 'text-blue-400' : 'text-amber-400'}`} />
              <span>{UI_TRANSLATIONS.playground.flowSectionHeader[language]}</span>
            </div>
            <DecisionTree />
          </div>
        </div>
      </div>
    </div>
  );
}
