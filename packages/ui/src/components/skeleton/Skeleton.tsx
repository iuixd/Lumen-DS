import type { ComponentProps } from "react";

import { Skeleton as InternalSkeleton } from "../internal/skeleton";

/**
 * Skeleton, sourced from shadcn/ui and adapted to Lumen's token system —
 * see packages/ui/src/components/internal/skeleton.tsx for the adaptation
 * notes. This public module is the only supported import path; the
 * internal implementation may change without notice.
 */
export type SkeletonProps = ComponentProps<typeof InternalSkeleton>;
export function Skeleton(props: SkeletonProps) {
  return <InternalSkeleton {...props} />;
}
