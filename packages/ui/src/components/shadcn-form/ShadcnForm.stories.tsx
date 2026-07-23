import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ShadcnForm,
  ShadcnFormControl,
  ShadcnFormDescription,
  ShadcnFormField,
  ShadcnFormItem,
  ShadcnFormLabel,
  ShadcnFormMessage
} from "./ShadcnForm";
import { Input } from "../../primitives/Input";
import { Button } from "../../primitives/Button";

// No `component:` binding: ShadcnForm is react-hook-form's own deeply
// generic FormProvider — its full prop type (every useForm() method) can't
// be satisfied by a placeholder `args` object the way Accordion/ToggleGroup
// use for their much simpler discriminated unions. Every story below
// drives its own render fully instead.
const meta = {
  title: "Composite/ShadcnForm",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "react-hook-form + zod form scaffolding, sourced from shadcn/ui and adapted to Lumen's token system — see docs/shadcn-integration.md. `Shadcn`-prefixed because it overlaps in purpose with Lumen's own hand-built `FormField`; this is a separate, opt-in system for when real form-state management (validation, dirty/touched tracking) is needed. Field visuals still come from Lumen's own `Input`. Dark mode follows the global `data-theme` toolbar toggle, not a separate story."
      }
    },
    controls: { disable: true }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const schema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters.")
});

export const Default: Story = {
  render: function Render() {
    const form = useForm<z.infer<typeof schema>>({
      resolver: zodResolver(schema),
      defaultValues: { username: "" }
    });

    return (
      <ShadcnForm {...form}>
        <form onSubmit={form.handleSubmit(() => {})} className="w-[320px] space-y-6">
          <ShadcnFormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <ShadcnFormItem>
                <ShadcnFormLabel>Username</ShadcnFormLabel>
                <ShadcnFormControl>
                  <Input placeholder="jsmith" {...field} />
                </ShadcnFormControl>
                <ShadcnFormDescription>This is your public display name.</ShadcnFormDescription>
                <ShadcnFormMessage />
              </ShadcnFormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </ShadcnForm>
    );
  }
};

/** Triggers validation immediately to show the error-message state. */
export const WithValidationError: Story = {
  render: function Render() {
    const form = useForm<z.infer<typeof schema>>({
      resolver: zodResolver(schema),
      defaultValues: { username: "" },
      mode: "onChange"
    });

    // Trigger validation once on mount so the error is visible without user interaction.
    if (!form.formState.isSubmitted) {
      form.trigger();
    }

    return (
      <ShadcnForm {...form}>
        <form className="w-[320px] space-y-6">
          <ShadcnFormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <ShadcnFormItem>
                <ShadcnFormLabel>Username</ShadcnFormLabel>
                <ShadcnFormControl>
                  <Input placeholder="jsmith" {...field} />
                </ShadcnFormControl>
                <ShadcnFormMessage />
              </ShadcnFormItem>
            )}
          />
        </form>
      </ShadcnForm>
    );
  }
};
