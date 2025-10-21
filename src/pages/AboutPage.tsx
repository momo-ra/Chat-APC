import React, { useEffect } from 'react';
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
import { getHomeBackground } from '../components/shared/pageBackgrounds';
import { usePageTitle } from '../hooks/usePageTitle';
import { SEOHead } from '../components/SEO/SEOHead';

const AboutPage: React.FC = () => {
  usePageTitle({
    title: 'Our Story',
    description: 'Learn about Alpha Process Control\'s journey from traditional process control to AI-driven industrial operations with ChatAPC.',
  });
  
  const { isDark } = useThemeMode();

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* SEO Meta Tags with Breadcrumbs & Schema */}
      <SEOHead
        title="Our Story - Alpha Process Control | ChatAPC"
        description="Learn about Alpha Process Control's journey from traditional process control to AI-driven industrial operations. Discover how we're transforming the industry with ChatAPC (Chat APC)."
        url="https://chatapc.ai/company/about"
        keywords="Alpha Process Control, ChatAPC story, Chat APC company, industrial AI history, process control innovation"
        breadcrumbs={[
          { name: 'Home', url: 'https://chatapc.ai/' },
          { name: 'About Us', url: 'https://chatapc.ai/company/about' }
        ]}
        schema={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About Alpha Process Control",
          "description": "Learn about Alpha Process Control's journey from traditional process control to AI-driven industrial operations with ChatAPC.",
          "url": "https://chatapc.ai/company/about",
          "mainEntity": {
            "@type": "Organization",
            "name": "Alpha Process Control",
            "description": "Professional services firm specialized in Advanced Process Control and AI-powered industrial automation"
          }
        }}
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
          transition: 'background 0.3s ease',
        }}
      >
        <AppSidebar items={sidebarItems} />
        <ThemeToggle />

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
          {/* About Sections */}
          <Box
            component="article"
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
            role="contentinfo"
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