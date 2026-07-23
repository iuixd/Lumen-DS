import type { ComponentProps } from "react";

import { RadioGroup as InternalRadioGroup, RadioGroupItem as InternalRadioGroupItem } from "../internal/radio-group";

/**
 * RadioGroup, sourced from shadcn/ui (Radix RadioGroup) and adapted to
 * Lumen's token system — see packages/ui/src/components/internal/radio-group.tsx
 * for the adaptation notes and why this keeps its own plain name (no
 * collision with Lumen's own `Radio`). This public module is the only
 * supported import path; the internal implementation may change without
 * notice.
 */
export type RadioGroupProps = ComponentProps<typeof InternalRadioGroup>;
export function RadioGroup(props: RadioGroupProps) {
  return <InternalRadioGroup {...props} />;
}

export const RadioGroupItem = InternalRadioGroupItem;
