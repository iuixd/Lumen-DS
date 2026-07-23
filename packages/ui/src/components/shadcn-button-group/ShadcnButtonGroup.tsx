import type { ComponentProps } from "react";

import {
  ButtonGroup as InternalButtonGroup,
  ButtonGroupSeparator as InternalButtonGroupSeparator,
  ButtonGroupText as InternalButtonGroupText,
  buttonGroupVariants
} from "../internal/button-group";

/**
 * ShadcnButtonGroup, sourced from shadcn/ui and adapted to Lumen's token
 * system — see packages/ui/src/components/internal/button-group.tsx for
 * the adaptation notes. Exported under a `Shadcn`-prefixed name because
 * Lumen's own `ButtonGroup` already fills this role (see
 * docs/shadcn-integration.md §7.1). This public module is the only
 * supported import path; the internal implementation may change without
 * notice.
 */
export type ShadcnButtonGroupProps = ComponentProps<typeof InternalButtonGroup>;
export function ShadcnButtonGroup(props: ShadcnButtonGroupProps) {
  return <InternalButtonGroup {...props} />;
}

export const ShadcnButtonGroupText = InternalButtonGroupText;
export const ShadcnButtonGroupSeparator = InternalButtonGroupSeparator;
export { buttonGroupVariants as shadcnButtonGroupVariants };
