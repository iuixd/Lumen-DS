import type { HTMLAttributes } from "react";
import { cn } from "../lib/cn";

export interface KPICardProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  label: string;
  value: string;
  /** e.g. "▲ 12% this quarter" — free text so callers can compose their own delta glyph/copy. */
  delta?: string;
  deltaTone?: "success" | "warning" | "error";
}

const deltaToneMap = {
  success: "text-[var(--color-status-success)]",
  warning: "text-[var(--color-status-warning)]",
  error: "text-[var(--color-status-error)]"
};

/**
 * KPICard
 * Sourced from the Figma "appshell-desktop-closed-light" reference screen
 * (Lumen-AI-Design-System, node 1197:1652, `KPICard` instances `1102:6521`-
 * `1102:6523`): a metric tile distinct from the generic `Card` primitive —
 * its own radius (`--radius-xl`, 12px, vs. Card's 8px), padding
 * (20px/16px vs. Card's flat 24px), and elevation (`--shadow-elevation-sm`)
 * don't reduce to a `Card` composition without new props on `Card` itself,
 * so this ships as its own primitive per the "extend before duplicate" rule
 * — `Card` was reviewed first and doesn't cover this shape.
 * Typography rounds to the nearest existing type-scale tier rather than
 * adding new one-off entries: label uses `label-md` (12px/18, weight 600 —
 * Figma specs 12px/16, weight 500) and value uses `headline-lg` (32px/42,
 * weight 600 — Figma specs 32px/40). Both are documented, minor,
 * intentional roundings, not unverified guesses.
 */
export function KPICard({ className, label, value, delta, deltaTone = "success", ...props }: KPICardProps) {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col gap-[var(--spacing-4)] rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-background-default)] px-[var(--spacing-20)] py-[var(--spacing-16)] [box-shadow:var(--shadow-elevation-sm)]",
        className
      )}
      {...props}
    >
      <p className="text-label-md text-[var(--color-text-secondary)]">{label}</p>
      <p className="text-headline-lg text-[var(--color-text-body)]">{value}</p>
      {delta && <p className={cn("text-label-sm", deltaToneMap[deltaTone])}>{delta}</p>}
    </div>
  );
}
