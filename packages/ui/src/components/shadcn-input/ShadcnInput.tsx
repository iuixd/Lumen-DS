import type { ComponentProps } from "react";

import { Input as InternalInput } from "../internal/input";

/**
 * ShadcnInput, sourced from shadcn/ui and adapted to Lumen's token
 * system — see packages/ui/src/components/internal/input.tsx for the
 * adaptation notes. Exported under a `Shadcn`-prefixed name because
 * Lumen's own `Input` already fills this role (see
 * docs/shadcn-integration.md §7.1). This public module is the only
 * supported import path; the internal implementation may change without
 * notice.
 */
export type ShadcnInputProps = ComponentProps<typeof InternalInput>;
export function ShadcnInput(props: ShadcnInputProps) {
  return <InternalInput {...props} />;
}
