// GA4 tracking ID
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID!;

// --- Generic helpers ---

// ✅ Track pageviews (GA4)
export const pageview = (url: string): void => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// ✅ Generic GA4 custom events
type GAEventParams = Record<string, string | number | boolean | undefined>;

export const event = ({
  action,
  params = {},
}: {
  action: string;
  params?: GAEventParams;
}): void => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", action, params);
  }
};

// --- Google Ads conversions ---

// ✅ Contact Form Conversion
export const trackFormSubmit = () => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: "AW-17399690522/fhQiCOzcxYcbEJrq6OhA",
      value: 1.0,
      currency: "GBP",
    });
  }
};

// ✅ WhatsApp Click Conversion
export const trackWhatsAppClick = (url?: string) => {
  const callback = () => {
    if (typeof url !== "undefined") {
      window.location.href = url;
    }
  };

  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: "AW-17399690522/q0VoCOnIuYcbEJrq6OhA",
      value: 1.0,
      currency: "GBP",
      event_callback: callback,
    });
  }
};
