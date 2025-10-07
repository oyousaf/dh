"use client";

import React, { useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSyncAlt, FaFacebook, FaGoogle, FaGlobe } from "react-icons/fa";

import { useOutreachData } from "./hooks/useOutreachData";
import { useSendOutreach } from "./hooks/useSendOutreach";
import { ScoreBadge, SkeletonCard } from "./components/UI";
import Modal from "./Modal";
import type { SiteData, ComposeTo, FilterType } from "./types";

export default function OutreachPage() {
  const {
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
  } = useOutreachData();

  const [composeOpen, setComposeOpen] = useState(false);
  const [composeTo, setComposeTo] = useState<ComposeTo>(null);
  const [composeMsg, setComposeMsg] = useState("");

  const { sending, sendOutreach } = useSendOutreach({
    composeTo,
    composeMsg,
    setComposeOpen: setComposeOpen,
    setContacted,
    loadContacted,
  });

  const openCompose = useCallback((site: SiteData) => {
    const contactKey = site.id || site.name;
    setComposeTo({
      email: "",
      name: site.name,
      business: site.name,
      website: site.url ?? undefined,
      contactKey,
    });
    setComposeMsg(
      `I came across your business and noticed you may not currently have a website — or the existing one might be due a modern refresh.\n\n` +
        `At Legxcy Solutions, we design and develop high-performance, bespoke websites tailored to each business’s identity and aspirations.\n\n` +
        `If you're open to a brief chat, I'd be delighted to explore how we can strengthen your online presence.`
    );
    setComposeOpen(true);
  }, []);

  const filteredSites = useMemo(() => {
    return sites
      .filter((site) => {
        const key = site.id || site.name;
        if (filterBy === "noWebsite") return !site.hasWebsite;
        if (filterBy === "contacted") return contacted[key];
        if (filterBy === "notContacted") return !contacted[key];
        return true;
      })
      .sort((a, b) => b.priorityScore - a.priorityScore);
  }, [sites, filterBy, contacted]);

  return (
    <main className="flex flex-col items-center justify-center px-6 py-12 min-h-screen bg-[var(--mossy-bg)]">
      {/* HEADER */}
      <div className="w-full max-w-5xl text-center">
        <motion.h1
          className="text-4xl font-bold mb-4 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🍉 Outreach Dashboard
        </motion.h1>
        {lastUpdated && (
          <motion.p
            className="text-sm text-gray-300 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Last updated: {lastUpdated}
          </motion.p>
        )}
        <div className="mb-6 text-md text-white/90">
          🚫 <strong>{counts.noWebsiteCount}</strong> with no website | ✅{" "}
          <strong>{counts.contactedCount}</strong> contacted
        </div>
      </div>

      {/* SEARCH / FILTER */}
      <motion.div
        className="p-5 rounded-xl shadow-lg flex flex-col md:flex-row md:flex-wrap justify-center items-stretch gap-3 md:gap-4 mb-10 border bg-[var(--mossy-bg)] border-[var(--accent-green)]/70"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setQuery(inputQuery.trim() || "businesses in Ossett");
          }}
          className="flex flex-col sm:flex-row w-full md:w-auto gap-2"
          aria-label="Search businesses"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Search businesses..."
            className="px-4 py-2 rounded-lg text-white text-center placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent-green)] w-full sm:w-64 bg-[var(--dark-mint)]/90 border border-[var(--accent-green)]/60"
            aria-label="Search query"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg font-semibold shadow-md text-white bg-[var(--accent-green)] hover:brightness-110 active:scale-95 transition"
          >
            🔍 Search
          </button>
        </form>

        <select
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value as FilterType)}
          className="px-4 py-2 rounded-lg text-white w-full sm:w-56 text-center bg-[var(--dark-mint)]/90 border border-[var(--accent-green)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--accent-green)]"
        >
          <option value="all">Show All</option>
          <option value="noWebsite">No Website Only</option>
          <option value="contacted">Contacted</option>
          <option value="notContacted">Not Contacted</option>
        </select>

        <motion.button
          onClick={() => fetchData(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold text-white bg-[var(--accent-green)] hover:brightness-110 active:scale-95 transition"
          whileTap={{ scale: 0.95 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 0.4 }}
        >
          <FaSyncAlt className={loading ? "animate-spin" : ""} /> Refresh
        </motion.button>
      </motion.div>

      {/* LIST */}
      <div className="w-full max-w-3xl">
        <AnimatePresence mode="wait">
          {loading ? (
            <div className="grid grid-cols-1 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : filteredSites.length === 0 ? (
            <motion.p
              key="no-results"
              className="text-xl text-gray-300 italic text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No businesses match your filters.
            </motion.p>
          ) : (
            <motion.ul
              layout
              className="grid grid-cols-1 gap-6 w-full"
              style={{ scrollbarGutter: "stable" }}
            >
              <AnimatePresence initial={false}>
                {filteredSites.map((site) => {
                  const contactKey = site.id || site.name;

                  return (
                    <motion.li
                      key={contactKey}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: 0.05 }}
                      className="p-6 rounded-xl shadow-lg text-left border bg-[var(--dark-mint)] border-[var(--accent-green)]/70"
                    >
                      <div className="flex justify-between items-start flex-col md:flex-row gap-4">
                        <div>
                          <h2 className="text-2xl font-semibold text-white">
                            {site.name}
                          </h2>
                          <div className="text-gray-300 mt-2 space-y-1">
                            {site.phone && <p>📞 {site.phone}</p>}
                            {site.url && (
                              <p>
                                <a
                                  href={site.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xl hover:opacity-90 text-blue-300"
                                  aria-label="Visit website"
                                >
                                  <FaGlobe />
                                </a>
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col items-start md:items-end gap-2">
                          {site.performanceScore !== "N/A" &&
                          typeof site.performanceScore === "object" ? (
                            <div className="flex gap-2">
                              <ScoreBadge
                                label="📱"
                                value={site.performanceScore.mobile}
                              />
                              <ScoreBadge
                                label="🖥️"
                                value={site.performanceScore.desktop}
                              />
                            </div>
                          ) : (
                            <span className="px-3 py-1 rounded-full font-bold bg-gray-600 text-xs">
                              No Score
                            </span>
                          )}

                          <span className="px-3 py-1 rounded-full font-bold bg-purple-600">
                            Priority: {site.priorityScore}
                          </span>

                          {!contacted[contactKey] ? (
                            <div className="flex gap-2 mt-1">
                              <motion.button
                                onClick={() => openCompose(site)}
                                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 rounded text-sm"
                              >
                                ✉️ Send Outreach
                              </motion.button>
                              <motion.button
                                onClick={() =>
                                  markAsContacted(contactKey, true)
                                }
                                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                              >
                                📬 Mark Contacted
                              </motion.button>
                            </div>
                          ) : (
                            <div className="flex gap-2 mt-1">
                              <span className="px-3 py-1 bg-green-600 rounded text-sm">
                                ✅ Contacted
                              </span>
                              <button
                                onClick={() =>
                                  markAsContacted(contactKey, false)
                                }
                                className="px-2 py-1 bg-gray-600 hover:bg-gray-700 rounded text-xs"
                              >
                                Undo
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 flex gap-3 flex-wrap">
                        <a
                          href={`https://www.google.com/search?q=${encodeURIComponent(`${site.name} site:facebook.com`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 p-2 rounded-full font-bold bg-indigo-600 hover:bg-indigo-700"
                          aria-label="Search Facebook"
                        >
                          <FaFacebook />
                        </a>
                        <a
                          href={site.profileLink || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 p-2 rounded-full font-bold bg-red-600 hover:bg-red-700"
                          aria-label="Open Google profile"
                        >
                          <FaGoogle />
                        </a>
                      </div>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {/* COMPOSE MODAL */}
      <Modal
        open={composeOpen}
        to={composeTo}
        message={composeMsg}
        sending={sending}
        setTo={setComposeTo}
        setMessage={setComposeMsg}
        onClose={() => setComposeOpen(false)}
        onSend={sendOutreach}
      />
    </main>
  );
}
