import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps {
  variant?: 'blue' | 'amber' | 'emerald' | 'violet' | 'slate';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'blue', children, className }: BadgeProps) {
  const base = 'inline-flex items-center px-2.5 py-1 rounded-sm text-[11px] font-mono font-bold tracking-wider border uppercase';

  const variants = {
    blue: 'bg-blue-950/60 text-blue-400 border-blue-800/80',
    amber: 'bg-amber-950/60 text-amber-400 border-amber-800/80',
    emerald: 'bg-emerald-950/60 text-emerald-400 border-emerald-800/80',
    violet: 'bg-violet-950/60 text-violet-400 border-violet-800/80',
    slate: 'bg-dark-card text-slate-300 border-dark-border',
  };

  return (
    <span className={twMerge(clsx(base, variants[variant], className))}>
      {children}
    </span>
  );
}
