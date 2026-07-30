'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useViewMode } from '@/context/ViewModeContext';
import { Badge } from '@/components/ui/Badge';
import { InteractiveGlowBackground } from '@/components/ui/InteractiveGlowBackground';

const TerminalGallery = dynamic(
  () => import('@/components/widgets/TerminalGallery').then((m) => m.TerminalGallery),
  {
    ssr: false,
    loading: () => (
      <div className="h-[340px] sm:h-[420px] lg:h-[480px] bg-dark-surface border border-dark-border rounded-md animate-pulse flex items-center justify-center text-slate-400 font-mono text-xs">
        Booting Terminal CLI Gallery...
      </div>
    ),
  }
);

export default function CertificationsPage() {
  const { viewMode } = useViewMode();
  const isDev = viewMode === 'developer';

  return (
    <InteractiveGlowBackground className="min-h-screen pt-28 pb-20 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant={isDev ? 'blue' : 'amber'}>Terminal View Console</Badge>
          <h1 className="text-3xl md:text-5xl font-extrabold mt-3 tracking-tight font-sans">
            Galeri <span className={`font-mono ${isDev ? 'text-blue-400' : 'text-amber-400'}`}>Sertifikat Digital</span>
          </h1>
          <p className="text-slate-400 text-xs md:text-sm mt-3 max-w-xl mx-auto font-mono">
            Ketik perintah seperti <span className="text-amber-300 font-bold">&apos;ls&apos;</span> atau <span className="text-cyan-300 font-bold">&apos;cat certs/mos_word.cert&apos;</span> untuk mengeksplorasi sertifikat digital.
          </p>
        </div>

        <TerminalGallery />
      </div>
    </InteractiveGlowBackground>
  );
}
