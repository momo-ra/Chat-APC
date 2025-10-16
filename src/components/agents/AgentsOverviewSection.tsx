import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Card, CardContent, Chip } from '@mui/material';
import { 
  SmartToy, 
  Tune, 
  Explore,
  Chat,
  TrendingUp
} from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

gsap.registerPlugin(ScrollTrigger);

const agentCapabilities = [
  {
    title: 'Adjust time window or tags',
    agent: 'Graph Agent',
    description: 'Customize your data visualization in real-time',
    icon: Tune,
    color: { light: '#3B82F6', dark: '#60A5FA' },
  },
  {
    title: 'Explore and zoom through equipment',
    agent: 'Process Navigator',
    description: 'Navigate your plant\'s knowledge map interactively',
    icon: Explore,
    color: { light: '#10B981', dark: '#34D399' },
  },
  {
    title: 'Question decisions or shifts',
    agent: 'Process Advisor',
    description: 'Get explanations about process behavior and changes',
    icon: Chat,
    color: { light: '#F59E0B', dark: '#FBBF24' },
  },
  {
    title: 'Review and filter events',
    agent: 'Events Manager',
    description: 'Track and analyze operational events over time',
    icon: TrendingUp,
    color: { light: '#EC4899', dark: '#F472B6' },
  },
];

export const AgentsOverviewSection: React.FC = () => {
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
  const visionRef = useRef<HTMLDivElement>(null);

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

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
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

      // Vision section animation
      if (visionRef.current) {
        gsap.from(visionRef.current.children, {
          scrollTrigger: {
            trigger: visionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      component="section"
      data-section-theme={isDark ? 'dark' : 'light'}
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
        <Box ref={headerRef} sx={{ textAlign: 'center', mb: { xs: 8, md: 12 } }}>
          <Chip
            label="Digital Co-Workers"
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
            What are Agents?
          </Typography>
          <Typography
            sx={{
              fontSize: bodyFontSize,
              color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#64748B',
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.7,
              mb: 3,
            }}
          >
            Agents are specialized digital co-workers inside ChatAPC. Each one has a role: 
            one shows you the graph, another explains process behavior, another watches profit, 
            another keeps track of events.
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.125rem', md: '1.25rem' },
              fontWeight: 600,
              color: isDark ? '#A78BFA' : '#8B5CF6',
              maxWidth: '700px',
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            You don't just receive static answers — you can drive the interaction:
          </Typography>
        </Box>

        {/* Interactive Capabilities */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: { xs: 4, md: 6 },
            mb: { xs: 8, md: 12 },
          }}
        >
          {agentCapabilities.map((capability, index) => {
            const IconComponent = capability.icon;
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
                    : 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(20px)',
                  border: isDark 
                    ? `1px solid rgba(71, 85, 105, 0.3)`
                    : `1px solid rgba(226, 232, 240, 0.8)`,
                  borderRadius: 4,
                  height: '100%',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: isDark
                      ? `0 20px 60px ${capability.color.dark}20`
                      : `0 20px 60px ${capability.color.light}15`,
                    borderColor: capability.color[isDark ? 'dark' : 'light'],
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
                    background: `linear-gradient(90deg, ${capability.color[isDark ? 'dark' : 'light']} 0%, ${capability.color[isDark ? 'dark' : 'light']}80 100%)`,
                    borderRadius: '4px 4px 0 0',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
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
                      background: `${capability.color[isDark ? 'dark' : 'light']}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1) rotate(5deg)',
                      },
                    }}
                  >
                    <IconComponent
                      sx={{
                        fontSize: 32,
                        color: capability.color[isDark ? 'dark' : 'light'],
                      }}
                    />
                  </Box>

                  {/* Agent Name */}
                  <Chip
                    label={capability.agent}
                    sx={{
                      mb: 2,
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      background: `${capability.color[isDark ? 'dark' : 'light']}20`,
                      color: capability.color[isDark ? 'dark' : 'light'],
                      border: `1px solid ${capability.color[isDark ? 'dark' : 'light']}30`,
                    }}
                  />

                  {/* Capability Title */}
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: isDark ? '#FFFFFF' : '#0F172A',
                      mb: 2,
                      lineHeight: 1.3,
                    }}
                  >
                    {capability.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    sx={{
                      fontSize: '1rem',
                      color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#475569',
                      lineHeight: 1.6,
                    }}
                  >
                    {capability.description}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Box>

        {/* Vision Section */}
        <Box
          ref={visionRef}
          sx={{
            textAlign: 'center',
            p: { xs: 4, md: 6 },
            background: isDark
              ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)'
              : 'linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)',
            borderRadius: 4,
            border: isDark
              ? '1px solid rgba(139, 92, 246, 0.2)'
              : '1px solid rgba(139, 92, 246, 0.15)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background Pattern */}
          <Box
            sx={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: isDark
                ? 'conic-gradient(from 0deg at 50% 50%, rgba(139, 92, 246, 0.08) 0deg, rgba(59, 130, 246, 0.08) 180deg, rgba(139, 92, 246, 0.08) 360deg)'
                : 'conic-gradient(from 0deg at 50% 50%, rgba(139, 92, 246, 0.03) 0deg, rgba(59, 130, 246, 0.03) 180deg, rgba(139, 92, 246, 0.03) 360deg)',
              animation: 'rotate 30s linear infinite',
              zIndex: -1,
            }}
          />

          <SmartToy
            sx={{
              fontSize: 48,
              color: isDark ? '#A78BFA' : '#8B5CF6',
              mb: 3,
            }}
          />

          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: '1.5rem', md: '1.75rem' },
              fontWeight: 700,
              color: isDark ? '#FFFFFF' : '#0F172A',
              mb: 3,
            }}
          >
            Agents Work Together as an Ecosystem
          </Typography>

          <Typography
            sx={{
              fontSize: '1rem',
              color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#64748B',
              maxWidth: '700px',
              mx: 'auto',
              lineHeight: 1.7,
              mb: 4,
            }}
          >
            Because they share the same foundation, agents work together as an ecosystem. Our vision is to connect them with external apps and agents — extending insights across dashboards, planning tools, or even other AI copilots.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              flexWrap: 'wrap',
            }}
          >
            {['Dashboards', 'Planning Tools', 'AI Copilots'].map((tool, index) => (
              <Chip
                key={tool}
                label={tool}
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  px: 3,
                  py: 1,
                  background: isDark
                    ? 'rgba(167, 139, 250, 0.2)'
                    : 'rgba(139, 92, 246, 0.1)',
                  color: isDark ? '#A78BFA' : '#8B5CF6',
                  border: isDark
                    ? '1px solid rgba(167, 139, 250, 0.3)'
                    : '1px solid rgba(139, 92, 246, 0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    background: isDark
                      ? 'rgba(167, 139, 250, 0.3)'
                      : 'rgba(139, 92, 246, 0.15)',
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      </Container>

      {/* Keyframes */}
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