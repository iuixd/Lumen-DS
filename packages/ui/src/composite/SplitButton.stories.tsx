import type { Meta, StoryObj } from "@storybook/react";
import { SplitButton } from "./SplitButton";
import { PlusIcon } from "../icons/generated";

const meta = {
  title: "Composite/SplitButton",
  component: SplitButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Sourced from the Figma 'Buttons' page (Lumen-DS-2027, node 555:300): a primary action joined to a dropdown-toggle by a divider. Primary, Raised, Secondary, and Outline are specced (no Tertiary/Link), in sm/md/lg sizes, with an optional leading icon."
      }
    }
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "raised", "secondary", "outline"]
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
    pill: { control: "boolean" },
    isLoading: { control: "boolean" },
    disabled: { control: "boolean" }
  },
  args: {
    children: "Save changes",
    variant: "primary",
    size: "lg",
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
      <SplitButton variant="outline" dropdownLabel="More save options">
        Outline
      </SplitButton>
    </div>
  )
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <SplitButton size="sm" dropdownLabel="More save options">
        Small
      </SplitButton>
      <SplitButton size="md" dropdownLabel="More save options">
        Medium
      </SplitButton>
      <SplitButton size="lg" dropdownLabel="More save options">
        Large
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
      <SplitButton pill variant="outline" dropdownLabel="More save options">
        Outline
      </SplitButton>
    </div>
  )
};

export const WithIcon: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <SplitButton iconStart={<PlusIcon className="size-4" />} dropdownLabel="More create options">
        Create
      </SplitButton>
      <SplitButton
        variant="secondary"
        iconStart={<PlusIcon className="size-4" />}
        dropdownLabel="More create options"
      >
        Create
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
      <SplitButton isLoading variant="outline" dropdownLabel="More save options">
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
      <SplitButton disabled variant="outline" dropdownLabel="More save options">
        Save changes
      </SplitButton>
    </div>
  )
};
