"use client";

import { services } from "@/constants";
import Image from "next/image";

export default function Services() {
  return (
    <section id="services" className="py-12 bg-gray-100">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-8">
        Services
      </h2>
      <div className="max-w-7xl mx-auto px-6">
        {services.map((service, index) => (
          <div
            key={service.id}
            className={`flex flex-col md:flex-row mb-12 ${
              index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
            }`}
          >
            {/* Text Section */}
            <div className="flex-1 flex justify-center items-center text-center md:text-left p-6">
              <div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-gray-600 mt-2">{service.description}</p>
              </div>
            </div>

            {/* Image Section */}
            <div className="relative h-64 md:h-auto md:w-1/2 flex-1 mb-6 md:mb-0">
              <Image
                src={service.image}
                alt={service.title}
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                className="rounded-lg"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
