import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'outline';
}

export const Badge = ({ className, variant = 'default', children, ...props }: BadgeProps) => {
  const variants = {
    default:
      'bg-slate-100/90 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-white/10 backdrop-blur-md',
    accent:
      'bg-blue-50/90 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200/80 dark:border-blue-800/60 backdrop-blur-md',
    success:
      'bg-emerald-50/90 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/60 backdrop-blur-md',
    warning:
      'bg-amber-50/90 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200/80 dark:border-amber-800/60 backdrop-blur-md',
    outline:
      'bg-transparent text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-white/15 backdrop-blur-md',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 select-none',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

