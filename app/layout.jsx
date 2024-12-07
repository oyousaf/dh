import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

import "@/styles/globals.css";

export const metadata = {
  title:
    "Drainage Hero | Professional Drain Repair & Installation in West Yorkshire",
  description:
    "Expert drainage services in Horbury, Wakefield, and surrounding areas. Specialising in drain repair, installation, clearance, and emergency drainage solutions.",
  keywords: [
    "Drainage Hero",
    "drainage services",
    "drain repair",
    "drain installation",
    "drain clearance",
    "emergency drain repair",
    "Horbury",
    "Wakefield",
    "blocked drains",
    "drain unblocking",
    "professional drainage solutions",
  ].join(", "),
  icons: {
    icon: "/favicon.ico",
  },
  canonicalUrl: "https://drainagehero.uk",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Plumber",
  name: "Drainage Hero",
  description:
    "Professional drainage services including repair, installation, and clearance in Horbury, Wakefield, and nearby areas.",
  url: metadata.canonicalUrl,
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
  sameAs: ["https://www.facebook.com/people/Drainage-Hero/100091557146560/"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-gb">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <link rel="icon" href={metadata.icons.icon} />
        <link rel="canonical" href={metadata.canonicalUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
