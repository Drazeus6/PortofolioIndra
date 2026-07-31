'use client';

import React from 'react';
import Link from 'next/link';
import { PERSONAL_DATA } from '@/lib/data';
import { useViewMode } from '@/context/ViewModeContext';
import { Mail, Phone, Shield } from 'lucide-react';

import { useLanguage } from '@/context/LanguageContext';

export function Footer() {
  const { viewMode } = useViewMode();
  const { language } = useLanguage();
  const isDev = viewMode === 'developer';

  return (
    <footer className="py-12 bg-dark-base border-t border-dark-border text-slate-400 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <h3 className="font-bold text-base text-white mb-2 flex items-center gap-2">
              {PERSONAL_DATA.name}
              {isDev ? (
                <span className="text-[10px] text-blue-400 bg-blue-950 px-2 py-0.5 rounded-sm border border-blue-800">
                  Electric Blue Agentic
                </span>
              ) : (
                <span className="text-[10px] text-amber-400 bg-amber-950 px-2 py-0.5 rounded-sm border border-amber-800">
                  Legal Seal &amp; Precision
                </span>
              )}
            </h3>
            <p className="text-xs leading-relaxed max-w-md text-slate-400 mb-4 font-sans font-light">
              {isDev ? PERSONAL_DATA.title[language].developer : PERSONAL_DATA.title[language].legal}
            </p>
            <p className="text-[11px] text-slate-500">
              UIN Sunan Gunung Djati Bandung • IPK {PERSONAL_DATA.gpa}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-xs text-white mb-3 uppercase tracking-wider">Fast Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Hero &amp; Mode Switcher
                </Link>
              </li>
              <li>
                <Link href="/playground" className="hover:text-white transition-colors">
                  Playground AI &amp; Flow Graph
                </Link>
              </li>
              <li>
                <Link href="/experience" className="hover:text-white transition-colors">
                  Interactive Experience
                </Link>
              </li>
              <li>
                <Link href="/skills" className="hover:text-white transition-colors">
                  Skill Matrix (AI/Legal)
                </Link>
              </li>
              <li>
                <Link href="/certifications" className="hover:text-white transition-colors">
                  CLI Certifications Console
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs text-white mb-3 uppercase tracking-wider">Direct Contact</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <a href={`mailto:${PERSONAL_DATA.email}`} className="hover:text-white transition-colors">
                  {PERSONAL_DATA.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <a
                  href={`https://wa.me/62${PERSONAL_DATA.whatsapp.slice(1)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {PERSONAL_DATA.formattedWhatsapp}
                </a>
              </li>
              <li className="text-[11px] text-slate-500 pt-2">{PERSONAL_DATA.location}</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-dark-border flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {PERSONAL_DATA.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
