export type FeedItemType =
  | "news"
  | "data"
  | "book"
  | "reddit"
  | "social"
  | "forum"
  | "listing";

export interface FeedItem {
  id: string;
  type: FeedItemType;
  source: string;
  title: string;
  snippet: string;
  url: string;
  imageUrl?: string;
  timestamp: string;
  metadata?: {
    score?: number;
    commentCount?: number;
    author?: string;
    chartUrl?: string;
    dataPoints?: Array<{ year: number; value: number }>;
    indicatorName?: string;
    latestValue?: string;
    // Rent listing fields
    price?: string;
    area?: string;
    rooms?: string;
    platform?: string;
  };
}

export interface FeedResponse {
  items: FeedItem[];
  hasMore: boolean;
  total: number;
}
