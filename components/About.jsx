"use client";

import { tiles } from "@/constants";
import { motion, AnimatePresence } from "framer-motion";

export default function About() {
  return (
    <section className="text-white py-20">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <AnimatePresence>
            {tiles.map(({ id, icon, text }, index) => (
              <motion.div
                key={id}
                className="bg-gradient-to-b from-primary to-accent p-8 rounded-full shadow-lg flex flex-col items-center justify-center space-y-4 transform transition-all hover:scale-110"
                animate={{
                  y: ["0px", "-50px", "0px"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: index * 0.5,
                }}
              >
                <div className="text-6xl mb-4">{icon}</div>
                <p className="text-sm md:text-base text-center text-gray-200">
                  {text}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
