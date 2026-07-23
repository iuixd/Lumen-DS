import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type KeyboardEvent,
  type MouseEventHandler,
  type ReactNode
} from "react";
import { cva } from "class-variance-authority";
import {
  ChevronDownIcon,
  LanguagesIcon,
  LmAiOutlineIcon,
  LmAisymbolIcon,
  SpellCheckIcon,
  WandSparklesIcon
} from "../icons/generated";
import { cn } from "../lib/cn";
import {
  getAICapability,
  type AICapability,
  type AICapabilityId
} from "./ai-capabilities";

/** Canonical One AI Button collection, sourced from Figma node `760:1965`. */
export type AIButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "destructive";
export type AIButtonSize = "sm" | "md" | "lg" | "xl";
export type AIButtonSplitVariant = Extract<AIButtonVariant, "primary" | "secondary" | "outline">;

const defaultDropdownOptions = [
  "summarize",
  "rewrite",
  "fix-grammar",
  "translate"
] as const satisfies readonly AICapabilityId[];

const maximumVisibleDropdownOptions = 8;

const dropdownIconByCapability = {
  summarize: LmAiOutlineIcon,
  rewrite: WandSparklesIcon,
  "fix-grammar": LanguagesIcon,
  translate: SpellCheckIcon
} as const;

const aiButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg border border-transparent font-interface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-button-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background-default)] aria-disabled:pointer-events-none aria-disabled:border-transparent aria-disabled:bg-[var(--color-button-disabled-bg)] aria-disabled:text-[var(--color-button-disabled-on-action)]",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-button-primary-bg)] text-[var(--color-button-primary-on-action)] hover:bg-[var(--color-button-primary-hover-bg)] hover:text-[var(--color-button-primary-hover-on-action)]",
        secondary:
          "border-[var(--color-button-secondary-border)] bg-[var(--color-button-secondary-bg)] text-[var(--color-button-secondary-on-action)] hover:border-[var(--color-button-secondary-hover-border)] hover:bg-[var(--color-button-secondary-hover-bg)] hover:text-[var(--color-button-secondary-hover-on-action)]",
        ghost:
          "bg-[var(--color-button-ghost-bg)] text-[var(--color-app-shell-text-primary)] hover:bg-[var(--color-button-ghost-hover-bg)]",
        outline:
          "border-[var(--color-button-outline-border)] bg-[var(--color-button-outline-bg)] text-[var(--color-button-outline-on-action)] hover:border-[var(--color-button-outline-hover-border)] hover:bg-[var(--color-button-outline-hover-bg)] hover:text-[var(--color-button-outline-hover-on-action)] focus-visible:border-[var(--color-button-outline-focus-border)]",
        destructive:
          "bg-[var(--color-button-destructive-bg)] text-[var(--color-button-destructive-on-action)] hover:bg-[var(--color-button-destructive-hover-bg)]"
      },
      size: {
        sm: "h-[var(--spacing-30)] gap-[var(--spacing-6)] px-[var(--spacing-14)] text-standard-button-sm",
        md: "h-[var(--spacing-34)] gap-[var(--spacing-8)] px-[var(--spacing-14)] text-standard-button-md",
        lg: "h-[var(--spacing-38)] gap-[var(--spacing-8)] px-[var(--spacing-16)] text-standard-button-lg",
        xl: "h-[var(--spacing-42)] gap-[var(--spacing-8)] px-[var(--spacing-16)] text-standard-button-xl"
      },
      iconOnly: {
        true: "aspect-square min-w-0 p-0"
      }
    },
    compoundVariants: [
      { variant: "ghost", size: "md", class: "h-[var(--spacing-36)] px-[var(--spacing-16)]" }
    ],
    defaultVariants: { variant: "primary", size: "md" }
  }
);

