import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Card, CardContent, Chip } from '@mui/material';
import { 
  Assessment, 
  Calculate, 
  Storage, 
  NotificationImportant,
  TrendingUp,
  Description,
  CloudSync,
  IntegrationInstructions,
  Psychology,
  RecordVoiceOver,
  PhoneIphone,
  AutoAwesome,
  Group
} from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

gsap.registerPlugin(ScrollTrigger);

const roadmapData = [
  {
    period: "0-6 months ahead",
    title: "Near Term: Expanding Core Capabilities",
    color: {
      light: '#3B82F6',
      dark: '#009BE4',
    },
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
    items: [
      {
        icon: Assessment,
        title: "Reporting Agent",
        description: "Automatically generates shift, daily, or weekly reports",
        features: [],
      },
      {
        icon: Calculate,
        title: "Calculation Agent",
        description: "Custom formulas and KPIs based on your tags",
        features: [],
      },
      {
        icon: Storage,
        title: "New Connectors",
        description: "PI, Canary, Honeywell PHD historian support",
        features: [],
      },
      {
        icon: NotificationImportant,
        title: "Pulse Agent",
        description: "A daily (or on-demand) briefing of critical operational insights",
        features: [
          "Which APCs have been turned off",
          "Which limits have changed",
          "Key events since the last shift",
          "Snapshot of constraints & opportunities",
          "Delivered when you log in, or scheduled for your shift start"
        ],
      },
    ],
  },
  {
    period: "6-12 months ahead",
    title: "Mid Term: Deeper Plant Intelligence",
    color: {
      light: '#8B5CF6',
      dark: '#A855F7',
    },
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    items: [
      {
        icon: TrendingUp,
        title: "Inferentials Agent",
        description: "Validates soft sensors & quality predictions",
        features: [],
      },
      {
        icon: Description,
        title: "Advanced Reporting",
        description: "PDF/Word export with auto-summaries",
        features: [],
      },
      {
        icon: CloudSync,
        title: "Enhanced Connectivity",
        description: "Real-time enterprise databases, Cloud storage (Azure, AWS, GCP), DCS display integration",
        features: [],
      },
      {
        icon: Psychology,
        title: "Agent Intelligence",
        description: "Deeper process understanding",
        features: [],
      },
      {
        icon: IntegrationInstructions,
        title: "System Integration",
        description: "Embedded in operator workflows",
        features: [],
      },
    ],
  },
  {
    period: "12+ months vision",
    title: "Long Term: Connected Ecosystem",
    color: {
      light: '#EC4899',
      dark: '#F472B6',
    },
    gradient: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
    items: [
      {
        icon: RecordVoiceOver,
        title: "Voice Interaction",
        description: "Speak directly to agents in control room",
        features: [],
      },
      {
        icon: PhoneIphone,
        title: "Mobile Optimization",
        description: "Field operator tablet views",
        features: [],
      },
      {
        icon: AutoAwesome,
        title: "Predictive Insights",
        description: "AI forecasting with simulation mode",
        features: [],
      },
      {
        icon: Group,
        title: "Agent Collaboration",
        description: "AI copilots for maintenance, planning, scheduling",
        features: [],
      },
    ],
  },
];

