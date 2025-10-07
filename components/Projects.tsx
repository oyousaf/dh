"use client";

import { motion, Variants } from "framer-motion";
import { FaEye } from "react-icons/fa";

// Projects data
const projects = [
  {
    name: "Hxmza",
    desc: "A stylish, mobile-first car rental platform with a clean UI and seamless booking flow.",
    video: "/projects/hxmza.mkv",
    link: "https://hxmza.uk",
  },
  {
    name: "Legxcy",
    desc: "A full-stack eCommerce platform designed for scalability, clarity, and conversion.",
    video: "/projects/legxcy.mkv",
    link: "https://legxcy.uk",
  },
  {
    name: "Astra-AI",
    desc: "An intelligent web app to help you track and manage your job applications effectively.",
    video: "/projects/astra.mkv",
    link: "https://astra-ai-six.vercel.app",
  },
  {
    name: "AMS",
    desc: "A modern, professional car dealership website with live listings and verified reviews.",
    video: "/projects/ams.mkv",
    link: "https://acemotorsales.uk",
  },
  {
    name: "Not3s",
    desc: "A simple sticky notes app.",
    video: "/projects/not3s.mp4",
    link: "https://not3s.vercel.app",
  },
  {
    name: "Pollards",
    desc: "A full stack appointment management system.",
    video: "/projects/pollards.mp4",
    link: "https://pollards.vercel.app",
  },
];

// Card animation
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
  }),
};

// Idle pulse animation for FaEye
const pulseVariants: Variants = {
  idle: {
    scale: [1, 1.05, 1],
    opacity: [0.85, 1, 0.85],
    transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
  },
  hover: {
    scale: 1.2,
    opacity: 1,
    textShadow: "0px 0px 8px rgba(255,255,255,0.8)",
    transition: { type: "spring", stiffness: 200, damping: 12 },
  },
};

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative min-h-screen px-6 sm:px-12 py-24 overflow-hidden"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--dark-mint)]/95 via-[var(--dark-mint)]/85 to-[var(--mossy-bg)]/95 -z-10" />

      {/* Section content */}
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-[var(--accent-green)] to-teal-200 bg-clip-text text-transparent leading-[1.2] pb-[0.15em]"
        >
          Projects
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-lg sm:text-xl text-[var(--foreground)] mb-16 max-w-3xl mx-auto leading-relaxed"
        >
          A curated selection of bespoke projects — from sleek single-page sites
          to powerful full-stack business platforms.
        </motion.p>

        {/* Project cards */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{
                y: -6,
                boxShadow: "0px 14px 28px rgba(0,0,0,0.25)",
              }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="group bg-white/5 backdrop-blur-lg border border-white/10 hover:border-[var(--accent-green)] rounded-2xl overflow-hidden shadow-xl transition-all duration-300"
            >
              {/* Video preview */}
              <div className="relative w-full h-52 overflow-hidden">
                <motion.video
                  src={p.video}
                  className="w-full h-full object-cover"
                  playsInline
                  muted
                  loop
                  preload="metadata"
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                  }}
                  initial={{ scale: 1, opacity: 0.9 }}
                  whileHover={{ scale: 1.05, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                />
              </div>

              {/* Project details */}
              <div className="p-6 flex flex-col items-center text-center">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {p.name}
                </h3>
                <p className="text-[var(--foreground)] mb-4 text-sm sm:text-base max-w-xs">
                  {p.desc}
                </p>
                {p.link && (
                  <motion.a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-4xl text-gray-200 hover:text-white flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 250, damping: 18 }}
                  >
                    <motion.span
                      variants={pulseVariants}
                      initial="idle"
                      whileHover="hover"
                    >
                      <FaEye />
                    </motion.span>
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
