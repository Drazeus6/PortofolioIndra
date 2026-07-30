'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ModeSwitcher } from '@/components/widgets/ModeSwitcher';
import { useViewMode } from '@/context/ViewModeContext';
import { PERSONAL_DATA } from '@/lib/data';
import { Menu, X, Home, Terminal, Briefcase, Award, Layers, Mail, Shield, Globe } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { viewMode } = useViewMode();
  const isDev = viewMode === 'developer';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Hero', icon: Home },
    { href: '/projects', label: 'Projects', icon: Globe },
    { href: '/playground', label: 'Playground', icon: Terminal },
    { href: '/experience', label: 'Experience', icon: Briefcase },
    { href: '/skills', label: 'Skills', icon: Layers },
    { href: '/certifications', label: 'Certifications', icon: Award },
    { href: '/contact', label: 'Contact', icon: Mail },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-base/95 backdrop-blur-md border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div
              className={`w-9 h-9 rounded-md overflow-hidden border transition-transform group-hover:scale-105 flex items-center justify-center ${
                isDev ? 'border-blue-500/80 bg-dark-card' : 'border-amber-500/80 bg-dark-card'
              }`}
            >
              <Image
                src={PERSONAL_DATA.avatar}
                alt={PERSONAL_DATA.name}
                width={36}
                height={36}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="font-mono font-bold text-sm text-white tracking-tight flex items-center gap-1.5">
                {PERSONAL_DATA.name}
                <Shield className={`w-3.5 h-3.5 ${isDev ? 'text-blue-400' : 'text-amber-400'}`} />
              </span>
              <span className={`text-[10px] font-mono block ${isDev ? 'text-blue-400' : 'text-amber-400'}`}>
                {isDev ? 'Agentic Logic' : 'Legal Precision'}
              </span>
            </div>
          </Link>

          {/* Desktop Links (Breakpoint at xl to avoid crowding) */}
          <nav className="hidden xl:flex items-center gap-1 bg-dark-surface p-1 rounded-md border border-dark-border font-mono">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[11px] font-semibold uppercase tracking-wider transition-all whitespace-nowrap border ${
                    active
                      ? isDev
                        ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-950/40'
                        : 'bg-amber-600 text-slate-950 border-amber-400 shadow-md shadow-amber-950/40 font-bold'
                      : 'border-transparent text-slate-400 hover:text-white hover:bg-dark-card hover:border-dark-border'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Mode Switcher & Mobile Menu Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <ModeSwitcher />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-md border border-dark-border bg-dark-card text-slate-300 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-dark-border bg-dark-surface px-4 pt-3 pb-6 space-y-2 font-mono text-xs">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-sm uppercase font-bold tracking-wider transition-all border ${
                  active
                    ? isDev
                      ? 'bg-blue-600 text-white border-blue-400 shadow-md'
                      : 'bg-amber-600 text-slate-950 border-amber-400 shadow-md'
                    : 'border-dark-border bg-dark-card text-slate-300 hover:text-white hover:border-slate-500'
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
