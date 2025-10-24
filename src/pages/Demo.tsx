import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { AppSidebar, Footer, ThemeToggle } from '../components/layout';
import { RequestDemoForm } from '../components/demo';
import { sidebarItems } from '../data/layout/sidebarData';
import { useThemeMode } from '../contexts/ThemeContext';
import { getHomeBackground } from '../components/shared/pageBackgrounds';
import { SEOHead } from '../components/SEO/SEOHead';
import { usePageTitle } from '../hooks/usePageTitle';

const Demo: React.FC = () => {
  usePageTitle({
    title: 'Request a Demo',
    description:
      'Schedule a tailored ChatAPC demo to see how conversational AI accelerates industrial troubleshooting, improves plant stability, and empowers your team.',
  });

  const { isDark } = useThemeMode();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title="Request a Live ChatAPC Demo"
        description="Tell us about your operations and schedule a personalized ChatAPC demo. See how conversational AI elevates industrial process control."
        url="https://chatapc.ai/demo"
        keywords="ChatAPC demo, request demo, industrial AI demo, process control demo"
        breadcrumbs={[
          { name: 'Home', url: 'https://chatapc.ai/' },
          { name: 'Request Demo', url: 'https://chatapc.ai/demo' },
        ]}
      />

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

        <Box
          id="main-content"
          component="main"
          role="main"
          sx={{
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <RequestDemoForm />

          <Box component="footer" role="contentinfo">
            <Footer />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Demo;
