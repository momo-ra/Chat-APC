import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

gsap.registerPlugin(ScrollTrigger);

const IntegrationSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sourcesRef = useRef<HTMLDivElement>(null);
  const outputsRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();
  const {
    containerMaxWidth,
    containerPadding,
    h2FontSize,
    h4FontSize,
    bodyFontSize,
    sectionPadding,
  } = useResponsiveLayout();

  const sourceColor = { light: '#3B82F6', dark: '#60A5FA' };
  const outputColor = { light: '#EC4899', dark: '#F472B6' };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      }

      [sourcesRef, outputsRef].forEach((ref, index) => {
        if (ref.current) {
          gsap.from(ref.current, {
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            y: 60,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power2.out',
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isDark]);

  const dataSources = [
    'OPC-UA: Standard industrial protocol connectivity',
    'SQL Databases: Direct integration with existing databases',
    'Excel/CSV: Import spreadsheets and flat files',
    'Custom Connectors: Tailored solutions for proprietary systems',
  ];

  const dataOutputs = [
    'Real-time Alerts: Immediate notifications via email, SMS, or dashboards',
    'Automated Reports: Scheduled insights and performance summaries',
    'Data Exports: Flexible formats for external analysis',
    'Write-back Capability: Direct integration with DCS and databases',
  ];

  return (
    <Box
      ref={sectionRef}
      sx={{
        width: '100%',
        py: sectionPadding,
        position: 'relative',
      }}
    >
      <Container 
        maxWidth="lg"
        sx={{
          maxWidth: containerMaxWidth,
          px: containerPadding,
        }}
      >
        {/* Header */}
        <Box ref={headerRef} sx={{ mb: { xs: 8, md: 10 } }}>
          <Typography
            sx={{
              fontSize: { xs: '0.875rem', md: '1rem' },
              fontWeight: 700,
              color: isDark ? '#60A5FA' : '#3B82F6',
              textTransform: 'uppercase',
              letterSpacing: 2,
              mb: 2,
            }}
          >
            Integration Ecosystem
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: h2FontSize,
              fontWeight: 700,
              color: isDark ? '#FFFFFF' : '#0F172A',
              mb: 3,
              lineHeight: 1.2,
            }}
          >
            Comprehensive Integration Ecosystem
          </Typography>
          <Typography
            sx={{
              fontSize: bodyFontSize,
              color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#64748B',
              lineHeight: 1.7,
              maxWidth: 800,
            }}
          >
            Future-Ready Architecture: Built-in support for emerging third-party real-time databases and external applications ensures your investment remains valuable as technology evolves.
          </Typography>
        </Box>

        {/* Two Column Layout */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: { xs: 6, md: 8 },
          }}
        >
          {/* Data Sources */}
          <Box ref={sourcesRef}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 2,
                background: sourceColor[isDark ? 'dark' : 'light'],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3,
                boxShadow: `0 8px 24px ${sourceColor[isDark ? 'dark' : 'light']}30`,
              }}
            >
              <Typography
                sx={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                }}
              >
                IN
              </Typography>
            </Box>

            <Typography
              variant="h4"
              sx={{
                fontSize: h4FontSize,
                fontWeight: 700,
                color: isDark ? '#FFFFFF' : '#0F172A',
                mb: 4,
              }}
            >
              Data Sources
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {dataSources.map((source, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    p: 2,
                    borderRadius: 0,
                    borderLeft: isDark ? '2px solid rgba(71, 85, 105, 0.3)' : '2px solid rgba(226, 232, 240, 1)',
                    background: 'transparent',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      pl: 3,
                      borderLeftColor: sourceColor[isDark ? 'dark' : 'light'],
                      borderLeftWidth: '3px',
                      background: isDark
                        ? `linear-gradient(90deg, ${sourceColor.dark}10 0%, transparent 100%)`
                        : `linear-gradient(90deg, ${sourceColor.light}08 0%, transparent 100%)`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      backgroundColor: sourceColor[isDark ? 'dark' : 'light'],
                      flexShrink: 0,
                      mt: 0.75,
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: '1rem',
                      color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#475569',
                      lineHeight: 1.6,
                    }}
                  >
                    {source}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Data Outputs */}
          <Box ref={outputsRef}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 2,
                background: outputColor[isDark ? 'dark' : 'light'],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3,
                boxShadow: `0 8px 24px ${outputColor[isDark ? 'dark' : 'light']}30`,
              }}
            >
              <Typography
                sx={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                }}
              >
                OUT
              </Typography>
            </Box>

            <Typography
              variant="h4"
              sx={{
                fontSize: h4FontSize,
                fontWeight: 700,
                color: isDark ? '#FFFFFF' : '#0F172A',
                mb: 4,
              }}
            >
              Data Outputs
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {dataOutputs.map((output, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    p: 2,
                    borderRadius: 0,
                    borderLeft: isDark ? '2px solid rgba(71, 85, 105, 0.3)' : '2px solid rgba(226, 232, 240, 1)',
                    background: 'transparent',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      pl: 3,
                      borderLeftColor: outputColor[isDark ? 'dark' : 'light'],
                      borderLeftWidth: '3px',
                      background: isDark
                        ? `linear-gradient(90deg, ${outputColor.dark}10 0%, transparent 100%)`
                        : `linear-gradient(90deg, ${outputColor.light}08 0%, transparent 100%)`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      backgroundColor: outputColor[isDark ? 'dark' : 'light'],
                      flexShrink: 0,
                      mt: 0.75,
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: '1rem',
                      color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#475569',
                      lineHeight: 1.6,
                    }}
                  >
                    {output}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default IntegrationSection;