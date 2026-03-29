import React from 'react';
import { Card } from '@/components/atoms/Card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendType?: 'positive' | 'negative' | 'neutral';
  color?: 'indigo' | 'emerald' | 'amber' | 'rose' | 'violet';
}

export const StatCard = ({ label, value, icon: Icon, trend, trendType = 'neutral', color = 'indigo' }: StatCardProps) => {
  const colorVariants = {
    indigo: "from-indigo-600/20 to-indigo-600/5 text-indigo-500 shadow-indigo-500/10",
    emerald: "from-emerald-600/20 to-emerald-600/5 text-emerald-500 shadow-emerald-500/10",
    amber: "from-amber-600/20 to-amber-600/5 text-amber-500 shadow-amber-500/10",
    rose: "from-rose-600/20 to-rose-600/5 text-rose-500 shadow-rose-500/10",
    violet: "from-violet-600/20 to-violet-600/5 text-violet-500 shadow-violet-500/10"
  };

  const trendColors = {
    positive: "text-emerald-500",
    negative: "text-rose-500",
    neutral: "text-zinc-500"
  };

  return (
    <Card hover className="bg-linear-to-br p-6 border-white/5 relative group overflow-hidden">
      <div className="flex justify-between items-start relative z-10">
        <div className="space-y-1">
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{label}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-black text-white">{value}</h3>
            {trend && (
              <span className={cn("text-xs font-medium px-1.5 py-0.5 rounded-md bg-white/5", trendColors[trendType])}>
                {trend}
              </span>
            )}
          </div>
        </div>
        <div className={cn(
          "p-3 rounded-2xl bg-linear-to-br transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-2xl",
          colorVariants[color]
        )}>
          <Icon size={24} />
        </div>
      </div>
      
      {/* Decorative background glow */}
      <div className={cn(
        "absolute -bottom-6 -right-6 w-24 h-24 blur-[60px] opacity-20 transition-opacity duration-500 group-hover:opacity-40 rounded-full",
        "bg-" + color + "-600"
      )}></div>
    </Card>
  );
};
