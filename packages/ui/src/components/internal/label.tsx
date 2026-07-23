import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/cn"

/**
 * Adapted from shadcn/ui's Label (new-york style) — internal to
 * @lumen/ui. `text-sm` replaced with `label-lg`, matching Lumen's own
 * existing form-field label convention (see FormField.tsx's `<label>`).
 * No existing Lumen "Label" component to collide with — exported publicly
 * as plain `Label`, not `Shadcn`-prefixed.
 */
const labelVariants = cva("text-label-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70")

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />)
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
