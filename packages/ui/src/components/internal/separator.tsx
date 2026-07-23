import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "../../lib/cn"

/**
 * Adapted from shadcn/ui's Separator — internal to @lumen/ui. Only the
 * import path changed; `bg-border` already resolves through the bridge
 * (`--border` -> `var(--color-border-default)`), and there's no icon,
 * animation, or dark-mode-specific styling to adapt here. Re-fixed a
 * third time 2026-07-23 (batches 3, 4, and now 5 have each silently
 * reverted this file as a registryDependency of something newly
 * requested — a confirmed standing risk of `--overwrite`, not a one-off;
 * see docs/shadcn-integration.md §7.5).
 */
const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
