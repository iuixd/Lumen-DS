import { forwardRef, type ButtonHTMLAttributes, type MouseEventHandler } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../lib/cn";
import { CheckIcon } from "../icons/generated";

/**
 * ChoiceChip
 * Sourced from the Figma "Buttons" page (Lumen-DS-2027, node 581:485): a
 * toggleable pill for single-value choices — visually identical to
 * FilterChip's outlined/filled treatment but with no leading icon while
 * unselected and a leading check icon (not a remove affordance) once
 * selected, matching Figma's Default/Selected instances exactly. Only the
 * `lg` size (36px) is specced. Uses `aria-disabled` rather than the native
 * `disabled` attribute, matching the same Buttons page's "02 Accessibility &
 * WCAG 2.1" guidance already followed by Button, SplitButton, and FilterChip.
 */
const choiceChipVariants = cva(
  "inline-flex h-[var(--spacing-36)] items-center justify-center gap-[var(--spacing-6)] whitespace-nowrap rounded-full border-[1.5px] px-[var(--spacing-12)] text-button-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-[var(--color-border-focus)] aria-disabled:pointer-events-none aria-disabled:border-neutral-200 aria-disabled:bg-neutral-50 aria-disabled:text-neutral-400",
  {
    variants: {
      selected: {
        false:
          "border-[var(--color-brand-border-strong)] bg-transparent text-[var(--color-brand-default)] hover:border-[var(--color-brand-subtle)] hover:bg-[var(--color-brand-subtle)]",
        true: "border-[var(--color-brand-default)] bg-[var(--color-brand-default)] text-neutral-white hover:border-[var(--color-brand-hover)] hover:bg-[var(--color-brand-hover)]"
      }
    },
    defaultVariants: { selected: false }
  }
);

export interface ChoiceChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> {
  /** Whether this choice is currently selected — Figma's Selected state. */
  selected?: boolean;
  disabled?: boolean;
}

export const ChoiceChip = forwardRef<HTMLButtonElement, ChoiceChipProps>(
  ({ className, selected = false, disabled, onClick, children, ...props }, ref) => {
    const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
      if (disabled) {
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
        aria-pressed={selected}
        aria-disabled={disabled || undefined}
        className={cn(choiceChipVariants({ selected }), className)}
        onClick={handleClick}
      >
        {selected && <CheckIcon className="size-4 shrink-0" aria-hidden />}
        {children}
      </button>
    );
  }
);
ChoiceChip.displayName = "ChoiceChip";
