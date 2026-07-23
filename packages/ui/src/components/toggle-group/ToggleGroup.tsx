import type { ComponentProps } from "react";

import { ToggleGroup as InternalToggleGroup, ToggleGroupItem as InternalToggleGroupItem } from "../internal/toggle-group";

/**
 * ToggleGroup, sourced from shadcn/ui (Radix ToggleGroup) and adapted to
 * Lumen's token system — see packages/ui/src/components/internal/toggle-group.tsx
 * for the adaptation notes and its distinction from `SegmentedControl`.
 * This public module is the only supported import path; the internal
 * implementation may change without notice.
 */
export type ToggleGroupProps = ComponentProps<typeof InternalToggleGroup>;
export function ToggleGroup(props: ToggleGroupProps) {
  return <InternalToggleGroup {...props} />;
}

export const ToggleGroupItem = InternalToggleGroupItem;
