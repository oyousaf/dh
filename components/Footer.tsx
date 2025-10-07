"use client";

import { motion } from "framer-motion";
import { FaTelegramPlane, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import * as gtag from "@/lib/gtag";

type EventParams = {
  category: string;
  label: string;
  value: number;
};

export default function Footer() {
  const handleSocialClick = (platform: string, url: string) => {
    const params: EventParams = {
      category: "social",
      label: platform,
      value: 1,
    };

    gtag.event({
      action: `${platform.toLowerCase()}_click`,
      params,
    });

    window.open(url, "_blank");
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full px-6 py-12 text-[var(--foreground)] overflow-hidden"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--dark-mint)]/95 via-[var(--dark-mint)]/85 to-[var(--mossy-bg)]/95 -z-10" />

      {/* Footer content */}
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-6 relative z-10">
        {/* Social icons */}
        <div className="flex gap-6">
          <button
            onClick={() =>
              handleSocialClick("Email", "mailto:info@legxcysol.dev")
            }
            aria-label="Send us an email"
            className="text-white hover:text-[var(--accent-green)] transition focus:outline-none focus:ring-2 focus:ring-[var(--accent-green)] rounded-full p-2"
          >
            <FaEnvelope size={24} />
          </button>
          <button
            onClick={() => handleSocialClick("Telegram", "https://t.me/kufiii")}
            aria-label="Chat with us on Telegram"
            className="text-white hover:text-[var(--accent-green)] transition focus:outline-none focus:ring-2 focus:ring-[var(--accent-green)] rounded-full p-2"
          >
            <FaTelegramPlane size={24} />
          </button>
          <button
            onClick={() =>
              handleSocialClick("WhatsApp", "https://wa.me/447597866002")
            }
            aria-label="Message us on WhatsApp"
            className="text-white hover:text-[var(--accent-green)] transition focus:outline-none focus:ring-2 focus:ring-[var(--accent-green)] rounded-full p-2"
          >
            <FaWhatsapp size={24} />
          </button>
        </div>

        {/* Copy */}
        <div>
          <p className="text-sm text-neutral-200">
            &copy; {new Date().getFullYear()} Legxcy Solutions. All rights
            reserved.
          </p>
          <p className="text-base font-medium">
            A legxcy of innovation, one pixel at a time.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
