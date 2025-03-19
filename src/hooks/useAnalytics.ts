import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import analyticsService from '../utils/Analytics/analytics';

export const usePageViewTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    analyticsService.trackPageView({
      path: location.pathname + location.search,
      search: location.search,
      title: document.title
    });
  }, [location.pathname, location.search]);
};

export const useScrollTracking = (threshold = 90) => {
  const tracked = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (tracked.current) return;

      const scrollPosition = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100;

      if (scrollPercentage >= threshold) {
        analyticsService.trackScrollEvent({
          pageTitle: document.title,
          value: Math.round(scrollPercentage)
        });
        tracked.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  // Reset the tracked state when route changes
  const location = useLocation();
  useEffect(() => {
    tracked.current = false;
  }, [location.pathname]);
};

export const useOutboundClickTracking = () => {
  useEffect(() => {
    const handleLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a') as HTMLAnchorElement;

      if (!link) return;

      const href = link.href;
      const isExternal = link.hostname !== window.location.hostname;

      if (isExternal && href) {
        analyticsService.trackOutboundClick({
          url: href,
          target: link.target
        });
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, []);
};

// Hook to detect search queries in URL
export const useSearchTracking = () => {
  const location = useLocation();
  const processed = useRef(false);

  useEffect(() => {
    // Reset when URL changes
    processed.current = false;
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (processed.current) return;

    const urlParams = new URLSearchParams(location.search);
    // Adjust these keys based on your search implementation
    const searchKeys = ['q', 'query', 'search', 's'];

    for (const key of searchKeys) {
      const searchTerm = urlParams.get(key);
      if (searchTerm) {
        analyticsService.trackSearchEvent({ searchTerm });
        processed.current = true;
        break;
      }
    }
  }, [location.search]);
};

export default {
  usePageViewTracking,
  useScrollTracking,
  useOutboundClickTracking,
  useSearchTracking,
  trackFormEvent: analyticsService.trackFormEvent,
  trackVideoEvent: analyticsService.trackVideoEvent
}; 