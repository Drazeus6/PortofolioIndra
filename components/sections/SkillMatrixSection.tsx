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
    <section
      className={`py-20 md:py-28 transition-colors duration-500 ${
        isDev ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant={isDev ? 'emerald' : 'blue'}>Matriks Kompetensi</Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-3 tracking-tight">
            Technical &amp; Legal <span className={isDev ? 'text-emerald-400 font-mono' : 'text-blue-700'}>Skill Matrix</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-3 max-w-xl mx-auto font-light">
            Sinergi antara analisis regulasi hukum normatif, penguasaan IT/Administrasi, dan soft skill profesional.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              filter === 'all'
                ? isDev
                  ? 'bg-emerald-600 text-white font-mono'
                  : 'bg-blue-700 text-white'
                : isDev
                ? 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Semua Kompetensi ({allSkills.length})
          </button>
          <button
            onClick={() => setFilter('legal')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              filter === 'legal'
                ? isDev
                  ? 'bg-emerald-600 text-white font-mono'
                  : 'bg-blue-700 text-white'
                : isDev
                ? 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Scale className="w-3.5 h-3.5" /> Analisis Hukum
          </button>
          <button
            onClick={() => setFilter('tech')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              filter === 'tech'
                ? isDev
                  ? 'bg-emerald-600 text-white font-mono'
                  : 'bg-blue-700 text-white'
                : isDev
                ? 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" /> IT &amp; Administrasi Modern
          </button>
          <button
            onClick={() => setFilter('soft')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              filter === 'soft'
                ? isDev
                  ? 'bg-emerald-600 text-white font-mono'
                  : 'bg-blue-700 text-white'
                : isDev
                ? 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" /> Soft Skills
          </button>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSkills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className={`p-5 rounded-2xl border transition-all ${
                isDev
                  ? 'bg-slate-900/90 border-slate-800 hover:border-emerald-500/50'
                  : 'bg-white border-slate-200 hover:border-blue-400 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm flex items-center gap-2">
                  <CheckCircle className={`w-4 h-4 ${isDev ? 'text-emerald-400' : 'text-blue-600'}`} />
                  {skill.name}
                </span>
                <span className={`text-xs font-mono font-bold ${isDev ? 'text-emerald-400' : 'text-blue-700'}`}>
                  {skill.level}%
                </span>
              </div>

              {/* Progress Bar Container */}
              <div className={`w-full h-2.5 rounded-full overflow-hidden ${isDev ? 'bg-slate-800' : 'bg-slate-100'}`}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className={`h-full rounded-full ${
                    isDev
                      ? 'bg-gradient-to-r from-emerald-500 to-cyan-400'
                      : 'bg-gradient-to-r from-blue-700 to-indigo-500'
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
