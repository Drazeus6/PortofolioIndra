'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useViewMode } from '@/context/ViewModeContext';
import { PERSONAL_DATA, ACHIEVEMENTS } from '@/lib/data';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';
import { Scale, Terminal, ArrowRight, Download, ShieldCheck, MapPin, Code2, Trophy } from 'lucide-react';

export function HeroSection() {
  const { viewMode } = useViewMode();
  const isDev = viewMode === 'developer';

  return (
    <section
      className={`relative pt-28 pb-20 md:pt-36 md:pb-24 overflow-hidden min-h-[92vh] flex items-center transition-all duration-500 ${
        isDev ? 'bg-flowchart-grid' : 'bg-flowchart-grid-legal'
      }`}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Text Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            <div className="inline-flex flex-wrap items-center gap-2 mb-6">
              <Badge variant={isDev ? 'blue' : 'amber'}>
                <span className="flex h-2 w-2 relative mr-2">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      isDev ? 'bg-blue-400' : 'bg-amber-400'
                    }`}
                  />
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${
                      isDev ? 'bg-blue-500' : 'bg-amber-500'
                    }`}
                  />
                </span>
                {isDev ? 'Agentic AI & Systems Analyst' : 'S1 Hukum Pidana Islam (Cumlaude 3.71)'}
              </Badge>

              <span className="text-xs font-mono text-amber-400 flex items-center gap-1 font-bold">
                <Trophy className="w-3.5 h-3.5 text-amber-400" /> Juara 1 Menulis Surat Nasional
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6 font-sans">
              Halo, Saya <br />
              <span
                className={`bg-clip-text text-transparent bg-gradient-to-r font-mono ${
                  isDev ? 'from-blue-400 via-cyan-400 to-blue-600' : 'from-amber-400 via-amber-300 to-yellow-600'
                }`}
              >
                {PERSONAL_DATA.name}
              </span>
            </h1>

            <p
              className={`text-sm md:text-base mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 ${
                isDev ? 'text-slate-300 font-mono' : 'text-slate-300 font-sans font-light'
              }`}
            >
              {isDev ? PERSONAL_DATA.bios.developer : PERSONAL_DATA.bios.legal}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link href="/playground">
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Button variant={isDev ? 'primary' : 'legal'} size="lg" className="gap-2">
                    <Terminal className="w-4 h-4" />
                    Playground AI &amp; Simulator
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              </Link>

              <Link href="/experience">
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Button variant="outline" size="lg" className="gap-2">
                    <Scale className="w-4 h-4 text-amber-400" />
                    Interactive Timeline &amp; Riset
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>

          {/* Right Column Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-md">
              <div
                className={`p-7 rounded-md border shadow-2xl relative transition-colors duration-500 ${
                  isDev
                    ? 'bg-dark-surface border-blue-500/40 shadow-blue-950/30'
                    : 'bg-dark-surface border-amber-500/50 shadow-amber-950/30'
                }`}
              >
                {/* Stamp Seal Indicator */}
                <div className="absolute top-4 right-4 font-mono text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-sm bg-dark-card border border-dark-border flex items-center gap-1 text-slate-300">
                  {isDev ? (
                    <>
                      <Code2 className="w-3 h-3 text-blue-400" /> AI LOGIC
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-3 h-3 text-amber-400" /> CUMLAUDE SEAL
                    </>
                  )}
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`w-16 h-16 rounded-md overflow-hidden border ${
                      isDev ? 'border-blue-500/80 bg-dark-card' : 'border-amber-500/80 bg-dark-card'
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
                    <h3 className="font-mono font-bold text-lg text-white">{PERSONAL_DATA.name}</h3>
                    <p className={`text-xs font-mono ${isDev ? 'text-blue-400' : 'text-amber-400'}`}>
                      {PERSONAL_DATA.university}
                    </p>
                    <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                      {PERSONAL_DATA.degree} ({PERSONAL_DATA.gradYear})
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 border-t pt-5 border-dark-border font-mono">
                  <div className="p-3 rounded-md bg-dark-card border border-dark-border text-center">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">Predikat IPK</span>
                    <span className={`text-sm md:text-base font-extrabold ${isDev ? 'text-blue-400' : 'text-amber-400'}`}>
                      {PERSONAL_DATA.gpa}
                    </span>
                  </div>
                  <div className="p-3 rounded-md bg-dark-card border border-dark-border text-center">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">Publikasi Riset</span>
                    <span className="text-sm md:text-base font-extrabold text-slate-200">2 Jurnal SINTA 4</span>
                  </div>
                </div>

                {/* Achievements List Pill */}
                <div className="mt-4 pt-4 border-t border-dark-border space-y-2 font-mono text-xs">
                  {ACHIEVEMENTS.map((ach) => (
                    <div key={ach.title} className="flex items-center justify-between text-[11px] bg-dark-card p-2 rounded-sm border border-dark-border">
                      <span className="text-slate-300 font-bold truncate max-w-[210px]">{ach.title}</span>
                      <span className="text-amber-400 font-bold px-1.5 py-0.5 bg-amber-950 border border-amber-800 rounded-sm text-[9px]">{ach.badge}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-dark-border text-xs font-mono text-slate-400 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    Verified Indeed &amp; LinkedIn
                  </span>
                  <a
                    href="/CV-ATS-Indra-Mulyana.pdf"
                    target="_blank"
                    className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-bold hover:underline text-[11px]"
                  >
                    <Download className="w-3.5 h-3.5" /> CV ATS PDF
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
