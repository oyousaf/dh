"use client";
import { motion } from "framer-motion";
import { socialLinks } from "@/constants";

const socialIconVariants = {
  hover: {
    scale: 1.2,
    rotate: -5,
    transition: { type: "spring", stiffness: 200, damping: 10 },
  },
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-beige py-6 text-center">
      <p className="text-lg">&copy; {currentYear} Drainage Hero</p>
      <p>All rights reserved</p>
      <div className="flex justify-center space-x-4 mt-4">
        {socialLinks.map(({ href, icon: Icon }, index) => (
          <motion.a
            key={index}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="text-beige hover:text-tan"
            whileHover="hover"
            variants={socialIconVariants}
          >
            <Icon size={30} />
          </motion.a>
        ))}
      </div>
    </footer>
  );
}
