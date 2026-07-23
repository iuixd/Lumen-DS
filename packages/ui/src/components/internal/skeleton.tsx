import type { HTMLAttributes } from "react"
import { cn } from "../../lib/cn"

/**
 * Adapted from shadcn/ui's Skeleton — internal to @lumen/ui. `bg-primary/10`
 * replaced with the solid bridged `bg-muted`: this repo's bridged colors
 * resolve to raw hex, not the `<alpha-value>`-templated HSL channels
 * opacity modifiers rely on, and `muted` is already the right "faint
 * placeholder surface" tone on its own. `animate-pulse` is core Tailwind
 * (no plugin), and — unlike the enter/exit transitions deferred elsewhere
 * in this integration — is the component's actual loading affordance, not
 * a token-backed motion value, so it's kept as-is.
 */
function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />
}

export { Skeleton }
