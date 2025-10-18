import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Button, Stack } from '@mui/material';
import {
  BarChart,
  Event,
  Science,
  TrendingUp,
  ArrowForward,
  Visibility,
  PlayArrow,
} from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';
import { 
  themeConfig, 
  getColor, 
  getGradient, 
  getTextColor,
  getButtonStyles,
  getCardStyles,
  withOpacity 
} from '../shared/themeConfig';

gsap.registerPlugin(ScrollTrigger);

// Define feature configuration with color keys
const getFeatures = (isDark: boolean) => [
  {
    icon: BarChart,
    title: "Custom Analytics",
    description:
      "Build custom graphs, dashboards, and reports with your plant data. Add variables, set time ranges, and create the exact analysis you need.",
    color: getColor(themeConfig.colors.blue, isDark),
  },
  {
    icon: Event,
    title: "Smart Monitoring",
    description:
      "Define intelligent events, set dynamic thresholds, and get alerts that matter. Monitor what's critical to your operations.",
    color: getColor(themeConfig.colors.green, isDark),
  },
  {
    icon: Science,
    title: "Scenario Testing",
    description:
      'Run comprehensive "what if" scenarios with the Advisor Agent. Test changes before implementation.',
    color: getColor(themeConfig.colors.pink, isDark),
  },
  {
    icon: TrendingUp,
    title: "Economic Optimization",
    description:
      "Analyze economics in real-time with the Optimizer Agent. Optimize for maximum efficiency and profitability.",
    color: getColor(themeConfig.colors.yellow, isDark),
  },
];

