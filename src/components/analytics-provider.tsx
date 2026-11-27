"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "@/lib/analytics";

function AnalyticsRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams?.toString();
    const fullPath = query ? `${pathname}?${query}` : pathname;
    trackPageView(fullPath);
  }, [pathname, searchParams]);

  return null;
}

/**
 * Tracks App Router page views automatically on route and query changes.
 */
export function AnalyticsProvider() {
  return (
    <Suspense fallback={null}>
      <AnalyticsRouteTracker />
    </Suspense>
  );
}
