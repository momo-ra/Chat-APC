import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { AppSidebar, Footer, ThemeToggle } from '../components/layout';
import { ContactFormSection, ContactMapSection, ContactInfoSection } from '../components/contact';
import { sidebarItems } from '../data/layout/sidebarData';
import { useThemeMode } from '../contexts/ThemeContext';

const ContactPage: React.FC = () => {
  const { isDark } = useThemeMode();

  useEffect(() => {
    document.title = 'Contact Us - Alpha Process Control | Industrial AI Solutions';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Contact Alpha Process Control for expert consultation on industrial AI solutions, ChatAPC implementation, and process optimization services. Located in Houston, Texas.');
    }
    window.scrollTo(0, 0);
  }, []);

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
          background: isDark
            ? 'linear-gradient(135deg, #0F1419 0%, #1A202C 50%, #0F1419 100%)'
            : 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 50%, #FFFFFF 100%)',
          position: 'relative',
          overflow: 'visible',
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
          <ContactInfoSection />
          
          {/* Footer */}
          <Footer />
        </Box>
      </Box>
    </>
  );
};

export default ContactPage;