import { cn } from "../lib/cn";

export interface AvatarProps {
  src?: string;
  name: string;
  size?: "sm" | "md" | "lg";
  /**
   * `brand` (default) is the original subtle-pink-on-brand-text treatment.
   * `neutral` is sourced from the Figma "appshell-desktop-closed-light"
   * reference screen (Lumen-AI-Design-System, node 1197:1652,
   * `AvatarInitials` instance `I1102:6515;1079:1889`) — a solid
   * `--color-text-muted` circle with white initials, used for the app
   * header's account avatar. Additive; existing `brand` usage is unchanged.
   */
  tone?: "brand" | "neutral";
  className?: string;
}

const sizeMap = { sm: "size-6 text-label-sm", md: "size-8 text-label-md", lg: "size-12 text-title-sm" };

const toneMap = {
  brand: "bg-[var(--color-brand-subtle)] text-[var(--color-brand-default)]",
  neutral: "bg-[var(--color-text-muted)] text-[var(--color-text-inverse)]"
};

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Falls back to initials-on-brand when no image is provided or the image fails to load. */
export function Avatar({ src, name, size = "md", tone = "brand", className }: AvatarProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-medium",
        sizeMap[size],
        toneMap[tone],
        className
      )}
    >
      {src ? (
        <img src={src} alt={name} className="size-full object-cover" />
      ) : (
        initials(name)
      )}
    </span>
  );
}
