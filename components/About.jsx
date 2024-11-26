"use client";

import { FaBullhorn, FaHandshake, FaHistory, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { aboutTiles, gallery } from "@/constants";

const icons = { FaBullhorn, FaHandshake, FaHistory, FaStar };

export default function About() {
  return (
    <section id="about" className="py-12 text-black">
      <div className="px-4">
        <h2 className="text-3xl text-tan font-bold text-center mb-8">About</h2>

        {/* About Tiles */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {aboutTiles.map(({ title, description, icon }, index) => {
            const Icon = icons[icon];
            return (
              <div
                key={index}
                className="p-6 bg-tan rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Icon size={40} className="mx-auto mb-4" />
                <h3 className="font-bold text-white text-xl text-center">
                  {title}
                </h3>
                <p className="mt-4 text-center">{description}</p>
              </div>
            );
          })}
        </div>

        {/* Gallery Section */}
        <div className="mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {gallery.map(({ id, src, alt }) => (
              <motion.div
                key={id}
                className="overflow-hidden rounded-lg shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * id }}
              >
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
