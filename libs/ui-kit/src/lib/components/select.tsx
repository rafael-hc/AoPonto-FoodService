import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../utils/cn'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label 
            htmlFor={props.id} 
            className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-0.5"
          >
            {label}
          </label>
        )}
        <div className="relative group">
          <select
            {...props}
            ref={ref}
            className={cn(
              'w-full h-10 px-4 bg-white border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-700 transition-all appearance-none outline-none',
              'hover:border-orange-200 group-focus:border-orange-500 group-focus:ring-2 group-focus:ring-orange-500/10',
              error && 'border-red-500 hover:border-red-600',
              className
            )}
          >
            {children}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-orange-500 transition-colors">
            <ChevronDown size={14} strokeWidth={3} />
          </div>
        </div>
        {error && <span className="text-[10px] font-medium text-red-500 ml-1">{error}</span>}
      </div>
    )
  }
)

Select.displayName = 'Select'
