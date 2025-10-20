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
import { 
  themeConfig, 
  getColor, 
  getTextColor,
  withOpacity 
} from '../shared/themeConfig';

gsap.registerPlugin(ScrollTrigger);

const getAgentCapabilities = (isDark: boolean) => {
  const { colors } = themeConfig;
  return [
    {
      title: 'Adjust time window or tags',
      agent: 'Visualize Agent',
      description: 'Customize your data visualization in real-time',
      icon: Tune,
      color: getColor(colors.blue, isDark),
    },
    {
      title: 'Explore and zoom through equipment',
      agent: 'Process Navigator',
      description: 'Navigate your plant\'s knowledge map interactively',
      icon: Explore,
      color: getColor(colors.green, isDark),
    },
    {
      title: 'Question decisions or shifts',
      agent: 'Advisor Agent',
      description: 'Get explanations about process behavior and changes',
      icon: Chat,
      color: getColor(colors.yellow, isDark),
    },
    {
      title: 'Review and filter events',
      agent: 'Events Manager',
      description: 'Track and analyze operational events over time',
      icon: TrendingUp,
      color: getColor(colors.pink, isDark),
    },
  ];
};

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

  // Get unified theme values
  const { typography, borderRadius, transitions, animations, colors, shadows } = themeConfig;
  const agentCapabilities = getAgentCapabilities(isDark);
  const primaryColor = getColor(colors.blue, isDark);

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
          duration: animations.duration.normal,
          ease: animations.easing.easeOut,
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
            duration: animations.duration.normal,
            delay: index * animations.stagger,
            ease: animations.easing.sharp,
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
          ease: animations.easing.sharp,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [animations]);

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
              color: primaryColor,
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
              fontWeight: typography.h2.weight,
              color: getTextColor('primary', isDark),
              mb: 3,
              lineHeight: typography.h2.lineHeight,
            }}
          >
            What are Agents?
          </Typography>
          <Typography
            sx={{
              fontSize: bodyFontSize,
              color: getTextColor('secondary', isDark),
              maxWidth: '800px',
              lineHeight: typography.body.lineHeight,
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
              color: primaryColor,
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
                  borderLeft: isDark 
                    ? `2px solid ${withOpacity(colors.neutral.darkBorder, 0.3)}` 
                    : `2px solid ${colors.neutral.lightBorder}`,
                  background: 'transparent',
                  transition: transitions.allNormal,
                  '&:hover': {
                    pl: { xs: 4, md: 5 },
                    borderLeftColor: capability.color,
                    borderLeftWidth: '3px',
                    background: isDark
                      ? `linear-gradient(90deg, ${withOpacity(capability.color, 0.06)} 0%, transparent 100%)`
                      : `linear-gradient(90deg, ${withOpacity(capability.color, 0.05)} 0%, transparent 100%)`,
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
                    transition: transitions.normal,
                  }}
                >
                  <IconComponent
                    sx={{
                      fontSize: 36,
                      color: capability.color,
                      transition: transitions.normal,
                    }}
                  />
                </Box>

                {/* Agent Label */}
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: capability.color,
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
                    fontWeight: typography.h5.weight,
                    color: getTextColor('primary', isDark),
                    mb: 2,
                    lineHeight: typography.h5.lineHeight,
                  }}
                >
                  {capability.title}
                </Typography>

                {/* Description */}
                <Typography
                  sx={{
                    fontSize: typography.body.size,
                    color: getTextColor('muted', isDark),
                    lineHeight: typography.body.lineHeight,
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
            borderTop: isDark 
              ? `1px solid ${withOpacity(colors.neutral.darkBorder, 0.3)}` 
              : `1px solid ${colors.neutral.lightBorder}`,
          }}
        >
          {/* Icon */}
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: borderRadius.sm,
              background: primaryColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 4,
              boxShadow: isDark
                ? `0 8px 24px ${withOpacity(primaryColor, 0.3)}`
                : `0 8px 24px ${withOpacity(primaryColor, 0.25)}`,
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
              fontSize: typography.h3.size,
              fontWeight: typography.h3.weight,
              color: getTextColor('primary', isDark),
              mb: 3,
              lineHeight: typography.h3.lineHeight,
              maxWidth: 800,
            }}
          >
            Agents Work Together as an Ecosystem
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: '1rem', md: '1.125rem' },
              color: getTextColor('secondary', isDark),
              maxWidth: '800px',
              lineHeight: typography.body.lineHeight,
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
                  px: 2,
                  py: 1.5,
                  borderRadius: borderRadius.sm,
                  background: isDark
                    ? withOpacity(colors.neutral.darkBackground, 0.3)
                    : withOpacity('#F1F5F9', 0.8),
                  border: isDark
                    ? `1px solid ${withOpacity(colors.neutral.darkBorder, 0.5)}`
                    : `1px solid ${colors.neutral.lightBorder}`,
                  transition: transitions.normal,
                  cursor: 'default',
                  '&:hover': {
                    background: isDark
                      ? withOpacity(primaryColor, 0.1)
                      : withOpacity(primaryColor, 0.04),
                    borderColor: primaryColor,
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: typography.bodySmall.size,
                    fontWeight: 600,
                    color: getTextColor('secondary', isDark),
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