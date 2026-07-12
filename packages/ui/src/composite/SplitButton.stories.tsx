import type { Meta, StoryObj } from "@storybook/react";
import { SplitButton } from "./SplitButton";

const meta = {
  title: "Composite/SplitButton",
  component: SplitButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Sourced from the Figma 'Buttons' page (Lumen-DS-2027, node 555:300): a primary action joined to a dropdown-toggle by a divider. Only Primary, Raised, and Secondary are specced (no Tertiary/Link), and only the `lg` size — there's no `size` prop until Figma specs other sizes."
      }
    }
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "raised", "secondary"]
    },
    pill: { control: "boolean" },
    isLoading: { control: "boolean" },
    disabled: { control: "boolean" }
  },
  args: {
    children: "Save changes",
    variant: "primary",
    pill: false,
    isLoading: false,
    disabled: false,
    dropdownLabel: "More save options"
  }
} satisfies Meta<typeof SplitButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <SplitButton variant="primary" dropdownLabel="More save options">
        Primary
      </SplitButton>
      <SplitButton variant="raised" dropdownLabel="More save options">
        Raised
      </SplitButton>
      <SplitButton variant="secondary" dropdownLabel="More save options">
        Secondary
      </SplitButton>
    </div>
  )
};

export const Pill: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <SplitButton pill variant="primary" dropdownLabel="More save options">
        Primary
      </SplitButton>
      <SplitButton pill variant="raised" dropdownLabel="More save options">
        Raised
      </SplitButton>
      <SplitButton pill variant="secondary" dropdownLabel="More save options">
        Secondary
      </SplitButton>
    </div>
  )
};

export const Loading: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <SplitButton isLoading variant="primary" dropdownLabel="More save options">
        Saving
      </SplitButton>
      <SplitButton isLoading variant="raised" dropdownLabel="More save options">
        Saving
      </SplitButton>
      <SplitButton isLoading variant="secondary" dropdownLabel="More save options">
        Saving
      </SplitButton>
    </div>
  )
};

export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <SplitButton disabled variant="primary" dropdownLabel="More save options">
        Save changes
      </SplitButton>
      <SplitButton disabled variant="raised" dropdownLabel="More save options">
        Save changes
      </SplitButton>
      <SplitButton disabled variant="secondary" dropdownLabel="More save options">
        Save changes
      </SplitButton>
    </div>
  )
};
