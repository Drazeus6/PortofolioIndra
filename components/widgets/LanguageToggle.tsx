'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useViewMode } from '@/context/ViewModeContext';

interface LanguageToggleProps {
  className?: string;
  isFullWidth?: boolean;
}

export function LanguageToggle({ className = '', isFullWidth = false }: LanguageToggleProps) {
  const { language, toggleLanguage } = useLanguage();
  const { viewMode } = useViewMode();
  const isDev = viewMode === 'developer';

  return (
    <button
      onClick={toggleLanguage}
      className={`px-2.5 py-1.5 rounded-sm border font-mono text-xs font-bold uppercase transition-all flex items-center justify-center gap-1.5 min-h-[40px] cursor-pointer ${
        isFullWidth ? 'w-full py-2.5 text-xs tracking-wider' : 'w-[58px] sm:w-[64px]'
      } ${
        isDev
          ? 'bg-dark-card border-dark-border text-blue-300 hover:border-blue-400 hover:bg-blue-950/40'
          : 'bg-dark-card border-amber-900/60 text-amber-300 hover:border-amber-400 hover:bg-amber-950/40'
      } ${className}`}
      aria-label={`Switch language. Current: ${language.toUpperCase()}`}
      title="Ganti Bahasa / Switch Language"
    >
      <span className={language === 'id' ? 'text-white font-extrabold underline decoration-blue-400 decoration-2' : 'text-slate-500 font-normal'}>ID</span>
      <span className="text-slate-600 font-normal">|</span>
      <span className={language === 'en' ? 'text-white font-extrabold underline decoration-amber-400 decoration-2' : 'text-slate-500 font-normal'}>EN</span>
    </button>
  );
}
