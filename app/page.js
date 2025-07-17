import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import CTA from "@/components/CTA";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import ScrollToTop from "@/components/ScrollToTop";
import Snow from "@/components/Snow";

export const metadata = {
  title: "Drainage Hero - Expert Drainage Services in West Yorkshire",
  description:
    "Reliable 24/7 drain repair, installation, and clearance in West Yorkshire. Contact Drainage Hero for fast, affordable drainage solutions.",
};

export default function Home() {
  return (
    <main aria-label="Homepage - Drainage Hero">
      {/* Hidden <h1> for SEO & Accessibility */}
      <h1 className="sr-only">
        Reliable Drain Repair, Installation & Clearance Services in West
        Yorkshire
      </h1>

      <Hero />

      <section aria-labelledby="about-heading">
        <About />
      </section>

      <section aria-labelledby="services-heading">
        <Services />
      </section>

      <section aria-labelledby="gallery-heading">
        <Gallery />
      </section>

      <section aria-labelledby="cta-heading">
        <CTA />
      </section>

      <section aria-labelledby="reviews-heading">
        <Reviews />
      </section>

      <section aria-labelledby="contact-heading">
        <Contact />
      </section>

      <ScrollToTop />
      <Snow />
    </main>
  );
}
