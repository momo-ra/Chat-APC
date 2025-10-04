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
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DeploymentPage: React.FC = () => {
  const { isDark } = useThemeMode();

  useEffect(() => {
    // Refresh ScrollTrigger on mount to ensure all animations work
    ScrollTrigger.refresh();
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: isDark
          ? 'linear-gradient(to bottom, #0a0e2e 0%, #0d1842 50%, #0a0e2e 100%)'
          : 'linear-gradient(to bottom, #FFFFFF 0%, #F8FAFC 50%, #FFFFFF 100%)',
        position: 'relative',
        overflowX: 'hidden',
        transition: 'background 0.3s ease',
      }}
    >
      <AppSidebar items={sidebarItems} />
      <ThemeToggle />

      {/* Content Sections */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Box data-section-theme={isDark ? 'dark' : 'light'} data-section-primary={isDark ? '#009BE4' : '#2563EB'}>
          <DeploymentHeroSection />
        </Box>
        <Box data-section-theme={isDark ? 'dark' : 'light'} data-section-primary={isDark ? '#009BE4' : '#2563EB'}>
          <HostingOptionsSection />
        </Box>
        <Box data-section-theme={isDark ? 'dark' : 'light'} data-section-primary={isDark ? '#009BE4' : '#2563EB'}>
          <IntegrationArchitectureSection />
        </Box>
        <Box data-section-theme={isDark ? 'dark' : 'light'} data-section-primary={isDark ? '#009BE4' : '#2563EB'}>
          <SecuritySection />
        </Box>
        <Box data-section-theme={isDark ? 'dark' : 'light'} data-section-primary={isDark ? '#009BE4' : '#2563EB'}>
          <DeploymentShowcaseSection />
        </Box>
        <Box data-section-theme={isDark ? 'dark' : 'light'} data-section-primary={isDark ? '#009BE4' : '#2563EB'}>
          <IntegrationSection />
        </Box>
        <Box data-section-theme={isDark ? 'dark' : 'light'} data-section-primary={isDark ? '#009BE4' : '#2563EB'}>
          <ScalableArchitectureSection />
        </Box>
        <Box data-section-theme={isDark ? 'dark' : 'light'} data-section-primary={isDark ? '#009BE4' : '#2563EB'}>
          <ReadyToDeploySection />
        </Box>
        <Box data-section-theme={isDark ? 'dark' : 'light'} data-section-primary={isDark ? '#009BE4' : '#2563EB'}>
          <DeploymentCTASection />
        </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default DeploymentPage;

