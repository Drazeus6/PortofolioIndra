'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useViewMode } from '@/context/ViewModeContext';
import { PERSONAL_DATA } from '@/lib/data';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';
import { Scale, Terminal, ArrowRight, Download, Award, Sparkles, MapPin } from 'lucide-react';

export function HeroSection() {
  const { viewMode } = useViewMode();
  const isDev = viewMode === 'developer';

  return (
    <section
      className={`relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden transition-colors duration-500 min-h-[92vh] flex items-center ${
        isDev ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Background Decorative Blur Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-20 transition-all duration-700 ${
            isDev ? 'bg-emerald-500' : 'bg-blue-600'
          }`}
        />
        <div
          className={`absolute bottom-0 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20 transition-all duration-700 ${
            isDev ? 'bg-cyan-500' : 'bg-indigo-600'
          }`}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Text Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <Badge variant={isDev ? 'emerald' : 'blue'}>
                <span className="flex h-2 w-2 relative mr-1.5">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      isDev ? 'bg-emerald-400' : 'bg-blue-600'
                    }`}
                  />
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${
                      isDev ? 'bg-emerald-500' : 'bg-blue-700'
                    }`}
                  />
                </span>
                {isDev ? 'Legal-Tech Systems Analyst' : 'S1 Hukum Pidana Islam'}
              </Badge>
              <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> {PERSONAL_DATA.location}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              Halo, Saya <br />
              <span
                className={`bg-clip-text text-transparent bg-gradient-to-r ${
                  isDev ? 'from-emerald-400 via-cyan-400 to-teal-300' : 'from-blue-800 via-blue-600 to-indigo-600'
                }`}
              >
                {PERSONAL_DATA.name}
              </span>
            </h1>

            <p
              className={`text-base md:text-lg mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 ${
                isDev ? 'text-slate-300 font-mono text-xs md:text-sm' : 'text-slate-600 font-light'
              }`}
            >
              {isDev ? PERSONAL_DATA.bios.developer : PERSONAL_DATA.bios.legal}
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link href="/playground">
                <Button variant={isDev ? 'dev' : 'primary'} size="lg" className="gap-2">
                  <Terminal className="w-4 h-4" />
                  Buka Playground AI &amp; Simulator
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              <Link href="/experience">
                <Button variant="outline" size="lg" className="gap-2">
                  <Scale className="w-4 h-4" />
                  Lihat Pengalaman &amp; Riset Jurnal
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Column Profile Card & Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-md">
              {/* Glassmorphic Profile Box */}
              <div
                className={`p-8 rounded-3xl border shadow-2xl relative overflow-hidden transition-all duration-500 ${
                  isDev
                    ? 'bg-slate-900/90 border-slate-800 backdrop-blur-xl shadow-emerald-950/20'
                    : 'bg-white border-blue-100 shadow-blue-100'
                }`}
              >
                {/* Decorative Pattern Background */}
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                  <Sparkles className="w-32 h-32" />
                </div>

                <div className="flex items-center gap-5 mb-6">
                  <div
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 shadow-lg ${
                      isDev ? 'border-emerald-500/80 bg-slate-800' : 'border-blue-700 bg-blue-50'
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
                    <h3 className="font-extrabold text-xl">{PERSONAL_DATA.name}</h3>
                    <p className={`text-xs font-semibold ${isDev ? 'text-emerald-400 font-mono' : 'text-blue-700'}`}>
                      {PERSONAL_DATA.university}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1">{PERSONAL_DATA.degree} ({PERSONAL_DATA.gradYear})</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t pt-6 border-slate-700/40">
                  <div className="p-3 rounded-2xl bg-slate-800/40 dark:bg-slate-800/80 border border-slate-700/40 text-center">
                    <span className="text-xs text-slate-400 uppercase font-bold block mb-1">IPK Kelulusan</span>
                    <span className="text-xl font-extrabold text-emerald-400">{PERSONAL_DATA.gpa}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-800/40 dark:bg-slate-800/80 border border-slate-700/40 text-center">
                    <span className="text-xs text-slate-400 uppercase font-bold block mb-1">Jurnal Terpublikasi</span>
                    <span className="text-xl font-extrabold text-blue-400">2 Jurnal Justisi</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-700/40 text-xs text-slate-400 flex items-center justify-between">
                  <span>Status: Available for Hiring</span>
                  <a
                    href="/CV_ATS_INDRA MULYANA Baru.pdf"
                    target="_blank"
                    className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-semibold"
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