export const RoadmapTimelineSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const { isDark } = useThemeMode();
  const { 
    h4FontSize, 
    isMobile,
    containerMaxWidth,
    containerPadding 
  } = useResponsiveLayout();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline line animation
      if (timelineRef.current) {
        const timelineLine = timelineRef.current.querySelector('.timeline-line');
        if (timelineLine) {
          gsap.from(timelineLine, {
            scrollTrigger: {
              trigger: timelineLine,
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: 1,
            },
            scaleY: 0,
            transformOrigin: 'top',
            ease: 'none',
          });
        }
      }

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power2.out',
          });

          // Individual items within cards
          const items = card.querySelectorAll('.roadmap-item');
          items.forEach((item, itemIndex) => {
            gsap.from(item, {
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
              opacity: 0,
              y: 20,
              duration: 0.6,
              delay: index * 0.2 + itemIndex * 0.1 + 0.3,
              ease: 'power2.out',
            });
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
        py: 'clamp(2rem, 8vw, 4rem)',
        position: 'relative',
        background: isDark
          ? 'linear-gradient(180deg, rgba(17, 24, 39, 1) 0%, rgba(31, 41, 55, 1) 50%, rgba(17, 24, 39, 1) 100%)'
          : 'linear-gradient(180deg, rgba(249, 250, 251, 1) 0%, rgba(255, 255, 255, 1) 50%, rgba(249, 250, 251, 1) 100%)',
        transition: 'background 0.3s ease',
      }}
    >
      <Container 
        maxWidth="lg"
        sx={{
          maxWidth: containerMaxWidth,
          px: containerPadding,
        }}
      >
        <Box ref={timelineRef} sx={{ position: 'relative' }}>
          {/* Central Timeline Line */}
          <Box
            className="timeline-line"
            sx={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: 4,
              background: isDark
                ? 'linear-gradient(180deg, #009BE4 0%, #A855F7 50%, #F472B6 100%)'
                : 'linear-gradient(180deg, #3B82F6 0%, #8B5CF6 50%, #EC4899 100%)',
              transform: 'translateX(-50%)',
              borderRadius: 2,
              display: { xs: 'none', md: 'block' },
            }}
          />

          {/* Timeline Items */}
          {roadmapData.map((phase, phaseIndex) => (
            <Box
              key={phaseIndex}
              ref={(el) => {
                if (el) cardsRef.current[phaseIndex] = el as HTMLDivElement;
              }}
              sx={{
                position: 'relative',
                mb: 'clamp(1.5rem, 6vw, 3rem)',
                display: 'flex',
                flexDirection: { xs: 'column', md: phaseIndex % 2 === 0 ? 'row' : 'row-reverse' },
                alignItems: 'center',
                gap: 'clamp(0.5rem, 3vw, 1.5rem)',
              }}
            >
              {/* Timeline Dot */}
              <Box
                sx={{
                  position: { xs: 'relative', md: 'absolute' },
                  left: { md: '50%' },
                  transform: { md: 'translateX(-50%)' },
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: phase.gradient,
                  border: `4px solid ${isDark ? 'rgba(17, 24, 39, 1)' : 'rgba(255, 255, 255, 1)'}`,
                  boxShadow: `0 0 20px ${phase.color[isDark ? 'dark' : 'light']}40`,
                  zIndex: 10,
                  display: { xs: 'none', md: 'block' },
                }}
              />

              {/* Content Card */}
              <Card
                elevation={isDark ? 0 : 8}
                sx={{
                  width: { xs: '100%', md: isMobile ? '100%' : 'calc(50% - 40px)' },
                  backgroundColor: isDark ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.95)',
                  border: isDark ? '1px solid rgba(55, 65, 81, 1)' : 'none',
                  borderRadius: 4,
                  backdropFilter: 'blur(20px)',
                  position: 'relative',
                  overflow: 'visible',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: isDark
                      ? `0 20px 60px ${phase.color.dark}20`
                      : `0 20px 60px ${phase.color.light}20`,
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -2,
                    left: -2,
                    right: -2,
                    bottom: -2,
                    background: phase.gradient,
                    borderRadius: 4,
                    opacity: 0.1,
                    zIndex: -1,
                  },
                }}
              >
                <CardContent sx={{ p: 'clamp(0.75rem, 2vw, 1rem)' }}>
                  {/* Phase Header */}
                  <Box sx={{ mb: 3 }}>
                    <Chip
                      label={phase.period}
                      sx={{
                        mb: 2,
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        background: phase.gradient,
                        color: 'white',
                      }}
                    />
                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: h4FontSize,
                        fontWeight: 700,
                        color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(17, 24, 39, 1)',
                        mb: 1,
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {phase.title}
                    </Typography>
                  </Box>

                  {/* Items Grid */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {phase.items.map((item, itemIndex) => {
                      const IconComponent = item.icon;
                      return (
                        <Box
                          key={itemIndex}
                          className="roadmap-item"
                          sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 2,
                            p: 2,
                            borderRadius: 2,
                            background: isDark
                              ? 'rgba(55, 65, 81, 0.3)'
                              : 'rgba(249, 250, 251, 0.8)',
                            border: isDark
                              ? '1px solid rgba(75, 85, 99, 0.3)'
                              : '1px solid rgba(229, 231, 235, 0.8)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              background: isDark
                                ? 'rgba(55, 65, 81, 0.5)'
                                : 'rgba(249, 250, 251, 1)',
                              borderColor: phase.color[isDark ? 'dark' : 'light'],
                              transform: 'translateX(4px)',
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: 2,
                              background: `${phase.color[isDark ? 'dark' : 'light']}20`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            <IconComponent
                              sx={{
                                fontSize: 20,
                                color: phase.color[isDark ? 'dark' : 'light'],
                              }}
                            />
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="h6"
                              sx={{
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(17, 24, 39, 1)',
                                mb: 0.5,
                                transition: 'color 0.3s ease',
                              }}
                            >
                              {item.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(75, 85, 99, 1)',
                                lineHeight: 1.5,
                                transition: 'color 0.3s ease',
                              }}
                            >
                              {item.description}
                            </Typography>
                            {item.features.length > 0 && (
                              <Box sx={{ mt: 2 }}>
                                {item.features.map((feature, featureIndex) => (
                                  <Typography
                                    key={featureIndex}
                                    variant="body2"
                                    sx={{
                                      fontSize: '0.875rem',
                                      color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(107, 114, 128, 1)',
                                      mb: 0.5,
                                      pl: 2,
                                      position: 'relative',
                                      transition: 'color 0.3s ease',
                                      '&::before': {
                                        content: '"•"',
                                        position: 'absolute',
                                        left: 0,
                                        color: phase.color[isDark ? 'dark' : 'light'],
                                      },
                                    }}
                                  >
                                    {feature}
                                  </Typography>
                                ))}
                              </Box>
                            )}
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};