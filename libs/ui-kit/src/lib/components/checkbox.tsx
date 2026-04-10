import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import * as React from 'react'
import { cn } from '../utils/cn'

const CheckboxRoot = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-5 w-5 shrink-0 rounded-md border-2 border-slate-200 bg-white shadow-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/20 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 transition-all duration-200',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-white')}
    >
      <Check size={14} strokeWidth={4} className="scale-90" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
CheckboxRoot.displayName = CheckboxPrimitive.Root.displayName

// Componente Wrapper para manter compatibilidade com a API atual de label/description
export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: string
  description?: string
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, label, description, ...props }, ref) => (
  // biome-ignore lint/a11y/noLabelWithoutControl: O CheckboxRoot é o controle
  <label className="flex items-start gap-3 cursor-pointer group select-none w-fit">
    <CheckboxRoot ref={ref} className={className} {...props} />
    {(label || description) && (
      <div className="flex flex-col gap-0.5 leading-none">
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
    )}
  </label>
))
Checkbox.displayName = 'Checkbox'

export { Checkbox, CheckboxRoot }
