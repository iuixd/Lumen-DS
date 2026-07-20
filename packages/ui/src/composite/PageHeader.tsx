import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export interface Breadcrumb {
  label: string;
  href?: string;
}

export interface PageHeaderProps {
  breadcrumbs?: Breadcrumb[];
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

/**
 * PageHeader
 * Sourced from the Figma "appshell-desktop-closed-light" reference screen
 * (Lumen-AI-Design-System, node 1197:1652, `PageHeader` instance
 * `1102:6519`): breadcrumbs, an H1 + trailing action-button row, and a
 * description line. Typography rounds to the nearest existing type-scale
 * tier rather than adding one-off entries for a single component: title
 * uses `headline-md` (24px/32 — exact match to Figma's spec), breadcrumbs
 * use `label-md` (12px/18, weight 600 — Figma specs 12px/16, weight 400),
 * and description uses `body-xs` (12px/20 — Figma specs 13px/20). Both
 * roundings are documented, minor, and intentional, not unverified guesses.
 */
export function PageHeader({ breadcrumbs, title, description, actions, className }: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-[var(--spacing-10)] px-[var(--spacing-32)] pb-[var(--spacing-20)] pt-[var(--spacing-24)]",
        className
      )}
    >
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="flex items-center gap-[var(--spacing-6)] text-label-md text-[var(--color-text-secondary)]">
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.label} className="flex items-center gap-[var(--spacing-6)]">
              {i > 0 && (
                <span aria-hidden className="text-[var(--color-text-muted)]">
                  ›
                </span>
              )}
              {crumb.href && i < breadcrumbs.length - 1 ? (
                <a href={crumb.href} className="hover:text-[var(--color-text-body)]">
                  {crumb.label}
                </a>
              ) : (
                <span
                  aria-current={i === breadcrumbs.length - 1 ? "page" : undefined}
                  className={i === breadcrumbs.length - 1 ? "text-[var(--color-text-body)]" : undefined}
                >
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </nav>
      )}
      <div className="flex items-center gap-[var(--spacing-16)]">
        <h1 className="text-headline-md text-[var(--color-text-title)]">{title}</h1>
        <div className="min-w-px flex-1" />
        {actions && <div className="flex items-center gap-[var(--spacing-8)]">{actions}</div>}
      </div>
      {description && <p className="text-body-xs text-[var(--color-text-secondary)]">{description}</p>}
    </div>
  );
}
