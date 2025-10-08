import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { AppSidebar, Footer, ThemeToggle } from '../components/layout';
import {
  AboutHeroSection,
  AboutBeginningSection,
  AboutGapSection,
  AboutTurningPointSection,
  AboutResultSection,
  AboutBeliefSection,
  AboutFinalSection,
} from '../components/about';
import { sidebarItems } from '../data/layout/sidebarData';
import { useThemeMode } from '../contexts/ThemeContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutPage: React.FC = () => {
  const { isDark } = useThemeMode();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set page metadata
    document.title = 'Our Story - Alpha Process Control | ChatAPC';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn about Alpha Process Control\'s journey from traditional process control to AI-driven industrial operations with ChatAPC.');
    }

    // Configure ScrollTrigger (don't kill existing triggers)
    ScrollTrigger.config({
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
      limitCallbacks: true,
    });

    // Refresh ScrollTrigger after content is loaded
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
    
    return () => {
      clearTimeout(refreshTimer);
    };
  }, []);

  return (
    <>
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
        ref={pageRef}
        sx={{
          minHeight: '100vh',
          background: isDark
            ? 'linear-gradient(to bottom, #0a0e2e 0%, #0d1842 50%, #0a0e2e 100%)'
            : 'linear-gradient(to bottom, #FFFFFF 0%, #F8FAFC 50%, #FFFFFF 100%)',
          position: 'relative',
          overflow: 'visible',
          transition: 'background 0.3s ease',
          // Force all content to be visible
          '& *': {
            opacity: '1 !important',
            visibility: 'visible !important',
          },
        }}
      >
        <AppSidebar items={sidebarItems} />
        <ThemeToggle />

        {/* Main Content */}
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
          }}
        >
          {/* About Sections */}
          <Box
            sx={{
              width: '100%',
              maxWidth: '100vw',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              zIndex: 2,
              overflow: 'hidden',
            }}
          >
            <AboutHeroSection />
            <AboutBeginningSection />
            <AboutGapSection />
            <AboutTurningPointSection />
            <AboutResultSection />
            <AboutBeliefSection />
            <AboutFinalSection />
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
      </Box>
    </>
  );
};

export default AboutPage;