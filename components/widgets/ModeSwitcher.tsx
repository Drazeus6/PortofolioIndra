'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useViewMode } from '@/context/ViewModeContext';
import { Code2, ShieldCheck } from 'lucide-react';

export function ModeSwitcher() {
  const { viewMode, toggleViewMode } = useViewMode();
  const isDev = viewMode === 'developer';

  return (
    <div className="relative inline-flex items-center font-mono">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={toggleViewMode}
        className={`relative flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3.5 py-1.5 rounded-md border text-xs font-bold transition-all duration-500 shadow-md ${
          isDev
            ? 'bg-dark-card border-blue-500/60 text-blue-400 shadow-blue-950/40'
            : 'bg-dark-card border-amber-500/80 text-amber-400 shadow-amber-950/40'
        }`}
        aria-label={`Mode Switcher: Currently ${isDev ? 'Developer (Electric Blue)' : 'Legal Seal (Amber/Gold)'}`}
      >
        <AnimatePresence mode="wait">
          {isDev ? (
            <motion.span
              key="dev-mode"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1.5 text-blue-400 uppercase tracking-wider text-[11px]"
            >
              <Code2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>Developer</span>
            </motion.span>
          ) : (
            <motion.span
              key="legal-mode"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1.5 text-amber-400 uppercase tracking-wider text-[11px]"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Legal</span>
            </motion.span>
          )}
        </AnimatePresence>

        <span
          className={`px-1.5 py-0.5 rounded-sm text-[10px] uppercase font-extrabold ${
            isDev ? 'bg-blue-950 text-blue-300 border border-blue-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
          }`}
        >
          {isDev ? 'DEV' : 'LEGAL'}
        </span>
      </motion.button>
    </div>
  );
}
