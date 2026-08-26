import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, type = 'text', id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label ? (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2"
          >
            {label}
          </label>
        ) : null}
        <input
          id={inputId}
          type={type}
          ref={ref}
          className={cn(
            'w-full px-4 py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all duration-200 shadow-sm',
            error && 'border-red-500 focus:ring-red-500/40 focus:border-red-500',
            className
          )}
          {...props}
        />
        {error ? <p className="text-xs font-medium text-red-500 mt-1.5">{error}</p> : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

