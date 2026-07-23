import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  ShadcnSelect,
  ShadcnSelectContent,
  ShadcnSelectItem,
  ShadcnSelectTrigger,
  ShadcnSelectValue
} from "./ShadcnSelect";
import * as PublicExports from "../../index";

beforeEach(() => {
  Element.prototype.hasPointerCapture = vi.fn();
  Element.prototype.scrollIntoView = vi.fn();
});

function BasicSelect() {
  return (
    <ShadcnSelect>
      <ShadcnSelectTrigger>
        <ShadcnSelectValue placeholder="Select a fruit" />
      </ShadcnSelectTrigger>
      <ShadcnSelectContent>
        <ShadcnSelectItem value="apple">Apple</ShadcnSelectItem>
        <ShadcnSelectItem value="banana">Banana</ShadcnSelectItem>
        <ShadcnSelectItem value="orange" disabled>
          Orange
        </ShadcnSelectItem>
      </ShadcnSelectContent>
    </ShadcnSelect>
  );
}

describe("ShadcnSelect", () => {
  it("is exported from @lumen/ui's public entry point", () => {
    expect(PublicExports.ShadcnSelect).toBe(ShadcnSelect);
    expect(PublicExports.ShadcnSelectTrigger).toBeDefined();
    expect(PublicExports.ShadcnSelectContent).toBeDefined();
    expect(PublicExports.ShadcnSelectItem).toBeDefined();
    expect(PublicExports.ShadcnSelectValue).toBeDefined();
  });

  it("shows the placeholder and opens its options on trigger click", async () => {
    render(<BasicSelect />);
    expect(screen.getByText("Select a fruit")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("combobox"));
    expect(screen.getByText("Apple")).toBeInTheDocument();
  });

  it("selects an option and updates the displayed value", async () => {
    render(<BasicSelect />);
    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(screen.getByText("Banana"));
    expect(screen.getByRole("combobox")).toHaveTextContent("Banana");
  });
});
