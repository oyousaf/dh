"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef } from "react";
import {
  FaLaptopCode,
  FaMobileAlt,
  FaSyncAlt,
  FaSearch,
  FaUsers,
  FaTachometerAlt,
  FaUniversalAccess,
  FaUserTie,
  FaTools,
} from "react-icons/fa";

// Full services list with unique icons
const services = [
  {
    icon: <FaLaptopCode size={32} />,
    title: "Web Development",
    desc: "End‑to‑end web development services using modern frameworks for fast, reliable results.",
  },
  /*{
    icon: <FaGlobe size={32} />,
    title: "Web Apps",
    desc: "Interactive, custom web applications built for performance, scalability, and ease of use.",
  },
  {
    icon: <FaPenNib size={32} />,
    title: "Application Development",
    desc: "Custom web and desktop applications built to meet your unique business needs.",
  },*/
  {
    icon: <FaMobileAlt size={32} />,
    title: "Responsive & Mobile‑First Web Design",
    desc: "Websites that look and perform beautifully on mobiles, tablets, and desktops.",
  },
  {
    icon: <FaSyncAlt size={32} />,
    title: "Website Redesign & Modernisation",
    desc: "Refresh outdated websites with a sleek, fast, and user‑friendly design.",
  },
  {
    icon: <FaSearch size={32} />,
    title: "SEO‑Optimised Business Websites",
    desc: "Websites designed with built‑in SEO best practices to help you rank higher on Google.",
  },
  /*{
    icon: <FaShoppingCart size={32} />,
    title: "E‑commerce Websites",
    desc: "Custom online stores with secure checkout and user‑friendly navigation.",
  },*/
  {
    icon: <FaUsers size={32} />,
    title: "UI/UX Design for Small Businesses",
    desc: "Clean, intuitive interfaces that make browsing effortless for your customers.",
  },
  {
    icon: <FaTachometerAlt size={32} />,
    title: "Fast, High‑Performance Websites",
    desc: "Optimised websites that load quickly and deliver smooth user experiences.",
  },
  {
    icon: <FaUniversalAccess size={32} />,
    title: "Website Accessibility Improvements",
    desc: "Enhancing websites with accessibility features to meet modern web standards.",
  },
  {
    icon: <FaUserTie size={32} />,
    title: "Portfolio & Personal Branding Websites",
    desc: "Showcase your work or personal brand with a professional, stylish website.",
  },
  {
    icon: <FaTools size={32} />,
    title: "Ongoing Website Maintenance & Support",
    desc: "Reliable updates and technical support to keep your site secure and running smoothly.",
  },
];

// Card animation
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
  }),
};

export default function Services() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Subtle parallax effect
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -25]);

  return (
    <section
      ref={ref}
      id="services"
      className="relative min-h-screen px-6 sm:px-12 py-24 overflow-hidden"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--mossy-bg)]/95 via-[var(--mossy-bg)]/85 to-[var(--dark-mint)]/95 -z-10" />

      {/* Section content */}
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.h2
          style={{ y: y1 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-[var(--accent-green)] to-teal-200 bg-clip-text text-transparent leading-[1.2] pb-[0.15em]"
        >
          Our Services
        </motion.h2>

        <motion.p
          style={{ y: y2 }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-lg sm:text-xl max-w-2xl mx-auto mb-16 text-[var(--foreground)] leading-relaxed"
        >
          Transforming visions into high‑impact digital solutions — designed to
          inspire, perform, and scale with your business.
        </motion.p>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{
                y: -5,
                boxShadow: "0px 14px 28px rgba(0,0,0,0.25)",
              }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[var(--accent-green)] p-7 rounded-2xl shadow-xl transition-all duration-300 group text-center"
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <motion.div
                  whileHover={{ rotate: -3, y: -2 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  className="text-[var(--accent-green)]"
                >
                  {s.icon}
                </motion.div>
              </div>

              {/* Service details */}
              <h3 className="text-xl font-semibold text-white mb-3">
                {s.title}
              </h3>
              <p className="text-[var(--foreground)] text-sm sm:text-base">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
