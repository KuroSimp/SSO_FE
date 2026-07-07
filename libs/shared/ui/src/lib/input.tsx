import { forwardRef } from 'react';
import { cn } from './utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
  hasError?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, leftIcon, rightElement, hasError = false, ...props }, ref) => (
    <div className="relative">
      {leftIcon ? (
        <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
          {leftIcon}
        </div>
      ) : null}
      <input
        ref={ref}
        className={cn(
          'h-11 w-full rounded-xl border bg-white text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:outline-none focus:ring-4',
          leftIcon ? 'pl-10' : 'pl-3',
          rightElement ? 'pr-11' : 'pr-3',
          hasError
            ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
            : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100',
          className
        )}
        {...props}
      />
      {rightElement ? <div className="absolute inset-y-0 right-1 flex items-center">{rightElement}</div> : null}
    </div>
  )
);

Input.displayName = 'Input';
