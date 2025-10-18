import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { PlayArrow, Visibility } from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';
import { 
  themeConfig, 
  getColor, 
  getGradient, 
  getBackground,
  getShadow,
  getTextColor,
  getButtonStyles,
  withOpacity 
} from '../shared/themeConfig';

gsap.registerPlugin(ScrollTrigger);

export const HowItWorksHeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { isDark } = useThemeMode();
  const { 
    containerMaxWidth, 
    containerPadding, 
    sectionPadding 
  } = useResponsiveLayout();

  const sectionRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  // REMOVE the buttonsRef that isn't necessary for showing the buttons
  // const buttonsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // Get unified theme values
  const { colors, gradients, backgrounds, shadows, typography, animations, transitions } = themeConfig;
  const primaryColor = getColor(colors.blue, isDark);
  const purpleColor = getColor(colors.purple, isDark);
  const greenColor = getColor(colors.green, isDark);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero content entrance animation
      const tl = gsap.timeline();
      
      if (titleRef.current) {
        tl.from(titleRef.current, {
          opacity: 0,
          y: 60,
          duration: animations.duration.slow,
          ease: animations.easing.easeOut,
        }, 0.2);
      }

      if (subtitleRef.current) {
        tl.from(subtitleRef.current, {
          opacity: 0,
          y: 40,
          duration: animations.duration.normal,
          ease: animations.easing.sharp,
        }, 0.6);
      }

      // REMOVE the animation that targets children of possibly empty buttonsRef
      // This may have set children opacity to 0 and never animated in if gsap context/refs got confused.
      /*
      if (buttonsRef.current) {
        tl.from(buttonsRef.current.children, {
          opacity: 0,
          y: 30,
          duration: animations.duration.normal,
          stagger: animations.stagger,
          ease: animations.easing.bounce,
        }, 1);
      }
      */

      if (scrollIndicatorRef.current) {
        tl.from(scrollIndicatorRef.current, {
          opacity: 0,
          y: 20,
          duration: animations.duration.normal,
          ease: animations.easing.sharp,
        }, 1.5);

        // Continuous bounce animation
        gsap.to(scrollIndicatorRef.current, {
          y: 10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: animations.easing.easeInOut,
          delay: 2,
        });
      }

      // Advanced floating animations for background elements
      const floatingElements = sectionRef.current?.querySelectorAll('.floating-element');
      floatingElements?.forEach((element, index) => {
        // Create complex motion paths
        gsap.to(element, {
          rotation: 360,
          duration: 20 + index * 5,
          repeat: -1,
          ease: 'none',
        });

        gsap.to(element, {
          x: 30,
          y: -20,
          duration: 6 + index * 2,
          repeat: -1,
          yoyo: true,
          ease: animations.easing.easeInOut,
          delay: index * 0.5,
        });
      });

      // Parallax effect on scroll
      gsap.to('.hero-bg-element', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        y: -100,
        opacity: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [animations]);

  const handleScrollToProcess = () => {
    const processSection = document.getElementById('process-section');
    processSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Get button styles from unified config
  const primaryButtonStyles = getButtonStyles('primary', isDark, 'default');
  const primaryButtonHoverStyles = getButtonStyles('primary', isDark, 'hover');
  const outlinedButtonStyles = getButtonStyles('outlined', isDark, 'default');
  const outlinedButtonHoverStyles = getButtonStyles('outlined', isDark, 'hover');

  return (
    <Box
      ref={sectionRef}
      component="section"
      data-section-theme={isDark ? 'dark' : 'light'}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: sectionPadding,
        background: 'transparent',
        minHeight: { xs: '90vh', md: '95vh' },
        display: 'flex',
        alignItems: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: getBackground('radialBlue', isDark),
          pointerEvents: 'none',
        },
      }}
    >
      {/* Enhanced Background Elements */}
      <Box
        className="floating-element hero-bg-element"
        sx={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: { xs: 300, md: 400 },
          height: { xs: 300, md: 400 },
          borderRadius: '50%',
          background: isDark
            ? `radial-gradient(circle, ${withOpacity(primaryColor, 0.15)} 0%, ${withOpacity(primaryColor, 0.05)} 50%, transparent 70%)`
            : `radial-gradient(circle, ${withOpacity(primaryColor, 0.1)} 0%, ${withOpacity(primaryColor, 0.03)} 50%, transparent 70%)`,
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <Box
        className="floating-element hero-bg-element"
        sx={{
          position: 'absolute',
          top: '40%',
          left: '8%',
          width: { xs: 200, md: 300 },
          height: { xs: 200, md: 300 },
          borderRadius: '50%',
          background: getBackground('radialPurple', isDark),
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      <Box
        className="floating-element hero-bg-element"
        sx={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          width: { xs: 150, md: 250 },
          height: { xs: 150, md: 250 },
          borderRadius: '50%',
          background: getBackground('radialGreen', isDark),
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      {/* Geometric Accent Lines */}
      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          left: '20%',
          width: 2,
          height: 120,
          background: isDark
            ? `linear-gradient(180deg, transparent 0%, ${withOpacity(primaryColor, 0.4)} 50%, transparent 100%)`
            : `linear-gradient(180deg, transparent 0%, ${withOpacity(primaryColor, 0.3)} 50%, transparent 100%)`,
          transform: 'rotate(15deg)',
          opacity: 0.6,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          top: '60%',
          right: '25%',
          width: 2,
          height: 100,
          background: isDark
            ? `linear-gradient(180deg, transparent 0%, ${withOpacity(purpleColor, 0.4)} 50%, transparent 100%)`
            : `linear-gradient(180deg, transparent 0%, ${withOpacity(purpleColor, 0.3)} 50%, transparent 100%)`,
          transform: 'rotate(-20deg)',
          opacity: 0.5,
        }}
      />

      <Container 
        maxWidth="lg" 
        sx={{ 
          maxWidth: containerMaxWidth,
          px: containerPadding,
          position: 'relative',
          zIndex: 10,
        }}
      >
        <Box
          ref={heroContentRef}
          sx={{ 
            textAlign: 'center', 
            maxWidth: { xs: '100%', md: 900 }, 
            mx: 'auto',
          }}
        >
          {/* Enhanced Title with Better Typography */}
          <Typography
            ref={titleRef}
            variant="h1"
            component="h1"
            sx={{
              fontSize: {
                xs: 'clamp(2.5rem, 8vw, 3.5rem)',
                md: 'clamp(3.5rem, 6vw, 5rem)',
              },
              fontWeight: typography.h1.weight,
              color: getTextColor('primary', isDark),
              mb: 4,
              lineHeight: typography.h1.lineHeight,
              letterSpacing: '-0.03em',
              position: 'relative',
              background: getGradient(gradients.multiColor, isDark),
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% 100%',
              animation: 'gradientShift 8s ease-in-out infinite',
              '@keyframes gradientShift': {
                '0%, 100%': { backgroundPosition: '0% 50%' },
                '50%': { backgroundPosition: '100% 50%' },
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 60,
                height: 4,
                background: getGradient(gradients.blueToPurple, isDark),
                borderRadius: themeConfig.borderRadius.sm,
              },
            }}
          >
            From Question to Answer
          </Typography>

          {/* Enhanced Subtitle */}
          <Typography
            ref={subtitleRef}
            variant="body1"
            sx={{
              fontSize: {
                xs: 'clamp(1.1rem, 3vw, 1.25rem)',
                md: 'clamp(1.25rem, 2vw, 1.5rem)',
              },
              color: getTextColor('secondary', isDark),
              lineHeight: typography.bodyLarge.lineHeight,
              maxWidth: 800,
              mx: 'auto',
              mb: 6,
              fontWeight: typography.bodyLarge.weight,
              textShadow: isDark ? '0 2px 10px rgba(0, 0, 0, 0.3)' : 'none',
            }}
          >
            Experience the power of natural-language AI combined with specialized industrial agents 
            and intelligent process knowledge mapping. Here's exactly how ChatAPC transforms 
            your questions into actionable insights.
          </Typography>

          {/* Enhanced Action Buttons */}
          <Box 
            // ref={buttonsRef} // Removed the ref to prevent animation bugs
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 3,
              justifyContent: 'center',
              alignItems: 'center',
              mb: 8,
              // Make sure nothing implicitly hides children (i.e., don't set opacity:0 or display:none here)
            }}
          >
            {/* Primary Button - "See How It Works" */}
            {/* 
              To ensure both buttons are the same size:
                - Use identical padding (px and py)
                - Use identical fontSize and fontWeight
                - Use minWidth to force same width
                - Outlined button gets same minWidth as contained
            */}
            <Button
              variant="contained"
              size="large"
              startIcon={<Visibility />}
              onClick={handleScrollToProcess}
              sx={{
                px: 6,
                py: 3,
                minWidth: { xs: 220, md: 235 }, // force minimum width to match
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
              See How It Works
            </Button>
            
            {/* Outlined Button - "Try Interactive Demo" */}
            <Button
              variant="outlined"
              size="large"
              startIcon={<PlayArrow />}
              onClick={() => navigate('/demo')}
              sx={{
                px: 6,
                py: 3,
                minWidth: { xs: 220, md: 235 }, // force identical minWidth as above
                fontSize: { xs: '1rem', md: '1.125rem' },
                fontWeight: 700, // match contained button's fontWeight
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
              Try Interactive Demo
            </Button>
          </Box>

        </Box>
      </Container>
    </Box>
  );
};