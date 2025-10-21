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
} from '../components/home';
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
  const [animationComplete, setAnimationComplete] = React.useState(false);

  // ANIMATION LOCK - Prevent scroll and interaction until hero animation is complete
  React.useEffect(() => {
    if (!animationComplete) {
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
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [animationComplete]);

  // Detect sidebar state based on screen size and user interaction
  React.useEffect(() => {
    const stored = localStorage.getItem('sidebarCollapsed');
    if (stored !== null) {
      setSidebarCollapsed(stored === 'true');
    }

    const handleResize = () => {
      const width = window.innerWidth;
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
    ScrollTrigger.config({
      limitCallbacks: true,
      syncInterval: 150,
    });

    window.scrollTo(0, 0);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Floating input visibility on mobile
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

  // Get consistent background
  const pageBackground = React.useMemo(() => getHomeBackground(isDark), [isDark]);

  return (
    <>
      {/* SEO Meta Tags with SEOHead Component */}
      <SEOHead
        title="ChatAPC (Chat APC) - AI-Powered Industrial Process Control"
        description="ChatAPC (Chat APC, Chat A.P.C) transforms your plant operations with AI agents that understand your process, identify constraints, and discover optimization opportunities. Achieve ROI in under 6 months."
        url="https://chatapc.ai/"
        keywords="ChatAPC, Chat APC, Chat A.P.C, AI process control, industrial automation, process optimization, plant operations, constraint identification, AI agents, industrial AI"
        breadcrumbs={[
          { name: 'Home', url: 'https://chatapc.ai/' }
        ]}
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
          background: pageBackground,
          position: 'relative',
          overflow: 'visible',
          transition: 'background 0.3s ease',
        }}
      >
        {/* Sidebar and Theme Toggle */}
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
          role="main"
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
            <HeroSearchSection
              setAnimationComplete={setAnimationComplete}
              animationComplete={animationComplete}
              inputValue={inputValue}
              setInputValue={setInputValue}
              messages={messages}
              setMessages={setMessages}
            />
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
              opacity: animationComplete ? 1 : 0,
              visibility: animationComplete ? 'visible' : 'hidden',
              transform: animationComplete ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 1.2s ease-out, transform 1.2s ease-out, visibility 0s linear 0s',
              pointerEvents: animationComplete ? 'auto' : 'none',
            }}
          >
            <Box sx={{ width: '100%', background: 'transparent' }}>
              <DemoVideoSection />
            </Box>

            <Box sx={{ width: '100%', background: 'transparent' }}>
              <BenefitsSection />
            </Box>

            <Box sx={{ width: '100%', background: 'transparent' }}>
              <ArchitectureSection />
            </Box>

            <Box sx={{ width: '100%', background: 'transparent' }}>
              <TeamSection />
            </Box>

            <Box sx={{ width: '100%', background: 'transparent' }}>
              <CTASection />
            </Box>

            <Box sx={{ width: '100%', background: 'transparent' }}>
              <ContactSection />
            </Box>
          </Box>

          {/* Footer */}
          <Box
            component="footer"
            role="contentinfo"
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
      </Box>
    </>
  );
};

export default HomePage;