import React from 'react';
import { Box } from '@mui/material';
import { AppSidebar, Footer, ThemeToggle } from '../components/layout';
import { 
  CompanySlider, 
  HeroSearchSection, 
  AuthButtons,
  ExamplesSection,
  DarkFeatureSection,
  ROISection,
  DarkPillarSection,
  FullWidthCTASection,
  AlternatingFeatureSection,
  FullWidthImageSection,
  SplitImageSection,
  ContactSection,
  LightFeatureSection,
  LightStatsSection,
  InteractiveFeaturesSection,
  FAQSection
} from '../components/home';
import { sidebarItems } from '../data/layout/sidebarData';
import { heroQuestions, partnerCompanies } from '../data/home/chatHeroData';
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
      // Detect if we're on medium screen (960-1366px)
      const isMedium = width >= 960 && width <= 1366;
      setIsMediumScreen(isMedium);
      
      // Sidebar is collapsed for screens between 960px and 1366px
      if (isMedium) {
        setSidebarCollapsed(true);
      } else if (width > 1366) {
        setSidebarCollapsed(false);
      } else {
        setSidebarCollapsed(true); // Mobile always collapsed
      }
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
          ? 'linear-gradient(to bottom, #0a0e2e 0%, #0d1842 50%, #0a0e2e 100%)'
          : 'linear-gradient(to bottom, #FFFFFF 0%, #F8FAFC 50%, #FFFFFF 100%)',
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
          // No padding here - sections will handle their own margins
          transition: 'all 0.3s ease',
          position: 'relative',
          background: 'transparent',
        }}
      >
        {/* Hero Section - Simplified for better scroll performance */}
        <Box
          data-section-theme={isDark ? 'dark' : 'light'}
          data-section-primary={isDark ? '#009BE4' : '#2563EB'}
          sx={{
            position: 'relative',
            width: '100%',
            margin: 0,
            padding: 0,
            overflow: 'visible',
            height: 'auto',
          }}
        >
        {/* Auth Buttons */}
        <AuthButtons />

        {/* Hero Chat Section */}
        <HeroSearchSection questions={heroQuestions} />
      
        {/* Companies Slider - Fixed at Bottom */}
        <CompanySlider companies={partnerCompanies} />
      </Box>

      {/* Content Sections - Below Hero */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
          marginLeft: 0,
          paddingLeft: 0,
          overflow: 'visible', // Prevent scroll interference
        }}
      >
        {/* Examples Section */}
        <ExamplesSection />

        {/* Interactive Features Section - NEW */}
        <InteractiveFeaturesSection />

        {/* Light Feature Section - WHITE BACKGROUND */}
        <LightFeatureSection />

        {/* Dark Feature Section */}
        <DarkFeatureSection />

        {/* Light Stats Section - WHITE BACKGROUND */}
        {/* <LightStatsSection /> */}

        {/* Full Width Image Section */}
        <FullWidthImageSection />

        {/* ROI Section */}
        {/* <ROISection /> */}

        {/* Split Image Section */}
        {/* <SplitImageSection /> */}

        {/* Dark Pillar Section */}
        <DarkPillarSection />

        {/* Full Width CTA Section */}
        <FullWidthCTASection />

        {/* Alternating Feature Section - "Not just another AI tool" */}
        <AlternatingFeatureSection />

        {/* FAQ Section */}
        <FAQSection />

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

