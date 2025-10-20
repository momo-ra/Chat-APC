// import React, { useState, useEffect, useRef } from 'react';
// import { Box } from '@mui/material';
// import { ChatLayout } from '@/components/demo';
// import { ChatProvider } from '@/contexts/ChatContext';
// import { HelpPopup } from '@/components/shared';
// import type { HelpPopupButton } from '@/components/shared';
// import { SEOHead } from '../components/SEO/SEOHead';

// const Demo: React.FC = () => {
//   const [showWelcomePopup, setShowWelcomePopup] = useState(false);
//   const [popupPosition, setPopupPosition] = useState({ top: 100, left: 0 });

//   const calculatePosition = () => {
//     const popupWidth = 400; // Approximate popup width
//     const popupHeight = 300; // Approximate popup height
//     const centerLeft = (window.innerWidth - popupWidth) / 2; // Center horizontally
//     const centerTop = Math.max(50, (window.innerHeight - popupHeight) / 2); // Center vertically with minimum 50px from top
//     setPopupPosition({ top: centerTop, left: centerLeft });
//   };

//   useEffect(() => {
//     // Show welcome popup when demo loads
//     const timer = setTimeout(() => {
//       // Calculate position right before showing the popup
//       calculatePosition();
//       setShowWelcomePopup(true);
//     }, 1500); // Delay to let the page fully load

//     // Add resize listener to recalculate position
//     window.addEventListener('resize', calculatePosition);

//     return () => {
//       clearTimeout(timer);
//       window.removeEventListener('resize', calculatePosition);
//     };
//   }, []);

//   const handleGetStarted = () => {
//     setShowWelcomePopup(false);
//   };

//   const handleLearnMore = () => {
//     // Scroll to top or show more info - removed smooth scroll for performance
//     window.scrollTo({ top: 0 });
//     setShowWelcomePopup(false);
//   };
  
//   <SEOHead
//     title="Demo"
//     description="ChatAPC is the world's first conversational AI platform for industrial process control. This demo showcases how you can transform complex APC and DCS troubleshooting into simple conversations, reducing problem resolution time by 80% while maximizing plant efficiency. Try asking questions about your industrial processes, request data visualizations, or explore optimization strategies."
//   />

//   return (
//     <ChatProvider>
//       <Box sx={{ 
//         height: '100vh', 
//         width: '100%',
//         overflow: 'hidden',
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0
//       }}>
//         <ChatLayout />
        
//         {/* Welcome Popup */}
//         <HelpPopup
//           isOpen={showWelcomePopup}
//           onClose={() => setShowWelcomePopup(false)}
//           title="Welcome to ChatAPC Demo"
//           description="ChatAPC is the world's first conversational AI platform for industrial process control. This demo showcases how you can transform complex APC and DCS troubleshooting into simple conversations, reducing problem resolution time by 80% while maximizing plant efficiency. Try asking questions about your industrial processes, request data visualizations, or explore optimization strategies."
//           buttons={[
//             { 
//               label: 'Get Started', 
//               onClick: handleGetStarted
//             },
//             { 
//               label: 'Learn More', 
//               onClick: handleLearnMore
//             }
//           ]}
//           position={popupPosition}
//         />
//       </Box>
//     </ChatProvider>
//   );
// };

// export default Demo;


import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { AppSidebar, Footer, ThemeToggle } from "../components/layout";
import AnimatedHomeBackground from "../components/shared/AnimatedHomeBackground";
import { sidebarItems } from "../data/layout/sidebarData";
import { useThemeMode } from "../contexts/ThemeContext";
import { getHomeBackground } from "../components/shared/pageBackgrounds";
import { SEOHead } from "../components/SEO/SEOHead";

const Demo: React.FC = () => {
  const { isDark } = useThemeMode();

  useEffect(() => {
    // Scroll to top on mount for demo consistency
    window.scrollTo(0, 0);
  }, []);

  const handleBackToHome = () => {
    window.location.href = "/";
  };

  return (
    <>
      <SEOHead
        title="Demo"
        description="ChatAPC is the world's first conversational AI platform for industrial process control. This demo will allow you to interact conversationally with complex APC and DCS troubleshooting, data visualizations, and optimization strategies. Check back soon for the live demo experience!"
      />
      {/* Skip Navigation for Accessibility */}
      <Box
        component="a"
        href="#main-content"
        sx={{
          position: 'absolute',
          left: '-9999px',
          zIndex: 9999,
          padding: '8px 16px',
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          textDecoration: 'none',
          borderRadius: 1,
          '&:focus': {
            left: '16px',
            top: '16px',
          },
        }}
      >
        Skip to main content
      </Box>

      <Box
        sx={{
          minHeight: '100vh',
          background: getHomeBackground(isDark),
          position: 'relative',
          overflow: 'visible',
          transition: 'background 0.3s ease'
        }}
      >
        <AppSidebar items={sidebarItems} />
        <ThemeToggle />

        {/* Main Demo Coming Soon Content */}
        <Box
          id="main-content"
          component="main"
          sx={{
            width: '100%',
            height: 'auto',
            maxWidth: '100vw',
            overflow: 'hidden',
            position: 'relative',
            background: 'transparent',
            display: 'flex',
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: '100vh',
            py: { xs: 8, md: 12 },
          }}
        >
          {/* Animated background layer for visual polish */}
          <AnimatedHomeBackground />

          {/* Centered Card */}
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              px: { xs: 3, sm: 5 },
              py: { xs: 5, sm: 7 },
              background: "transparent",
              borderRadius: 5,
              // boxShadow: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: 460,
              textAlign: "center",
              mx: "auto",
              backdropFilter: "blur(6px)",
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              sx={{
                mb: 2,
                fontWeight: 700,
                letterSpacing: 1,
                color: isDark ? "#60A5FA" : "primary.main"
              }}
            >
              Demo Coming Soon!
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 3,
                color: isDark ? "rgba(229, 231, 235, 0.88)" : "text.secondary",
                fontSize: "1.15rem"
              }}
            >
              We're working hard behind the scenes to deliver the world's first conversational AI demo for industrial process control.
              <br />
              <b>Stay tuned</b> and check back soon – something amazing is on the way!
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                mt: 2,
                fontWeight: 600,
                borderRadius: 3,
                px: 4,
              }}
              onClick={handleBackToHome}
            >
              Back to Home
            </Button>
          </Box>
        </Box>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            mt: 0,
            mb: 0,
            width: '100%',
            marginLeft: 0,
            paddingLeft: 0,
          }}
        >
          <Footer />
        </Box>
      </Box>
    </>
  );
};

export default Demo;

