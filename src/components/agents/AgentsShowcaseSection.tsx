import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Card, CardContent, Chip } from '@mui/material';
import { 
  Assessment, 
  AccountTree, 
  Psychology,
  TrendingUp,
  EventNote
} from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

gsap.registerPlugin(ScrollTrigger);

const agents = [
  {
    name: 'Graph Agent',
    tagline: 'Brings your process data to life — and lets you shape it.',
    description: 'Turns raw numbers into a clear story you can explore interactively',
    icon: Assessment,
    color: { light: '#3B82F6', dark: '#60A5FA' },
    features: [
      'Instantly plot variables, add limits, overlay alarms',
      'Highlight critical events with labels like "Constraint violated"',
      'Build and customize plots yourself, choosing tags, time ranges, and overlays',
    ],
  },
  {
    name: 'Process Navigator',
    tagline: 'Your interactive map of the plant.',
    description: 'Gives both a visual overview and plain-language explanations',
    icon: AccountTree,
    color: { light: '#10B981', dark: '#34D399' },
    features: [
      'Explore equipment, controllers, and loops in a connected graph',
      'Ask "What is TI100?" or "Show me all loops linked to E-200"',
      'Zoom, click, and navigate the plant map directly',
    ],
  },
  {
    name: 'Process Advisor',
    tagline: 'Explains plant behavior in plain English.',
    description: 'Acts like your most experienced operator, always available',
    icon: Psychology,
    color: { light: '#8B5CF6', dark: '#A78BFA' },
    features: [
      'Monitors controllers and tells you why they act as they do',
      'Builds shift narratives: alarms, mode changes, operator actions',
      'Ask it follow-up questions: "Why did this drop?", "What if I increase feed?"',
    ],
  },
  {
    name: 'Profit Advisor',
    tagline: 'Your always-on margin hunter.',
    description: 'Works continuously as a profit watchdog',
    icon: TrendingUp,
    color: { light: '#F59E0B', dark: '#FBBF24' },
    features: [
      'Spots opportunities for throughput, yield, or efficiency gains',
      'Gives clear recommendations: "This constraint has freed up, feed can go higher"',
      'Interact directly: test scenarios, explore "what-if" changes, and see potential gains',
    ],
  },
  {
    name: 'Events Manager',
    tagline: 'Your timeline of truth.',
    description: 'Keeps everyone aligned with a shared operational memory',
    icon: EventNote,
    color: { light: '#EC4899', dark: '#F472B6' },
    features: [
      'Logs alarms, shutdowns, and mode changes automatically',
      'Summarizes a shift, a day, or a whole week',
      'Let users search or filter events, drill down, and connect them to process data',
    ],
  },
];

