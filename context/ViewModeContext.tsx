'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type ViewMode = 'developer' | 'legal';

interface ViewModeContextType {
  viewMode: ViewMode;
  toggleViewMode: () => void;
  setViewMode: (mode: ViewMode) => void;
}

const ViewModeContext = createContext<ViewModeContextType | undefined>(undefined);

export function ViewModeProvider({ children }: { children: React.ReactNode }) {
  const [viewMode, setViewModeState] = useState<ViewMode>('developer');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('portfolio_view_mode') as ViewMode;
    if (saved === 'developer' || saved === 'legal') {
      setViewModeState(saved);
    }
  }, []);

  const setViewMode = (mode: ViewMode) => {
    setViewModeState(mode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_view_mode', mode);
    }
  };

  const toggleViewMode = () => {
    const nextMode = viewMode === 'developer' ? 'legal' : 'developer';
    setViewMode(nextMode);
  };

  return (
    <ViewModeContext.Provider value={{ viewMode, toggleViewMode, setViewMode }}>
      <div class={mounted ? (viewMode === 'developer' ? 'dark' : 'light') : 'dark'}>
        {children}
      </div>
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  const context = useContext(ViewModeContext);
  if (!context) {
    throw new Error('useViewMode must be used within a ViewModeProvider');
  }
  return context;
}
