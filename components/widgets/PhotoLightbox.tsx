'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Images } from 'lucide-react';

export interface PhotoItem {
  src: string;
  alt: string;
}

interface PhotoLightboxProps {
  /** All photos in the gallery */
  photos: PhotoItem[];
  /** Currently open photo index, or null when closed */
  activeIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

/** Full-screen lightbox overlay with prev/next navigation */
export function PhotoLightbox({ photos, activeIndex, onClose, onPrev, onNext }: PhotoLightboxProps) {
  if (activeIndex === null) return null;

  const photo = photos[activeIndex];

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[120] flex items-center justify-center bg-black/95 backdrop-blur-md"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Lightbox foto dokumentasi magang"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-3xl w-full mx-4 flex flex-col items-center"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 p-2 rounded-sm bg-dark-card border border-dark-border text-slate-300 hover:text-white transition-colors"
            aria-label="Tutup lightbox foto"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Main image */}
          <div className="relative w-full rounded-md overflow-hidden border border-dark-border bg-dark-surface shadow-2xl">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={900}
              height={600}
              unoptimized
              className="w-full max-h-[72vh] object-contain"
              priority
            />
          </div>

          {/* Caption */}
          <p className="text-center text-xs text-slate-300 font-sans mt-3 px-4 max-w-xl">
            {photo.alt}
          </p>

          {/* Counter */}
          <p className="text-center text-[10px] text-slate-600 font-mono mt-1">
            {activeIndex + 1} / {photos.length}
          </p>

          {/* Dot indicators */}
          {photos.length > 1 && (
            <div className="flex items-center gap-1.5 mt-2">
              {photos.map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    i === activeIndex ? 'bg-amber-400 w-3' : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Prev / Next */}
          {photos.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-sm bg-black/60 hover:bg-black/80 border border-dark-border text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Foto sebelumnya"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-sm bg-black/60 hover:bg-black/80 border border-dark-border text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Foto berikutnya"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

interface PhotoGalleryGridProps {
  photos: PhotoItem[];
  onPhotoClick: (index: number) => void;
}

/** Compact thumbnail grid rendered inside a modal */
export function PhotoGalleryGrid({ photos, onPhotoClick }: PhotoGalleryGridProps) {
  return (
    <div className="mb-6">
      <strong className="text-white block font-mono text-xs uppercase mb-3 flex items-center gap-2">
        <Images className="w-4 h-4 text-amber-400" />
        <span>Dokumentasi Foto Magang ({photos.length} foto)</span>
      </strong>

      <div
        className="grid grid-cols-3 sm:grid-cols-4 gap-2"
        role="list"
        aria-label="Galeri foto dokumentasi magang — klik untuk memperbesar"
      >
        {photos.map((photo, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.04 }}
            onClick={() => onPhotoClick(idx)}
            className="relative aspect-square rounded-sm overflow-hidden border border-dark-border hover:border-amber-400/70 transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-1 focus:ring-offset-dark-surface bg-dark-base"
            aria-label={`Lihat foto ${idx + 1}: ${photo.alt}`}
            role="listitem"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 640px) 30vw, 150px"
            />
            {/* Hover overlay with index */}
            <div className="absolute inset-0 bg-black/30 hover:bg-black/5 transition-colors flex items-end justify-end p-1">
              <span className="text-[9px] text-white/70 font-mono bg-black/50 px-1 rounded">{idx + 1}</span>
            </div>
          </motion.button>
        ))}
      </div>

      <p className="text-[10px] text-slate-500 font-mono mt-2">
        Klik foto untuk memperbesar — gunakan tombol ← → untuk navigasi
      </p>
    </div>
  );
}
