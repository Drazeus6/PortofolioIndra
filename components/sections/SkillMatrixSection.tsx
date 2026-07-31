'use client';

import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '@/lib/data';
import { useViewMode } from '@/context/ViewModeContext';
import { Badge } from '@/components/ui/Badge';
import { Scale, Cpu, Users, CheckCircle, Database, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { InteractiveGlowBackground } from '@/components/ui/InteractiveGlowBackground';

import { useLanguage } from '@/context/LanguageContext';
import { UI_TRANSLATIONS } from '@/lib/i18n';

export function SkillMatrixSection() {
  const { viewMode } = useViewMode();
  const { language } = useLanguage();
  const isDev = viewMode === 'developer';
  const [filter, setFilter] = useState<'all' | 'web' | 'tech' | 'legal' | 'soft'>('all');

  const allSkills = SKILL_CATEGORIES.flatMap((c) => c.skills);
  const filteredSkills = filter === 'all' ? allSkills : allSkills.filter((s) => s.category === filter);

  const getHeaderTitle = () => {
    switch (filter) {
      case 'web':
        return UI_TRANSLATIONS.skills.titleDev[language];
      case 'tech':
        return UI_TRANSLATIONS.skills.titleTech[language];
      case 'legal':
        return UI_TRANSLATIONS.skills.titleLegal[language];
      case 'soft':
        return UI_TRANSLATIONS.skills.titleSoft[language];
      default:
        return UI_TRANSLATIONS.skills.titleAll[language];
    }
  };

  const getHeaderSub = () => {
    switch (filter) {
      case 'web':
        return UI_TRANSLATIONS.skills.subWeb[language];
      case 'tech':
        return UI_TRANSLATIONS.skills.subTech[language];
      case 'legal':
        return UI_TRANSLATIONS.skills.subLegal[language];
      case 'soft':
        return UI_TRANSLATIONS.skills.subSoft[language];
      default:
        return UI_TRANSLATIONS.skills.sub[language];
    }
  };

  return (
    <InteractiveGlowBackground className="py-16 md:py-24 border-b border-dark-border text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dynamic Header */}
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-12"
        >
          <Badge variant={isDev ? 'blue' : 'amber'}>{UI_TRANSLATIONS.skills.badge[language]}</Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-3 tracking-tight font-sans">
            {getHeaderTitle()}{' '}
            <span className={`font-mono ${isDev ? 'text-blue-400' : 'text-amber-400'}`}>
              Skill Matrix
            </span>
          </h2>
          <p className="text-slate-400 text-xs md:text-sm mt-3 max-w-2xl mx-auto font-mono">
            {getHeaderSub()}
          </p>
        </motion.div>

        {/* Filter Buttons */}
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
            Semua ({allSkills.length})
          </button>
          <button
            onClick={() => setFilter('web')}
            className={`px-3.5 py-1.5 rounded-sm border font-bold uppercase transition-all flex items-center gap-1.5 ${
              filter === 'web'
                ? isDev
                  ? 'bg-blue-600 border-blue-400 text-white shadow-md'
                  : 'bg-amber-600 border-amber-400 text-slate-950 shadow-md'
                : 'bg-dark-card border-dark-border text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" /> Fullstack Web &amp; DB
          </button>
          <button
            onClick={() => setFilter('tech')}
            className={`px-3.5 py-1.5 rounded-sm border font-bold uppercase transition-all flex items-center gap-1.5 ${
              filter === 'tech'
                ? isDev
                  ? 'bg-blue-600 border-blue-400 text-white shadow-md'
                  : 'bg-amber-600 border-amber-400 text-slate-950 shadow-md'
                : 'bg-dark-card border-dark-border text-slate-400 hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" /> AI &amp; Office IT
          </button>
          <button
            onClick={() => setFilter('legal')}
            className={`px-3.5 py-1.5 rounded-sm border font-bold uppercase transition-all flex items-center gap-1.5 ${
              filter === 'legal'
                ? isDev
                  ? 'bg-blue-600 border-blue-400 text-white shadow-md'
                  : 'bg-amber-600 border-amber-400 text-slate-950 shadow-md'
                : 'bg-dark-card border-dark-border text-slate-400 hover:text-white'
            }`}
          >
            <Scale className="w-3.5 h-3.5" /> Legal &amp; Litigation
          </button>
          <button
            onClick={() => setFilter('soft')}
            className={`px-3.5 py-1.5 rounded-sm border font-bold uppercase transition-all flex items-center gap-1.5 ${
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
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2, delay: idx * 0.02 }}
              className={`p-5 rounded-sm border transition-all duration-300 ${
                isDev
                  ? 'bg-dark-surface border-dark-border hover:border-blue-500/60 hover:shadow-[0_0_15px_rgba(0,102,255,0.2)]'
                  : 'bg-dark-surface border-dark-border hover:border-amber-500/60 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)]'
              }`}
            >
              <div className="flex items-center justify-between mb-2 font-mono">
                <span className="font-bold text-xs md:text-sm flex items-center gap-2 text-white">
                  {skill.category === 'web' ? (
                    <Database className={`w-4 h-4 ${isDev ? 'text-blue-400' : 'text-amber-400'}`} />
                  ) : (
                    <CheckCircle className={`w-4 h-4 ${isDev ? 'text-blue-400' : 'text-amber-400'}`} />
                  )}
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
    </InteractiveGlowBackground>
  );
}
