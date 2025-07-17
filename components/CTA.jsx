import { CTAContent } from "@/constants";

const CTA = () => {
  return (
    <section aria-labelledby="cta-heading" className="bg-primary py-16 px-6 text-white text-center">
      <h2 aria-labelledby="cta-heading" className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
        {CTAContent.title}
      </h2>
      <p className="mb-6 text-lg">{CTAContent.description}</p>
      <a
        href={CTAContent.buttonLink}
        className="bg-secondary relative z-10 text-white hover:text-gray py-3 px-8 rounded-lg text-lg font-semibold transition duration-300"
      >
        {CTAContent.buttonText}
      </a>
    </section>
  );
};

export default CTA;
