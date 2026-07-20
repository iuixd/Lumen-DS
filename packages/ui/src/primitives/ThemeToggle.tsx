import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../lib/cn";
import { SunIcon, MoonIcon } from "../icons/generated";

export interface ThemeToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {}

/**
 * ThemeToggle
 * Sourced from the Figma "appshell-desktop-closed-light" reference screen
 * (Lumen-AI-Design-System, node 1197:1652, Header instance
 * `I1102:6515;1124:1193`): a pill in the app header that switches Light/Dark
 * theme, showing static Sun (left) / Moon (right) glyphs on a
 * `--color-background-subtle` track. Figma specs the track at 54px wide —
 * shipped at `--spacing-56` instead so the sliding-thumb travel distance
 * (track − padding − thumb) lands on a real token (`--spacing-32`) rather
 * than an unbacked 30px, the same "round to the nearest existing token"
 * treatment already applied to `SplitButton`'s sm dropdown segment.
 * Only the Light-theme instance was sourced — no Dark-theme or
 * mid-interaction instance was available, so this reproduces the
 * conventional sliding-thumb toggle (native checkbox + `role="switch"`,
 * same accessible-toggle approach as `Switch`) rather than inventing a
 * Figma-specific animation. Report any mismatch once a Dark-theme instance
 * is available.
 */
export const ThemeToggle = forwardRef<HTMLInputElement, ThemeToggleProps>(
  ({ className, id, "aria-label": ariaLabel, ...props }, ref) => {
    const inputId = id ?? props.name;
    return (
      <label
        htmlFor={inputId}
        className={cn(
          "relative inline-flex h-[var(--spacing-24)] w-[var(--spacing-56)] shrink-0 cursor-pointer items-center justify-between rounded-full bg-[var(--color-background-subtle)] px-[var(--spacing-2)]",
          "has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-offset-4 has-[:focus-visible]:ring-[var(--color-border-focus)]",
          className
        )}
      >
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          id={inputId}
          className="peer sr-only"
          aria-label={ariaLabel ?? "Toggle dark theme"}
          {...props}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute left-[var(--spacing-2)] size-[var(--spacing-20)] rounded-full bg-[var(--color-background-default)] shadow-sm transition-transform peer-checked:translate-x-[var(--spacing-32)]"
        />
        <SunIcon aria-hidden className="relative z-10 size-[var(--spacing-20)] text-[var(--color-text-title)]" />
        <MoonIcon aria-hidden className="relative z-10 size-[var(--spacing-20)] text-[var(--color-text-muted)]" />
      </label>
    );
  }
);
ThemeToggle.displayName = "ThemeToggle";
