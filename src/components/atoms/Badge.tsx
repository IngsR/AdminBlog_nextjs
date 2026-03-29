import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'indigo' | 'outline';
  className?: string;
}

export const Badge = ({ children, variant = 'default', className }: BadgeProps) => {
  const variants = {
    default: "bg-zinc-800 text-zinc-300 border-zinc-700",
    success: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    error: "bg-red-500/10 text-red-500 border-red-500/20",
    indigo: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    outline: "bg-transparent text-zinc-400 border-zinc-700"
  };

  return (
    <span 
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-300",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
