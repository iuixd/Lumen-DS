// Tailwind preset for shadcn-sourced components (packages/ui/src/components/internal/**).
// Extends whichever Lumen preset is already loaded with the small, fixed set
// of color/radius keys shadcn-generated markup expects (bg-popover,
// text-accent-foreground, rounded-lg, ...). Every key here resolves through
// a CSS variable defined once in shadcn-lumen-bridge.css, which in turn
// points at a real @lumen/tokens semantic variable — no new colors or radii
// are introduced by this file itself.
//
// Consumed by both packages/ui/tailwind.config.cjs and
// packages/storybook/tailwind.config.cjs (Storybook renders @lumen/ui's
// source directly, so it needs the same extension to render these
// components correctly) — kept as one shared file so the two configs can't
// drift apart.
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)"
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)"
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)"
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)"
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)"
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)"
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)"
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      }
    }
  }
};
