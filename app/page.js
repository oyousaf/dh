import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Gallery from '@/components/Gallery';
import CTA from '@/components/CTA';
import Reviews from '@/components/Reviews';
import Contact from '@/components/Contact';
import ScrollToTop from '@/components/ScrollToTop';
import Snow from '@/components/Snow';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Gallery />
      <CTA />
      <Reviews />
      <Contact />
      <ScrollToTop />
      <Snow />
    </>
  );
}
