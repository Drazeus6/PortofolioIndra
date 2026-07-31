'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useViewMode } from '@/context/ViewModeContext';
import { Globe } from 'lucide-react';

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  const { viewMode } = useViewMode();
  const isDev = viewMode === 'developer';

  return (
    <button
      onClick={toggleLanguage}
      className={`px-2.5 py-1.5 rounded-sm border font-mono text-[11px] font-bold uppercase transition-all flex items-center gap-1.5 min-h-[38px] ${
        isDev
          ? 'bg-dark-card border-dark-border text-blue-300 hover:border-blue-500/80 hover:bg-blue-950/40'
          : 'bg-dark-card border-amber-900/60 text-amber-300 hover:border-amber-400/80 hover:bg-amber-950/40'
      }`}
      aria-label={`Switch language. Current: ${language.toUpperCase()}`}
      title="Ganti Bahasa / Switch Language"
    >
      <Globe className="w-3.5 h-3.5" />
      <span className={language === 'id' ? 'text-white font-extrabold' : 'text-slate-500'}>ID</span>
      <span className="text-slate-600">/</span>
      <span className={language === 'en' ? 'text-white font-extrabold' : 'text-slate-500'}>EN</span>
    </button>
  );
}
