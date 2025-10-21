// Types for HubSpot tracking
interface HubSpotEventProperties {
    [key: string]: string | number | boolean;
  }
  
  interface HubSpotUserData {
    email?: string;
    firstname?: string;
    lastname?: string;
    company?: string;
    phone?: string;
    [key: string]: string | undefined;
  }
  
  /**
   * Track custom event to HubSpot
   */
  export const trackHubSpotEvent = (
    eventName: string,
    properties: HubSpotEventProperties = {}
  ): void => {
    if (typeof window !== 'undefined' && window._hsq) {
      try {
        window._hsq.push([
          'trackCustomBehavioralEvent',
          {
            name: eventName,
            properties: {
              ...properties,
              timestamp: new Date().toISOString(),
              page_url: window.location.href,
              page_title: document.title,
            },
          },
        ]);
  
        console.log(`✅ HubSpot Event Tracked: ${eventName}`, properties);
      } catch (error) {
        console.error('❌ Error tracking HubSpot event:', error);
      }
    } else {
      console.warn('⚠️ HubSpot tracking not loaded yet');
    }
  };
  
  /**
   * Identify user in HubSpot
   */
  export const identifyHubSpotUser = (userData: HubSpotUserData): void => {
    if (typeof window !== 'undefined' && window._hsq) {
      try {
        window._hsq.push(['identify', userData]);
        console.log('✅ User identified in HubSpot:', userData);
      } catch (error) {
        console.error('❌ Error identifying user:', error);
      }
    }
  };
  
  /**
   * Track page view manually
   */
  export const trackHubSpotPageView = (path: string): void => {
    if (typeof window !== 'undefined' && window._hsq) {
      try {
        window._hsq.push(['setPath', path]);
        window._hsq.push(['trackPageView']);
        console.log(`✅ Page view tracked: ${path}`);
      } catch (error) {
        console.error('❌ Error tracking page view:', error);
      }
    }
  };