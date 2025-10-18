import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { gsap } from 'gsap';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

const DeploymentHeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();
  const {
    containerMaxWidth,
    containerPadding,
    h1FontSize,
    bodyLargeFontSize,
    sectionPadding,
  } = useResponsiveLayout();

  const accentColor = { light: '#3B82F6', dark: '#60A5FA' };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.from(heroRef.current.children, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [isDark]);

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
          {/* Main Heading */}
          <Typography
            variant="h1"
            sx={{
              fontSize: h1FontSize,
              fontWeight: 700,
              color: isDark ? '#FFFFFF' : '#0F172A',
              mb: 4,
              lineHeight: 1.2,
              maxWidth: 900,
            }}
          >
            Deploy ChatAPC Anywhere
          </Typography>

          {/* Description */}
          <Typography
            sx={{
              fontSize: bodyLargeFontSize,
              color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#64748B',
              lineHeight: 1.7,
              maxWidth: 800,
            }}
          >
            Every plant is different. That's why ChatAPC is built to fit your infrastructure, whether you run on-premise, in the cloud, or in a hybrid setup. Our flexible deployment options ensure seamless integration with your existing systems while maintaining the security and reliability standards your operations demand.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default DeploymentHeroSection;