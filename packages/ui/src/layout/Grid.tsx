import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export type GridGapKey = 0 | 2 | 4 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 28 | 32 | 40 | 48 | 56 | 64 | 80 | 96 | 128;

export function Grid({
  children,
  columns = 12,
  gap = 16,
  className
}: {
  children: ReactNode;
  columns?: number;
  gap?: GridGapKey;
  className?: string;
}) {
  return (
    <div
      className={cn("grid", className)}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, gap: `var(--spacing-${gap})` }}
    >
      {children}
    </div>
  );
}
