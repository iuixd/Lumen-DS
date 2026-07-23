import type { ComponentProps } from "react";

import { Progress as InternalProgress } from "../internal/progress";

/**
 * Progress, sourced from shadcn/ui (Radix Progress) and adapted to Lumen's
 * token system — see packages/ui/src/components/internal/progress.tsx for
 * the adaptation notes. This public module is the only supported import
 * path; the internal implementation may change without notice.
 */
export type ProgressProps = ComponentProps<typeof InternalProgress>;
export function Progress(props: ProgressProps) {
  return <InternalProgress {...props} />;
}
