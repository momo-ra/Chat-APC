import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useHubSpotPageTracking = (): void => {
  const location = useLocation();

  useEffect(() => {
    if (window._hsq) {
      window._hsq.push(['setPath', location.pathname]);
      window._hsq.push(['trackPageView']);
      console.log('✅ Page tracked successfully:', location.pathname);
    }
  }, [location]);
};