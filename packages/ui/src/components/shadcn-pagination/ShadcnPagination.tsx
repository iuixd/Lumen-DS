import type { ComponentProps } from "react";

import {
  Pagination as InternalPagination,
  PaginationContent as InternalPaginationContent,
  PaginationEllipsis as InternalPaginationEllipsis,
  PaginationItem as InternalPaginationItem,
  PaginationLink as InternalPaginationLink,
  PaginationNext as InternalPaginationNext,
  PaginationPrevious as InternalPaginationPrevious
} from "../internal/pagination";

/**
 * ShadcnPagination, sourced from shadcn/ui and adapted to Lumen's token
 * system — see packages/ui/src/components/internal/pagination.tsx for the
 * adaptation notes. Exported under a `Shadcn`-prefixed name because
 * Lumen's own `Pagination` already fills this role (see
 * docs/shadcn-integration.md §7.1). This public module is the only
 * supported import path; the internal implementation may change without
 * notice.
 */
export type ShadcnPaginationProps = ComponentProps<typeof InternalPagination>;
export function ShadcnPagination(props: ShadcnPaginationProps) {
  return <InternalPagination {...props} />;
}

export const ShadcnPaginationContent = InternalPaginationContent;
export const ShadcnPaginationItem = InternalPaginationItem;
export const ShadcnPaginationLink = InternalPaginationLink;
export const ShadcnPaginationPrevious = InternalPaginationPrevious;
export const ShadcnPaginationNext = InternalPaginationNext;
export const ShadcnPaginationEllipsis = InternalPaginationEllipsis;
