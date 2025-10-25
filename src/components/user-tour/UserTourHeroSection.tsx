import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { gsap } from 'gsap';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';
import { getGradient, themeConfig } from '../shared/themeConfig';
import { applyEntranceAnimation } from '../shared/animationHelpers';

export const UserTourHeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const overlineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  const { isDark } = useThemeMode();
  const {
    containerMaxWidth,
    containerPadding,
    h1FontSize,
    bodyLargeFontSize,
    sectionPadding,
  } = useResponsiveLayout();
  const { gradients, typography } = themeConfig;

  useEffect(() => {
    const ctx = gsap.context(() => {
      applyEntranceAnimation(overlineRef.current, 'slideUp', {
        startTrigger: 'top 90%',
      });
      applyEntranceAnimation(titleRef.current, 'slideUp', {
        delay: 0.08,
        startTrigger: 'top 90%',
      });
      applyEntranceAnimation(descriptionRef.current, 'fadeIn', {
        delay: 0.16,
        startTrigger: 'top 88%',
      });
    }, heroRef);

    return () => ctx.revert();
  }, [isDark]);

  const mainTextColor = isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 1)';
  const secondaryTextColor = isDark ? 'rgba(255, 255, 255, 0.7)' : '#64748B';

  return (
    <Box
      sx={{
        width: '100%',
        pt: { xs: 12, md: 16 },
        pb: { xs: 8, md: 12 },
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
        <Box ref={heroRef}>
          {/* Overline */}
          <Box
            ref={overlineRef}
            sx={{
              mb: 2.5,
            }}
          >
            <Typography
              variant="overline"
              sx={{
                fontWeight: 700,
                letterSpacing: '0.18em',
                color: isDark ? 'rgba(147, 197, 253, 1)' : 'rgba(37, 99, 235, 1)',
                fontSize: { xs: '0.75rem', md: '0.8rem' },
                transition: 'color 0.3s ease',
              }}
            >
              Product Tour
            </Typography>
          </Box>

          {/* Heading */}
          <Box ref={titleRef} component="h1"
            sx={{
              background: getGradient(gradients.blueToPurple, isDark),
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: h1FontSize,
              fontWeight: typography?.h1?.weight ?? 700,
              mb: 6,
              lineHeight: 1.2,
              maxWidth: 900,
              transition: 'all 0.3s ease',
              letterSpacing: '-0.02em',
            }}
          >
            Explore ChatAPC in Action
          </Box>

          {/* Description */}
          <Box ref={descriptionRef}>
            <Typography
              sx={{
                fontSize: bodyLargeFontSize,
                color: secondaryTextColor,
                lineHeight: 1.7,
                maxWidth: 800,
                transition: 'color 0.3s ease',
              }}
            >
              Launch the interactive walkthrough to see how ChatAPC surfaces process insights, collaborates with your team,
              and accelerates troubleshooting.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
