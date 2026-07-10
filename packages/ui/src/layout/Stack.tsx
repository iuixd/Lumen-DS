import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export type StackGapKey = 0 | 2 | 4 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 28 | 32 | 40 | 48 | 56 | 64 | 80 | 96 | 128;

export interface StackProps {
  children: ReactNode;
  direction?: "row" | "column";
  gap?: StackGapKey;
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between";
  wrap?: boolean;
  className?: string;
}

const alignMap = { start: "items-start", center: "items-center", end: "items-end", stretch: "items-stretch" };
const justifyMap = { start: "justify-start", center: "justify-center", end: "justify-end", between: "justify-between" };

/** Flex-based layout primitive — the default way to arrange components.
 * Prefer this over ad-hoc `flex gap-x` class strings in product code. */
export function Stack({ children, direction = "column", gap = 16, align = "stretch", justify = "start", wrap, className }: StackProps) {
  return (
    <div
      className={cn(
        "flex",
        direction === "row" ? "flex-row" : "flex-col",
        alignMap[align],
        justifyMap[justify],
        wrap && "flex-wrap",
        className
      )}
      style={{ gap: `var(--spacing-${gap})` }}
    >
      {children}
    </div>
  );
}
