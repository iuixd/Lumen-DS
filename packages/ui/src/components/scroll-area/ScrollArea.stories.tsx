import type { Meta, StoryObj } from "@storybook/react";
import { ScrollArea } from "./ScrollArea";
import { Separator } from "../separator/Separator";

const meta = {
  title: "Primitives/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Custom-styled scrollable container, sourced from shadcn/ui (Radix ScrollArea) and adapted to Lumen's token system — see docs/shadcn-integration.md. Dark mode follows the global `data-theme` toolbar toggle, not a separate story."
      }
    }
  }
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const TAGS = Array.from({ length: 40 }, (_, i) => `Tag ${i + 1}`);

export const Vertical: Story = {
  render: () => (
    <ScrollArea className="h-72 w-48 rounded-md border p-4">
      <div className="text-label-sm font-medium">Tags</div>
      {TAGS.map((tag) => (
        <div key={tag}>
          <Separator className="my-2" />
          <div className="text-body-sm">{tag}</div>
        </div>
      ))}
    </ScrollArea>
  )
};

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
      <div className="flex w-max gap-4 p-4">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="flex h-24 w-24 shrink-0 items-center justify-center rounded-md border bg-muted text-body-sm"
          >
            Item {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
};

export const SmallViewport: Story = {
  render: () => (
    <div style={{ width: 200 }}>
      <ScrollArea className="h-40 w-full rounded-md border p-3">
        {TAGS.slice(0, 15).map((tag) => (
          <div key={tag} className="py-1 text-body-sm">
            {tag}
          </div>
        ))}
      </ScrollArea>
    </div>
  )
};
