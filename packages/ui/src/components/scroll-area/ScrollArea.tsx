import type { ComponentProps } from "react";

import { ScrollArea as InternalScrollArea, ScrollBar as InternalScrollBar } from "../internal/scroll-area";

/**
 * ScrollArea, sourced from shadcn/ui (Radix ScrollArea) and adapted to
 * Lumen's token system — see packages/ui/src/components/internal/scroll-area.tsx
 * for the adaptation notes. This public module is the only supported
 * import path; the internal implementation may change without notice.
 */
export type ScrollAreaProps = ComponentProps<typeof InternalScrollArea>;
export function ScrollArea(props: ScrollAreaProps) {
  return <InternalScrollArea {...props} />;
}

export const ScrollBar = InternalScrollBar;
