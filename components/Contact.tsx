"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { trackFormSubmit } from "@/lib/gtag";

type ContactFormData = {
  name: string;
  email: string;
  message: string;
  website?: string; // honeypot
};

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>();

  const [sent, setSent] = useState(false);

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    if (data.website) return; // honeypot

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send message");

      trackFormSubmit();
      toast.success("Message sent successfully!");
      setSent(true);
      reset();
      setTimeout(() => setSent(false), 3000);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-[60vh] px-6 sm:px-12 py-24 text-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--mossy-bg)]/95 via-[var(--mossy-bg)]/85 to-[var(--dark-mint)]/95 -z-10" />

      <motion.h2
        id="contact-heading"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-[var(--accent-green)] to-teal-200 bg-clip-text text-transparent leading-[1.2]"
      >
        Let’s Build Something Remarkable
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
        className="text-lg max-w-2xl mx-auto mb-10 text-[var(--foreground)]"
      >
        Whether you’re ready to launch a project or simply exploring ideas, we’d
        love to hear from you.
      </motion.p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl mx-auto grid gap-4 text-left"
        aria-label="Contact Form"
      >
        {/* Honeypot */}
        <input
          type="text"
          id="website"
          {...register("website")}
          autoComplete="off"
          tabIndex={-1}
          style={{ display: "none" }}
          aria-hidden="true"
        />

        {/* Name */}
        <motion.div>
          <label htmlFor="name" className="sr-only">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: true })}
            autoComplete="name"
            placeholder="Your Name"
            className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/10 placeholder-[var(--accent-green)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-green)]"
          />
          {errors.name && (
            <span className="text-red-400 text-sm">Name is required</span>
          )}
        </motion.div>

        {/* Email */}
        <motion.div>
          <label htmlFor="email" className="sr-only">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: true })}
            autoComplete="email"
            placeholder="Your Email"
            className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/10 placeholder-[var(--accent-green)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-green)]"
          />
          {errors.email && (
            <span className="text-red-400 text-sm">
              Valid email is required
            </span>
          )}
        </motion.div>

        {/* Message */}
        <motion.div>
          <label htmlFor="message" className="sr-only">
            Your Message
          </label>
          <textarea
            id="message"
            {...register("message", { required: true })}
            rows={5}
            placeholder="Your Message"
            className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/10 text-white placeholder-[var(--accent-green)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-green)] resize-none"
          />
          {errors.message && (
            <span className="text-red-400 text-sm">Message is required</span>
          )}
        </motion.div>

        {/* Submit button */}
        <motion.button
          type="submit"
          disabled={isSubmitting || sent}
          whileTap={{ scale: 0.97 }}
          className="w-full mt-2 px-6 py-3 text-white bg-[var(--dark-mint)] cursor-pointer rounded-md font-semibold shadow-md transition focus:outline-none focus:ring-2 focus:ring-[var(--accent-green)] focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? "Sending..." : sent ? "Sent!" : "Send Message"}
        </motion.button>
      </form>
    </section>
  );
}
