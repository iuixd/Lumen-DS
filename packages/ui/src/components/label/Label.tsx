import type { ComponentProps } from "react";

import { Label as InternalLabel } from "../internal/label";

/**
 * Label, sourced from shadcn/ui (Radix Label) and adapted to Lumen's
 * token system — see packages/ui/src/components/internal/label.tsx for
 * the adaptation notes. This public module is the only supported import
 * path; the internal implementation may change without notice.
 */
export type LabelProps = ComponentProps<typeof InternalLabel>;
export function Label(props: LabelProps) {
  return <InternalLabel {...props} />;
}
