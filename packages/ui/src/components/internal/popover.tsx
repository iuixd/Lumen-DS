import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "../../lib/cn"

/**
 * Adapted from shadcn/ui's Popover (new-york style) — internal to
 * @lumen/ui. Changes from the generated source:
 * - imports resolve via this repo's existing relative-import convention
 * - `shadow-md` replaced with the bridged `--shadow-menu-default` (same
 *   overlay-elevation token Command's palette uses)
 * - dropped the `animate-in`/`fade-in-0`/`zoom-in-95`/`slide-in-from-*`
 *   classes: they require the `tailwindcss-animate` plugin and have no
 *   Lumen motion-token backing — open/close is instant, the same
 *   deferred-motion decision already made for Command/Accordion
 */
const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverAnchor = PopoverPrimitive.Anchor

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-[var(--shadow-menu-default)] outline-none",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
