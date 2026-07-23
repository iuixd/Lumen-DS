import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./HoverCard";
import * as PublicExports from "../../index";

describe("HoverCard", () => {
  it("is exported from @lumen/ui's public entry point", () => {
    expect(PublicExports.HoverCard).toBe(HoverCard);
    expect(PublicExports.HoverCardTrigger).toBeDefined();
    expect(PublicExports.HoverCardContent).toBeDefined();
  });

  it("is closed by default", () => {
    render(
      <HoverCard>
        <HoverCardTrigger>@lumen</HoverCardTrigger>
        <HoverCardContent>Card body</HoverCardContent>
      </HoverCard>
    );
    expect(screen.queryByText("Card body")).not.toBeInTheDocument();
  });

  it("opens on trigger hover", async () => {
    const user = userEvent.setup();
    render(
      <HoverCard openDelay={0}>
        <HoverCardTrigger>@lumen</HoverCardTrigger>
        <HoverCardContent>Card body</HoverCardContent>
      </HoverCard>
    );
    await user.hover(screen.getByText("@lumen"));
    await waitFor(() => expect(screen.getByText("Card body")).toBeInTheDocument());
  });

  it("renders open when defaultOpen is set", () => {
    render(
      <HoverCard defaultOpen>
        <HoverCardTrigger>@lumen</HoverCardTrigger>
        <HoverCardContent>Card body</HoverCardContent>
      </HoverCard>
    );
    expect(screen.getByText("Card body")).toBeInTheDocument();
  });
});
