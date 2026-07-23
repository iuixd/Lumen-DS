import type { ComponentType, SVGProps } from "react";
import {
  ArrowRightIcon,
  BookOpenIcon,
  BotIcon,
  BrainIcon,
  ChartBarIcon,
  ChartLineIcon,
  CircleQuestionMarkIcon,
  FileChartColumnIcon,
  FileSearchIcon,
  GitCompareArrowsIcon,
  LanguagesIcon,
  Link2Icon,
  LmAisymbolIcon,
  MessageSquareCheckIcon,
  SearchIcon,
  SpellCheckIcon,
  TagIcon,
  UserPlusIcon,
  WandSparklesIcon,
  WorkflowIcon
} from "../icons/generated";

/** Exact capability catalog shown in Figma node `760:1965`. */
export interface AICapability {
  id: string;
  label: string;
  description: string;
  category: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  analyticsEvent: string;
}

export const aiCapabilities = [
  {
    id: "summarize",
    label: "AI Summarize",
    description: "Summarize long content into key points",
    category: "Content & Drafting",
    icon: LmAisymbolIcon
  },
  {
    id: "draft",
    label: "AI Draft",
    description: "Generate new content",
    category: "Content & Drafting",
    icon: LmAisymbolIcon
  },
  {
    id: "rewrite",
    label: "AI Rewrite",
    description: "Rewrite existing content",
    category: "Content & Drafting",
    icon: WandSparklesIcon
  },
  {
    id: "improve-clarity",
    label: "AI Improve Writing",
    description: "Improve clarity and tone",
    category: "Content & Drafting",
    icon: WandSparklesIcon
  },
  {
    id: "fix-grammar",
    label: "AI Fix Grammar",
    description: "Correct grammar and spelling",
    category: "Content & Drafting",
    icon: SpellCheckIcon
  },
  {
    id: "translate",
    label: "AI Translate",
    description: "Translate content",
    category: "Content & Drafting",
    icon: LanguagesIcon
  },
  {
    id: "explain-data",
    label: "AI Explain Data",
    description: "Explain charts and metrics",
    category: "Data Analysis & Insights",
    icon: ChartBarIcon
  },
  {
    id: "generate-report",
    label: "AI Generate Report",
    description: "Create reports and dashboards",
    category: "Data Analysis & Insights",
    icon: FileChartColumnIcon
  },
  {
    id: "extract-info",
    label: "AI Extract Info",
    description: "Extract structured information",
    category: "Data Analysis & Insights",
    icon: FileSearchIcon
  },
  {
    id: "detect-trends",
    label: "AI Find Insights",
    description: "Detect trends and anomalies",
    category: "Data Analysis & Insights",
    icon: BrainIcon
  },
  {
    id: "compare-data",
    label: "AI Compare",
    description: "Compare datasets or documents",
    category: "Data Analysis & Insights",
    icon: GitCompareArrowsIcon
  },
  {
    id: "predict-outcomes",
    label: "AI Forecast",
    description: "Predict future outcomes",
    category: "Data Analysis & Insights",
    icon: ChartLineIcon
  },
  {
    id: "categorize-work",
    label: "AI Auto-Triage",
    description: "Categorize incoming work",
    category: "Workflow & Automation",
    icon: WorkflowIcon
  },
  {
    id: "recommend-action",
    label: "AI Suggest Next Step",
    description: "Recommend the next action",
    category: "Workflow & Automation",
    icon: ArrowRightIcon
  },
  {
    id: "draft-reply",
    label: "AI Auto-Reply",
    description: "Draft contextual replies",
    category: "Workflow & Automation",
    icon: MessageSquareCheckIcon
  },
  {
    id: "automate-tasks",
    label: "AI Automate",
    description: "Automate repetitive tasks",
    category: "Workflow & Automation",
    icon: BotIcon
  },
  {
    id: "categorize-records",
    label: "AI Classify",
    description: "Categorize records",
    category: "Workflow & Automation",
    icon: TagIcon
  },
  {
    id: "recommend-assignee",
    label: "AI Assign",
    description: "Recommend assignee",
    category: "Workflow & Automation",
    icon: UserPlusIcon
  },
  {
    id: "conversational-search",
    label: "Ask AI",
    description: "Enterprise conversational search",
    category: "Search & Knowledge",
    icon: LmAisymbolIcon
  },
  {
    id: "explain-content",
    label: "AI Explain",
    description: "Explain selected content",
    category: "Search & Knowledge",
    icon: CircleQuestionMarkIcon
  },
  {
    id: "search-knowledge",
    label: "AI Find Answer",
    description: "Search enterprise knowledge",
    category: "Search & Knowledge",
    icon: SearchIcon
  },
  {
    id: "semantic-search",
    label: "AI Search",
    description: "Semantic search",
    category: "Search & Knowledge",
    icon: SearchIcon
  },
  {
    id: "show-references",
    label: "AI Cite Sources",
    description: "Show supporting references",
    category: "Search & Knowledge",
    icon: BookOpenIcon
  },
  {
    id: "recommend-documents",
    label: "AI Related Content",
    description: "Recommend related documents",
    category: "Search & Knowledge",
    icon: Link2Icon
  }
].map((capability) => ({
  ...capability,
  analyticsEvent: `ai_button.${capability.id.replace(/-/g, "_")}`
})) as readonly AICapability[];

export type AICapabilityId = (typeof aiCapabilities)[number]["id"];

export function getAICapability(id: string): AICapability | undefined {
  return aiCapabilities.find((capability) => capability.id === id);
}
