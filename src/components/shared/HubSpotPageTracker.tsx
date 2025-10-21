import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    _hsq?: Array<any>;
  }
}

const HubSpotPageTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const trackPageView = (): boolean => {
      if (window._hsq) {
        try {
          window._hsq.push(['setPath', location.pathname]);
          window._hsq.push(['trackPageView']);
          return true;
        } catch (error) {
          // Silent fail in production
          if (process.env.NODE_ENV === 'development') {
            console.error('Error tracking page:', error);
          }
          return false;
        }
      }
      return false;
    };

    // Try immediately
    if (trackPageView()) {
      return;
    }

    // Wait for HubSpot to load
    let attempts = 0;
    const maxAttempts = 20;

    const checkInterval = setInterval(() => {
      attempts++;

      if (trackPageView()) {
        clearInterval(checkInterval);
      } else if (attempts >= maxAttempts) {
        clearInterval(checkInterval);
      }
    }, 500);

    return () => {
      clearInterval(checkInterval);
    };
  }, [location.pathname]);

  return null;
};

export default HubSpotPageTracker;