const splitVariantClasses: Record<AIButtonSplitVariant, string> = {
  primary:
    "border-transparent bg-[var(--color-button-primary-bg)] text-[var(--color-button-primary-on-action)] hover:bg-[var(--color-button-primary-hover-bg)] hover:text-[var(--color-button-primary-hover-on-action)]",
  secondary:
    "border-[var(--color-button-secondary-border)] bg-[var(--color-button-secondary-bg)] text-[var(--color-button-secondary-on-action)] hover:border-[var(--color-button-secondary-hover-border)] hover:bg-[var(--color-button-secondary-hover-bg)] hover:text-[var(--color-button-secondary-hover-on-action)]",
  outline:
    "border-[var(--color-button-outline-border)] bg-[var(--color-button-outline-bg)] text-[var(--color-button-outline-on-action)] hover:border-[var(--color-button-outline-hover-border)] hover:bg-[var(--color-button-outline-hover-bg)] hover:text-[var(--color-button-outline-hover-on-action)]"
};

const splitDividerClasses: Record<AIButtonSplitVariant, string> = {
  primary: "border-[color-mix(in_srgb,currentColor_32%,transparent)]",
  secondary: "border-[var(--color-button-secondary-border)]",
  outline: "border-[var(--color-button-outline-border)]"
};

export interface AIButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
  variant?: AIButtonVariant;
  size?: AIButtonSize;
  /** Leading capability icon. The AI symbol is used when no override is supplied. */
  icon?: ReactNode;
  /** Square button treatment. An accessible name is required. */
  iconOnly?: boolean;
  /** Replaces the icon with the Figma spinner while retaining the visible label. */
  isLoading?: boolean;
  /** Supplies the Figma label, description metadata, icon, and analytics convention. */
  capability?: AICapabilityId | (string & NonNullable<unknown>);
  /** Renders the canonical two-action split button. Available for primary, secondary, and outline. */
  split?: boolean;
  onDropdownClick?: MouseEventHandler<HTMLButtonElement>;
  dropdownLabel?: string;
  /** Capability options shown in the built-in Figma dropdown menu. */
  dropdownOptions?: readonly AICapabilityId[];
  /** Called after a built-in dropdown option is selected. */
  onDropdownOptionSelect?: (capability: AICapability) => void;
}

