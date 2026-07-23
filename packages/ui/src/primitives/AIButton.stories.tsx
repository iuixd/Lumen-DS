import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AIButton } from "./AIButton";
import { aiCapabilities } from "./ai-capabilities";

const meta = {
  title: "AI Components/One AI Button, Every Capability",
  component: AIButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The canonical One AI Button collection from Lumen AI Design System node 760:1965. One component covers labeled, icon-only, loading, destructive, and split-button treatments; capability changes come from label, icon, action, and prompt—not new visual variants."
      }
    }
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "outline", "destructive"]
    },
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
    capability: {
      control: "select",
      options: [undefined, ...aiCapabilities.map((capability) => capability.id)]
    },
    iconOnly: { control: "boolean" },
    isLoading: { control: "boolean" },
    split: { control: "boolean" },
    disabled: { control: "boolean" }
  },
  args: {
    children: "AI Draft",
    variant: "primary",
    size: "md",
    iconOnly: false,
    isLoading: false,
    split: false,
    disabled: false
  }
} satisfies Meta<typeof AIButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

function VariantCard({
  title,
  description,
  children
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <article className="flex min-h-[var(--spacing-240)] flex-col justify-between rounded-lg border border-[var(--color-app-shell-border-table)] bg-[var(--color-background-default)] p-[var(--spacing-24)]">
      <div>
        <h3 className="font-interface text-ai-library-card-title text-[var(--color-app-shell-text-primary)]">
          {title}
        </h3>
        <p className="mt-[var(--spacing-4)] font-interface text-ai-library-body text-[var(--color-app-shell-text-secondary)]">
          {description}
        </p>
      </div>
      <div className="mt-[var(--spacing-32)] flex flex-wrap items-center gap-[var(--spacing-12)]">
        {children}
      </div>
    </article>
  );
}

function CapabilityCard({ category }: { category: string }) {
  const capabilities = aiCapabilities.filter((capability) => capability.category === category);

  return (
    <article className="rounded-lg border border-[var(--color-app-shell-border-table)] bg-[var(--color-background-default)] p-[var(--spacing-24)]">
      <h3 className="font-interface text-ai-library-card-title text-[var(--color-app-shell-text-primary)]">
        {category}
      </h3>
      <div className="mt-[var(--spacing-24)] flex flex-col gap-[var(--spacing-20)]">
        {capabilities.map((capability) => (
          <div key={capability.id}>
            <AIButton
              capability={capability.id}
              variant={capability.id === "conversational-search" ? "primary" : "secondary"}
            />
            <p className="mt-[var(--spacing-8)] font-interface text-ai-library-body text-[var(--color-app-shell-text-secondary)]">
              {capability.description}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}

/** Pixel-matched reference composition for Figma node `760:1965`. */
export const Library: Story = {
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    options: { showPanel: false }
  },
  render: () => {
    const categories = Array.from(new Set(aiCapabilities.map((capability) => capability.category)));

    return (
      <main className="min-h-screen bg-[var(--color-app-shell-background)] px-[var(--spacing-96)] py-[var(--spacing-80)]">
        <header>
          <p className="font-documentation-mono text-ai-library-caption uppercase text-[var(--color-app-shell-text-tertiary)]">
            AI Button Library · V1.0
          </p>
          <h1 className="mt-[var(--spacing-24)] font-editorial text-ai-library-h1 text-[var(--color-app-shell-text-primary)]">
            One AI button, every capability.
          </h1>
          <p className="mt-[var(--spacing-24)] font-interface text-ai-library-lead text-[var(--color-app-shell-text-secondary)]">
            A single reusable AI Button component. Applications expose different capabilities by
            changing only the label, icon, action, and prompt — never by inventing new button
            styles.
          </p>
        </header>

        <section className="mt-[var(--spacing-96)]">
          <h2 className="font-editorial text-ai-library-h3 text-[var(--color-app-shell-text-primary)]">
            Component variants
          </h2>
          <div className="mt-[var(--spacing-32)] grid grid-cols-1 gap-[var(--spacing-16)] md:grid-cols-2 xl:grid-cols-4">
            <VariantCard title="Primary AI" description="Highest-emphasis AI action">
              <AIButton capability="draft" />
            </VariantCard>
            <VariantCard title="Secondary AI" description="Default reusable AI action">
              <AIButton capability="summarize" variant="secondary" />
            </VariantCard>
            <VariantCard title="Ghost AI" description="Low-emphasis contextual AI action">
              <AIButton capability="rewrite" variant="ghost" />
            </VariantCard>
            <VariantCard title="Outline AI" description="AI action on a neutral surface">
              <AIButton capability="translate" variant="outline" />
            </VariantCard>
            <VariantCard title="Primary Icon Only AI" description="Compact primary AI trigger">
              {(["sm", "md", "lg", "xl"] as const).map((size) => (
                <AIButton key={size} iconOnly size={size} aria-label={`AI action, ${size}`} />
              ))}
            </VariantCard>
            <VariantCard title="Secondary Icon Only AI" description="Compact secondary AI trigger">
              {(["sm", "md", "lg", "xl"] as const).map((size) => (
                <AIButton
                  key={size}
                  iconOnly
                  size={size}
                  variant="secondary"
                  aria-label={`AI action, ${size}`}
                />
              ))}
            </VariantCard>
            <VariantCard title="Outline Icon Only AI" description="Compact outlined AI trigger">
              {(["sm", "md", "lg", "xl"] as const).map((size) => (
                <AIButton
                  key={size}
                  iconOnly
                  size={size}
                  variant="outline"
                  aria-label={`AI action, ${size}`}
                />
              ))}
            </VariantCard>
            <VariantCard title="Split Button AI" description="Primary action with related AI menu">
              <AIButton split capability="draft" />
            </VariantCard>
            <VariantCard
              title="Secondary Split Button AI"
              description="Secondary action with related AI menu"
            >
              <AIButton split capability="draft" variant="secondary" />
            </VariantCard>
            <VariantCard
              title="Outline Split Button AI"
              description="Outlined action with related AI menu"
            >
              <AIButton split variant="outline">
                AI Draft...
              </AIButton>
            </VariantCard>
            <VariantCard title="Loading AI" description="Visible progress with a stable label">
              <AIButton isLoading>Generating...</AIButton>
            </VariantCard>
            <VariantCard title="Destructive AI" description="AI action with destructive impact">
              <AIButton variant="destructive">AI Clean Up Records</AIButton>
            </VariantCard>
          </div>
        </section>

        <section className="mt-[var(--spacing-96)]">
          <h2 className="font-editorial text-ai-library-h3 text-[var(--color-app-shell-text-primary)]">
            Capability catalog
          </h2>
          <p className="mt-[var(--spacing-16)] font-interface text-ai-library-lead text-[var(--color-app-shell-text-secondary)]">
            Use the same AI Button visual language for every supported capability.
          </p>
          <div className="mt-[var(--spacing-32)] grid grid-cols-1 gap-[var(--spacing-16)] md:grid-cols-2 xl:grid-cols-4">
            {categories.map((category) => (
              <CapabilityCard key={category} category={category} />
            ))}
          </div>
        </section>
      </main>
    );
  }
};
