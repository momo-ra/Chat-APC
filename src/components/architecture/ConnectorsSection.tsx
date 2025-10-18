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
import { 
  themeConfig, 
  getColor, 
  getGradient, 
  getTextColor,
  getCardStyles,
  withOpacity 
} from '../shared/themeConfig';

gsap.registerPlugin(ScrollTrigger);

const getConnectorTypes = (isDark: boolean) => [
  {
    title: 'Live Systems',
    subtitle: 'OPC-UA for real-time signals',
    description: 'Stream live data directly from OPC-UA servers. Always answer with the latest, most relevant information.',
    icon: Cable,
    color: getColor(themeConfig.colors.blue, isDark),
    colorKey: 'blue',
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
    color: getColor(themeConfig.colors.green, isDark),
    colorKey: 'green',
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
    color: getColor(themeConfig.colors.yellow, isDark),
    colorKey: 'yellow',
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
    color: getColor(themeConfig.colors.pink, isDark),
    colorKey: 'pink',
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

  // Get unified theme values
  const { colors, gradients, typography, animations, transitions, borderRadius, shadows } = themeConfig;
  const connectorTypes = getConnectorTypes(isDark);
  const cardStyles = getCardStyles(isDark, 'default');
  const cardHoverStyles = getCardStyles(isDark, 'hover');

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
            ease: animations.easing.bounce,
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
              ease: animations.easing.bounce,
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
            ease: animations.easing.bounce,
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [animations]);

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
              background: getGradient(gradients.blue, isDark),
              color: '#FFFFFF',
              px: 2,
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontSize: h2FontSize,
              fontWeight: typography.h2.weight,
              color: getTextColor('primary', isDark),
              mb: 3,
              lineHeight: typography.h2.lineHeight,
            }}
          >
            Connectors — the data gateways
          </Typography>
          <Typography
            sx={{
              fontSize: bodyFontSize,
              color: getTextColor('secondary', isDark),
              maxWidth: '700px',
              mx: 'auto',
              lineHeight: typography.body.lineHeight,
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
                  background: cardStyles.background,
                  backdropFilter: 'blur(24px)',
                  border: cardStyles.border,
                  borderRadius: borderRadius.lg,
                  height: '100%',
                  transition: transitions.allNormal,
                  '&:hover': {
                    transform: 'translateY(-10px) scale(1.02)',
                    boxShadow: isDark
                      ? `0 30px 60px ${withOpacity(connector.color, 0.15)}`
                      : `0 30px 60px ${withOpacity(connector.color, 0.13)}`,
                    borderColor: connector.color,
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  {/* Icon */}
                  <Box
                    sx={{
                      width: 72,
                      height: 72,
                      borderRadius: borderRadius.sm,
                      background: withOpacity(connector.color, 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                    }}
                  >
                    <IconComponent
                      sx={{
                        fontSize: 36,
                        color: connector.color,
                      }}
                    />
                  </Box>

                  {/* Title & Subtitle */}
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: typography.h5.size,
                      fontWeight: typography.h5.weight,
                      color: getTextColor('primary', isDark),
                      mb: 1,
                      lineHeight: typography.h5.lineHeight,
                    }}
                  >
                    {connector.title}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: connector.color,
                      mb: 2,
                    }}
                  >
                    {connector.subtitle}
                  </Typography>

                  {/* Description */}
                  <Typography
                    sx={{
                      fontSize: typography.bodySmall.size,
                      color: getTextColor('secondary', isDark),
                      lineHeight: typography.body.lineHeight,
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
                        <CheckCircle
                          sx={{
                            fontSize: 16,
                            mt: '2px',
                            color: connector.color,
                            flexShrink: 0,
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: typography.bodySmall.size,
                            color: getTextColor('muted', isDark),
                            lineHeight: typography.bodySmall.lineHeight,
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
                    ? withOpacity(colors.neutral.darkBackground, 0.4)
                    : withOpacity(colors.neutral.lightBackground, 0.9),
                  borderRadius: borderRadius.lg,
                  border: isDark
                    ? `1px solid ${withOpacity(colors.neutral.darkBorder, 0.25)}`
                    : `1px solid ${withOpacity(colors.neutral.lightBorder, 0.6)}`,
                  backdropFilter: 'blur(16px)',
                  transition: transitions.allNormal,
                  '&:hover': {
                    transform: 'translateY(-6px) scale(1.02)',
                    boxShadow: isDark
                      ? shadows.dark.lg
                      : shadows.light.lg,
                  },
                }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: borderRadius.full,
                    background: getGradient(gradients.blue, isDark),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <IconComponent sx={{ fontSize: 28, color: '#FFFFFF' }} />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: typography.h6.size,
                    fontWeight: typography.h6.weight,
                    color: getTextColor('primary', isDark),
                    mb: 1,
                  }}
                >
                  {benefit.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: typography.bodySmall.size,
                    color: getTextColor('muted', isDark),
                    lineHeight: typography.bodySmall.lineHeight,
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