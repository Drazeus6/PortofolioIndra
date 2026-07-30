'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ModeSwitcher } from '@/components/widgets/ModeSwitcher';
import { useViewMode } from '@/context/ViewModeContext';
import { PERSONAL_DATA } from '@/lib/data';
import { Menu, X, Scale, Code2, Home, Terminal, Briefcase, Award, Layers, Mail } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { viewMode } = useViewMode();
  const isDev = viewMode === 'developer';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Beranda', icon: Home },
    { href: '/playground', label: 'Playground AI & Flow', icon: Terminal },
    { href: '/experience', label: 'Pengalaman', icon: Briefcase },
    { href: '/skills', label: 'Keahlian Matrix', icon: Layers },
    { href: '/certifications', label: 'Terminal Sertifikat', icon: Award },
    { href: '/contact', label: 'Kontak', icon: Mail },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md border-b ${
        isDev
          ? 'bg-slate-950/85 border-slate-800 text-slate-100'
          : 'bg-white/85 border-slate-200 text-slate-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className={`w-11 h-11 rounded-full overflow-hidden border-2 transition-transform group-hover:scale-105 shadow-md flex items-center justify-center ${
                isDev ? 'border-emerald-500/80 bg-slate-900' : 'border-blue-700 bg-blue-50'
              }`}
            >
              <img
                src={PERSONAL_DATA.avatar}
                alt={PERSONAL_DATA.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <span className="font-extrabold text-base block tracking-tight group-hover:text-blue-500 transition-colors">
                {PERSONAL_DATA.name}
              </span>
              <span className={`text-[11px] font-medium block ${isDev ? 'text-emerald-400 font-mono' : 'text-blue-700'}`}>
                {isDev ? '<LegalTech.Dev />' : 'S1 Hukum Pidana Islam'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-800/20 dark:bg-slate-900/60 p-1.5 rounded-full border border-slate-700/30">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    active
                      ? isDev
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/40 font-mono'
                        : 'bg-blue-700 text-white shadow-md'
                      : isDev
                      ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                      : 'text-slate-600 hover:text-blue-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Mode Switcher & Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <ModeSwitcher />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-slate-700/40 hover:bg-slate-800/40 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-b px-4 pt-3 pb-6 space-y-2 ${
            isDev ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          {navLinks.map((link) => {
            const active = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  active
                    ? isDev
                      ? 'bg-emerald-600 text-white font-mono'
                      : 'bg-blue-700 text-white'
                    : isDev
                    ? 'text-slate-300 hover:bg-slate-900'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
