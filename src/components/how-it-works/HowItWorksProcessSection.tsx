import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Card, CardContent, Chip } from '@mui/material';
import { 
  QuestionAnswer, 
  Psychology, 
  SmartToy, 
  Hub, 
  Description,
  ChatBubbleOutline,
  ArrowForward
} from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    step: 1,
    title: "Ask in Plain Language",
    description: "Anyone can ask questions naturally. No commands, no SQL, no scripting required. Just speak like you would to a colleague.",
    icon: QuestionAnswer,
    color: { light: '#3B82F6', dark: '#60A5FA' },
    examples: [
      "Why is the feed not increasing?",
      "Which constraints limited margin yesterday?",
      "What happens if I adjust reflux flow?"
    ],
  },
  {
    step: 2,
    title: "AI Understands Context",
    description: "ChatAPC uses advanced AI to interpret your question, understand the context, and select the right specialist agent for your needs.",
    icon: Psychology,
    color: { light: '#8B5CF6', dark: '#A78BFA' },
  },
  {
    step: 3,
    title: "Specialized Agents Work",
    description: "The AI activates specialized agents to analyze your data, each designed for specific types of industrial process questions.",
    icon: SmartToy,
    color: { light: '#10B981', dark: '#34D399' },
    agents: [
      "Graph Agent - Visual data analysis",
      "Event Agent - Alarm and violation detection", 
      "Process Advisor - Operational guidance",
      "Profit Advisor - Margin optimization"
    ],
  },
  {
    step: 4,
    title: "Access Process Knowledge",
    description: "Agents tap into your comprehensive process knowledge map, ensuring answers are contextual and accurate.",
    icon: Hub,
    color: { light: '#EC4899', dark: '#F472B6' },
    knowledge: ["Live Process Data", "Historical Records", "Operating Procedures", "Expert Knowledge"],
  },
  {
    step: 5,
    title: "Generate Insights",
    description: "The system produces actionable artifacts with clear visualizations and comprehensive analysis.",
    icon: Description,
    color: { light: '#F59E0B', dark: '#FBBF24' },
  },
  {
    step: 6,
    title: "Plain Language Results",
    description: "Complex technical insights are translated into clear, actionable recommendations that anyone can understand.",
    icon: ChatBubbleOutline,
    color: { light: '#6366F1', dark: '#818CF8' },
  },
];

