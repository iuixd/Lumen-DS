import type { ComponentProps } from "react";

import {
  Breadcrumb as InternalBreadcrumb,
  BreadcrumbEllipsis as InternalBreadcrumbEllipsis,
  BreadcrumbItem as InternalBreadcrumbItem,
  BreadcrumbLink as InternalBreadcrumbLink,
  BreadcrumbList as InternalBreadcrumbList,
  BreadcrumbPage as InternalBreadcrumbPage,
  BreadcrumbSeparator as InternalBreadcrumbSeparator
} from "../internal/breadcrumb";

/**
 * Breadcrumb, sourced from shadcn/ui and adapted to Lumen's token system —
 * see packages/ui/src/components/internal/breadcrumb.tsx for the
 * adaptation notes. This public module is the only supported import path;
 * the internal implementation may change without notice.
 */
export type BreadcrumbProps = ComponentProps<typeof InternalBreadcrumb>;
export function Breadcrumb(props: BreadcrumbProps) {
  return <InternalBreadcrumb {...props} />;
}

export const BreadcrumbList = InternalBreadcrumbList;
export const BreadcrumbItem = InternalBreadcrumbItem;
export const BreadcrumbLink = InternalBreadcrumbLink;
export const BreadcrumbPage = InternalBreadcrumbPage;
export const BreadcrumbSeparator = InternalBreadcrumbSeparator;
export const BreadcrumbEllipsis = InternalBreadcrumbEllipsis;
