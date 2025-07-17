import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import "@/styles/globals.css";

export const metadata = {
  title:
    "Drainage Hero - Drain Repair, Installation & Clearance in West Yorkshire",
  description:
    "Need reliable drainage services in West Yorkshire? Contact Drainage Hero for expert drain repairs, installation, and unblocking. Available 24/7!",
  keywords: [
    "Drainage Hero",
    "Drain Hero",
    "drainage services",
    "drain repair West Yorkshire",
    "drain installation West Yorkshire",
    "blocked drains Wakefield",
    "emergency drain repair",
    "professional drainage solutions",
    "affordable drain repair West Yorkshire",
    "licensed drainage specialists Wakefield",
  ].join(", "),
  metadataBase: new URL("https://drainagehero.uk"),
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: "https://drainagehero.uk",
  },
  openGraph: {
    title:
      "Drainage Hero - Drain Repair, Installation & Clearance in West Yorkshire",
    description:
      "Drainage Hero provides expert drainage services in Horbury, Wakefield, and surrounding areas. Contact us for professional solutions.",
    url: "https://drainagehero.uk",
    images: [
      {
        url: "/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Drainage Hero van parked on site",
      },
    ],
    siteName: "Drainage Hero",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@drainagehero",
    title:
      "Drainage Hero - Drain Repair, Installation & Clearance in West Yorkshire",
    description:
      "Drainage Hero provides expert drainage services in West Yorkshire. Contact us for professional solutions.",
    images: ["/hero-bg.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const structuredData = (pageUrl) => ({
  "@context": "https://schema.org",
  "@type": "Plumber",
  name: "Drainage Hero",
  description:
    "Professional drainage services including repair, installation, and clearance in West Yorkshire",
  url: pageUrl || metadata.alternates.canonical,
  logo: "/favicon.ico",
  image: "/hero-bg.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Hawkingcroft Rd",
    addressLocality: "Horbury",
    addressRegion: "West Yorkshire",
    postalCode: "WF4 6AH",
    addressCountry: "UK",
  },
  telephone: "+447722128784",
  geo: {
    "@type": "GeoCoordinates",
    latitude: "53.659144472588565",
    longitude: "-1.5673813076082264",
  },
  openingHours: "Mo-Su 00:00-23:59",
  areaServed: [
    "Horbury",
    "Wakefield",
    "Leeds",
    "Huddersfield",
    "Pontefract",
    "Castleford",
    "Dewsbury",
    "Ossett",
    "Batley",
    "Morley",
    "Halifax",
    "Brighouse",
    "Elland",
    "Cleckheaton",
    "Heckmondwike",
    "Mirfield",
    "Normanton",
    "Knottingley",
    "Sowerby Bridge",
    "West Yorkshire",
  ],
  service: [
    {
      "@type": "Service",
      name: "Drain Repair",
      description:
        "Comprehensive repair services for blocked and damaged drains.",
    },
    {
      "@type": "Service",
      name: "Drain Installation",
      description:
        "Professional installation services for new drainage systems.",
    },
    {
      "@type": "Service",
      name: "Emergency Drainage Solutions",
      description: "24/7 emergency drain unblocking and clearance services.",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "9",
  },
  sameAs: ["https://www.facebook.com/people/Drainage-Hero/100091557146560/"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB" className="scroll-smooth antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              structuredData(metadata.alternates.canonical)
            ),
          }}
        />
      </head>
      <body>
        <header>
          <Navbar />
        </header>
        <main aria-label="Drainage Hero Main Content" className="min-h-screen">
          {children}
        </main>
        <footer>
          <Footer />
        </footer>
        <ScrollToTop />
      </body>
    </html>
  );
}
