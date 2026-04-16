import * as LabelPrimitive from '@radix-ui/react-label'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '../utils/cn'

const labelVariants = cva(
  'text-[10px] font-bold text-slate-400 uppercase flex items-center gap-2 mb-1.5 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 transition-colors'
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

const inputRootVariants = cva(
  'flex w-full items-center rounded-md border bg-white px-3 h-10 transition-all shadow-sm focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500 overflow-hidden',
  {
    variants: {
      error: {
        true: 'border-red-500 focus-within:ring-red-500/20 focus-within:border-red-500',
        false: 'border-slate-300'
      },
      disabled: {
        true: 'cursor-not-allowed opacity-50 bg-slate-50',
        false: ''
      }
    },
    defaultVariants: {
      error: false,
      disabled: false
    }
  }
)

export interface InputRootProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof inputRootVariants> {
  error?: boolean
  disabled?: boolean
}

const InputRoot = React.forwardRef<HTMLDivElement, InputRootProps>(
  ({ className, error, disabled, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(inputRootVariants({ error, disabled }), className)}
        {...props}
      />
    )
  }
)
InputRoot.displayName = 'Input.Root'

export interface InputControlProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputControl = React.forwardRef<HTMLInputElement, InputControlProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'peer flex-1 h-full w-full bg-transparent text-sm font-bold text-slate-700 placeholder:text-slate-400 placeholder:font-medium focus:outline-none disabled:cursor-not-allowed',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
InputControl.displayName = 'Input.Control'

const InputIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex items-center justify-center text-slate-400 mr-2',
      className
    )}
    {...props}
  >
    {children}
  </div>
))
InputIcon.displayName = 'Input.Icon'

const InputMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'text-[10px] font-medium text-red-500 animate-in fade-in slide-in-from-top-1 mt-1',
      className
    )}
    {...props}
  />
))
InputMessage.displayName = 'Input.Message'

const InputWrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('w-full flex flex-col', className)} {...props} />
))
InputWrapper.displayName = 'Input.Wrapper'

// Componente legado para compatibilidade (Input simples antigo)
export interface InputLegacyProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
}

const InputLegacy = React.forwardRef<HTMLInputElement, InputLegacyProps>(
  ({ className, type, error, label, disabled, id, ...props }, ref) => {
    return (
      <InputWrapper>
        {label && <Label htmlFor={id}>{label}</Label>}
        <InputRoot error={!!error} disabled={disabled} className={className}>
          <InputControl
            id={id}
            type={type}
            disabled={disabled}
            ref={ref}
            {...props}
          />
        </InputRoot>
        {error && <InputMessage>{error}</InputMessage>}
      </InputWrapper>
    )
  }
)
InputLegacy.displayName = 'Input'

export const Input = Object.assign(InputLegacy, {
  Root: InputRoot,
  Control: InputControl,
  Icon: InputIcon,
  Label: Label,
  Message: InputMessage,
  Wrapper: InputWrapper
})

export { Label }
