import type Lenis from "@studio-freight/lenis";

declare global {
  interface Window {
    lenis?: InstanceType<typeof Lenis>;
    gtag?: (...args: any[]) => void;
    dataLayer?: Record<string, any>[];
  }
}

export {};
