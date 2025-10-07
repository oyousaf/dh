export type PerfNumber = number | "N/A";
export type PerformanceScore =
  | { mobile: PerfNumber; desktop: PerfNumber }
  | "N/A";

export type SiteData = {
  id: string;
  name: string;
  url: string | null;
  phone?: string | null;
  hasWebsite: boolean;
  profileLink?: string | null;
  performanceScore: PerformanceScore;
  priorityScore: number;
};

export type FilterType = "all" | "noWebsite" | "contacted" | "notContacted";

export type ComposeTo = {
  email: string;
  name: string;
  business?: string;
  website?: string;
  contactKey: string;
} | null;

export type ContactedMap = Record<string, boolean>;

export interface AnalyticsWindow extends Window {
  gtag?: (
    cmd: "event",
    eventName: string,
    params?: Record<string, unknown>
  ) => void;
}
