import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./Separator";

const meta = {
  title: "Primitives/Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Visual (or semantic) divider line, sourced from shadcn/ui (Radix Separator) — see docs/shadcn-integration.md. Dark mode follows the global `data-theme` toolbar toggle, not a separate story."
      }
    }
  }
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-[300px]">
      <div className="text-body-md">Section one</div>
      <Separator className="my-4" />
      <div className="text-body-md">Section two</div>
    </div>
  )
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-8 items-center gap-4">
      <span className="text-body-sm">Blog</span>
      <Separator orientation="vertical" />
      <span className="text-body-sm">Docs</span>
      <Separator orientation="vertical" />
      <span className="text-body-sm">Source</span>
    </div>
  )
};
