import React, { useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Chip
} from '@mui/material';
import {
  SmartToy,
  Assessment,
  TrendingUp,
  EventNote,
  ArrowForward
} from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  { label: 'AI interprets the request', color: '#3B82F6' },
  { label: 'Checks real-time data and knowledge map', color: '#10B981' },
  { label: 'Selects the right agent', color: '#F59E0B' },
  { label: 'Agent gathers and analyzes data', color: '#EC4899' },
  { label: 'Result returned in most useful form', color: '#8B5CF6' },
];

const agents = [
  {
    name: 'Visualize Agent',
    description: 'Creates visual representations with annotated insights',
    icon: Assessment,
    color: { light: '#3B82F6', dark: '#60A5FA' },
    outputs: ['Time series plots', 'Trend analysis', 'Limit annotations'],
  },
  {
    name: 'Advisor Agent',
    description: 'Explains constraints and provides operational guidance',
    icon: SmartToy,
    color: { light: '#10B981', dark: '#34D399' },
    outputs: ['Constraint analysis', 'What-if scenarios', 'Optimization tips'],
  },
  {
    name: 'Optimizer Agent',
    description: 'Shows which limits affect margin and identifies opportunities',
    icon: TrendingUp,
    color: { light: '#F59E0B', dark: '#FBBF24' },
    outputs: ['Margin impact', 'Profit optimization', 'Cost analysis'],
  },
  {
    name: 'Events Agent',
    description: 'Detects violations, alarms, and process deviations',
    icon: EventNote,
    color: { light: '#EC4899', dark: '#F472B6' },
    outputs: ['Alarm analysis', 'Event timeline', 'Root cause'],
  },
];

const outputTypes = [
  { type: 'Graph', description: 'Visual data with insights' },
  { type: 'Explanation', description: 'Clear reasoning' },
  { type: 'Timeline', description: 'Event sequences' },
  { type: 'Recommendation', description: 'Actionable steps' },
];

