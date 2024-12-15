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
    <footer className="bg-black py-6 text-center" role="contentinfo">
      <p className="text-xl p-6">
        &copy; {currentYear} Drainage Hero. All rights reserved.
      </p>

      <div className="md:text-lg text-md relative z-10">
        <address className="not-italic">
          <p>Hawkingcroft Rd, Horbury, Wakefield, WF4 6AH</p>
          <p className="mt-2">
            <a
              href="tel:+447722128784"
              className="hover:text-secondary"
              title="Call Drainage Hero at 07722128784"
            >
              07722128784
            </a>
          </p>
        </address>
      </div>

      <div
        className="flex justify-center space-x-4 mt-6 relative z-10"
        aria-label="Social media links"
      >
        {socialLinks.map(({ href, icon: Icon, name }, index) => (
          <motion.a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary"
            whileHover="hover"
            variants={socialIconVariants}
            aria-label={`Follow us on ${name}`}
            title={`Follow Drainage Hero on ${name}`}
          >
            <Icon size={30} />
          </motion.a>
        ))}
      </div>
    </footer>
  );
}
