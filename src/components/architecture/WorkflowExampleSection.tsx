import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Card, CardContent, Chip, Divider } from '@mui/material';
import { 
  QuestionMark, 
  Visibility, 
  DataUsage,
  Psychology,
  Assessment,
  TrendingUp
} from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

gsap.registerPlugin(ScrollTrigger);

const workflowSteps = [
  {
    title: 'Connect to plant systems',
    number: 1,
    color: '#3B82F6',
  },
  {
    title: 'Organize with knowledge map',
    number: 2,
    color: '#10B981',
  },
  {
    title: 'Ask question in chat',
    number: 3,
    color: '#F59E0B',
  },
  {
    title: 'AI routes to right agent',
    number: 4,
    color: '#EC4899',
  },
  {
    title: 'Answer delivered',
    number: 5,
    color: '#8B5CF6',
  },
];

const exampleScenario = {
  question: "Why isn't feed increasing?",
  process: [
    {
      step: 'Connectors fetch live data',
      description: 'Real-time OPC-UA data retrieved from plant systems',
      icon: DataUsage,
    },
    {
      step: 'Knowledge map shows TI100 as limiting variable',
      description: 'AI identifies temperature indicator as constraint',
      icon: Psychology,
    },
    {
      step: 'Process Advisor explains the constraint',
      description: 'Specialized agent analyzes the limiting condition',
      icon: Assessment,
    },
    {
      step: 'Graph Agent adds clear plot with limit line',
      description: 'Visual representation with context annotations',
      icon: TrendingUp,
    },
  ],
  result: {
    explanation: 'TI100 is at its high limit of 285°C — that\'s holding feed',
    insights: [
      'Simple explanation in plain language',
      'Graph with contextual annotations',
      'Clear reasoning behind the behavior',
    ],
  },
};

