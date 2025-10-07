import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import { Toaster } from "sonner";

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
      <Toaster richColors position="top-center" />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Contact />
    </main>
  );
}
