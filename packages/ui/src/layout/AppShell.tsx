import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
  icon?: ReactNode;
}

export interface AppShellProps {
  nav: NavItem[];
  children: ReactNode;
  header?: ReactNode;
  logo?: ReactNode;
  /**
   * "sidebar" (default) is the original 214px labeled sidebar — unchanged
   * behavior, so existing consumers are unaffected by this prop's addition.
   * "rail" is sourced from the Figma "appshell-desktop-closed-light"
   * reference screen (Lumen-AI-Design-System, node 1197:1652): a 64px
   * icon-only NavigationRail, with `header` rendered full-width above the
   * rail+content row instead of scoped beside the sidebar. Only the
   * closed/collapsed rail was sourced — no expanded-rail or open/close
   * transition instance was available, so this doesn't implement one.
   * `item.label` becomes the rail item's accessible name (`aria-label`) and
   * tooltip (`title`) instead of visible text.
   */
  variant?: "sidebar" | "rail";
  /** Rendered full-width below the main content row. Additive and optional
   * in both variants — omitting it changes nothing for existing consumers.
   * Sourced from the same reference screen's `Footer` instance (`1102:6529`);
   * pair with the new `Footer` component. */
  footer?: ReactNode;
}

/** The standard product shell: fixed sidebar + main content area. Matches the
 * navigation pattern used in the Lumen AI Design System showcase site. Every
 * enterprise screen should be built inside this shell rather than a bespoke
 * layout. */
export function AppShell({ nav, children, header, logo, footer, variant = "sidebar" }: AppShellProps) {
  if (variant === "rail") {
    return (
      <div className="flex min-h-screen flex-col bg-[var(--color-background-subtle)]">
        {header && (
          <header className="flex h-[var(--spacing-56)] shrink-0 items-center gap-[var(--spacing-16)] border-b border-[var(--color-border-default)] bg-[var(--color-background-default)] px-[var(--spacing-16)]">
            {header}
          </header>
        )}
        <div className="flex flex-1 items-stretch">
          <aside className="flex w-[var(--spacing-64)] shrink-0 flex-col items-center gap-[var(--spacing-4)] border-r border-[var(--color-border-default)] bg-[var(--color-background-default)] py-[var(--spacing-12)]">
            {logo}
            <nav className="flex flex-col items-center gap-[var(--spacing-4)]">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={item.active ? "page" : undefined}
                  aria-label={item.label}
                  title={item.label}
                  className={cn(
                    "flex size-[var(--spacing-40)] items-center justify-center rounded-lg transition-colors",
                    item.active
                      ? "bg-[var(--color-background-nav-active)] text-[var(--color-brand-default)]"
                      : "text-[var(--color-text-body)] hover:bg-[var(--color-background-nav-active)]"
                  )}
                >
                  {item.icon}
                </a>
              ))}
            </nav>
          </aside>
          <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
        </div>
        {footer}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[var(--color-background-subtle)]">
      <aside className="flex w-[214px] shrink-0 flex-col gap-6 border-r border-[var(--color-border-default)] bg-[var(--color-background-default)] p-5">
        {logo}
        <nav className="flex flex-col gap-1">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-label-lg font-medium transition-colors",
                item.active
                  ? "bg-[var(--color-brand-subtle)] text-[var(--color-brand-default)]"
                  : "text-[var(--color-text-body)] hover:bg-neutral-50"
              )}
            >
              {item.icon}
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
      <div className="flex flex-1 flex-col">
        {header && (
          <header className="border-b border-[var(--color-border-default)] bg-[var(--color-background-default)] px-8 py-4">
            {header}
          </header>
        )}
        <main className="flex-1 p-8">{children}</main>
        {footer}
      </div>
    </div>
  );
}