export const WorkflowExampleSection: React.FC = () => {
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
  const workflowRef = useRef<HTMLDivElement[]>([]);
  const exampleRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

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

      // Workflow steps animation
      workflowRef.current.forEach((step, index) => {
        if (step) {
          gsap.from(step, {
            scrollTrigger: {
              trigger: step,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
            x: index % 2 === 0 ? -50 : 50,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power2.out',
          });
        }
      });

      // Example animation
      if (exampleRef.current) {
        const elements = exampleRef.current.querySelectorAll('.example-element');
        gsap.from(elements, {
          scrollTrigger: {
            trigger: exampleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
        });
      }

      // Result animation
      if (resultRef.current) {
        gsap.from(resultRef.current.children, {
          scrollTrigger: {
            trigger: resultRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 30,
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
        {/* Crystal Clear Workflow */}
        <Box ref={headerRef} sx={{ textAlign: 'center', mb: { xs: 8, md: 12 } }}>
          <Chip
            label="Crystal Clear Workflow"
            sx={{
              mb: 3,
              fontSize: '0.875rem',
              fontWeight: 600,
              background: isDark
                ? 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)'
                : 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
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
            From Question to Answer
          </Typography>
        </Box>

        {/* Workflow Steps */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: { xs: 4, md: 2 },
            mb: { xs: 8, md: 12 },
            flexWrap: 'wrap',
          }}
        >
          {workflowSteps.map((step, index) => (
            <Box
              key={index}
              ref={(el) => {
                if (el) workflowRef.current[index] = el as HTMLDivElement;
              }}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: { xs: '100%', md: 180 },
                textAlign: 'center',
              }}
            >
              <Box
                sx={{
                  width: { xs: 60, md: 80 },
                  height: { xs: 60, md: 80 },
                  borderRadius: '50%',
                  background: `${step.color}20`,
                  border: `3px solid ${step.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    boxShadow: `0 8px 32px ${step.color}40`,
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: '1.5rem', md: '2rem' },
                    fontWeight: 800,
                    color: step.color,
                  }}
                >
                  {step.number}
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: { xs: '0.95rem', md: '1rem' },
                  fontWeight: 600,
                  color: isDark ? '#FFFFFF' : '#0F172A',
                  lineHeight: 1.4,
                }}
              >
                {step.title}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Example Scenario */}
        <Box
          sx={{
            background: isDark
              ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.6) 100%)'
              : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            borderRadius: 4,
            p: { xs: 4, md: 6 },
            border: isDark 
              ? '1px solid rgba(71, 85, 105, 0.3)'
              : '1px solid rgba(226, 232, 240, 0.8)',
            mb: { xs: 6, md: 8 },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '1.75rem', md: '2.25rem' },
              fontWeight: 700,
              color: isDark ? '#FFFFFF' : '#0F172A',
              textAlign: 'center',
              mb: 6,
            }}
          >
            Real Example
          </Typography>

          {/* Question */}
          <Box
            sx={{
              textAlign: 'center',
              mb: 6,
              p: 3,
              background: isDark
                ? 'rgba(59, 130, 246, 0.1)'
                : 'rgba(59, 130, 246, 0.05)',
              borderRadius: 3,
              border: isDark
                ? '2px solid rgba(59, 130, 246, 0.3)'
                : '2px solid rgba(59, 130, 246, 0.2)',
            }}
          >
            <QuestionMark
              sx={{
                fontSize: 32,
                color: isDark ? '#60A5FA' : '#3B82F6',
                mb: 1,
              }}
            />
            <Typography
              sx={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#64748B',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                mb: 1,
              }}
            >
              You Ask
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                fontWeight: 700,
                color: isDark ? '#FFFFFF' : '#0F172A',
                fontStyle: 'italic',
              }}
            >
              "{exampleScenario.question}"
            </Typography>
          </Box>

          {/* Behind the Scenes */}
          <Box ref={exampleRef} sx={{ mb: 6 }}>
            <Typography
              sx={{
                fontSize: '1rem',
                fontWeight: 600,
                color: isDark ? 'rgba(255, 255, 255, 0.9)' : '#334155',
                mb: 4,
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Behind the Scenes
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                gap: 3,
              }}
            >
              {exampleScenario.process.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Box
                    key={index}
                    className="example-element"
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 3,
                      p: 3,
                      background: isDark
                        ? 'rgba(71, 85, 105, 0.2)'
                        : 'rgba(248, 250, 252, 0.8)',
                      borderRadius: 3,
                      border: isDark
                        ? '1px solid rgba(71, 85, 105, 0.3)'
                        : '1px solid rgba(226, 232, 240, 0.6)',
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        background: isDark
                          ? 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)'
                          : 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <IconComponent sx={{ fontSize: 20, color: 'white' }} />
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: '1rem',
                          fontWeight: 600,
                          color: isDark ? '#FFFFFF' : '#0F172A',
                          mb: 0.5,
                        }}
                      >
                        {item.step}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.875rem',
                          color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#64748B',
                          lineHeight: 1.5,
                        }}
                      >
                        {item.description}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>

          {/* Result */}
          <Box ref={resultRef}>
            <Divider sx={{ mb: 4, opacity: 0.3 }} />
            
            <Box
              sx={{
                textAlign: 'center',
                p: 4,
                background: isDark
                  ? 'rgba(16, 185, 129, 0.1)'
                  : 'rgba(16, 185, 129, 0.05)',
                borderRadius: 3,
                border: isDark
                  ? '2px solid rgba(16, 185, 129, 0.3)'
                  : '2px solid rgba(16, 185, 129, 0.2)',
              }}
            >
              <Visibility
                sx={{
                  fontSize: 32,
                  color: isDark ? '#34D399' : '#10B981',
                  mb: 1,
                }}
              />
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#64748B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  mb: 2,
                }}
              >
                You See
              </Typography>
              
              <Typography
                sx={{
                  fontSize: { xs: '1.125rem', md: '1.25rem' },
                  fontWeight: 700,
                  color: isDark ? '#FFFFFF' : '#0F172A',
                  mb: 3,
                  fontStyle: 'italic',
                }}
              >
                "{exampleScenario.result.explanation}"
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  maxWidth: 400,
                  mx: 'auto',
                }}
              >
                {exampleScenario.result.insights.map((insight, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      justifyContent: 'flex-start',
                    }}
                  >
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        backgroundColor: isDark ? '#34D399' : '#10B981',
                        flexShrink: 0,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: '0.95rem',
                        color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#475569',
                        textAlign: 'left',
                      }}
                    >
                      {insight}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Bottom Message */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            sx={{
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              fontWeight: 600,
              color: isDark ? '#FFFFFF' : '#0F172A',
              mb: 2,
            }}
          >
            ChatAPC turns complex plant data into explanations, not just numbers
          </Typography>
          <Typography
            sx={{
              fontSize: '1rem',
              color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#64748B',
              fontStyle: 'italic',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            It's like having your best engineer — backed by connectors, a knowledge map, 
            and a team of AI agents — always ready to help.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};