"use client";

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, socialLinks } from "@/constants";
import Image from "next/image";

const variants = {
  mobileMenu: {
    hidden: { x: "100%" },
    visible: { x: 0, transition: { duration: 0.4, ease: "easeInOut" } },
    exit: { x: "100%", transition: { duration: 0.3, ease: "easeInOut" } },
  },
  menuItem: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  },
  socialIcon: {
    hover: {
      scale: 1.2,
      rotate: -5,
      transition: { type: "spring", stiffness: 200, damping: 10 },
    },
  },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (sectionId) => {
    const targetSection = document.getElementById(sectionId);
    targetSection?.scrollIntoView({ behavior: "smooth", block: "start" });
    closeMenu();
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? "auto" : "hidden";
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  const renderSocialIcons = (iconSize) =>
    socialLinks.map(({ href, icon: Icon }, index) => (
      <motion.a
        key={index}
        href={href}
        target="_blank"
        rel="noreferrer"
        className="text-primary hover:text-secondary"
        aria-label={`Social media link ${index + 1}`}
        whileHover="hover"
        variants={variants.socialIcon}
      >
        <Icon size={iconSize} />
      </motion.a>
    ));

  return (
    <nav className="fixed top-0 w-full bg-black text-primary shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <button
          onClick={() => handleScroll("home")}
          aria-label="Scroll to the hero section at the top of the page"
          className="p-2 focus:outline-none"
        >
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={200}
            height={50}
            priority
            className="md:w-auto h-auto w-1/2"
          />
        </button>

        {/* Hamburger Icon */}
        <button
          aria-label="Toggle menu"
          onClick={toggleMenu}
          className="md:hidden"
        >
          {isOpen ? <FaTimes size={40} /> : <FaBars size={40} />}
        </button>

        {/* Desktop Navbar Links */}
        <ul className="hidden md:flex space-x-6">
          {navLinks.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => handleScroll(id)}
                className="text-lg hover:text-secondary transition-all duration-300 ease-in-out"
                aria-label={`Navigate to ${label}`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop Social Media Icons */}
        <div className="hidden md:flex space-x-4">{renderSocialIcons(30)}</div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants.mobileMenu}
            className="fixed top-0 left-0 w-full h-screen bg-black text-beige flex flex-col z-50"
          >
            {/* Close Button */}
            <button
              onClick={toggleMenu}
              aria-label="Close menu"
              className="absolute top-8 right-5"
            >
              <FaTimes size={40} />
            </button>

            {/* Navbar Links */}
            <motion.ul className="flex flex-col items-center justify-center flex-grow space-y-8">
              {navLinks.map(({ id, label }) => (
                <motion.li key={id} variants={variants.menuItem}>
                  <button
                    onClick={() => handleScroll(id)}
                    className="text-2xl font-bold uppercase mt-3 hover:text-secondary transition-all duration-300 ease-in-out"
                    aria-label={`Navigate to ${label}`}
                  >
                    {label}
                  </button>
                </motion.li>
              ))}
            </motion.ul>

            {/* Mobile Social Media Icons */}
            <motion.div
              className="w-full flex justify-center space-x-6 mb-20"
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {renderSocialIcons(32)}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
