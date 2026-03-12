import * as React from "react"
import { cn } from "../utils/cn"

const AvatarRoot = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-slate-100 border border-slate-200 shadow-sm", className)}
      {...props}
    />
  )
)
AvatarRoot.displayName = "Avatar.Root"

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  onLoadingStatusChange?: (status: "idle" | "loading" | "loaded" | "error") => void
}

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, alt = "", ...props }, ref) => (
    <img
      ref={ref}
      alt={alt}
      className={cn("aspect-square h-full w-full object-cover", className)}
      {...props}
    />
  )
)
AvatarImage.displayName = "Avatar.Image"

const AvatarFallback = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-slate-100 text-slate-500 font-medium",
        className
      )}
      {...props}
    />
  )
)
AvatarFallback.displayName = "Avatar.Fallback"

export const Avatar = {
  Root: AvatarRoot,
  Image: AvatarImage,
  Fallback: AvatarFallback
}
