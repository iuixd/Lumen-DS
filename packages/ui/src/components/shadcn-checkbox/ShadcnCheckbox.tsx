import type { ComponentProps } from "react";

import { Checkbox as InternalCheckbox } from "../internal/checkbox";

/**
 * ShadcnCheckbox, sourced from shadcn/ui (Radix Checkbox) and adapted to
 * Lumen's token system — see packages/ui/src/components/internal/checkbox.tsx
 * for the adaptation notes. Exported under a `Shadcn`-prefixed name
 * because Lumen's own `Checkbox` already fills this role (see
 * docs/shadcn-integration.md §7.1). This public module is the only
 * supported import path; the internal implementation may change without
 * notice.
 */
export type ShadcnCheckboxProps = ComponentProps<typeof InternalCheckbox>;
export function ShadcnCheckbox(props: ShadcnCheckboxProps) {
  return <InternalCheckbox {...props} />;
}
