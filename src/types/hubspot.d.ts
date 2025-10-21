// HubSpot Type Definitions
declare global {
    interface Window {
      _hsq?: Array<any>;
      HubSpotConversations?: {
        widget: {
          open: () => void;
          close: () => void;
          remove: () => void;
          load: () => void;
        };
      };
    }
  }
  
  export {};