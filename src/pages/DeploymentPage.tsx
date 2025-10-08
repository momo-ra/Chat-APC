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
    // CRITICAL FIX: Kill all ScrollTrigger instances to prevent scroll lag
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    // Disable ScrollTrigger globally
    ScrollTrigger.config({
      autoRefreshEvents: 'none',
      limitCallbacks: true,
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
        // CRITICAL FIX: Force all content to be visible immediately
        '& *': {
          opacity: '1 !important',
          transform: 'none !important',
          visibility: 'visible !important',
        },
      }}
    >
      <AppSidebar items={sidebarItems} />
      <ThemeToggle />

      {/* Content Sections */}
      <Box
        sx={{
          width: '100%',
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
          overflow: 'visible',
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

