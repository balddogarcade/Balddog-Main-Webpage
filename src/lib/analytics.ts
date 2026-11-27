import {
  getAnalytics,
  isSupported,
  logEvent,
  type Analytics,
} from "firebase/analytics";
import { getFirebaseApp } from "./firebase";
import { sanitizeAnalyticsParams, type AnalyticsParams } from "./analytics-utils";

export { sanitizeAnalyticsParams, type AnalyticsParams };

let analyticsInstance: Analytics | null = null;
let analyticsInitPromise: Promise<Analytics | null> | null = null;

/**
 * Lazily resolves the Firebase Analytics instance on supported browser environments.
 */
export async function getFirebaseAnalytics(): Promise<Analytics | null> {
  if (typeof window === "undefined") {
    return null;
  }

  if (analyticsInstance) {
    return analyticsInstance;
  }

  if (!analyticsInitPromise) {
    analyticsInitPromise = (async () => {
      try {
        const app = getFirebaseApp();
        if (!app) return null;

        const supported = await isSupported();
        if (!supported) return null;

        analyticsInstance = getAnalytics(app);
        return analyticsInstance;
      } catch {
        return null;
      }
    })();
  }

  return analyticsInitPromise;
}

/**
 * Logs a custom or recommended event to Firebase Analytics.
 * Safe to call in SSR or when Firebase is not configured.
 */
export function trackEvent(eventName: string, params?: AnalyticsParams): void {
  if (typeof window === "undefined") return;

  const sanitized = sanitizeAnalyticsParams(params);

  void getFirebaseAnalytics().then((analytics) => {
    if (!analytics) return;
    logEvent(analytics, eventName, sanitized);
  });
}

export function trackPageView(pagePath: string, pageTitle?: string): void {
  trackEvent("page_view", {
    page_path: pagePath,
    page_title: pageTitle ?? (typeof document !== "undefined" ? document.title : undefined),
    page_location: typeof window !== "undefined" ? window.location.href : undefined,
  });
}

export function trackNavigation(
  destination: string,
  source: string,
  label?: string,
  external = false
): void {
  trackEvent("navigation_click", {
    destination,
    source,
    label,
    external,
  });
}

export function trackDownload(
  assetName: string,
  source: string,
  url?: string
): void {
  trackEvent("apk_download_click", {
    asset_name: assetName,
    source,
    url,
  });
}

export function trackModal(
  modalName: string,
  action: "open" | "close",
  context?: string
): void {
  trackEvent("modal_interaction", {
    modal_name: modalName,
    action,
    context,
  });
}

export function trackFilter(
  filterType: string,
  value: string,
  source: string
): void {
  trackEvent("filter_change", {
    filter_type: filterType,
    value,
    source,
  });
}

export function trackShare(
  contentType: string,
  itemId: string,
  method: string
): void {
  trackEvent("share", {
    content_type: contentType,
    item_id: itemId,
    method,
  });
}