export const HowItWorksFeaturesSection: React.FC = () => {
  const navigate = useNavigate();
  const { isDark } = useThemeMode();
  const {
    containerMaxWidth,
    containerPadding,
    h2FontSize,
    sectionPadding,
  } = useResponsiveLayout();

  const directAccessFeatures = getFeatures(isDark);

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const featureItemsRef = useRef<HTMLDivElement[]>([]);

  // Get unified theme values
  const { colors, animations, transitions, typography, borderRadius } = themeConfig;
  const primaryColor = getColor(colors.blue, isDark);
  const pinkColor = getColor(colors.pink, isDark);
  const greenColor = getColor(colors.green, isDark);

  // Get button styles
  const primaryButtonStyles = getButtonStyles('primary', isDark, 'default');
  const primaryButtonHoverStyles = getButtonStyles('primary', isDark, 'hover');
  const outlinedButtonStyles = getButtonStyles('outlined', isDark, 'default');
  const outlinedButtonHoverStyles = getButtonStyles('outlined', isDark, 'hover');

  // Get card styles
  const cardStyles = getCardStyles(isDark, 'default');
  const cardHoverStyles = getCardStyles(isDark, 'hover');

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
          opacity: 0,
          y: 30,
          duration: animations.duration.normal,
          stagger: 0.2,
          ease: animations.easing.easeOut,
        });
      }

      // Features animation
      featureItemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.from(item, {
            scrollTrigger: {
              trigger: featuresRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 40,
            duration: 0.7,
            delay: index * animations.stagger,
            ease: animations.easing.sharp,
          });
        }
      });

      // Process section animation
      if (processRef.current) {
        gsap.from(processRef.current.children, {
          scrollTrigger: {
            trigger: processRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 30,
          duration: animations.duration.normal,
          stagger: 0.1,
          ease: animations.easing.easeOut,
        });
      }

      // CTA animation
      if (ctaRef.current) {
        gsap.from(ctaRef.current.children, {
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.1,
          ease: animations.easing.sharp,
        });
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
        {/* Main Header */}
        <Box
          ref={headerRef}
          sx={{
            textAlign: 'center',
            mb: { xs: 8, md: 12 },
          }}
        >
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
            Advanced Agent Access
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1.125rem', md: '1.375rem' },
              color: getTextColor('secondary', isDark),
              lineHeight: typography.bodyLarge.lineHeight,
              maxWidth: 700,
              mx: 'auto',
            }}
          >
            Skip the chat and go straight to specialized AI agents designed for process engineers
          </Typography>
        </Box>

        {/* Features Section */}
        <Box ref={featuresRef} sx={{ mb: { xs: 12, md: 16 } }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
              gap: { xs: 4, md: 6 },
              maxWidth: 1000,
              mx: 'auto',
            }}
          >
            {directAccessFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              const featureColor = feature.color;
              
              return (
                <Box
                  key={index}
                  ref={(el) => {
                    if (el) featureItemsRef.current[index] = el as HTMLDivElement;
                  }}
                  sx={{
                    position: 'relative',
                    p: { xs: 4, md: 5 },
                    background: cardStyles.background,
                    backdropFilter: 'blur(20px)',
                    borderRadius: borderRadius.lg,
                    border: isDark
                      ? `1px solid ${withOpacity(featureColor, 0.5)}`
                      : `1px solid ${withOpacity(featureColor, 0.19)}`,
                    transition: transitions.allNormal,
                    cursor: 'pointer',
                    overflow: 'hidden',
                    '&:hover': {
                      boxShadow: `0 8px 32px -4px ${withOpacity(featureColor, 0.33)}`,
                      border: `1.5px solid ${featureColor}`,
                      background: isDark
                        ? `linear-gradient(135deg, ${withOpacity(featureColor, 0.13)} 0%, ${cardHoverStyles.background} 100%)`
                        : `linear-gradient(135deg, #fff 0%, ${withOpacity(featureColor, 0.04)} 100%)`,
                    },
                  }}
                >
                  {/* Icon */}
                  <Box
                    className="feature-icon"
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: borderRadius.sm,
                      background: withOpacity(featureColor, 0.15),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      transition: transitions.normal,
                    }}
                  >
                    <IconComponent
                      sx={{
                        fontSize: 28,
                        color: featureColor,
                        transition: transitions.normal,
                      }}
                    />
                  </Box>

                  {/* Content */}
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: typography.h5.size,
                      fontWeight: typography.h5.weight,
                      color: getTextColor('primary', isDark),
                      mb: 2,
                      lineHeight: typography.h5.lineHeight,
                    }}
                  >
                    {feature.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: getTextColor('secondary', isDark),
                      lineHeight: typography.body.lineHeight,
                      fontSize: typography.body.size,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Simple Process Explanation */}
        <Box ref={processRef} sx={{ mb: { xs: 12, md: 16 } }}>
          <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: typography.h3.size,
                fontWeight: typography.h3.weight,
                color: getTextColor('primary', isDark),
                mb: 4,
                lineHeight: typography.h3.lineHeight,
              }}
            >
              How It Works
            </Typography>

            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={4}
              sx={{
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 6,
              }}
            >
              {/* Step 1 */}
              <Box sx={{ textAlign: 'center', flex: 1 }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: borderRadius.full,
                    background: getGradient(themeConfig.gradients.blue, isDark),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    color: '#FFFFFF',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    boxShadow: isDark
                      ? `0 4px 20px ${withOpacity(primaryColor, 0.4)}`
                      : `0 4px 20px ${withOpacity(primaryColor, 0.3)}`,
                  }}
                >
                  1
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 1,
                    fontWeight: typography.h6.weight,
                    color: getTextColor('primary', isDark),
                  }}
                >
                  Ask or Access
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: getTextColor('secondary', isDark),
                  }}
                >
                  Chat naturally or open agents directly
                </Typography>
              </Box>

              <ArrowForward
                sx={{
                  fontSize: 32,
                  color: getTextColor('muted', isDark),
                  display: { xs: 'none', md: 'block' },
                  transform: { xs: 'rotate(90deg)', md: 'none' },
                }}
              />

              {/* Step 2 */}
              <Box sx={{ textAlign: 'center', flex: 1 }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: borderRadius.full,
                    background: getGradient(themeConfig.gradients.pink, isDark),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    color: '#FFFFFF',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    boxShadow: isDark
                      ? `0 4px 20px ${withOpacity(pinkColor, 0.4)}`
                      : `0 4px 20px ${withOpacity(pinkColor, 0.3)}`,
                  }}
                >
                  2
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 1,
                    fontWeight: typography.h6.weight,
                    color: getTextColor('primary', isDark),
                  }}
                >
                  AI Processes
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: getTextColor('secondary', isDark),
                  }}
                >
                  Specialized agents analyze your data
                </Typography>
              </Box>

              <ArrowForward
                sx={{
                  fontSize: 32,
                  color: getTextColor('muted', isDark),
                  display: { xs: 'none', md: 'block' },
                  transform: { xs: 'rotate(90deg)', md: 'none' },
                }}
              />

              {/* Step 3 */}
              <Box sx={{ textAlign: 'center', flex: 1 }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: borderRadius.full,
                    background: getGradient(themeConfig.gradients.green, isDark),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    color: '#FFFFFF',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    boxShadow: isDark
                      ? `0 4px 20px ${withOpacity(greenColor, 0.4)}`
                      : `0 4px 20px ${withOpacity(greenColor, 0.3)}`,
                  }}
                >
                  3
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 1,
                    fontWeight: typography.h6.weight,
                    color: getTextColor('primary', isDark),
                  }}
                >
                  Get Results
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: getTextColor('secondary', isDark),
                  }}
                >
                  Actionable insights and recommendations
                </Typography>
              </Box>
            </Stack>

            <Typography
              variant="body1"
              sx={{
                fontSize: '1.25rem',
                color: getTextColor('secondary', isDark),
                lineHeight: typography.bodyLarge.lineHeight,
                fontStyle: 'italic',
              }}
            >
              "No black boxes. Every insight is transparent, explainable, and actionable."
            </Typography>
          </Box>
        </Box>

        {/* Simple CTA */}
        <Box ref={ctaRef} sx={{ textAlign: 'center' }}>
          <Typography
            variant="h4"
            sx={{
              fontSize: typography.h4.size,
              fontWeight: typography.h4.weight,
              color: getTextColor('primary', isDark),
              mb: 4,
              lineHeight: typography.h4.lineHeight,
            }}
          >
            Ready to Get Started?
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={3}
            sx={{ justifyContent: 'center', alignItems: 'center' }}
          >
            {/* Primary CTA Button */}
            <Button
              variant="contained"
              size="large"
              startIcon={<PlayArrow />}
              onClick={() => navigate('/demo')}
              sx={{
                px: 6,
                py: 2.5,
                fontSize: '1.125rem',
                fontWeight: 600,
                background: primaryButtonStyles.background,
                borderRadius: themeConfig.borderRadius.full,
                minWidth: 180,
                color: primaryButtonStyles.text,
                boxShadow: primaryButtonStyles.shadow,
                transition: transitions.allNormal,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  background: primaryButtonHoverStyles.background,
                  boxShadow: primaryButtonHoverStyles.shadow,
                },
              }}
            >
              Try Demo
            </Button>

            {/* Secondary CTA Button */}
            <Button
              variant="outlined"
              size="large"
              startIcon={<Visibility />}
              onClick={() => navigate('/company/about')}
              sx={{
                px: 6,
                py: 2.5,
                fontSize: '1.125rem',
                fontWeight: 700,
                borderColor: outlinedButtonStyles.border,
                color: outlinedButtonStyles.text,
                background: outlinedButtonStyles.background,
                borderRadius: themeConfig.borderRadius.full,
                borderWidth: 2,
                minWidth: 180,
                transition: transitions.allNormal,
                '&:hover': {
                  borderWidth: 2,
                  borderColor: outlinedButtonHoverStyles.border,
                  background: outlinedButtonHoverStyles.background,
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Learn More
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};