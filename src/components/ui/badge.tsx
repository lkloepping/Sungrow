import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
        {
          "bg-blue-600 text-white": variant === "default",
          "bg-slate-800 text-slate-50": variant === "secondary",
          "bg-red-600 text-white": variant === "destructive",
          "border border-slate-800": variant === "outline",
          "bg-green-600 text-white": variant === "success",
          "bg-yellow-500 text-slate-900": variant === "warning",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }

