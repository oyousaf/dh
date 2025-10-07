"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";
import Lenis from "lenis";

type NavLink = {
  name: string;
  id: string;
};

const navLinks: NavLink[] = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Services", id: "services" },
  { name: "Projects", id: "projects" },
  { name: "Contact", id: "contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  // Stop body scroll when menu is open
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const lenis = window.lenis;

    if (menuOpen) {
      html.classList.add("overflow-hidden");
      body.classList.add("overflow-hidden");
      lenis?.stop?.();
    } else {
      html.classList.remove("overflow-hidden");
      body.classList.remove("overflow-hidden");
      lenis?.start?.();
    }

    return () => {
      html.classList.remove("overflow-hidden");
      body.classList.remove("overflow-hidden");
      window.lenis?.start?.();
    };
  }, [menuOpen]);

  // Grab Lenis instance from global
  useEffect(() => {
    if (typeof window !== "undefined" && window.lenis) {
      setLenisInstance(window.lenis);
    }
  }, []);

  const handleScroll = (id: string) => {
    const target = document.getElementById(id);
    if (target && lenisInstance) {
      lenisInstance.scrollTo(target);
    } else if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }

    setMenuOpen(false);
    window.history.pushState(null, "", window.location.pathname);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-[99] backdrop-blur-md border-b border-white/10"
      style={{ backgroundColor: "rgba(15, 47, 35, 0.85)" }}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 py-4">
        <button
          onClick={() => handleScroll("home")}
          className="flex items-center gap-2"
          aria-label="Go to Home"
        >
          <Image
            src="/logo.webp"
            alt="Legxcy Logo"
            width={40}
            height={40}
            priority
          />
          <span className="text-lg font-semibold text-white">
            Legxcy Solutions
          </span>
        </button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-6 text-white text-sm font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
              <button
                onClick={() => handleScroll(link.id)}
                className="hover:text-[var(--accent-green)] transition-colors cursor-pointer"
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <div className="md:hidden text-white z-[100] relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="blur-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[90] backdrop-blur-xl bg-black/60 saturate-150"
              onClick={() => setMenuOpen(false)}
              style={{ boxShadow: "inset 0 0 80px rgba(0, 0, 0, 0.7)" }}
            />

            <motion.div
              key="mobile-nav"
              initial={{ opacity: 0, x: "100%", scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: "100%", scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="md:hidden fixed top-0 left-0 w-full h-screen z-[95] bg-[#0F2F23]/95 backdrop-blur-2xl px-6 py-20 flex flex-col items-center justify-center space-y-8 text-white shadow-xl"
            >
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.name}
                  onClick={() => handleScroll(link.id)}
                  className="text-2xl font-medium hover:text-[var(--accent-green)] transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {link.name}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
