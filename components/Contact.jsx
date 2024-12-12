"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast, { Toaster } from "react-hot-toast";

// Zod schema for form validation
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(
      /^(?:\+44|0)\d{10}$/,
      "Invalid phone number. It should start with '+44' or '0' followed by 10 digits."
    )
    .optional(),
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters")
    .max(100, "Subject must be less than 100 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must be less than 500 characters"),
});

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = (formData) => {
    setIsSubmitting(true);

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        formData,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID
      )
      .then(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        reset();
        toast.success("Message sent successfully!");
      })
      .catch((err) => {
        setIsSubmitting(false);
        setError("Something went wrong. Please try again.");
        console.error(err);
        toast.error("Failed to send message. Please try again.");
      });
  };

  return (
    <section id="contact" className="py-12 text-primary px-6 sm:px-16 lg:px-32">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
        Get in Touch
      </h2>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <div className="p-8 rounded-lg shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2364.323787902747!2d-1.569952888188767!3d53.659028572266436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48796128782f3481%3A0xd8dcafdfa0e8ae49!2sDrainage%20hero!5e0!3m2!1sen!2suk!4v1734016167343!5m2!1sen!2suk"
            width="100%"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            title="Google Map"
            className="rounded-md"
          ></iframe>
        </div>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 bg-primary p-8 rounded-lg shadow-md"
            aria-label="Contact Form"
          >
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                {...register("name")}
                placeholder="Name"
                className="w-full p-4 text-primary rounded-lg"
                autoComplete="name"
              />
              {errors.name && (
                <p className="mt-1 text-red-300 text-sm" role="alert">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                {...register("email")}
                placeholder="Email"
                className="w-full p-4 text-primary rounded-lg"
                autoComplete="email"
              />
              {errors.email && (
                <p className="mt-1 text-red-300 text-sm" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="phone" className="sr-only">
                Phone
              </label>
              <input
                id="phone"
                {...register("phone")}
                placeholder="Contact number"
                className="w-full p-4 text-primary rounded-lg"
                autoComplete="tel"
              />
              {errors.phone && (
                <p className="mt-1 text-red-300 text-sm" role="alert">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="subject" className="sr-only">
                Subject
              </label>
              <input
                id="subject"
                {...register("subject")}
                placeholder="Subject"
                className="w-full p-4 text-primary rounded-lg"
                autoComplete="off"
              />
              {errors.subject && (
                <p className="mt-1 text-red-300 text-sm" role="alert">
                  {errors.subject.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                {...register("message")}
                placeholder="Message"
                rows="5"
                className="w-full p-4 text-primary rounded-lg"
                autoComplete="off"
              ></textarea>
              {errors.message && (
                <p className="mt-1 text-red-300 text-sm" role="alert">
                  {errors.message.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className={`w-full py-3 px-6 font-bold bg-gray text-secondary hover:text-white rounded-lg shadow-md hover:bg-opacity-90 transition ${
                isSubmitting && "opacity-50 cursor-not-allowed"
              }`}
              disabled={isSubmitting}
              aria-busy={isSubmitting ? "true" : "false"}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
            {isSuccess && (
              <p className="mt-4 text-green-500 text-center" aria-live="polite">
                Message sent successfully!
              </p>
            )}
            {error && (
              <p
                className="mt-4 text-red-300 text-center"
                aria-live="assertive"
              >
                {error}
              </p>
            )}
          </form>
        </div>
      </motion.div>
      <Toaster />
    </section>
  );
}