export const AIBrainSection: React.FC = () => {
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
  const processRef = useRef<HTMLDivElement>(null);
  const agentsRef = useRef<HTMLDivElement[]>([]);
  const outputsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 36,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          willChange: 'transform, opacity',
        });
      }

      // Process flow animation
      if (processRef.current) {
        const steps = processRef.current.querySelectorAll('.process-step');
        gsap.from(steps, {
          scrollTrigger: {
            trigger: processRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          x: -30,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          willChange: 'transform, opacity',
        });
      }

      // Agents animation
      agentsRef.current.forEach((agent, index) => {
        if (agent) {
          gsap.from(agent, {
            scrollTrigger: {
              trigger: agent,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
            y: 40,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.06,
            ease: 'power2.out',
            willChange: 'transform, opacity',
          });
        }
      });

      // Outputs animation
      if (outputsRef.current) {
        gsap.from(outputsRef.current.children, {
          scrollTrigger: {
            trigger: outputsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 28,
          opacity: 0,
          duration: 0.45,
          stagger: 0.08,
          ease: 'power2.out',
          willChange: 'transform, opacity',
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
        background: 'transparent', // keep as requested
        position: 'relative',
      }}
      aria-label="AI Brain and Agents section"
    >
      <Container
        maxWidth="lg"
        sx={{
          maxWidth: containerMaxWidth,
          px: containerPadding,
        }}
      >
        {/* Section Header */}
        <Box
          ref={headerRef}
          sx={{
            textAlign: 'center',
            mb: { xs: 7, md: 10 },
          }}
        >
          <Chip
            label="Smart Routing"
            aria-label="Smart Routing"
            sx={{
              mb: 2.5,
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: 0.3,
              textTransform: 'uppercase',
              background: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
              color: 'white',
              px: 2,
              borderRadius: 2,
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontSize: h2FontSize,
              fontWeight: 800,
              color: isDark ? '#FFFFFF' : '#0F172A',
              mb: 1.5,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}
          >
            The AI Brain + Agents
          </Typography>
          <Typography
            sx={{
              fontSize: bodyFontSize,
              color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#475569',
              maxWidth: 760,
              mx: 'auto',
              lineHeight: 1.7,
            }}
          >
            When you ask a question, here’s the high-level journey it takes:
          </Typography>
        </Box>

        {/* Process Flow */}
        <Box
          ref={processRef}
          sx={{
            mb: { xs: 7, md: 10 },
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            border: `1px solid ${isDark ? 'rgba(71, 85, 105, 0.35)' : 'rgba(226, 232, 240, 0.9)'}`,
            backdropFilter: 'blur(18px)',
            background: isDark
              ? alpha('#0B1220', 0.2)
              : alpha('#FFFFFF', 0.75),
          }}
          aria-label="Process steps"
        >
          {processSteps.map((step, index) => (
            <Box
              key={index}
              className="process-step"
              sx={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                alignItems: 'center',
                columnGap: 2,
                rowGap: 0.5,
                py: 1,
                position: 'relative',
                ...(index < processSteps.length - 1 && {
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    left: 24,
                    top: 54,
                    width: 2,
                    height: 20,
                    borderRadius: 2,
                    background: `linear-gradient(180deg, ${step.color} 0%, ${processSteps[index + 1].color} 100%)`,
                  },
                }),
              }}
            >
              {/* Step Number */}
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  border: `2px solid ${step.color}`,
                  background: alpha(step.color, 0.08),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  outline: `3px solid ${alpha(step.color, 0.12)}`,
                  outlineOffset: 0,
                  flexShrink: 0,
                }}
                aria-hidden
              >
                <Typography
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 800,
                    color: step.color,
                  }}
                >
                  {index + 1}
                </Typography>
              </Box>

              {/* Step Description */}
              <Typography
                sx={{
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: isDark ? '#E5E7EB' : '#0F172A',
                  letterSpacing: 0.1,
                }}
              >
                {step.label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Available Agents */}
        <Box sx={{ mb: { xs: 7, md: 10 } }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '1.4rem', md: '1.9rem' },
              fontWeight: 800,
              color: isDark ? '#FFFFFF' : '#0F172A',
              textAlign: 'center',
              mb: 4.5,
              letterSpacing: '-0.01em',
            }}
          >
            Specialized Agents
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
              gap: { xs: 3, md: 4 },
            }}
          >
            {agents.map((agent, index) => {
              const IconComponent = agent.icon;
              const accent = agent.color[isDark ? 'dark' : 'light'];
              return (
                <Card
                  key={index}
                  ref={(el) => {
                    if (el) agentsRef.current[index] = el as HTMLDivElement;
                  }}
                  elevation={0}
                  role="group"
                  aria-label={`${agent.name} card`}
                  sx={{
                    background: isDark
                      ? alpha('#0B1220', 0.35)
                      : alpha('#FFFFFF', 0.9),
                    border: `1px solid ${isDark ? 'rgba(71, 85, 105, 0.35)' : 'rgba(226, 232, 240, 0.9)'}`,
                    borderRadius: 3,
                    height: '100%',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                    willChange: 'transform, box-shadow',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: isDark
                        ? `0 18px 50px ${alpha(accent, 0.25)}`
                        : `0 18px 50px ${alpha(accent, 0.18)}`,
                      borderColor: accent,
                    },
                    '&:focus-within': {
                      borderColor: accent,
                      boxShadow: `0 0 0 3px ${alpha(accent, 0.25)}`,
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 2.75, md: 3.5 } }}>
                    {/* Icon & Name */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.75, mb: 1.5 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          background: alpha(accent, 0.12),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: `1px solid ${alpha(accent, 0.35)}`,
                          boxShadow: `inset 0 0 0 1px ${alpha('#fff', isDark ? 0.02 : 0.25)}`,
                        }}
                        aria-hidden
                      >
                        <IconComponent
                          sx={{
                            fontSize: 24,
                            color: accent,
                          }}
                        />
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: '1.2rem',
                          fontWeight: 800,
                          color: isDark ? '#FFFFFF' : '#0F172A',
                        }}
                      >
                        {agent.name}
                      </Typography>
                    </Box>

                    {/* Description */}
                    <Typography
                      sx={{
                        fontSize: '0.98rem',
                        color: isDark ? 'rgba(255, 255, 255, 0.82)' : '#475569',
                        lineHeight: 1.65,
                        mb: 2.25,
                      }}
                    >
                      {agent.description}
                    </Typography>

                    {/* Divider */}
                    <Box
                      sx={{
                        height: 1,
                        width: '100%',
                        background: `linear-gradient(90deg, transparent 0%, ${alpha(accent, 0.4)} 20%, ${alpha(accent, 0.4)} 80%, transparent 100%)`,
                        mb: 1.75,
                      }}
                      aria-hidden
                    />

                    {/* Outputs */}
                    <Box>
                      <Typography
                        sx={{
                          fontSize: '0.8rem',
                          fontWeight: 800,
                          color: isDark ? 'rgba(255, 255, 255, 0.9)' : '#0F172A',
                          mb: 1,
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                        }}
                      >
                        Outputs
                      </Typography>
                      <Box sx={{ display: 'grid', gap: 0.5 }}>
                        {agent.outputs.map((output, outputIndex) => (
                          <Box
                            key={outputIndex}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                            }}
                          >
                            <Box
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                backgroundColor: accent,
                                boxShadow: `0 0 0 3px ${alpha(accent, 0.15)}`,
                                flexShrink: 0,
                              }}
                              aria-hidden
                            />
                            <Typography
                              sx={{
                                fontSize: '0.9rem',
                                color: isDark ? 'rgba(255, 255, 255, 0.75)' : '#5B6B7C',
                              }}
                            >
                              {output}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        </Box>

        {/* Output Types */}
        <Box
          ref={outputsRef}
          sx={{
            textAlign: 'center',
            borderRadius: 3,
            p: { xs: 3.25, md: 4.25 },
            border: `1px solid ${isDark ? 'rgba(71, 85, 105, 0.35)' : 'rgba(226, 232, 240, 0.9)'}`,
            background: isDark
              ? alpha('#0B1220', 0.25)
              : alpha('#FFFFFF', 0.8),
            backdropFilter: 'blur(16px)',
          }}
          aria-label="Output types"
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: '1.35rem', md: '1.65rem' },
              fontWeight: 800,
              color: isDark ? '#FFFFFF' : '#0F172A',
              mb: 3,
              letterSpacing: '-0.01em',
            }}
          >
            Results Delivered In Multiple Forms
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2.25,
              flexWrap: 'wrap',
            }}
          >
            {outputTypes.map((output, index) => (
              <React.Fragment key={output.type}>
                <Box
                  sx={{
                    minWidth: 160,
                    px: 1.5,
                    py: 1.25,
                    borderRadius: 2,
                    border: `1px solid ${isDark ? 'rgba(148, 163, 184, 0.25)' : 'rgba(203, 213, 225, 0.8)'}`,
                    background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(248, 250, 252, 0.85)',
                  }}
                  role="figure"
                  aria-label={`${output.type} output`}
                >
                  <Typography
                    sx={{
                      fontSize: '1.05rem',
                      fontWeight: 800,
                      color: isDark ? '#FFFFFF' : '#0F172A',
                      mb: 0.25,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {output.type}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.9rem',
                      color: isDark ? 'rgba(255, 255, 255, 0.72)' : '#5B6B7C',
                    }}
                  >
                    {output.description}
                  </Typography>
                </Box>

                {index < outputTypes.length - 1 && (
                  <ArrowForward
                    sx={{
                      fontSize: 18,
                      color: isDark ? 'rgba(255, 255, 255, 0.5)' : '#94A3B8',
                      display: { xs: 'none', sm: 'block' },
                    }}
                    aria-hidden
                  />
                )}
              </React.Fragment>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};