'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CERTIFICATIONS, CertificationItem } from '@/lib/data';
import { Terminal as TerminalIcon, CornerDownLeft, FileText, Download, Play, HelpCircle, Grid, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
                className="flex items-center gap-2 p-2 rounded bg-slate-800/80 border border-slate-700 hover:border-emerald-500 text-left transition-colors group"
              >
                <FileText className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
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
              className="p-4 rounded-xl bg-slate-900 border border-slate-700 font-mono text-xs md:text-sm text-slate-200 my-2 space-y-2"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-emerald-400 font-bold">{found.title}</span>
                <span className="text-xs text-slate-400">{found.year}</span>
              </div>
              <p className="text-slate-300 font-sans text-xs">{found.description}</p>
              <div className="text-xs text-slate-400">Penerbit: <span className="text-amber-300">{found.issuer}</span></div>
              {found.pdfUrl && (
                <div className="pt-2">
                  <a
                    href={found.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-xs font-semibold transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" /> Unduh / Lihat PDF Sertifikat
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
    <div className="w-full rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden font-mono">
      {/* Header Bar */}
      <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          <span className="ml-2 text-xs text-slate-300 font-bold flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
            certifications-cli — {viewType === 'terminal' ? 'CLI Mode' : 'Grid Mode'}
          </span>
        </div>

        {/* View Switcher Toggle Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewType(viewType === 'terminal' ? 'grid' : 'terminal')}
            className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-cyan-300 font-sans font-semibold transition-colors flex items-center gap-1.5"
          >
            {viewType === 'terminal' ? <Grid className="w-3.5 h-3.5" /> : <Monitor className="w-3.5 h-3.5" />}
            {viewType === 'terminal' ? 'Lihat Filterable Grid' : 'Lihat CLI Console'}
          </button>
        </div>
      </div>

      {viewType === 'terminal' ? (
        <>
          {/* Terminal Body */}
          <div className="p-4 md:p-6 h-[340px] sm:h-[420px] lg:h-[480px] overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-slate-800">
            {history.map((item) => (
              <div key={item.id}>{item.content}</div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Terminal Input Line */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCommand(input);
              setInput('');
            }}
            className="bg-slate-900/90 border-t border-slate-800 p-3 flex items-center gap-2"
          >
            <span className="text-emerald-400 text-xs md:text-sm font-bold">indra@legal-tech:~/certs$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="type 'ls', 'help', or 'cat certs/mos_word.cert'..."
              className="flex-1 bg-transparent text-slate-100 text-xs md:text-sm focus:outline-none placeholder:text-slate-600 font-mono"
            />
            <button type="submit" className="p-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white transition-colors">
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
              className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                selectedCategory === 'all' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              Semua Sertifikat ({CERTIFICATIONS.length})
            </button>
            <button
              onClick={() => setSelectedCategory('ai')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                selectedCategory === 'ai' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              AI &amp; Tech
            </button>
            <button
              onClick={() => setSelectedCategory('office')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                selectedCategory === 'office' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              Office &amp; Finance
            </button>
            <button
              onClick={() => setSelectedCategory('law')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                selectedCategory === 'law' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
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
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 hover:border-emerald-500/50 transition-all"
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
                    className="inline-flex items-center gap-1.5 pt-2 text-xs text-cyan-400 font-semibold hover:underline"
                  >
                    <Download className="w-3.5 h-3.5" /> Buka PDF Sertifikat
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
