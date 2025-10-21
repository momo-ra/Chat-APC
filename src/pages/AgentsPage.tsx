import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { AppSidebar, Footer, ThemeToggle } from '../components/layout';
import {
  AgentsHeroSection,
  AgentsShowcaseSection,
  BiggerVisionSection,
} from '../components/agents';
import { sidebarItems } from '../data/layout/sidebarData';
import { useThemeMode } from '../contexts/ThemeContext';
import { getHomeBackground } from '../components/shared/pageBackgrounds';
import { usePageTitle } from '../hooks/usePageTitle';
import { SEOHead } from '../components/SEO/SEOHead';

const AgentsPage: React.FC = () => {
  usePageTitle({
    title: 'AI Agents',
    description: 'Meet your ecosystem of digital colleagues. ChatAPC\'s specialized AI agents detect, explain, and advise on process operations with interactive, conversational intelligence.',
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
        title="AI Agents - ChatAPC | Intelligent Process Control Agents"
        description="Meet your ecosystem of digital colleagues. ChatAPC (Chat APC) specialized AI agents detect, explain, and advise on process operations with interactive, conversational intelligence."
        url="https://chatapc.ai/product/agents"
        keywords="ChatAPC AI agents, Chat APC agents, constraint agent, optimization agent, process control AI, industrial AI agents"
        breadcrumbs={[
          { name: 'Home', url: 'https://chatapc.ai/' },
          { name: 'AI Agents', url: 'https://chatapc.ai/product/agents' }
        ]}
        schema={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "ChatAPC AI Agents",
          "description": "Specialized AI agents for industrial process control",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Constraint Agent",
              "description": "Identifies process bottlenecks and constraints in real-time"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Optimization Agent",
              "description": "Provides optimization recommendations for process improvement"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Reporting Agent",
              "description": "Generates comprehensive process control reports"
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
          {/* Agents Sections */}
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
            <AgentsHeroSection />
            <AgentsShowcaseSection />
            <BiggerVisionSection />
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

export default AgentsPage;