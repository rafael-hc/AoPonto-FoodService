import * as React from 'react'
import { cn } from '../utils/cn'

const TopbarRoot = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <header
    ref={ref}
    className={cn(
      'h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0 z-10 sticky top-0',
      className
    )}
    {...props}
  />
))
TopbarRoot.displayName = 'Topbar.Root'

const TopbarTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <div className="flex items-center gap-4">
    <h2
      ref={ref}
      className={cn(
        'text-xl font-bold text-slate-900 flex items-center gap-2 tracking-tight',
        className
      )}
      {...props}
    />
  </div>
))
TopbarTitle.displayName = 'Topbar.Title'

const TopbarActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center gap-4 ml-auto', className)}
    {...props}
  />
))
TopbarActions.displayName = 'Topbar.Actions'

export const Topbar = {
  Root: TopbarRoot,
  Title: TopbarTitle,
  Actions: TopbarActions
}
