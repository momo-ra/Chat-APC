import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Card, CardContent } from '@mui/material';
import { Psychology, Hub, IntegrationInstructions, TrendingUp } from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

gsap.registerPlugin(ScrollTrigger);

const ecosystemFeatures = [
  {
    icon: Psychology,
    title: "Smarter",
    subtitle: "New specialized agents",
    description: "Each new agent brings deeper expertise and more sophisticated understanding of your processes.",
    gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: { light: '#6366f1', dark: '#818cf8' },
  },
  {
    icon: Hub,
    title: "Better Connected",
    subtitle: "Enhanced data integrations",
    description: "Seamlessly connect to more data sources, systems, and enterprise platforms for comprehensive insights.",
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: { light: '#10b981', dark: '#34d399' },
  },
  {
    icon: IntegrationInstructions,
    title: "More Integrated",
    subtitle: "Embedded in daily operations",
    description: "ChatAPC becomes a natural part of your workflow, available whenever and wherever you need assistance.",
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    color: { light: '#f59e0b', dark: '#fbbf24' },
  },
];

export const RoadmapEcosystemSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();
  const {
    h2FontSize,
    h4FontSize,
    containerMaxWidth,
    containerPadding
  } = useResponsiveLayout();

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
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power2.out',
        });
      }

      // Cards animation with stagger
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 40,
            rotation: index % 2 === 0 ? -1 : 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power2.out',
          });

          // Subtle floating animation for cards
          gsap.to(card, {
            y: -6,
            duration: 4 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut',
            delay: index * 0.5,
          });
        }
      });

      // Bottom section animation
      if (bottomRef.current) {
        gsap.from(bottomRef.current, {
          scrollTrigger: {
            trigger: bottomRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          scale: 0.96,
          duration: 0.8,
          delay: 0.4,
          ease: 'power2.out',
        });
      }

      // Rotating background elements
      const rotatingElements = sectionRef.current?.querySelectorAll('.rotating-bg');
      rotatingElements?.forEach((element, index) => {
        gsap.to(element, {
          rotation: 360,
          duration: 30 + index * 10,
          repeat: -1,
          ease: 'none',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        py: 'clamp(2.5rem, 10vw, 5rem)',
        position: 'relative',
        overflow: 'hidden',
        // TRANSPARENT - let page background show through
        background: 'transparent',
        // No margins or borders
        margin: 0,
        border: 'none',
      }}
    >
      {/* Subtle Rotating Background Elements */}
      <Box
        className="rotating-bg"
        sx={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: 180,
          height: 180,
          borderRadius: '50%',
          border: isDark
            ? '1px solid rgba(71, 85, 105, 0.2)'
            : '1px solid rgba(203, 213, 225, 0.33)',
          pointerEvents: 'none',
          opacity: isDark ? 0.4 : 0.23,
          background: isDark
            ? 'none'
            : 'radial-gradient(circle at 60% 40%, #f1f5f9 40%, #f8fafc00 100%)',
          zIndex: 0,
        }}
      />
      <Box
        className="rotating-bg"
        sx={{
          position: 'absolute',
          bottom: '15%',
          left: '5%',
          width: 140,
          height: 140,
          borderRadius: '50%',
          border: isDark
            ? '1px solid rgba(71, 85, 105, 0.15)'
            : '1px solid rgba(203, 213, 225, 0.22)',
          pointerEvents: 'none',
          opacity: isDark ? 0.3 : 0.16,
          background: isDark
            ? 'none'
            : 'radial-gradient(circle at 35% 70%, #e0edfa 35%, #f8fafc00 100%)',
          zIndex: 0,
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
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          {/* Header */}
          <Box ref={headerRef}>
            <Typography
              variant="h2"
              sx={{
                fontSize: h2FontSize,
                fontWeight: 800,
                color: isDark ? '#f1f5f9' : '#1e293b',
                mb: 2,
                transition: 'color 0.3s ease',
              }}
            >
              Digital Colleagues Ecosystem
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
                color: isDark ? '#94a3b8' : '#334155',
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.6,
                transition: 'color 0.3s ease',
              }}
            >
              ChatAPC evolves into an ecosystem where each step makes your digital colleagues:
            </Typography>
          </Box>
        </Box>

        {/* Feature Cards */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 3,
            mb: 8,
          }}
        >
          {ecosystemFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el as HTMLDivElement;
                }}
                elevation={isDark ? 0 : 2}
                sx={{
                  height: '100%',
                  backgroundColor: isDark
                    ? 'rgba(30, 41, 59, 0.4)'
                    : 'rgba(246, 249, 252, 0.90)', // ~light blue shade
                  border: isDark
                    ? '1px solid rgba(51, 65, 85, 0.4)'
                    : '1px solid #cbd5e1',
                  boxShadow: isDark
                    ? undefined
                    : '0 1.5px 16px rgba(30,42,60,0.025)',
                  borderRadius: 3,
                  position: 'relative',
                  overflow: 'visible',
                  transition: 'all 0.4s ease',
                  backdropFilter: isDark ? 'blur(20px)' : undefined,
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.01)',
                    boxShadow: isDark
                      ? `0 20px 40px rgba(0, 0, 0, 0.4)`
                      : `0 12px 28px rgba(80, 105, 135, 0.08)`,
                    borderColor: feature.color[isDark ? 'dark' : 'light'],
                    '&::before': {
                      opacity: 0.16,
                    },
                    '& .feature-icon': {
                      transform: 'scale(1.05)',
                    },
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: -1,
                    background: feature.gradient,
                    borderRadius: 3,
                    opacity: isDark ? 0.06 : 0.07,
                    transition: 'opacity 0.4s ease',
                    zIndex: -1,
                  },
                }}
              >
                <CardContent sx={{ p: 3, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {/* Icon */}
                  <Box
                    className="feature-icon"
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: 3,
                      background: feature.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      transition: 'all 0.3s ease',
                      opacity: 0.95,
                      boxShadow: isDark ? undefined : '0 1px 10px 0 rgba(140,170,220,0.12)',
                    }}
                  >
                    <IconComponent sx={{ fontSize: 32, color: 'white' }} />
                  </Box>

                  {/* Content */}
                  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: '1.75rem',
                        fontWeight: 700,
                        color: feature.color[isDark ? 'dark' : 'light'],
                        mb: 1,
                        transition: 'color 0.3s ease',
                        opacity: 0.9,
                      }}
                    >
                      {feature.title}
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: isDark ? '#cbd5e1' : '#334155',
                        mb: 2,
                        transition: 'color 0.3s ease',
                        opacity: 0.96,
                      }}
                    >
                      {feature.subtitle}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        color: isDark ? '#94a3b8' : '#475569',
                        lineHeight: 1.6,
                        fontSize: '0.98rem',
                        flex: 1,
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Box>

        {/* Bottom Statement */}
        <Box ref={bottomRef} sx={{ textAlign: 'center' }}>
          <Card
            elevation={isDark ? 0 : 3}
            sx={{
              backgroundColor: isDark
                ? 'rgba(30, 41, 59, 0.4)'
                : 'rgba(246,249,252,0.95)',
              border: isDark
                ? '1px solid rgba(51, 65, 85, 0.4)'
                : '1.5px solid #cbd5e1',
              borderRadius: 4,
              p: 'clamp(1.5rem, 4vw, 2rem)',
              // Less glassy in white mode:
              backdropFilter: isDark ? 'blur(20px)' : undefined,
              position: 'relative',
              overflow: 'hidden',
              boxShadow: isDark
                ? undefined
                : '0 2px 26px -4px rgba(100,123,172,0.11)',
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                background: isDark
                  ? 'linear-gradient(135deg, rgba(71, 85, 105, 0.1) 0%, rgba(30, 41, 59, 0.05) 100%)'
                  : 'linear-gradient(135deg, rgba(241, 245, 249, 0.85) 0%, rgba(236,245,253,0.60) 100%)',
                pointerEvents: 'none',
                opacity: 1,
              },
            }}
          >
            <TrendingUp
              sx={{
                fontSize: 42,
                color: isDark ? '#f1f5f9' : '#3b82f6',
                mb: 2,
                opacity: 1,
              }}
            />
            <Typography
              variant="h4"
              sx={{
                fontSize: h4FontSize,
                fontWeight: 700,
                opacity: 0.9,
                zIndex: 10,
                color: isDark ? '#f1f5f9' : '#172554',
                mb: 2,
                transition: 'color 0.3s ease',
              }}
            >
              ChatAPC grows with your plant, your team, and your enterprise.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.1rem',
                color: isDark ? '#94a3b8' : '#334155',
                maxWidth: 500,
                opacity: 0.9,
                mx: 'auto',
                lineHeight: 1.6,
                transition: 'color 0.3s ease',
              }}
            >
              Every enhancement builds upon the last, creating an increasingly powerful
              and integrated AI ecosystem for industrial operations.
            </Typography>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};