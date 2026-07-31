'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useViewMode } from '@/context/ViewModeContext';

export function GlobalCursorGlow() {
  const { viewMode } = useViewMode();
  const isDev = viewMode === 'developer';

  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Safety check for reduced motion preferences
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handleChange = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  if (reducedMotion) return null;

  return (
    <motion.div
      className={`pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px] opacity-15 hidden md:block transition-colors duration-700 w-[600px] h-[600px] z-0 mix-blend-soft-light ${
        isDev ? 'bg-blue-500' : 'bg-amber-500'
      }`}
      style={{
        left: smoothX,
        top: smoothY,
      }}
    />
  );
}
