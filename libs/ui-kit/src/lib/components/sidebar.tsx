import * as React from 'react'
import { cn } from '../utils/cn'

const SidebarRoot = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <aside
    ref={ref}
    className={cn(
      'w-64 bg-white border-r border-slate-200 flex flex-col z-20 shrink-0',
      className
    )}
    {...props}
  />
))
SidebarRoot.displayName = 'Sidebar.Root'

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'p-6 flex items-center gap-3 border-b border-slate-100',
      className
    )}
    {...props}
  />
))
SidebarHeader.displayName = 'Sidebar.Header'

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    className={cn(
      'flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar',
      className
    )}
    {...props}
  />
))
SidebarContent.displayName = 'Sidebar.Content'

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 mt-2 px-3',
      className
    )}
    {...props}
  />
))
SidebarGroupLabel.displayName = 'Sidebar.GroupLabel'

interface SidebarItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
}

const SidebarItem = React.forwardRef<HTMLButtonElement, SidebarItemProps>(
  ({ className, active, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer',
        active
          ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10 font-medium'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
        className
      )}
      {...props}
    />
  )
)
SidebarItem.displayName = 'Sidebar.Item'

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('p-4 border-t border-slate-100', className)}
    {...props}
  />
))
SidebarFooter.displayName = 'Sidebar.Footer'

export const Sidebar = {
  Root: SidebarRoot,
  Header: SidebarHeader,
  Content: SidebarContent,
  GroupLabel: SidebarGroupLabel,
  Item: SidebarItem,
  Footer: SidebarFooter
}
