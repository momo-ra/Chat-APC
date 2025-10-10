import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Card, CardContent, Chip } from '@mui/material';
import { 
  Cable, 
  Storage, 
  Description, 
  CloudUpload,
  Timeline,
  Speed,
  Sync
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
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
        });
      }

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
            y: 60,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power2.out',
          });
        }
      });

      // Benefits animation
      if (benefitsRef.current) {
        gsap.from(benefitsRef.current.children, {
          scrollTrigger: {
            trigger: benefitsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        py: sectionPadding,
        background: isDark
          ? 'linear-gradient(180deg, #1A1F2E 0%, #0F1419 50%, #1A1F2E 100%)'
          : 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 50%, #F8FAFC 100%)',
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
                    : 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(20px)',
                  border: isDark 
                    ? `1px solid rgba(71, 85, 105, 0.3)`
                    : `1px solid rgba(226, 232, 240, 0.8)`,
                  borderRadius: 4,
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: isDark
                      ? `0 20px 60px ${connector.color.dark}20`
                      : `0 20px 60px ${connector.color.light}15`,
                    borderColor: connector.color[isDark ? 'dark' : 'light'],
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  {/* Icon */}
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: 3,
                      background: `${connector.color[isDark ? 'dark' : 'light']}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                    }}
                  >
                    <IconComponent
                      sx={{
                        fontSize: 32,
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
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {connector.features.map((feature, featureIndex) => (
                      <Box
                        key={featureIndex}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                        }}
                      >
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            backgroundColor: connector.color[isDark ? 'dark' : 'light'],
                            flexShrink: 0,
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: '0.875rem',
                            color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#64748B',
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
                    ? 'rgba(30, 41, 59, 0.3)'
                    : 'rgba(248, 250, 252, 0.8)',
                  borderRadius: 3,
                  border: isDark 
                    ? '1px solid rgba(71, 85, 105, 0.2)'
                    : '1px solid rgba(226, 232, 240, 0.6)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
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
                  <IconComponent sx={{ fontSize: 24, color: 'white' }} />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    mb: 1,
                  }}
                >
                  {benefit.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.875rem',
                    color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#64748B',
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