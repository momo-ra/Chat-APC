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
    description: 'Contact Alpha Process Control for expert consultation on industrial AI solutions, ChatAPC implementation, and process optimization services.',
  });
  
  const { isDark } = useThemeMode();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead
        title="Contact Us - Get Started with ChatAPC | Alpha Process Control"
        description="Contact Alpha Process Control for expert consultation on industrial AI solutions, ChatAPC (Chat APC) implementation, and process optimization services."
        url="https://chatapc.ai/company/contact"
        keywords="contact ChatAPC, Chat APC contact, Alpha Process Control contact, schedule demo, process control consultation"
        breadcrumbs={[
          { name: 'Home', url: 'https://chatapc.ai/' },
          { name: 'Contact Us', url: 'https://chatapc.ai/company/contact' }
        ]}
        schema={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Alpha Process Control",
          "description": "Get in touch with Alpha Process Control for ChatAPC consultation and implementation",
          "url": "https://chatapc.ai/company/contact",
          "mainEntity": {
            "@type": "Organization",
            "name": "Alpha Process Control",
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "Customer Service",
              "email": "info@chatapc.ai",
              "telephone": "+39-050-6201704",
              "availableLanguage": ["English"]
            }
          }
        }}
      />

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
          role="main"
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
          <Box component="footer" role="contentinfo">
            <Footer />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ContactPage;