import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { ChatLayout } from '@/components/demo';
import { ChatProvider } from '@/contexts/ChatContext';
import { HelpPopup } from '@/components/shared';
import type { HelpPopupButton } from '@/components/shared';
import { SEOHead } from '../components/SEO/SEOHead';

const Demo: React.FC = () => {
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 100, left: 0 });

  const calculatePosition = () => {
    const popupWidth = 400; // Approximate popup width
    const popupHeight = 300; // Approximate popup height
    const centerLeft = (window.innerWidth - popupWidth) / 2; // Center horizontally
    const centerTop = Math.max(50, (window.innerHeight - popupHeight) / 2); // Center vertically with minimum 50px from top
    setPopupPosition({ top: centerTop, left: centerLeft });
  };

  useEffect(() => {
    // Show welcome popup when demo loads
    const timer = setTimeout(() => {
      // Calculate position right before showing the popup
      calculatePosition();
      setShowWelcomePopup(true);
    }, 1500); // Delay to let the page fully load

    // Add resize listener to recalculate position
    window.addEventListener('resize', calculatePosition);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculatePosition);
    };
  }, []);

  const handleGetStarted = () => {
    setShowWelcomePopup(false);
  };

  const handleLearnMore = () => {
    // Scroll to top or show more info - removed smooth scroll for performance
    window.scrollTo({ top: 0 });
    setShowWelcomePopup(false);
  };
  
  <SEOHead
    title="Demo"
    description="ChatAPC is the world's first conversational AI platform for industrial process control. This demo showcases how you can transform complex APC and DCS troubleshooting into simple conversations, reducing problem resolution time by 80% while maximizing plant efficiency. Try asking questions about your industrial processes, request data visualizations, or explore optimization strategies."
  />

  return (
    <ChatProvider>
      <Box sx={{ 
        height: '100vh', 
        width: '100%',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}>
        <ChatLayout />
        
        {/* Welcome Popup */}
        <HelpPopup
          isOpen={showWelcomePopup}
          onClose={() => setShowWelcomePopup(false)}
          title="Welcome to ChatAPC Demo"
          description="ChatAPC is the world's first conversational AI platform for industrial process control. This demo showcases how you can transform complex APC and DCS troubleshooting into simple conversations, reducing problem resolution time by 80% while maximizing plant efficiency. Try asking questions about your industrial processes, request data visualizations, or explore optimization strategies."
          buttons={[
            { 
              label: 'Get Started', 
              onClick: handleGetStarted
            },
            { 
              label: 'Learn More', 
              onClick: handleLearnMore
            }
          ]}
          position={popupPosition}
        />
      </Box>
    </ChatProvider>
  );
};

export default Demo;