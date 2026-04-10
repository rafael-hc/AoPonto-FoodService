import * as React from 'react'
import { cn } from '../utils/cn'

const CardRoot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-3xl border border-slate-200 bg-white text-slate-950 shadow-sm transition-all',
      className
    )}
    {...props}
  />
))
CardRoot.displayName = 'Card.Root'

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6 md:p-8', className)}
    {...props}
  />
))
CardHeader.displayName = 'Card.Header'

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('font-bold leading-none tracking-tight text-slate-900', className)}
    {...props}
  />
))
CardTitle.displayName = 'Card.Title'

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-slate-500 font-medium', className)} {...props} />
))
CardDescription.displayName = 'Card.Description'

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 md:p-8 pt-0', className)} {...props} />
))
CardContent.displayName = 'Card.Content'

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 md:p-8 pt-0', className)}
    {...props}
  />
))
CardFooter.displayName = 'Card.Footer'

export const Card = {
  Root: CardRoot,
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter
}
