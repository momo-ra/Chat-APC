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
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
    color: { light: '#3B82F6', dark: '#009BE4' },
  },
  {
    icon: Hub,
    title: "Better Connected",
    subtitle: "Enhanced data integrations",
    description: "Seamlessly connect to more data sources, systems, and enterprise platforms for comprehensive insights.",
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    color: { light: '#8B5CF6', dark: '#A855F7' },
  },
  {
    icon: IntegrationInstructions,
    title: "More Integrated",
    subtitle: "Embedded in daily operations",
    description: "ChatAPC becomes a natural part of your workflow, available whenever and wherever you need assistance.",
    gradient: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
    color: { light: '#EC4899', dark: '#F472B6' },
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
            rotation: index % 2 === 0 ? -2 : 2,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'back.out(1.7)',
          });

          // Floating animation for cards
          gsap.to(card, {
            y: -5,
            duration: 3 + index * 0.5,
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
          scale: 0.95,
          duration: 0.8,
          delay: 0.6,
          ease: 'back.out(1.7)',
        });
      }

      // Rotating background elements
      const rotatingElements = sectionRef.current?.querySelectorAll('.rotating-bg');
      rotatingElements?.forEach((element, index) => {
        gsap.to(element, {
          rotation: 360,
          duration: 20 + index * 5,
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
        background: isDark
          ? 'radial-gradient(ellipse at center, rgba(30, 58, 138, 0.3) 0%, rgba(17, 24, 39, 1) 70%)'
          : 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.1) 0%, rgba(255, 255, 255, 1) 70%)',
        transition: 'background 0.3s ease',
      }}
    >
      {/* Rotating Background Elements */}
      <Box
        className="rotating-bg"
        sx={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: 200,
          height: 200,
          borderRadius: '50%',
          border: `2px solid ${isDark ? 'rgba(0, 155, 228, 0.1)' : 'rgba(59, 130, 246, 0.1)'}`,
          pointerEvents: 'none',
        }}
      />
      <Box
        className="rotating-bg"
        sx={{
          position: 'absolute',
          bottom: '15%',
          left: '5%',
          width: 150,
          height: 150,
          borderRadius: '50%',
          border: `2px solid ${isDark ? 'rgba(168, 85, 247, 0.1)' : 'rgba(139, 92, 246, 0.1)'}`,
          pointerEvents: 'none',
        }}
      />

      <Container 
        maxWidth="lg"
        sx={{
          maxWidth: containerMaxWidth,
          px: containerPadding,
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
                color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(17, 24, 39, 1)',
                mb: 2,
                background: isDark
                  ? 'linear-gradient(135deg, #FFFFFF 0%, #009BE4 50%, #A855F7 100%)'
                  : 'linear-gradient(135deg, #1E293B 0%, #3B82F6 50%, #8B5CF6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                transition: 'all 0.3s ease',
              }}
            >
              Digital Colleagues Ecosystem
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
                color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(75, 85, 99, 1)',
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
            gap: 4,
            mb: 10,
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
                elevation={isDark ? 0 : 12}
                sx={{
                  height: '100%',
                  backgroundColor: isDark ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                  border: isDark ? '1px solid rgba(55, 65, 81, 1)' : 'none',
                  borderRadius: 4,
                  position: 'relative',
                  overflow: 'visible',
                  transition: 'all 0.4s ease',
                  backdropFilter: 'blur(20px)',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-12px) scale(1.02)',
                    boxShadow: isDark
                      ? `0 25px 80px ${feature.color.dark}30`
                      : `0 25px 80px ${feature.color.light}30`,
                    '&::before': {
                      opacity: 0.3,
                    },
                    '& .feature-icon': {
                      transform: 'scale(1.1) rotate(5deg)',
                      boxShadow: `0 15px 40px ${feature.color[isDark ? 'dark' : 'light']}40`,
                    },
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: -2,
                    background: feature.gradient,
                    borderRadius: 4,
                    opacity: 0.1,
                    transition: 'opacity 0.4s ease',
                    zIndex: -1,
                  },
                }}
              >
                <CardContent sx={{ p: 4, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {/* Icon */}
                  <Box
                    className="feature-icon"
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 4,
                      background: feature.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      transition: 'all 0.4s ease',
                      boxShadow: `0 8px 25px ${feature.color[isDark ? 'dark' : 'light']}20`,
                    }}
                  >
                    <IconComponent sx={{ fontSize: 40, color: 'white' }} />
                  </Box>

                  {/* Content */}
                  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: '2rem',
                        fontWeight: 800,
                        color: feature.color[isDark ? 'dark' : 'light'],
                        mb: 1,
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {feature.title}
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(55, 65, 81, 1)',
                        mb: 2,
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {feature.subtitle}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(75, 85, 99, 1)',
                        lineHeight: 1.6,
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
            elevation={isDark ? 0 : 8}
            sx={{
              backgroundColor: isDark ? 'rgba(31, 41, 55, 0.6)' : 'rgba(255, 255, 255, 0.8)',
              border: isDark ? '1px solid rgba(55, 65, 81, 1)' : 'none',
              borderRadius: 6,
              p: 'clamp(1rem, 4vw, 1.5rem)',
              backdropFilter: 'blur(20px)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                background: isDark
                  ? 'linear-gradient(135deg, rgba(0, 155, 228, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)'
                  : 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                pointerEvents: 'none',
              },
            }}
          >
            <TrendingUp
              sx={{
                fontSize: 48,
                color: isDark ? '#009BE4' : '#3B82F6',
                mb: 2,
              }}
            />
            <Typography
              variant="h4"
              sx={{
                fontSize: h4FontSize,
                fontWeight: 700,
                color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(17, 24, 39, 1)',
                mb: 2,
                transition: 'color 0.3s ease',
              }}
            >
              ChatAPC grows with your plant, your team, and your enterprise.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.125rem',
                color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(75, 85, 99, 1)',
                maxWidth: 500,
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