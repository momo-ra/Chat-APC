import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container } from '@mui/material';
import {
  QuestionAnswer,
  Psychology,
  SmartToy,
  Hub,
  Description,
  ChatBubbleOutline,
} from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

// Register the ScrollTrigger plugin.
gsap.registerPlugin(ScrollTrigger);

// Data describing each step of the process.
const processSteps = [
  {
    step: '01',
    tagline: 'Natural Language',
    title: 'Ask in Plain Language',
    description:
      'Anyone can ask questions naturally. No commands, no SQL, no scripting required. Just speak like you would to a colleague. Our AI understands context and intent, making process analysis accessible to everyone on your team.',
    icon: QuestionAnswer,
    examples: [
      'Why is the feed not increasing?',
      'Which constraints limited margin yesterday?',
      'What happens if I adjust reflux flow?',
    ],
  },
  {
    step: '02',
    tagline: 'AI Processing',
    title: 'AI Understands Context',
    description:
      'ChatAPC uses advanced AI to interpret your question, understand the context, and select the right specialist agent for your needs. Our system analyzes the intent behind your words and routes to the most appropriate processing engine.',
    icon: Psychology,
  },
  {
    step: '03',
    tagline: 'Agent Activation',
    title: 'Specialized Agents Work',
    description:
      'The AI activates specialized agents to analyze your data, each designed for specific types of industrial process questions. These agents work in parallel to provide comprehensive analysis from multiple perspectives.',
    icon: SmartToy,
    agents: [
      'Graph Agent - Visual data analysis',
      'Event Agent - Alarm and violation detection',
      'Process Advisor - Operational guidance',
      'Profit Advisor - Margin optimization',
    ],
  },
  {
    step: '04',
    tagline: 'Knowledge Access',
    title: 'Access Process Knowledge',
    description:
      'Agents tap into your comprehensive process knowledge map, ensuring answers are contextual and accurate. We combine real-time data with historical patterns and expert knowledge to provide informed insights.',
    icon: Hub,
    knowledge: [
      'Live Process Data',
      'Historical Records',
      'Operating Procedures',
      'Expert Knowledge',
    ],
  },
  {
    step: '05',
    tagline: 'Insight Generation',
    title: 'Generate Insights',
    description:
      'The system produces actionable artifacts with clear visualizations and comprehensive analysis. Every insight is backed by data and presented in formats that support quick decision-making.',
    icon: Description,
  },
  {
    step: '06',
    tagline: 'Clear Communication',
    title: 'Plain Language Results',
    description:
      'Complex technical insights are translated into clear, actionable recommendations that anyone can understand. No technical jargon - just clear answers that help you optimize your process operations.',
    icon: ChatBubbleOutline,
  },
];

/**
 * Mobile-optimized HowItWorksProcessSection with consistent spacing and layout
 */
