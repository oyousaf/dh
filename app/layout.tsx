import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import LenisProvider from "@/lib/LenisProvider";
import WhatsAppBubble from "@/components/WhatsappBubble";
import { Analytics } from "@vercel/analytics/next";
import { Inter, Geist_Mono } from "next/font/google";
import Script from "next/script";

// 🎨 Fonts (visual style from Legxcy)
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

// 🧭 ✅ Metadata & SEO from Drainage Hero
export const metadata: Metadata = {
  metadataBase: new URL("https://drainagehero.uk"),
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
  ],
  alternates: { canonical: "https://drainagehero.uk" },
  openGraph: {
    title:
      "Drainage Hero - Drain Repair, Installation & Clearance in West Yorkshire",
    description:
      "Drainage Hero provides expert drainage services in Horbury, Wakefield, and surrounding areas. Contact us for professional solutions.",
    url: "https://drainagehero.uk",
    siteName: "Drainage Hero",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Drainage Hero van parked on site",
      },
    ],
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
  icons: { icon: [{ url: "/favicon.ico" }] },
};

// 🌐 Viewport (visual consistency)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0f2f23",
};

// 🧱 Structured Data (no address, for clean SEO)
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Plumber",
  name: "Drainage Hero",
  description:
    "Professional drainage services including repair, installation, and clearance in West Yorkshire.",
  url: "https://drainagehero.uk",
  logo: "/favicon.ico",
  image: "/hero-bg.jpg",
  telephone: "+447722128784",
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
};

// 🧩 ✅ Root Layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className="scroll-smooth antialiased">
      <head>
        {/* Inject structured data for local SEO */}
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>

      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        <LenisProvider>
          <Navbar />
          <ScrollToTop />
          <WhatsAppBubble />

          <main className="pt-20 min-h-screen" aria-label="Main Content">
            {children}
          </main>

          <Footer />
        </LenisProvider>

        <Analytics />
      </body>
    </html>
  );
}
