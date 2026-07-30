'use client';

import React from 'react';
import Link from 'next/link';
import { PERSONAL_DATA } from '@/lib/data';
import { useViewMode } from '@/context/ViewModeContext';
import { Scale, Code2, Mail, Phone, Heart } from 'lucide-react';

export function Footer() {
  const { viewMode } = useViewMode();
  const isDev = viewMode === 'developer';

  return (
    <footer
      className={`py-12 border-t transition-colors duration-300 ${
        isDev ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-900 border-slate-800 text-slate-300'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <h3 className="font-extrabold text-lg text-white mb-2 flex items-center gap-2">
              {PERSONAL_DATA.name}
              {isDev ? (
                <span className="text-xs font-mono text-emerald-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                  Developer Mode
                </span>
              ) : (
                <span className="text-xs text-blue-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                  Legal Mode
                </span>
              )}
            </h3>
            <p className="text-xs md:text-sm leading-relaxed max-w-md text-slate-400 mb-4">
              {PERSONAL_DATA.title.legal}
            </p>
            <p className="text-xs text-slate-500 font-mono">
              UIN Sunan Gunung Djati Bandung • IPK {PERSONAL_DATA.gpa}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm text-white mb-3 uppercase tracking-wider">Navigasi Fast Link</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Beranda (Hero &amp; Mode Switcher)
                </Link>
              </li>
              <li>
                <Link href="/playground" className="hover:text-white transition-colors">
                  Playground (AI Chat &amp; Flow Graph)
                </Link>
              </li>
              <li>
                <Link href="/experience" className="hover:text-white transition-colors">
                  Interactive Timeline
                </Link>
              </li>
              <li>
                <Link href="/skills" className="hover:text-white transition-colors">
                  Technical Skill Matrix
                </Link>
              </li>
              <li>
                <Link href="/certifications" className="hover:text-white transition-colors">
                  Terminal View Sertifikat
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm text-white mb-3 uppercase tracking-wider">Kontak Langsung</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <a href={`mailto:${PERSONAL_DATA.email}`} className="hover:text-white transition-colors">
                  {PERSONAL_DATA.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
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

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {PERSONAL_DATA.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with Next.js App Router, Framer Motion &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
