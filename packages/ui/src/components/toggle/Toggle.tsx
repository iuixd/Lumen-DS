import type { ComponentProps } from "react";

import { Toggle as InternalToggle, toggleVariants } from "../internal/toggle";

/**
 * Toggle, sourced from shadcn/ui (Radix Toggle) and adapted to Lumen's
 * token system — see packages/ui/src/components/internal/toggle.tsx for
 * the adaptation notes. This public module is the only supported import
 * path; the internal implementation may change without notice.
 */
export type ToggleProps = ComponentProps<typeof InternalToggle>;
export function Toggle(props: ToggleProps) {
  return <InternalToggle {...props} />;
}

export { toggleVariants };
