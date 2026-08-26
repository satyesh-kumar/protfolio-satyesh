import React from 'react';
import { cn } from '@/lib/utils';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label ? (
          <label
            htmlFor={selectId}
            className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2"
          >
            {label}
          </label>
        ) : null}
        <select
          id={selectId}
          ref={ref}
          className={cn(
            'w-full px-4 py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all duration-200 cursor-pointer shadow-sm',
            error && 'border-red-500 focus:ring-red-500/40 focus:border-red-500',
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
              {opt.label}
            </option>
          ))}
        </select>
        {error ? <p className="text-xs font-medium text-red-500 mt-1.5">{error}</p> : null}
      </div>
    );
  }
);

Select.displayName = 'Select';

