import React from "react";
import { heroContent } from "@/constants";

const CTA = () => {
  return (
    <section className="bg-primary py-16 px-6 text-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        {heroContent.title}
      </h2>
      <p className="mb-6 text-lg">{heroContent.description}</p>
      <a
        href={heroContent.buttonLink}
        className="bg-secondary text-white hover:text-gray py-3 px-8 rounded-lg text-lg font-semibold transition duration-300"
      >
        {heroContent.buttonText}
      </a>
    </section>
  );
};

export default CTA;
