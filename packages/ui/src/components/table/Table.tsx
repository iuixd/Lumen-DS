import type { ComponentProps } from "react";

import {
  Table as InternalTable,
  TableBody as InternalTableBody,
  TableCaption as InternalTableCaption,
  TableCell as InternalTableCell,
  TableFooter as InternalTableFooter,
  TableHead as InternalTableHead,
  TableHeader as InternalTableHeader,
  TableRow as InternalTableRow
} from "../internal/table";

/**
 * Table, sourced from shadcn/ui and adapted to Lumen's token system —
 * see packages/ui/src/components/internal/table.tsx for the adaptation
 * notes and why this keeps its own plain name (no collision with Lumen's
 * own `DataTable`). This public module is the only supported import
 * path; the internal implementation may change without notice.
 */
export type TableProps = ComponentProps<typeof InternalTable>;
export function Table(props: TableProps) {
  return <InternalTable {...props} />;
}

export const TableHeader = InternalTableHeader;
export const TableBody = InternalTableBody;
export const TableFooter = InternalTableFooter;
export const TableRow = InternalTableRow;
export const TableHead = InternalTableHead;
export const TableCell = InternalTableCell;
export const TableCaption = InternalTableCaption;
