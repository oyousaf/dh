"use client";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, socialLinks } from "@/constants";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (sectionId) => {
    const targetSection = document.getElementById(sectionId);
    targetSection?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? "auto" : "hidden";
  };

  const mobileMenuVariants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: { duration: 0.4, ease: "easeInOut", staggerChildren: 0.1 },
    },
    exit: { x: "100%", transition: { duration: 0.3, ease: "easeInOut" } },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <nav className="fixed top-0 w-full bg-black text-beige shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-3">
        {/* Logo */}
        <button
          onClick={() => handleScroll("hero")}
          aria-label="Scroll to hero section"
          className="text-2xl font-bold hover:text-tan transition-all duration-300 ease-in-out"
        >
          Drainage Hero
        </button>

        {/* Hamburger Icon */}
        <button
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          onClick={toggleMenu}
          className="md:hidden"
        >
          {isOpen ? <FaTimes size={40} /> : <FaBars size={40} />}
        </button>

        {/* Desktop Navbar Links */}
        <ul className="hidden md:flex space-x-6 text-tan md:text-beige">
          {NAV_LINKS.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => handleScroll(id)}
                className="text-lg hover:text-tan transition-all duration-300 ease-in-out"
                aria-label={`Navigate to ${label}`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop Social Media Icons */}
        <div className="hidden md:flex space-x-4">
          {socialLinks.map(({ href, icon: Icon }, index) => (
            <a
              key={index}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-beige hover:text-tan transition-all duration-300 ease-in-out"
              aria-label={`Social media link ${index + 1}`}
            >
              <Icon size={24} />
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            className="fixed top-0 left-0 w-full h-screen bg-black text-beige flex flex-col z-50"
          >
            {/* Close Button */}
            <button
              onClick={toggleMenu}
              aria-label="Close menu"
              className="absolute top-4 right-4"
            >
              <FaTimes size={32} />
            </button>

            {/* Navbar Links */}
            <motion.ul
              className="flex flex-col items-center justify-center flex-grow space-y-8"
              variants={mobileMenuVariants}
            >
              {NAV_LINKS.map(({ id, label }) => (
                <motion.li key={id} variants={menuItemVariants}>
                  <button
                    onClick={() => handleScroll(id)}
                    className="text-2xl font-bold uppercase mt-3 hover:text-tan transition-all duration-300 ease-in-out"
                    aria-label={`Navigate to ${label}`}
                  >
                    {label}
                  </button>
                </motion.li>
              ))}
            </motion.ul>

            {/* Social Media Icons */}
            <motion.div
              className="w-full flex justify-center space-x-6 mb-20"
              variants={mobileMenuVariants}
            >
              {socialLinks.map(({ href, icon: Icon }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-beige hover:text-tan transition-all duration-300 ease-in-out"
                  aria-label={`Social media link ${index + 1}`}
                  variants={menuItemVariants}
                >
                  <Icon size={32} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
