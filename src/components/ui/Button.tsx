import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  href?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      children,
      href,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
    
    const variants = {
      default:
        "bg-primary text-primary-foreground hover:bg-primary/90",
      outline:
        "border border-input bg-background hover:bg-secondary hover:text-secondary-foreground hover:border-secondary",
      ghost: "hover:bg-secondary/10 hover:text-secondary",
      link: "text-primary underline-offset-4 hover:underline hover:text-secondary",
    }

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 px-3 rounded-md",
      lg: "h-11 px-8 rounded-md",
      icon: "h-10 w-10",
    }

    const buttonClasses = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      className
    )

    if (href) {
      return (
        <Link href={href} className={buttonClasses}>
          {children}
        </Link>
      )
    }

    return (
      <button
        className={buttonClasses}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }

