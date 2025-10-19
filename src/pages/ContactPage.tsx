import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { AppSidebar, Footer, ThemeToggle } from '../components/layout';
import { ContactFormSection, ContactMapSection, ContactInfoSection } from '../components/contact';
import { sidebarItems } from '../data/layout/sidebarData';
import { useThemeMode } from '../contexts/ThemeContext';
import { getHomeBackground } from '../components/shared/pageBackgrounds';
import { usePageTitle } from '../hooks/usePageTitle';
import { SEOHead } from '../components/SEO/SEOHead';

const ContactPage: React.FC = () => {
  usePageTitle({
    title: 'Contact Us',
    description: 'Contact Alpha Process Control for expert consultation on industrial AI solutions, ChatAPC implementation, and process optimization services. Located in Houston, Texas.',
  });
  const { isDark } = useThemeMode();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  <SEOHead
    title="Contact Us"
    description="Contact Alpha Process Control for expert consultation on industrial AI solutions, ChatAPC implementation, and process optimization services. Located in Houston, Texas."
  />
  return (
    <>
      {/* Accessibility Skip Link */}
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
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Contact Form - First as requested */}
          <ContactFormSection />
          
          {/* Impressive Map Section */}
          <ContactMapSection />
          
          {/* Contact Info */}
          {/* <ContactInfoSection /> */}
          
          {/* Footer */}
          <Footer />
        </Box>
      </Box>
    </>
  );
};

export default ContactPage;