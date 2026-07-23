import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/cn"

/**
 * Adapted from shadcn/ui's Alert (new-york style) — internal to @lumen/ui.
 * Changes from the generated source:
 * - imports resolve via this repo's existing relative-import convention
 * - body text uses Lumen's `body-sm` type scale instead of bare `text-sm`
 * - the destructive variant drops its `dark:border-destructive` class (this
 *   repo has no Tailwind `dark:` usage anywhere — `--destructive` already
 *   resolves correctly per-theme through the bridge) and its `/50` opacity
 *   modifier on `border-destructive`: this repo's bridged colors resolve to
 *   raw hex values, not the `<alpha-value>`-templated HSL channels shadcn's
 *   own defaults use, so Tailwind opacity modifiers on them aren't reliable
 *   — uses the solid bridged border color instead
 */

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-body-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive text-destructive [&>svg]:text-destructive"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  >
    {children}
  </h5>
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("[&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
