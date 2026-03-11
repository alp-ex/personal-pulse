export interface Tab {
  id: string;
  label: string;
  emoji: string;
  description: string;
}

export const TABS: Tab[] = [
  {
    id: "world",
    label: "World",
    emoji: "🌍",
    description: "Global news, data & discussions",
  },
  {
    id: "tech",
    label: "Tech",
    emoji: "⚡",
    description: "Real tech trends & insights",
  },
  {
    id: "jobs",
    label: "Jobs",
    emoji: "📊",
    description: "Job market trends & skills",
  },
  {
    id: "hustle",
    label: "Hustle",
    emoji: "🚀",
    description: "Freelancing & business",
  },
  {
    id: "finance",
    label: "Finance",
    emoji: "💰",
    description: "Family finances & money",
  },
];
