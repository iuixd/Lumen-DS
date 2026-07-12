import { forwardRef, type ButtonHTMLAttributes, type MouseEventHandler } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

/**
 * Button
 * Sourced from the Figma "Buttons" page (Lumen-DS-2027, node 475:7210, formerly
 * 466:4365): variant taxonomy (Primary/Secondary/Tertiary/Link/Raised), sizes
 * (xs/sm/md/lg), per-size text (the dedicated `button-*` type scale), per-state
 * colors, the Pill Button shape modifier, and the focus-ring/elevation treatment
 * all trace to real component instances there. "Icon only" is documented as its
 * own Type in Figma (always Primary-styled, always bordered) rather than a
 * variant of its own — modeled here as the `{ variant: "primary", iconOnly: true }`
 * compound, since Figma doesn't spec icon-only Secondary/Tertiary/Link/Raised
 * looks and `iconOnly` still works as a general square-shape modifier for those.
 * See that page's "02 Accessibility & WCAG 2.1" section for the source of the
 * aria-disabled/aria-busy/aria-label requirements below. The page also has
 * `Left`/`Right` icon-position instances for Primary/Raised/Secondary/
 * Tertiary/Link — these don't get their own `variant`, since the existing
 * `iconStart`/`iconEnd` props already reproduce their exact box model (6px
 * gap, unchanged per-size padding); only the icon's own size is new — it
 * scales with Button `size` (14/16/18/18px for xs/sm/md/lg, the `--spacing-
 * 14`/`--spacing-18` tokens) independently of the `button-*` text scale, see
 * `Button.stories.tsx`'s `WithIcons` story for the sizing per size.
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-[var(--spacing-6)] whitespace-nowrap rounded-md border-[1.5px] border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-[var(--color-border-focus)] aria-disabled:pointer-events-none aria-disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-brand-default)] text-neutral-white hover:bg-[var(--color-brand-hover)] active:bg-[var(--color-brand-pressed)] active:[box-shadow:var(--shadow-button-pressed-inset)] focus-visible:border-[var(--color-brand-border)] aria-disabled:border-transparent aria-disabled:bg-neutral-50 aria-disabled:text-neutral-400",
        // Elevation uses the arbitrary-CSS-PROPERTY syntax (`[box-shadow:var(...)]`),
        // not the `shadow-[var(...)]` arbitrary-VALUE syntax — Tailwind's `shadow-*`
        // utility guesses whether a bracketed value is a full shadow or just a shadow
        // *color* override, and a bare `var(...)` reads as "could be a color" to that
        // heuristic. That silently turned every `shadow-[var(--shadow-button-*)]` into
        // a --tw-shadow-color assignment with no matching --tw-shadow-colored shape to
        // use it, while Tailwind's own default `.shadow` utility (0 1px 3px/0 1px 2px)
        // rendered instead — a shadow that "looked plausible" but didn't match Figma at
        // all. `[box-shadow:...]` sets the CSS property directly, no ambiguity.
        raised:
          "bg-[var(--color-brand-default)] text-neutral-white [box-shadow:var(--shadow-button-default)] hover:bg-[var(--color-brand-hover)] hover:[box-shadow:var(--shadow-button-hover)] active:bg-[var(--color-brand-pressed)] active:[box-shadow:var(--shadow-button-active)] focus-visible:border-[var(--color-brand-border)] aria-disabled:border-transparent aria-disabled:bg-neutral-50 aria-disabled:text-neutral-400 aria-disabled:[box-shadow:var(--shadow-button-disabled)]",
        secondary:
          "border-[var(--color-brand-border)] bg-transparent text-[var(--color-brand-default)] hover:border-[var(--color-brand-default)] hover:bg-[var(--color-brand-subtle)] active:border-[var(--color-brand-default)] active:bg-[var(--color-brand-subtle-pressed)] aria-disabled:border aria-disabled:border-neutral-200 aria-disabled:bg-neutral-50 aria-disabled:text-neutral-400",
        tertiary:
          "bg-transparent text-[var(--color-brand-default)] hover:bg-[var(--color-brand-subtle)] active:bg-[var(--color-brand-subtle-pressed)] aria-disabled:bg-transparent aria-disabled:text-neutral-400",
        link: "min-w-0 border-0 bg-transparent p-[var(--spacing-4)] text-[var(--color-brand-default)] hover:underline active:underline aria-disabled:text-neutral-400"
      },
      size: {
        xs: "h-[var(--spacing-32)] min-w-[var(--spacing-64)] px-[var(--spacing-10)] py-[var(--spacing-5)] text-button-xs",
        sm: "h-[var(--spacing-36)] min-w-[var(--spacing-80)] px-[var(--spacing-12)] py-[var(--spacing-6)] text-button-sm",
        md: "h-[var(--spacing-40)] min-w-[var(--spacing-96)] px-[var(--spacing-16)] py-[var(--spacing-8)] text-button-md",
        lg: "h-[var(--spacing-48)] min-w-[var(--spacing-120)] px-[var(--spacing-20)] py-[var(--spacing-10)] text-button-lg"
      },
      iconOnly: {
        true: "min-w-0 p-0"
      },
      /** Figma's "Pill Button" modifier — fully rounded corners, independent of variant/size. */
      pill: {
        true: "rounded-full"
      }
    },
    compoundVariants: [
      { iconOnly: true, size: "xs", class: "size-[var(--spacing-32)]" },
      { iconOnly: true, size: "sm", class: "size-[var(--spacing-36)]" },
      { iconOnly: true, size: "md", class: "size-[var(--spacing-40)]" },
      { iconOnly: true, size: "lg", class: "size-[var(--spacing-48)]" },
      // Figma's "Icon only" Type: always has a visible border (unlike text Primary,
      // which is borderless except on focus), losing it only when disabled.
      {
        variant: "primary",
        iconOnly: true,
        class: "border-[var(--color-brand-border)] hover:border-[var(--color-brand-default)] active:border-[var(--color-brand-default)] aria-disabled:border-transparent"
      }
    ],
    defaultVariants: { variant: "primary", size: "md" }
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Renders a leading icon slot. Ignored when `iconOnly` is set — use `children` for the icon instead. */
  iconStart?: React.ReactNode;
  /** Renders a trailing icon slot. Ignored when `iconOnly` is set. */
  iconEnd?: React.ReactNode;
  isLoading?: boolean;
  /**
   * Renders a square, label-less button sized to just the icon passed as `children`.
   * Per the Figma a11y notes, an icon-only button must have an accessible name —
   * pass `aria-label`. A dev-mode console warning fires if one isn't provided.
   */
  iconOnly?: boolean;
  /** Figma's "Pill Button" modifier — fully rounded corners instead of the default `rounded-md`. */
  pill?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      iconStart,
      iconEnd,
      isLoading,
      iconOnly,
      pill,
      disabled,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = Boolean(disabled || isLoading);

    if (process.env.NODE_ENV !== "production" && iconOnly && !props["aria-label"] && !props["aria-labelledby"]) {
      // eslint-disable-next-line no-console
      console.warn("Button: iconOnly buttons must have an accessible name — pass aria-label.");
    }

    // Figma's a11y notes call for aria-disabled over the native `disabled` attribute
    // so keyboard users can still reach (and be told why they can't activate) a
    // disabled button, rather than having it silently removed from tab order.
    const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
      if (isDisabled) {
        e.preventDefault();
        return;
      }
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        type="button"
        {...props}
        className={cn(buttonVariants({ variant, size, iconOnly, pill }), className)}
        aria-disabled={isDisabled || undefined}
        aria-busy={isLoading || undefined}
        aria-label={isLoading && iconOnly && !props["aria-label"] ? "Loading" : props["aria-label"]}
        onClick={handleClick}
      >
        {isLoading ? (
          <span className="size-[1em] animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden />
        ) : (
          iconStart
        )}
        {/* Loading hides the label visually but keeps it in the accessibility tree
            (sr-only) rather than removing it — otherwise a loading non-icon-only
            button would announce no accessible name at all. */}
        {isLoading ? children && <span className="sr-only">{children}</span> : children}
        {!isLoading && iconEnd}
      </button>
    );
  }
);
Button.displayName = "Button";
