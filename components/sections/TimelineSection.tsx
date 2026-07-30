'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { EXPERIENCES, ExperienceItem } from '@/lib/data';
import { useViewMode } from '@/context/ViewModeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, ExternalLink, FileText, Award, X, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { InteractiveGlowBackground } from '@/components/ui/InteractiveGlowBackground';

export function TimelineSection() {
  const { viewMode } = useViewMode();
  const isDev = viewMode === 'developer';
  const [selectedExp, setSelectedExp] = useState<ExperienceItem | null>(null);

  return (
    <InteractiveGlowBackground className="py-16 md:py-24 border-y border-dark-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant={isDev ? 'blue' : 'amber'}>Jejak Karir &amp; Riset</Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-3 tracking-tight font-sans">
            Pengalaman <span className={`font-mono ${isDev ? 'text-blue-400' : 'text-amber-400'}`}>Peradilan &amp; Riset</span>
          </h2>
          <p className="text-slate-400 text-xs md:text-sm mt-3 max-w-xl mx-auto font-mono">
            Staggered timeline: Klik kartu di bawah untuk membuka pratinjau sertifikat peradilan atau publikasi jurnal ilmiah.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="relative border-l border-dark-border ml-4 md:ml-8 space-y-12">
          {EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => setSelectedExp(exp)}
              className="relative pl-8 md:pl-12 cursor-pointer group"
            >
              {/* Timeline Dot */}
              <div
                className={`absolute w-4 h-4 rounded-sm -left-[9px] top-6 border shadow-md group-hover:scale-125 transition-transform duration-300 ${
                  isDev ? 'bg-blue-950 border-blue-400' : 'bg-amber-950 border-amber-400'
                }`}
              />

              {/* Card Container with Sharp Corners & Subtle Hover Glow */}
              <motion.div
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.2 }}
                className={`p-6 md:p-8 rounded-md border transition-all duration-300 shadow-xl ${
                  isDev
                    ? 'bg-dark-surface border-dark-border hover:border-blue-500/60 hover:shadow-[0_0_20px_rgba(0,102,255,0.15)]'
                    : 'bg-dark-surface border-dark-border hover:border-amber-500/60 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3 font-mono">
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 bg-dark-card px-2.5 py-1 rounded-sm border border-dark-border">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    {exp.period}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" /> {exp.location}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold font-sans text-white group-hover:text-blue-400 transition-colors">
                  {exp.title}
                </h3>
                <h4 className={`text-xs font-mono font-semibold mb-4 ${isDev ? 'text-blue-400' : 'text-amber-400'}`}>
                  {exp.role}
                </h4>

                <p
                  className={`text-xs md:text-sm leading-relaxed mb-6 ${
                    isDev ? 'text-slate-300 font-mono' : 'text-slate-300 font-sans font-light'
                  }`}
                >
                  {isDev ? exp.description.developer : exp.description.legal}
                </p>

                {/* Tags & Action Notice */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-dark-border">
                  <div className="flex flex-wrap gap-2 font-mono">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm bg-dark-card text-slate-300 border border-dark-border"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-mono text-blue-400 font-bold group-hover:underline flex items-center gap-1">
                    Detail Dokumen <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
        {selectedExp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-dark-surface border border-dark-border rounded-md max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 text-white relative shadow-2xl font-mono"
            >
              <button
                onClick={() => setSelectedExp(null)}
                className="absolute top-6 right-6 p-2 rounded-sm bg-dark-card border border-dark-border hover:bg-dark-border text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-sm bg-blue-950/80 border border-blue-800 text-blue-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-sans">{selectedExp.title}</h3>
                  <p className="text-xs text-amber-400">{selectedExp.role}</p>
                </div>
              </div>

              <div className="space-y-4 text-xs md:text-sm text-slate-300 leading-relaxed font-sans font-light my-6">
                <div>
                  <strong className="text-white block font-mono mb-1 text-xs uppercase text-blue-400">Deskripsi Tugas &amp; Prosedur:</strong>
                  <p>{selectedExp.description.legal}</p>
                </div>

                {selectedExp.abstract && (
                  <div className="p-4 rounded-sm bg-dark-base border border-dark-border font-mono text-xs">
                    <strong className="text-amber-400 block uppercase mb-1">Abstrak Jurnal:</strong>
                    <p className="text-slate-300 italic">{selectedExp.abstract}</p>
                  </div>
                )}

                {selectedExp.certificateImg && (
                  <div>
                    <strong className="text-white block font-mono text-xs uppercase mb-2">Dokumen Sertifikat:</strong>
                    <Image
                      src={selectedExp.certificateImg}
                      alt={selectedExp.title}
                      width={600}
                      height={400}
                      className="w-full max-h-[350px] object-contain rounded-sm border border-dark-border bg-black"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-dark-border">
                {selectedExp.journalPdfUrl && (
                  <a
                    href={selectedExp.journalPdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-blue-600 hover:bg-blue-500 border border-blue-400 text-white font-mono text-xs font-bold transition-colors"
                  >
                    <FileText className="w-4 h-4" /> Buka PDF Jurnal
                  </a>
                )}
                <button
                  onClick={() => setSelectedExp(null)}
                  className="px-4 py-2 rounded-sm bg-dark-card border border-dark-border hover:bg-dark-border text-xs font-mono"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </InteractiveGlowBackground>
  );
}
