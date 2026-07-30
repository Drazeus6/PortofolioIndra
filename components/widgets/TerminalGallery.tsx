'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CERTIFICATIONS } from '@/lib/data';
import { Terminal as TerminalIcon, CornerDownLeft, FileText, Download, Play, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'success';
  content: React.ReactNode;
}

export function TerminalGallery() {
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
            <p>
              <span className="text-cyan-400 font-bold">ls</span> - List all certification files
            </p>
            <p>
              <span className="text-cyan-400 font-bold">cat certs/&lt;filename&gt;</span> - Read certification details
            </p>
            <p>
              <span className="text-cyan-400 font-bold">download &lt;id&gt;</span> - Open certificate PDF
            </p>
            <p>
              <span className="text-cyan-400 font-bold">clear</span> - Clear terminal screen
            </p>
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
              <div className="text-xs text-slate-400">
                Penerbit: <span className="text-amber-300">{found.issuer}</span>
              </div>
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

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput('');
  };

  return (
    <div className="w-full rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden font-mono">
      {/* Terminal Header Bar */}
      <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          <span className="ml-2 text-xs text-slate-400 flex items-center gap-1.5 font-bold">
            <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
            certifications-cli — bash
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleCommand('ls')}
            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-cyan-300 transition-colors flex items-center gap-1"
          >
            <Play className="w-3 h-3" /> Quick List
          </button>
          <button
            onClick={() => handleCommand('help')}
            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-amber-300 transition-colors flex items-center gap-1"
          >
            <HelpCircle className="w-3 h-3" /> Help
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 md:p-6 h-[420px] overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-slate-800">
        {history.map((item) => (
          <div key={item.id}>{item.content}</div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Terminal Input Line */}
      <form onSubmit={onSubmit} className="bg-slate-900/90 border-t border-slate-800 p-3 flex items-center gap-2">
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
    </div>
  );
}
