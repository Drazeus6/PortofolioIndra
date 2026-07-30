'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useViewMode } from '@/context/ViewModeContext';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, Terminal, Network, MessageSquareCode } from 'lucide-react';

const ChatWidget = dynamic(
  () => import('@/components/widgets/ChatWidget').then((mod) => mod.ChatWidget),
  { ssr: false, loading: () => <div className="h-[580px] bg-slate-900 rounded-2xl animate-pulse flex items-center justify-center text-slate-400">Loading AI Assistant Widget...</div> }
);

const DecisionTree = dynamic(
  () => import('@/components/widgets/DecisionTree').then((mod) => mod.DecisionTree),
  { ssr: false, loading: () => <div className="h-[550px] bg-slate-900 rounded-2xl animate-pulse flex items-center justify-center text-slate-400">Loading Decision Tree Graph...</div> }
);

export default function PlaygroundPage() {
  const { viewMode } = useViewMode();
  const isDev = viewMode === 'developer';

  return (
    <div
      className={`min-h-screen pt-28 pb-20 transition-colors duration-500 ${
        isDev ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant={isDev ? 'emerald' : 'blue'}>Interactive Playground</Badge>
          <h1 className="text-3xl md:text-5xl font-extrabold mt-3 tracking-tight">
            AI Assistant &amp; <span className={isDev ? 'text-emerald-400 font-mono' : 'text-blue-700'}>Legal Flow Simulator</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base mt-3 max-w-2xl mx-auto font-light">
            Eksplorasi interaktif dua modul utama: Tanya jawab cerdas berbasis profil Indra Mulyana dan simulasi grafik pohon keputusan sanksi Ta&apos;zir pada kekosongan hukum AI.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* AI Chat Widget (5 Columns) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-300">
              <MessageSquareCode className="w-4 h-4 text-blue-400" />
              <span>AI Chat Assistant (Streaming LLM)</span>
            </div>
            <ChatWidget />
          </div>

          {/* Decision Tree Flow Simulator (7 Columns) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-300">
              <Network className="w-4 h-4 text-emerald-400" />
              <span>Decision Tree Simulator (React Flow)</span>
            </div>
            <DecisionTree />
          </div>
        </div>
      </div>
    </div>
  );
}
