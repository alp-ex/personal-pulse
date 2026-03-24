export interface Tab {
  id: string;
  label: string;
  description: string;
}

export const TABS: Tab[] = [
  {
    id: "news",
    label: "News",
    description: "World, tech, hustle & finance — all in one feed",
  },
  {
    id: "health",
    label: "Health",
    description: "Track sleep, exercise, mood & more",
  },
  {
    id: "projects",
    label: "Projects",
    description: "Your ideas, side projects & things to follow up on",
  },
];
