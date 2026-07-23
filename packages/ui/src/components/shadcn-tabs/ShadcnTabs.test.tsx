import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ShadcnTabs, ShadcnTabsContent, ShadcnTabsList, ShadcnTabsTrigger } from "./ShadcnTabs";
import * as PublicExports from "../../index";

describe("ShadcnTabs", () => {
  it("is exported from @lumen/ui's public entry point", () => {
    expect(PublicExports.ShadcnTabs).toBe(ShadcnTabs);
    expect(PublicExports.ShadcnTabsList).toBeDefined();
    expect(PublicExports.ShadcnTabsTrigger).toBeDefined();
    expect(PublicExports.ShadcnTabsContent).toBeDefined();
  });

  it("shows the default tab's content and switches on trigger click", async () => {
    render(
      <ShadcnTabs defaultValue="account">
        <ShadcnTabsList>
          <ShadcnTabsTrigger value="account">Account</ShadcnTabsTrigger>
          <ShadcnTabsTrigger value="password">Password</ShadcnTabsTrigger>
        </ShadcnTabsList>
        <ShadcnTabsContent value="account">Account content</ShadcnTabsContent>
        <ShadcnTabsContent value="password">Password content</ShadcnTabsContent>
      </ShadcnTabs>
    );
    expect(screen.getByText("Account content")).toBeInTheDocument();
    expect(screen.queryByText("Password content")).not.toBeInTheDocument();

    await userEvent.click(screen.getByText("Password"));
    expect(screen.getByText("Password content")).toBeInTheDocument();
    expect(screen.queryByText("Account content")).not.toBeInTheDocument();
  });

  it("does not switch to a disabled tab", async () => {
    render(
      <ShadcnTabs defaultValue="account">
        <ShadcnTabsList>
          <ShadcnTabsTrigger value="account">Account</ShadcnTabsTrigger>
          <ShadcnTabsTrigger value="password" disabled>
            Password
          </ShadcnTabsTrigger>
        </ShadcnTabsList>
        <ShadcnTabsContent value="account">Account content</ShadcnTabsContent>
        <ShadcnTabsContent value="password">Password content</ShadcnTabsContent>
      </ShadcnTabs>
    );
    await userEvent.click(screen.getByText("Password"));
    expect(screen.getByText("Account content")).toBeInTheDocument();
  });
});
