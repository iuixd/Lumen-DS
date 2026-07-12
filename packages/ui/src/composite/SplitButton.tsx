import { forwardRef, type ButtonHTMLAttributes, type MouseEventHandler, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";
import { ChevronDownIcon } from "../icons/generated";

/**
 * SplitButton
 * Sourced from the Figma "Buttons" page (Lumen-DS-2027, node 555:300): a primary
 * action button joined to a dropdown-toggle button by a thin divider, sharing one
 * rounded/pill silhouette. Figma only specs the `lg` size (48px) and three types —
 * Primary, Raised (Primary + elevation), Secondary — so this component doesn't
 * expose a `size` prop; add one if/when Figma specs other sizes.
 *
 * Renders two real <button> elements so each half stays independently focusable
 * and clickable — they're genuinely two different actions (run the default
 * action vs open a menu of alternatives). All color/shape styling lives on the
 * wrapping element rather than on the buttons themselves: Figma's own instances
 * only ever show ONE Hover/Active/Focus state for the whole composite (never a
 * separate state per half), and CSS :hover/:active naturally apply to an
 * ancestor while a descendant is hovered/pressed, so a single shared visual
 * state is both what's spec'd and what plain CSS produces for free.
 */
const containerVariants = cva(
  // `has-[:focus-visible]:` rather than `focus-within:` deliberately — the
  // rest of this system only rings on keyboard focus (`focus-visible:`), and
  // `focus-within:` would also fire on a plain mouse click, since clicking a
  // <button> gives it real DOM focus. `:has(:focus-visible)` matches only
  // when a descendant's focus came from the keyboard, same as everywhere else.
  "inline-flex h-[var(--spacing-48)] min-w-[var(--spacing-120)] items-stretch overflow-hidden rounded-md transition-colors has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-offset-4 has-[:focus-visible]:ring-[var(--color-border-focus)] aria-disabled:pointer-events-none aria-disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-brand-default)] text-neutral-white hover:bg-[var(--color-brand-hover)] active:bg-[var(--color-brand-pressed)] aria-disabled:bg-neutral-50 aria-disabled:text-neutral-400",
        raised:
          "bg-[var(--color-brand-default)] text-neutral-white [box-shadow:var(--shadow-button-default)] hover:bg-[var(--color-brand-hover)] hover:[box-shadow:var(--shadow-button-hover)] active:bg-[var(--color-brand-pressed)] active:[box-shadow:var(--shadow-button-active)] aria-disabled:bg-neutral-50 aria-disabled:text-neutral-400 aria-disabled:[box-shadow:var(--shadow-button-disabled)]",
        secondary:
          "border-[1.5px] border-[var(--color-brand-border)] bg-neutral-white text-[var(--color-brand-default)] hover:border-[var(--color-brand-default)] hover:bg-[var(--color-brand-subtle)] active:border-[var(--color-brand-default)] active:bg-[var(--color-brand-subtle-pressed)] aria-disabled:border aria-disabled:border-neutral-200 aria-disabled:bg-neutral-50 aria-disabled:text-neutral-400"
      },
      pill: {
        true: "rounded-full"
      }
    },
    defaultVariants: { variant: "primary" }
  }
);

// Tailwind's opacity modifier (`bg-x/30`) can't blend a custom color that's
// itself a CSS-variable reference — it silently emits no rule at all rather
// than erroring (same trap as the shadow arbitrary-value bug), so these use
// dedicated pre-blended rgba tokens from divider.json instead. Figma specs a
// distinct gray divider for the Disabled state too, but that's covered here
// by the container's blanket `aria-disabled:opacity-60` dim (same
// simplification Button.tsx uses — not every sub-element gets its own
// disabled-specific color, most just get dimmed).
const dividerVariants = cva("h-full w-px shrink-0", {
  variants: {
    variant: {
      primary: "[background-color:var(--divider-button-primary)]",
      raised: "[background-color:var(--divider-button-primary)]",
      secondary: "[background-color:var(--divider-button-secondary)]"
    }
  },
  defaultVariants: { variant: "primary" }
});

export interface SplitButtonProps extends VariantProps<typeof containerVariants> {
  className?: string;
  /** Label for the main action button. */
  children: ReactNode;
  onMainClick?: MouseEventHandler<HTMLButtonElement>;
  /** Click handler for the dropdown-toggle button — typically opens a menu. */
  onDropdownClick?: MouseEventHandler<HTMLButtonElement>;
  /**
   * Accessible name for the dropdown-toggle button, which has no visible label
   * of its own. A dev-mode console warning fires if it's left at the default.
   */
  dropdownLabel?: string;
  disabled?: boolean;
  isLoading?: boolean;
  mainButtonProps?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled" | "onClick" | "children">;
  dropdownButtonProps?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled" | "onClick" | "aria-label">;
}

export const SplitButton = forwardRef<HTMLDivElement, SplitButtonProps>(
  (
    {
      className,
      variant,
      pill,
      children,
      onMainClick,
      onDropdownClick,
      dropdownLabel = "More options",
      disabled,
      isLoading,
      mainButtonProps,
      dropdownButtonProps,
      ...props
    },
    ref
  ) => {
    if (process.env.NODE_ENV !== "production" && dropdownLabel === "More options") {
      // eslint-disable-next-line no-console
      console.warn('SplitButton: pass a specific `dropdownLabel` — "More options" is a placeholder, not a real accessible name.');
    }

    const isMainDisabled = Boolean(disabled || isLoading);

    return (
      <div
        ref={ref}
        {...props}
        className={cn(containerVariants({ variant, pill }), className)}
        aria-disabled={disabled || undefined}
      >
        <button
          type="button"
          {...mainButtonProps}
          disabled={isMainDisabled}
          aria-busy={isLoading || undefined}
          onClick={onMainClick}
          className="inline-flex flex-1 items-center justify-center whitespace-nowrap pl-[var(--spacing-20)] pr-[var(--spacing-12)] text-button-lg outline-none disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <span className="size-[1em] animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden />
              <span className="sr-only">{children}</span>
            </>
          ) : (
            children
          )}
        </button>
        <span className={dividerVariants({ variant })} aria-hidden />
        <button
          type="button"
          {...dropdownButtonProps}
          disabled={disabled}
          aria-label={dropdownLabel}
          aria-haspopup="menu"
          onClick={onDropdownClick}
          className="inline-flex size-[var(--spacing-48)] shrink-0 items-center justify-center outline-none disabled:cursor-not-allowed"
        >
          <ChevronDownIcon className="size-[18px]" aria-hidden />
        </button>
      </div>
    );
  }
);
SplitButton.displayName = "SplitButton";
