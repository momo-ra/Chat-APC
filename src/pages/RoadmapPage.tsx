import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { AppSidebar, Footer, ThemeToggle } from '../components/layout';
import {
  RoadmapHeroSection,
  RoadmapTimelineSection,
  RoadmapEcosystemSection,
} from '../components/roadmap';
import { sidebarItems } from '../data/layout/sidebarData';
import { useThemeMode } from '../contexts/ThemeContext';
import { getHomeBackground } from '../components/shared/pageBackgrounds';
import { usePageTitle } from '../hooks/usePageTitle';
import { SEOHead } from '../components/SEO/SEOHead';

const RoadmapPage: React.FC = () => {
  const { isDark } = useThemeMode();
 
  usePageTitle({
    title: 'Product Roadmap',
    description: 'Discover the future of ChatAPC with our comprehensive product roadmap, featuring upcoming features, integrations, and innovations in industrial AI.',
  });
  
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead
        title="Product Roadmap - ChatAPC | Future Features & Development"
        description="Discover the future of ChatAPC (Chat APC) with our comprehensive product roadmap, featuring upcoming features, integrations, and innovations in industrial AI."
        url="https://chatapc.ai/roadmap"
        keywords="ChatAPC roadmap, Chat APC future, upcoming features, product development, industrial AI innovation"
        breadcrumbs={[
          { name: 'Home', url: 'https://chatapc.ai/' },
          { name: 'Roadmap', url: 'https://chatapc.ai/roadmap' }
        ]}
        schema={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "ChatAPC Product Roadmap",
          "description": "Comprehensive roadmap for ChatAPC platform development including near-term, mid-term, and long-term features",
          "author": {
            "@type": "Organization",
            "name": "Alpha Process Control"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Alpha Process Control",
            "logo": {
              "@type": "ImageObject",
              "url": "https://chatapc.ai/chatAPC-logo-light-mode.svg"
            }
          },
          "datePublished": "2024-01-01",
          "dateModified": new Date().toISOString()
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
          {/* Roadmap Sections */}
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
            <RoadmapHeroSection />
            <RoadmapTimelineSection />
            <RoadmapEcosystemSection />
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

export default RoadmapPage;