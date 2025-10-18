import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography } from '@mui/material';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';
// Import the unified animation system helpers
import {
  applyEntranceAnimation,
  applyStaggerAnimation,
} from '../shared/animationHelpers';

const IntegrationArchitectureSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  // Use an array of refs for feature items to ensure proper GSAP animation
  const featureItemsRef = useRef<Array<HTMLDivElement | null>>([]);
  const { isDark } = useThemeMode();
  const {
    containerMaxWidth,
    containerPadding,
    h2FontSize,
    bodyFontSize,
    sectionPadding,
  } = useResponsiveLayout();

  const accentColor = { light: '#10B981', dark: '#34D399' };

  useEffect(() => {
    // Header Animation (entire box: fade in + slide up)
    applyEntranceAnimation(headerRef.current, 'slideUp', {
      delay: 0,
      startTrigger: 'top 85%',
    });
    // Diagram Animation (scale up, fade in)
    applyEntranceAnimation(diagramRef.current, 'scaleUp', {
      delay: 0.06,
      startTrigger: 'top 80%',
    });
    // Features Animation (stagger from left)
    const validItems = featureItemsRef.current.filter(Boolean);
    if (validItems.length > 0) {
      applyStaggerAnimation(validItems, 'slideLeft', {
        staggerDelay: 0.12,
        triggerElement: validItems[0]?.parentElement,
        startTrigger: 'top 85%',
      });
    }
  }, [isDark]);

  const features = [
    'Seamless DCS/SCADA integration',
    'Real-time data synchronization',
    'Historian connectivity',
    'Secure API endpoints',
    'Custom connector framework',
  ];

  return (
    <Box
      ref={sectionRef}
      sx={{
        width: '100%',
        py: sectionPadding,
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
        {/* Header */}
        <Box ref={headerRef} sx={{ mb: { xs: 8, md: 10 } }}>
          <Typography
            sx={{
              fontSize: { xs: '0.875rem', md: '1rem' },
              fontWeight: 700,
              color: accentColor[isDark ? 'dark' : 'light'],
              textTransform: 'uppercase',
              letterSpacing: 2,
              mb: 2,
            }}
          >
            System Integration
          </Typography>
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
            Seamless System Integration
          </Typography>
          <Typography
            sx={{
              fontSize: bodyFontSize,
              color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#64748B',
              lineHeight: 1.7,
              maxWidth: 800,
            }}
          >
            Our proven integration framework connects with your existing infrastructure without disrupting operations. ChatAPC acts as a transparent layer that enhances your systems without replacing them.
          </Typography>
        </Box>

        {/* Content Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 6, md: 8 },
            alignItems: 'center',
          }}
        >
          {/* Diagram Placeholder */}
          <Box
            ref={diagramRef}
            sx={{
              position: 'relative',
              width: '100%',
              height: { xs: 300, md: 400 },
              borderRadius: 2,
              background: isDark 
                ? 'rgba(30, 41, 59, 0.4)' 
                : 'rgba(248, 250, 252, 0.8)',
              border: isDark 
                ? '2px dashed rgba(71, 85, 105, 0.3)' 
                : '2px dashed rgba(226, 232, 240, 1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              overflow: 'hidden',
            }}
          >
            <AccountTreeIcon 
              sx={{ 
                fontSize: 64, 
                color: `${accentColor[isDark ? 'dark' : 'light']}50`,
              }} 
            />
            <Typography
              sx={{
                fontSize: { xs: '1rem', md: '1.25rem' },
                fontWeight: 500,
                color: `${accentColor[isDark ? 'dark' : 'light']}80`,
                textAlign: 'center',
              }}
            >
              Integration Architecture Diagram
            </Typography>
            <Typography
              sx={{
                fontSize: '0.875rem',
                color: isDark ? 'rgba(255, 255, 255, 0.4)' : '#64748B',
                textAlign: 'center',
                px: 3,
              }}
            >
              Visual representation of data flow
            </Typography>
          </Box>

          {/* Features List */}
          <Box>
            {features.map((feature, index) => (
              <Box
                key={index}
                className="feature-item"
                ref={el => featureItemsRef.current[index] = el as HTMLDivElement}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 3,
                  p: 3,
                  mb: 2,
                  borderRadius: 0,
                  borderLeft: isDark ? '2px solid rgba(71, 85, 105, 0.3)' : '2px solid rgba(226, 232, 240, 1)',
                  background: 'transparent',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    pl: 4,
                    borderLeftColor: accentColor[isDark ? 'dark' : 'light'],
                    borderLeftWidth: '3px',
                    background: isDark
                      ? `linear-gradient(90deg, ${accentColor.dark}10 0%, transparent 100%)`
                      : `linear-gradient(90deg, ${accentColor.light}08 0%, transparent 100%)`,
                  },
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: accentColor[isDark ? 'dark' : 'light'],
                    boxShadow: `0 0 12px ${accentColor[isDark ? 'dark' : 'light']}50`,
                    flexShrink: 0,
                  }}
                />
                <Typography
                  sx={{
                    fontSize: { xs: '1rem', md: '1.125rem' },
                    color: isDark ? 'rgba(255, 255, 255, 0.9)' : '#0F172A',
                    fontWeight: 500,
                  }}
                >
                  {feature}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default IntegrationArchitectureSection;