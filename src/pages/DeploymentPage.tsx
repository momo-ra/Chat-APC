import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { AppSidebar, Footer, ThemeToggle } from '../components/layout';
import {
  DeploymentHeroSection,
  HostingOptionsSection,
  SecuritySection,
  IntegrationSection,
  ScalableArchitectureSection,
  ReadyToDeploySection,
  DeploymentCTASection,
  DeploymentShowcaseSection,
  IntegrationArchitectureSection,
} from '../components/deployment';
import { sidebarItems } from '../data/layout/sidebarData';
import { useThemeMode } from '../contexts/ThemeContext';
import { getHomeBackground } from '../components/shared/pageBackgrounds';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePageTitle } from '../hooks/usePageTitle';

  const DeploymentPage: React.FC = () => {
  
    usePageTitle({
    title: 'Deployment Options',
    description: 'Flexible deployment options for ChatAPC. Choose cloud, on-premise, or hybrid solutions with enterprise-grade security and scalability.',
  });
  
  const { isDark } = useThemeMode();

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
          {/* Deployment Sections */}
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
            <DeploymentHeroSection />
            <HostingOptionsSection />
            <IntegrationArchitectureSection />
            <SecuritySection />
            <DeploymentShowcaseSection />
            <IntegrationSection />
            <ScalableArchitectureSection />
            <ReadyToDeploySection />
            <DeploymentCTASection />
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

export default DeploymentPage;

