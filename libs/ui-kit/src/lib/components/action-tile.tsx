import * as React from 'react'
import { cn } from '../utils/cn'

// --- Context ---
interface ActionTileContextValue {
  active: boolean
}

const ActionTileContext = React.createContext<
  ActionTileContextValue | undefined
>(undefined)

function useActionTile() {
  const context = React.useContext(ActionTileContext)
  if (!context) {
    throw new Error(
      'ActionTile components must be used within an ActionTile.Root'
    )
  }
  return context
}

// --- Components ---
export interface ActionTileRootProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
}

const ActionTileRoot = React.forwardRef<HTMLButtonElement, ActionTileRootProps>(
  ({ className, active = false, ...props }, ref) => (
    <ActionTileContext.Provider value={{ active }}>
      <button
        ref={ref}
        className={cn(
          'flex flex-col items-center justify-start gap-1.5 cursor-pointer p-2.5 rounded-xl transition-all min-w-[80px] group/btn border',
          active
            ? 'bg-orange-50 border-orange-200 shadow-sm text-orange-700'
            : 'bg-transparent border-transparent hover:bg-slate-50 hover:border-slate-200 text-slate-600',
          className
        )}
        {...props}
      />
    </ActionTileContext.Provider>
  )
)
ActionTileRoot.displayName = 'ActionTile.Root'

const ActionTileIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { active } = useActionTile()

  return (
    <div
      ref={ref}
      className={cn(
        'p-2 rounded-lg transition-colors',
        active
          ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
          : 'bg-slate-100 text-slate-500 group-hover/btn:bg-white group-hover/btn:shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
ActionTileIcon.displayName = 'ActionTile.Icon'

const ActionTileLabelGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-center flex items-center gap-1 mt-1', className)}
    {...props}
  />
))
ActionTileLabelGroup.displayName = 'ActionTile.LabelGroup'

const ActionTileLabel = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  const { active } = useActionTile()
  return (
    <span
      ref={ref}
      className={cn(
        'text-[11px] leading-tight',
        active ? 'font-bold' : 'font-medium',
        className
      )}
      {...props}
    />
  )
})
ActionTileLabel.displayName = 'ActionTile.Label'

const ActionTileShortcut = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  const { active } = useActionTile()
  return (
    <span
      ref={ref}
      className={cn(
        'text-[9px] font-bold px-1.5 rounded-md',
        active ? 'text-orange-700' : 'text-slate-400',
        className
      )}
      {...props}
    />
  )
})
ActionTileShortcut.displayName = 'ActionTile.Shortcut'

export const ActionTile = {
  Root: ActionTileRoot,
  Icon: ActionTileIcon,
  LabelGroup: ActionTileLabelGroup,
  Label: ActionTileLabel,
  Shortcut: ActionTileShortcut
}
