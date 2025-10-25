import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { AppSidebar, Footer, ThemeToggle } from '../components/layout';
import { sidebarItems } from '../data/layout/sidebarData';
import { useThemeMode } from '../contexts/ThemeContext';
import { getHomeBackground } from '../components/shared/pageBackgrounds';
import { usePageTitle } from '../hooks/usePageTitle';
import { SEOHead } from '../components/SEO/SEOHead';
import { loadScript } from '../utils/loadScript';
import {
  UserTourHeroSection,
  UserTourExperienceSection,
  UserTourAccessDialog,
  UserTourFullscreenDialog,
} from '../components/user-tour';

const STORYLANE_SCRIPT_URL = 'https://js.storylane.io/js/v2/storylane.js';
const STORYLANE_SCRIPT_ID = 'storylane-embed-script';
const ACCESS_STORAGE_KEY = 'chatapc-storylane-access-granted';

const UserTourPage: React.FC = () => {
  usePageTitle({
    title: 'Interactive Product Tour',
    description:
      'Experience ChatAPC through an interactive Storylane tour that walks you through the platform as if you were using it live.',
  });

  const { isDark } = useThemeMode();

  const [hasAccess, setHasAccess] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(ACCESS_STORAGE_KEY) === 'true';
  });
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState<string | null>(null);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [showAccessDialog, setShowAccessDialog] = useState(!hasAccess);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // حمل السكريبت دايماً بغض النظر عن الـ access
    let isMounted = true;

    loadScript(STORYLANE_SCRIPT_URL, STORYLANE_SCRIPT_ID)
      .then(() => {
        if (isMounted) setScriptLoaded(true);
      })
      .catch((error) => {
        if (isMounted) setScriptError(error.message);
      });

    return () => {
      isMounted = false;
    };
  }, []); // بدون dependency على hasAccess

  const handleAccessGranted = () => {
    sessionStorage.setItem(ACCESS_STORAGE_KEY, 'true');
    setHasAccess(true);
    setShowAccessDialog(false);
  };

  const headerPrimaryColor = isDark ? 'rgba(147, 197, 253, 1)' : 'rgba(37, 99, 235, 1)';

  const seo = (
    <SEOHead
      title="Interactive Product Tour - ChatAPC | Alpha Process Control"
      description="Take a guided Storylane tour of ChatAPC to see how industrial teams use conversational AI to solve advanced process control challenges."
      url="https://chatapc.ai/product/tour"
      keywords="ChatAPC tour, interactive product tour, demo, industrial AI walkthrough"
      breadcrumbs={[
        { name: 'Home', url: 'https://chatapc.ai/' },
        { name: 'Product Tour', url: 'https://chatapc.ai/product/tour' },
      ]}
      schema={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'ChatAPC Interactive Product Tour',
        url: 'https://chatapc.ai/product/tour',
        description:
          'Interactive Storylane tour showcasing the ChatAPC platform and its capabilities for process control teams.',
      }}
    />
  );

  return (
    <>
      {seo}

      {/* Skip Navigation for Accessibility */}
      <Box
        component="a"
        href="#main-content"
        sx={{
          position: 'absolute',
          left: '-9999px',
          zIndex: 9999,
          padding: '8px 16px',
          backgroundColor: headerPrimaryColor,
          color: isDark ? 'rgba(17, 24, 39, 1)' : 'rgba(255, 255, 255, 1)',
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

        {/* Main Content - بدون blur */}
        <Box
          sx={{
            width: '100%',
            height: 'auto',
            maxWidth: '100vw',
            overflow: 'hidden',
            position: 'relative',
            background: 'transparent',
            // بدون blur - المحتوى يكون واضح دايماً
          }}
        >
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
              <UserTourHeroSection />

              <UserTourExperienceSection
                scriptLoaded={scriptLoaded}
                scriptError={scriptError}
                onOpenFullscreen={() => setIsFullscreenOpen(true)}
              />
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

        {/* Access Dialog */}
        <UserTourAccessDialog open={showAccessDialog} onAccessGranted={handleAccessGranted} />

        {/* Fullscreen Dialog */}
        <UserTourFullscreenDialog
          open={isFullscreenOpen}
          onClose={() => setIsFullscreenOpen(false)}
        />
      </Box>
    </>
  );
};

export default UserTourPage;