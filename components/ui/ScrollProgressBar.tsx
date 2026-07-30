'use client';

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useViewMode } from '@/context/ViewModeContext';

export function ScrollProgressBar() {
  const { viewMode } = useViewMode();
  const isDev = viewMode === 'developer';
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className={`fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left transition-colors duration-500 ${
        isDev
          ? 'bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-400 shadow-[0_0_10px_rgba(0,102,255,0.8)]'
          : 'bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300 shadow-[0_0_10px_rgba(245,158,11,0.8)]'
      }`}
    />
  );
}
