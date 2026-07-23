"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "../../icons/generated/ChevronDownIcon"

import { cn } from "../../lib/cn"

/**
 * Adapted from shadcn/ui's Accordion (new-york style), generated via
 * `pnpm dlx shadcn@latest add accordion` — internal to @lumen/ui. Changes
 * from the generated source, matching the same adaptations already applied
 * to Command/Dialog (see docs/shadcn-integration.md):
 * - imports resolve via this repo's existing relative-import convention
 * - lucide-react's `ChevronDown` replaced with Lumen's own generated
 *   `ChevronDownIcon`
 * - trigger/content text uses Lumen's `body-md` type scale instead of
 *   Tailwind's bare `text-sm`
 * - the CLI's own tailwind.config.cjs edit (which added `darkMode: ["class"]`
 *   and hardcoded `accordion-down`/`accordion-up` keyframes at a fixed 0.2s)
 *   was reverted: this repo has no Tailwind `dark:` usage anywhere (dark
 *   mode runs entirely through Lumen's `[data-theme]` CSS-variable swap),
 *   and Lumen has no motion/duration tokens yet to back a hardcoded
 *   duration — expand/collapse is instant for now, same deferred-motion
 *   decision already made for Command's dialog
 */

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 text-body-md font-medium text-left transition-colors hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    // No animate-accordion-up/down classes (see header comment) means Radix's
    // Presence has no exit animation to wait for — it unmounts this from the
    // DOM synchronously on collapse, so no extra `hidden`/data-state styling
    // is needed here.
    className="overflow-hidden text-body-md"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
