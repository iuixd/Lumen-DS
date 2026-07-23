import type { ComponentProps } from "react";

import { Separator as InternalSeparator } from "../internal/separator";

/**
 * Separator, sourced from shadcn/ui (Radix Separator) and adapted to
 * Lumen's token system — see packages/ui/src/components/internal/separator.tsx
 * for the adaptation notes. This public module is the only supported import
 * path; the internal implementation may change without notice.
 */
export type SeparatorProps = ComponentProps<typeof InternalSeparator>;
export function Separator(props: SeparatorProps) {
  return <InternalSeparator {...props} />;
}
