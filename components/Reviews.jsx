"use client"

import { reviews } from "@/constants";
import { motion } from "framer-motion";

export default function Reviews() {
  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="bg-gray py-20">
      <h2 aria-labelledby="reviews-heading" className="text-3xl md:text-4xl font-bold text-center text-white mb-12">Reviews</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-6 text-center">
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            className="bg-primary text-white p-6 rounded-lg shadow-lg relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * review.id, duration: 0.5 }}
          >
            <p className="text-2xl font-semibold">{review.name}</p>
            <p className="text-gray-600 mt-2">{review.content}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
