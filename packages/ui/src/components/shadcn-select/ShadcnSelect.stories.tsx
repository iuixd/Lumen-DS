import type { Meta, StoryObj } from "@storybook/react";
import {
  ShadcnSelect,
  ShadcnSelectContent,
  ShadcnSelectItem,
  ShadcnSelectTrigger,
  ShadcnSelectValue
} from "./ShadcnSelect";

const meta = {
  title: "Primitives/ShadcnSelect",
  component: ShadcnSelect,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "shadcn/ui's own Select (Radix Select), sourced and adapted to Lumen's token system — see docs/shadcn-integration.md. `Shadcn`-prefixed because Lumen's own `Select` already fills this role; prefer `Select` for direct product use. Dark mode follows the global `data-theme` toolbar toggle, not a separate story."
      }
    }
  }
} satisfies Meta<typeof ShadcnSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ShadcnSelect>
      <ShadcnSelectTrigger className="w-[220px]">
        <ShadcnSelectValue placeholder="Select a fruit" />
      </ShadcnSelectTrigger>
      <ShadcnSelectContent>
        <ShadcnSelectItem value="apple">Apple</ShadcnSelectItem>
        <ShadcnSelectItem value="banana">Banana</ShadcnSelectItem>
        <ShadcnSelectItem value="orange" disabled>
          Orange (disabled)
        </ShadcnSelectItem>
      </ShadcnSelectContent>
    </ShadcnSelect>
  )
};

export const Disabled: Story = {
  render: () => (
    <ShadcnSelect disabled>
      <ShadcnSelectTrigger className="w-[220px]">
        <ShadcnSelectValue placeholder="Select a fruit" />
      </ShadcnSelectTrigger>
      <ShadcnSelectContent>
        <ShadcnSelectItem value="apple">Apple</ShadcnSelectItem>
      </ShadcnSelectContent>
    </ShadcnSelect>
  )
};

export const OpenState: Story = {
  render: () => (
    <ShadcnSelect defaultOpen>
      <ShadcnSelectTrigger className="w-[220px]">
        <ShadcnSelectValue placeholder="Select a fruit" />
      </ShadcnSelectTrigger>
      <ShadcnSelectContent>
        <ShadcnSelectItem value="apple">Apple</ShadcnSelectItem>
        <ShadcnSelectItem value="banana">Banana</ShadcnSelectItem>
      </ShadcnSelectContent>
    </ShadcnSelect>
  )
};
