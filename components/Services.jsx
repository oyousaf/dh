"use client";

import { services } from "@/constants";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="py-12 bg-gray text-white">
      <h2 aria-labelledby="services-heading" className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
        Services
      </h2>
      <div className="max-w-7xl mx-auto px-6">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            className={`flex flex-col md:flex-row mb-12 bg-primary rounded-md p-3 relative z-10 ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
          >
            {/* Text Section */}
            <motion.div
              className="flex-1 flex justify-center items-center text-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 * index, duration: 0.5 }}
            >
              <div className="text-center items-center">
                <h3 className="text-3xl font-bold">{service.title}</h3>
                <p className="mt-2">{service.description}</p>
              </div>
            </motion.div>

            {/* Image Section */}
            <motion.div
              className={`relative h-64 md:h-auto md:w-1/2 flex-1 mb-6 md:mb-0`}
              style={{ height: "400px" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 * index, duration: 0.5 }}
            >
              <Image
                src={service.image}
                alt={service.title}
                width={500}
                height={300}
                className="rounded-lg object-cover object-center w-full h-full"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
