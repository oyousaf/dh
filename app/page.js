import Hero from '@/components/Hero';
import Services from '@/components/Services';
import CTA from '@/components/CTA';
import ScrollToTop from '@/components/ScrollToTop';
import Snow from '@/components/Snow';
import About from '@/components/About';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';

export default function HomePage() {
  return (
    <div >
      <Hero />
      <About />
      <Services />
      <Gallery />
      <CTA />
      <Contact />
      <ScrollToTop />
      <Snow />
    </div>
  );
}
