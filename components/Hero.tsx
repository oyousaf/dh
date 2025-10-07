"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const handleSmoothScroll = () => {
    const target = document.querySelector("#contact") as HTMLElement | null;
    const lenis = (
      window as unknown as { lenis?: { scrollTo: (el: Element) => void } }
    ).lenis;

    if (target && typeof lenis?.scrollTo === "function") {
      lenis.scrollTo(target);
    } else if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative w-full h-screen flex items-center justify-center text-white overflow-hidden"
      aria-label="Hero section introducing Legxcy Solutions"
    >
      {/* Background banner */}
      <Image
        src="/banner.webp"
        alt="Legxcy Solutions hero banner"
        fill
        priority
        style={{ objectFit: "cover" }}
        className="absolute inset-0 z-0 brightness-[0.55]"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--mossy-bg)]/95 via-[var(--mossy-bg)]/85 to-[var(--dark-mint)]/95 z-0" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 p-6 sm:p-12 backdrop-blur-md bg-white/10 border border-white/10 rounded-xl max-w-2xl mx-4 text-center shadow-xl"
      >
        <div className="flex justify-center mb-4">
          <Image
            src="/logo.webp"
            alt="Legxcy Solutions Logo"
            width={200}
            height={80}
            priority
          />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[var(--accent-green)] to-teal-300 bg-clip-text text-transparent"
        >
          Where Vision Meets Innovation
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-4 text-lg text-gray-100 leading-relaxed"
        >
          Bespoke websites engineered for performance and clarity — responsive
          by design, built to elevate your digital presence.
        </motion.p>

        <motion.button
          onClick={handleSmoothScroll}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="inline-block mt-6 px-8 py-3 cursor-pointer text-white font-semibold rounded-lg shadow-md 
                     bg-gradient-to-r from-[var(--accent-green)] to-teal-500 hover:from-teal-500 hover:to-[var(--accent-green)]
                     focus:outline-none focus:ring-2 focus:ring-[var(--accent-green)] focus:ring-offset-2"
        >
          Request a Free Audit
        </motion.button>
      </motion.div>
    </section>
  );
}
