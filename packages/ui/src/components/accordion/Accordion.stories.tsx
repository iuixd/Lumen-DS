import type { Meta, StoryObj } from "@storybook/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./Accordion";

const meta = {
  title: "Composite/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Expand/collapse disclosure list, sourced from shadcn/ui (Radix Accordion) and adapted to Lumen's token system — see docs/shadcn-integration.md. Colors, radius, and typography resolve through packages/ui/src/styles/shadcn-lumen-bridge.css onto existing Lumen semantic tokens. Expand/collapse is instant (no entrance/exit animation) pending Lumen defining its own motion/duration tokens; dark mode follows the same global `data-theme` toolbar toggle every other story in this system uses, not a separate story."
      }
    }
  },
  // Accordion's props are a discriminated union on `type` — every story below
  // drives its own props via `render`, so this is only a placeholder to
  // satisfy the required-args type (same pattern as Modal.stories.tsx).
  args: { type: "single" }
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-[360px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is Lumen?</AccordionTrigger>
        <AccordionContent>
          Lumen is the single source of truth for design tokens, components, layout
          primitives, and enterprise patterns used across Lumen SaaS products.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It follows the WAI-ARIA accordion pattern via Radix's Accordion
          primitive — full keyboard navigation and screen-reader support included.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Does it support dark mode?</AccordionTrigger>
        <AccordionContent>
          Yes. Every color resolves through Lumen's existing semantic tokens, which
          already swap under the theme toolbar toggle above.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
};

/** Radix supports multiple simultaneously-open items via `type="multiple"`
 * (the Default story above uses `type="single" collapsible`, where opening
 * one item closes any other). */
export const MultipleOpen: Story = {
  render: () => (
    <Accordion type="multiple" className="w-[360px]" defaultValue={["item-1", "item-2"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>First section</AccordionTrigger>
        <AccordionContent>Open by default alongside the second section.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second section</AccordionTrigger>
        <AccordionContent>Also open by default — both can stay expanded at once.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Third section</AccordionTrigger>
        <AccordionContent>Closed by default; opening it doesn't close the others.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
};

/** Radix's `disabled` prop on AccordionItem prevents its trigger from
 * receiving focus or responding to activation. */
export const DisabledItem: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-[360px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Available section</AccordionTrigger>
        <AccordionContent>This section can be expanded normally.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" disabled>
        <AccordionTrigger>Unavailable section (disabled)</AccordionTrigger>
        <AccordionContent>This content is not reachable while disabled.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
};

export const LongContent: Story = {
  render: () => (
    <Accordion type="single" collapsible defaultValue="item-1" className="w-[360px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Terms and conditions</AccordionTrigger>
        <AccordionContent>
          {Array.from({ length: 8 }, (_, i) => (
            <p key={i} className="mb-2 last:mb-0">
              Paragraph {i + 1}: this section demonstrates an accordion panel with enough
              content to scroll the surrounding page, rather than the panel itself.
            </p>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
};

/** Accordion has no fixed width of its own — this fixes the viewport-facing
 * container to a small width to demonstrate it stays usable at mobile/narrow
 * breakpoints, and that long trigger text wraps instead of overflowing. */
export const SmallViewport: Story = {
  render: () => (
    <div style={{ width: 240 }}>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>A somewhat long question that wraps</AccordionTrigger>
          <AccordionContent>Answer content at a narrow viewport width.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Second question</AccordionTrigger>
          <AccordionContent>More answer content.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
};
