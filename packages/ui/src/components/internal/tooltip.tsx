"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "../../lib/cn"

/**
 * Adapted from shadcn/ui's Tooltip (new-york style) — internal to
 * @lumen/ui, source for the public `ShadcnTooltip` export (Lumen's own
 * `Tooltip` name collides — see docs/shadcn-integration.md §7.1). Changes:
 * - imports resolve via this repo's existing relative-import convention
 * - `text-xs` replaced with Lumen's `label-md` type scale
 * - `bg-primary`/`text-primary-foreground` (shadcn's default brand-colored
 *   tooltip) replaced with `--color-background-inverse`/`--color-text-inverse`
 *   — matching Lumen's own hand-built `Tooltip.tsx`, which already uses
 *   this same dark-neutral-inverse look (`bg-neutral-800`/`text-neutral-white`)
 *   rather than a brand-colored one, sourced through the real semantic
 *   tokens instead of raw neutral color literals
 * - dropped the `animate-in`/`fade-in-0`/`zoom-in-95`/`slide-in-from-*`
 *   classes — same deferred-motion decision as everywhere else in this
 *   integration
 */
const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md bg-[var(--color-background-inverse)] px-3 py-1.5 text-label-md text-[var(--color-text-inverse)]",
        className
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
