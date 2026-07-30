'use client';

import React from 'react';

interface ShimmerSkeletonProps {
  className?: string;
}

export function ShimmerSkeleton({ className = '' }: ShimmerSkeletonProps) {
  return (
    <div
      className={`relative overflow-hidden bg-dark-card border border-dark-border rounded-md before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.8s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent ${className}`}
    />
  );
}
