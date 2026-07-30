'use client';

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'dev' | 'legal';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed border rounded-sm uppercase tracking-wider text-xs cursor-pointer select-none';

  const variants = {
    primary:
      'bg-blue-600 hover:bg-blue-500 border-blue-400 text-white shadow-lg shadow-blue-900/30 font-mono hover:shadow-[0_0_15px_rgba(0,102,255,0.5)]',
    secondary:
      'bg-dark-card hover:bg-dark-border border-dark-border text-slate-200 hover:border-slate-500',
    outline:
      'border-blue-500/60 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400 font-mono hover:shadow-[0_0_12px_rgba(59,130,246,0.3)]',
    ghost:
      'text-slate-400 hover:text-white hover:bg-dark-card border-transparent',
    dev:
      'bg-blue-600 hover:bg-blue-500 border-blue-400 text-white shadow-lg shadow-blue-950/50 font-mono hover:shadow-[0_0_20px_rgba(0,102,255,0.6)]',
    legal:
      'bg-amber-600 hover:bg-amber-500 border-amber-400 text-slate-950 font-mono font-bold shadow-lg shadow-amber-950/40 hover:shadow-[0_0_20px_rgba(245,158,11,0.6)]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-[11px]',
    md: 'px-4 py-2 text-xs',
    lg: 'px-6 py-3 text-xs md:text-sm',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
      className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
      {...props}
    >
      {children}
    </motion.button>
  );
}
