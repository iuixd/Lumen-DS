import type { Meta, StoryObj } from "@storybook/react";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroup";
import { BoldIcon } from "../../icons/generated/BoldIcon";
import { ItalicIcon } from "../../icons/generated/ItalicIcon";
import { UnderlineIcon } from "../../icons/generated/UnderlineIcon";

const meta = {
  title: "Composite/ToggleGroup",
  component: ToggleGroup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Group of independently- or exclusively-toggleable buttons, sourced from shadcn/ui (Radix ToggleGroup) and adapted to Lumen's token system — see docs/shadcn-integration.md. Overlaps with SegmentedControl but supports independent multi-select (e.g. a formatting toolbar). Dark mode follows the global `data-theme` toolbar toggle, not a separate story."
      }
    }
  },
  // ToggleGroup's props are a discriminated union on `type` — every story
  // below drives its own props via `render`, so this is only a placeholder
  // to satisfy the required-args type (same pattern as Accordion.stories.tsx).
  args: { type: "single" }
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Multiple: Story = {
  render: () => (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <BoldIcon className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <ItalicIcon className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <UnderlineIcon className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
};

export const Single: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="left">
      <ToggleGroupItem value="left" aria-label="Align left">
        Left
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        Center
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        Right
      </ToggleGroupItem>
    </ToggleGroup>
  )
};

export const Outline: Story = {
  render: () => (
    <ToggleGroup type="multiple" variant="outline">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <BoldIcon className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <ItalicIcon className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
};

export const DisabledItem: Story = {
  render: () => (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <BoldIcon className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic" disabled>
        <ItalicIcon className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
};