export const AgentsShowcaseSection: React.FC = () => {
  const { isDark } = useThemeMode();
  const { 
    containerMaxWidth, 
    containerPadding,
    h2FontSize,
    sectionPadding 
  } = useResponsiveLayout();

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const agentRefs = useRef<HTMLDivElement[]>([]);

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

      // Agent cards animation
      agentRefs.current.forEach((agent, index) => {
        if (agent) {
          gsap.from(agent, {
            scrollTrigger: {
              trigger: agent,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
            y: 80,
            opacity: 0,
            duration: 0.9,
            delay: index * 0.2,
            ease: 'power2.out',
          });

          // Animate internal elements
          const elements = agent.querySelectorAll('.agent-content > *');
          gsap.from(elements, {
            scrollTrigger: {
              trigger: agent,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.2 + 0.3,
            stagger: 0.1,
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
            The Agents
          </Typography>
        </Box>

        {/* Agents Grid */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 8, md: 12 } }}>
          {agents.map((agent, index) => {
            const IconComponent = agent.icon;
            const isEven = index % 2 === 0;
            
            return (
              <Box
                key={index}
                ref={(el) => {
                  if (el) agentRefs.current[index] = el as HTMLDivElement;
                }}
                sx={{
                  display: 'flex',
                  flexDirection: { 
                    xs: 'column', 
                    md: isEven ? 'row' : 'row-reverse' 
                  },
                  alignItems: 'center',
                  gap: { xs: 6, md: 8 },
                  position: 'relative',
                }}
              >
                {/* Icon Section */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minWidth: { xs: 'auto', md: 300 },
                    position: 'relative',
                  }}
                >
                  {/* Large Icon Circle */}
                  <Box
                    sx={{
                      width: { xs: 120, md: 150 },
                      height: { xs: 120, md: 150 },
                      borderRadius: '50%',
                      background: `${agent.color[isDark ? 'dark' : 'light']}15`,
                      border: `3px solid ${agent.color[isDark ? 'dark' : 'light']}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      transition: 'all 0.4s ease',
                      '&:hover': {
                        transform: 'scale(1.1) rotate(5deg)',
                        boxShadow: `0 20px 60px ${agent.color[isDark ? 'dark' : 'light']}30`,
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: -10,
                        background: `conic-gradient(from 0deg, ${agent.color[isDark ? 'dark' : 'light']}20, transparent, ${agent.color[isDark ? 'dark' : 'light']}20)`,
                        borderRadius: '50%',
                        animation: 'rotate 8s linear infinite',
                        zIndex: -1,
                        opacity: 0.6,
                      },
                    }}
                  >
                    <IconComponent 
                      sx={{ 
                        fontSize: { xs: 48, md: 60 },
                        color: agent.color[isDark ? 'dark' : 'light'],
                      }} 
                    />
                  </Box>

                  {/* Agent Name Chip */}
                  <Chip
                    label={agent.name}
                    sx={{
                      mt: 3,
                      fontSize: { xs: '0.875rem', md: '1rem' },
                      fontWeight: 700,
                      px: 3,
                      py: 1,
                      background: `${agent.color[isDark ? 'dark' : 'light']}20`,
                      color: agent.color[isDark ? 'dark' : 'light'],
                      border: `2px solid ${agent.color[isDark ? 'dark' : 'light']}`,
                    }}
                  />
                </Box>

                {/* Content Section */}
                <Card
                  elevation={0}
                  sx={{
                    flex: 1,
                    maxWidth: { xs: '100%', md: 600 },
                    background: isDark
                      ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.6) 100%)'
                      : 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(20px)',
                    border: isDark 
                      ? `1px solid rgba(71, 85, 105, 0.3)`
                      : `1px solid rgba(226, 232, 240, 0.8)`,
                    borderRadius: 4,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: isDark
                        ? `0 25px 80px ${agent.color.dark}20`
                        : `0 25px 80px ${agent.color.light}15`,
                      borderColor: agent.color[isDark ? 'dark' : 'light'],
                    },
                  }}
                >
                  <CardContent className="agent-content" sx={{ p: { xs: 4, md: 6 } }}>
                    {/* Tagline */}
                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: { xs: '1.5rem', md: '1.75rem' },
                        fontWeight: 700,
                        color: isDark ? '#FFFFFF' : '#0F172A',
                        mb: 2,
                        lineHeight: 1.3,
                      }}
                    >
                      {agent.tagline}
                    </Typography>

                    {/* Description */}
                    <Typography
                      sx={{
                        fontSize: { xs: '1rem', md: '1.125rem' },
                        color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#64748B',
                        mb: 4,
                        lineHeight: 1.6,
                        fontStyle: 'italic',
                      }}
                    >
                      {agent.description}
                    </Typography>

                    {/* Features List */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {agent.features.map((feature, featureIndex) => (
                        <Box
                          key={featureIndex}
                          sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 2,
                            p: 2.5,
                            background: isDark 
                              ? 'rgba(71, 85, 105, 0.2)' 
                              : 'rgba(248, 250, 252, 0.8)',
                            borderRadius: 3,
                            border: isDark
                              ? '1px solid rgba(71, 85, 105, 0.3)'
                              : '1px solid rgba(226, 232, 240, 0.6)',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              transform: 'translateX(8px)',
                              borderColor: agent.color[isDark ? 'dark' : 'light'],
                              background: isDark 
                                ? `${agent.color.dark}10`
                                : `${agent.color.light}05`,
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              backgroundColor: agent.color[isDark ? 'dark' : 'light'],
                              flexShrink: 0,
                              mt: 0.5,
                            }}
                          />
                          <Typography
                            sx={{
                              fontSize: '1rem',
                              color: isDark ? 'rgba(255, 255, 255, 0.9)' : '#475569',
                              lineHeight: 1.6,
                            }}
                          >
                            {feature}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            );
          })}
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