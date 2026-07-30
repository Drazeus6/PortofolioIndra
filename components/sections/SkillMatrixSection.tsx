'use client';

import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '@/lib/data';
import { useViewMode } from '@/context/ViewModeContext';
import { Badge } from '@/components/ui/Badge';
import { Scale, Cpu, Users, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function SkillMatrixSection() {
  const { viewMode } = useViewMode();
  const isDev = viewMode === 'developer';
  const [filter, setFilter] = useState<'all' | 'legal' | 'tech' | 'soft'>('all');

  const allSkills = SKILL_CATEGORIES.flatMap((c) => c.skills);
  const filteredSkills = filter === 'all' ? allSkills : allSkills.filter((s) => s.category === filter);

  return (
    <section className="py-20 md:py-28 bg-dark-base border-b border-dark-border text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant={isDev ? 'blue' : 'amber'}>Matriks Kompetensi</Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-3 tracking-tight font-sans">
            Technical &amp; Legal <span className={`font-mono ${isDev ? 'text-blue-400' : 'text-amber-400'}`}>Skill Matrix</span>
          </h2>
          <p className="text-slate-400 text-xs md:text-sm mt-3 max-w-xl mx-auto font-mono">
            Grid filterable per kategori: Analisis regulasi hukum normatif, penguasaan IT/Administrasi AI, dan soft skill profesional.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 font-mono text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-sm border font-bold uppercase transition-all ${
              filter === 'all'
                ? isDev
                  ? 'bg-blue-600 border-blue-400 text-white shadow-md'
                  : 'bg-amber-600 border-amber-400 text-slate-950 shadow-md'
                : 'bg-dark-card border-dark-border text-slate-400 hover:text-white'
            }`}
          >
            Semua ({allSkills.length})
          </button>
          <button
            onClick={() => setFilter('tech')}
            className={`px-4 py-2 rounded-sm border font-bold uppercase transition-all flex items-center gap-1.5 ${
              filter === 'tech'
                ? isDev
                  ? 'bg-blue-600 border-blue-400 text-white shadow-md'
                  : 'bg-amber-600 border-amber-400 text-slate-950 shadow-md'
                : 'bg-dark-card border-dark-border text-slate-400 hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" /> AI &amp; Fullstack Tech
          </button>
          <button
            onClick={() => setFilter('legal')}
            className={`px-4 py-2 rounded-sm border font-bold uppercase transition-all flex items-center gap-1.5 ${
              filter === 'legal'
                ? isDev
                  ? 'bg-blue-600 border-blue-400 text-white shadow-md'
                  : 'bg-amber-600 border-amber-400 text-slate-950 shadow-md'
                : 'bg-dark-card border-dark-border text-slate-400 hover:text-white'
            }`}
          >
            <Scale className="w-3.5 h-3.5" /> Legal &amp; Analysis
          </button>
          <button
            onClick={() => setFilter('soft')}
            className={`px-4 py-2 rounded-sm border font-bold uppercase transition-all flex items-center gap-1.5 ${
              filter === 'soft'
                ? isDev
                  ? 'bg-blue-600 border-blue-400 text-white shadow-md'
                  : 'bg-amber-600 border-amber-400 text-slate-950 shadow-md'
                : 'bg-dark-card border-dark-border text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" /> Soft Skills
          </button>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredSkills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2, delay: idx * 0.03 }}
              className={`p-5 rounded-sm border transition-all duration-300 ${
                isDev
                  ? 'bg-dark-surface border-dark-border hover:border-blue-500/60 hover:shadow-[0_0_15px_rgba(0,102,255,0.2)]'
                  : 'bg-dark-surface border-dark-border hover:border-amber-500/60 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)]'
              }`}
            >
              <div className="flex items-center justify-between mb-2 font-mono">
                <span className="font-bold text-xs md:text-sm flex items-center gap-2 text-white">
                  <CheckCircle className={`w-4 h-4 ${isDev ? 'text-blue-400' : 'text-amber-400'}`} />
                  {skill.name}
                </span>
                <span className={`text-xs font-extrabold ${isDev ? 'text-blue-400' : 'text-amber-400'}`}>
                  {skill.level}%
                </span>
              </div>

              {/* Accessible Progress Bar */}
              <div
                className="w-full h-2 rounded-none bg-dark-card overflow-hidden border border-dark-border"
                role="progressbar"
                aria-valuenow={skill.level}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={skill.name}
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className={`h-full ${
                    isDev
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-400'
                      : 'bg-gradient-to-r from-amber-600 to-yellow-400'
                  }`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
