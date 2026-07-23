"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { DotIcon } from "../../icons/generated/DotIcon"

import { cn } from "../../lib/cn"

/**
 * Adapted from shadcn/ui's RadioGroup (new-york style) — internal to
 * @lumen/ui, exported publicly as plain `RadioGroup` (no collision:
 * Lumen's own primitive is named `Radio`, singular). Changes:
 * - imports resolve via this repo's existing relative-import convention
 * - lucide-react's `Circle` (rendered with `fill-primary`) replaced with
 *   Lumen's own generated `DotIcon`, a stroke-based icon — recolored via
 *   `text-primary` (sets `currentColor`) instead of `fill-primary`
 * - bare `shadow` dropped — no shadow precedent on Lumen's own `Radio.tsx`
 */
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn("grid gap-2", className)} {...props} ref={ref} />
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <DotIcon className="h-3.5 w-3.5 text-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
