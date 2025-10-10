import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Card, CardContent, Chip } from '@mui/material';
import { 
  AccountTree, 
  Explore, 
  TrendingUp,
  Psychology,
  Engineering,
  Insights
} from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

gsap.registerPlugin(ScrollTrigger);

const mapFeatures = [
  {
    title: 'Context-rich',
    description: 'TI100 isn\'t just a number — it\'s a temperature indicator, tied to E-200, controlling feed flow',
    icon: Psychology,
    color: { light: '#8B5CF6', dark: '#A78BFA' },
  },
  {
    title: 'Structured',
    description: 'Equipment, loops, variables, and alarms are linked in meaningful relationships',
    icon: AccountTree,
    color: { light: '#10B981', dark: '#34D399' },
  },
  {
    title: 'Explorable',
    description: 'Navigate the map directly, zooming into loops, units, or entire process areas',
    icon: Explore,
    color: { light: '#F59E0B', dark: '#FBBF24' },
  },
  {
    title: 'Evolving',
    description: 'As you add more, the map grows — becoming your single source of truth',
    icon: TrendingUp,
    color: { light: '#EC4899', dark: '#F472B6' },
  },
];

export const KnowledgeMapSection: React.FC = () => {
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
  const visualRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement[]>([]);

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
          ease: 'power3.out',
        });
      }

      // Visual elements animation
      if (visualRef.current) {
        const elements = visualRef.current.querySelectorAll('.map-element');
        gsap.from(elements, {
          scrollTrigger: {
            trigger: visualRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          scale: 0,
          rotation: 180,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.7)',
        });

        // Connection lines animation
        const connections = visualRef.current.querySelectorAll('.connection-line');
        gsap.from(connections, {
          scrollTrigger: {
            trigger: visualRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
          scaleX: 0,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.8,
          ease: 'power2.out',
        });
      }

      // Features animation
      featuresRef.current.forEach((feature, index) => {
        if (feature) {
          gsap.from(feature, {
            scrollTrigger: {
              trigger: feature,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
            y: 60,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power2.out',
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        py: sectionPadding,
        background: isDark
          ? 'linear-gradient(180deg, #0F1419 0%, #1A1F2E 50%, #0F1419 100%)'
          : 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 50%, #FFFFFF 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '20%',
          left: '-5%',
          width: '60%',
          height: '60%',
          background: isDark
            ? 'radial-gradient(ellipse, rgba(139, 92, 246, 0.1) 0%, transparent 70%)'
            : 'radial-gradient(ellipse, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
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
        {/* Section Header */}
        <Box ref={headerRef} sx={{ textAlign: 'center', mb: { xs: 8, md: 12 } }}>
          <Chip
            label="Context Made Visible"
            sx={{
              mb: 3,
              fontSize: '0.875rem',
              fontWeight: 600,
              background: isDark
                ? 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)'
                : 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
              color: 'white',
              px: 2,
            }}
          />
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
            The Knowledge Map
          </Typography>
          <Typography
            sx={{
              fontSize: bodyFontSize,
              color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#64748B',
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.7,
              mb: 2,
            }}
          >
            Raw tags alone don't explain a process. ChatAPC builds a knowledge map: a living model of your plant.
          </Typography>
          <Typography
            sx={{
              fontSize: '1.125rem',
              fontWeight: 600,
              color: isDark ? '#A78BFA' : '#7C3AED',
              fontStyle: 'italic',
            }}
          >
            The map lets ChatAPC understand your plant like an experienced engineer would
          </Typography>
        </Box>

        {/* Visual Knowledge Map Representation */}
        <Box
          ref={visualRef}
          sx={{
            position: 'relative',
            height: { xs: 300, md: 400 },
            mb: { xs: 8, md: 12 },
            background: isDark
              ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.3) 0%, rgba(15, 23, 42, 0.5) 100%)'
              : 'linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(255, 255, 255, 0.9) 100%)',
            borderRadius: 4,
            border: isDark 
              ? '1px solid rgba(71, 85, 105, 0.3)'
              : '1px solid rgba(226, 232, 240, 0.8)',
            overflow: 'hidden',
          }}
        >
          {/* Central Equipment Node */}
          <Box
            className="map-element"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: 80, md: 100 },
              height: { xs: 80, md: 100 },
              borderRadius: 3,
              background: isDark
                ? 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)'
                : 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 32px rgba(139, 92, 246, 0.3)',
            }}
          >
            <Engineering sx={{ fontSize: { xs: 32, md: 40 }, color: 'white' }} />
          </Box>

          {/* Surrounding Nodes */}
          {[
            { top: '20%', left: '20%', label: 'TI100', color: '#10B981' },
            { top: '20%', right: '20%', label: 'E-200', color: '#F59E0B' },
            { bottom: '20%', left: '20%', label: 'Feed Flow', color: '#EC4899' },
            { bottom: '20%', right: '20%', label: 'Alarms', color: '#3B82F6' },
          ].map((node, index) => (
            <Box
              key={index}
              className="map-element"
              sx={{
                position: 'absolute',
                ...node,
                width: { xs: 60, md: 80 },
                height: { xs: 60, md: 80 },
                borderRadius: 2,
                background: `${node.color}20`,
                border: `2px solid ${node.color}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: '0.75rem', md: '0.875rem' },
                  fontWeight: 600,
                  color: node.color,
                  textAlign: 'center',
                }}
              >
                {node.label}
              </Typography>
            </Box>
          ))}

          {/* Connection Lines */}
          <Box
            className="connection-line"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '20%',
              width: '25%',
              height: 2,
              background: `linear-gradient(90deg, #10B981 0%, ${isDark ? '#8B5CF6' : '#7C3AED'} 100%)`,
              transform: 'translateY(-50%)',
              borderRadius: 1,
            }}
          />
          <Box
            className="connection-line"
            sx={{
              position: 'absolute',
              top: '50%',
              right: '20%',
              width: '25%',
              height: 2,
              background: `linear-gradient(90deg, ${isDark ? '#8B5CF6' : '#7C3AED'} 0%, #F59E0B 100%)`,
              transform: 'translateY(-50%)',
              borderRadius: 1,
            }}
          />
          <Box
            className="connection-line"
            sx={{
              position: 'absolute',
              bottom: '35%',
              left: '35%',
              width: 2,
              height: '25%',
              background: `linear-gradient(180deg, ${isDark ? '#8B5CF6' : '#7C3AED'} 0%, #EC4899 100%)`,
              transform: 'translateX(-50%)',
              borderRadius: 1,
            }}
          />
          <Box
            className="connection-line"
            sx={{
              position: 'absolute',
              bottom: '35%',
              right: '35%',
              width: 2,
              height: '25%',
              background: `linear-gradient(180deg, ${isDark ? '#8B5CF6' : '#7C3AED'} 0%, #3B82F6 100%)`,
              transform: 'translateX(50%)',
              borderRadius: 1,
            }}
          />

          {/* Floating Labels */}
          <Typography
            sx={{
              position: 'absolute',
              top: '10%',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#64748B',
              background: isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.8)',
              px: 2,
              py: 0.5,
              borderRadius: 2,
              backdropFilter: 'blur(10px)',
            }}
          >
            Process Knowledge Map
          </Typography>
        </Box>

        {/* Features Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: { xs: 4, md: 6 },
          }}
        >
          {mapFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card
                key={index}
                ref={(el) => {
                  if (el) featuresRef.current[index] = el as HTMLDivElement;
                }}
                elevation={0}
                sx={{
                  background: isDark
                    ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.6) 100%)'
                    : 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(20px)',
                  border: isDark 
                    ? `1px solid rgba(71, 85, 105, 0.3)`
                    : `1px solid rgba(226, 232, 240, 0.8)`,
                  borderRadius: 4,
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: isDark
                      ? `0 20px 60px ${feature.color.dark}20`
                      : `0 20px 60px ${feature.color.light}15`,
                    borderColor: feature.color[isDark ? 'dark' : 'light'],
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  {/* Icon */}
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: 3,
                      background: `${feature.color[isDark ? 'dark' : 'light']}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                    }}
                  >
                    <IconComponent
                      sx={{
                        fontSize: 32,
                        color: feature.color[isDark ? 'dark' : 'light'],
                      }}
                    />
                  </Box>

                  {/* Title */}
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: isDark ? '#FFFFFF' : '#0F172A',
                      mb: 2,
                      lineHeight: 1.3,
                    }}
                  >
                    {feature.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    sx={{
                      fontSize: '1rem',
                      color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#475569',
                      lineHeight: 1.6,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};