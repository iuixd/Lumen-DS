import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./Accordion";
import * as PublicExports from "../../index";

function BasicAccordion() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>First question</AccordionTrigger>
        <AccordionContent>First answer</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second question</AccordionTrigger>
        <AccordionContent>Second answer</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3" disabled>
        <AccordionTrigger>Disabled question</AccordionTrigger>
        <AccordionContent>Disabled answer</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

describe("Accordion", () => {
  it("is exported from @lumen/ui's public entry point", () => {
    expect(PublicExports.Accordion).toBe(Accordion);
    expect(PublicExports.AccordionItem).toBeDefined();
    expect(PublicExports.AccordionTrigger).toBeDefined();
    expect(PublicExports.AccordionContent).toBeDefined();
  });

  it("renders triggers and keeps content collapsed by default", () => {
    render(<BasicAccordion />);
    expect(screen.getByText("First question")).toBeInTheDocument();
    expect(screen.getByText("Second question")).toBeInTheDocument();
    expect(screen.queryByText("First answer")).not.toBeInTheDocument();
  });

  it("expands an item's content when its trigger is clicked, and collapses it on a second click", async () => {
    render(<BasicAccordion />);
    const trigger = screen.getByText("First question");

    await userEvent.click(trigger);
    expect(screen.getByText("First answer")).toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    await userEvent.click(trigger);
    expect(screen.queryByText("First answer")).not.toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("collapses the previously open item when type=\"single\" (non-multiple)", async () => {
    render(<BasicAccordion />);
    await userEvent.click(screen.getByText("First question"));
    expect(screen.getByText("First answer")).toBeInTheDocument();

    await userEvent.click(screen.getByText("Second question"));
    expect(screen.getByText("Second answer")).toBeInTheDocument();
    expect(screen.queryByText("First answer")).not.toBeInTheDocument();
  });

  it("supports keyboard activation via Enter and Space", async () => {
    render(<BasicAccordion />);
    const trigger = screen.getByText("First question");
    trigger.focus();

    await userEvent.keyboard("{Enter}");
    expect(screen.getByText("First answer")).toBeInTheDocument();

    await userEvent.keyboard(" ");
    expect(screen.queryByText("First answer")).not.toBeInTheDocument();
  });

  it("moves focus between triggers with ArrowDown/ArrowUp", async () => {
    render(<BasicAccordion />);
    const first = screen.getByText("First question");
    const second = screen.getByText("Second question");

    first.focus();
    await userEvent.keyboard("{ArrowDown}");
    expect(second).toHaveFocus();

    await userEvent.keyboard("{ArrowUp}");
    expect(first).toHaveFocus();
  });

  it("does not expand a disabled item", async () => {
    const onValueChange = vi.fn();
    render(
      <Accordion type="single" collapsible onValueChange={onValueChange}>
        <AccordionItem value="item-1" disabled>
          <AccordionTrigger>Disabled question</AccordionTrigger>
          <AccordionContent>Disabled answer</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    await userEvent.click(screen.getByText("Disabled question"));
    expect(screen.queryByText("Disabled answer")).not.toBeInTheDocument();
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("allows multiple items open at once with type=\"multiple\"", async () => {
    render(
      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger>First question</AccordionTrigger>
          <AccordionContent>First answer</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Second question</AccordionTrigger>
          <AccordionContent>Second answer</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    await userEvent.click(screen.getByText("First question"));
    await userEvent.click(screen.getByText("Second question"));
    expect(screen.getByText("First answer")).toBeInTheDocument();
    expect(screen.getByText("Second answer")).toBeInTheDocument();
  });
});
