import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography } from '@mui/material';
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
    agent: 'Visualize Agent',
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
    agent: 'Advisor Agent',
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

export const AgentsShowcaseSection: React.FC = () => {
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
        gsap.from(headerRef.current, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
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
        gsap.from(visionRef.current, {
          scrollTrigger: {
            trigger: visionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 40,
          opacity: 0,
          duration: 0.6,
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
              color: isDark ? '#60A5FA' : '#3B82F6',
              textTransform: 'uppercase',
              letterSpacing: 2,
              mb: 2,
            }}
          >
            How it Works
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
            What are Agents?
          </Typography>
          <Typography
            sx={{
              fontSize: bodyFontSize,
              color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#64748B',
              maxWidth: '800px',
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
              color: isDark ? '#60A5FA' : '#3B82F6',
              maxWidth: '700px',
              lineHeight: 1.6,
            }}
          >
            You don't just receive static answers — you can drive the interaction:
          </Typography>
        </Box>

        {/* Interactive Capabilities - Grid Layout */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
            gap: { xs: 3, md: 4 },
            mb: { xs: 10, md: 14 },
          }}
        >
          {agentCapabilities.map((capability, index) => {
            const IconComponent = capability.icon;
            return (
              <Box
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el as HTMLDivElement;
                }}
                sx={{
                  position: 'relative',
                  p: { xs: 3, md: 4 },
                  borderRadius: 0,
                  borderLeft: isDark ? '2px solid rgba(71, 85, 105, 0.3)' : '2px solid rgba(226, 232, 240, 1)',
                  background: 'transparent',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    pl: { xs: 4, md: 5 },
                    borderLeftColor: capability.color[isDark ? 'dark' : 'light'],
                    borderLeftWidth: '3px',
                    background: isDark
                      ? `linear-gradient(90deg, ${capability.color.dark}10 0%, transparent 100%)`
                      : `linear-gradient(90deg, ${capability.color.light}08 0%, transparent 100%)`,
                    '& .capability-icon': {
                      transform: 'scale(1.1) rotate(5deg)',
                    },
                  },
                }}
              >
                {/* Icon */}
                <Box
                  className="capability-icon"
                  sx={{
                    width: 56,
                    height: 56,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                    transition: 'all 0.4s ease',
                  }}
                >
                  <IconComponent
                    sx={{
                      fontSize: 36,
                      color: capability.color[isDark ? 'dark' : 'light'],
                      transition: 'all 0.4s ease',
                    }}
                  />
                </Box>

                {/* Agent Label */}
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: capability.color[isDark ? 'dark' : 'light'],
                    textTransform: 'uppercase',
                    letterSpacing: 1.5,
                    mb: 1,
                  }}
                >
                  {capability.agent}
                </Typography>

                {/* Title */}
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: { xs: '1.25rem', md: '1.4rem' },
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
                    color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#64748B',
                    lineHeight: 1.7,
                  }}
                >
                  {capability.description}
                </Typography>
              </Box>
            );
          })}
        </Box>

        {/* Vision Section - Simplified */}
        <Box
          ref={visionRef}
          sx={{
            position: 'relative',
            pt: { xs: 8, md: 10 },
            borderTop: isDark ? '1px solid rgba(71, 85, 105, 0.3)' : '1px solid rgba(226, 232, 240, 1)',
          }}
        >
          {/* Icon */}
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: 2,
              background: isDark ? '#60A5FA' : '#3B82F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 4,
              boxShadow: isDark
                ? '0 8px 24px rgba(96, 165, 250, 0.3)'
                : '0 8px 24px rgba(59, 130, 246, 0.25)',
            }}
          >
            <SmartToy
              sx={{
                fontSize: 40,
                color: '#FFFFFF',
              }}
            />
          </Box>

          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '1.75rem', md: '2.25rem' },
              fontWeight: 700,
              color: isDark ? '#FFFFFF' : '#0F172A',
              mb: 3,
              lineHeight: 1.2,
              maxWidth: 800,
            }}
          >
            Agents Work Together as an Ecosystem
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: '1rem', md: '1.125rem' },
              color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#64748B',
              maxWidth: '800px',
              lineHeight: 1.7,
              mb: 5,
            }}
          >
            Because they share the same foundation, agents work together as an ecosystem. Our vision is to connect them with external apps and agents — extending insights across dashboards, planning tools, or even other AI copilots.
          </Typography>

          {/* Integration Tags */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            {['Dashboards', 'Planning Tools', 'AI Copilots'].map((tool) => (
              <Box
                key={tool}
                sx={{
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  background: isDark
                    ? 'rgba(71, 85, 105, 0.3)'
                    : 'rgba(241, 245, 249, 0.8)',
                  border: isDark
                    ? '1px solid rgba(71, 85, 105, 0.5)'
                    : '1px solid rgba(226, 232, 240, 1)',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                  '&:hover': {
                    background: isDark
                      ? 'rgba(96, 165, 250, 0.1)'
                      : 'rgba(59, 130, 246, 0.04)',
                    borderColor: isDark ? '#60A5FA' : '#3B82F6',
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#475569',
                  }}
                >
                  {tool}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};