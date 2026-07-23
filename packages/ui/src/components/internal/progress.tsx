"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "../../lib/cn"

/**
 * Adapted from shadcn/ui's Progress — internal to @lumen/ui. Track color
 * `bg-primary/20` replaced with the solid bridged `bg-muted`: this repo's
 * bridged colors are raw hex, not the `<alpha-value>`-templated HSL
 * channels opacity modifiers rely on — `muted` is also the semantically
 * correct "unfilled track" tone on its own, distinct from the `bg-primary`
 * fill.
 *
 * Also fixes a real bug in the generated source: it destructured `value`
 * out of props to compute the indicator's inline-style position, but never
 * passed it back to `ProgressPrimitive.Root` — Radix never received a
 * value, so it fell back to `null` and never set `aria-valuenow` at all.
 * `value` is forwarded to `Root` below so Radix's own ARIA wiring works.
 */
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    value={value}
    className={cn("relative h-2 w-full overflow-hidden rounded-full bg-muted", className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
