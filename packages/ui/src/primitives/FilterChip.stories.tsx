import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FilterChip } from "./FilterChip";

const meta = {
  title: "Primitives/FilterChip",
  component: FilterChip,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Sourced from the Figma 'Buttons' page (Lumen-AI-Design-System, node 581:409): a toggleable pill for adding/removing a filter. Unselected shows a leading plus icon; selected fills solid brand and keeps the leading icon while adding a trailing remove icon. Only the `lg` size (36px) is specced."
      }
    }
  },
  argTypes: {
    selected: { control: "boolean" },
    disabled: { control: "boolean" }
  },
  args: {
    children: "Status",
    selected: false,
    disabled: false
  }
} satisfies Meta<typeof FilterChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <FilterChip>Default</FilterChip>
      <FilterChip selected>Selected</FilterChip>
      <FilterChip disabled>Disabled</FilterChip>
    </div>
  )
};

export const Interactive: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    function Demo() {
      const [selected, setSelected] = useState(false);
      return (
        <FilterChip selected={selected} onClick={() => setSelected((s) => !s)}>
          Status
        </FilterChip>
      );
    }
    return <Demo />;
  }
};
