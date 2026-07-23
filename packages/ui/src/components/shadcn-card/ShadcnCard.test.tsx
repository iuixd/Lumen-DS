import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ShadcnCard, ShadcnCardContent, ShadcnCardDescription, ShadcnCardHeader, ShadcnCardTitle } from "./ShadcnCard";
import * as PublicExports from "../../index";

describe("ShadcnCard", () => {
  it("is exported from @lumen/ui's public entry point", () => {
    expect(PublicExports.ShadcnCard).toBe(ShadcnCard);
    expect(PublicExports.ShadcnCardHeader).toBeDefined();
    expect(PublicExports.ShadcnCardTitle).toBeDefined();
    expect(PublicExports.ShadcnCardDescription).toBeDefined();
    expect(PublicExports.ShadcnCardContent).toBeDefined();
    expect(PublicExports.ShadcnCardFooter).toBeDefined();
  });

  it("renders its title, description, and content", () => {
    render(
      <ShadcnCard>
        <ShadcnCardHeader>
          <ShadcnCardTitle>Create project</ShadcnCardTitle>
          <ShadcnCardDescription>Deploy in one click.</ShadcnCardDescription>
        </ShadcnCardHeader>
        <ShadcnCardContent>Body content</ShadcnCardContent>
      </ShadcnCard>
    );
    expect(screen.getByText("Create project")).toBeInTheDocument();
    expect(screen.getByText("Deploy in one click.")).toBeInTheDocument();
    expect(screen.getByText("Body content")).toBeInTheDocument();
  });
});
