import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { AppSidebar, Footer, ThemeToggle } from '../components/layout';
import {
  AgentsHeroSection,
  AgentsOverviewSection,
  AgentsShowcaseSection,
  BiggerVisionSection,
} from '../components/agents';
import { sidebarItems } from '../data/layout/sidebarData';
import { useThemeMode } from '../contexts/ThemeContext';

const AgentsPage: React.FC = () => {
  const { isDark } = useThemeMode();

  useEffect(() => {
    // Set page metadata
    document.title = 'AI Agents - Alpha Process Control | ChatAPC';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Meet your ecosystem of digital colleagues. ChatAPC\'s specialized AI agents detect, explain, and advise on process operations with interactive, conversational intelligence.');
    }

    // Scroll to top on mount
    window.scrollTo(0, 0);
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
          background: isDark
            ? 'linear-gradient(to bottom, #0F1419 0%, #1A1F2E 25%, #2D1B69 75%, #1A1F2E 100%)'
            : 'linear-gradient(to bottom, #FFFFFF 0%, #F8FAFC 25%, #EEF2FF 75%, #FFFFFF 100%)',
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
          {/* Agents Sections */}
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
            <AgentsHeroSection />
            <AgentsOverviewSection />
            <AgentsShowcaseSection />
            <BiggerVisionSection />
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

export default AgentsPage;