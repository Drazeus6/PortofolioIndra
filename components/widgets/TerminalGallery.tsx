'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CERTIFICATIONS } from '@/lib/data';
import { Terminal as TerminalIcon, CornerDownLeft, FileText, Download, Grid, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'success';
  content: React.ReactNode;
}

export function TerminalGallery() {
  const [viewType, setViewType] = useState<'terminal' | 'grid'>('terminal');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ai' | 'office' | 'law'>('all');
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      id: 'init-1',
      type: 'output',
      content: (
        <span className="text-emerald-400 font-mono text-xs md:text-sm">
          Indra CLI v2.4.0 (x86_64-legal-tech-linux-gnu)<br />
          Type <span className="text-amber-300 font-bold">&apos;help&apos;</span> or{' '}
          <span className="text-amber-300 font-bold">&apos;ls&apos;</span> to list certifications.
        </span>
      ),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    const lineId = Date.now().toString();

    const newHistory: TerminalLine[] = [
      ...history,
      {
        id: lineId + '-in',
        type: 'input',
        content: (
          <span className="font-mono text-xs md:text-sm text-slate-300">
            <span className="text-emerald-400">indra@legal-tech</span>:
            <span className="text-cyan-400">~/certs</span>$ {cmdStr}
          </span>
        ),
      },
    ];

    if (!trimmed) {
      setHistory(newHistory);
      return;
    }

    if (trimmed === 'clear') {
      setHistory([]);
      return;
    }

    if (trimmed === 'help') {
      newHistory.push({
        id: lineId + '-out',
        type: 'output',
        content: (
          <div className="font-mono text-xs md:text-sm space-y-1 text-slate-300">
            <p className="text-amber-300 font-bold mb-1">Available Commands:</p>
            <p><span className="text-cyan-400 font-bold">ls</span> - List all certification files</p>
            <p><span className="text-cyan-400 font-bold">cat certs/&lt;filename&gt;</span> - Read certification details</p>
            <p><span className="text-cyan-400 font-bold">clear</span> - Clear terminal screen</p>
          </div>
        ),
      });
    } else if (trimmed === 'ls' || trimmed === 'ls certs' || trimmed === 'ls certs/') {
      newHistory.push({
        id: lineId + '-out',
        type: 'output',
        content: (
          <div className="font-mono text-xs md:text-sm grid grid-cols-1 sm:grid-cols-2 gap-2 my-2">
            {CERTIFICATIONS.map((cert) => (
              <button
                key={cert.id}
                onClick={() => handleCommand(`cat certs/${cert.id}.cert`)}
                className="flex items-center gap-2 p-2.5 rounded bg-dark-card border border-dark-border hover:border-emerald-500 text-left transition-colors group min-h-[44px]"
              >
                <FileText className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform shrink-0" />
                <div>
                  <span className="text-cyan-300 block font-bold text-xs">{cert.filename}</span>
                  <span className="text-slate-400 text-[10px]">{cert.issuer} ({cert.year})</span>
                </div>
              </button>
            ))}
          </div>
        ),
      });
    } else if (trimmed.startsWith('cat ')) {
      const target = trimmed.replace('cat ', '').replace('certs/', '').replace('.cert', '');
      const found = CERTIFICATIONS.find((c) => c.id === target || c.filename.includes(target));

      if (found) {
        newHistory.push({
          id: lineId + '-out',
          type: 'success',
          content: (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-sm bg-dark-card border border-dark-border font-mono text-xs md:text-sm text-slate-200 my-2 space-y-2"
            >
              <div className="flex items-center justify-between border-b border-dark-border pb-2">
                <span className="text-emerald-400 font-bold">{found.title}</span>
                <span className="text-xs text-slate-400">{found.year}</span>
              </div>
              <p className="text-slate-300 font-sans text-xs">{found.description}</p>
              <div className="text-xs text-slate-400">Penerbit: <span className="text-amber-300 font-bold">{found.issuer}</span></div>
              {found.pdfUrl && (
                <div className="pt-2">
                  <a
                    href={found.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-sm bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-xs font-semibold transition-colors min-h-[40px]"
                  >
                    <Download className="w-4 h-4" /> Unduh / Lihat PDF Sertifikat
                  </a>
                </div>
              )}
            </motion.div>
          ),
        });
      } else {
        newHistory.push({
          id: lineId + '-err',
          type: 'error',
          content: (
            <span className="text-red-400 font-mono text-xs md:text-sm">
              cat: {target}: File not found. Type <span className="text-amber-300 font-bold">&apos;ls&apos;</span> to see files.
            </span>
          ),
        });
      }
    } else {
      newHistory.push({
        id: lineId + '-err',
        type: 'error',
        content: (
          <span className="text-red-400 font-mono text-xs md:text-sm">
            command not found: {cmdStr}. Type <span className="text-amber-300 font-bold">&apos;help&apos;</span>.
          </span>
        ),
      });
    }

    setHistory(newHistory);
  };

  const filteredCerts = CERTIFICATIONS.filter((c) => {
    if (selectedCategory === 'ai') return c.id.includes('ai') || c.id.includes('prompt');
    if (selectedCategory === 'office') return c.id.includes('mos') || c.id.includes('financial');
    if (selectedCategory === 'law') return c.id.includes('legal') || c.id.includes('ibm');
    return true;
  });

  return (
    <div className="w-full rounded-md bg-dark-base border border-dark-border shadow-2xl overflow-hidden font-mono">
      {/* Header Bar */}
      <div className="bg-dark-surface px-4 py-3 border-b border-dark-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          <span className="ml-2 text-xs text-slate-300 font-bold flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
            certifications-cli
          </span>
        </div>

        {/* View Switcher Toggle Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewType(viewType === 'terminal' ? 'grid' : 'terminal')}
            aria-label={viewType === 'terminal' ? 'Beralih ke tampilan Grid Sertifikat' : 'Beralih ke tampilan Terminal CLI'}
            className="px-3 py-1.5 rounded-sm bg-dark-card border border-dark-border hover:border-slate-500 text-xs text-cyan-300 font-sans font-semibold transition-colors flex items-center gap-1.5 min-h-[36px]"
          >
            {viewType === 'terminal' ? <Grid className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
            {viewType === 'terminal' ? 'Filterable Grid' : 'CLI Console'}
          </button>
        </div>
      </div>

      {viewType === 'terminal' ? (
        <>
          {/* Terminal Body */}
          <div className="p-4 md:p-6 h-[340px] sm:h-[420px] lg:h-[480px] overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-dark-border">
            {history.map((item) => (
              <div key={item.id}>{item.content}</div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Quick Command Tap Pills for Mobile & Touch Users */}
          <div className="px-3 py-2 bg-dark-surface border-t border-dark-border flex items-center gap-2 overflow-x-auto scrollbar-none font-mono text-xs">
            <span className="text-[10px] text-slate-400 font-bold shrink-0 uppercase tracking-wider">Tap Commands:</span>
            <button
              type="button"
              onClick={() => handleCommand('ls')}
              aria-label="Jalankan perintah ls: tampilkan semua sertifikat"
              className="px-2.5 py-1.5 rounded-sm bg-dark-card border border-dark-border text-emerald-400 hover:bg-emerald-950/40 text-[11px] font-bold shrink-0 min-h-[36px] flex items-center gap-1"
            >
              ls
            </button>
            <button
              type="button"
              onClick={() => handleCommand('help')}
              aria-label="Jalankan perintah help: tampilkan panduan perintah"
              className="px-2.5 py-1.5 rounded-sm bg-dark-card border border-dark-border text-amber-400 hover:bg-amber-950/40 text-[11px] font-bold shrink-0 min-h-[36px] flex items-center gap-1"
            >
              help
            </button>
            {CERTIFICATIONS.map((cert) => (
              <button
                key={cert.id}
                type="button"
                onClick={() => handleCommand(`cat certs/${cert.id}.cert`)}
                aria-label={`Buka detail sertifikat: ${cert.title}`}
                className="px-2.5 py-1.5 rounded-sm bg-dark-card border border-dark-border text-cyan-300 hover:bg-cyan-950/40 text-[11px] font-semibold shrink-0 min-h-[36px] flex items-center gap-1"
              >
                cat {cert.filename}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleCommand('clear')}
              aria-label="Bersihkan layar terminal"
              className="px-2.5 py-1.5 rounded-sm bg-dark-card border border-dark-border text-red-400 hover:bg-red-950/40 text-[11px] font-bold shrink-0 min-h-[36px] flex items-center gap-1"
            >
              clear
            </button>
          </div>

          {/* Terminal Input Line */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCommand(input);
              setInput('');
            }}
            className="bg-dark-base border-t border-dark-border p-3 flex items-center gap-2"
          >
            <span className="text-emerald-400 text-xs md:text-sm font-bold shrink-0">indra@legal-tech:~/certs$</span>
            <input
              type="text"
              id="terminal-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="type 'ls', 'help', or tap a command above..."
              aria-label="Input perintah terminal sertifikat"
              autoComplete="off"
              className="flex-1 bg-transparent text-slate-100 text-xs md:text-sm focus:outline-none placeholder:text-slate-600 font-mono min-h-[40px]"
            />
            <button type="submit" aria-label="Eksekusi perintah terminal" className="p-2.5 rounded-sm bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shrink-0 min-h-[40px] min-w-[40px] flex items-center justify-center">
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </form>
        </>
      ) : (
        /* Filterable Grid Mode for Accessibility & Touch Devices */
        <div className="p-6 h-[340px] sm:h-[420px] lg:h-[480px] overflow-y-auto space-y-6 font-sans">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              aria-label="Tampilkan semua sertifikat"
              aria-pressed={selectedCategory === 'all'}
              className={`px-3 py-2 rounded-sm text-xs font-semibold uppercase min-h-[40px] ${
                selectedCategory === 'all' ? 'bg-emerald-600 text-white' : 'bg-dark-card text-slate-400 border border-dark-border'
              }`}
            >
              Semua Sertifikat ({CERTIFICATIONS.length})
            </button>
            <button
              onClick={() => setSelectedCategory('ai')}
              aria-label="Filter sertifikat AI dan Teknologi"
              aria-pressed={selectedCategory === 'ai'}
              className={`px-3 py-2 rounded-sm text-xs font-semibold uppercase min-h-[40px] ${
                selectedCategory === 'ai' ? 'bg-emerald-600 text-white' : 'bg-dark-card text-slate-400 border border-dark-border'
              }`}
            >
              AI &amp; Tech
            </button>
            <button
              onClick={() => setSelectedCategory('office')}
              aria-label="Filter sertifikat Office dan Keuangan"
              aria-pressed={selectedCategory === 'office'}
              className={`px-3 py-2 rounded-sm text-xs font-semibold uppercase min-h-[40px] ${
                selectedCategory === 'office' ? 'bg-emerald-600 text-white' : 'bg-dark-card text-slate-400 border border-dark-border'
              }`}
            >
              Office &amp; Finance
            </button>
            <button
              onClick={() => setSelectedCategory('law')}
              aria-label="Filter sertifikat IBM Legal dan Etika AI"
              aria-pressed={selectedCategory === 'law'}
              className={`px-3 py-2 rounded-sm text-xs font-semibold uppercase min-h-[40px] ${
                selectedCategory === 'law' ? 'bg-emerald-600 text-white' : 'bg-dark-card text-slate-400 border border-dark-border'
              }`}
            >
              IBM Legal &amp; Ethics
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCerts.map((cert) => (
              <motion.div
                key={cert.id}
                whileHover={{ scale: 1.02 }}
                className="p-5 rounded-sm bg-dark-card border border-dark-border space-y-2 hover:border-emerald-500/50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-emerald-400 font-bold text-sm">{cert.title}</span>
                  <span className="text-xs text-slate-400 font-mono">{cert.year}</span>
                </div>
                <p className="text-xs text-slate-300 font-light">{cert.description}</p>
                <div className="text-xs text-slate-400">
                  Penerbit: <strong className="text-amber-300">{cert.issuer}</strong>
                </div>
                {cert.pdfUrl && (
                  <a
                    href={cert.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 pt-2 text-xs text-cyan-400 font-semibold hover:underline min-h-[40px]"
                  >
                    <Download className="w-4 h-4" /> Buka PDF Sertifikat
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
