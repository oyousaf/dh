import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <>
      <Toaster richColors position="top-center" />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Contact />
    </>
  );
}
