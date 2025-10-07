"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";
import { trackWhatsAppClick } from "@/lib/gtag";

export default function WhatsAppBubble() {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    // 🔥 Unified GA4 + Ads conversion tracking
    trackWhatsAppClick();

    // Open WhatsApp chat in new tab
    window.open("https://wa.me/447597866002", "_blank");
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2">
      {/* Tooltip (desktop only) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showTooltip ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="hidden sm:block absolute left-16 px-2 py-1 text-xs text-white bg-[var(--mossy-bg)] rounded shadow"
        style={{ pointerEvents: "none" }}
      >
        Chat on WhatsApp
      </motion.div>

      {/* WhatsApp Bubble */}
      <motion.button
        onClick={handleClick}
        aria-label="Chat with us on WhatsApp"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-green-500 shadow-lg hover:bg-green-600 focus:outline-none 
                   focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
      >
        <FaWhatsapp size={30} className="text-white" />
      </motion.button>
    </div>
  );
}
