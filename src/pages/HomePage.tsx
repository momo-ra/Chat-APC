import React from 'react';
import { Box } from '@mui/material';
import { AppSidebar, Footer, ThemeToggle } from '../components/layout';
import { 
  HeroSearchSection, 
  AuthButtons,
  ExamplesSection,
  DarkFeatureSection,
  DarkPillarSection,
  FullWidthCTASection,
  AlternatingFeatureSection,
  ContactSection,
  LightFeatureSection,
} from '../components/home';
import {
  CTASection,
  BenefitsSection,
  ArchitectureSection,
  DemoVideoSection,
  TeamSection,
} from '../components/home22';
import { sidebarItems } from '../data/layout/sidebarData';
import { useThemeMode } from '../contexts/ThemeContext';
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
      
      // Sidebar no longer auto-collapses - user controls it manually
      // Keep sidebar state from localStorage or user interaction
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
    // Configure ScrollTrigger but don't kill animations
    ScrollTrigger.config({
      limitCallbacks: true,
      syncInterval: 150,
    });
    
    return () => {
      // Clean up on unmount
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <Box
      sx={{
        height: 'auto',
        background: isDark 
          ? '#111827'
          : '#FFFFFF',
        position: 'relative',
        overflow: 'visible',
        transition: 'background 0.3s ease',
      }}
    >
      <AppSidebar items={sidebarItems} />
      <ThemeToggle />
  
      {/* Main Content Wrapper - Responsive to avoid sidebar overlap */}
      <Box
        sx={{
          width: '100%',
          height: 'auto',
          maxWidth: '100vw',
          overflow: 'hidden',
          // Adjust margin for sidebar when expanded on larger screens
          marginLeft: sidebarCollapsed ? 0 : (isMediumScreen ? 0 : 0),
          // No padding here - sections will handle their own margins
          transition: 'all 0.3s ease',
          position: 'relative',
          background: isDark 
            ? '#111827'
            : '#FFFFFF',
        }}
      >
        {/* Hero Section - Simplified for better scroll performance */}
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
        {/* Auth Buttons */}
        {/* <AuthButtons /> */}

        {/* Hero Chat Section */}
        <HeroSearchSection />
      
        {/* Companies Slider - Fixed at Bottom */}
        {/* <CompanySlider companies={partnerCompanies} /> */}
      </Box>

      {/* Content Sections - Below Hero */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '100vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
          marginLeft: 0,
          paddingLeft: 0,
          overflow: 'hidden', // Prevent horizontal overflow
        }}
      >
        {/* Examples Section */}
        {/* <ExamplesSection /> */}

        {/* DemoVideoSection */}
        <DemoVideoSection />


        {/* BenefitsSection */}
        <BenefitsSection />

        {/* ArchitectureSection */}
        <ArchitectureSection />


        {/* TeamSection */}
        <TeamSection />

        {/* CTASection */}
        <CTASection />


        {/* Interactive Features Section - NEW */}
        {/* <InteractiveFeaturesSection /> */}

        {/* Light Feature Section - WHITE BACKGROUND */}
        {/* <LightFeatureSection /> */}

        {/* Dark Feature Section */}
        {/* <DarkFeatureSection /> */}

        {/* Light Stats Section - WHITE BACKGROUND */}
        {/* <LightStatsSection /> */}

        {/* Full Width Image Section */}
        {/* <FullWidthImageSection /> */}

        {/* ROI Section */}
        {/* <ROISection /> */}

        {/* Split Image Section */} 
        {/* <SplitImageSection /> */}

        {/* Dark Pillar Section */}
        {/* <DarkPillarSection /> */}

        {/* Full Width CTA Section */}
        {/* <FullWidthCTASection /> */}

        {/* Alternating Feature Section - "Not just another AI tool" */}
        {/* <AlternatingFeatureSection /> */}

        {/* FAQ Section - Moved to /resources/faq */}
        {/* <FAQSection /> */}

        {/* Contact Section */}
        <ContactSection />
      </Box>

        {/* Footer */}
        <Box 
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
  );
};

export default HomePage;

