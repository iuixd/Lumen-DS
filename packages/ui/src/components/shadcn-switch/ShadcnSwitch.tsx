import type { ComponentProps } from "react";

import { Switch as InternalSwitch } from "../internal/switch";

/**
 * ShadcnSwitch, sourced from shadcn/ui (Radix Switch) and adapted to
 * Lumen's token system — see packages/ui/src/components/internal/switch.tsx
 * for the adaptation notes. Exported under a `Shadcn`-prefixed name
 * because Lumen's own `Switch` already fills this role (see
 * docs/shadcn-integration.md §7.1). This public module is the only
 * supported import path; the internal implementation may change without
 * notice.
 */
export type ShadcnSwitchProps = ComponentProps<typeof InternalSwitch>;
export function ShadcnSwitch(props: ShadcnSwitchProps) {
  return <InternalSwitch {...props} />;
}
