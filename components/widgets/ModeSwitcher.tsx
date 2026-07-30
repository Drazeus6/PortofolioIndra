'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useViewMode } from '@/context/ViewModeContext';
import { Code2, Scale, Sparkles } from 'lucide-react';

export function ModeSwitcher() {
  const { viewMode, toggleViewMode } = useViewMode();
  const isDev = viewMode === 'developer';

  return (
    <div className="relative inline-flex items-center">
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={toggleViewMode}
        className={`relative flex items-center gap-2.5 px-4 py-2 rounded-full border transition-colors duration-500 shadow-md ${
          isDev
            ? 'bg-slate-900 border-amber-500/60 text-amber-300 shadow-amber-950/30'
            : 'bg-white border-blue-300 text-blue-900 shadow-blue-100'
        }`}
        aria-label={`Toggle view mode: Currently in ${isDev ? 'Developer' : 'Legal'} view`}
      >
        <AnimatePresence mode="wait">
          {isDev ? (
            <motion.span
              key="dev-mode"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wide font-mono text-amber-300"
            >
              <Code2 className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Developer View</span>
            </motion.span>
          ) : (
            <motion.span
              key="legal-mode"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wide text-blue-950"
            >
              <Scale className="w-4 h-4 text-blue-700" />
              <span>Legal / Executive View</span>
            </motion.span>
          )}
        </AnimatePresence>

        <span
          className={`p-1 rounded-full transition-colors ${
            isDev ? 'bg-amber-950/80 text-amber-400' : 'bg-blue-100 text-blue-700'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
        </span>
      </motion.button>
    </div>
  );
}
