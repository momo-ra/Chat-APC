import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { 
  Hub, 
  Groups,
  Business,
  PlayArrow,
  CalendarToday
} from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';
import { useNavigate } from 'react-router-dom';
import { 
  themeConfig, 
  getColor, 
  getTextColor,
  getButtonStyles,
  withOpacity 
} from '../shared/themeConfig';

gsap.registerPlugin(ScrollTrigger);

const getVisionItems = (isDark: boolean) => {
  const { colors } = themeConfig;
  return [
    {
      title: 'Connect with external apps',
      subtitle: 'historians, planning, reporting',
      description: 'Seamlessly integrate with your existing tools and systems',
      icon: Hub,
      color: getColor(colors.green, isDark),
    },
    {
      title: 'Collaborate with other AI agents',
      subtitle: 'insights move across operations, maintenance, and supply chain',
      description: 'Create a connected intelligence network across your organization',
      icon: Groups,
      color: getColor(colors.yellow, isDark),
    },
    {
      title: 'Scale across plants and enterprises',
      subtitle: 'making ChatAPC the hub of connected decision-making',
      description: 'Expand intelligent operations throughout your entire enterprise',
      icon: Business,
      color: getColor(colors.pink, isDark),
    },
  ];
};

export const BiggerVisionSection: React.FC = () => {
  const { isDark } = useThemeMode();
  const navigate = useNavigate();
  const { 
    containerMaxWidth,  
    containerPadding,
    h2FontSize,
    bodyFontSize,
    sectionPadding 
  } = useResponsiveLayout();

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement[]>([]);
  const finalRef = useRef<HTMLDivElement>(null);

  // Get unified theme values
  const { typography, borderRadius, transitions, animations, colors } = themeConfig;
  const visionItems = getVisionItems(isDark);
  const primaryColor = getColor(colors.blue, isDark);
  
  // Get button styles
  const primaryButtonStyles = getButtonStyles('primary', isDark, 'default');
  const primaryButtonHoverStyles = getButtonStyles('primary', isDark, 'hover');
  const outlinedButtonStyles = getButtonStyles('outlined', isDark, 'default');
  const outlinedButtonHoverStyles = getButtonStyles('outlined', isDark, 'hover');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 50,
          opacity: 0,
          duration: animations.duration.normal,
          ease: animations.easing.easeOut,
        });
      }

      // Vision items animation
      visionRef.current.forEach((item, index) => {
        if (item) {
          gsap.from(item, {
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
            y: 60,
            opacity: 0,
            duration: animations.duration.normal,
            delay: index * animations.stagger,
            ease: animations.easing.sharp,
          });
        }
      });

      // Final section animation
      if (finalRef.current) {
        gsap.from(finalRef.current, {
          scrollTrigger: {
            trigger: finalRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 40,
          opacity: 0,
          duration: animations.duration.normal,
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
        <Box ref={headerRef} sx={{ mb: { xs: 8, md: 10 } }}>
          <Typography
            sx={{
              fontSize: { xs: '0.875rem', md: '1rem' },
              fontWeight: 700,
              color: primaryColor,
              textTransform: 'uppercase',
              letterSpacing: 2,
              mb: 2,
            }}
          >
            Future Vision
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: h2FontSize,
              fontWeight: typography.h2.weight,
              color: getTextColor('primary', isDark),
              mb: 3,
              lineHeight: typography.h2.lineHeight,
              maxWidth: 900,
            }}
          >
            The Bigger Vision
          </Typography>
          <Typography
            sx={{
              fontSize: bodyFontSize,
              color: getTextColor('secondary', isDark),
              maxWidth: '800px',
              lineHeight: typography.body.lineHeight,
              mb: 3,
            }}
          >
            Together, these agents form an ecosystem: a coordinated team inside ChatAPC that you can interact with directly. And this is just the start.
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.125rem', md: '1.25rem' },
              fontWeight: 600,
              color: primaryColor,
              maxWidth: '600px',
              lineHeight: 1.6,
            }}
          >
            Our vision is to:
          </Typography>
        </Box>

        {/* Vision Items - Left Border Style */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 4, md: 5 },
            mb: { xs: 10, md: 14 },
          }}
        >
          {visionItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Box
                key={index}
                ref={(el) => {
                  if (el) visionRef.current[index] = el as HTMLDivElement;
                }}
                sx={{
                  position: 'relative',
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '80px 1fr' },
                  gap: { xs: 3, md: 4 },
                  p: { xs: 3, md: 4 },
                  borderRadius: 0,
                  borderLeft: isDark 
                    ? `2px solid ${withOpacity(colors.neutral.darkBorder, 0.3)}` 
                    : `2px solid ${colors.neutral.lightBorder}`,
                  background: 'transparent',
                  transition: transitions.allNormal,
                  '&:hover': {
                    pl: { xs: 4, md: 5 },
                    borderLeftColor: item.color,
                    borderLeftWidth: '3px',
                    background: isDark
                      ? `linear-gradient(90deg, ${withOpacity(item.color, 0.06)} 0%, transparent 100%)`
                      : `linear-gradient(90deg, ${withOpacity(item.color, 0.05)} 0%, transparent 100%)`,
                    '& .vision-icon': {
                      transform: 'scale(1.1) rotate(5deg)',
                    },
                  },
                }}
              >
                {/* Icon */}
                <Box
                  className="vision-icon"
                  sx={{
                    width: { xs: 64, md: 72 },
                    height: { xs: 64, md: 72 },
                    borderRadius: borderRadius.sm,
                    background: item.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: transitions.normal,
                    boxShadow: `0 8px 24px ${withOpacity(item.color, 0.19)}`,
                    // Center the icon box to the left in mobile (by using align self and margin left 0), keep desktop as before
                    mx: { xs: 0, md: 0 },
                    alignSelf: { xs: 'flex-start', md: 'center' },
                  }}
                >
                  <IconComponent
                    sx={{
                      fontSize: { xs: 32, md: 36 },
                      color: '#FFFFFF',
                      // Center icon in the icon box for mobile and desktop (flex settings above already do that)
                      mx: 'auto',
                    }}
                  />
                </Box>

                {/* Content */}
                <Box sx={{ textAlign: { xs: 'left', md: 'left' } }}>
                  {/* Title */}
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: { xs: '1.25rem', md: '1.5rem' },
                      fontWeight: typography.h5.weight,
                      color: getTextColor('primary', isDark),
                      mb: 1,
                      lineHeight: typography.h5.lineHeight,
                    }}
                  >
                    {item.title}
                  </Typography>

                  {/* Subtitle */}
                  <Typography
                    sx={{
                      fontSize: typography.bodySmall.size,
                      fontWeight: 600,
                      color: item.color,
                      mb: 2,
                      fontStyle: 'italic',
                      lineHeight: typography.bodySmall.lineHeight,
                    }}
                  >
                    {item.subtitle}
                  </Typography>

                  {/* Description */}
                  <Typography
                    sx={{
                      fontSize: { xs: '1rem', md: '1.125rem' },
                      color: getTextColor('muted', isDark),
                      lineHeight: typography.body.lineHeight,
                      maxWidth: 700,
                      mx: { xs: 'auto', md: 0 },
                    }}
                  >
                    {item.description}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* Final Message & CTA */}
        <Box
          ref={finalRef}
          sx={{
            position: 'relative',
            pt: { xs: 8, md: 10 },
            borderTop: isDark 
              ? `1px solid ${withOpacity(colors.neutral.darkBorder, 0.3)}` 
              : `1px solid ${colors.neutral.lightBorder}`,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: typography.h3.size,
              fontWeight: typography.h3.weight,
              color: getTextColor('primary', isDark),
              mb: 4,
              lineHeight: typography.h3.lineHeight,
              maxWidth: 900,
            }}
          >
            Digital Colleagues Who Detect, Explain, and Unlock
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: '1.125rem', md: '1.25rem' },
              color: getTextColor('secondary', isDark),
              maxWidth: '800px',
              lineHeight: typography.body.lineHeight,
              mb: 6,
            }}
          >
            With ChatAPC, you don't just get answers. You interact with digital colleagues who detect, explain, and unlock — helping you run operations smarter and more profitably.
          </Typography>

          {/* CTA Buttons */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'stretch', sm: 'center' },
              gap: 3,
            }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<PlayArrow />}
              onClick={() => navigate('/demo')}
              sx={{
                background: primaryButtonStyles.background,
                color: primaryButtonStyles.text,
                px: 5,
                py: 2,
                fontSize: '1.125rem',
                fontWeight: 600,
                borderRadius: borderRadius.full,
                textTransform: 'none',
                boxShadow: primaryButtonStyles.shadow,
                transition: transitions.normal,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: primaryButtonHoverStyles.shadow,
                  background: primaryButtonHoverStyles.background,
                  filter: 'brightness(1.1)',
                },
              }}
            >
              Start Your Journey
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<CalendarToday />}
              onClick={() => navigate('/company/contact')}
              sx={{
                borderColor: outlinedButtonStyles.border,
                color: outlinedButtonStyles.text,
                background: outlinedButtonStyles.background,
                px: 5,
                py: 2,
                fontSize: '1.125rem',
                fontWeight: 600,
                borderRadius: borderRadius.full,
                borderWidth: 2,
                textTransform: 'none',
                transition: transitions.normal,
                '&:hover': {
                  borderColor: outlinedButtonHoverStyles.border,
                  background: outlinedButtonHoverStyles.background,
                  transform: 'translateY(-2px)',
                  borderWidth: 2,
                },
              }}
            >
              Schedule Demo
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};