"use client";
import React from "react";
import type { PerfNumber } from "../types";

export const badgeColour = (score: PerfNumber) => {
  if (score === "N/A") return "bg-gray-600";
  if (typeof score === "number" && score >= 90) return "bg-green-600";
  if (typeof score === "number" && score >= 50) return "bg-yellow-500 text-black";
  return "bg-red-600";
};

export function ScoreBadge({ label, value }: { label: string; value: PerfNumber }) {
  return (
    <span
      className={`px-3 py-1 rounded-full font-bold text-xs ${badgeColour(value)}`}
      aria-label={`${label} performance ${value === "N/A" ? "not available" : `${value} percent`}`}
      title={`${label}: ${value === "N/A" ? "N/A" : `${value}%`}`}
    >
      {label} {value === "N/A" ? "N/A" : `${value}%`}
    </span>
  );
}

export function SkeletonCard() {
  return (
    <div className="p-6 rounded-xl border shadow-lg bg-[var(--dark-mint)] border-[var(--accent-green)] animate-pulse">
      <div className="h-6 w-1/3 bg-white/20 rounded mb-3" />
      <div className="h-4 w-1/4 bg-white/10 rounded mb-2" />
      <div className="h-4 w-1/5 bg-white/10 rounded" />
      <div className="mt-6 flex gap-2">
        <div className="h-6 w-20 bg-white/10 rounded-full" />
        <div className="h-6 w-20 bg-white/10 rounded-full" />
      </div>
    </div>
  );
}
