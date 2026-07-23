"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "../../lib/cn"

/**
 * Adapted from shadcn/ui's Slider (new-york style) — internal to
 * @lumen/ui. Changes from the generated source:
 * - imports resolve via this repo's existing relative-import convention
 * - track's `bg-primary/20` and thumb's `border-primary/50` replaced with
 *   solid bridged colors (`bg-muted` for the unfilled track, matching
 *   Progress's own track; `border-primary` for the thumb): this repo's
 *   bridged colors are raw hex, not the `<alpha-value>`-templated HSL
 *   channels Tailwind's opacity modifiers are designed around
 * - fixes a real bug in the generated source: it hardcodes a single
 *   `<SliderPrimitive.Thumb>`, so a range slider (`value`/`defaultValue`
 *   with more than one number) only gets one draggable handle even though
 *   Radix's own primitive fully supports one thumb per value — renders one
 *   `Thumb` per entry in `value`/`defaultValue` instead
 */
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, value, defaultValue, ...props }, ref) => {
  const values = value ?? defaultValue ?? [0];
  return (
    <SliderPrimitive.Root
      ref={ref}
      value={value}
      defaultValue={defaultValue}
      className={cn("relative flex w-full touch-none select-none items-center", className)}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-muted">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      {values.map((_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          className="block h-4 w-4 rounded-full border border-primary bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  );
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
