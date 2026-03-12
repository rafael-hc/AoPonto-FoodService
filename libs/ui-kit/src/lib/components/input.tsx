import * as React from 'react'
import { cn } from '../utils/cn'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-1">
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-sm',
            error
              ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
              : 'border-slate-300 focus:ring-orange-500/20 focus:border-orange-500',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-[10px] font-medium text-red-500 animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
