import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed border rounded-md uppercase tracking-wider text-xs';
  
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-500 border-blue-400 text-white shadow-lg shadow-blue-900/30 font-mono',
    secondary: 'bg-dark-card hover:bg-dark-border border-dark-border text-slate-200',
    outline: 'border-blue-500/60 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400 font-mono',
    ghost: 'text-slate-400 hover:text-white hover:bg-dark-card border-transparent',
    dev: 'bg-blue-600 hover:bg-blue-500 border-blue-400 text-white shadow-lg shadow-blue-950/50 font-mono',
    legal: 'bg-amber-600 hover:bg-amber-500 border-amber-400 text-slate-950 font-mono font-bold shadow-lg shadow-amber-950/40',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-[11px]',
    md: 'px-4 py-2 text-xs',
    lg: 'px-6 py-3 text-xs md:text-sm',
  };

  return (
    <button
      className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
      {...props}
    >
      {children}
    </button>
  );
}
