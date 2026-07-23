import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Skeleton } from "./Skeleton";
import * as PublicExports from "../../index";

describe("Skeleton", () => {
  it("is exported from @lumen/ui's public entry point", () => {
    expect(PublicExports.Skeleton).toBe(Skeleton);
  });

  it("renders a pulsing placeholder block with the bridged muted surface", () => {
    const { container } = render(<Skeleton data-testid="skeleton" className="h-4 w-32" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toContain("animate-pulse");
    expect(el.className).toContain("bg-muted");
  });

  it("merges consumer className with its base classes", () => {
    const { container } = render(<Skeleton className="h-10 w-10 rounded-full" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toContain("rounded-full");
    expect(el.className).toContain("h-10");
  });
});
