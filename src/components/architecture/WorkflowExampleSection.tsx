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
import { 
  themeConfig, 
  getColor, 
  getGradient, 
  getTextColor,
  withOpacity 
} from '../shared/themeConfig';

gsap.registerPlugin(ScrollTrigger);

const getWorkflowSteps = (isDark: boolean) => {
  const { colors } = themeConfig;
  return [
    {
      title: 'Connect to plant systems',
      number: 1,
      color: getColor(colors.blue, isDark),
    },
    {
      title: 'Organize with knowledge map',
      number: 2,
      color: getColor(colors.green, isDark),
    },
    {
      title: 'Ask question in chat',
      number: 3,
      color: getColor(colors.yellow, isDark),
    },
    {
      title: 'AI routes to right agent',
      number: 4,
      color: getColor(colors.pink, isDark),
    },
    {
      title: 'Answer delivered',
      number: 5,
      color: getColor(colors.purple, isDark),
    },
  ];
};

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
      step: 'Advisor Agent explains the constraint',
      description: 'Specialized agent analyzes the limiting condition',
      icon: Assessment,
    },
    {
      step: 'Visualize Agent adds clear plot with limit line',
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

  // Get unified theme values
  const { colors, gradients, typography, borderRadius, transitions, animations } = themeConfig;
  const workflowSteps = getWorkflowSteps(isDark);
  const blueColor = getColor(colors.blue, isDark);
  const greenColor = getColor(colors.green, isDark);

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
          ease: animations.easing.easeOut,
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
            ease: animations.easing.sharp,
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
          ease: animations.easing.sharp,
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
              background: getGradient(gradients.purple, isDark),
              color: '#FFFFFF',
              px: 2,
            }}
          />
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
                  borderRadius: borderRadius.full,
                  background: withOpacity(step.color, 0.13),
                  border: `3px solid ${step.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                  transition: transitions.allNormal,
                  '&:hover': {
                    transform: 'scale(1.1)',
                    boxShadow: `0 8px 32px ${withOpacity(step.color, 0.25)}`,
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
                  color: getTextColor('primary', isDark),
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
              : withOpacity(colors.neutral.lightBackground, 0.9),
            backdropFilter: 'blur(20px)',
            borderRadius: borderRadius.xl,
            p: { xs: 4, md: 6 },
            border: isDark 
              ? `1px solid ${withOpacity(colors.neutral.darkBorder, 0.3)}`
              : `1px solid ${withOpacity(colors.neutral.lightBorder, 0.8)}`,
            mb: { xs: 6, md: 8 },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: typography.h3.size,
              fontWeight: typography.h3.weight,
              color: getTextColor('primary', isDark),
              textAlign: 'center',
              mb: 6,
              lineHeight: typography.h3.lineHeight,
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
                ? withOpacity(blueColor, 0.1)
                : withOpacity(blueColor, 0.05),
              borderRadius: borderRadius.lg,
              border: isDark
                ? `2px solid ${withOpacity(blueColor, 0.3)}`
                : `2px solid ${withOpacity(blueColor, 0.2)}`,
            }}
          >
            <QuestionMark
              sx={{
                fontSize: 32,
                color: blueColor,
                mb: 1,
              }}
            />
            <Typography
              sx={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: getTextColor('secondary', isDark),
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
                color: getTextColor('primary', isDark),
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
                color: getTextColor('primary', isDark),
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
                        ? withOpacity(colors.neutral.darkBorder, 0.2)
                        : withOpacity('#F8FAFC', 0.8),
                      borderRadius: borderRadius.lg,
                      border: isDark
                        ? `1px solid ${withOpacity(colors.neutral.darkBorder, 0.3)}`
                        : `1px solid ${withOpacity(colors.neutral.lightBorder, 0.6)}`,
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: borderRadius.sm,
                        background: getGradient(gradients.blue, isDark),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <IconComponent sx={{ fontSize: 20, color: '#FFFFFF' }} />
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: '1rem',
                          fontWeight: 600,
                          color: getTextColor('primary', isDark),
                          mb: 0.5,
                        }}
                      >
                        {item.step}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: typography.bodySmall.size,
                          color: getTextColor('muted', isDark),
                          lineHeight: typography.bodySmall.lineHeight,
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
            <Divider 
              sx={{ 
                mb: 4, 
                opacity: 0.3,
                borderColor: getTextColor('muted', isDark),
              }} 
            />
            
            <Box
              sx={{
                textAlign: 'center',
                p: 4,
                background: isDark
                  ? withOpacity(greenColor, 0.1)
                  : withOpacity(greenColor, 0.05),
                borderRadius: borderRadius.lg,
                border: isDark
                  ? `2px solid ${withOpacity(greenColor, 0.3)}`
                  : `2px solid ${withOpacity(greenColor, 0.2)}`,
              }}
            >
              <Visibility
                sx={{
                  fontSize: 32,
                  color: greenColor,
                  mb: 1,
                }}
              />
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  textAlign: 'center',
                  fontWeight: 600,
                  color: getTextColor('secondary', isDark),
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
                  color: getTextColor('primary', isDark),
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
                        borderRadius: borderRadius.full,
                        backgroundColor: greenColor,
                        flexShrink: 0,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: typography.bodySmall.size,
                        color: getTextColor('secondary', isDark),
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
              color: getTextColor('primary', isDark),
              mb: 2,
            }}
          >
            ChatAPC turns complex plant data into explanations, not just numbers
          </Typography>
          <Typography
            sx={{
              fontSize: '1rem',
              color: getTextColor('muted', isDark),
              fontStyle: 'italic',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: typography.body.lineHeight,
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