import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative overflow-hidden rounded-2xl bg-white dark:bg-[#0D1322] border border-slate-200/90 dark:border-slate-800/80 p-6 sm:p-8 transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_25px_-5px_rgba(0,0,0,0.4)]',
          'before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-indigo-500/40 before:to-transparent',
          hoverable &&
            'hover:-translate-y-1.5 hover:border-indigo-500/60 dark:hover:border-indigo-400/50 hover:shadow-2xl hover:shadow-indigo-500/10 dark:hover:shadow-[0_15px_40px_-5px_rgba(99,102,241,0.22)]',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mb-4 space-y-1', className)} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn('text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug', className)} {...props}>
    {children}
  </h3>
);

export const CardDescription = ({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed font-medium', className)} {...props}>
    {children}
  </p>
);

export const CardContent = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('', className)} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mt-6 pt-5 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between', className)} {...props}>
    {children}
  </div>
);


