import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/** Daily city list (rotate these; cheap & fresh) */
const DAILY_CITIES: readonly string[] = [
  "businesses in Ossett",
  "opticians in Wakefield",
  "electricians in Wakefield",
  "used cars in Wakefield",
  "restaurants in Leeds",
  "plumbers in Bradford",
  "accountants in Huddersfield",
] as const;

/** Weekly region-wide sweep (heavier) */
const WEEKLY_REGIONS: readonly string[] = [
  "businesses in West Yorkshire",
  "trades in West Yorkshire",
] as const;

type Scope = "daily" | "weekly";

interface OutreachItem {
  id: string;
  name: string;
  hasWebsite: boolean;
  performanceScore: { mobile: number | "N/A"; desktop: number | "N/A" };
  priorityScore: number;
  url: string | null;
}

/* dev-only logs */
function devLog(...args: unknown[]) {
  if (process.env.NODE_ENV !== "production") {
    console.warn(...args);
  }
}

async function refreshQuery(baseUrl: string, q: string): Promise<number> {
  const url = `${baseUrl}/api/outreach?query=${encodeURIComponent(q)}&refresh=1`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Fetch ${res.status}`);
  const data = (await res.json()) as unknown;
  if (!Array.isArray(data)) return 0;
  // Narrow just enough to count without using `any`
  const count = (data as OutreachItem[]).length;
  return count;
}

/**
 * GET /api/cron-refresh?scope=daily|weekly
 * - daily (default): refresh city queries
 * - weekly: refresh region-wide queries
 */
export async function GET(req: Request) {
  const baseUrl =
    process.env.CRON_BASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_BASE_URL?.trim() ||
    "https://legxcy-sol.vercel.app";

  const { searchParams } = new URL(req.url);
  const scope: Scope = (searchParams.get("scope") as Scope) || "daily";
  const queries = scope === "weekly" ? WEEKLY_REGIONS : DAILY_CITIES;

  const results: Record<string, number> = {};
  for (const q of queries) {
    try {
      const n = await refreshQuery(baseUrl, q);
      results[q] = n;
      devLog(`✅ Refreshed "${q}" — ${n} results`);
    } catch (e) {
      results[q] = -1;
      devLog(`❌ Failed to refresh "${q}"`, e);
    }
  }

  return NextResponse.json({ ok: true, scope, results });
}
