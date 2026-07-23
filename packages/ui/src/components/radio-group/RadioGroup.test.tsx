import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RadioGroup, RadioGroupItem } from "./RadioGroup";
import * as PublicExports from "../../index";

describe("RadioGroup", () => {
  it("is exported from @lumen/ui's public entry point", () => {
    expect(PublicExports.RadioGroup).toBe(RadioGroup);
    expect(PublicExports.RadioGroupItem).toBeDefined();
  });

  it("selects the defaultValue item and allows switching selection", async () => {
    render(
      <RadioGroup defaultValue="comfortable">
        <RadioGroupItem value="default" aria-label="Default" />
        <RadioGroupItem value="comfortable" aria-label="Comfortable" />
      </RadioGroup>
    );
    const comfortable = screen.getByRole("radio", { name: "Comfortable" });
    const defaultOption = screen.getByRole("radio", { name: "Default" });
    expect(comfortable).toHaveAttribute("aria-checked", "true");

    await userEvent.click(defaultOption);
    expect(defaultOption).toHaveAttribute("aria-checked", "true");
    expect(comfortable).toHaveAttribute("aria-checked", "false");
  });

  it("does not select a disabled item", async () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="compact" aria-label="Compact" disabled />
      </RadioGroup>
    );
    const compact = screen.getByRole("radio", { name: "Compact" });
    await userEvent.click(compact);
    expect(compact).toHaveAttribute("aria-checked", "false");
  });
});