export const HowItWorksProcessSection: React.FC = () => {
  const { isDark } = useThemeMode();
  const { 
    containerMaxWidth, 
    containerPadding,
    sectionPadding 
  } = useResponsiveLayout();

  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);
  const connectorsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate steps with stagger
      stepsRef.current.forEach((step, index) => {
        if (step) {
          gsap.from(step, {
            scrollTrigger: {
              trigger: step,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 40,
            duration: 0.6,
            delay: index * 0.15,
            ease: 'power2.out',
          });
        }
      });

      // Animate connectors
      connectorsRef.current.forEach((connector, index) => {
        if (connector) {
          gsap.from(connector, {
            scrollTrigger: {
              trigger: connector,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
            scaleX: 0,
            duration: 0.4,
            delay: index * 0.15 + 0.3,
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
      id="process-section"
      component="section"
      sx={{
        py: sectionPadding,
        background: 'transparent',
        position: 'relative',
        overflow: 'hidden',
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
        <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 12 } }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              color: isDark ? '#FFFFFF' : '#1E293B',
              mb: 3,
              lineHeight: 1.1,
            }}
          >
            How It Works
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#64748B',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Six simple steps from question to actionable insight
          </Typography>
        </Box>

        {/* Process Flow */}
        <Box sx={{ position: 'relative' }}>
          {processSteps.map((step, index) => {
            const IconComponent = step.icon;
            const isEven = index % 2 === 0;
            
            return (
              <Box key={index} sx={{ position: 'relative', mb: { xs: 6, md: 8 } }}>
                {/* Step Container */}
                <Box
                  ref={(el) => {
                    if (el) stepsRef.current[index] = el as HTMLDivElement;
                  }}
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: isEven ? 'row' : 'row-reverse' },
                    alignItems: 'center',
                    gap: { xs: 4, md: 6 },
                    position: 'relative',
                  }}
                >
                  {/* Step Number & Icon */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      minWidth: { xs: 'auto', md: 200 },
                      position: 'relative',
                      zIndex: 2,
                    }}
                  >
                    {/* Step Number */}
                    <Typography
                      sx={{
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: step.color[isDark ? 'dark' : 'light'],
                        mb: 2,
                        letterSpacing: '0.05em',
                      }}
                    >
                      STEP {step.step}
                    </Typography>

                    {/* Icon Circle */}
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${step.color[isDark ? 'dark' : 'light']}20 0%, ${step.color[isDark ? 'dark' : 'light']}40 100%)`,
                        border: `2px solid ${step.color[isDark ? 'dark' : 'light']}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.1)',
                          boxShadow: `0 8px 32px ${step.color[isDark ? 'dark' : 'light']}40`,
                        },
                      }}
                    >
                      <IconComponent 
                        sx={{ 
                          fontSize: 32,
                          color: step.color[isDark ? 'dark' : 'light'],
                        }} 
                      />
                    </Box>
                  </Box>

                  {/* Content Card */}
                  <Card
                    elevation={0}
                    sx={{
                      flex: 1,
                      maxWidth: { xs: '100%', md: '520px' },
                      background: isDark
                        ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.6) 100%)'
                        : 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(20px)',
                      border: isDark 
                        ? `1px solid rgba(71, 85, 105, 0.3)`
                        : `1px solid rgba(226, 232, 240, 0.8)`,
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: isDark
                          ? `0 12px 40px rgba(0, 0, 0, 0.4)`
                          : `0 12px 40px rgba(15, 23, 42, 0.1)`,
                      },
                    }}
                  >
                    <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                      <Typography
                        variant="h4"
                        sx={{
                          fontSize: { xs: '1.5rem', md: '1.75rem' },
                          fontWeight: 700,
                          color: isDark ? '#FFFFFF' : '#1E293B',
                          mb: 2,
                          lineHeight: 1.3,
                        }}
                      >
                        {step.title}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: '1rem',
                          color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#475569',
                          lineHeight: 1.7,
                          mb: step.examples || step.agents || step.knowledge ? 3 : 0,
                        }}
                      >
                        {step.description}
                      </Typography>

                      {/* Examples */}
                      {step.examples && (
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: '0.9rem',
                              fontWeight: 600,
                              color: isDark ? 'rgba(255, 255, 255, 0.9)' : '#334155',
                              mb: 2,
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                            }}
                          >
                            Example Questions
                          </Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {step.examples.map((example, idx) => (
                              <Box
                                key={idx}
                                sx={{
                                  p: 2,
                                  background: isDark 
                                    ? 'rgba(71, 85, 105, 0.3)' 
                                    : 'rgba(248, 250, 252, 0.8)',
                                  borderRadius: 2,
                                  borderLeft: `3px solid ${step.color[isDark ? 'dark' : 'light']}`,
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: '0.9rem',
                                    color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#475569',
                                    fontStyle: 'italic',
                                  }}
                                >
                                  "{example}"
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      )}

                      {/* Agents */}
                      {step.agents && (
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: '0.9rem',
                              fontWeight: 600,
                              color: isDark ? 'rgba(255, 255, 255, 0.9)' : '#334155',
                              mb: 2,
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                            }}
                          >
                            Available Agents
                          </Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {step.agents.map((agent, idx) => (
                              <Box
                                key={idx}
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 2,
                                  p: 1.5,
                                  background: isDark 
                                    ? 'rgba(71, 85, 105, 0.2)' 
                                    : 'rgba(248, 250, 252, 0.6)',
                                  borderRadius: 2,
                                }}
                              >
                                <Box
                                  sx={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    backgroundColor: step.color[isDark ? 'dark' : 'light'],
                                    flexShrink: 0,
                                  }}
                                />
                                <Typography
                                  sx={{
                                    fontSize: '0.9rem',
                                    color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#475569',
                                  }}
                                >
                                  {agent}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      )}

                      {/* Knowledge */}
                      {step.knowledge && (
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: '0.9rem',
                              fontWeight: 600,
                              color: isDark ? 'rgba(255, 255, 255, 0.9)' : '#334155',
                              mb: 2,
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                            }}
                          >
                            Knowledge Sources
                          </Typography>
                          <Box sx={{ 
                            display: 'grid', 
                            gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 1fr' },
                            gap: 1 
                          }}>
                            {step.knowledge.map((item, idx) => (
                              <Box
                                key={idx}
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 1.5,
                                  p: 1.5,
                                  background: isDark 
                                    ? 'rgba(71, 85, 105, 0.2)' 
                                    : 'rgba(248, 250, 252, 0.6)',
                                  borderRadius: 2,
                                }}
                              >
                                <Box
                                  sx={{
                                    width: 4,
                                    height: 4,
                                    borderRadius: '50%',
                                    backgroundColor: step.color[isDark ? 'dark' : 'light'],
                                    flexShrink: 0,
                                  }}
                                />
                                <Typography
                                  sx={{
                                    fontSize: '0.85rem',
                                    color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#475569',
                                  }}
                                >
                                  {item}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Box>

                {/* Connection Arrow */}
                {index < processSteps.length - 1 && (
                  <Box
                    ref={(el) => {
                      if (el) connectorsRef.current[index] = el as HTMLDivElement;
                    }}
                    sx={{
                      position: 'absolute',
                      bottom: { xs: -30, md: -40 },
                      left: '50%',
                      transform: 'translateX(-50%)',
                      zIndex: 1,
                      display: { xs: 'flex', md: 'flex' },
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: 2, md: 3 },
                        height: { xs: 24, md: 32 },
                        background: `linear-gradient(180deg, ${processSteps[index].color[isDark ? 'dark' : 'light']} 0%, ${processSteps[index + 1]?.color[isDark ? 'dark' : 'light']} 100%)`,
                        borderRadius: 1,
                        opacity: 0.6,
                      }}
                    />
                    <ArrowForward
                      sx={{
                        position: 'absolute',
                        bottom: -8,
                        fontSize: 16,
                        color: processSteps[index + 1]?.color[isDark ? 'dark' : 'light'],
                        transform: 'rotate(90deg)',
                        opacity: 0.7,
                      }}
                    />
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>

        {/* Bottom CTA */}
        <Box sx={{ textAlign: 'center', mt: { xs: 8, md: 12 } }}>
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              fontWeight: 600,
              color: isDark ? '#FFFFFF' : '#1E293B',
              mb: 2,
            }}
          >
            Ready to transform your process operations?
          </Typography>
          <Typography
            sx={{
              fontSize: '1rem',
              color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#64748B',
              maxWidth: '480px',
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Experience the power of AI-driven industrial process insights
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};