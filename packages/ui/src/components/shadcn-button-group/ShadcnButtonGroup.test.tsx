import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ShadcnButtonGroup, ShadcnButtonGroupSeparator, ShadcnButtonGroupText } from "./ShadcnButtonGroup";
import { ShadcnButton } from "../shadcn-button/ShadcnButton";
import * as PublicExports from "../../index";

describe("ShadcnButtonGroup", () => {
  it("is exported from @lumen/ui's public entry point", () => {
    expect(PublicExports.ShadcnButtonGroup).toBe(ShadcnButtonGroup);
    expect(PublicExports.ShadcnButtonGroupText).toBeDefined();
    expect(PublicExports.ShadcnButtonGroupSeparator).toBeDefined();
  });

  it("renders as a group role with its buttons", () => {
    render(
      <ShadcnButtonGroup>
        <ShadcnButton>Left</ShadcnButton>
        <ShadcnButton>Right</ShadcnButton>
      </ShadcnButtonGroup>
    );
    expect(screen.getByRole("group")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Left" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Right" })).toBeInTheDocument();
  });

  it("reflects orientation via a data attribute", () => {
    render(
      <ShadcnButtonGroup orientation="vertical" data-testid="group">
        <ShadcnButton>Top</ShadcnButton>
      </ShadcnButtonGroup>
    );
    expect(screen.getByTestId("group")).toHaveAttribute("data-orientation", "vertical");
  });

  it("renders static text alongside buttons", () => {
    render(
      <ShadcnButtonGroup>
        <ShadcnButton>Copy</ShadcnButton>
        <ShadcnButtonGroupSeparator />
        <ShadcnButtonGroupText>Read-only</ShadcnButtonGroupText>
      </ShadcnButtonGroup>
    );
    expect(screen.getByText("Read-only")).toBeInTheDocument();
  });
});
