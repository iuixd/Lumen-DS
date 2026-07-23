import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ShadcnTooltip, ShadcnTooltipContent, ShadcnTooltipProvider, ShadcnTooltipTrigger } from "./ShadcnTooltip";
import * as PublicExports from "../../index";

describe("ShadcnTooltip", () => {
  it("is exported from @lumen/ui's public entry point", () => {
    expect(PublicExports.ShadcnTooltip).toBe(ShadcnTooltip);
    expect(PublicExports.ShadcnTooltipTrigger).toBeDefined();
    expect(PublicExports.ShadcnTooltipContent).toBeDefined();
    expect(PublicExports.ShadcnTooltipProvider).toBeDefined();
  });

  it("is closed by default", () => {
    render(
      <ShadcnTooltipProvider>
        <ShadcnTooltip>
          <ShadcnTooltipTrigger>Hover me</ShadcnTooltipTrigger>
          <ShadcnTooltipContent>Tooltip body</ShadcnTooltipContent>
        </ShadcnTooltip>
      </ShadcnTooltipProvider>
    );
    expect(screen.queryByText("Tooltip body")).not.toBeInTheDocument();
  });

  it("opens on trigger hover", async () => {
    const user = userEvent.setup();
    render(
      <ShadcnTooltipProvider delayDuration={0}>
        <ShadcnTooltip>
          <ShadcnTooltipTrigger>Hover me</ShadcnTooltipTrigger>
          <ShadcnTooltipContent>Tooltip body</ShadcnTooltipContent>
        </ShadcnTooltip>
      </ShadcnTooltipProvider>
    );
    await user.hover(screen.getByText("Hover me"));
    await waitFor(() => expect(screen.getByText("Tooltip body")).toBeInTheDocument());
  });
});
