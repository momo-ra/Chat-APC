import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Card, CardContent } from '@mui/material';
import { 
  Hub, 
  Psychology, 
  Chat,
  PlayArrow
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
  getBackground,
  withOpacity 
} from '../shared/themeConfig';

gsap.registerPlugin(ScrollTrigger);

const getBenefits = (isDark: boolean) => {
  const { colors } = themeConfig;
  return [
    {
      title: 'Connected',
      subtitle: 'To your existing systems',
      description: 'Seamlessly integrate with your current infrastructure without disruption',
      icon: Hub,
      color: getColor(colors.blue, isDark),
    },
    {
      title: 'Contextual',
      subtitle: 'Understands your plant',
      description: 'Built-in knowledge of your processes, equipment, and operational constraints',
      icon: Psychology,
      color: getColor(colors.green, isDark),
    },
    {
      title: 'Conversational',
      subtitle: 'Just ask in plain English',
      description: 'No technical expertise required — communicate naturally with your plant data',
      icon: Chat,
      color: getColor(colors.yellow, isDark),
    },
    {
      title: 'Actionable',
      subtitle: 'Clear answers you can trust',
      description: 'Receive specific, reliable insights that drive immediate operational decisions',
      icon: PlayArrow,
      color: getColor(colors.pink, isDark),
    },
  ];
};

export const FinalBenefitsSection: React.FC = () => {
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

  // Get unified theme values
  const { colors, gradients, typography, borderRadius, transitions, animations } = themeConfig;
  const benefits = getBenefits(isDark);
  const blueColor = getColor(colors.blue, isDark);
  const purpleColor = getColor(colors.purple, isDark);

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
          ease: animations.easing.easeOut,
        });
      }

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            y: 60,
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            delay: index * 0.1,
            ease: animations.easing.bounce,
          });
        }
      });
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
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '10%',
          right: '-20%',
          width: '60%',
          height: '80%',
          background: getBackground('radialBlue', isDark),
          pointerEvents: 'none',
        },
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
        <Box ref={headerRef} sx={{ textAlign: 'center', mb: { xs: 8, md: 12 } }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: h2FontSize,
              fontWeight: typography.h2.weight,
              color: getTextColor('primary', isDark),
              mb: 4,
              lineHeight: typography.h2.lineHeight,
              background: isDark
                ? 'linear-gradient(135deg, #FFFFFF 0%, #CBD5E1 100%)'
                : 'linear-gradient(135deg, #0F172A 0%, #475569 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            The Complete Solution
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
            Four key capabilities that transform how you interact with your plant data
          </Typography>
        </Box>

        {/* Benefits Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: { xs: 4, md: 6 },
            mb: { xs: 8, md: 12 },
          }}
        >
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
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
                    : withOpacity(colors.neutral.lightBackground, 0.9),
                  backdropFilter: 'blur(20px)',
                  border: isDark 
                    ? `1px solid ${withOpacity(colors.neutral.darkBorder, 0.3)}`
                    : `1px solid ${withOpacity(colors.neutral.lightBorder, 0.8)}`,
                  borderRadius: borderRadius.xl,
                  height: '100%',
                  position: 'relative',
                  transition: transitions.allNormal,
                  '&:hover': {
                    transform: 'translateY(-12px) scale(1.02)',
                    boxShadow: isDark
                      ? `0 25px 80px ${withOpacity(benefit.color, 0.15)}`
                      : `0 25px 80px ${withOpacity(benefit.color, 0.13)}`,
                    borderColor: benefit.color,
                    '&::before': {
                      opacity: 1,
                    },
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: `linear-gradient(90deg, ${benefit.color} 0%, ${withOpacity(benefit.color, 0.5)} 100%)`,
                    borderRadius: `${borderRadius.xl} ${borderRadius.xl} 0 0`,
                    opacity: 0,
                    transition: transitions.normal,
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 4, md: 5 }, textAlign: 'center' }}>
                  {/* Icon */}
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: borderRadius.lg,
                      background: withOpacity(benefit.color, 0.13),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      transition: transitions.normal,
                      '&:hover': {
                        transform: 'scale(1.1) rotate(5deg)',
                      },
                    }}
                  >
                    <IconComponent
                      sx={{
                        fontSize: 40,
                        color: benefit.color,
                      }}
                    />
                  </Box>

                  {/* Title */}
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: typography.h4.size,
                      fontWeight: typography.h4.weight,
                      color: benefit.color,
                      mb: 1,
                      lineHeight: typography.h4.lineHeight,
                    }}
                  >
                    {benefit.title}
                  </Typography>

                  {/* Subtitle */}
                  <Typography
                    sx={{
                      fontSize: { xs: '1rem', md: '1.125rem' },
                      fontWeight: 600,
                      color: getTextColor('primary', isDark),
                      mb: 2,
                      lineHeight: 1.3,
                    }}
                  >
                    {benefit.subtitle}
                  </Typography>

                  {/* Description */}
                  <Typography
                    sx={{
                      fontSize: typography.body.size,
                      color: getTextColor('muted', isDark),
                      lineHeight: typography.body.lineHeight,
                    }}
                  >
                    {benefit.description}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Box>

        {/* Call to Action */}
        <Box
          sx={{
            textAlign: 'center',
            p: { xs: 6, md: 8 },
            background: isDark
              ? `linear-gradient(135deg, ${withOpacity(blueColor, 0.1)} 0%, ${withOpacity(purpleColor, 0.1)} 100%)`
              : `linear-gradient(135deg, ${withOpacity(blueColor, 0.05)} 0%, ${withOpacity(purpleColor, 0.05)} 100%)`,
            borderRadius: borderRadius.xl,
            border: isDark
              ? `1px solid ${withOpacity(blueColor, 0.2)}`
              : `1px solid ${withOpacity(blueColor, 0.15)}`,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: isDark
                ? `conic-gradient(from 0deg at 50% 50%, ${withOpacity(blueColor, 0.1)} 0deg, ${withOpacity(purpleColor, 0.1)} 180deg, ${withOpacity(blueColor, 0.1)} 360deg)`
                : `conic-gradient(from 0deg at 50% 50%, ${withOpacity(blueColor, 0.05)} 0deg, ${withOpacity(purpleColor, 0.05)} 180deg, ${withOpacity(blueColor, 0.05)} 360deg)`,
              animation: 'rotate 20s linear infinite',
              zIndex: -1,
            },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: typography.h3.size,
              fontWeight: typography.h3.weight,
              color: getTextColor('primary', isDark),
              mb: 3,
              lineHeight: typography.h3.lineHeight,
            }}
          >
            Experience the Future of Process Operations
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.125rem', md: '1.25rem' },
              color: getTextColor('secondary', isDark),
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: typography.body.lineHeight,
            }}
          >
            Transform complex industrial data into clear, actionable insights that drive better decisions and improved performance.
          </Typography>
        </Box>
      </Container>

      {/* Add rotation keyframes */}
      <Box
        component="style"
        sx={{
          '@keyframes rotate': {
            '0%': {
              transform: 'rotate(0deg)',
            },
            '100%': {
              transform: 'rotate(360deg)',
            },
          },
        }}
      />
    </Box>
  );
};