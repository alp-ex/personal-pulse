import type { FeedItem } from "../types";

interface WBDataPoint {
  date: string;
  value: number | null;
}

interface Indicator {
  code: string;
  name: string;
  country: string;
}

interface OwidChart {
  slug: string;
  title: string;
}

export async function fetchData(
  indicators: Indicator[],
  owidCharts: OwidChart[] = []
): Promise<FeedItem[]> {
  const items: FeedItem[] = [];

  const wbResults = await Promise.allSettled(
    indicators.map(async (indicator) => {
      const res = await fetch(
        `https://api.worldbank.org/v2/country/${indicator.country}/indicator/${indicator.code}?format=json&date=2015:2024&per_page=10`,
        { next: { revalidate: 3600 } }
      );
      if (!res.ok) throw new Error(`World Bank: ${res.status}`);
      const json = await res.json();

      const dataArray: WBDataPoint[] = json[1] || [];
      const validPoints = dataArray
        .filter((d) => d.value !== null)
        .map((d) => ({ year: parseInt(d.date), value: d.value as number }))
        .sort((a, b) => a.year - b.year);

      if (validPoints.length === 0) return null;

      const latest = validPoints[validPoints.length - 1];
      return {
        id: `data-wb-${indicator.code}-${indicator.country}`,
        type: "data" as const,
        source: "World Bank",
        title: indicator.name,
        snippet: `Latest: ${formatValue(latest.value, indicator.code)} (${latest.year})`,
        url: `https://data.worldbank.org/indicator/${indicator.code}`,
        timestamp: new Date().toISOString(),
        metadata: {
          dataPoints: validPoints,
          indicatorName: indicator.name,
          latestValue: formatValue(latest.value, indicator.code),
        },
      } satisfies FeedItem;
    })
  );

  for (const result of wbResults) {
    if (result.status === "fulfilled" && result.value) {
      items.push(result.value);
    }
  }

  for (const chart of owidCharts) {
    items.push({
      id: `data-owid-${chart.slug}`,
      type: "data",
      source: "Our World in Data",
      title: chart.title,
      snippet: "Interactive chart — click to explore",
      url: `https://ourworldindata.org/grapher/${chart.slug}`,
      timestamp: new Date().toISOString(),
      metadata: {
        chartUrl: `https://ourworldindata.org/grapher/${chart.slug}`,
      },
    });
  }

  return items;
}

function formatValue(value: number, indicatorCode: string): string {
  if (indicatorCode.includes("GDP") || indicatorCode.includes("CO2E") || indicatorCode.includes("GNP")) {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
    return `$${value.toLocaleString()}`;
  }
  if (indicatorCode.includes("POP") || indicatorCode.includes("TLF")) {
    if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
    return value.toLocaleString();
  }
  if (indicatorCode.includes("LE00")) {
    return `${value.toFixed(1)} years`;
  }
  if (
    indicatorCode.includes("POV") ||
    indicatorCode.includes("UEM") ||
    indicatorCode.includes("CPI") ||
    indicatorCode.includes("INR")
  ) {
    return `${value.toFixed(1)}%`;
  }
  return value.toLocaleString();
}
