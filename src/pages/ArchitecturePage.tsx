import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { AppSidebar, Footer, ThemeToggle } from '../components/layout';
import {
  ArchitectureHeroSection,
  ConnectorsSection,
  KnowledgeMapSection,
  AIBrainSection,
  WorkflowExampleSection,
  FinalBenefitsSection,
} from '../components/architecture';
import { sidebarItems } from '../data/layout/sidebarData';
import { useThemeMode } from '../contexts/ThemeContext';
import { getHomeBackground } from '../components/shared/pageBackgrounds';
import { usePageTitle } from '../hooks/usePageTitle';
import { SEOHead } from '../components/SEO/SEOHead';

const ArchitecturePage: React.FC = () => {
  const { isDark } = useThemeMode();
  
  usePageTitle({
    title: 'Architecture',
    description: 'Discover how ChatAPC\'s powerful architecture connects to your plant systems, organizes knowledge, and delivers AI-driven insights through specialized agents.',
  });
  
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* SEO Meta Tags with Breadcrumbs & Schema */}
      <SEOHead
        title="Architecture - ChatAPC | Technical Platform Overview"
        description="Discover how ChatAPC (Chat APC) powerful architecture connects to your plant systems, organizes knowledge, and delivers AI-driven insights through specialized agents."
        url="https://chatapc.ai/product/architecture"
        keywords="ChatAPC architecture, Chat APC platform, process control architecture, AI system design, industrial automation platform"
        breadcrumbs={[
          { name: 'Home', url: 'https://chatapc.ai/' },
          { name: 'Architecture', url: 'https://chatapc.ai/product/architecture' }
        ]}
        schema={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          "headline": "ChatAPC Platform Architecture",
          "description": "Technical overview of ChatAPC's architecture including connectors, knowledge base, and AI agents",
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
          {/* Architecture Sections */}
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
            <ArchitectureHeroSection />
            <ConnectorsSection />
            <KnowledgeMapSection />
            <AIBrainSection />
            <WorkflowExampleSection />
            <FinalBenefitsSection />
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

export default ArchitecturePage;