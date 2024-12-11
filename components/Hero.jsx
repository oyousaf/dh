"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  const motionProps = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1 },
  };

  const handleScroll = (sectionId) => {
    const targetSection = document.getElementById(sectionId);
    targetSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="home"
      className="relative bg-gradient-to-b from-black via-gray to-primary text-white md:pt-40 pt-28 pb-20"
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold leading-tight"
            {...motionProps}
          >
            Trusted Drainage Experts
          </motion.h1>
          <motion.p className="mt-4 text-lg md:text-xl" {...motionProps}>
            24/7 emergency support and reliable solutions for all your drainage
            needs.
          </motion.p>
          <motion.div
            className="mt-6"
            {...motionProps}
            transition={{ ...motionProps.transition, duration: 1.2 }}
          >
            <button
              onClick={() => handleScroll("contact")}
              className="bg-primary hover:bg-secondary text-white/80 hover:text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-accent transition"
              aria-label="Contact us now for drainage services"
            >
              Get in Touch
            </button>
          </motion.div>
        </div>

        <div className="md:w-1/2 mt-8 md:mt-0 relative w-full h-[500px]">
          <Image
            src="/hero-bg.jpg"
            alt="Drainage Experts"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
