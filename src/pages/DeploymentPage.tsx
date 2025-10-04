import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { AppSidebar, Footer } from '../components/layout';
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
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DeploymentPage: React.FC = () => {
  useEffect(() => {
    // Refresh ScrollTrigger on mount to ensure all animations work
    ScrollTrigger.refresh();
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #0a0e2e 0%, #0d1842 50%, #0a0e2e 100%)',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      <AppSidebar items={sidebarItems} />

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
      <Footer />
    </Box>
  );
};

export default DeploymentPage;

