import type { FeedItem } from "../types";

// Rent control reference data for Paris 18e (Montmartre)
// Source: Ville de Paris Open Data — Encadrement des Loyers
// This tells you the legal maximum rent per m² for the 18th arrondissement

interface RentRecord {
  annee: number;
  id_zone: number;
  nom_quartier: string;
  piece: number;
  epoque: string;
  meuble: string;
  ref: number;
  max: number;
  min: number;
}

export async function fetchRentData(): Promise<FeedItem[]> {
  try {
    // Fetch rent control data for Paris 18e neighborhoods
    // Zone IDs for 18th arrondissement: 71 (Grandes-Carrières), 72 (Clignancourt),
    // 69 (Goutte-d'Or), 70 (La Chapelle)
    const res = await fetch(
      `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/logement-encadrement-des-loyers/records?where=id_zone%20IN%20(69%2C70%2C71%2C72)%20AND%20piece%20IN%20(2%2C3)%20AND%20meuble%3D%22non%20meubl%C3%A9%22&order_by=annee%20DESC&limit=20`,
      { next: { revalidate: 86400 } } // cache 24h — this data barely changes
    );

    if (!res.ok) throw new Error(`Paris Open Data: ${res.status}`);
    const data = await res.json();
    const records: RentRecord[] = (data.results || []).map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (r: any) => ({
        annee: r.annee,
        id_zone: r.id_zone,
        nom_quartier: r.nom_quartier,
        piece: r.piece,
        epoque: r.epoque,
        meuble: r.meuble,
        ref: r.ref,
        max: r.max,
        min: r.min,
      })
    );

    if (records.length === 0) return [];

    // Get the most recent year
    const latestYear = Math.max(...records.map((r) => r.annee));
    const latest = records.filter((r) => r.annee === latestYear);

    // Group by neighborhood + rooms for clear cards
    const grouped = new Map<string, RentRecord[]>();
    for (const r of latest) {
      const key = `${r.nom_quartier}-${r.piece}`;
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key)!.push(r);
    }

    const items: FeedItem[] = [];
    for (const [, group] of grouped) {
      const first = group[0];
      // Average across construction eras for a simple overview
      const avgRef = group.reduce((sum, r) => sum + r.ref, 0) / group.length;
      const avgMax = group.reduce((sum, r) => sum + r.max, 0) / group.length;

      const rooms = first.piece === 2 ? "T2 (2 rooms)" : "T3 (3 rooms)";
      const refRent = avgRef.toFixed(1);
      const maxRent = avgMax.toFixed(1);

      items.push({
        id: `rent-data-${first.nom_quartier}-${first.piece}-${latestYear}`,
        type: "data",
        source: "Ville de Paris",
        title: `${first.nom_quartier} — ${rooms} rent cap`,
        snippet: `Reference: ${refRent}€/m² · Max allowed: ${maxRent}€/m² (${latestYear}, unfurnished)`,
        url: "https://www.paris.fr/pages/l-encadrement-des-loyers-parisiens-en-vigueur-le-1er-juillet-5347",
        timestamp: new Date().toISOString(),
        metadata: {
          indicatorName: `Legal rent cap — ${first.nom_quartier}`,
          latestValue: `${maxRent}€/m²`,
        },
      });
    }

    return items;
  } catch (error) {
    console.warn("[rent-data] Failed to fetch Paris rent control data:", error);
    return [];
  }
}
