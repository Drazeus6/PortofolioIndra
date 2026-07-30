'use client';

import React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useViewMode } from '@/context/ViewModeContext';

interface InteractiveGlowBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function InteractiveGlowBackground({
  children,
  className = '',
}: InteractiveGlowBackgroundProps) {
  const { viewMode } = useViewMode();
  const isDev = viewMode === 'developer';

  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 25 });

  return (
    <section
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden transition-all duration-500 ${
        isDev ? 'bg-flowchart-grid' : 'bg-flowchart-grid-legal'
      } ${className}`}
    >
      {/* Desktop Cursor Follow Glow Spot */}
      <motion.div
        className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-20 hidden md:block transition-colors duration-500 w-96 h-96 z-0 ${
          isDev ? 'bg-blue-600' : 'bg-amber-500'
        }`}
        style={{
          left: smoothX,
          top: smoothY,
        }}
      />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
