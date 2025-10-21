import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { AppSidebar, Footer, ThemeToggle } from '../components/layout';
import {
  BlogHeroSection,
  BlogCategoriesSection,
  BlogFeaturedSection,
  BlogListSection,
  BlogSubscribeSection,
} from '../components/blog';
import { sidebarItems } from '../data/layout/sidebarData';
import { useThemeMode } from '../contexts/ThemeContext';
import { getHomeBackground } from '../components/shared/pageBackgrounds';
import { usePageTitle } from '../hooks/usePageTitle';
import { SEOHead } from '../components/SEO/SEOHead';

const BlogPage: React.FC = () => {
  const { isDark } = useThemeMode();

  usePageTitle({
    title: 'Blog',
    description: 'Explore the latest insights on industrial AI, process control optimization, and ChatAPC features from Alpha Process Control experts.',
  });

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead
        title="Blog - ChatAPC | Industrial AI & Process Control Insights"
        description="Explore the latest insights on industrial AI, process control optimization, and ChatAPC (Chat APC) features from Alpha Process Control experts."
        url="https://chatapc.ai/resources/blog"
        keywords="ChatAPC blog, Chat APC insights, industrial AI articles, process control tips, automation insights"
        breadcrumbs={[
          { name: 'Home', url: 'https://chatapc.ai/' },
          { name: 'Blog', url: 'https://chatapc.ai/resources/blog' }
        ]}
        schema={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "ChatAPC Blog",
          "description": "Latest insights on industrial AI, process control, and ChatAPC platform",
          "url": "https://chatapc.ai/resources/blog",
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
          {/* Blog Sections */}
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
            <BlogHeroSection />
            {/* <BlogCategoriesSection /> */}
            {/* <BlogFeaturedSection /> */}
            <BlogListSection />
            <BlogSubscribeSection />
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

export default BlogPage;