import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { AppSidebar, Footer, ThemeToggle } from '../components/layout';
import {
  HowItWorksHeroSection,
  HowItWorksProcessSection,
  HowItWorksFeaturesSection,
} from '../components/how-it-works';
import { sidebarItems } from '../data/layout/sidebarData';
import { useThemeMode } from '../contexts/ThemeContext';
import { getHomeBackground } from '../components/shared/pageBackgrounds';
import { usePageTitle } from '../hooks/usePageTitle';
import { SEOHead } from '../components/SEO/SEOHead';

const HowItWorksPage: React.FC = () => {
  usePageTitle({
    title: 'How ChatAPC Works',
    description: 'Discover how ChatAPC transforms natural language questions into actionable industrial insights through AI-powered agents, process knowledge mapping, and intelligent analysis.',
  });
  
  const { isDark } = useThemeMode();

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead
        title="How It Works - ChatAPC | AI Process Control Platform"
        description="Discover how ChatAPC (Chat APC) transforms natural language questions into actionable industrial insights through AI-powered agents, process knowledge mapping, and intelligent analysis."
        url="https://chatapc.ai/product/how-it-works"
        keywords="how ChatAPC works, Chat APC process, AI process control workflow, industrial AI platform, natural language processing"
        breadcrumbs={[
          { name: 'Home', url: 'https://chatapc.ai/' },
          { name: 'How It Works', url: 'https://chatapc.ai/product/how-it-works' }
        ]}
        schema={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "How ChatAPC Works",
          "description": "Learn how ChatAPC transforms natural language questions into actionable industrial insights",
          "step": [
            {
              "@type": "HowToStep",
              "position": 1,
              "name": "Connect Your Systems",
              "text": "ChatAPC integrates with your existing DCS, SCADA, and historian systems"
            },
            {
              "@type": "HowToStep",
              "position": 2,
              "name": "Ask Questions",
              "text": "Use natural language to ask questions about your process"
            },
            {
              "@type": "HowToStep",
              "position": 3,
              "name": "Get AI-Powered Insights",
              "text": "Receive intelligent analysis and recommendations from specialized AI agents"
            }
          ]
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
          {/* How It Works Sections */}
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
            <HowItWorksHeroSection />
            <HowItWorksProcessSection />
            <HowItWorksFeaturesSection />
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

export default HowItWorksPage;