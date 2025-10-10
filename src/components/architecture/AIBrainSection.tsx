import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Card, CardContent, Chip, Stepper, Step, StepLabel } from '@mui/material';
import { 
  Psychology, 
  SmartToy, 
  Analytics,
  Assessment,
  TrendingUp,
  EventNote,
  ArrowForward
} from '@mui/icons-material';
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
    name: 'Graph Agent',
    description: 'Creates visual representations with annotated insights',
    icon: Assessment,
    color: { light: '#3B82F6', dark: '#60A5FA' },
    outputs: ['Time series plots', 'Trend analysis', 'Limit annotations'],
  },
  {
    name: 'Process Advisor',
    description: 'Explains constraints and provides operational guidance',
    icon: SmartToy,
    color: { light: '#10B981', dark: '#34D399' },
    outputs: ['Constraint analysis', 'What-if scenarios', 'Optimization tips'],
  },
  {
    name: 'Profit Advisor',
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

      // Process flow animation
      if (processRef.current) {
        const steps = processRef.current.querySelectorAll('.process-step');
        gsap.from(steps, {
          scrollTrigger: {
            trigger: processRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          x: -50,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
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
            y: 60,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power2.out',
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
      sx={{
        py: sectionPadding,
        background: isDark
          ? 'linear-gradient(180deg, #1A1F2E 0%, #0F1419 50%, #1A1F2E 100%)'
          : 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 50%, #F8FAFC 100%)',
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
            label="Smart Routing"
            sx={{
              mb: 3,
              fontSize: '0.875rem',
              fontWeight: 600,
              background: isDark
                ? 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)'
                : 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
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
            The AI Brain + Agents
          </Typography>
          <Typography
            sx={{
              fontSize: bodyFontSize,
              color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#64748B',
              maxWidth: '700px',
              mx: 'auto',
              lineHeight: 1.7,
            }}
          >
            When you ask a question, here's what happens behind the scenes:
          </Typography>
        </Box>

        {/* Process Flow */}
        <Box
          ref={processRef}
          sx={{
            mb: { xs: 8, md: 12 },
            background: isDark
              ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.4) 100%)'
              : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            borderRadius: 4,
            p: { xs: 3, md: 4 },
            border: isDark 
              ? '1px solid rgba(71, 85, 105, 0.3)'
              : '1px solid rgba(226, 232, 240, 0.8)',
          }}
        >
          {processSteps.map((step, index) => (
            <Box
              key={index}
              className="process-step"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                mb: index < processSteps.length - 1 ? 3 : 0,
                position: 'relative',
              }}
            >
              {/* Step Number */}
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: `${step.color}20`,
                  border: `2px solid ${step.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Typography
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: step.color,
                  }}
                >
                  {index + 1}
                </Typography>
              </Box>

              {/* Step Description */}
              <Typography
                sx={{
                  fontSize: '1.125rem',
                  color: isDark ? 'rgba(255, 255, 255, 0.9)' : '#1E293B',
                  fontWeight: 500,
                }}
              >
                {step.label}
              </Typography>

              {/* Connection Line */}
              {index < processSteps.length - 1 && (
                <Box
                  sx={{
                    position: 'absolute',
                    left: 19,
                    top: 48,
                    width: 2,
                    height: 24,
                    background: `linear-gradient(180deg, ${step.color} 0%, ${processSteps[index + 1].color} 100%)`,
                    borderRadius: 1,
                  }}
                />
              )}
            </Box>
          ))}
        </Box>

        {/* Available Agents */}
        <Box sx={{ mb: { xs: 8, md: 12 } }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '1.5rem', md: '2rem' },
              fontWeight: 700,
              color: isDark ? '#FFFFFF' : '#0F172A',
              textAlign: 'center',
              mb: 6,
            }}
          >
            Specialized Agents
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
              gap: { xs: 4, md: 6 },
            }}
          >
            {agents.map((agent, index) => {
              const IconComponent = agent.icon;
              return (
                <Card
                  key={index}
                  ref={(el) => {
                    if (el) agentsRef.current[index] = el as HTMLDivElement;
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
                        ? `0 20px 60px ${agent.color.dark}20`
                        : `0 20px 60px ${agent.color.light}15`,
                      borderColor: agent.color[isDark ? 'dark' : 'light'],
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                    {/* Icon & Name */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          background: `${agent.color[isDark ? 'dark' : 'light']}20`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <IconComponent
                          sx={{
                            fontSize: 24,
                            color: agent.color[isDark ? 'dark' : 'light'],
                          }}
                        />
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          color: isDark ? '#FFFFFF' : '#0F172A',
                        }}
                      >
                        {agent.name}
                      </Typography>
                    </Box>

                    {/* Description */}
                    <Typography
                      sx={{
                        fontSize: '1rem',
                        color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#475569',
                        lineHeight: 1.6,
                        mb: 3,
                      }}
                    >
                      {agent.description}
                    </Typography>

                    {/* Outputs */}
                    <Box>
                      <Typography
                        sx={{
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          color: isDark ? 'rgba(255, 255, 255, 0.9)' : '#334155',
                          mb: 1,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        }}
                      >
                        Outputs
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        {agent.outputs.map((output, outputIndex) => (
                          <Box
                            key={outputIndex}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1.5,
                            }}
                          >
                            <Box
                              sx={{
                                width: 4,
                                height: 4,
                                borderRadius: '50%',
                                backgroundColor: agent.color[isDark ? 'dark' : 'light'],
                                flexShrink: 0,
                              }}
                            />
                            <Typography
                              sx={{
                                fontSize: '0.875rem',
                                color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#64748B',
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
            background: isDark
              ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.3) 0%, rgba(15, 23, 42, 0.5) 100%)'
              : 'linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(255, 255, 255, 0.9) 100%)',
            borderRadius: 4,
            p: { xs: 4, md: 6 },
            border: isDark 
              ? '1px solid rgba(71, 85, 105, 0.3)'
              : '1px solid rgba(226, 232, 240, 0.8)',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: '1.5rem', md: '1.75rem' },
              fontWeight: 700,
              color: isDark ? '#FFFFFF' : '#0F172A',
              mb: 4,
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
              gap: 3,
              flexWrap: 'wrap',
            }}
          >
            {outputTypes.map((output, index) => (
              <React.Fragment key={output.type}>
                <Box
                  sx={{
                    textAlign: 'center',
                    minWidth: 120,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '1.125rem',
                      fontWeight: 700,
                      color: isDark ? '#FFFFFF' : '#0F172A',
                      mb: 0.5,
                    }}
                  >
                    {output.type}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.875rem',
                      color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#64748B',
                    }}
                  >
                    {output.description}
                  </Typography>
                </Box>

                {index < outputTypes.length - 1 && (
                  <ArrowForward
                    sx={{
                      fontSize: 20,
                      color: isDark ? 'rgba(255, 255, 255, 0.5)' : '#94A3B8',
                      display: { xs: 'none', sm: 'block' },
                    }}
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