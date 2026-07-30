'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useViewMode } from '@/context/ViewModeContext';
import { Code2, Scale, Sparkles } from 'lucide-react';

export function ModeSwitcher() {
  const { viewMode, toggleViewMode } = useViewMode();
  const isDev = viewMode === 'developer';

  return (
    <div className="relative inline-flex items-center">
      <button
        onClick={toggleViewMode}
        className={`relative flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-500 shadow-md ${
          isDev
            ? 'bg-slate-900 border-emerald-500/50 text-emerald-400 shadow-emerald-950/40'
            : 'bg-white border-blue-200 text-blue-900 shadow-blue-100'
        }`}
        aria-label="Toggle View Mode"
      >
        {/* Animated Background Indicator */}
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className={`absolute inset-0 rounded-full ${
            isDev
              ? 'bg-gradient-to-r from-emerald-950/80 via-slate-900 to-cyan-950/80 border border-emerald-500/30'
              : 'bg-gradient-to-r from-blue-50 via-indigo-50 to-white border border-blue-300/50'
          }`}
        />

        <span className="relative z-10 flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wide">
          {isDev ? (
            <>
              <Code2 className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="font-mono text-emerald-400">Developer / Tech View</span>
            </>
          ) : (
            <>
              <Scale className="w-4 h-4 text-blue-700" />
              <span className="text-blue-900">Legal / Executive View</span>
            </>
          )}
        </span>

        <span className="relative z-10 ml-1 p-1 rounded-full bg-slate-800/40 dark:bg-slate-700/50">
          <Sparkles className={`w-3.5 h-3.5 ${isDev ? 'text-emerald-300' : 'text-blue-600'}`} />
        </span>
      </button>
    </div>
  );
}
