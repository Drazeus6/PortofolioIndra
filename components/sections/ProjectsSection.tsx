'use client';

import React, { useState } from 'react';
import { PROJECTS, ProjectItem } from '@/lib/data';
import { useViewMode } from '@/context/ViewModeContext';
import { Badge } from '@/components/ui/Badge';
import { ExternalLink, Database, Code, Globe, Shield, Cpu, ShoppingBag, Truck, HeartPulse } from 'lucide-react';
import { motion } from 'framer-motion';

export function ProjectsSection() {
  const { viewMode } = useViewMode();
  const isDev = viewMode === 'developer';
  const [filter, setFilter] = useState<string>('all');

  const filteredProjects = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  const getCategoryIcon = (category: string) => {
    if (category === 'legal-tech') return <Shield className="w-4 h-4 text-amber-400" />;
    if (category === 'web-app') return <Globe className="w-4 h-4 text-blue-400" />;
    if (category === 'logistics') return <Truck className="w-4 h-4 text-cyan-400" />;
    if (category === 'healthcare') return <HeartPulse className="w-4 h-4 text-emerald-400" />;
    return <ShoppingBag className="w-4 h-4 text-yellow-400" />;
  };

  return (
    <section className="py-16 md:py-24 bg-dark-surface border-b border-dark-border text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge variant={isDev ? 'blue' : 'amber'}>Live Deployed Applications</Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-3 tracking-tight font-sans">
            Portofolio <span className={`font-mono ${isDev ? 'text-blue-400' : 'text-amber-400'}`}>Project Web &amp; Database</span>
          </h2>
          <p className="text-slate-400 text-xs md:text-sm mt-3 max-w-2xl mx-auto font-mono">
            Kumpulan 5 proyek aplikasi web interaktif live ter-deploy di Vercel, dikembangkan dengan teknologi modern &amp; integrasi basis data SQL / NoSQL.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 font-mono text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-sm border font-bold uppercase transition-all ${
              filter === 'all'
                ? isDev
                  ? 'bg-blue-600 border-blue-400 text-white shadow-md'
                  : 'bg-amber-600 border-amber-400 text-slate-950 shadow-md'
                : 'bg-dark-card border-dark-border text-slate-400 hover:text-white'
            }`}
          >
            Semua Proyek ({PROJECTS.length})
          </button>
          <button
            onClick={() => setFilter('legal-tech')}
            className={`px-3.5 py-1.5 rounded-sm border font-bold uppercase transition-all flex items-center gap-1.5 ${
              filter === 'legal-tech'
                ? isDev
                  ? 'bg-blue-600 border-blue-400 text-white shadow-md'
                  : 'bg-amber-600 border-amber-400 text-slate-950 shadow-md'
                : 'bg-dark-card border-dark-border text-slate-400 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-amber-400" /> Jinayah Legal-Tech
          </button>
          <button
            onClick={() => setFilter('web-app')}
            className={`px-3.5 py-1.5 rounded-sm border font-bold uppercase transition-all flex items-center gap-1.5 ${
              filter === 'web-app'
                ? isDev
                  ? 'bg-blue-600 border-blue-400 text-white shadow-md'
                  : 'bg-amber-600 border-amber-400 text-slate-950 shadow-md'
                : 'bg-dark-card border-dark-border text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-blue-400" /> Ryoku Anime
          </button>
          <button
            onClick={() => setFilter('logistics')}
            className={`px-3.5 py-1.5 rounded-sm border font-bold uppercase transition-all flex items-center gap-1.5 ${
              filter === 'logistics'
                ? isDev
                  ? 'bg-blue-600 border-blue-400 text-white shadow-md'
                  : 'bg-amber-600 border-amber-400 text-slate-950 shadow-md'
                : 'bg-dark-card border-dark-border text-slate-400 hover:text-white'
            }`}
          >
            <Truck className="w-3.5 h-3.5 text-cyan-400" /> WUS Cargo
          </button>
          <button
            onClick={() => setFilter('healthcare')}
            className={`px-3.5 py-1.5 rounded-sm border font-bold uppercase transition-all flex items-center gap-1.5 ${
              filter === 'healthcare'
                ? isDev
                  ? 'bg-blue-600 border-blue-400 text-white shadow-md'
                  : 'bg-amber-600 border-amber-400 text-slate-950 shadow-md'
                : 'bg-dark-card border-dark-border text-slate-400 hover:text-white'
            }`}
          >
            <HeartPulse className="w-3.5 h-3.5 text-emerald-400" /> Jejak Sehat
          </button>
          <button
            onClick={() => setFilter('e-commerce')}
            className={`px-3.5 py-1.5 rounded-sm border font-bold uppercase transition-all flex items-center gap-1.5 ${
              filter === 'e-commerce'
                ? isDev
                  ? 'bg-blue-600 border-blue-400 text-white shadow-md'
                  : 'bg-amber-600 border-amber-400 text-slate-950 shadow-md'
                : 'bg-dark-card border-dark-border text-slate-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-yellow-400" /> Coffee Shop
          </button>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className={`p-6 rounded-md border flex flex-col justify-between transition-all duration-300 ${
                isDev
                  ? 'bg-dark-base border-dark-border hover:border-blue-500/60 hover:shadow-[0_0_20px_rgba(0,102,255,0.2)]'
                  : 'bg-dark-base border-dark-border hover:border-amber-500/60 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]'
              }`}
            >
              <div>
                {/* Header Card info */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-sm bg-dark-card border border-dark-border text-slate-300">
                    {getCategoryIcon(project.category)}
                    {project.badge}
                  </span>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-sm bg-dark-card border border-dark-border hover:border-blue-400 text-blue-400 hover:text-white transition-colors"
                    title="Buka Website Live di Vercel"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <h3 className="font-bold font-sans text-base text-white mb-2 leading-snug">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-300 font-sans font-light leading-relaxed mb-4">
                  {isDev ? project.description.developer : project.description.legal}
                </p>
              </div>

              {/* Technologies & Database Section */}
              <div className="pt-4 border-t border-dark-border space-y-3 font-mono">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5 flex items-center gap-1">
                    <Code className="w-3 h-3 text-blue-400" /> Bahasa &amp; Framework:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.languages.map((lang) => (
                      <span
                        key={lang}
                        className="text-[10px] px-2 py-0.5 rounded-sm bg-dark-card text-slate-300 border border-dark-border"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1 flex items-center gap-1">
                    <Database className="w-3 h-3 text-amber-400" /> Database:
                  </span>
                  <span className="text-xs font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded-sm border border-amber-800/80 inline-block">
                    {project.database}
                  </span>
                </div>

                {/* Direct Link Button */}
                <div className="pt-2">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center justify-center gap-2 w-full py-2 rounded-sm text-xs font-bold uppercase transition-colors ${
                      isDev
                        ? 'bg-blue-600 hover:bg-blue-500 text-white border border-blue-400'
                        : 'bg-amber-600 hover:bg-amber-500 text-slate-950 border border-amber-400'
                    }`}
                  >
                    Kunjungi Website Live <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
