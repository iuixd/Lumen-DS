import type { Meta, StoryObj } from "@storybook/react";
import { ShadcnInput } from "./ShadcnInput";

const meta = {
  title: "Primitives/ShadcnInput",
  component: ShadcnInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "shadcn/ui's own Input, sourced and adapted to Lumen's token system — see docs/shadcn-integration.md. `Shadcn`-prefixed because Lumen's own `Input` already fills this role; prefer `Input` for direct product use. Dark mode follows the global `data-theme` toolbar toggle, not a separate story."
      }
    }
  },
  args: { placeholder: "Email" }
} satisfies Meta<typeof ShadcnInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <ShadcnInput {...args} className="w-[280px]" />
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => <ShadcnInput {...args} className="w-[280px]" />
};

export const FileType: Story = {
  args: { type: "file" },
  render: (args) => <ShadcnInput {...args} className="w-[280px]" />
};
