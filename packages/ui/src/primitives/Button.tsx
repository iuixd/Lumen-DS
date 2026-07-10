import { forwardRef, type ButtonHTMLAttributes, type MouseEventHandler } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

/**
 * Button
 * Sourced from the Figma "Buttons" page (Lumen-DS-2027, node 466:4365): variant
 * taxonomy (Primary/Secondary/Tertiary/Link), sizes (xs/sm/md/lg), and per-state
 * colors all trace to real component instances there — see that page's
 * "02 Accessibility & WCAG 2.1" and "04 Design Tokens" sections for the source
 * of the aria-disabled/aria-busy/aria-label requirements below. Text size per
 * size tier is a reasonable inference (not captured in the extracted spec).
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-[var(--spacing-6)] whitespace-nowrap rounded-md font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-border-focus)] aria-disabled:pointer-events-none aria-disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-brand-default)] text-neutral-white hover:bg-[var(--color-brand-hover)] active:bg-[var(--color-brand-pressed)] aria-disabled:bg-neutral-50 aria-disabled:text-neutral-400",
        secondary:
          "border-[1.5px] border-[var(--color-brand-default)] bg-transparent text-[var(--color-brand-default)] hover:border-[var(--color-brand-hover)] hover:bg-[var(--color-brand-subtle)] active:border-[var(--color-brand-pressed)] aria-disabled:border-neutral-200 aria-disabled:bg-neutral-50 aria-disabled:text-neutral-400",
        tertiary:
          "bg-transparent text-[var(--color-brand-default)] hover:bg-[var(--color-brand-subtle)] aria-disabled:bg-transparent aria-disabled:text-neutral-400",
        link: "min-w-0 bg-transparent p-[var(--spacing-4)] text-[var(--color-brand-default)] hover:text-[var(--color-brand-hover)] hover:underline aria-disabled:text-neutral-400"
      },
      size: {
        xs: "h-[var(--spacing-32)] min-w-[var(--spacing-64)] px-[var(--spacing-10)] py-[var(--spacing-5)] text-label-sm",
        sm: "h-[var(--spacing-36)] min-w-[var(--spacing-80)] px-[var(--spacing-12)] py-[var(--spacing-6)] text-label-md",
        md: "h-[var(--spacing-40)] min-w-[var(--spacing-96)] px-[var(--spacing-16)] py-[var(--spacing-8)] text-label-lg",
        lg: "h-[var(--spacing-48)] min-w-[var(--spacing-120)] px-[var(--spacing-20)] py-[var(--spacing-10)] text-label-lg"
      },
      iconOnly: {
        true: "min-w-0 p-0"
      }
    },
    compoundVariants: [
      { iconOnly: true, size: "xs", class: "size-[var(--spacing-32)]" },
      { iconOnly: true, size: "sm", class: "size-[var(--spacing-36)]" },
      { iconOnly: true, size: "md", class: "size-[var(--spacing-40)]" },
      { iconOnly: true, size: "lg", class: "size-[var(--spacing-48)]" }
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
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, iconStart, iconEnd, isLoading, iconOnly, disabled, onClick, children, ...props },
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
        className={cn(buttonVariants({ variant, size, iconOnly }), className)}
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
        {(!iconOnly || !isLoading) && children}
        {!isLoading && !iconOnly && iconEnd}
      </button>
    );
  }
);
Button.displayName = "Button";