export const AIButton = forwardRef<HTMLButtonElement, AIButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      icon,
      iconOnly,
      isLoading,
      capability,
      split,
      onDropdownClick,
      dropdownLabel = "More AI actions",
      dropdownOptions = defaultDropdownOptions,
      onDropdownOptionSelect,
      disabled,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const splitRootRef = useRef<HTMLSpanElement>(null);
    const menuItemRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const pendingMenuFocusRef = useRef(0);
    const menuId = useId();
    const isDisabled = Boolean(disabled || isLoading);
    const resolvedCapability = capability ? getAICapability(capability) : undefined;
    const label = children ?? resolvedCapability?.label;
    const CapabilityIcon = resolvedCapability?.icon;
    const resolvedIcon =
      icon ??
      (CapabilityIcon ? <CapabilityIcon aria-hidden /> : <LmAisymbolIcon aria-hidden />);
    const resolvedAriaLabel =
      props["aria-label"] ??
      (iconOnly ? (isLoading ? "Generating" : resolvedCapability?.label) : undefined);
    const resolvedDropdownOptions = dropdownOptions
      .map((option) => getAICapability(option))
      .filter((option): option is AICapability => Boolean(option));

    useEffect(() => {
      if (!menuOpen) return;
      const closeOnOutsidePointer = (event: MouseEvent) => {
        if (!splitRootRef.current?.contains(event.target as Node)) setMenuOpen(false);
      };
      document.addEventListener("mousedown", closeOnOutsidePointer);
      return () => document.removeEventListener("mousedown", closeOnOutsidePointer);
    }, [menuOpen]);

    useEffect(() => {
      if (!menuOpen) return;
      menuItemRefs.current[pendingMenuFocusRef.current]?.focus();
    }, [menuOpen]);

    if (process.env.NODE_ENV !== "production") {
      if (iconOnly && !resolvedAriaLabel && !props["aria-labelledby"]) {
        // eslint-disable-next-line no-console
        console.warn("AIButton: iconOnly buttons must have an accessible name — pass aria-label.");
      }
      if (capability && !resolvedCapability) {
        // eslint-disable-next-line no-console
        console.warn(`AIButton: unrecognized capability "${capability}".`);
      }
      if (split && !["primary", "secondary", "outline"].includes(variant)) {
        // eslint-disable-next-line no-console
        console.warn("AIButton: split buttons support primary, secondary, and outline variants.");
      }
    }

    const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
      if (isDisabled) {
        event.preventDefault();
        return;
      }
      setMenuOpen(false);
      onClick?.(event);
    };

    const sharedData = {
      "data-capability": capability || undefined,
      "data-ai-analytics-event": resolvedCapability?.analyticsEvent
    };

    if (split) {
      const splitVariant: AIButtonSplitVariant =
        variant === "secondary" || variant === "outline" ? variant : "primary";

      const focusMenuItem = (index: number) => {
        const count = resolvedDropdownOptions.length;
        if (!count) return;
        const nextIndex = ((index % count) + count) % count;
        menuItemRefs.current[nextIndex]?.focus();
      };

      const openMenu = (focusIndex = 0) => {
        const count = resolvedDropdownOptions.length;
        pendingMenuFocusRef.current = count ? ((focusIndex % count) + count) % count : 0;
        if (menuOpen) {
          requestAnimationFrame(() => focusMenuItem(pendingMenuFocusRef.current));
          return;
        }
        setMenuOpen(true);
      };

      const handleDropdownClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        pendingMenuFocusRef.current = 0;
        setMenuOpen((open) => !open);
        onDropdownClick?.(event);
      };

      const handleDropdownKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          openMenu(0);
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          openMenu(resolvedDropdownOptions.length - 1);
        } else if (event.key === "Escape") {
          setMenuOpen(false);
        }
      };

      const handleMenuItemKeyDown = (
        event: KeyboardEvent<HTMLButtonElement>,
        index: number
      ) => {
        switch (event.key) {
          case "ArrowDown":
            event.preventDefault();
            focusMenuItem(index + 1);
            break;
          case "ArrowUp":
            event.preventDefault();
            focusMenuItem(index - 1);
            break;
          case "Home":
            event.preventDefault();
            focusMenuItem(0);
            break;
          case "End":
            event.preventDefault();
            focusMenuItem(resolvedDropdownOptions.length - 1);
            break;
          case "Escape":
            event.preventDefault();
            setMenuOpen(false);
            splitRootRef.current
              ?.querySelector<HTMLButtonElement>('[aria-haspopup="menu"]')
              ?.focus();
            break;
          case "Tab":
            setMenuOpen(false);
            break;
        }
      };

      return (
        <span ref={splitRootRef} className="relative inline-flex">
          <span
            role="group"
            className={cn(
              "inline-flex h-[var(--spacing-34)] min-w-[var(--spacing-120)] overflow-hidden rounded-lg font-interface text-standard-button-md",
              className
            )}
          >
            <button
              ref={ref}
              type="button"
              {...props}
              {...sharedData}
              className={cn(
                "inline-flex min-w-0 flex-1 items-center justify-center gap-[var(--spacing-8)] rounded-l-lg border py-[var(--spacing-7)] pl-[var(--spacing-14)] pr-[var(--spacing-10)] transition-colors focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-button-focus-ring)] aria-disabled:pointer-events-none aria-disabled:bg-[var(--color-button-disabled-bg)] aria-disabled:text-[var(--color-button-disabled-on-action)]",
                splitVariantClasses[splitVariant]
              )}
              aria-disabled={disabled || undefined}
              aria-busy={isLoading || undefined}
              onClick={handleClick}
            >
              <span className="flex size-[var(--spacing-18)] shrink-0 items-center justify-center [&>svg]:size-full">
                {isLoading ? (
                  <span
                    className="size-[var(--spacing-12)] animate-spin rounded-full border-2 border-current border-t-transparent"
                    aria-hidden
                  />
                ) : (
                  resolvedIcon
                )}
              </span>
              {label}
            </button>
            <button
              type="button"
              className={cn(
                "inline-flex w-[var(--spacing-34)] shrink-0 items-center justify-center rounded-r-lg border border-l transition-colors focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-button-focus-ring)] aria-disabled:pointer-events-none aria-disabled:bg-[var(--color-button-disabled-bg)] aria-disabled:text-[var(--color-button-disabled-on-action)]",
                splitVariantClasses[splitVariant],
                splitDividerClasses[splitVariant]
              )}
              aria-label={dropdownLabel}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              aria-controls={menuOpen ? menuId : undefined}
              aria-disabled={isDisabled || undefined}
              onClick={isDisabled ? undefined : handleDropdownClick}
              onKeyDown={isDisabled ? undefined : handleDropdownKeyDown}
            >
              <ChevronDownIcon className="w-[var(--spacing-10)]" aria-hidden />
            </button>
          </span>
          {menuOpen && (
            <span
              id={menuId}
              role="menu"
              aria-label={dropdownLabel}
              className="absolute right-0 top-full z-20 mt-[var(--spacing-4)] flex w-max max-w-[calc(100vw-var(--spacing-32))] flex-col overflow-x-hidden overflow-y-auto rounded-xl border border-[var(--color-app-shell-border-table)] bg-[var(--color-background-default)] py-[var(--spacing-8)] [box-shadow:var(--shadow-menu-default)] [scrollbar-color:transparent_transparent] [scrollbar-width:thin] hover:[scrollbar-color:var(--color-app-shell-border-table)_transparent] focus-within:[scrollbar-color:var(--color-app-shell-border-table)_transparent] [&::-webkit-scrollbar]:w-[var(--spacing-4)] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-transparent [&::-webkit-scrollbar-track]:bg-transparent [&:focus-within::-webkit-scrollbar-thumb]:bg-[var(--color-app-shell-border-table)] [&:hover::-webkit-scrollbar-thumb]:bg-[var(--color-app-shell-border-table)]"
              style={{
                maxHeight: `calc(var(--spacing-32) * ${maximumVisibleDropdownOptions} + var(--spacing-16))`
              }}
            >
              {resolvedDropdownOptions.map((option, index) => {
                const OptionIcon =
                  dropdownIconByCapability[
                    option.id as keyof typeof dropdownIconByCapability
                  ] ?? option.icon;
                return (
                  <button
                    key={option.id}
                    ref={(element) => {
                      menuItemRefs.current[index] = element;
                    }}
                    type="button"
                    role="menuitem"
                    tabIndex={-1}
                    className="flex w-full items-center gap-[var(--spacing-10)] overflow-hidden px-[var(--spacing-16)] py-[var(--spacing-8)] text-left font-interface text-ai-menu-item text-[var(--color-app-shell-text-secondary)] outline-none hover:bg-[var(--color-background-subtle)] focus:bg-[var(--color-background-subtle)]"
                    onClick={() => {
                      onDropdownOptionSelect?.(option);
                      setMenuOpen(false);
                    }}
                    onKeyDown={(event) => handleMenuItemKeyDown(event, index)}
                  >
                    <OptionIcon className="size-[var(--spacing-14)] shrink-0" aria-hidden />
                    <span className="min-w-0 flex-1">{option.label}</span>
                  </button>
                );
              })}
            </span>
          )}
        </span>
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        {...props}
        {...sharedData}
        className={cn(
          aiButtonVariants({ variant, size, iconOnly }),
          isLoading && "px-[var(--spacing-16)]",
          className
        )}
        aria-disabled={disabled || undefined}
        aria-busy={isLoading || undefined}
        aria-label={resolvedAriaLabel}
        onClick={handleClick}
      >
        <span
          className={cn(
            "flex size-[var(--spacing-14)] shrink-0 items-center justify-center [&>svg]:size-full",
            !iconOnly && variant === "outline" && "size-[var(--spacing-16)]"
          )}
        >
          {isLoading ? (
            <span
              className="size-[var(--spacing-12)] animate-spin rounded-full border-2 border-current border-t-transparent"
              aria-hidden
            />
          ) : (
            resolvedIcon
          )}
        </span>
        {!iconOnly && label}
      </button>
    );
  }
);
AIButton.displayName = "AIButton";
