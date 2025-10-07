"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export type ComposeTo = {
  email: string;
  name: string;
  business?: string;
  website?: string;
  contactKey: string;
} | null;

type ModalProps = {
  open: boolean;
  to: ComposeTo;
  message: string;
  sending: boolean;
  setTo: React.Dispatch<React.SetStateAction<ComposeTo>>;
  setMessage: (msg: string) => void;
  onClose: () => void;
  onSend: () => void;
};

export default function Modal({
  open,
  to,
  message,
  sending,
  setTo,
  setMessage,
  onClose,
  onSend,
}: ModalProps) {
  return (
    <AnimatePresence>
      {open && to && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-3xl rounded-xl p-5"
            style={{
              backgroundColor: "var(--dark-mint)",
              border: "1px solid var(--accent-green)",
            }}
            initial={{ y: 30, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <h3 className="text-xl font-semibold text-white text-center mb-3">
              🍉 Compose Outreach
            </h3>

            <label className="block text-sm text-gray-200 mb-1">
              Recipient name
            </label>
            <input
              className="w-full mb-3 px-3 py-2 rounded bg-white/10 text-white border border-white/20"
              value={to.name}
              onChange={(e) =>
                setTo((prev) =>
                  prev ? { ...prev, name: e.target.value } : prev
                )
              }
            />

            <label className="block text-sm text-gray-200 mb-1">
              Recipient email
            </label>
            <input
              className="w-full mb-3 px-3 py-2 rounded bg-white/10 text-white border border-white/20"
              placeholder="owner@business.com"
              value={to.email}
              onChange={(e) =>
                setTo((prev) =>
                  prev ? { ...prev, email: e.target.value } : prev
                )
              }
            />

            <label className="block text-sm text-gray-200 mb-1">Message</label>
            <textarea
              className="w-full h-40 mb-4 px-3 py-2 rounded bg-white/10 text-white border border-white/20"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <div className="flex gap-2 justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 text-white"
              >
                Cancel
              </button>
              <button
                onClick={onSend}
                disabled={sending}
                className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50"
              >
                {sending ? "Sending…" : "Send"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
