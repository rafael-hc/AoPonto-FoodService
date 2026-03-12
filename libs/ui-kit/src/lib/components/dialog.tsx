import { X } from 'lucide-react'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { cn } from '../utils/cn'

interface DialogContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  onPointerDownOutside?: (e: PointerEvent) => void
}

const DialogContext = React.createContext<DialogContextValue | undefined>(
  undefined
)

function useDialog() {
  const context = React.useContext(DialogContext)
  if (!context) {
    throw new Error('Dialog components must be used within a Dialog.Root')
  }
  return context
}

export interface DialogRootProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onPointerDownOutside?: (e: PointerEvent) => void
}

export const DialogRoot = ({
  children,
  open: controlledOpen,
  onOpenChange,
  onPointerDownOutside
}: DialogRootProps) => {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const open = controlledOpen ?? internalOpen

  const setOpen = React.useCallback(
    (value: boolean) => {
      if (controlledOpen === undefined) setInternalOpen(value)
      onOpenChange?.(value)
    },
    [controlledOpen, onOpenChange]
  )

  // Fecha o modal ao apertar Esc
  React.useEffect(() => {
    if (!open) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, setOpen])

  return (
    <DialogContext.Provider value={{ open, setOpen, onPointerDownOutside }}>
      {children}
    </DialogContext.Provider>
  )
}

export const DialogPortal = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) return null

  return ReactDOM.createPortal(children, document.body)
}

export const DialogOverlay = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { open, setOpen, onPointerDownOutside } = useDialog()

  if (!open) return null

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.target === e.currentTarget) {
      if (onPointerDownOutside) {
        onPointerDownOutside(e.nativeEvent as PointerEvent)
      } else {
        setOpen(false)
      }
    }
  }

  return (
    <div
      ref={ref}
      className={cn(
        'fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300',
        className
      )}
      onPointerDown={handlePointerDown}
      {...props}
    />
  )
})
DialogOverlay.displayName = 'Dialog.Overlay'

export const DialogContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { open } = useDialog()

  if (!open) return null

  return (
    <div
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-slate-200 bg-white p-6 shadow-2xl duration-200 animate-in fade-in zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95 sm:rounded-2xl',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
DialogContent.displayName = 'Dialog.Content'

export const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-1.5 text-center sm:text-left',
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = 'Dialog.Header'

export const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = 'Dialog.Footer'

export const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      'text-lg font-bold leading-none tracking-tight text-slate-900',
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = 'Dialog.Title'

export const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-slate-500 font-medium', className)}
    {...props}
  />
))
DialogDescription.displayName = 'Dialog.Description'

export const DialogClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { setOpen } = useDialog()
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        'absolute right-4 top-4 rounded-lg p-2 opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 data-[state=open]:text-slate-500 cursor-pointer hover:bg-slate-100',
        className
      )}
      onClick={() => setOpen(false)}
      {...props}
    >
      <X className="h-4 w-4" />
      <span className="sr-only">Fechar</span>
    </button>
  )
})
DialogClose.displayName = 'Dialog.Close'

export const Dialog = {
  Root: DialogRoot,
  Portal: DialogPortal,
  Overlay: DialogOverlay,
  Content: DialogContent,
  Header: DialogHeader,
  Footer: DialogFooter,
  Title: DialogTitle,
  Description: DialogDescription,
  Close: DialogClose
}
