import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ScrollArea } from "./ScrollArea";
import * as PublicExports from "../../index";

describe("ScrollArea", () => {
  it("is exported from @lumen/ui's public entry point", () => {
    expect(PublicExports.ScrollArea).toBe(ScrollArea);
    expect(PublicExports.ScrollBar).toBeDefined();
  });

  it("renders its children inside the scrollable viewport", () => {
    render(
      <ScrollArea data-testid="scroll-area">
        <div>scrollable content</div>
      </ScrollArea>
    );
    expect(screen.getByText("scrollable content")).toBeInTheDocument();
    expect(screen.getByTestId("scroll-area")).toBeInTheDocument();
  });

  it("merges consumer className with its base classes", () => {
    render(
      <ScrollArea data-testid="scroll-area" className="h-72 w-48">
        content
      </ScrollArea>
    );
    expect(screen.getByTestId("scroll-area").className).toContain("h-72");
  });
});
