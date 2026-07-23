import type { ComponentProps } from "react";

import {
  Tabs as InternalTabs,
  TabsContent as InternalTabsContent,
  TabsList as InternalTabsList,
  TabsTrigger as InternalTabsTrigger
} from "../internal/tabs";

/**
 * ShadcnTabs, sourced from shadcn/ui (Radix Tabs) and adapted to Lumen's
 * token system — see packages/ui/src/components/internal/tabs.tsx for
 * the adaptation notes. Exported under a `Shadcn`-prefixed name because
 * Lumen's own `Tabs` already fills this role (see
 * docs/shadcn-integration.md §7.1). This public module is the only
 * supported import path; the internal implementation may change without
 * notice.
 */
export type ShadcnTabsProps = ComponentProps<typeof InternalTabs>;
export function ShadcnTabs(props: ShadcnTabsProps) {
  return <InternalTabs {...props} />;
}

export const ShadcnTabsList = InternalTabsList;
export const ShadcnTabsTrigger = InternalTabsTrigger;
export const ShadcnTabsContent = InternalTabsContent;
