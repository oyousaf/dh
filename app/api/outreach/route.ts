import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

/* ───────── Constants ───────── */
const GOOGLE_TEXT_SEARCH =
  "https://maps.googleapis.com/maps/api/place/textsearch/json";
const GOOGLE_PLACE_DETAILS =
  "https://maps.googleapis.com/maps/api/place/details/json";
const PAGESPEED_API =
  "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

const API_KEY = process.env.GOOGLE_SERVER_API_KEY!;
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "";
const REPLY_TO = process.env.RESEND_TO_EMAIL || FROM_EMAIL;

const SEVEN_DAYS = 60 * 60 * 24 * 7;
const ONE_DAY = 60 * 60 * 24;

/* ───────── Types ───────── */
type PerfNum = number | "N/A";

interface PageSpeedResponse {
  lighthouseResult?: { categories?: { performance?: { score?: number } } };
}

interface GoogleTextSearchItem {
  place_id: string;
  name: string;
  formatted_address?: string;
}

interface GoogleTextSearchResponse {
  results?: GoogleTextSearchItem[];
  error_message?: string;
}

interface GooglePlaceDetailsResult {
  formatted_phone_number?: string;
  website?: string;
}

interface GooglePlaceDetailsResponse {
  result?: GooglePlaceDetailsResult;
}

type BusinessEntry = {
  id: string;
  name: string;
  url: string | null;
  phone: string | null;
  hasWebsite: boolean;
  profileLink: string | null;
  performanceScore: { mobile: PerfNum; desktop: PerfNum };
  priorityScore: number;
};

interface OutreachPayload {
  to: string;
  name: string;
  business?: string;
  website?: string;
  message: string;
  subject?: string;
  contactKey?: string;
}

/* ───────── Helpers ───────── */
const getScore = (data: PageSpeedResponse): PerfNum =>
  data?.lighthouseResult?.categories?.performance?.score !== undefined
    ? Math.round(
        ((data.lighthouseResult.categories.performance!.score as number) || 0) *
          100
      )
    : "N/A";

function normaliseUrl(raw?: string | null) {
  if (!raw) return null;
  let u = raw.trim();
  if (!/^https?:\/\//i.test(u)) u = `https://${u}`;
  try {
    const url = new URL(u);
    [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
    ].forEach((k) => url.searchParams.delete(k));
    return url.toString();
  } catch {
    return null;
  }
}
function hostKey(u: string) {
  const h = new URL(u).hostname.toLowerCase().replace(/\.$/, "");
  return h.replace(/^www\./, "");
}
function norm(s: string) {
  return s.trim().toLowerCase();
}

async function delay(ms: number) {
  await new Promise((r) => setTimeout(r, ms));
}

async function fetchJson<T>(
  url: string,
  ms = 15000,
  label?: string
): Promise<T> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, { signal: ctrl.signal, cache: "no-store" });
    if (!res.ok) throw new Error(`${label || url} failed: ${res.status}`);
    return (await res.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchJsonWithRetry<T>(
  factory: () => Promise<T>,
  retries = 2
): Promise<T> {
  let attempt = 0;
  const waits = [0, 500, 1500];
  while (true) {
    try {
      return await factory();
    } catch (e) {
      if (attempt >= retries) throw e;
      await delay(waits[Math.min(attempt + 1, waits.length - 1)]);
      attempt++;
    }
  }
}

async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  worker: (item: T, idx: number) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let i = 0;
  async function run(): Promise<void> {
    const idx = i++;
    if (idx >= items.length) return;
    results[idx] = await worker(items[idx], idx);
    return run();
  }
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, () => run())
  );
  return results;
}

async function getPageSpeedScore(
  url: string
): Promise<{ mobile: PerfNum; desktop: PerfNum }> {
  try {
    const host = hostKey(url);
    const [cM, cD] = await Promise.all([
      kv.get<PerfNum>(`ps:v1:mobile:${host}`),
      kv.get<PerfNum>(`ps:v1:desktop:${host}`),
    ]);

    if (cM !== null && cD !== null) {
      return { mobile: cM as PerfNum, desktop: cD as PerfNum };
    }

    const [mobileData, desktopData] = await Promise.all([
      fetchJsonWithRetry(() =>
        fetchJson<PageSpeedResponse>(
          `${PAGESPEED_API}?url=${encodeURIComponent(url)}&strategy=mobile&key=${API_KEY}`,
          15000,
          "PageSpeed mobile"
        )
      ),
      fetchJsonWithRetry(() =>
        fetchJson<PageSpeedResponse>(
          `${PAGESPEED_API}?url=${encodeURIComponent(url)}&strategy=desktop&key=${API_KEY}`,
          15000,
          "PageSpeed desktop"
        )
      ),
    ]);

    const mobile = getScore(mobileData);
    const desktop = getScore(desktopData);

    const writes: Promise<unknown>[] = [];
    if (typeof mobile === "number")
      writes.push(kv.set(`ps:v1:mobile:${host}`, mobile, { ex: SEVEN_DAYS }));
    if (typeof desktop === "number")
      writes.push(kv.set(`ps:v1:desktop:${host}`, desktop, { ex: SEVEN_DAYS }));
    if (writes.length) await Promise.all(writes);

    return { mobile, desktop };
  } catch {
    return { mobile: "N/A", desktop: "N/A" };
  }
}

