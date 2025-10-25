import React, { useEffect } from 'react';
import { Box, Container, Divider, Typography } from '@mui/material';
import { AppSidebar, Footer, ThemeToggle } from '../components/layout';
import { sidebarItems } from '../data/layout/sidebarData';
import { useThemeMode } from '../contexts/ThemeContext';
import { getHomeBackground } from '../components/shared/pageBackgrounds';
import { usePageTitle } from '../hooks/usePageTitle';
import { SEOHead } from '../components/SEO/SEOHead';

const sections = [
  {
    title: '1. Data Controller',
    paragraphs: [
      'Alpha Process Control S.r.l. ("we", "our", "us") is the data controller responsible for processing personal data collected through https://chatapc.ai ("Website").',
      'Alpha Process Control S.r.l.\nVia Impastato 1, 56122 Pisa, Italy\nEmail: privacy@chatapc.ai',
    ],
  },
  {
    title: '2. Information We Collect',
    paragraphs: [
      'We collect information to operate and improve our services. The categories include:',
    ],
    subsections: [
      {
        title: '2.1 Information You Provide Voluntarily',
        paragraphs: [
          'When you contact us, request a demo, or fill out forms, we may collect:',
        ],
        list: [
          'Name, company name, and professional role',
          'Email address and phone number',
          'Project or inquiry details',
          'Any other information you include voluntarily',
        ],
      },
      {
        title: '2.2 Automatically Collected Data',
        paragraphs: [
          'When you visit our website, certain data is collected automatically, such as:',
        ],
        list: [
          'IP address and general location',
          'Browser type, operating system, and device information',
          'Date, time, and duration of visit',
          'Pages viewed and navigation patterns',
        ],
      },
      {
        title: '2.3 Cookies and Tracking Technologies',
        paragraphs: [
          'We use cookies and similar technologies to:',
        ],
        list: [
          'Enhance site functionality and security',
          'Analyze website traffic and performance via Google Analytics',
          'Improve the user experience',
        ],
        paragraphsAfterList: [
          'You can manage or disable cookies through your browser settings. Some parts of the site may not function properly if cookies are disabled.',
        ],
      },
    ],
  },
  {
    title: '3. Purpose and Legal Basis for Processing',
    paragraphs: [
      'We process personal data for the following purposes and under the legal bases set out by Article 6 of the GDPR:',
    ],
    table: {
      headers: ['Purpose', 'Legal Basis'],
      rows: [
        {
          purpose: 'Responding to inquiries and demo requests',
          basis: 'Contractual necessity or consent',
        },
        {
          purpose: 'Improving and maintaining website performance',
          basis: 'Legitimate interest',
        },
        {
          purpose: 'Website analytics via Google Analytics',
          basis: 'Consent',
        },
        {
          purpose: 'Ensuring website security and preventing misuse',
          basis: 'Legitimate interest',
        },
        {
          purpose: 'Compliance with legal obligations',
          basis: 'Legal obligation',
        },
      ],
    },
  },
  {
    title: '4. Google Analytics',
    paragraphs: [
      'We use Google Analytics to analyze website traffic and user interactions. Google Analytics uses cookies to collect data such as IP addresses, browser type, and pages visited.',
      'This information may be processed by Google LLC and its affiliates on servers located within or outside the European Union (EU). You can opt out of Google Analytics tracking by installing the Google Analytics Opt-Out Browser Add-On.',
      'For more information, please read Google\'s Privacy Policy: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a>',
    ],
  },
  {
    title: '5. Hosting and Data Transfers',
    paragraphs: [
      'Our website uses Cloudflare, a global Content Delivery Network (CDN), for performance, reliability, and security.',
      'Website traffic may be routed through Cloudflare data centers around the world, but data storage and primary processing occur within the European Union whenever feasible.',
      'Cloudflare acts as a data processor under the GDPR and provides safeguards for international data transfers through Standard Contractual Clauses (SCCs).',
      'You can review Cloudflare\'s privacy policy here: <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">https://www.cloudflare.com/privacypolicy/</a>',
    ],
  },
  {
    title: '6. Data Sharing',
    paragraphs: [
      'We only share your personal data when necessary, and always under data protection agreements, with:',
    ],
    list: [
      'Service providers (e.g., Cloudflare, Google, hosting, and email services)',
      'Professional advisors (e.g., auditors, lawyers)',
      'Authorities if required by law',
    ],
    paragraphsAfterList: [
      'We never sell or rent your personal data.',
    ],
  },
  {
    title: '7. Data Retention',
    paragraphs: [
      'We retain your personal data only as long as necessary to:',
    ],
    list: [
      'Provide and improve our services',
      'Fulfill the purposes described in this policy',
      'Comply with legal obligations and resolve disputes',
    ],
    paragraphsAfterList: [
      'When no longer needed, your data will be securely deleted or anonymized.',
    ],
  },
  {
    title: '8. Data Security',
    paragraphs: [
      'We apply appropriate technical and organizational measures to protect your data, including:',
    ],
    list: [
      'HTTPS encryption (SSL/TLS)',
      'Cloudflare Web Application Firewall (WAF) and DDoS protection',
      'Access control and secure data storage',
    ],
    paragraphsAfterList: [
      'While we take all reasonable precautions, no method of transmission or storage is 100% secure.',
    ],
  },
  {
    title: '9. Your Rights Under GDPR',
    paragraphs: [
      'You have the following rights regarding your personal data:',
    ],
    list: [
      'Access: Obtain a copy of your personal data',
      'Rectification: Request corrections to inaccurate or incomplete data',
      'Erasure: Request deletion ("right to be forgotten")',
      'Restriction: Limit the processing of your data',
      'Portability: Receive your data in a structured format',
      'Objection: Object to processing based on legitimate interest',
      'Withdrawal of consent: Revoke consent at any time (without affecting prior processing)',
    ],
    paragraphsAfterList: [
      'To exercise any of these rights, please contact privacy@chatapc.ai. We may require identity verification before processing your request.',
    ],
  },
  {
    title: '10. International Data Transfers',
    paragraphs: [
      'Because we use Cloudflare and Google Analytics, your personal data may be transferred to countries outside the EU/EEA.',
      'Such transfers occur only under legally valid mechanisms, including Standard Contractual Clauses (SCCs) approved by the European Commission.',
    ],
  },
  {
    title: '11. Children\'s Privacy',
    paragraphs: [
      'Our website and services are not intended for individuals under 16 years of age.',
      'We do not knowingly collect data from minors. If you believe we have inadvertently collected data from a child, please contact us to request deletion.',
    ],
  },
  {
    title: '12. Changes to This Policy',
    paragraphs: [
      'We may update this Privacy Policy periodically. The updated version will always be available at https://chatapc.ai/privacy, with the new Effective Date clearly indicated.',
      'Your continued use of our website after changes take effect constitutes acceptance of the revised policy.',
    ],
  },
  {
    title: '13. Contact Us',
    paragraphs: [
      'For any questions or requests related to this Privacy Policy, please contact:',
      'Alpha Process Control S.r.l.\nVia Impastato 1, 56122 Pisa, Italy\nEmail: privacy@chatapc.ai\nWebsite: https://chatapc.ai',
    ],
  },
];

