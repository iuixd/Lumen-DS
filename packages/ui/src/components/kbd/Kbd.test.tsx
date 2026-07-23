import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Kbd, KbdGroup } from "./Kbd";
import * as PublicExports from "../../index";

describe("Kbd", () => {
  it("is exported from @lumen/ui's public entry point", () => {
    expect(PublicExports.Kbd).toBe(Kbd);
    expect(PublicExports.KbdGroup).toBeDefined();
  });

  it("renders as a <kbd> element with its label", () => {
    render(<Kbd>Esc</Kbd>);
    const el = screen.getByText("Esc");
    expect(el.tagName).toBe("KBD");
  });

  it("groups multiple keys together", () => {
    render(
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    );
    expect(screen.getByText("Ctrl")).toBeInTheDocument();
    expect(screen.getByText("K")).toBeInTheDocument();
  });
});