/* dev-only logs shown locally (VS Code), silent in production */
function devLog(...args: unknown[]) {
  if (process.env.NODE_ENV !== "production") {
    console.warn(...args);
  }
}

/* ───────── GET ─────────
   Hybrid filter:
   - Return businesses with NO website
   - OR with non-HTTPS
   - OR with poor mobile performance (<50)
*/
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const queryParam = (
      searchParams.get("query") || "businesses in Ossett"
    ).slice(0, 200);
    const refresh = searchParams.get("refresh") === "1";
    const cacheKey = `outreach:list:${queryParam}`;

    if (!refresh) {
      const cached = await kv.get<BusinessEntry[]>(cacheKey);
      if (cached) {
        devLog(`⚡ KV cache hit for "${queryParam}" (${cached.length} items)`);
        return NextResponse.json(cached, {
          headers: {
            "Cache-Control": "public, max-age=300",
            "Content-Type": "application/json",
          },
        });
      }
    } else {
      devLog(`♻️ Refresh requested for "${queryParam}" (purging caches)`);
    }

    const mapsData = await fetchJson<GoogleTextSearchResponse>(
      `${GOOGLE_TEXT_SEARCH}?query=${encodeURIComponent(queryParam)}&key=${API_KEY}`,
      15000,
      "Google Text Search"
    );
    if (mapsData.error_message) throw new Error(mapsData.error_message);

    const rawPlaces = (mapsData.results || []).slice(0, 20);

    // Dedupe by name + formatted_address (fallback to place_id)
    const seen = new Set<string>();
    const places: GoogleTextSearchItem[] = [];
    for (const p of rawPlaces) {
      const key = `${norm(p.name)}|${norm(p.formatted_address || p.place_id)}`;
      if (seen.has(key)) continue;
      seen.add(key);
      places.push(p);
    }

    if (refresh) {
      await kv.del(cacheKey);
      await mapWithConcurrency(places, 5, async (place) => {
        const detailsKey = `place:v1:${place.place_id}`;
        await kv.del(detailsKey);
        try {
          const d = await fetchJson<GooglePlaceDetailsResponse>(
            `${GOOGLE_PLACE_DETAILS}?place_id=${place.place_id}&fields=website&key=${API_KEY}`,
            9000,
            "Google Place Details (refresh)"
          );
          const normUrl = normaliseUrl(d?.result?.website || null);
          if (normUrl) {
            const host = hostKey(normUrl);
            await Promise.allSettled([
              kv.del(`ps:v1:mobile:${host}`),
              kv.del(`ps:v1:desktop:${host}`),
            ]);
            devLog(`🧹 Cleared PageSpeed cache for "${host}"`);
          }
        } catch {
          /* ignore */
        }
      });
    }

    const results: BusinessEntry[] = await mapWithConcurrency(
      places,
      4,
      async (place) => {
        const detailsKey = `place:v1:${place.place_id}`;
        let phone: string | null = null;
        let websiteRaw: string | null = null;

        const cachedDetails = await kv.get<{
          phone: string | null;
          website: string | null;
        }>(detailsKey);
        if (cachedDetails) {
          phone = cachedDetails.phone;
          websiteRaw = cachedDetails.website;
          devLog(`⚡ Details cache hit for "${place.name}"`);
        } else {
          try {
            const details = await fetchJson<GooglePlaceDetailsResponse>(
              `${GOOGLE_PLACE_DETAILS}?place_id=${place.place_id}&fields=formatted_phone_number,website&key=${API_KEY}`,
              15000,
              "Google Place Details"
            );
            phone = details.result?.formatted_phone_number || null;
            websiteRaw = details.result?.website || null;
            await kv.set(
              detailsKey,
              { phone, website: websiteRaw },
              { ex: SEVEN_DAYS }
            );
          } catch {
            /* ignore */
          }
        }

        const normUrl = normaliseUrl(websiteRaw);
        let performanceScore: BusinessEntry["performanceScore"] = {
          mobile: "N/A",
          desktop: "N/A",
        };
        if (normUrl) performanceScore = await getPageSpeedScore(normUrl);

        const mobileScore = performanceScore.mobile;

        return {
          id: place.place_id,
          name: place.name,
          url: normUrl,
          phone,
          hasWebsite: !!normUrl,
          profileLink: `https://www.google.com/maps/place/?q=place_id:${place.place_id}`,
          performanceScore,
          priorityScore: !normUrl
            ? 100
            : !normUrl.startsWith("https")
              ? 80
              : typeof mobileScore === "number" && mobileScore < 50
                ? 60
                : 0,
        };
      }
    );

    const filtered = results.filter((entry) => {
      if (!entry.hasWebsite) return true;
      if (entry.url && !entry.url.startsWith("https")) return true;
      const score = entry.performanceScore.mobile;
      return typeof score === "number" && score < 50;
    });

    const sorted = filtered.sort((a, b) => b.priorityScore - a.priorityScore);
    await kv.set(cacheKey, sorted, { ex: ONE_DAY });
    devLog(`✅ Wrote list "${queryParam}" (${sorted.length}) ttl=${ONE_DAY}s`);

    return NextResponse.json(sorted, {
      headers: {
        "Cache-Control": "public, max-age=300",
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    const errorMsg =
      err instanceof Error ? err.message : "Unknown outreach API error";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

/* ───────── POST ───────── */
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as OutreachPayload;

    const to = body?.to?.trim();
    const name = body?.name?.trim();
    const message = body?.message?.trim();

    if (!to || !name || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (resend) {
      if (!FROM_EMAIL) {
        return NextResponse.json(
          { error: "RESEND_FROM_EMAIL is not configured." },
          { status: 500 }
        );
      }

      const safe = (s: string) =>
        String(s)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#39;");

      const startsWithGreeting = /^\s*(hi|hello|dear)\b/i.test(message);
      const contentHtml = safe(message).replace(/\r?\n/g, "<br/>");

      const siteUrl = "https://legxcysol.dev";
      const logoUrl = "https://legxcysol.dev/logo.webp";
      const bannerUrl = "https://legxcysol.dev/banner.webp";

      const html = `
        <div style="background-color:#0f2f23;padding:15px;font-family:Inter,Arial,sans-serif;color:#ffffff;">
          <table width="100%" cellspacing="0" cellpadding="0" border="0"
                 style="max-width:600px;margin:auto;background-color:#1b3a2c;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="text-align:center;padding:20px;">
                <a href="${siteUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration:none;">
                  <img src="${logoUrl}" alt="Legxcy Solutions Logo"
                       style="max-width:120px;height:auto;margin-bottom:14px;border-radius:8px;border:0;display:inline-block;" />
                </a>
                <h2 style="color:#59ae6a;margin:20px 0 10px 0;font-weight:600;font-size:20px;">
                  ${startsWithGreeting ? "" : `Hi ${safe(name)},`}
                </h2>
              </td>
            </tr>
            <tr>
              <td style="padding:20px;color:#e6e6e6;font-size:15px;line-height:1.6;">
                <p>${contentHtml}</p>
                <p style="margin-top:20px;">Best regards,<br/>Legxcy Solutions</p>
              </td>
            </tr>
            <tr>
              <td style="text-align:center;padding:0 20px 20px 20px;">
                <a href="${siteUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration:none;display:block;">
                  <img src="${bannerUrl}" alt="Legxcy Solutions Banner"
                       style="max-width:150px;height:auto;border-radius:8px;border:0;display:block;margin:0 auto;" />
                </a>
              </td>
            </tr>
          </table>
        </div>
      `.trim();

      const text = `${startsWithGreeting ? "" : `Hi ${name},\n\n`}${message}\n\nBest regards,\nLegxcy Solutions`;

      await resend.emails.send({
        from: `Legxcy Solutions <${FROM_EMAIL}>`,
        to,
        subject: body.subject?.trim() || "Legxcy Solutions",
        replyTo: REPLY_TO || undefined,
        html,
        text,
        headers: {
          "Auto-Submitted": "auto-generated",
          ...(REPLY_TO ? { "List-Unsubscribe": `<mailto:${REPLY_TO}>` } : {}),
        },
      });
    }

    /* ───────── Mark contacted in KV ─────────
       Use a unified contactKey when provided (site.id || site.name),
       but keep legacy writes for name/business/email to remain compatible.
    */
    const unifiedKey = body.contactKey?.trim() || body.business?.trim() || name;

    const writes: Promise<unknown>[] = [
      kv.set(`contacted:${unifiedKey}`, true, { ex: SEVEN_DAYS }),

      // Legacy / convenience indices (keep them)
      kv.set(`contacted:${name}`, true, { ex: SEVEN_DAYS }),
      kv.set(`contacted:v1:name:${norm(name)}`, true, { ex: SEVEN_DAYS }),
      kv.set(`contacted:v1:email:${norm(to)}`, true, { ex: SEVEN_DAYS }),
    ];

    if (body.business) {
      writes.push(
        kv.set(`contacted:${body.business}`, true, { ex: SEVEN_DAYS })
      );
      writes.push(
        kv.set(`contacted:v1:name:${norm(body.business)}`, true, {
          ex: SEVEN_DAYS,
        })
      );
    }

    await Promise.all(writes);

    return NextResponse.json({ ok: true, contacted: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Send failed" },
      { status: 500 }
    );
  }
}
