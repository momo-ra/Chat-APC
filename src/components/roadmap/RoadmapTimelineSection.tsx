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
  Group,
  Hub
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
    accentColor: { light: '#3b82f6', dark: '#60a5fa' },
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
        description: "PI, Honeywell PHD historian support",
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
      {
        icon: Hub,
        title: "Multi-Unit Optimization",
        description: "Connect multiple units and blending facilities",
        features: [],
      }
    ],
  },
  {
    period: "6-12 months ahead",
    title: "Mid Term: Deeper Plant Intelligence",
    accentColor: { light: '#8b5cf6', dark: '#a78bfa' },
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
        description: "Real-time enterprise databases, Cloud storage, DCS integration",
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
    accentColor: { light: '#ef4444', dark: '#f87171' },
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
    containerMaxWidth,
    containerPadding 
  } = useResponsiveLayout();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline line progressive reveal
      const timelineLine = timelineRef.current?.querySelector('.timeline-line');
      if (timelineLine) {
        gsap.from(timelineLine, {
          scrollTrigger: {
            trigger: timelineLine,
            start: 'top 85%',
            end: 'bottom 15%',
            scrub: 1,
          },
          scaleY: 0,
          transformOrigin: 'top',
          ease: 'none',
        });
      }

      // Cards stagger animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            opacity: 0,
            x: index % 2 === 0 ? -40 : 40,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power2.out',
          });

          // Individual items animation
          const items = card.querySelectorAll('.timeline-item');
          items.forEach((item, itemIndex) => {
            gsap.from(item, {
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
              opacity: 0,
              y: 20,
              duration: 0.5,
              delay: index * 0.15 + itemIndex * 0.08 + 0.3,
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
        // TRANSPARENT - let page background show through
        background: 'transparent',
        // No margins or borders
        margin: 0,
        border: 'none',
      }}
    >
      <Container 
        maxWidth="lg"
        sx={{
          maxWidth: containerMaxWidth,
          px: containerPadding,
          position: 'relative',
          zIndex: 10,
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
              width: 3,
              background: isDark
                ? 'linear-gradient(180deg, #60a5fa 0%, #a78bfa 50%, #f87171 100%)'
                : 'linear-gradient(180deg, #3b82f6 0%, #8b5cf6 50%, #ef4444 100%)',
              transform: 'translateX(-50%)',
              borderRadius: 1.5,
              display: { xs: 'none', md: 'block' },
              opacity: 0.6,
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
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: phase.accentColor[isDark ? 'dark' : 'light'],
                  border: `3px solid ${isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)'}`,
                  boxShadow: isDark
                    ? `0 0 15px ${phase.accentColor.dark}40`
                    : `0 0 15px ${phase.accentColor.light}30`,
                  zIndex: 10,
                  display: { xs: 'none', md: 'block' },
                }}
              />

              {/* Content Card */}
              <Card
                elevation={isDark ? 0 : 4}
                sx={{
                  width: { xs: '100%', md: 'calc(50% - 40px)' },
                  backgroundColor: isDark 
                    ? 'rgba(30, 41, 59, 0.6)' 
                    : 'rgba(255, 255, 255, 0.8)',
                  border: isDark 
                    ? '1px solid rgba(51, 65, 85, 0.5)' 
                    : '1px solid rgba(226, 232, 240, 0.8)',
                  borderRadius: 3,
                  backdropFilter: 'blur(20px)',
                  position: 'relative',
                  overflow: 'visible',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: isDark
                      ? `0 20px 40px rgba(0, 0, 0, 0.4)`
                      : `0 20px 40px rgba(148, 163, 184, 0.2)`,
                    borderColor: phase.accentColor[isDark ? 'dark' : 'light'],
                  },
                }}
              >
                <CardContent sx={{ p: 'clamp(1rem, 2vw, 1.5rem)' }}>
                  {/* Phase Header */}
                  <Box sx={{ mb: 3 }}>
                    <Chip
                      label={phase.period}
                      sx={{
                        mb: 2,
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        background: phase.accentColor[isDark ? 'dark' : 'light'],
                        color: 'white',
                        border: 'none',
                        opacity: 0.9,
                      }}
                    />
                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: h4FontSize,
                        fontWeight: 700,
                        color: isDark ? '#f1f5f9' : '#1e293b',
                        mb: 1,
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {phase.title}
                    </Typography>
                  </Box>

                  {/* Items Grid */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {phase.items.map((item, itemIndex) => {
                      const IconComponent = item.icon;
                      return (
                        <Box
                          key={itemIndex}
                          className="timeline-item"
                          sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 2,
                            p: 2,
                            borderRadius: 2,
                            background: isDark
                              ? 'rgba(51, 65, 85, 0.3)'
                              : 'rgba(248, 250, 252, 0.8)',
                            border: isDark
                              ? '1px solid rgba(71, 85, 105, 0.4)'
                              : '1px solid rgba(226, 232, 240, 0.6)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              background: isDark
                                ? 'rgba(51, 65, 85, 0.5)'
                                : 'rgba(248, 250, 252, 1)',
                              borderColor: phase.accentColor[isDark ? 'dark' : 'light'],
                              transform: 'translateX(4px)',
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width: 36,
                              height: 36,
                              borderRadius: 2,
                              background: isDark
                                ? `${phase.accentColor.dark}20`
                                : `${phase.accentColor.light}15`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            <IconComponent
                              sx={{
                                fontSize: 18,
                                color: phase.accentColor[isDark ? 'dark' : 'light'],
                                opacity: 0.8,
                              }}
                            />
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="h6"
                              sx={{
                                fontSize: '1rem',
                                fontWeight: 600,
                                color: isDark ? '#e2e8f0' : '#334155',
                                mb: 0.5,
                                transition: 'color 0.3s ease',
                              }}
                            >
                              {item.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: isDark ? '#94a3b8' : '#64748b',
                                lineHeight: 1.5,
                                fontSize: '0.875rem',
                                transition: 'color 0.3s ease',
                              }}
                            >
                              {item.description}
                            </Typography>
                            {item.features.length > 0 && (
                              <Box sx={{ mt: 1.5 }}>
                                {item.features.map((feature, featureIndex) => (
                                  <Typography
                                    key={featureIndex}
                                    variant="body2"
                                    sx={{
                                      fontSize: '0.8rem',
                                      color: isDark ? '#64748b' : '#64748b',
                                      mb: 0.3,
                                      pl: 1.5,
                                      position: 'relative',
                                      transition: 'color 0.3s ease',
                                      '&::before': {
                                        content: '"•"',
                                        position: 'absolute',
                                        left: 0,
                                        color: phase.accentColor[isDark ? 'dark' : 'light'],
                                        opacity: 0.7,
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