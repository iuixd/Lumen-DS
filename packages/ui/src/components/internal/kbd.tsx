import type { ComponentProps } from "react"
import { cn } from "../../lib/cn"

/**
 * Adapted from shadcn/ui's Kbd — internal to @lumen/ui. Changes:
 * - import path fixed to this repo's relative-import convention
 * - `text-xs` replaced with Lumen's `label-sm` type scale, matching the
 *   same size already used for Command's `CommandShortcut`
 * - dropped the `[[data-slot=tooltip-content]_&]:...` compatibility rule
 *   (targets nesting inside shadcn's own Tooltip, which hasn't been
 *   adopted — Lumen's existing hand-built `Tooltip` is unrelated) along
 *   with its `dark:` variant and `/20`/`/10` opacity modifiers on
 *   `bg-background`, none of which apply here
 */
function Kbd({ className, ...props }: ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "bg-muted text-muted-foreground pointer-events-none inline-flex h-5 w-fit min-w-5 select-none items-center justify-center gap-1 rounded-sm px-1 font-sans text-label-sm font-medium",
        "[&_svg:not([class*='size-'])]:size-3",
        className
      )}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }: ComponentProps<"div">) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }
