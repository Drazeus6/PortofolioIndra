'use client';

import React, { useState } from 'react';
import { EXPERIENCES, ExperienceItem } from '@/lib/data';
import { useViewMode } from '@/context/ViewModeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, ExternalLink, FileText, Award, X, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export function TimelineSection() {
  const { viewMode } = useViewMode();
  const isDev = viewMode === 'developer';
  const [selectedExp, setSelectedExp] = useState<ExperienceItem | null>(null);

  return (
    <section
      className={`py-20 md:py-28 border-y transition-colors duration-500 ${
        isDev ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant={isDev ? 'emerald' : 'blue'}>Jejak Karir &amp; Riset</Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-3 tracking-tight">
            Pengalaman <span className={isDev ? 'text-emerald-400 font-mono' : 'text-blue-700'}>Peradilan &amp; Riset</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-3 max-w-xl mx-auto font-light">
            Klik kartu di bawah untuk membuka detail sertifikat peradilan atau publikasi ilmiah.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="relative border-l-2 border-slate-700/40 ml-4 md:ml-8 space-y-12">
          {EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => setSelectedExp(exp)}
              className="relative pl-8 md:pl-12 cursor-pointer group"
            >
              {/* Timeline Dot */}
              <div
                className={`absolute w-5 h-5 rounded-full -left-[11px] top-6 border-4 shadow-lg group-hover:scale-125 transition-transform duration-300 ${
                  isDev ? 'bg-slate-950 border-emerald-500' : 'bg-white border-blue-600'
                }`}
              />

              {/* Card Container */}
              <div
                className={`p-6 md:p-8 rounded-2xl border transition-all duration-300 shadow-md ${
                  isDev
                    ? 'bg-slate-950/80 border-slate-800 hover:border-emerald-500/60 shadow-emerald-950/20'
                    : 'bg-white border-slate-200 hover:border-blue-500 shadow-blue-50'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-400 bg-slate-800/40 px-3 py-1 rounded-full border border-slate-700/40">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    {exp.period}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {exp.location}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-extrabold group-hover:text-blue-500 transition-colors">
                  {exp.title}
                </h3>
                <h4 className={`text-sm font-semibold mb-4 ${isDev ? 'text-emerald-400' : 'text-blue-700'}`}>
                  {exp.role}
                </h4>

                <p
                  className={`text-sm leading-relaxed mb-6 ${
                    isDev ? 'text-slate-300 font-mono text-xs md:text-sm' : 'text-slate-600 font-light'
                  }`}
                >
                  {isDev ? exp.description.developer : exp.description.legal}
                </p>

                {/* Tags & Action Notice */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800/40">
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${
                          isDev
                            ? 'bg-slate-800 text-slate-300 border border-slate-700'
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs text-blue-400 font-semibold group-hover:underline flex items-center gap-1">
                    Detail &amp; Dokumen <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Popup for Details */}
      <AnimatePresence>
        {selectedExp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 text-white relative shadow-2xl"
            >
              <button
                onClick={() => setSelectedExp(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-blue-600/30 border border-blue-500/50 text-blue-400">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedExp.title}</h3>
                  <p className="text-xs text-emerald-400 font-mono">{selectedExp.role}</p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-light my-6">
                <div>
                  <strong className="text-white block mb-1">Deskripsi Posisi &amp; Tugas:</strong>
                  <p>{selectedExp.description.legal}</p>
                </div>

                {selectedExp.abstract && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <strong className="text-amber-400 block text-xs font-mono uppercase mb-1">Abstrak Riset:</strong>
                    <p className="text-xs text-slate-300 italic">{selectedExp.abstract}</p>
                  </div>
                )}

                {selectedExp.certificateImg && (
                  <div>
                    <strong className="text-white block mb-2">Pratinjau Sertifikat Peradilan:</strong>
                    <img
                      src={selectedExp.certificateImg}
                      alt={selectedExp.title}
                      className="w-full max-h-[350px] object-contain rounded-xl border border-slate-700 shadow-md bg-black"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                {selectedExp.journalPdfUrl && (
                  <a
                    href={selectedExp.journalPdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors"
                  >
                    <FileText className="w-4 h-4" /> Buka Naskah Jurnal PDF
                  </a>
                )}
                <button
                  onClick={() => setSelectedExp(null)}
                  className="px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-xs font-semibold"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
