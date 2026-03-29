import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'glass-dark' | 'outline' | 'gradient';
  hover?: boolean;
}

export const Card = ({ children, className, variant = 'default', hover = false }: CardProps) => {
  const variants = {
    default: "bg-card border-border",
    glass: "glass",
    "glass-dark": "glass-dark",
    outline: "border-border bg-transparent",
    gradient: "bg-gradient-to-br from-indigo-600/10 to-violet-600/10 border-indigo-500/20"
  };

  return (
    <div 
      className={cn(
        "rounded-2xl border p-6 transition-all duration-300",
        variants[variant],
        hover && "hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-500/30",
        className
      )}
    >
      {children}
    </div>
  );
};
