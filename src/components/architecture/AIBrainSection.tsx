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
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';
import { 
  themeConfig, 
  getColor, 
  getGradient, 
  getTextColor,
  withOpacity 
} from '../shared/themeConfig';

gsap.registerPlugin(ScrollTrigger);

const getProcessSteps = (isDark: boolean) => {
  const { colors } = themeConfig;
  return [
    { label: 'AI interprets the request', color: getColor(colors.blue, isDark) },
    { label: 'Checks real-time data and knowledge map', color: getColor(colors.green, isDark) },
    { label: 'Selects the right agent', color: getColor(colors.yellow, isDark) },
    { label: 'Agent gathers and analyzes data', color: getColor(colors.pink, isDark) },
    { label: 'Result returned in most useful form', color: getColor(colors.purple, isDark) },
  ];
};

const getAgents = (isDark: boolean) => {
  const { colors } = themeConfig;
  return [
    {
      name: 'Visualize Agent',
      description: 'Creates visual representations with annotated insights',
      icon: Assessment,
      color: getColor(colors.blue, isDark),
      outputs: ['Time series plots', 'Trend analysis', 'Limit annotations'],
    },
    {
      name: 'Advisor Agent',
      description: 'Explains constraints and provides operational guidance',
      icon: SmartToy,
      color: getColor(colors.green, isDark),
      outputs: ['Constraint analysis', 'What-if scenarios', 'Optimization tips'],
    },
    {
      name: 'Optimizer Agent',
      description: 'Shows which limits affect margin and identifies opportunities',
      icon: TrendingUp,
      color: getColor(colors.yellow, isDark),
      outputs: ['Margin impact', 'Profit optimization', 'Cost analysis'],
    },
    {
      name: 'Events Agent',
      description: 'Detects violations, alarms, and process deviations',
      icon: EventNote,
      color: getColor(colors.pink, isDark),
      outputs: ['Alarm analysis', 'Event timeline', 'Root cause'],
    },
  ];
};

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

  // Get unified theme values
  const { typography, borderRadius, transitions, animations, gradients, colors } = themeConfig;
  const processSteps = getProcessSteps(isDark);
  const agents = getAgents(isDark);

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
          ease: animations.easing.easeOut,
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
          ease: animations.easing.sharp,
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
            ease: animations.easing.sharp,
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
          ease: animations.easing.sharp,
          willChange: 'transform, opacity',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [animations]);

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
              background: getGradient(gradients.pink, isDark),
              color: '#FFFFFF',
              px: 2,
              borderRadius: borderRadius.sm,
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontSize: h2FontSize,
              fontWeight: typography.h2.weight,
              color: getTextColor('primary', isDark),
              mb: 1.5,
              lineHeight: typography.h2.lineHeight,
              letterSpacing: '-0.02em',
            }}
          >
            The AI Brain + Agents
          </Typography>
          <Typography
            sx={{
              fontSize: bodyFontSize,
              color: getTextColor('secondary', isDark),
              maxWidth: 760,
              mx: 'auto',
              lineHeight: typography.body.lineHeight,
            }}
          >
            When you ask a question, here's the high-level journey it takes:
          </Typography>
        </Box>

        {/* Process Flow */}
        <Box
          ref={processRef}
          sx={{
            mb: { xs: 7, md: 10 },
            p: { xs: 3, md: 4 },
            borderRadius: borderRadius.lg,
            border: isDark 
              ? `1px solid ${withOpacity(colors.neutral.darkBorder, 0.35)}` 
              : `1px solid ${withOpacity(colors.neutral.lightBorder, 0.9)}`,
            backdropFilter: 'blur(18px)',
            background: isDark
              ? withOpacity('#0B1220', 0.2)
              : withOpacity(colors.neutral.lightBackground, 0.75),
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
                    borderRadius: borderRadius.xs,
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
                  borderRadius: borderRadius.full,
                  border: `2px solid ${step.color}`,
                  background: withOpacity(step.color, 0.08),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  outline: `3px solid ${withOpacity(step.color, 0.12)}`,
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
                  color: getTextColor('primary', isDark),
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
              fontSize: typography.h3.size,
              fontWeight: typography.h3.weight,
              color: getTextColor('primary', isDark),
              textAlign: 'center',
              mb: 4.5,
              lineHeight: typography.h3.lineHeight,
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
              const accent = agent.color;
              
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
                      ? withOpacity('#0B1220', 0.35)
                      : withOpacity(colors.neutral.lightBackground, 0.9),
                    border: isDark 
                      ? `1px solid ${withOpacity(colors.neutral.darkBorder, 0.35)}` 
                      : `1px solid ${withOpacity(colors.neutral.lightBorder, 0.9)}`,
                    borderRadius: borderRadius.lg,
                    height: '100%',
                    transition: transitions.allNormal,
                    willChange: 'transform, box-shadow',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: isDark
                        ? `0 18px 50px ${withOpacity(accent, 0.25)}`
                        : `0 18px 50px ${withOpacity(accent, 0.18)}`,
                      borderColor: accent,
                    },
                    '&:focus-within': {
                      borderColor: accent,
                      boxShadow: `0 0 0 3px ${withOpacity(accent, 0.25)}`,
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
                          borderRadius: borderRadius.sm,
                          background: withOpacity(accent, 0.12),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: `1px solid ${withOpacity(accent, 0.35)}`,
                          boxShadow: isDark 
                            ? `inset 0 0 0 1px ${withOpacity('#fff', 0.02)}` 
                            : `inset 0 0 0 1px ${withOpacity('#fff', 0.25)}`,
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
                          fontSize: typography.h6.size,
                          fontWeight: typography.h6.weight,
                          color: getTextColor('primary', isDark),
                        }}
                      >
                        {agent.name}
                      </Typography>
                    </Box>

                    {/* Description */}
                    <Typography
                      sx={{
                        fontSize: typography.bodySmall.size,
                        color: getTextColor('secondary', isDark),
                        lineHeight: typography.body.lineHeight,
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
                        background: `linear-gradient(90deg, transparent 0%, ${withOpacity(accent, 0.4)} 20%, ${withOpacity(accent, 0.4)} 80%, transparent 100%)`,
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
                          color: getTextColor('primary', isDark),
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
                                borderRadius: borderRadius.full,
                                backgroundColor: accent,
                                boxShadow: `0 0 0 3px ${withOpacity(accent, 0.15)}`,
                                flexShrink: 0,
                              }}
                              aria-hidden
                            />
                            <Typography
                              sx={{
                                fontSize: typography.bodySmall.size,
                                color: getTextColor('muted', isDark),
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
            borderRadius: borderRadius.lg,
            p: { xs: 3.25, md: 4.25 },
            border: isDark 
              ? `1px solid ${withOpacity(colors.neutral.darkBorder, 0.35)}` 
              : `1px solid ${withOpacity(colors.neutral.lightBorder, 0.9)}`,
            background: isDark
              ? withOpacity('#0B1220', 0.25)
              : withOpacity(colors.neutral.lightBackground, 0.8),
            backdropFilter: 'blur(16px)',
          }}
          aria-label="Output types"
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: typography.h4.size,
              fontWeight: typography.h4.weight,
              color: getTextColor('primary', isDark),
              mb: 3,
              lineHeight: typography.h4.lineHeight,
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
              gap: 2,
              flexWrap: 'wrap',
            }}
          >
            {outputTypes.map((output, index) => (
              <React.Fragment key={output.type}>
                <Box
                  sx={{
                    minWidth: 160,
                    px: 1,
                    py: 1.25,
                    borderRadius: borderRadius.md,
                    border: isDark 
                      ? `1px solid ${withOpacity(colors.neutral.lightGray, 0.25)}` 
                      : `1px solid ${withOpacity(colors.neutral.lightGray, 0.8)}`,
                    background: isDark 
                      ? withOpacity('#FFFFFF', 0.03) 
                      : withOpacity('#F8FAFC', 0.85),
                  }}
                  role="figure"
                  aria-label={`${output.type} output`}
                >
                  <Typography
                    sx={{
                      fontSize: '1.05rem',
                      fontWeight: 800,
                      color: getTextColor('primary', isDark),
                      mb: 0.25,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {output.type}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: typography.bodySmall.size,
                      color: getTextColor('muted', isDark),
                    }}
                  >
                    {output.description}
                  </Typography>
                </Box>

                {index < outputTypes.length - 1 && (
                  <ArrowForward
                    sx={{
                      fontSize: 18,
                      color: getTextColor('muted', isDark),
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