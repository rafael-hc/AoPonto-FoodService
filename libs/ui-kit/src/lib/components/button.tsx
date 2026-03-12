import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '../utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center cursor-pointer whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-orange-600 text-white hover:bg-orange-700 shadow-md shadow-orange-600/10',
        secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200',
        outline:
          'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
      },
      size: {
        sm: 'h-9 px-3 text-xs rounded-lg',
        md: 'h-10 px-4 py-2 rounded-xl',
        lg: 'h-11 px-8 text-base rounded-xl'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
