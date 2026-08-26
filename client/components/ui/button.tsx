import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 select-none';

    const variants = {
      primary:
        'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%_100%] hover:bg-[position:right_center] text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-indigo-500/30 border border-blue-500/30',
      secondary:
        'bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-slate-700/80 hover:border-slate-300 dark:hover:border-white/20 shadow-sm',
      outline:
        'border border-slate-300 dark:border-white/15 bg-transparent text-slate-800 dark:text-slate-200 hover:border-blue-500 dark:hover:border-indigo-400 hover:text-blue-600 dark:hover:text-indigo-400 hover:bg-blue-50/50 dark:hover:bg-indigo-950/20',
      ghost:
        'bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white',
      danger: 'bg-red-600 text-white hover:bg-red-700 shadow-sm shadow-red-500/20',
    };

    const sizes = {
      sm: 'text-xs px-3.5 py-2 gap-1.5 font-medium',
      md: 'text-sm px-5 py-2.5 gap-2 font-semibold',
      lg: 'text-base px-6 py-3.5 gap-2.5 font-semibold',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

