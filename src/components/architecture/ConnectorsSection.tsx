import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Card, CardContent, Chip } from '@mui/material';
import { 
  Cable, 
  Storage, 
  Description, 
  CloudUpload,
  Timeline,
  Speed,
  Sync,
  CheckCircle,
} from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

gsap.registerPlugin(ScrollTrigger);

const connectorTypes = [
  {
    title: 'Live Systems',
    subtitle: 'OPC-UA for real-time signals',
    description: 'Stream live data directly from OPC-UA servers. Always answer with the latest, most relevant information.',
    icon: Cable,
    color: { light: '#3B82F6', dark: '#60A5FA' },
    features: [
      'Real-time data streaming',
      'Secure OPC-UA connections',
      'Automatic signal discovery',
      'Live process monitoring'
    ],
  },
  {
    title: 'Databases',
    subtitle: 'SQL, historians, structured process data',
    description: 'Connect to historians, SQL databases, and structured data sources for comprehensive process insights.',
    icon: Storage,
    color: { light: '#10B981', dark: '#34D399' },
    features: [
      'Historical data access',
      'SQL database integration',
      'Process historian support',
      'Trend analysis capabilities'
    ],
  },
  {
    title: 'Files',
    subtitle: 'Excel, CSV, custom formats',
    description: 'Import operational data from spreadsheets, reports, and custom file formats to enrich process knowledge.',
    icon: Description,
    color: { light: '#F59E0B', dark: '#FBBF24' },
    features: [
      'Excel file processing',
      'CSV data import',
      'Custom format support',
      'Automated data parsing'
    ],
  },
  {
    title: 'Outputs',
    subtitle: 'Export reports, send alerts, write values back',
    description: 'Export insights as reports, send automated alerts, and write control values back to your systems.',
    icon: CloudUpload,
    color: { light: '#EC4899', dark: '#F472B6' },
    features: [
      'Report generation',
      'Alert notifications',
      'Value write-back',
      'Integration workflows'
    ],
  },
];

const benefits = [
  {
    title: 'Real-time Access',
    description: 'Stream live data directly from OPC-UA',
    icon: Speed,
  },
  {
    title: 'Historical Context',
    description: 'Pull historical data for trends and context',
    icon: Timeline,
  },
  {
    title: 'Seamless Integration',
    description: 'Fit your world without replacing existing systems',
    icon: Sync,
  },
];

