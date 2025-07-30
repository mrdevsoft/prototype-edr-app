import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
          {
            "bg-green-600 text-white hover:bg-green-700": variant === 'default',
            "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50": variant === 'outline',
            "hover:bg-gray-100 text-gray-900": variant === 'ghost',
            "bg-red-600 text-white hover:bg-red-700": variant === 'destructive',
          },
          {
            "h-10 py-2 px-4": size === 'default',
            "h-9 px-3 rounded-md": size === 'sm',
            "h-11 px-8 rounded-md": size === 'lg',
            "h-10 w-10": size === 'icon',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button } 