export const HowItWorksProcessSection = () => {
  const { isDark } = useThemeMode();
  const {
    containerMaxWidth,
    containerPadding,
    sectionPadding,
  } = useResponsiveLayout();

  const sectionRef = useRef(null);
  const stepsRef = useRef([]);

  // Primary colour for interactive accents.
  const primaryColor = isDark ? '#009BE4' : '#171B83';

  // Base colour for the timeline line segments.
  const lineBaseColor = isDark
    ? 'rgba(75, 85, 99, 0.3)'
    : 'rgba(203, 213, 225, 0.5)';

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hide content to prepare for animation.
      stepsRef.current.forEach((step) => {
        if (!step) return;
        const content = step.querySelector('.step-content');
        const detailItems = step.querySelectorAll('.detail-item');

        gsap.set(content, {
          opacity: 0,
          y: 30,
        });
        gsap.set(detailItems, { opacity: 0, y: 20 });
      });

      // ScrollTriggers for each step.
      stepsRef.current.forEach((step, index) => {
        if (!step) return;
        ScrollTrigger.create({
          trigger: step,
          start: 'top 80%',
          toggleActions: 'play none none none',
          onEnter: () => {
            const tl = gsap.timeline();
            const content = step.querySelector('.step-content');
            const detailItems = step.querySelectorAll('.detail-item');

            // Animate content and details.
            tl.to(content, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
            })
              .to(
                detailItems,
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  stagger: 0.1,
                  ease: 'power2.out',
                },
                '-=0.4'
              );
          },
        });
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
        background: 'transparent',
        position: 'relative',
        minHeight: '100vh',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          maxWidth: containerMaxWidth,
          px: containerPadding,
        }}
      >
        {/* Header */}
        <Box sx={{ 
          textAlign: 'center', 
          mb: 'clamp(3rem, 8vw, 6rem)',
          px: { xs: 1, sm: 2 }
        }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              fontWeight: 700,
              color: isDark ? '#FFFFFF' : '#1E293B',
              mb: 'clamp(1rem, 3vw, 2rem)',
              lineHeight: 1.1,
            }}
          >
            How It Works
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#64748B',
              maxWidth: '600px',
              mx: 'auto',
              fontWeight: 400,
            }}
          >
            Six simple steps from question to actionable insight
          </Typography>
        </Box>

        {/* Steps Container - Mobile-First Design */}
        <Box
          sx={{
            position: 'relative',
            maxWidth: '100%',
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(2rem, 5vw, 3rem)',
          }}
        >
          {processSteps.map((step, index) => {
            const IconComponent = step.icon;
            const isLast = index === processSteps.length - 1;
            
            return (
              <Box
                key={index}
                ref={(el) => {
                  stepsRef.current[index] = el;
                }}
                sx={{
                  position: 'relative',
                  width: '100%',
                }}
              >
                {/* Mobile Timeline Line - Consistent positioning */}
                {!isLast && (
                  <Box
                    className="timeline-line"
                    sx={{
                      position: 'absolute',
                      left: 'clamp(44px, 12vw, 48px)',
                      top: 'clamp(90px, 20vw, 100px)',
                      width: '3px',
                      height: 'calc(100% + clamp(2rem, 5vw, 3rem) - clamp(70px, 15vw, 80px))',
                      background: isDark
                        ? `linear-gradient(180deg, ${primaryColor}40, ${primaryColor}10)`
                        : `linear-gradient(180deg, ${primaryColor}30, ${primaryColor}05)`,
                      borderRadius: '2px',
                      zIndex: 0,
                      display: { xs: 'block', md: 'none' },
                    }}
                  />
                )}

                {/* Desktop Timeline Lines */}
                <Box
                  className="timeline-line timeline-line--top"
                  sx={{
                    position: 'absolute',
                    left: '50%',
                    top: -16,
                    transform: 'translateX(-50%)',
                    width: '2px',
                    height: 'calc(50% - 4rem)',
                    background: lineBaseColor,
                    transformOrigin: 'bottom center',
                    zIndex: 1,
                    display: { xs: 'none', md: 'block' },
                  }}
                />
                <Box
                  className="timeline-line timeline-line--bottom"
                  sx={{
                    position: 'absolute',
                    left: '50%',
                    bottom: 0,
                    transform: 'translateX(-50%)',
                    width: '2px',
                    height: 'calc(50% - 4rem)',
                    background: lineBaseColor,
                    transformOrigin: 'top center',
                    zIndex: 1,
                    display: { xs: 'none', md: 'block' },
                  }}
                />

                {/* Step Number for Desktop */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '7rem',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#1E293B',
                    fontFamily: 'Inter, sans-serif',
                    lineHeight: 0.8,
                    zIndex: 4,
                    top: 'calc(50% - 4rem)',
                    userSelect: 'none',
                    display: { xs: 'none', md: 'block' },
                  }}
                >
                  {step.step}
                </Box>

                {/* Mobile Card Container - Consistent spacing */}
                <Box
                  className="step-content"
                  sx={{
                    width: '100%',
                    background: {
                      xs: isDark
                        ? 'rgba(30, 41, 59, 0.5)'
                        : 'rgba(255, 255, 255, 0.8)',
                      md: 'transparent',
                    },
                    borderRadius: { xs: '20px', md: 0 },
                    border: {
                      xs: isDark
                        ? '1px solid rgba(255, 255, 255, 0.08)'
                        : '1px solid rgba(148, 163, 184, 0.15)',
                      md: 'none',
                    },
                    overflow: 'hidden',
                    backdropFilter: { xs: 'blur(20px)', md: 'none' },
                    boxShadow: {
                      xs: isDark
                        ? '0 10px 40px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.2)'
                        : '0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
                      md: 'none',
                    },
                    transition: 'all 0.3s ease',
                    // Desktop positioning
                    ...(index % 2 === 0 ? {
                      // Even items - Left side on desktop
                      width: { md: '40%' },
                      marginRight: { md: 'auto' },
                      paddingRight: { md: '3rem' },
                      textAlign: { md: 'left' }
                    } : {
                      // Odd items - Right side on desktop
                      width: { md: '40%' },
                      marginLeft: { md: 'auto' },
                      paddingLeft: { md: '3rem' },
                      textAlign: { md: 'right' }
                    })
                  }}
                >
                  {/* Mobile Header with Icon and Step Badge */}
                  <Box
                    sx={{
                      display: { xs: 'flex', md: 'none' },
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 'clamp(1.5rem, 4vw, 2rem)',
                      pb: 'clamp(1rem, 3vw, 1.5rem)',
                    }}
                  >
                    {/* Icon */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 'clamp(60px, 15vw, 72px)',
                        height: 'clamp(60px, 15vw, 72px)',
                        borderRadius: '18px',
                        background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}DD)`,
                        boxShadow: `0 12px 32px ${primaryColor}50`,
                        flexShrink: 0,
                      }}
                    >
                      <IconComponent
                        sx={{
                          fontSize: 'clamp(28px, 7vw, 36px)',
                          color: '#FFFFFF',
                        }}
                      />
                    </Box>

                    {/* Step Badge */}
                    <Box
                      sx={{
                        px: 'clamp(1rem, 3vw, 1.5rem)',
                        py: 'clamp(0.5rem, 2vw, 0.75rem)',
                        borderRadius: '12px',
                        background: isDark
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'rgba(0, 0, 0, 0.05)',
                        border: isDark
                          ? '1px solid rgba(255, 255, 255, 0.1)'
                          : '1px solid rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 'clamp(0.7rem, 2vw, 0.85rem)',
                          fontWeight: 700,
                          color: isDark
                            ? 'rgba(255, 255, 255, 0.6)'
                            : 'rgba(0, 0, 0, 0.5)',
                          fontFamily: 'Inter, sans-serif',
                          letterSpacing: '0.1em',
                        }}
                      >
                        STEP {step.step}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Content Section - Consistent padding */}
                  <Box
                    sx={{
                      p: { xs: 'clamp(1.5rem, 4vw, 2rem)', md: 0 },
                      pt: { xs: 0, md: 0 },
                      pb: { xs: 'clamp(1.5rem, 4vw, 2rem)', md: 0 },
                    }}
                  >
                    {/* Tagline */}
                    <Typography
                      variant="overline"
                      sx={{
                        fontSize: 'clamp(0.7rem, 1.8vw, 0.75rem)',
                        fontWeight: 600,
                        color: primaryColor,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        mb: 'clamp(0.75rem, 2vw, 1rem)',
                        display: 'block',
                      }}
                    >
                      {step.tagline}
                    </Typography>

                    {/* Title */}
                    <Typography
                      variant="h3"
                      sx={{
                        fontSize: {
                          xs: 'clamp(1.5rem, 5vw, 2rem)',
                          md: '2.5rem'
                        },
                        fontWeight: 700,
                        color: isDark ? '#FFFFFF' : '#1E293B',
                        mb: 'clamp(1rem, 3vw, 1.5rem)',
                        lineHeight: 1.2,
                      }}
                    >
                      {step.title}
                    </Typography>

                    {/* Description */}
                    <Typography
                      sx={{
                        fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
                        color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#475569',
                        lineHeight: 1.6,
                        mb: (step.examples || step.agents || step.knowledge)
                          ? 'clamp(1.5rem, 4vw, 2rem)'
                          : 0,
                      }}
                    >
                      {step.description}
                    </Typography>

                    {/* Examples List */}
                    {step.examples && (
                      <Box sx={{ mb: 'clamp(1rem, 3vw, 1.5rem)' }}>
                        {step.examples.map((example, idx) => (
                          <Box
                            key={idx}
                            className="detail-item"
                            sx={{
                              p: 'clamp(1rem, 3vw, 1.5rem)',
                              mb: 'clamp(0.75rem, 2vw, 1rem)',
                              background: isDark
                                ? `${primaryColor}15`
                                : `${primaryColor}08`,
                              borderLeft: `3px solid ${primaryColor}`,
                              borderRadius: '0 8px 8px 0',
                              backdropFilter: 'blur(10px)',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                background: isDark
                                  ? `${primaryColor}25`
                                  : `${primaryColor}12`,
                                transform: 'translateY(-2px)',
                              },
                              '&:last-child': {
                                mb: 0,
                              }
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: 'clamp(0.9rem, 2.2vw, 0.95rem)',
                                color: isDark
                                  ? 'rgba(255, 255, 255, 0.9)'
                                  : '#334155',
                                fontStyle: 'italic',
                                lineHeight: 1.5,
                              }}
                            >
                              "{example}"
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    )}

                    {/* Agents List */}
                    {step.agents && (
                      <Box sx={{ mb: 'clamp(1rem, 3vw, 1.5rem)' }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                            fontWeight: 600,
                            color: isDark
                              ? 'rgba(255, 255, 255, 0.9)'
                              : '#334155',
                            mb: 'clamp(1rem, 2.5vw, 1.25rem)',
                          }}
                        >
                          Available Agents:
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'clamp(0.75rem, 2vw, 1rem)',
                          }}
                        >
                          {step.agents.map((agent, idx) => (
                            <Box
                              key={idx}
                              className="detail-item"
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'clamp(1rem, 2.5vw, 1.5rem)',
                                p: 'clamp(1rem, 2.5vw, 1.25rem)',
                                background: isDark
                                  ? 'rgba(168, 85, 247, 0.1)'
                                  : 'rgba(168, 85, 247, 0.05)',
                                borderRadius: '12px',
                                border: isDark
                                  ? '1px solid rgba(168, 85, 247, 0.2)'
                                  : '1px solid rgba(168, 85, 247, 0.1)',
                                backdropFilter: 'blur(10px)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  background: isDark
                                    ? 'rgba(168, 85, 247, 0.15)'
                                    : 'rgba(168, 85, 247, 0.08)',
                                  transform: 'translateY(-2px)',
                                },
                              }}
                            >
                              <Box
                                sx={{
                                  width: 'clamp(8px, 2vw, 10px)',
                                  height: 'clamp(8px, 2vw, 10px)',
                                  borderRadius: '50%',
                                  backgroundColor: '#A855F7',
                                  flexShrink: 0,
                                }}
                              />
                              <Typography
                                sx={{
                                  fontSize: 'clamp(0.9rem, 2.2vw, 0.95rem)',
                                  color: isDark
                                    ? 'rgba(255, 255, 255, 0.8)'
                                    : '#475569',
                                  fontWeight: 500,
                                  lineHeight: 1.5,
                                  flex: 1,
                                }}
                              >
                                {agent}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    )}

                    {/* Knowledge Sources List */}
                    {step.knowledge && (
                      <Box sx={{ mb: 'clamp(1rem, 3vw, 1.5rem)' }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                            fontWeight: 600,
                            color: isDark
                              ? 'rgba(255, 255, 255, 0.9)'
                              : '#334155',
                            mb: 'clamp(1rem, 2.5vw, 1.25rem)',
                          }}
                        >
                          Knowledge Sources:
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 'clamp(0.75rem, 2vw, 1rem)',
                            justifyContent: 'flex-start',
                          }}
                        >
                          {step.knowledge.map((item, idx) => (
                            <Box
                              key={idx}
                              className="detail-item"
                              sx={{
                                px: 'clamp(1rem, 2.5vw, 1.25rem)',
                                py: 'clamp(0.75rem, 2vw, 1rem)',
                                background: isDark
                                  ? 'rgba(168, 85, 247, 0.1)'
                                  : 'rgba(168, 85, 247, 0.05)',
                                borderRadius: '20px',
                                border: isDark
                                  ? '1px solid rgba(168, 85, 247, 0.2)'
                                  : '1px solid rgba(168, 85, 247, 0.1)',
                                backdropFilter: 'blur(10px)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  background: isDark
                                    ? 'rgba(168, 85, 247, 0.15)'
                                    : 'rgba(168, 85, 247, 0.08)',
                                  transform: 'translateY(-2px) scale(1.02)',
                                },
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: 'clamp(0.85rem, 2vw, 0.9rem)',
                                  color: isDark
                                    ? 'rgba(255, 255, 255, 0.8)'
                                    : '#475569',
                                  fontWeight: 500,
                                  lineHeight: 1.4,
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {item}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};