export const ConnectorsSection: React.FC = () => {
  const { isDark } = useThemeMode();
  const { 
    containerMaxWidth, 
    containerPadding,
    h2FontSize,
    bodyFontSize,
    sectionPadding 
  } = useResponsiveLayout();

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const benefitsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current && headerRef.current.children.length > 0) {
        gsap.fromTo(
          headerRef.current.children,
          {
            y: 60,
            scale: 0.95,
            opacity: 0,
          },
          {
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.7,
            stagger: 0.2,
            ease: 'back.out(1.4)',
          }
        );
      }

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            {
              y: 80,
              scale: 0.95,
              opacity: 0,
            },
            {
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
              y: 0,
              scale: 1,
              opacity: 1,
              duration: 0.7,
              delay: index * 0.12,
              ease: 'back.out(1.4)',
            }
          );
        }
      });

      // Benefits animation
      if (benefitsRef.current && benefitsRef.current.children.length > 0) {
        gsap.fromTo(
          benefitsRef.current.children,
          {
            y: 50,
            scale: 0.9,
            opacity: 0,
          },
          {
            scrollTrigger: {
              trigger: benefitsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.12,
            ease: 'back.out(1.4)',
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      component="section"
      data-section-theme={isDark ? 'dark' : 'light'}
      sx={{
        py: sectionPadding,
        background: 'transparent',
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
        {/* Section Header */}
        <Box ref={headerRef} sx={{ textAlign: 'center', mb: { xs: 8, md: 12 } }}>
          <Chip
            label="Data Gateways"
            sx={{
              mb: 3,
              fontSize: '0.875rem',
              fontWeight: 600,
              background: isDark
                ? 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)'
                : 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
              color: 'white',
              px: 2,
            }}
          />
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
            Connectors — the data gateways
          </Typography>
          <Typography
            sx={{
              fontSize: bodyFontSize,
              color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#64748B',
              maxWidth: '700px',
              mx: 'auto',
              lineHeight: 1.7,
            }}
          >
            Connectors make ChatAPC fit your world — without replacing existing systems
          </Typography>
        </Box>

        {/* Connector Cards Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: { xs: 4, md: 6 },
            mb: { xs: 8, md: 12 },
          }}
        >
          {connectorTypes.map((connector, index) => {
            const IconComponent = connector.icon;
            return (
              <Card
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el as HTMLDivElement;
                }}
                elevation={0}
                sx={{
                  background: isDark
                    ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.6) 100%)'
                    : 'rgba(255, 255, 255, 0.94)',
                  backdropFilter: 'blur(24px)',
                  border: isDark
                    ? `1px solid rgba(71, 85, 105, 0.3)`
                    : `1px solid rgba(226, 232, 240, 0.8)`,
                  borderRadius: 3,
                  height: '100%',
                  transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                  '&:hover': {
                    transform: 'translateY(-10px) scale(1.02)',
                    boxShadow: isDark
                      ? `0 30px 60px ${connector.color.dark}25`
                      : `0 30px 60px ${connector.color.light}20`,
                    borderColor: connector.color[isDark ? 'dark' : 'light'],
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  {/* Icon */}
                  <Box
                    sx={{
                      width: 72,
                      height: 72,
                      borderRadius: 2,
                      background: `${connector.color[isDark ? 'dark' : 'light']}1A`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                    }}
                  >
                    <IconComponent
                      sx={{
                        fontSize: 36,
                        color: connector.color[isDark ? 'dark' : 'light'],
                      }}
                    />
                  </Box>

                  {/* Title & Subtitle */}
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: isDark ? '#FFFFFF' : '#0F172A',
                      mb: 1,
                      lineHeight: 1.3,
                    }}
                  >
                    {connector.title}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: connector.color[isDark ? 'dark' : 'light'],
                      mb: 2,
                    }}
                  >
                    {connector.subtitle}
                  </Typography>

                  {/* Description */}
                  <Typography
                    sx={{
                      fontSize: '0.95rem',
                      color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#475569',
                      lineHeight: 1.6,
                      mb: 3,
                    }}
                  >
                    {connector.description}
                  </Typography>

                  {/* Features List */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                    {connector.features.map((feature, featureIndex) => (
                      <Box
                        key={featureIndex}
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 1.5,
                        }}
                      >
                        {/* Use a check icon for each feature instead of a simple dot.  This adds
                            clarity and modernity to the list while tying the icon color to the
                            connector’s accent color. */}
                        <CheckCircle
                          sx={{
                            fontSize: 16,
                            mt: '2px',
                            color: connector.color[isDark ? 'dark' : 'light'],
                            flexShrink: 0,
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: '0.9rem',
                            color: isDark ? 'rgba(255, 255, 255, 0.75)' : '#475569',
                            lineHeight: 1.5,
                          }}
                        >
                          {feature}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Box>

        {/* Benefits Section */}
        <Box
          ref={benefitsRef}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: { xs: 4, md: 6 },
            mt: { xs: 6, md: 8 },
          }}
        >
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <Box
                key={index}
                sx={{
                  textAlign: 'center',
                  p: 3,
                  background: isDark
                    ? 'rgba(30, 41, 59, 0.4)'
                    : 'rgba(248, 250, 252, 0.9)',
                  borderRadius: 3,
                  border: isDark
                    ? '1px solid rgba(71, 85, 105, 0.25)'
                    : '1px solid rgba(226, 232, 240, 0.6)',
                  backdropFilter: 'blur(16px)',
                  transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                  '&:hover': {
                    transform: 'translateY(-6px) scale(1.02)',
                    boxShadow: isDark
                      ? '0 20px 40px rgba(0, 0, 0, 0.3)'
                      : '0 20px 40px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: isDark
                      ? 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)'
                      : 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <IconComponent sx={{ fontSize: 28, color: 'white' }} />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    mb: 1,
                  }}
                >
                  {benefit.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.95rem',
                    color: isDark ? 'rgba(255, 255, 255, 0.75)' : '#475569',
                    lineHeight: 1.5,
                  }}
                >
                  {benefit.description}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};