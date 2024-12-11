"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { services } from "@/constants";

export default function Services() {
  return (
    <section className="bg-gray py-20" id="services">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Services
        </motion.h2>

        <div className="space-y-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={`flex flex-col lg:flex-row items-center ${
                index % 2 === 0 ? "lg:flex-row-reverse" : ""
              } bg-primary p-8 rounded-lg shadow-lg`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              {/* Image Section */}
              <div className="lg:w-1/2 w-full relative aspect-w-16 aspect-h-9 rounded-md">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-contain rounded-lg shadow-lg"
                  priority
                />
              </div>

              {/* Text Section */}
              <div className="lg:w-1/2 w-full lg:px-12 mt-6 lg:mt-0 text-center lg:text-left">
                <h3 className="text-2xl font-bold text-white">
                  {service.title}
                </h3>
                <p className="mt-4 text-white text-sm">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
