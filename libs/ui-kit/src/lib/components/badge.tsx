import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '../utils/cn'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-slate-100 text-slate-800 hover:bg-slate-200',
        primary:
          'border-transparent bg-orange-100 text-orange-700 hover:bg-orange-200',
        info: 'border-transparent bg-blue-100 text-blue-700 hover:bg-blue-200',
        warning:
          'border-transparent bg-amber-100 text-amber-700 hover:bg-amber-200',
        success:
          'border-transparent bg-emerald-100 text-emerald-700 hover:bg-emerald-200',
        destructive:
          'border-transparent bg-red-100 text-red-700 hover:bg-red-200',
        outline: 'border-slate-200 text-slate-600 hover:bg-slate-50'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      />
    )
  }
)
Badge.displayName = 'Badge'

export { Badge, badgeVariants }
