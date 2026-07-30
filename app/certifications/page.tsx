'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useViewMode } from '@/context/ViewModeContext';
import { Badge } from '@/components/ui/Badge';
import { Terminal as TerminalIcon } from 'lucide-react';

const TerminalGallery = dynamic(
  () => import('@/components/widgets/TerminalGallery').then((m) => m.TerminalGallery),
  { ssr: false, loading: () => <div className="h-[480px] bg-slate-950 rounded-2xl animate-pulse flex items-center justify-center text-slate-400 font-mono">Booting Terminal CLI Gallery...</div> }
);

export default function CertificationsPage() {
  const { viewMode } = useViewMode();
  const isDev = viewMode === 'developer';

  return (
    <div
      className={`min-h-screen pt-28 pb-20 transition-colors duration-500 ${
        isDev ? 'bg-slate-950 text-white' : 'bg-slate-900 text-slate-100'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="emerald">Terminal View Console</Badge>
          <h1 className="text-3xl md:text-5xl font-extrabold mt-3 tracking-tight font-mono text-emerald-400">
            &gt; Galeri Sertifikat CLI
          </h1>
          <p className="text-slate-400 text-sm md:text-base mt-3 max-w-xl mx-auto font-mono">
            Ketik perintah seperti <span className="text-amber-300 font-bold">&apos;ls&apos;</span> atau <span className="text-cyan-300 font-bold">&apos;cat certs/mos_word.cert&apos;</span> untuk mengeksplorasi sertifikat digital.
          </p>
        </div>

        {/* Terminal Gallery Widget */}
        <TerminalGallery />
      </div>
    </div>
  );
}
