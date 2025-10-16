import React from 'react';
import { Box } from '@mui/material';
import { AppSidebar, Footer, ThemeToggle } from '../components/layout';
import {
  HeroSearchSection,
  CTASection,
  BenefitsSection,
  ArchitectureSection,
  DemoVideoSection,
  TeamSection,
  ContactSection,
  HorizontalScrollSlider,
  ExpandingBackgroundSlider,
} from '../components/home';
import { sidebarItems } from '../data/layout/sidebarData';
import { useThemeMode } from '../contexts/ThemeContext';
import { getHomeBackground } from '../components/shared/pageBackgrounds';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugin
gsap.registerPlugin(ScrollTrigger);

const HomePage: React.FC = () => {
  const { isDark } = useThemeMode();
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [isMediumScreen, setIsMediumScreen] = React.useState(false);

  // Detect sidebar state based on screen size and user interaction
  React.useEffect(() => {
    // Initialize from localStorage
    const stored = localStorage.getItem('sidebarCollapsed');
    if (stored !== null) {
      setSidebarCollapsed(stored === 'true');
    }
    
    const handleResize = () => {
      const width = window.innerWidth;
      // Detect if we're on medium screen (960-1549px)
      const isMedium = width >= 960 && width <= 1549;
      setIsMediumScreen(isMedium);
    };
    
    const handleSidebarToggle = (event: CustomEvent) => {
      setSidebarCollapsed(event.detail.collapsed);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('sidebarToggle', handleSidebarToggle as EventListener);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('sidebarToggle', handleSidebarToggle as EventListener);
    };
  }, []);

  // Configure ScrollTrigger for better performance
  React.useEffect(() => {
    // Set page metadata
    document.title = 'ChatAPC - AI Assistant for Process Control | Alpha Process Control';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'ChatAPC: AI-powered assistant for industrial process control. Analyze constraints, optimize operations, and improve plant efficiency with conversational intelligence.');
    }

    // Configure ScrollTrigger but don't kill animations
    ScrollTrigger.config({
      limitCallbacks: true,
      syncInterval: 150,
    });
    
    // Scroll to top on mount
    window.scrollTo(0, 0);
    
    return () => {
      // Clean up on unmount
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
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
        sx={{
          minHeight: '100vh',
          background: getHomeBackground(isDark),
          position: 'relative',
          overflow: 'visible',
          transition: 'background 0.3s ease',
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
          {/* Hero Section */}
          <Box
            data-section-theme={isDark ? 'dark' : 'light'}
            data-section-primary={isDark ? '#009BE4' : '#2563EB'}
            sx={{
              position: 'relative',
              width: '100%',
              maxWidth: '100vw',
              margin: 0,
              padding: 0,
              overflow: 'hidden',
              height: 'auto',
              background: 'transparent',
            }}
          >
            {/* Hero Chat Section */}
            <HeroSearchSection />
          </Box>

          {/* Content Sections */}
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
            {/* DemoVideoSection */}
            <DemoVideoSection />
            
            {/* ExpandingBackgroundSlider */}
            {/* <ExpandingBackgroundSlider /> */}
            
            {/* HorizontalScrollSlider */}
            {/* <HorizontalScrollSlider /> */}

            {/* BenefitsSection */}
            <BenefitsSection />

            {/* ArchitectureSection */}
            <ArchitectureSection />

            {/* TeamSection */}
            <TeamSection />

            {/* CTASection */}
            <CTASection />

            {/* Contact Section */}
            <ContactSection />
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

export default HomePage;