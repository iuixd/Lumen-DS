import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Alert, AlertDescription, AlertTitle } from "./Alert";
import * as PublicExports from "../../index";

describe("Alert", () => {
  it("is exported from @lumen/ui's public entry point", () => {
    expect(PublicExports.Alert).toBe(Alert);
    expect(PublicExports.AlertTitle).toBeDefined();
    expect(PublicExports.AlertDescription).toBeDefined();
  });

  it("renders with role=alert and its title/description", () => {
    render(
      <Alert>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>Something to know.</AlertDescription>
      </Alert>
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Heads up!")).toBeInTheDocument();
    expect(screen.getByText("Something to know.")).toBeInTheDocument();
  });

  it("defaults to the default variant and supports destructive", () => {
    const { rerender } = render(<Alert data-testid="alert">Default</Alert>);
    expect(screen.getByTestId("alert").className).toContain("bg-background");

    rerender(
      <Alert data-testid="alert" variant="destructive">
        Destructive
      </Alert>
    );
    expect(screen.getByTestId("alert").className).toContain("text-destructive");
  });
});
