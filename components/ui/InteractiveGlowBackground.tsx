'use client';

import React from 'react';
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

  return (
    <section
      className={`relative overflow-hidden transition-all duration-500 ${
        isDev ? 'bg-flowchart-grid' : 'bg-flowchart-grid-legal'
      } ${className}`}
    >
      <div className="relative z-10">{children}</div>
    </section>
  );
}
