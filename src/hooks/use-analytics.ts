"use client";

import { useCallback } from "react";
import {
  trackDownload,
  trackEvent,
  trackFilter,
  trackModal,
  trackNavigation,
  trackShare,
  type AnalyticsParams,
} from "@/lib/analytics";

/**
 * Convenience hook for client components to log Firebase Analytics events.
 */
export function useAnalytics() {
  const event = useCallback((name: string, params?: AnalyticsParams) => {
    trackEvent(name, params);
  }, []);

  const navigation = useCallback(
    (destination: string, source: string, label?: string, external = false) => {
      trackNavigation(destination, source, label, external);
    },
    []
  );

  const download = useCallback(
    (assetName: string, source: string, url?: string) => {
      trackDownload(assetName, source, url);
    },
    []
  );

  const modal = useCallback(
    (modalName: string, action: "open" | "close", context?: string) => {
      trackModal(modalName, action, context);
    },
    []
  );

  const filter = useCallback(
    (filterType: string, value: string, source: string) => {
      trackFilter(filterType, value, source);
    },
    []
  );

  const share = useCallback(
    (contentType: string, itemId: string, method: string) => {
      trackShare(contentType, itemId, method);
    },
    []
  );

  return { event, navigation, download, modal, filter, share };
}
