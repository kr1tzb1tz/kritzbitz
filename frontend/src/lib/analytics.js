/**
 * Analytics tracking library for KritzBitz website
 * Tracks page views, user sessions, and visitor analytics
 */

class AnalyticsTracker {
  constructor() {
    // Build API base URL from environment variables
    // Next.js only exposes env vars prefixed with NEXT_PUBLIC_ to the client
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiPort = process.env.NEXT_PUBLIC_API_PORT || '1111';
    const apiPrefix = process.env.NEXT_PUBLIC_API_PREFIX || '/api/v1';
    console.log('API URL:', apiUrl);
    console.log('API Port:', apiPort);
    console.log('API Prefix:', apiPrefix);
    
    if (typeof window !== 'undefined') {
      // Browser environment - build URL from current context
      const protocol = window.location.protocol;
      const hostname = window.location.hostname;
      
      if (apiUrl) {
        // If full API URL is provided, use it and append prefix
        try {
          const url = new URL(apiUrl);
          // Ensure prefix doesn't start with / if URL already ends with /
          const prefix = apiPrefix.startsWith('/') ? apiPrefix : `/${apiPrefix}`;
          this.apiBaseUrl = `${url.origin}${prefix}`;
        } catch (e) {
          // If URL parsing fails, construct from hostname and port
          const prefix = apiPrefix.startsWith('/') ? apiPrefix : `/${apiPrefix}`;
          this.apiBaseUrl = `${protocol}//${hostname}:${apiPort}${prefix}`;
        }
      } else {
        // Fallback: construct from current hostname and configured port/prefix
        const prefix = apiPrefix.startsWith('/') ? apiPrefix : `/${apiPrefix}`;
        this.apiBaseUrl = `${protocol}//${hostname}:${apiPort}${prefix}`;
      }
    } else {
      // SSR environment - use environment variables directly
      if (apiUrl) {
        const prefix = apiPrefix.startsWith('/') ? apiPrefix : `/${apiPrefix}`;
        this.apiBaseUrl = `${apiUrl}${prefix}`;
      } else {
        const prefix = apiPrefix.startsWith('/') ? apiPrefix : `/${apiPrefix}`;
        this.apiBaseUrl = `http://localhost:${apiPort}${prefix}`;
      }
    }
    
    // Don't initialize session ID or tracking during SSR
    if (typeof window === 'undefined') {
      this.sessionId = null;
      this.isTrackingEnabled = false;
    } else {
      this.sessionId = this.getOrCreateSessionId();
      this.isTrackingEnabled = this.shouldTrack();
    }
  }

  /**
   * Get or create a session ID from localStorage
   */
  getOrCreateSessionId() {
    // Check if we're in browser environment
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return this.generateSessionId();
    }
    
