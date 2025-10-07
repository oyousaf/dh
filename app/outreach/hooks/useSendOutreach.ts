"use client";

import { useCallback, useState } from "react";
import type { ComposeTo, ContactedMap, AnalyticsWindow } from "../types";

type Args = {
  composeTo: ComposeTo;
  composeMsg: string;
  setComposeOpen: (v: boolean) => void;
  setContacted: React.Dispatch<React.SetStateAction<ContactedMap>>;
  loadContacted: () => Promise<void>;
};

export function useSendOutreach({
  composeTo,
  composeMsg,
  setComposeOpen,
  setContacted,
  loadContacted,
}: Args) {
  const [sending, setSending] = useState(false);

  const sendOutreach = useCallback(async () => {
    if (!composeTo?.email) {
      alert("Please add a recipient email.");
      return;
    }
    const contactKey = composeTo.contactKey;

    // optimistic UI
    setContacted((prev) => ({ ...prev, [contactKey]: true }));

    try {
      setSending(true);
      const res = await fetch("/api/outreach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: composeTo.email.trim(),
          name: composeTo.name,
          business: composeTo.business,
          website: composeTo.website,
          message: composeMsg.trim(),
          contactKey,
        }),
      });

      const j = await res.json();
      if (!res.ok) {
        const msg =
          j && typeof j === "object" && "error" in j
            ? String((j as Record<string, unknown>)["error"])
            : "Send failed";
        throw new Error(msg);
      }

      if (typeof window !== "undefined") {
        const w = window as AnalyticsWindow;
        const recipientDomain = composeTo.email.split("@").pop() ?? "";
        w.gtag?.("event", "outreach_email_sent", {
          recipient_domain: recipientDomain,
          business: composeTo.business || composeTo.name,
        });
      }

      await loadContacted();
      setComposeOpen(false);
    } catch (e) {
      setContacted((prev) => ({ ...prev, [contactKey]: false }));
      alert((e as Error).message);
    } finally {
      setSending(false);
    }
  }, [composeTo, composeMsg, loadContacted, setComposeOpen, setContacted]);

  return { sending, sendOutreach };
}
