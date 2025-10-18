import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Button, Card, CardContent } from '@mui/material';
import { PlayArrow, Visibility } from '@mui/icons-material';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';
import {
  themeConfig,
  getColor,
  getGradient,
  getShadow,
  getButtonStyles,
  withOpacity,
  getTextColor
} from '../shared/themeConfig';

export const CTASection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement[]>([]);
  const navigate = useNavigate();
  const { isDark } = useThemeMode();
  const {
    h1FontSize,
    bodyLargeFontSize,
    containerMaxWidth,
    containerPadding
  } = useResponsiveLayout();

  // Get unified theme values
  const { colors, gradients, typography, animations, transitions, borderRadius, shadows } = themeConfig;
  const primaryColor = getColor(colors.blue, isDark);
  const cyanColor = getColor(colors.cyan, isDark);
  const purpleColor = getColor(colors.purple, isDark);
  const pinkColor = getColor(colors.pink, isDark);
  const greenColor = getColor(colors.green, isDark);

  // Get button styles
  const primaryButtonStyles = getButtonStyles('primary', isDark, 'default');
  const primaryButtonHoverStyles = getButtonStyles('primary', isDark, 'hover');
  const outlinedButtonStyles = getButtonStyles('outlined', isDark, 'default');
  const outlinedButtonHoverStyles = getButtonStyles('outlined', isDark, 'hover');

  // Theme aware colors for backgrounds and text in light mode for readability
  const lightModeCardBg = 'rgba(245, 249, 255, 0.98)';
  const lightModeMainText = getTextColor('primary', false);
  const lightModeDescText = getTextColor('secondary', false);
  const lightModeMuted = getTextColor('muted', false);
  const lightModeBorder = withOpacity('#2563eb', 0.14); // soft blue border in light mode

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main CTA animation with scale
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          scale: 0.95,
          opacity: 0,
          duration: animations.duration.normal,
          ease: animations.easing.easeOut,
        });
      }

      // CTA content stagger animation
      const ctaContent = ctaRef.current?.querySelector('.cta-content');
      if (ctaContent) {
        const children = Array.from(ctaContent.children) as HTMLElement[];
        gsap.from(children, {
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          y: 30,
          opacity: 0,
          duration: animations.duration.normal,
          stagger: animations.stagger,
          ease: animations.easing.easeOut,
          delay: 0.4,
        });
      }

      // Floating elements continuous animation
      floatingElementsRef.current.forEach((element, index) => {
        if (element) {
          gsap.to(element, {
            y: 15,
            duration: 4 + index,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut',
            delay: index * 0.5,
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
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        py: 'clamp(3rem, 10vw, 5rem)',
        position: 'relative',
        overflow: 'hidden',
        background: 'transparent',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          maxWidth: containerMaxWidth,
          px: containerPadding,
        }}
      >
        <Box ref={ctaRef} sx={{ position: 'relative', zIndex: 2 }}>
          {/* Floating Decorative Elements */}
          <Box
            ref={(el) => {
              if (el) floatingElementsRef.current[0] = el as HTMLDivElement;
            }}
            sx={{
              position: 'absolute',
              top: -40,
              left: -20,
              width: 80,
              height: 80,
              borderRadius: borderRadius.full,
              background: getGradient(gradients.blueToPurple, isDark),
              opacity: isDark ? 0.1 : 0.11,
              filter: 'blur(2px)',
              display: { xs: 'none', md: 'block' },
            }}
          />

          <Box
            ref={(el) => {
              if (el) floatingElementsRef.current[1] = el as HTMLDivElement;
            }}
            sx={{
              position: 'absolute',
              top: -60,
              right: -40,
              width: 120,
              height: 120,
              borderRadius: borderRadius.full,
              background: getGradient(gradients.purpleToBlue, isDark),
              opacity: isDark ? 0.08 : 0.10,
              filter: 'blur(3px)',
              display: { xs: 'none', md: 'block' },
            }}
          />

          <Box
            ref={(el) => {
              if (el) floatingElementsRef.current[2] = el as HTMLDivElement;
            }}
            sx={{
              position: 'absolute',
              bottom: -30,
              left: 100,
              width: 60,
              height: 60,
              borderRadius: borderRadius.full,
              background: getGradient(gradients.green, isDark),
              opacity: isDark ? 0.12 : 0.16,
              filter: 'blur(1px)',
              display: { xs: 'none', md: 'block' },
            }}
          />

          {/* Main CTA Card */}
          <Card
            elevation={0}
            sx={{
              position: 'relative',
              background: "transparent",
              borderRadius: borderRadius.xl,
              border: isDark
                ? `2px solid ${withOpacity('#FFFFFF', 0.08)}`
                : `2px solid ${lightModeBorder}`,
              boxShadow: isDark
                ? '0 8px 32px 0 rgba(0,0,40,0.24)'
                : '0 4px 24px 0 rgba(56, 136, 255, 0.09)',
              overflow: 'visible',
              backdropFilter: isDark ? 'blur(8px)' : undefined,
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                borderRadius: borderRadius.xl,
                pointerEvents: 'none',
              },
            }}
          >
            <CardContent
              className="cta-content"
              sx={{
                p: { xs: 6, md: 10 },
                textAlign: 'center',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {/* Main Headline */}
              <Typography
                variant="h1"
                sx={{
                  fontSize: h1FontSize,
                  fontWeight: typography.h1.weight,
                  color: isDark ? '#FFFFFF' : lightModeMainText,
                  mb: 4,
                  lineHeight: typography.h1.lineHeight,
                  letterSpacing: '-0.02em',
                }}
              >
                Ready to see{' '}
                <Box
                  component="span"
                  sx={{
                    background: getGradient(gradients.blueToBlue, isDark),
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  ChatAPC
                </Box>{' '}
                in action?
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: bodyLargeFontSize,
                  color: isDark ? withOpacity('#CBD5E1', 1) : lightModeDescText,
                  mb: 8,
                  maxWidth: 700,
                  mx: 'auto',
                  lineHeight: typography.bodyLarge.lineHeight,
                  fontWeight: 300,
                }}
              >
                Let's discuss how ChatAPC helps your plant run smoother, smarter, and safer. See real results on your data.
              </Typography>

              {/* CTA Buttons */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 3,
                  justifyContent: 'center',
                  alignItems: 'center',
                  mb: 8,
                }}
              >
                {/* Primary Button - "Go to Demo" */}
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Visibility />}
                  onClick={() => navigate('/demo')}
                  sx={{
                    px: 6,
                    py: 3,
                    minWidth: { xs: 220, md: 235 },
                    fontSize: { xs: '1rem', md: '1.125rem' },
                    fontWeight: 700,
                    background: primaryButtonStyles.background,
                    borderRadius: themeConfig.borderRadius.full,
                    textTransform: 'none',
                    boxShadow: primaryButtonStyles.shadow,
                    border: 'none',
                    color: primaryButtonStyles.text,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: transitions.allNormal,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: -100,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                      transition: transitions.slow,
                    },
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      background: primaryButtonHoverStyles.background,
                      boxShadow: primaryButtonHoverStyles.shadow,
                      '&::before': {
                        left: '100%',
                      },
                    },
                    '&:active': {
                      transform: 'translateY(-1px)',
                    },
                    opacity: 1,
                    display: 'inline-flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  Go to Demo
                </Button>

                {/* Outlined Button - "See How It Works" */}
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<PlayArrow />}
                  onClick={() => navigate('/product/how-it-works')}
                  sx={{
                    px: 6,
                    py: 3,
                    minWidth: { xs: 220, md: 235 },
                    fontSize: { xs: '1rem', md: '1.125rem' },
                    fontWeight: 700,
                    borderColor: outlinedButtonStyles.border,
                    color: outlinedButtonStyles.text,
                    borderRadius: themeConfig.borderRadius.full,
                    borderWidth: 2,
                    textTransform: 'none',
                    backdropFilter: 'blur(10px)',
                    background: outlinedButtonStyles.background,
                    transition: transitions.allNormal,
                    '&:hover': {
                      borderWidth: 2,
                      borderColor: outlinedButtonHoverStyles.border,
                      background: outlinedButtonHoverStyles.background,
                      transform: 'translateY(-2px)',
                      boxShadow: isDark
                        ? getShadow('sm', isDark)
                        : getShadow('blue', isDark),
                    },
                    opacity: 1,
                    display: 'inline-flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  See How It Works
                </Button>
              </Box>

              {/* Bottom Tagline */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                  opacity: 0.8,
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 1,
                    background: isDark
                      ? `linear-gradient(90deg, transparent 0%, ${withOpacity('#FFFFFF', 0.3)} 50%, transparent 100%)`
                      : `linear-gradient(90deg, transparent 0%, ${withOpacity(primaryColor, 0.12)} 50%, transparent 100%)`,
                  }}
                />
                <Typography
                  sx={{
                    fontSize: typography.bodySmall.size,
                    color: isDark ? withOpacity('#CBD5E1', 0.8) : lightModeMuted,
                    fontStyle: 'italic',
                    fontWeight: 400,
                  }}
                >
                  Made by process engineers for process engineers
                </Typography>
                <Box
                  sx={{
                    width: 40,
                    height: 1,
                    background: isDark
                      ? `linear-gradient(90deg, transparent 0%, ${withOpacity('#FFFFFF', 0.3)} 50%, transparent 100%)`
                      : `linear-gradient(90deg, transparent 0%, ${withOpacity(primaryColor, 0.12)} 50%, transparent 100%)`,
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default CTASection;