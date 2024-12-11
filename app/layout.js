import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import "@/styles/globals.css";

export const metadata = {
  title:
    "Drainage Hero - Professional Drain Repair & Installation in West Yorkshire",
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
  metadataBase: new URL("https://drainagehero.uk"),
  icons: {
    icon: "/favicon.ico",
  },
  canonical: "https://drainagehero.uk",
  openGraph: {
    title:
      "Drainage Hero | Professional Drain Repair & Installation in West Yorkshire",
    description:
      "Drainage Hero provides expert drainage services in Horbury, Wakefield, and surrounding areas.",
    url: "https://drainagehero.uk",
    images: ["/hero-bg.jpg"],
    site_name: "Drainage Hero",
  },
  twitter: {
    card: "summary_large_image",
    site: "@drainagehero",
    title:
      "Drainage Hero | Professional Drain Repair & Installation in West Yorkshire",
    description:
      "Drainage Hero provides expert drainage services in Horbury, Wakefield, and surrounding areas.",
    image: "/hero-bg.jpg",
  },
};

export const structuredData = (pageUrl) => ({
  "@context": "https://schema.org",
  "@type": "Plumber",
  name: "Drainage Hero",
  description:
    "Professional drainage services including repair, installation, and clearance in Horbury, Wakefield, and nearby areas.",
  url: pageUrl || metadata.canonical,
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
  sameAs: ["https://www.facebook.com/people/Drainage-Hero/100091557146560/"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en-gb">
      <head>
        <meta name="keywords" content={metadata.keywords} />
        <link rel="canonical" href={metadata.canonical} />

        <meta property="og:title" content={metadata.openGraph.title} />
        <meta
          property="og:description"
          content={metadata.openGraph.description}
        />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:image" content={metadata.openGraph.images[0]} />
        <meta property="og:site_name" content={metadata.openGraph.site_name} />

        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:site" content={metadata.twitter.site} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta
          name="twitter:description"
          content={metadata.twitter.description}
        />
        <meta name="twitter:image" content={metadata.twitter.image} />

        <script type="application/ld+json" data-scope="jsonld">
          {JSON.stringify(structuredData(metadata.canonical))}
        </script>
      </head>
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
