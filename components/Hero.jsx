"use client";

import { motion } from "framer-motion";
import { FaArrowDown } from "react-icons/fa";
import Image from "next/image";

export default function Hero() {
  const handleScroll = (sectionId) => {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      id="hero"
      className="h-screen flex flex-col items-center justify-center text-center relative"
    >
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero-bg.jpg"
          alt="Drainage Hero background"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/80 pointer-events-none" />
      </div>

      {/* Animated Text */}
      <motion.h1
        className="text-4xl font-bold text-tan drop-shadow-lg relative"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Reliable Drainage Solutions
      </motion.h1>
      <motion.p
        className="mt-4 drop-shadow-md relative z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Trusted experts available 24/7 to resolve your drainage needs
      </motion.p>

      {/* CTA */}
      <motion.button
        onClick={() => handleScroll("about")}
        className="animate-bounce hover:text-tan rounded-full mt-8 transition duration-300 ease-in-out"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <FaArrowDown size={50} />
      </motion.button>
    </section>
  );
}
