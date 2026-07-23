import * as React from "react"

import { cn } from "../../lib/cn"

/**
 * Adapted from shadcn/ui's Textarea — internal to @lumen/ui. Changes:
 * - imports resolve via this repo's existing relative-import convention
 * - `text-base md:text-sm` replaced with Lumen's `input-md` type scale,
 *   matching Input.tsx's own established `text-input-{sm,md,lg}` convention
 * - `shadow-sm` dropped: Input.tsx has no shadow of its own on its field
 *   states, so this introduces no new visual precedent
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-input-md placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
