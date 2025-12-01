import { useCallback, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";

interface TrackEventOptions {
  eventType: string;
  eventData?: Record<string, any>;
  page?: string;
}

export function useAnalytics() {
  const [location] = useLocation();
  const lastTrackedPage = useRef<string>("");

  const trackEvent = useCallback(async (options: TrackEventOptions) => {
    try {
      await apiRequest("POST", "/api/analytics/track", {
        eventType: options.eventType,
        eventData: options.eventData || {},
        page: options.page || location,
      });
    } catch (error) {
      console.debug("Analytics tracking failed:", error);
    }
  }, [location]);

  const trackPageView = useCallback(async (page?: string) => {
    const pageToTrack = page || location;
    
    if (lastTrackedPage.current === pageToTrack) {
      return;
    }
    
    lastTrackedPage.current = pageToTrack;

    try {
      await apiRequest("POST", "/api/analytics/track", {
        eventType: "page_view",
        eventData: { path: pageToTrack },
        page: pageToTrack,
      });
    } catch (error) {
      console.debug("Page view tracking failed:", error);
    }
  }, [location]);

  useEffect(() => {
    trackPageView();
  }, [location, trackPageView]);

  return {
    trackEvent,
    trackPageView,
  };
}
