export type FeedItemType =
  | "news"
  | "data"
  | "book"
  | "reddit"
  | "social"
  | "forum";

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
  };
}

export interface FeedResponse {
  items: FeedItem[];
  hasMore: boolean;
  total: number;
}
