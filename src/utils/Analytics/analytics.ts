import ReactGA from "react-ga4";

// Types for different events
type PageViewParams = {
  path: string;
  title?: string;
  search?: string;
};

type ScrollEventParams = {
  pageTitle: string;
  value?: number;
};

type OutboundClickParams = {
  url: string;
  target?: string;
  category?: string;
};

type SearchEventParams = {
  searchTerm: string;
  category?: string;
};

type FormEventParams = {
  formName: string;
  formId?: string;
  formStep?: string;
  action: 'start' | 'complete' | 'error' | 'step';
};

type VideoEventParams = {
  videoTitle: string;
  videoUrl: string;
  action: 'play' | 'pause' | 'progress' | 'complete';
  progress?: number;
};

// Analytics service
const analyticsService = {
  /**
   * Track page views when route changes or when history state changes
   */
  trackPageView: ({ path, title, search }: PageViewParams) => {
    ReactGA.send({
      hitType: "pageview",
      page: path,
      title: title,
      ...(search && { search: search })
    });

    // Log in development for debugging
    if (import.meta.env.DEV) {
      console.log(`[GA] Page View: ${path}`);
    }
  },

  /**
   * Track scroll events when user reaches bottom of page
   */
  trackScrollEvent: ({ pageTitle, value }: ScrollEventParams) => {
    ReactGA.event({
      category: 'Scroll',
      action: 'scroll_to_bottom',
      label: pageTitle,
      ...(value !== undefined && { value })
    });

    if (import.meta.env.DEV) {
      console.log(`[GA] Scroll to bottom: ${pageTitle}`);
    }
  },

  /**
   * Track outbound clicks when user clicks links to external domains
   */
  trackOutboundClick: ({ url, target, category = 'Outbound Link' }: OutboundClickParams) => {
    ReactGA.event({
      category,
      action: 'click',
      label: url,
      transport: 'beacon', // Use beacon to ensure event is sent even if page unloads
      ...(target && { nonInteraction: target === '_blank' ? false : true })
    });

    if (import.meta.env.DEV) {
      console.log(`[GA] Outbound click: ${url}`);
    }
  },

  /**
   * Track search events when user performs searches
   */
  trackSearchEvent: ({ searchTerm, category = 'Site Search' }: SearchEventParams) => {
    ReactGA.event({
      category,
      action: 'search',
      label: searchTerm
    });

    if (import.meta.env.DEV) {
      console.log(`[GA] Search: ${searchTerm}`);
    }
  },

  /**
   * Track form interactions when users interact with forms
   */
  trackFormEvent: ({ formName, formId, formStep, action }: FormEventParams) => {
    ReactGA.event({
      category: 'Form',
      action: `form_${action}`,
      label: formName,
      ...(formId && { formId }),
      ...(formStep && { formStep })
    });

    if (import.meta.env.DEV) {
      console.log(`[GA] Form ${action}: ${formName}`);
    }
  },

  /**
   * Track video events for embedded videos
   */
  trackVideoEvent: ({ videoTitle, action, progress }: VideoEventParams) => {
    ReactGA.event({
      category: 'Video', 
      action: `video_${action}`,
      label: videoTitle,
      nonInteraction: action === 'play' ? false : true,
      ...(progress !== undefined && { value: Math.round(progress) })
    });

    if (import.meta.env.DEV) {
      console.log(`[GA] Video ${action}: ${videoTitle} ${progress ? `(${progress}%)` : ''}`);
    }
  }
};

export default analyticsService;