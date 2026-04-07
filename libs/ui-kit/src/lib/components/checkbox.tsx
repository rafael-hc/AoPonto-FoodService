import * as React from 'react'
import { Check } from 'lucide-react'
import { cn } from '../utils/cn'

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  description?: string
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, ...props }, ref) => {
    const [checked, setChecked] = React.useState(props.defaultChecked || props.checked || false)

    // Sincroniza se o componente for controlado
    React.useEffect(() => {
      if (props.checked !== undefined) {
        setChecked(props.checked)
      }
    }, [props.checked])

    return (
      <label className={cn('flex items-start gap-3 cursor-pointer group select-none', className)}>
        <div className="relative flex items-center h-5 mt-0.5">
          <input
            {...props}
            type="checkbox"
            ref={ref}
            className="peer sr-only"
            onChange={(e) => {
              setChecked(e.target.checked)
              props.onChange?.(e)
            }}
          />
          <div className={cn(
            'w-5 h-5 rounded-md border-2 transition-all duration-200 border-slate-200 bg-white shadow-sm',
            'peer-checked:bg-orange-500 peer-checked:border-orange-500 group-hover:border-orange-200',
            'peer-focus:ring-2 peer-focus:ring-orange-500/20'
          )}>
            <div className={cn(
               'absolute inset-0 flex items-center justify-center text-white transition-opacity duration-200 scale-75 opacity-0',
               checked && 'opacity-100 scale-100'
            )}>
              <Check size={14} strokeWidth={4} />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-0.5">
          {label && (
            <span className="text-sm font-bold text-slate-700 leading-tight group-hover:text-slate-900 transition-colors">
              {label}
            </span>
          )}
          {description && (
            <span className="text-[10px] font-medium text-slate-400 leading-relaxed max-w-[280px]">
              {description}
            </span>
          )}
        </div>
      </label>
    )
  }
)

Checkbox.displayName = 'Checkbox'
