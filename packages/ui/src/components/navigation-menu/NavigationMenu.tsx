import type { ComponentProps } from "react";

import {
  NavigationMenu as InternalNavigationMenu,
  NavigationMenuContent as InternalNavigationMenuContent,
  NavigationMenuIndicator as InternalNavigationMenuIndicator,
  NavigationMenuItem as InternalNavigationMenuItem,
  NavigationMenuLink as InternalNavigationMenuLink,
  NavigationMenuList as InternalNavigationMenuList,
  NavigationMenuTrigger as InternalNavigationMenuTrigger,
  NavigationMenuViewport as InternalNavigationMenuViewport,
  navigationMenuTriggerStyle
} from "../internal/navigation-menu";

/**
 * NavigationMenu, sourced from shadcn/ui (Radix NavigationMenu) and
 * adapted to Lumen's token system — see packages/ui/src/components/internal/navigation-menu.tsx
 * for the adaptation notes and its distinction from AppShell's own
 * navigation. This public module is the only supported import path; the
 * internal implementation may change without notice.
 */
export type NavigationMenuProps = ComponentProps<typeof InternalNavigationMenu>;
export function NavigationMenu(props: NavigationMenuProps) {
  return <InternalNavigationMenu {...props} />;
}

export const NavigationMenuList = InternalNavigationMenuList;
export const NavigationMenuItem = InternalNavigationMenuItem;
export const NavigationMenuContent = InternalNavigationMenuContent;
export const NavigationMenuTrigger = InternalNavigationMenuTrigger;
export const NavigationMenuLink = InternalNavigationMenuLink;
export const NavigationMenuIndicator = InternalNavigationMenuIndicator;
export const NavigationMenuViewport = InternalNavigationMenuViewport;
export { navigationMenuTriggerStyle };