const getTextColor = (isDark: boolean) => (isDark ? '#f5f5f7' : 'inherit');
const getSecondaryTextColor = (isDark: boolean) => (isDark ? '#bfc0c2' : 'text.secondary');
const getDividerColor = (isDark: boolean) => (isDark ? '#33353a' : 'divider');
const getHeaderTextColor = (isDark: boolean) => (isDark ? '#f5f5f7' : 'text.primary');

const PrivacyPage: React.FC = () => {
  usePageTitle({
    title: 'Privacy Policy',
    description:
      'Learn how Alpha Process Control uses, protects, and retains personal data collected through the ChatAPC platform, website, and related services.',
  });

  const { isDark } = useThemeMode();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title="Privacy Policy - ChatAPC | Alpha Process Control"
        description="Review the ChatAPC Privacy Policy to understand how Alpha Process Control collects, uses, and safeguards your personal data."
        url="https://chatapc.ai/legal/privacy"
        keywords="ChatAPC privacy policy, data protection, Alpha Process Control privacy, industrial AI privacy"
        breadcrumbs={[
          { name: 'Home', url: 'https://chatapc.ai/' },
          { name: 'Privacy Policy', url: 'https://chatapc.ai/legal/privacy' },
        ]}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'PrivacyPolicy',
          name: 'ChatAPC Privacy Policy',
          url: 'https://chatapc.ai/legal/privacy',
          inLanguage: 'en',
          dateModified: '2025-03-09',
          publisher: {
            '@type': 'Organization',
            name: 'Alpha Process Control S.r.l.',
            url: 'https://chatapc.ai',
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'privacy',
              email: 'privacy@chatapc.ai',
            },
          },
        }}
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
            height: 'auto',
            maxWidth: '100vw',
            overflow: 'hidden',
            position: 'relative',
            background: 'transparent',
          }}
        >
          <Container
            component="article"
            maxWidth="md"
            sx={{
              py: { xs: 8, md: 12 },
              color: getTextColor(isDark),
              transition: 'color 0.3s ease',
            }}
          >
            <Box component="header" sx={{ mb: 6 }}>
              <Typography
                variant="overline"
                color="primary.main"
                sx={{ fontWeight: 600 }}
              >
                Legal
              </Typography>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  mt: 1,
                  color: getHeaderTextColor(isDark),
                  transition: 'color 0.3s ease',
                }}
              >
                Privacy Policy
              </Typography>
              <Typography
                variant="subtitle2"
                color={isDark ? undefined : 'text.secondary'}
                sx={{
                  mt: 1,
                  color: isDark ? getSecondaryTextColor(isDark) : undefined,
                  transition: 'color 0.3s ease',
                }}
              >
                Effective Date: October 24, 2025 &nbsp;&nbsp;|&nbsp;&nbsp;Last Updated: October 24, 2025
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mt: 3,
                  color: getTextColor(isDark),
                  transition: 'color 0.3s ease',
                }}
              >
                Protecting the privacy and security of customer and visitor data is a core commitment of Alpha Process
                Control S.r.l. This Policy outlines the personal data we collect through ChatAPC, the purposes for which
                we process it, and the safeguards we apply. It also explains the choices and rights available to you
                under applicable data protection laws.
              </Typography>
            </Box>

            {sections.map((section, index) => (
              <Box
                key={section.title}
                component="section"
                aria-labelledby={`privacy-section-${index + 1}`}
                sx={{ mb: index === sections.length - 1 ? 0 : 6 }}
              >
                <Typography
                  id={`privacy-section-${index + 1}`}
                  variant="h5"
                  component="h2"
                  sx={{
                    fontWeight: 600,
                    color: getHeaderTextColor(isDark),
                    transition: 'color 0.3s ease',
                  }}
                >
                  {section.title}
                </Typography>

                {section.paragraphs.map((paragraph) => (
                  <Typography
                    key={paragraph.slice(0, 32)}
                    variant="body1"
                    sx={{
                      mt: 2,
                      color: getTextColor(isDark),
                      whiteSpace: paragraph.includes('\n') ? 'pre-line' : 'normal',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {paragraph}
                  </Typography>
                ))}

                {section.list && (
                  <Box component="ul" sx={{ mt: 2, pl: 3 }}>
                    {section.list.map((item) => (
                      <Typography
                        key={item.slice(0, 32)}
                        component="li"
                        variant="body1"
                        sx={{
                          mb: 1,
                          color: getSecondaryTextColor(isDark),
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {item}
                      </Typography>
                    ))}
                  </Box>
                )}

                {section.paragraphsAfterList?.map((paragraph) => (
                  <Typography
                    key={paragraph.slice(0, 32)}
                    variant="body1"
                    sx={{
                      mt: 2,
                      color: getTextColor(isDark),
                      whiteSpace: paragraph.includes('\n') ? 'pre-line' : 'normal',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {paragraph}
                  </Typography>
                ))}

                {index !== sections.length - 1 && (
                  <Divider
                    sx={{
                      mt: 4,
                      borderColor: getDividerColor(isDark),
                      transition: 'border-color 0.3s ease',
                    }}
                  />
                )}
              </Box>
            ))}
          </Container>

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

export default PrivacyPage;
