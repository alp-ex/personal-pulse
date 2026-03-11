export interface Tab {
  id: string;
  label: string;
  emoji: string;
  description: string;
}

export const TABS: Tab[] = [
  {
    id: "briefing",
    label: "Briefing",
    emoji: "☀️",
    description: "Your morning brief — top picks across all topics",
  },
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
    description: "Freelancing, products & business",
  },
  {
    id: "finance",
    label: "Finance",
    emoji: "💰",
    description: "Family finances & money",
  },
  {
    id: "rent",
    label: "Rent",
    emoji: "🏠",
    description: "Apartment hunting in Montmartre — find your next home",
  },
  {
    id: "saved",
    label: "Saved",
    emoji: "🔖",
    description: "Your bookmarked items",
  },
];
