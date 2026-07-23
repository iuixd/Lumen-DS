import type { ComponentProps } from "react";

import { Button as InternalButton, buttonVariants } from "../internal/button";

/**
 * ShadcnButton, sourced from shadcn/ui and adapted to Lumen's token
 * system — see packages/ui/src/components/internal/button.tsx for the
 * adaptation notes. Exported under a `Shadcn`-prefixed name because
 * Lumen's own `Button` already fills this role (see
 * docs/shadcn-integration.md §7.1); use Lumen's `Button` for direct
 * product use, this is provided for parity with the bulk shadcn adoption
 * effort only. This public module is the only supported import path; the
 * internal implementation may change without notice.
 */
export type ShadcnButtonProps = ComponentProps<typeof InternalButton>;
export function ShadcnButton(props: ShadcnButtonProps) {
  return <InternalButton {...props} />;
}

export { buttonVariants as shadcnButtonVariants };
