import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ChoiceChip } from "./ChoiceChip";

const meta = {
  title: "Primitives/ChoiceChip",
  component: ChoiceChip,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Sourced from the Figma 'Buttons' page (Lumen-AI-Design-System, node 581:485): a toggleable pill for a single-value choice. Unselected shows plain text; selected fills solid brand and gains a leading check icon. Only the `lg` size (36px) is specced."
      }
    }
  },
  argTypes: {
    selected: { control: "boolean" },
    disabled: { control: "boolean" }
  },
  args: {
    children: "Small",
    selected: false,
    disabled: false
  }
} satisfies Meta<typeof ChoiceChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <ChoiceChip>Default</ChoiceChip>
      <ChoiceChip selected>Selected</ChoiceChip>
      <ChoiceChip disabled>Disabled</ChoiceChip>
    </div>
  )
};

export const SingleChoiceGroup: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    function Demo() {
      const sizes = ["Small", "Medium", "Large"];
      const [selected, setSelected] = useState("Medium");
      return (
        <div className="flex flex-wrap items-center gap-3">
          {sizes.map((size) => (
            <ChoiceChip key={size} selected={selected === size} onClick={() => setSelected(size)}>
              {size}
            </ChoiceChip>
          ))}
        </div>
      );
    }
    return <Demo />;
  }
};
