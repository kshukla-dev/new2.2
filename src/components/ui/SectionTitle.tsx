import * as React from "react"
import { cn } from "@/lib/utils"

export interface SectionTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  description?: string
  align?: "left" | "center" | "right"
}

const SectionTitle = React.forwardRef<HTMLDivElement, SectionTitleProps>(
  ({ className, title, subtitle, description, align = "left", ...props }, ref) => {
    const alignments = {
      left: "left-align",
      center: "center-align",
      right: "right-align",
    }
    const alignmentClass = alignments[align]
    const descriptionMarginClass = align === "center" ? "mx-auto" : align === "right" ? "ml-auto" : "mr-auto"

    return (
      <div ref={ref} className={cn("mb-6", alignmentClass, className)} {...props}>
        <h2 className={cn("section-title", alignmentClass)}>
          {title}
        </h2>
        {description && (
          <p className={cn("section-desc", alignmentClass, descriptionMarginClass)}>
            {description}
          </p>
        )}
      </div>
    )
  }
)
SectionTitle.displayName = "SectionTitle"

export { SectionTitle }

