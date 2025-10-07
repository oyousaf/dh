"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  SiteData,
  ContactedMap,
  FilterType,
  PerfNumber,
  PerformanceScore,
} from "../types";

/** Coerce API JSON to SiteData[] */
function coerceSites(input: unknown): SiteData[] {
  if (!Array.isArray(input)) return [];
  return input
    .map((d): SiteData | null => {
      if (!d || typeof d !== "object") return null;
      const obj = d as Record<string, unknown>;
      const id =
        typeof obj.id === "string" && obj.id.trim().length > 0 ? obj.id : null;
      if (!id) return null;

      const name = typeof obj.name === "string" ? obj.name : "";
      const url =
        typeof obj.url === "string" ? obj.url : obj.url === null ? null : null;
      const phone =
        typeof obj.phone === "string"
          ? obj.phone
          : obj.phone === null
            ? null
            : null;
      const hasWebsite = Boolean(obj.hasWebsite);
      const profileLink =
        typeof obj.profileLink === "string"
          ? obj.profileLink
          : obj.profileLink === null
            ? null
            : undefined;

      let performanceScore: PerformanceScore = "N/A";
      const ps = obj.performanceScore as unknown;
      if (ps && typeof ps === "object") {
        const pso = ps as Record<string, unknown>;
        const mobile: PerfNumber =
          pso.mobile === "N/A"
            ? "N/A"
            : typeof pso.mobile === "number"
              ? pso.mobile
              : typeof pso.mobile === "string" &&
                  !Number.isNaN(Number(pso.mobile))
                ? Number(pso.mobile)
                : "N/A";
        const desktop: PerfNumber =
          pso.desktop === "N/A"
            ? "N/A"
            : typeof pso.desktop === "number"
              ? pso.desktop
              : typeof pso.desktop === "string" &&
                  !Number.isNaN(Number(pso.desktop))
                ? Number(pso.desktop)
                : "N/A";
        performanceScore = { mobile, desktop };
      }

      const priorityScore =
        typeof obj.priorityScore === "number"
          ? obj.priorityScore
          : typeof obj.priorityScore === "string" &&
              !Number.isNaN(Number(obj.priorityScore))
            ? Number(obj.priorityScore)
            : 0;

      return {
        id,
        name: String(name),
        url,
        phone,
        hasWebsite,
        profileLink,
        performanceScore,
        priorityScore,
      };
    })
    .filter(Boolean) as SiteData[];
}

export function useOutreachData() {
  const initialQuery =
    typeof window !== "undefined"
      ? (new URLSearchParams(window.location.search).get("query") ??
        "businesses in Ossett")
      : "businesses in Ossett";

  const [query, setQuery] = useState<string>(initialQuery);
  const [inputQuery, setInputQuery] = useState<string>(initialQuery);
  const [sites, setSites] = useState<SiteData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [contacted, setContacted] = useState<ContactedMap>({});
  const [filterBy, setFilterBy] = useState<FilterType>("all");
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const fetchAbortRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(
    async (forceRefresh = false) => {
      setLoading(true);
      fetchAbortRef.current?.abort();
      const ctrl = new AbortController();
      fetchAbortRef.current = ctrl;

      try {
        const url = `/api/outreach?query=${encodeURIComponent(query)}${forceRefresh ? "&refresh=1" : ""}`;
        const res = await fetch(url, {
          signal: ctrl.signal,
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        const json = (await res.json()) as unknown;
        const safe = coerceSites(json);
        setSites(safe);
        setLastUpdated(new Date().toLocaleString());
      } catch (e) {
        if ((e as Error).name !== "AbortError") {
          setSites([]);
        }
      } finally {
        setLoading(false);
      }
    },
    [query]
  );

  useEffect(() => {
    fetchData();
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      params.set("query", query);
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}?${params.toString()}`
      );
    }
    return () => fetchAbortRef.current?.abort();
  }, [fetchData, query]);

  const loadContacted = useCallback(async () => {
    if (!sites.length) return;
    try {
      const names = sites
        .map((s) => encodeURIComponent(s.id || s.name))
        .join(",");
      const res = await fetch(`/api/contacted?names=${names}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("contacted fetch failed");
      const json = (await res.json()) as ContactedMap;
      setContacted(json);
    } catch {
      setContacted({});
    }
  }, [sites]);

  useEffect(() => {
    loadContacted();
  }, [loadContacted]);

  /** Button path: optimistic → POST → reconcile */
  const markAsContacted = useCallback(
    async (key: string, value: boolean) => {
      setContacted((prev) => ({ ...prev, [key]: value }));
      try {
        const res = await fetch("/api/contacted", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            updates: [{ contactKey: key, contacted: value }],
          }),
        });
        if (!res.ok) throw new Error("failed");
        await loadContacted();
      } catch {
        setContacted((prev) => ({ ...prev, [key]: !value }));
      }
    },
    [loadContacted]
  );

  const counts = useMemo(() => {
    return {
      contactedCount: Object.values(contacted).filter(Boolean).length,
      noWebsiteCount: sites.filter((s) => !s.hasWebsite).length,
    };
  }, [contacted, sites]);

  return {
    // state
    query,
    setQuery,
    inputQuery,
    setInputQuery,
    sites,
    loading,
    contacted,
    filterBy,
    setFilterBy,
    lastUpdated,
    counts,
    fetchData,
    loadContacted,
    markAsContacted,
    setContacted,
  };
}
