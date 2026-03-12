import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '../utils/cn'

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
          'flex-1 h-full w-full bg-transparent text-sm placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
InputControl.displayName = 'Input.Control'

export interface InputIconProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const InputIcon = React.forwardRef<HTMLDivElement, InputIconProps>(
  ({ className, children, ...props }, ref) => {
    return (
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
    )
  }
)
InputIcon.displayName = 'Input.Icon'

export interface InputLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const InputLabel = React.forwardRef<HTMLLabelElement, InputLabelProps>(
  ({ className, ...props }, ref) => {
    return (
      // biome-ignore lint/a11y/noLabelWithoutControl: Controle é associado pelo consumidor via htmlFor
      <label
        ref={ref}
        className={cn(
          'text-[10px] font-bold text-slate-400 uppercase flex items-center gap-2 mb-1.5',
          className
        )}
        {...props}
      />
    )
  }
)
InputLabel.displayName = 'Input.Label'

export interface InputMessageProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const InputMessage = React.forwardRef<HTMLParagraphElement, InputMessageProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(
          'text-[10px] font-medium text-red-500 animate-in fade-in slide-in-from-top-1 mt-1',
          className
        )}
        {...props}
      />
    )
  }
)
InputMessage.displayName = 'Input.Message'

export interface InputWrapperProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const InputWrapper = React.forwardRef<HTMLDivElement, InputWrapperProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('w-full flex flex-col', className)}
        {...props}
      />
    )
  }
)
InputWrapper.displayName = 'Input.Wrapper'

// Componente legado para compatibilidade (Input simples antigo) - Pode ser deprecado no futuro
export interface InputLegacyProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

const InputLegacy = React.forwardRef<HTMLInputElement, InputLegacyProps>(
  ({ className, type, error, disabled, ...props }, ref) => {
    return (
      <InputWrapper>
        <InputRoot error={!!error} disabled={disabled} className={className}>
          <InputControl type={type} disabled={disabled} ref={ref} {...props} />
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
  Label: InputLabel,
  Message: InputMessage,
  Wrapper: InputWrapper
})
