import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { Circle } from 'lucide-react'
import * as React from 'react'
import { cn } from '../utils/cn'

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid gap-2', className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'aspect-square h-5 w-5 rounded-full border-2 border-slate-200 text-orange-600 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/20 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-orange-500 data-[state=checked]:bg-orange-500 transition-all hover:border-orange-300',
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2 w-2 fill-white text-white" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export interface RadioGroupSimpleProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  label?: string
  error?: string
  options: { value: string; label: string; description?: string }[]
}

const RadioGroupSimple = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupSimpleProps
>(({ className, label, error, options, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      {label && (
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-0.5">
          {label}
        </span>
      )}
      <RadioGroup
        ref={ref}
        className={cn('flex flex-row flex-wrap gap-4', className)}
        {...props}
      >
        {options.map((option) => (
          // biome-ignore lint/a11y/noLabelWithoutControl: RadioGroupItem é o controle
          <label
            key={option.value}
            className="flex items-center gap-3 cursor-pointer group bg-white border border-slate-200 px-4 py-3 rounded-xl transition-all hover:border-orange-200 hover:bg-orange-50/10 min-w-[140px] shadow-sm data-[state=checked]:border-orange-500 data-[state=checked]:ring-2 data-[state=checked]:ring-orange-500/10"
            data-state={props.value === option.value ? 'checked' : 'unchecked'}
          >
            <RadioGroupItem
              value={option.value}
              id={`${props.id}-${option.value}`}
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-700 leading-tight">
                {option.label}
              </span>
              {option.description && (
                <span className="text-[10px] font-medium text-slate-400 leading-none">
                  {option.description}
                </span>
              )}
            </div>
          </label>
        ))}
      </RadioGroup>
      {error && (
        <span className="text-[10px] font-medium text-red-500 ml-1">
          {error}
        </span>
      )}
    </div>
  )
})
RadioGroupSimple.displayName = 'RadioGroupSimple'

export { RadioGroup, RadioGroupItem, RadioGroupSimple }
