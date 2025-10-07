"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef } from "react";
import { FaBolt, FaLayerGroup, FaMobileAlt, FaSearch } from "react-icons/fa";

const highlightItems = [
  {
    icon: <FaBolt size={32} />,
    title: "Fast Performance",
    desc: "Websites engineered for exceptional speed and responsiveness.",
  },
  {
    icon: <FaLayerGroup size={32} />,
    title: "Scalable Code",
    desc: "Future‑proof architecture that grows seamlessly with your business.",
  },
  {
    icon: <FaMobileAlt size={32} />,
    title: "Mobile‑First Design",
    desc: "Interfaces crafted for clarity and usability on every screen.",
  },
  {
    icon: <FaSearch size={32} />,
    title: "SEO‑Ready",
    desc: "Built with technical SEO foundations for lasting visibility.",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: (custom as number) * 0.15,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section
      ref={ref}
      id="about"
      className="relative min-h-screen px-6 sm:px-12 py-24 overflow-hidden"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--dark-mint)]/95 via-[var(--dark-mint)]/85 to-[var(--mossy-bg)]/95 z-0" />

      {/* Floating parallax icons */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-16 left-6 text-[var(--accent-green)] opacity-25 text-6xl pointer-events-none"
      >
        <FaBolt />
      </motion.div>
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-20 right-10 text-[var(--accent-green)] opacity-20 text-7xl pointer-events-none"
      >
        <FaLayerGroup />
      </motion.div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-[var(--accent-green)] to-teal-200 bg-clip-text text-transparent leading-[1.2] pb-[0.15em]"
        >
          About Us
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-lg sm:text-xl max-w-3xl mx-auto mb-16 text-[var(--foreground)] leading-relaxed"
        >
          We build sleek, high‑performance websites tailored to your brand’s
          identity. Whether launching a new venture or revitalising your digital
          presence, we deliver secure, scalable experiences that inspire trust
          and drive results.
        </motion.p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {highlightItems.map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{
                y: -4,
                boxShadow: "0px 12px 24px rgba(0,0,0,0.25)",
              }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="relative bg-white/5 backdrop-blur-lg border border-white/10 hover:border-[var(--accent-green)] p-6 rounded-2xl shadow-lg transition-all duration-300 group"
            >
              <div className="flex justify-center mb-4">
                <motion.div
                  whileHover={{ rotate: 3, y: -2 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  className="text-[var(--accent-green)]"
                >
                  {item.icon}
                </motion.div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-[var(--foreground)] text-sm sm:text-base">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
