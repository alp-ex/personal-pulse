import type { FeedItem } from "../types";

// LeBonCoin search API — returns real apartment listings
// Filters: Paris 18e, 2-3 rooms, 35m²+, max 1600€/month

const LEBONCOIN_API = "https://api.leboncoin.fr/finder/search";

interface LBCAttribute {
  key: string;
  value: string;
  value_label?: string;
}

interface LBCAd {
  list_id: number;
  subject: string;
  body: string;
  price: number[];
  url: string;
  images: {
    thumb_url: string;
    urls: string[];
  };
  location: {
    city: string;
    zipcode: string;
  };
  attributes: LBCAttribute[];
  first_publication_date: string;
  index_date: string;
}

export async function fetchLeboncoin(): Promise<FeedItem[]> {
  const body = {
    limit: 25,
    filters: {
      category: { id: "10" },
      enums: {
        real_estate_type: ["2"],
        ad_type: ["offer"],
      },
      location: {
        city_zipcodes: [{ zipcode: "75018", city: "Paris" }],
      },
      ranges: {
        price: { min: 800, max: 1600 },
        rooms: { min: 2, max: 3 },
        square: { min: 35 },
      },
    },
    sort_by: "time",
    sort_order: "desc",
  };

  const res = await fetch(LEBONCOIN_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      api_key: "ba0c2dad52b3ec",
    },
    body: JSON.stringify(body),
    next: { revalidate: 1800 },
  });

  if (!res.ok) throw new Error(`LeBonCoin: ${res.status}`);
  const data = await res.json();

  return (data.ads || []).map((ad: LBCAd): FeedItem => {
    const rooms = ad.attributes?.find((a) => a.key === "rooms")?.value;
    const square = ad.attributes?.find((a) => a.key === "square")?.value;
    const furnished = ad.attributes?.find((a) => a.key === "furnished")?.value;
    const price = ad.price?.[0];

    const parts: string[] = [];
    if (rooms) parts.push(`${rooms} pièces`);
    if (square) parts.push(`${square} m²`);
    if (furnished === "1") parts.push("meublé");
    else parts.push("non meublé");

    return {
      id: `listing-lbc-${ad.list_id}`,
      type: "listing",
      source: "LeBonCoin",
      title: ad.subject || "Appartement Paris 18e",
      snippet: parts.join(" · "),
      url: ad.url || `https://www.leboncoin.fr/locations/${ad.list_id}.htm`,
      imageUrl: ad.images?.thumb_url || ad.images?.urls?.[0],
      timestamp: ad.first_publication_date || ad.index_date || new Date().toISOString(),
      metadata: {
        price: price ? `${price.toLocaleString("fr-FR")}€/mois` : undefined,
        rooms: rooms ? `${rooms} pièces` : undefined,
        area: square ? `${square} m²` : undefined,
        platform: "LeBonCoin",
      },
    };
  });
}
