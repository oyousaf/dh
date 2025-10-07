import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

type ContactedStatus = Record<string, boolean>;

interface UpdateItem {
  contactKey?: string;
  name?: string;
  contacted: boolean;
}

const THIRTY_DAYS = 60 * 60 * 24 * 30;

/* ───────── GET: Batch contacted statuses ─────────
   Expects: /api/contacted?names=<key1>,<key2>,...
   Keys should be the same contactKey used in the UI (site.id || site.name)
*/
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const namesParam = searchParams.get("names");

    if (!namesParam) {
      return NextResponse.json({} as ContactedStatus);
    }

    // decode → trim → de-dupe → drop empties
    const list = namesParam
      .split(",")
      .map((n) => {
        try {
          return decodeURIComponent(n);
        } catch {
          return n;
        }
      })
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const unique = Array.from(new Set(list));
    if (unique.length === 0) {
      return NextResponse.json({} as ContactedStatus);
    }

    const keys = unique.map((k) => `contacted:${k}`);

    // kv.mget returns values in-order, undefined when missing
    const values = await kv.mget<boolean[]>(...keys);

    const result: ContactedStatus = {};
    unique.forEach((k, i) => {
      result[k] = Boolean(values?.[i]);
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error("❌ Failed to read contacted statuses:", err);
    return NextResponse.json(
      { error: "Failed to read statuses" },
      { status: 500 }
    );
  }
}

/* ───────── POST: Batch update ─────────
   Body: { updates: Array<{ contactKey?: string; name?: string; contacted: boolean }> }
   Uses contactKey if provided; falls back to name for compatibility.
*/
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { updates: UpdateItem[] };

    if (!body || !Array.isArray(body.updates)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // modest safety guard: hard-cap batch size
    const updates = body.updates.slice(0, 500);

    const writes: Promise<unknown>[] = [];

    for (const item of updates) {
      const rawKey =
        (typeof item.contactKey === "string" && item.contactKey) ||
        (typeof item.name === "string" && item.name) ||
        "";

      const key = rawKey.trim();
      if (!key || typeof item.contacted !== "boolean") continue;

      writes.push(
        kv.set(`contacted:${key}`, item.contacted, { ex: THIRTY_DAYS })
      );
    }

    await Promise.all(writes);

    return NextResponse.json({ success: true, updated: writes.length });
  } catch (err) {
    console.error("❌ Failed to batch update contacted:", err);
    return NextResponse.json(
      { error: "Failed to update statuses" },
      { status: 500 }
    );
  }
}
