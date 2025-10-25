import React, { useEffect } from 'react';
import { Box, Container, Divider, Typography } from '@mui/material';
import { AppSidebar, Footer, ThemeToggle } from '../components/layout';
import { sidebarItems } from '../data/layout/sidebarData';
import { useThemeMode } from '../contexts/ThemeContext';
import { getHomeBackground } from '../components/shared/pageBackgrounds';
import { usePageTitle } from '../hooks/usePageTitle';
import { SEOHead } from '../components/SEO/SEOHead';

const termsSections = [
  // ... same as before ...
  {
    title: '1. Use of Services',
    subsections: [
      {
        subtitle: '1.1 Eligibility',
        content: [
          'You must be at least 16 years old (or the age of digital consent in your jurisdiction) to use our Services.',
          'By using ChatAPC.ai, you confirm that you have the legal capacity to enter into these Terms.',
        ],
      },
      {
        subtitle: '1.2 Permitted Use',
        content: [
          'You agree to use ChatAPC.ai only for lawful purposes and in compliance with these Terms.',
          'You may not:',
        ],
        list: [
          'Attempt to gain unauthorized access to our systems or data.',
          'Use the Services to transmit harmful, unlawful, or infringing content.',
          'Reverse-engineer, copy, or distribute any part of our software or models.',
          'Use ChatAPC.ai in a way that could damage or impair our systems or interfere with other users.',
        ],
      },
    ],
  },
  // ... other entries unchanged ...
  {
    title: '2. Accounts and Access',
    content: [
      'Certain features may require you to create an account or provide contact information (e.g., for demos). You agree to:',
    ],
    list: [
      'Provide accurate, current, and complete information.',
      'Maintain the confidentiality of your credentials.',
      'Notify us immediately of unauthorized use or access.',
    ],
    contentAfterList: [
      'We reserve the right to suspend or terminate your access if we detect misuse or violation of these Terms.',
    ]
  },
  {
    title: '3. Intellectual Property',
    content: [
      'All content and materials available on ChatAPC.ai, including software, algorithms, design, text, graphics, logos, and trademarks, are the property of Alpha Process Control S.r.l. or its licensors.',
      'You may not reproduce, modify, or create derivative works based on any part of ChatAPC.ai without our prior written consent.',
      'All rights not expressly granted in these Terms are reserved.',
    ],
  },
  {
    title: '4. AI Content and Limitations',
    content: [
      'ChatAPC.ai uses artificial intelligence to generate responses, insights, and information. While we strive for accuracy and reliability, you acknowledge that:',
    ],
    list: [
      'AI-generated outputs may contain errors or inaccuracies.',
      'Outputs are provided for informational purposes only and should not be used as professional, legal, engineering, or financial advice.',
      'You remain responsible for verifying and validating any decisions made based on AI-generated information.',
      'We are not liable for damages arising from reliance on automated outputs.',
    ],
  },
  {
    title: '5. Privacy and Data Protection',
    content: [
      'Your use of ChatAPC.ai is also governed by our Privacy Policy, which explains how we collect, use, and protect personal data.',
      'By using our Services, you consent to the processing of data as described in the Privacy Policy.',
      'We comply with the EU General Data Protection Regulation (GDPR) and applicable privacy laws.',
    ],
  },
  {
    title: '6. Availability and Service Changes',
    content: [
      'We aim to provide continuous availability of ChatAPC.ai, but we do not guarantee uninterrupted service.',
      'We may modify, suspend, or discontinue the Website or any part of the Services at any time without prior notice.',
      'We are not responsible for delays, interruptions, or data loss caused by:',
    ],
    list: [
      'Internet service providers, hosting partners (e.g., Cloudflare), or analytics tools (e.g., Google).',
      'Maintenance, updates, or unforeseen outages.',
    ],
  },
  {
    title: '7. Third-Party Services',
    content: [
      'ChatAPC.ai may integrate or link to third-party services (e.g., Google Analytics, Cloudflare).',
      'These are governed by their own terms and privacy policies.',
      'We are not responsible for the content, policies, or actions of third-party services.',
    ],
  },
  {
    title: '8. Disclaimers',
    content: [
      'The Services are provided “as is” and “as available” without warranties of any kind, either express or implied. We disclaim all warranties, including but not limited to:',
    ],
    list: [
      'Accuracy, completeness, or reliability of information',
      'Fitness for a particular purpose',
      'Uninterrupted or error-free operation',
    ],
    contentAfterList: [
      'Use of ChatAPC.ai is at your own risk.',
    ],
  },
  {
    title: '9. Limitation of Liability',
    content: [
      'To the fullest extent permitted by law, Alpha Process Control S.r.l. and its affiliates, employees, and partners shall not be liable for:',
    ],
    list: [
      'Any indirect, incidental, consequential, or punitive damages',
      'Loss of data, profits, or goodwill',
      'Damages resulting from your use or inability to use the Services',
    ],
    contentAfterList: [
      'Our total liability shall not exceed the amount you paid (if any) for accessing the Services in the preceding 12 months.',
    ]
  },
  {
    title: '10. Indemnification',
    content: [
      'You agree to indemnify and hold harmless Alpha Process Control S.r.l., its directors, officers, and employees from and against any claims, damages, liabilities, or expenses arising from:',
    ],
    list: [
      'Your use or misuse of the Services',
      'Violation of these Terms',
      'Infringement of third-party rights or laws',
    ],
  },
  {
    title: '11. Termination',
    content: [
      'We may suspend or terminate your access to the Services at any time, with or without notice, for conduct that we believe violates these Terms or is harmful to others.',
      'Upon termination, your right to use ChatAPC.ai ceases immediately.',
      'Sections regarding intellectual property, disclaimers, and limitations of liability will continue to apply.'
    ],
  },
  {
    title: '12. Governing Law and Jurisdiction',
    content: [
      'These Terms are governed by the laws of Italy and applicable European Union regulations. Any disputes arising under these Terms shall be resolved in the Courts of Pisa, Italy, unless otherwise required by mandatory law.',
    ],
  },
  {
    title: '13. Changes to the Terms',
    content: [
      'We may update these Terms periodically to reflect legal or technical changes.',
      'The updated version will be posted at https://chatapc.ai/terms, with a new “Effective Date.”',
      'Continued use of the Services after such changes constitutes acceptance of the revised Terms.',
    ]
  },
  {
    title: '14. Contact Information',
    content: [
      'For questions or concerns regarding these Terms, please contact:',
      'Alpha Process Control S.r.l.\nVia Impastato 1, 56122 Pisa, Italy\nEmail: privacy@chatapc.ai\nWebsite: https://chatapc.ai'
    ]
  }
];

