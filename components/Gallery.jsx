import React from "react";

import { gallery } from "@/constants";

const Gallery = () => {
  return (
    <section id="gallery" className="py-12 max-w-7xl mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
        Our Work
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        {gallery.map((image) => (
          <div
            key={image.id}
            className="relative overflow-hidden rounded-lg shadow-lg"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
