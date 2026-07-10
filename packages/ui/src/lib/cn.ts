import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names AND resolve conflicting Tailwind utilities
 * (e.g. a later `p-0` correctly wins over an earlier `px-[12px] py-[6px]`).
 * Plain clsx only concatenates — with cva's compoundVariants and any
 * consumer-provided `className` override, two classes touching the same CSS
 * property routinely end up in the same class list, and which one "wins" is
 * then down to Tailwind's arbitrary generated stylesheet order, not the
 * order they appear here. Kept as a single utility so every component
 * composes classes the same way — do not reach for a different helper. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
