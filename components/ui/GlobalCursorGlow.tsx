'use client';

import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useViewMode } from '@/context/ViewModeContext';

export function GlobalCursorGlow() {
  const { viewMode } = useViewMode();
  const isDev = viewMode === 'developer';

  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  return (
    <motion.div
      className={`pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] opacity-35 hidden md:block transition-colors duration-500 w-[550px] h-[550px] z-40 mix-blend-screen ${
        isDev ? 'bg-blue-600' : 'bg-amber-500'
      }`}
      style={{
        left: smoothX,
        top: smoothY,
      }}
    />
  );
}
