import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../lib/cn";

const toggleAssets = {
  sunLight: new URL("../assets/theme-toggle-sun-light.svg", import.meta.url).href,
  moonLight: new URL("../assets/theme-toggle-moon-light.svg", import.meta.url).href,
  sunDark: new URL("../assets/theme-toggle-sun-dark.svg", import.meta.url).href,
  moonDark: new URL("../assets/theme-toggle-moon-dark.svg", import.meta.url).href
};

export interface ThemeToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {}

/**
 * ThemeToggle
 * Sourced from the canonical AppShell desktop/tablet light and dark variants
 * (node 1007:3700). The exact 54px track and two fixed 20px icon cells use
 * the published `btn/toggle/*` roles in both modes. The selected cell swaps
 * from Sun to Moon without moving either glyph. The native checkbox and
 * `role="switch"` preserve the established accessible-toggle behavior.
 */
export const ThemeToggle = forwardRef<HTMLInputElement, ThemeToggleProps>(
  ({ className, id, "aria-label": ariaLabel, ...props }, ref) => {
    const inputId = id ?? props.name;
    return (
      <label
        htmlFor={inputId}
        className={cn(
          "relative inline-flex h-[var(--spacing-24)] w-[var(--spacing-54)] shrink-0 cursor-pointer items-center overflow-hidden rounded-full bg-[var(--color-app-shell-toggle-track)]",
          "has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-offset-4 has-[:focus-visible]:ring-[var(--color-border-focus)]",
          "has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50",
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
        {Object.entries(toggleAssets).map(([name, src]) => {
          const sun = name.startsWith("sun");
          const dark = name.endsWith("Dark");
          return (
            <span
              key={name}
              aria-hidden
              data-theme-toggle-asset={name}
              className={cn(
                "pointer-events-none absolute top-[var(--spacing-2)] size-[var(--spacing-20)]",
                sun ? "left-[var(--spacing-2)]" : "left-[var(--spacing-32)]",
                dark ? "hidden peer-checked:block" : "block peer-checked:hidden"
              )}
            >
              <img src={src} alt="" className="size-full" />
            </span>
          );
        })}
      </label>
    );
  }
);
ThemeToggle.displayName = "ThemeToggle";
