import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./Collapsible";
import * as PublicExports from "../../index";

describe("Collapsible", () => {
  it("is exported from @lumen/ui's public entry point", () => {
    expect(PublicExports.Collapsible).toBe(Collapsible);
    expect(PublicExports.CollapsibleTrigger).toBeDefined();
    expect(PublicExports.CollapsibleContent).toBeDefined();
  });

  it("is closed by default and opens on trigger click", async () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Hidden content</CollapsibleContent>
      </Collapsible>
    );
    expect(screen.queryByText("Hidden content")).not.toBeInTheDocument();

    await userEvent.click(screen.getByText("Toggle"));
    expect(screen.getByText("Hidden content")).toBeInTheDocument();
  });

  it("respects defaultOpen", () => {
    render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Visible content</CollapsibleContent>
      </Collapsible>
    );
    expect(screen.getByText("Visible content")).toBeInTheDocument();
  });
});
