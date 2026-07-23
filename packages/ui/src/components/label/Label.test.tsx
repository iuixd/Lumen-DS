import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Label } from "./Label";
import * as PublicExports from "../../index";

describe("Label", () => {
  it("is exported from @lumen/ui's public entry point", () => {
    expect(PublicExports.Label).toBe(Label);
  });

  it("associates with its control via htmlFor", () => {
    render(
      <>
        <Label htmlFor="email">Email address</Label>
        <input id="email" type="email" />
      </>
    );
    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
  });
});
