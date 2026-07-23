import type { ComponentProps } from "react";

import { Kbd as InternalKbd, KbdGroup as InternalKbdGroup } from "../internal/kbd";

/**
 * Kbd, sourced from shadcn/ui and adapted to Lumen's token system — see
 * packages/ui/src/components/internal/kbd.tsx for the adaptation notes.
 * This public module is the only supported import path; the internal
 * implementation may change without notice.
 */
export type KbdProps = ComponentProps<typeof InternalKbd>;
export function Kbd(props: KbdProps) {
  return <InternalKbd {...props} />;
}

export const KbdGroup = InternalKbdGroup;
