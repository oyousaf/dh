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
    <section
      id="contact"
      className="py-12 text-primary px-6 sm:px-16 lg:px-32"
    >
      <h2 className="text-3xl font-bold text-white text-center mb-8">
        Get in Touch
      </h2>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 bg-primary p-8 rounded-lg shadow-md"
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
              <p className="mt-1 text-red-300 text-sm">{errors.name.message}</p>
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
              <p className="mt-1 text-red-300 text-sm">
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
              <p className="mt-1 text-red-300 text-sm">
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
              <p className="mt-1 text-red-300 text-sm">
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
              <p className="mt-1 text-red-300 text-sm">
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
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
          {isSuccess && (
            <p className="mt-4 text-green-500 text-center">
              Message sent successfully!
            </p>
          )}
          {error && <p className="mt-4 text-red-300 text-center">{error}</p>}
        </form>
      </motion.div>
      <Toaster />
    </section>
  );
}
