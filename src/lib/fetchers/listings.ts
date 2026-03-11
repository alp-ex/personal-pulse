import type { FeedItem } from "../types";

interface Platform {
  name: string;
  description: string;
  searchUrl: string;
  filters: string;
}

export function fetchListings(platforms: Platform[]): FeedItem[] {
  return platforms.map(
    (platform): FeedItem => ({
      id: `listing-${platform.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
      type: "listing",
      source: platform.name,
      title: `Search on ${platform.name}`,
      snippet: platform.description,
      url: platform.searchUrl,
      timestamp: new Date().toISOString(),
      metadata: {
        platform: platform.name,
        area: "Paris 18e — Montmartre",
        rooms: "T2-T3",
        price: "max 1600€",
      },
    })
  );
}