    let sessionId = localStorage.getItem('kritzbitz_session_id');
    if (!sessionId) {
      sessionId = this.generateSessionId();
      localStorage.setItem('kritzbitz_session_id', sessionId);
    }
    return sessionId;
  }

  /**
   * Generate a new session ID
   */
  generateSessionId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  /**
   * Check if tracking should be enabled
   */
  shouldTrack() {
    // Track in development by default for testing
    if (process.env.NODE_ENV === 'development') {
      return true;
    }

    // Check if we're in browser environment
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return false;
    }

    // Don't track if user has opted out
    if (localStorage.getItem('kritzbitz_analytics_opt_out') === 'true') {
      return false;
    }

    // Don't track bots or crawlers
    if (this.isBot()) {
      return false;
    }

    return true;
  }

  /**
   * Check if the current user agent is a bot
   */
  isBot() {
    // Check if we're in browser environment
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return false;
    }
    
    const userAgent = navigator.userAgent.toLowerCase();
    const botPatterns = [
      'bot', 'crawler', 'spider', 'scraper', 'curl', 'wget',
      'python', 'java', 'go-http', 'postman', 'insomnia',
      'googlebot', 'bingbot', 'slurp', 'duckduckbot'
    ];
    
    return botPatterns.some(pattern => userAgent.includes(pattern));
  }

  /**
   * Track a page view
   */
  async trackPageView(pagePath = null, pageTitle = null) {
    // Don't track during SSR
    if (typeof window === 'undefined' || !this.isTrackingEnabled) {
      console.log('Analytics tracking skipped:', { 
        isSSR: typeof window === 'undefined', 
        isTrackingEnabled: this.isTrackingEnabled 
      });
      return;
    }
    
    console.log('Analytics trackPageView called:', { pagePath, pageTitle });

    try {
      const currentPath = pagePath || window.location.pathname;
      const currentTitle = pageTitle || document.title;
      
      // Prevent duplicate tracking for the same page within 1 second (very short window)
      const now = Date.now();
      const pageKey = `kritzbitz_tracked_${currentPath}`;
      const lastTracked = localStorage.getItem(pageKey);
      
      if (lastTracked) {
        const timeDiff = now - parseInt(lastTracked);
        if (timeDiff < 1000) { // 1 second
          console.log('⚠️ Page view already tracked recently for:', currentPath, 'timeDiff:', timeDiff);
          return;
        }
      }
      
      // Store the tracking time
      localStorage.setItem(pageKey, now.toString());
      console.log('📊 Tracking page view:', { currentPath, currentTitle });

      const response = await fetch(`${this.apiBaseUrl}/analytics/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page_path: currentPath,
          page_title: currentTitle,
          session_id: this.sessionId
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Page view tracked successfully:', data);
        return data;
      } else {
        console.warn('❌ Failed to track page view:', response.status);
        const errorText = await response.text();
        console.warn('Error details:', errorText);
      }
    } catch (error) {
      console.warn('Error tracking page view:', error);
    }
  }

  /**
   * Track a custom event
   */
  async trackEvent(eventName, eventData = {}) {
    if (!this.isTrackingEnabled) {
      return;
    }

    try {
      const response = await fetch(`${this.apiBaseUrl}/analytics/event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_name: eventName,
          event_data: eventData,
          session_id: this.sessionId,
          page_path: window.location.pathname,
          page_title: document.title
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Event tracked:', eventName, data);
        return data;
      } else {
        console.warn('Failed to track event:', response.status);
      }
    } catch (error) {
      console.warn('Error tracking event:', error);
    }
  }

  /**
   * Track form submissions
   */
  async trackFormSubmission(formName, formData = {}) {
    return this.trackEvent('form_submission', {
      form_name: formName,
      form_data: formData
    });
  }

  /**
   * Track button clicks
   */
  async trackButtonClick(buttonName, buttonLocation) {
    return this.trackEvent('button_click', {
      button_name: buttonName,
      button_location: buttonLocation
    });
  }

  /**
   * Track external link clicks
   */
  async trackExternalLink(url, linkText) {
    return this.trackEvent('external_link_click', {
      url: url,
      link_text: linkText
    });
  }

  /**
   * Track scroll depth
   */
  trackScrollDepth() {
    if (!this.isTrackingEnabled) {
      return;
    }

    let maxScroll = 0;
    const trackScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        // Track milestone scroll depths
        if ([25, 50, 75, 90, 100].includes(scrollPercent)) {
          this.trackEvent('scroll_depth', {
            scroll_percent: scrollPercent,
            page_path: window.location.pathname
          });
        }
      }
    };

    window.addEventListener('scroll', trackScroll, { passive: true });
  }

  /**
   * Track time on page
   */
  trackTimeOnPage() {
    if (!this.isTrackingEnabled) {
      return;
    }

    const startTime = Date.now();
    
    const trackTime = () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000);
      
      // Track time milestones
      if ([30, 60, 120, 300, 600].includes(timeOnPage)) {
        this.trackEvent('time_on_page', {
          time_seconds: timeOnPage,
          page_path: window.location.pathname
        });
      }
    };

    // Track every 30 seconds
    setInterval(trackTime, 30000);
    
    // Track on page unload
    window.addEventListener('beforeunload', () => {
      const finalTime = Math.round((Date.now() - startTime) / 1000);
      this.trackEvent('page_exit', {
        time_seconds: finalTime,
        page_path: window.location.pathname
      });
    });
  }

  /**
   * Initialize analytics tracking
   */
  init() {
    if (!this.isTrackingEnabled) {
      return;
    }

    // Track initial page view
    this.trackPageView();

    // Set up scroll tracking
    this.trackScrollDepth();

    // Set up time tracking
    this.trackTimeOnPage();

      // Track navigation changes (for SPA)
      if (typeof window !== 'undefined' && window.history) {
        const originalPushState = window.history.pushState;
        const originalReplaceState = window.history.replaceState;

        window.history.pushState = (...args) => {
          originalPushState.apply(window.history, args);
          setTimeout(() => this.trackPageView(), 100);
        };

        window.history.replaceState = (...args) => {
          originalReplaceState.apply(window.history, args);
          setTimeout(() => this.trackPageView(), 100);
        };

        window.addEventListener('popstate', () => {
          setTimeout(() => this.trackPageView(), 100);
        });
      }

    console.log('Analytics tracking initialized');
    console.log('Tracking enabled:', this.isTrackingEnabled);
    console.log('Session ID:', this.sessionId);
    console.log('API Base URL:', this.apiBaseUrl);
    console.log('Environment:', process.env.NODE_ENV);
    console.log('User Agent:', navigator.userAgent);
    console.log('Is Bot:', this.isBot());
    
    // Force track initial page view
    console.log('🚀 Force tracking initial page view');
    this.trackPageView();
  }

  /**
   * Opt out of analytics tracking
   */
  optOut() {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem('kritzbitz_analytics_opt_out', 'true');
    }
    this.isTrackingEnabled = false;
    console.log('Analytics tracking disabled');
  }

  /**
   * Opt in to analytics tracking
   */
  optIn() {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.removeItem('kritzbitz_analytics_opt_out');
    }
    this.isTrackingEnabled = true;
    console.log('Analytics tracking enabled');
  }
}

// Create global instance
const analytics = new AnalyticsTracker();

// Auto-initialize in browser - multiple triggers for reliability
if (typeof window !== 'undefined') {
  console.log('🌐 Browser environment detected, setting up analytics');
  
  // Immediate initialization if DOM is ready
  if (document.readyState === 'loading') {
    console.log('📄 DOM still loading, waiting for DOMContentLoaded');
    document.addEventListener('DOMContentLoaded', () => {
      console.log('🚀 DOM loaded, initializing analytics');
      analytics.init();
    });
  } else {
    console.log('🚀 DOM already ready, initializing analytics immediately');
    analytics.init();
  }
  
  // Backup initialization on window load
  window.addEventListener('load', () => {
    console.log('🚀 Window loaded, backup analytics initialization');
    if (!analytics.isTrackingEnabled) {
      console.log('🔄 Analytics not enabled, re-initializing');
      analytics.init();
    }
  });
}

export default analytics;
