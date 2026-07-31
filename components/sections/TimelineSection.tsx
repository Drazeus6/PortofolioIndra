'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { EXPERIENCES, ExperienceItem, getLocalizedDesc, getLocalizedText } from '@/lib/data';
import { useViewMode } from '@/context/ViewModeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, ExternalLink, FileText, X, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { InteractiveGlowBackground } from '@/components/ui/InteractiveGlowBackground';
import { PhotoLightbox, PhotoGalleryGrid } from '@/components/widgets/PhotoLightbox';

import { useLanguage } from '@/context/LanguageContext';
import { UI_TRANSLATIONS } from '@/lib/i18n';

export function TimelineSection() {
  const { viewMode } = useViewMode();
  const { language } = useLanguage();
  const isDev = viewMode === 'developer';
  const [selectedExp, setSelectedExp] = useState<ExperienceItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const photos = selectedExp?.photos ?? [];

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () =>
    setLightboxIndex((i) => (i === null ? 0 : (i - 1 + photos.length) % photos.length));
  const nextPhoto = () =>
    setLightboxIndex((i) => (i === null ? 0 : (i + 1) % photos.length));

  const closeModal = () => {
    setSelectedExp(null);
    setLightboxIndex(null);
  };

  return (
    <>
      <InteractiveGlowBackground className="py-16 md:py-24 border-y border-dark-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge variant={isDev ? 'blue' : 'amber'}>{UI_TRANSLATIONS.timeline.badge[language]}</Badge>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3 tracking-tight font-sans">
              {UI_TRANSLATIONS.timeline.titlePrefix[language]} <span className={`font-mono ${isDev ? 'text-blue-400' : 'text-amber-400'}`}>{UI_TRANSLATIONS.timeline.titleSuffix[language]}</span>
            </h2>
            <p className="text-slate-400 text-xs md:text-sm mt-3 max-w-xl mx-auto font-mono">
              {UI_TRANSLATIONS.timeline.sub[language]}
            </p>
          </div>

          {/* Timeline Cards */}
          <div className="relative space-y-8 before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:-ml-px before:w-0.5 before:bg-dark-border">
            {EXPERIENCES.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
              >
                {/* Icon Marker */}
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border shrink-0 z-10 font-mono text-xs font-bold transition-all ${
                  isDev
                    ? 'bg-dark-surface border-blue-500 text-blue-400 group-hover:scale-110 shadow-[0_0_10px_rgba(0,102,255,0.3)]'
                    : 'bg-dark-surface border-amber-500 text-amber-400 group-hover:scale-110 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                }`}>
                  {idx + 1}
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ scale: 1.015 }}
                  transition={{ duration: 0.2 }}
                  className={`p-6 md:p-8 rounded-md border transition-all duration-300 shadow-xl w-full md:w-[calc(50%-2rem)] ${
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
                    {getLocalizedText(exp.title, language)}
                  </h3>
                  <h4 className={`text-xs font-mono font-semibold mb-4 ${isDev ? 'text-blue-400' : 'text-amber-400'}`}>
                    {getLocalizedText(exp.role, language)}
                  </h4>

                  <p className={`text-xs md:text-sm leading-relaxed mb-6 ${
                    isDev ? 'text-slate-300 font-mono' : 'text-slate-300 font-sans font-light'
                  }`}>
                    {getLocalizedDesc(exp.description, language, viewMode)}
                  </p>

                  {/* Tags & CTA */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-dark-border">
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-dark-card border border-dark-border text-slate-400"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setSelectedExp(exp)}
                      className={`text-xs font-mono font-bold flex items-center gap-1 hover:underline ${
                        isDev ? 'text-blue-400' : 'text-amber-400'
                      }`}
                      aria-label={`Lihat detail dokumen dan foto ${getLocalizedText(exp.title, language)}`}
                    >
                      {exp.photos && exp.photos.length > 0 ? (
                        <>{UI_TRANSLATIONS.timeline.viewGallery[language]} ({exp.photos.length} {UI_TRANSLATIONS.timeline.photosCount[language]}) <ExternalLink className="w-3.5 h-3.5" /></>
                      ) : (
                        <>{UI_TRANSLATIONS.timeline.viewDetail[language]} <ExternalLink className="w-3.5 h-3.5" /></>
                      )}
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </InteractiveGlowBackground>

      {/* ── Detail Modal (Rendered via React Portal onto document.body to prevent stacking context bleed) ── */}
      {mounted && selectedExp && createPortal(
        <AnimatePresence>
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-label={`Detail pengalaman: ${getLocalizedText(selectedExp.title, language)}`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-dark-surface border border-dark-border rounded-md max-w-2xl w-full max-h-[88vh] overflow-y-auto p-6 md:p-8 text-white relative shadow-2xl font-mono"
            >
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 p-2 rounded-sm bg-dark-card border border-dark-border hover:bg-dark-border text-slate-400 hover:text-white transition-colors"
                aria-label="Tutup modal detail pengalaman"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-sm bg-blue-950/80 border border-blue-800 text-blue-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-sans">{getLocalizedText(selectedExp.title, language)}</h3>
                  <p className="text-xs text-amber-400">{getLocalizedText(selectedExp.role, language)}</p>
                </div>
              </div>

              {/* ── Photo Gallery Grid (visual proof first) ── */}
              {photos.length > 0 && (
                <PhotoGalleryGrid photos={photos} onPhotoClick={openLightbox} />
              )}

              {/* ── Text detail ── */}
              <div className="space-y-4 text-xs md:text-sm text-slate-300 leading-relaxed font-sans font-light mb-6">
                <div>
                  <strong className="text-white block font-mono mb-1 text-xs uppercase text-blue-400">
                    {UI_TRANSLATIONS.timeline.taskDesc[language]}
                  </strong>
                  <p>{getLocalizedDesc(selectedExp.description, language, viewMode)}</p>
                </div>

                {selectedExp.abstract && (
                  <div className="p-4 rounded-sm bg-dark-base border border-dark-border font-mono text-xs">
                    <strong className="text-amber-400 block uppercase mb-1">{UI_TRANSLATIONS.timeline.abstractHeader[language]}</strong>
                    <p className="text-slate-300 italic">{getLocalizedText(selectedExp.abstract, language)}</p>
                  </div>
                )}

                {/* ── Certificate image (formal proof, after visual) ── */}
                {selectedExp.certificateImg && (
                  <div>
                    <strong className="text-white block font-mono text-xs uppercase mb-2">
                      Dokumen Sertifikat:
                    </strong>
                    <Image
                      src={selectedExp.certificateImg}
                      alt={`Sertifikat magang ${getLocalizedText(selectedExp.title, language)}`}
                      width={600}
                      height={400}
                      unoptimized
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
                    aria-label={`Buka PDF jurnal: ${selectedExp.title}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-blue-600 hover:bg-blue-500 border border-blue-400 text-white font-mono text-xs font-bold transition-colors"
                  >
                    <FileText className="w-4 h-4" /> {UI_TRANSLATIONS.timeline.openPdf[language]}
                  </a>
                )}
                <button
                  onClick={closeModal}
                  aria-label="Tutup detail pengalaman"
                  className="px-4 py-2 rounded-sm bg-dark-card border border-dark-border hover:bg-dark-border text-xs font-mono"
                >
                  {UI_TRANSLATIONS.timeline.closeBtn[language]}
                </button>
              </div>
            </motion.div>
          </div>
        </AnimatePresence>,
        document.body
      )}

      {/* ── Lightbox (full-screen, above modal, rendered via Portal) ── */}
      {photos.length > 0 && (
        <PhotoLightbox
          photos={photos}
          activeIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </>
  );
}