const getDarkTextColor = (isDark: boolean) =>
  isDark ? '#FFF' : 'inherit';
const getDarkSecondaryColor = (isDark: boolean, theme: any) =>
  isDark ? 'rgba(255,255,255,0.70)' : (theme?.palette?.text?.secondary || 'text.secondary');

const TermsPage: React.FC = () => {
  usePageTitle({
    title: 'Terms of Service',
    description:
      'Read the official Terms of Service for ChatAPC.ai, including user obligations, data privacy, AI limitations, legal rights, and company contact.',
  });

  const { isDark } = useThemeMode();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title="Terms of Service - ChatAPC | Alpha Process Control"
        description="The latest Terms of Service governing your use of ChatAPC.ai, including eligibility, data protection, permitted use, AI outputs, liability, and more."
        url="https://chatapc.ai/terms"
        keywords="Terms of Service, ChatAPC, Alpha Process Control, Privacy, AI legal, GDPR, intellectual property, limitation of liability"
        breadcrumbs={[
          { name: 'Home', url: 'https://chatapc.ai/' },
          { name: 'Terms of Service', url: 'https://chatapc.ai/terms' },
        ]}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'TermsOfService',
          name: 'ChatAPC Terms of Service',
          url: 'https://chatapc.ai/terms',
          provider: {
            '@type': 'Organization',
            name: 'Alpha Process Control S.r.l.',
            url: 'https://chatapc.ai',
          },
          inLanguage: 'en',
          datePublished: '2025-10-24',
          dateModified: '2025-10-24',
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
              color: isDark ? '#fff' : 'text.primary',
              'h1, h2, h3, h4, h5, h6': {
                color: isDark ? '#fff' : undefined,
              },
            }}
          >
            <Box component="header" sx={{ mb: 6 }}>
              <Typography variant="overline" color="primary.main" sx={{ fontWeight: 600 }}>
                Legal
              </Typography>
              <Typography variant="h2" component="h1" sx={{ mt: 1, color: isDark ? '#fff' : undefined }}>
                Terms of Service
              </Typography>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mt: 1, color: isDark ? 'rgba(255,255,255,0.7)' : undefined }}
              >
                Effective Date: October 24, 2025 &nbsp;&nbsp;|&nbsp;&nbsp;Last Updated: October 24, 2025
              </Typography>
              <Typography
                variant="body1"
                sx={{ mt: 3, color: isDark ? '#fff' : undefined }}
              >
                Welcome to ChatAPC.ai (“we”, “our”, “us”), operated by Alpha Process Control S.r.l., located at Via Impastato 1, 56122 Pisa, Italy.
                <br />
                By accessing or using our website <strong>https://chatapc.ai</strong> (“Website”) and related services (“Services”), you agree to comply with and be bound by these Terms of Service (“Terms”).
                <br />
                If you do not agree, please do not use our Website or Services.
              </Typography>
            </Box>

            {termsSections.map((section, idx) => (
              <Box
                key={section.title}
                component="section"
                aria-labelledby={`terms-section-${idx + 1}`}
                sx={{ mb: idx === termsSections.length - 1 ? 0 : 6 }}
              >
                <Typography
                  id={`terms-section-${idx + 1}`}
                  variant="h5"
                  component="h2"
                  sx={{ fontWeight: 600, color: isDark ? '#fff' : undefined }}
                >
                  {section.title}
                </Typography>

                {/* If subsections exist (for section 1), render them */}
                {'subsections' in section &&
                  Array.isArray(section.subsections) &&
                  section.subsections.map((subsection, subIdx) => (
                    <Box key={subsection.subtitle} sx={{ mt: subIdx === 0 ? 2 : 3 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 500, color: isDark ? '#fff' : undefined }}
                      >
                        {subsection.subtitle}
                      </Typography>
                      {subsection.content.map((paragraph, pIdx) => (
                        <Typography
                          key={pIdx}
                          variant="body1"
                          sx={{
                            mt: 1,
                            whiteSpace: paragraph.includes('\n') ? 'pre-line' : 'normal',
                            color: isDark ? '#fff' : undefined,
                          }}
                        >
                          {paragraph}
                        </Typography>
                      ))}
                      {'list' in subsection &&
                        Array.isArray(subsection.list) && (
                          <Box
                            component="ul"
                            sx={{
                              mt: 1,
                              pl: 3,
                              color: isDark ? 'rgba(255,255,255,0.7)' : 'text.secondary',
                            }}
                          >
                            {subsection.list.map((item, itemIdx) => (
                              <Typography
                                key={itemIdx}
                                component="li"
                                variant="body1"
                                sx={{
                                  mb: 0.5,
                                  color: isDark ? 'rgba(255,255,255,0.82)' : 'text.secondary',
                                }}
                              >
                                {item}
                              </Typography>
                            ))}
                          </Box>
                        )}
                    </Box>
                  ))}

                {/* Main content paragraphs */}
                {'content' in section &&
                  section.content.map((paragraph, pIdx) => (
                    <Typography
                      key={pIdx}
                      variant="body1"
                      sx={{
                        mt: pIdx === 0 ? 2 : 1.5,
                        whiteSpace: paragraph.includes('\n') ? 'pre-line' : 'normal',
                        color: isDark ? '#fff' : undefined,
                      }}
                    >
                      {paragraph}
                    </Typography>
                  ))}

                {/* Any lists directly under a section */}
                {'list' in section && Array.isArray(section.list) && (
                  <Box
                    component="ul"
                    sx={{
                      mt: 1.5,
                      pl: 3,
                      color: isDark ? 'rgba(255,255,255,0.7)' : 'text.secondary',
                    }}
                  >
                    {section.list.map((item, liIdx) => (
                      <Typography
                        key={liIdx}
                        component="li"
                        variant="body1"
                        sx={{
                          mb: 0.5,
                          color: isDark ? 'rgba(255,255,255,0.82)' : 'text.secondary',
                        }}
                      >
                        {item}
                      </Typography>
                    ))}
                  </Box>
                )}

                {/* Any contentAfterList */}
                {'contentAfterList' in section &&
                  Array.isArray(section.contentAfterList) &&
                  section.contentAfterList.map((paragraph, idx2) => (
                    <Typography
                      key={idx2}
                      variant="body1"
                      sx={{
                        mt: 1.5,
                        whiteSpace: paragraph.includes('\n') ? 'pre-line' : 'normal',
                        color: isDark ? '#fff' : undefined,
                      }}
                    >
                      {paragraph}
                    </Typography>
                  ))}

                {/* Divider except on last section */}
                {idx !== termsSections.length - 1 && (
                  <Divider
                    sx={{
                      mt: 4,
                      borderColor: isDark ? 'rgba(255,255,255,0.12)' : undefined,
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

export default TermsPage;
