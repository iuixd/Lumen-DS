import type { ReactNode } from "react";
import { Container, Stack, Grid, KPICard, PageHeader, type PageHeaderBreadcrumb } from "@lumen/ui";

export interface MetricCard {
  label: string;
  value: string;
  delta?: string;
  deltaTone?: "success" | "warning" | "error";
}

export interface DashboardPageProps {
  title: string;
  metrics: MetricCard[];
  children?: ReactNode;
  /** New, optional — see `PageHeader`. */
  breadcrumbs?: PageHeaderBreadcrumb[];
  /** New, optional — see `PageHeader`. */
  description?: string;
  /** New, optional — see `PageHeader`. */
  actions?: ReactNode;
}

/**
 * Enterprise pattern: metrics dashboard — a page header, a grid of KPI
 * cards, and a primary content area (charts, tables, recent activity, etc).
 * Reconciled 2026-07-20 against the Figma "appshell-desktop-closed-light"
 * reference screen (Lumen-AI-Design-System, node 1197:1652): now composes
 * `@lumen/ui`'s `PageHeader` (breadcrumbs/actions/description) and
 * `KPICard` (previously inline `Card`-based markup) instead of hand-rolled
 * equivalents — see those components' own doc comments for their Figma
 * sourcing and any typography/token roundings. `title`/`metrics`/`children`
 * are unchanged; `breadcrumbs`/`description`/`actions` are new and
 * optional, so this is additive, not a breaking change. `PageHeader`'s own
 * horizontal padding is zeroed here since `Container` already supplies it.
 */
export function DashboardPage({ title, metrics, children, breadcrumbs, description, actions }: DashboardPageProps) {
  return (
    <Container size="xl">
      <Stack gap={24}>
        <PageHeader breadcrumbs={breadcrumbs} title={title} description={description} actions={actions} className="px-0" />
        <Grid columns={metrics.length || 1} gap={16}>
          {metrics.map((m) => (
            <KPICard key={m.label} label={m.label} value={m.value} delta={m.delta} deltaTone={m.deltaTone ?? "success"} />
          ))}
        </Grid>
        {children}
      </Stack>
    </Container>
  );
}
