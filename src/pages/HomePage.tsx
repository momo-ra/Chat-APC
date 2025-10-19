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
import FloatingInput from '../components/home/FloatingInput';
import { sidebarItems } from '../data/layout/sidebarData';
import { useThemeMode } from '../contexts/ThemeContext';
import { getHomeBackground } from '../components/shared/pageBackgrounds';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePageTitle } from '../hooks/usePageTitle';
import { useIsMobile } from '../hooks/use-mobile';
import { SEOHead } from '../components/SEO/SEOHead';

// Register plugin
gsap.registerPlugin(ScrollTrigger);

const HomePage: React.FC = () => {
  usePageTitle({
    title: 'ChatAPC',
    noSuffix: true,
    description: 'ChatAPC: AI-powered assistant for industrial process control. Analyze constraints, optimize operations, and improve plant efficiency with conversational intelligence.',
  });
  const { isDark } = useThemeMode();
  const isMobile = useIsMobile();
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [isMediumScreen, setIsMediumScreen] = React.useState(false);
  const [showFloatingInput, setShowFloatingInput] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [messages, setMessages] = React.useState<any[]>([]);

  // ANIMATION LOCK - Prevent scroll and interaction until hero animation is complete
  const [animationComplete, setAnimationComplete] = React.useState(false);

  // Pass DOWN to HeroSearchSection
  // We'll block scroll until animationComplete === true
  React.useEffect(() => {
    if (!animationComplete) {
      // Lock scroll at body level
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = '0';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    }
    // Clean up on unmount
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [animationComplete]);

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

  // Floating input visibility on mobile - show after scrolling past hero section
  React.useEffect(() => {
    if (!isMobile || !animationComplete) {
      setShowFloatingInput(false);
      return;
    }

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const heroSectionHeight = window.innerHeight * 0.8;
          
          // Show floating input when user scrolls past hero section
          if (scrollY > Math.min(300, heroSectionHeight)) {
            setShowFloatingInput(true);
          } else {
            setShowFloatingInput(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, animationComplete]);

  // Handle sending message from floating input
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Scroll to top to show the hero section chat
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Add message to chat (you may need to pass this to HeroSearchSection)
    // For now, we'll just clear the input
    setInputValue('');
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Get consistent background that doesn't change
  const pageBackground = React.useMemo(() => getHomeBackground(isDark), [isDark]);
  
  <SEOHead
    title="ChatAPC"
    description="ChatAPC: AI-powered assistant for industrial process control. Analyze constraints, optimize operations, and improve plant efficiency with conversational intelligence."
  />

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
          background: pageBackground,
          position: 'relative',
          overflow: 'visible',
          transition: 'background 0.3s ease',
        }}
      >
        {/* Sidebar and Theme Toggle - Will be animated by GSAP */}
        <Box data-sidebar>
          <AppSidebar items={sidebarItems} />
        </Box>
        <Box data-theme-toggle>
          <ThemeToggle />
        </Box>

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
          {/* Hero Section - Always visible, background transparent */}
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
            <HeroSearchSection
              setAnimationComplete={setAnimationComplete}
              animationComplete={animationComplete}
              inputValue={inputValue}
              setInputValue={setInputValue}
              messages={messages}
              setMessages={setMessages}
            />
          </Box>

          {/* Content Sections - Always rendered but with opacity control */}
          <Box
            sx={{
              width: '100%',
              maxWidth: '100vw',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              zIndex: 2,
              overflow: 'hidden',
              opacity: animationComplete ? 1 : 0,
              visibility: animationComplete ? 'visible' : 'hidden',
              transform: animationComplete ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 1.2s ease-out, transform 1.2s ease-out, visibility 0s linear 0s',
              pointerEvents: animationComplete ? 'auto' : 'none',
            }}
          >
            {/* DemoVideoSection */}
            <Box
              sx={{
                width: '100%',
                background: 'transparent',
              }}
            >
              <DemoVideoSection />
            </Box>

            {/* ExpandingBackgroundSlider */}
            {/* <ExpandingBackgroundSlider /> */}

            {/* HorizontalScrollSlider */}
            {/* <HorizontalScrollSlider /> */}

            {/* BenefitsSection */}
            <Box
              sx={{
                width: '100%',
                background: 'transparent',
              }}
            >
              <BenefitsSection />
            </Box>

            {/* ArchitectureSection */}
            <Box
              sx={{
                width: '100%',
                background: 'transparent',
              }}
            >
              <ArchitectureSection />
            </Box>

            {/* TeamSection */}
            <Box
              sx={{
                width: '100%',
                background: 'transparent',
              }}
            >
              <TeamSection />
            </Box>

            {/* CTASection */}
            <Box
              sx={{
                width: '100%',
                background: 'transparent',
              }}
            >
              <CTASection />
            </Box>

            {/* Contact Section */}
            <Box
              sx={{
                width: '100%',
                background: 'transparent',
              }}
            >
              <ContactSection />
            </Box>
          </Box>

          {/* Footer - Always rendered but with opacity control */}
          <Box
            component="footer"
            sx={{
              mt: 0,
              mb: 0,
              width: '100%',
              marginLeft: 0,
              paddingLeft: 0,
              opacity: animationComplete ? 1 : 0,
              visibility: animationComplete ? 'visible' : 'hidden',
              transform: animationComplete ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 1.2s ease-out 0.2s, transform 1.2s ease-out 0.2s, visibility 0s linear 0.2s',
              pointerEvents: animationComplete ? 'auto' : 'none',
            }}
          >
            <Footer />
          </Box>
        </Box>

        {/* Floating Input for Mobile - Fixed at bottom of entire page */}
        {/* {showFloatingInput && animationComplete && isMobile && (
          <FloatingInput
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSendMessage={handleSendMessage}
            handleKeyPress={handleKeyPress}
            isLoading={false}
            showAutoDemo={false}
            demoStep={0}
            setMessages={setMessages}
            setShowAutoDemo={() => {}}
            setDemoStep={() => {}}
            demoExample={{ user: '', assistant: '' }}
          />
        )} */}
      </Box>
    </>
  );
};

export default HomePage;