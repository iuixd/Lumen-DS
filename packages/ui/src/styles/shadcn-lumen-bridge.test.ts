import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { describe, expect, it } from "vitest";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const bridgeCss = readFileSync(path.join(dirname, "shadcn-lumen-bridge.css"), "utf8");
const indexTs = readFileSync(path.join(dirname, "../index.ts"), "utf8");

// The exact default values shadcn's own (uncustomized) "new-york"/neutral
// theme ships with. Their presence anywhere in the bridge would mean an
// un-mapped shadcn default slipped in instead of a real Lumen token.
const SHADCN_DEFAULT_VALUES = [
  "222.2 84% 4.9%", // default --foreground
  "0 0% 100%", // default --background / --card / --popover
  "0 0% 3.9%", // default dark --background
  "0 0% 9%" // default dark --primary
];

describe("shadcn-lumen-bridge.css", () => {
  it("maps every shadcn compatibility variable to a Lumen token, not a raw value", () => {
    const requiredVars = [
      "--background",
      "--foreground",
      "--card",
      "--card-foreground",
      "--popover",
      "--popover-foreground",
      "--primary",
      "--primary-foreground",
      "--secondary",
      "--secondary-foreground",
      "--muted",
      "--muted-foreground",
      "--accent",
      "--accent-foreground",
      "--destructive",
      "--destructive-foreground",
      "--border",
      "--input",
      "--ring",
      "--radius"
    ];
    for (const name of requiredVars) {
      const declaration = new RegExp(`${name.replace("-", "\\-")}:\\s*var\\(--[a-z0-9-]+\\)`, "i");
      expect(bridgeCss, `expected ${name} to resolve through var(--color-... / --radius-...)`).toMatch(
        declaration
      );
    }
  });

  it("never commits shadcn's own default (uncustomized) theme values", () => {
    for (const value of SHADCN_DEFAULT_VALUES) {
      expect(bridgeCss).not.toContain(value);
    }
  });

  it("does not redefine a duplicate dark-mode block (Lumen tokens already swap under [data-theme])", () => {
    // Match an actual rule (selector immediately followed by `{`), not the
    // explanatory comment above that mentions the attribute by name.
    expect(bridgeCss).not.toMatch(/\[data-theme=["']dark["']\]\s*\{/);
  });
});

describe("@lumen/ui public API boundary", () => {
  it("does not re-export the internal shadcn component directory", () => {
    expect(indexTs).not.toMatch(/from ["']\.\/components\/internal/);
  });

  it("re-exports Command only through its public wrapper module", () => {
    expect(indexTs).toMatch(/from ["']\.\/components\/command\/Command["']/);
  });
});
