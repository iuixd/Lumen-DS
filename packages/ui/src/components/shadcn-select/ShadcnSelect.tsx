import type { ComponentProps } from "react";

import {
  Select as InternalSelect,
  SelectContent as InternalSelectContent,
  SelectGroup as InternalSelectGroup,
  SelectItem as InternalSelectItem,
  SelectLabel as InternalSelectLabel,
  SelectScrollDownButton as InternalSelectScrollDownButton,
  SelectScrollUpButton as InternalSelectScrollUpButton,
  SelectSeparator as InternalSelectSeparator,
  SelectTrigger as InternalSelectTrigger,
  SelectValue as InternalSelectValue
} from "../internal/select";

/**
 * ShadcnSelect, sourced from shadcn/ui (Radix Select) and adapted to
 * Lumen's token system — see packages/ui/src/components/internal/select.tsx
 * for the adaptation notes. Exported under a `Shadcn`-prefixed name
 * because Lumen's own `Select` already fills this role (see
 * docs/shadcn-integration.md §7.1). This public module is the only
 * supported import path; the internal implementation may change without
 * notice.
 */
export type ShadcnSelectProps = ComponentProps<typeof InternalSelect>;
export function ShadcnSelect(props: ShadcnSelectProps) {
  return <InternalSelect {...props} />;
}

export const ShadcnSelectGroup = InternalSelectGroup;
export const ShadcnSelectValue = InternalSelectValue;
export const ShadcnSelectTrigger = InternalSelectTrigger;
export const ShadcnSelectContent = InternalSelectContent;
export const ShadcnSelectLabel = InternalSelectLabel;
export const ShadcnSelectItem = InternalSelectItem;
export const ShadcnSelectSeparator = InternalSelectSeparator;
export const ShadcnSelectScrollUpButton = InternalSelectScrollUpButton;
export const ShadcnSelectScrollDownButton = InternalSelectScrollDownButton;
