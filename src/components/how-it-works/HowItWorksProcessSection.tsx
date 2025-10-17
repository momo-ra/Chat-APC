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

// --- Color Palette for Consistency Across All Pages ---
const colors = {
  blue: {
    dark: "#60A5FA",
    light: "#3B82F6",
  },
  green: {
    dark: "#34D399",
    light: "#10B981"
  },
  yellow: {
    dark: "#FBBF24",
    light: "#F59E0B"
  },
  pink: {
    dark: "#F472B6",
    light: "#EC4899"
  },
  neutral: {
    darkBackground: "#1E293B",
    lightBackground: "#FFFFFF",
    darkText: "#FFFFFF",
    lightText: "#1E293B",
    lightGray: "#CBD5E1",
    darkGray: "#64748B"
  }
};

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    step: '01',
    tagline: 'Natural Language',
    title: 'Ask in Plain Language',
    description:
      'Anyone can ask questions naturally. No commands, no SQL, no scripting required. Just speak like you would to a colleague. Our AI understands context and intent, making process analysis accessible to everyone on your team.',
    icon: QuestionAnswer,
    details: [
      { label: "Examples", items: [
        'Why is the feed not increasing?',
        'Which constraints limited margin yesterday?',
        'What happens if I adjust reflux flow?',
      ] }
    ]
  },
  {
    step: '02',
    tagline: 'AI Processing',
    title: 'AI Understands Context',
    description:
      'ChatAPC uses advanced AI to interpret your question, understand the context, and select the right specialist agent for your needs. Our system analyzes the intent behind your words and routes to the most appropriate processing engine.',
    icon: Psychology,
    details: [
      { label: "Examples", items: [
        'Understands historical and live data context',
        'Detects process, equipment, and KPI references',
        'Selects the most relevant process AI agent'
      ] }
    ]
  },
  {
    step: '03',
    tagline: 'Agent Activation',
    title: 'Specialized Agents Work',
    description:
      'The AI activates specialized agents to analyze your data, each designed for specific types of industrial process questions. These agents work in parallel to provide comprehensive analysis from multiple perspectives.',
    icon: SmartToy,
    details: [
      { label: "Agents", items: [
        'Visualize Agent - Visual data analysis',
        'Event Agent - Alarm and violation detection',
        'Advisor Agent - Operational guidance',
        'Optimizer Agent - Margin optimization'
      ] }
    ]
  },
  {
    step: '04',
    tagline: 'Knowledge Access',
    title: 'Access Process Knowledge',
    description:
      'Agents tap into your comprehensive process knowledge map, ensuring answers are contextual and accurate. We combine real-time data with historical patterns and expert knowledge to provide informed insights.',
    icon: Hub,
    details: [
      { label: "Knowledge Sources", items: [
        'Live Process Data',
        'Historical Records',
        'Operating Procedures',
        'Expert Knowledge'
      ] }
    ]
  },
  {
    step: '05',
    tagline: 'Insight Generation',
    title: 'Generate Insights',
    description:
      'The system produces actionable artifacts with clear visualizations and comprehensive analysis. Every insight is backed by data and presented in formats that support quick decision-making.',
    icon: Description,
    details: [
      { label: "Examples", items: [
        'Summary cards with actionable recommendations',
        'Visual graphs and plots',
        'Root cause & constraint analysis',
        'Margin optimization suggestions'
      ] }
    ]
  },
  {
    step: '06',
    tagline: 'Clear Communication',
    title: 'Plain Language Results',
    description:
      'Complex technical insights are translated into clear, actionable recommendations that anyone can understand. No technical jargon - just clear answers that help you optimize your process operations.',
    icon: ChatBubbleOutline,
    details: [
      { label: "Examples", items: [
        'Insightful narratives in plain language',
        'Step-by-step recommendations',
        'Clear next actions for your team'
      ] }
    ]
  }
];

// Get alignment direction for this step index (even: left, odd: right)
const getStepDirection = (index: number) => (index % 2 === 0 ? 'left' : 'right');

// Helper for aligning the details for border-radius and text
const getDetailConfig = (
  stepIndex: number,
  detailLabel: string
) => {
  // Default for desktop: step = even -> left side, odd -> right side
  const isLeft = stepIndex % 2 === 0;

  // "Examples" are aligned with the step/card, rest (Agents, Knowledge Sources) are always centered
  if (detailLabel === "Examples") {
    return {
      justifyContent: { xs: 'flex-start', md: isLeft ? 'flex-start' : 'flex-end' },
      textAlign:      { xs: 'left',      md: isLeft ? 'left'      : 'right' },
      pillRadius:     { xs: '0 8px 8px 0', md: isLeft ? '0 8px 8px 0' : '8px 0 0 8px' }
    };
  } else if (detailLabel === "Knowledge Sources" ) {
    return {
      justifyContent: { xs: 'flex-start', md: isLeft ? 'flex-start' : 'flex-end' },
      textAlign:      { xs: 'left',      md: isLeft ? 'left'      : 'right' },
      pillRadius:     { xs: '0 8px 8px 0', md: isLeft ? '0 8px 8px 0' : '8px 0 0 8px' }
    };
  } else {
    return {
      justifyContent: { xs: 'flex-start', md: isLeft ? 'flex-start' : 'flex-end' },
      textAlign:      { xs: 'left',      md: isLeft ? 'left'      : 'right' },
      pillRadius:     { xs: '0 8px 8px 0', md: isLeft ? '0 8px 8px 0' : '8px 0 0 8px' }
    };
  }
};

// Get pill style (background, border, color) by type
const getDetailStyle = (label: string, isDark: boolean, paletteBlue: string) => {
  if (label === "Agents") {
    return {
      background: isDark
        ? colors.pink.dark + "25"
        : colors.pink.light + "10",
      border: isDark
        ? `1px solid ${colors.pink.dark}80`
        : `1px solid ${colors.pink.light}40`,
      color: isDark
        ? 'rgba(255,255,255,0.85)'
        : '#475569'
    };
  } else if (label === "Knowledge Sources") {
    return {
      background: isDark
        ? colors.green.dark + "25"
        : colors.green.light + "19",
      border: isDark
        ? `1px solid ${colors.green.dark}66`
        : `1px solid ${colors.green.light}40`,
      color: isDark
        ? 'rgba(255,255,255,0.8)'
        : '#475569'
    };
  } else {
    // Examples or general
    return {
      background: isDark
        ? paletteBlue + "25"
        : paletteBlue + "13",
      border: `1px solid ${paletteBlue}55`,
      color: isDark
        ? 'rgba(255,255,255,0.9)'
        : '#334155'
    };
  }
};

export const HowItWorksProcessSection = () => {
  const { isDark } = useThemeMode();
  const {
    containerMaxWidth,
    containerPadding,
    sectionPadding,
  } = useResponsiveLayout();

  const sectionRef = useRef(null);
  const stepsRef = useRef([]);

  const paletteBlue = isDark ? colors.blue.dark : colors.blue.light;
  const baseBG = isDark ? colors.neutral.darkBackground : colors.neutral.lightBackground;
  const baseText = isDark ? colors.neutral.darkText : colors.neutral.lightText;
  const mutedText = isDark ? "rgba(255,255,255,0.7)" : colors.neutral.darkGray;
  const lineBaseColor = isDark ? `${paletteBlue}40` : `${paletteBlue}30`;

  useEffect(() => {
    const ctx = gsap.context(() => {
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
              color: baseText,
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
              color: mutedText,
              maxWidth: '600px',
              mx: 'auto',
              fontWeight: 400,
            }}
          >
            Six simple steps from question to actionable insight
          </Typography>
        </Box>

        {/* Steps */}
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
            const direction = getStepDirection(index);

            return (
              <Box
                key={index}
                ref={(el) => { stepsRef.current[index] = el; }}
                sx={{
                  position: 'relative',
                  width: '100%',
                }}
              >
                {/* Mobile Timeline Line - Use palette blue */}
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
                        ? `linear-gradient(180deg, ${paletteBlue}99, ${paletteBlue}11)`
                        : `linear-gradient(180deg, ${paletteBlue}70, ${paletteBlue}11)`,
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
                    top: -48,
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
                    color: isDark ? colors.neutral.darkText : colors.neutral.lightText,
                    fontFamily: 'Inter, sans-serif',
                    lineHeight: 0.8,
                    zIndex: 4,
                    top: 'calc(50% - 4rem)',
                    userSelect: 'none',
                    display: { xs: 'none', md: 'block' },
                    opacity: 0.08,
                  }}
                >
                  {step.step}
                </Box>

                <Box
                  className="step-content"
                  sx={{
                    width: '100%',
                    background: {
                      xs: isDark
                        ? 'rgba(24,30,42,0.9)'
                        : 'rgba(255,255,255,0.8)',
                      md: 'transparent',
                    },
                    borderRadius: { xs: '20px', md: 0 },
                    border: {
                      xs: `1px solid ${isDark ? paletteBlue + '22' : paletteBlue + '22'}`,
                      md: 'none',
                    },
                    overflow: 'hidden',
                    backdropFilter: { xs: 'blur(20px)', md: 'none' },
                    boxShadow: {
                      xs: isDark
                        ? `0 10px 40px ${paletteBlue}30, 0 2px 8px ${paletteBlue}10`
                        : `0 8px 32px ${paletteBlue}11, 0 2px 8px ${paletteBlue}06`,
                      md: 'none',
                    },
                    transition: 'all 0.3s ease',
                    ...(direction === 'left'
                      ? { width: { md: '40%' }, marginRight: { md: 'auto' }, paddingRight: { md: '3rem' }, textAlign: { md: 'left' } }
                      : { width: { md: '40%' }, marginLeft: { md: 'auto' }, paddingLeft: { md: '3rem' }, textAlign: { md: 'right' } })
                  }}
                >
                  {/* Mobile Header */}
                  <Box
                    sx={{
                      display: { xs: 'flex', md: 'none' },
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 'clamp(1.5rem, 4vw, 2rem)',
                      pb: 'clamp(1rem, 3vw, 1.5rem)',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 'clamp(60px, 15vw, 72px)',
                        height: 'clamp(60px, 15vw, 72px)',
                        borderRadius: '18px',
                        background: `linear-gradient(135deg, ${paletteBlue}, ${paletteBlue}DD)`,
                        boxShadow: `0 12px 32px ${paletteBlue}33`,
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
                    <Box
                      sx={{
                        px: 'clamp(1rem, 3vw, 1.5rem)',
                        py: 'clamp(0.5rem, 2vw, 0.75rem)',
                        borderRadius: '12px',
                        background: isDark
                          ? `${paletteBlue}1A`
                          : `${paletteBlue}11`,
                        border: `1px solid ${paletteBlue}55`
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 'clamp(0.7rem, 2vw, 0.85rem)',
                          fontWeight: 700,
                          color: paletteBlue,
                          fontFamily: 'Inter, sans-serif',
                          letterSpacing: '0.1em',
                        }}
                      >
                        STEP {step.step}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      p: { xs: 'clamp(1.5rem, 4vw, 2rem)', md: 0 },
                      pt: { xs: 0, md: 0 },
                      pb: { xs: 'clamp(1.5rem, 4vw, 2rem)', md: 0 },
                    }}
                  >
                    <Typography
                      variant="overline"
                      sx={{
                        fontSize: 'clamp(0.7rem, 1.8vw, 0.75rem)',
                        fontWeight: 600,
                        color: paletteBlue,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        mb: 'clamp(0.75rem, 2vw, 1rem)',
                        display: 'block',
                      }}
                    >
                      {step.tagline}
                    </Typography>
                    <Typography
                      variant="h3"
                      sx={{
                        fontSize: {
                          xs: 'clamp(1.5rem, 5vw, 2rem)',
                          md: '2.5rem'
                        },
                        fontWeight: 700,
                        color: baseText,
                        mb: 'clamp(1rem, 3vw, 1.5rem)',
                        lineHeight: 1.2,
                      }}
                    >
                      {step.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
                        color: isDark ? 'rgba(255,255,255,0.8)' : '#475569',
                        lineHeight: 1.6,
                        mb: step.details?.length ? 'clamp(1.5rem, 4vw, 2rem)' : 0,
                      }}
                    >
                      {step.description}
                    </Typography>

                    {/* Details List */}
                    {step.details && (
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 'clamp(1.25rem, 2vw, 1.8rem)',
                        }}
                      >
                        {step.details.map((detail, detailIdx) => {
                          const config = getDetailConfig(index, detail.label);
                          const style = getDetailStyle(detail.label, isDark, paletteBlue);

                          return (
                            <Box key={detailIdx}>
                              <Typography
                                variant="h6"
                                sx={{
                                  fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                                  fontWeight: 600,
                                  color: isDark
                                    ? 'rgba(255,255,255,0.9)'
                                    : '#334155',
                                  mb: 'clamp(1rem, 2.5vw, 1.25rem)',
                                  textAlign: config.textAlign,
                                }}
                              >
                                {detail.label}
                              </Typography>
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexWrap: 'wrap',
                                  gap: 'clamp(0.75rem, 2vw, 1rem)',
                                  justifyContent: config.justifyContent,
                                  textAlign: config.textAlign,
                                }}
                              >
                                {detail.items.map((item, idx2) => (
                                  <Box
                                    key={idx2}
                                    className="detail-item"
                                    sx={{
                                      px: detail.label === "Agents" || detail.label === "Knowledge Sources"
                                        ? 'clamp(1rem, 2.5vw, 1.25rem)'
                                        : 'clamp(1rem, 3vw, 1.5rem)',
                                      py: detail.label === "Examples"
                                        ? 'clamp(0.75rem, 2vw, 1rem)'
                                        : 'clamp(0.75rem, 2vw, 1rem)',
                                      minWidth: detail.label === "Examples" ? undefined : '180px',
                                      display: detail.label === "Agents"
                                        ? 'flex'
                                        : 'block',
                                      alignItems: detail.label === "Agents"
                                        ? 'center'
                                        : 'initial',
                                      gap: detail.label === "Agents"
                                        ? 'clamp(1rem, 2.5vw, 1.5rem)'
                                        : undefined,
                                      borderRadius: config.pillRadius,
                                      border: style.border,
                                      background: style.background,
                                      color: style.color,
                                      mb: 0,
                                      fontStyle:
                                        detail.label === "Examples" ? 'italic' : 'normal',
                                      lineHeight: 1.5,
                                      fontWeight: detail.label === "Knowledge Sources" ? 500 : 400,
                                      fontSize:
                                        detail.label === "Knowledge Sources"
                                          ? 'clamp(0.85rem, 2vw, 0.9rem)'
                                          : 'clamp(0.9rem, 2.2vw, 0.95rem)',
                                      transition: 'all 0.3s ease',
                                      backdropFilter: 'blur(10px)',
                                      '&:hover': {
                                        background:
                                          detail.label === "Agents"
                                            ? (isDark
                                              ? colors.pink.dark + "33"
                                              : colors.pink.light + "24")
                                            : detail.label === "Knowledge Sources"
                                              ? (isDark
                                                ? colors.green.dark + "40"
                                                : colors.green.light + "26")
                                              : (isDark
                                                ? paletteBlue + "40"
                                                : paletteBlue + "20"),
                                        transform: 'translateY(-2px) scale(1.02)'
                                      },
                                      textAlign: config.textAlign,
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        fontSize:
                                          detail.label === "Knowledge Sources"
                                            ? 'clamp(0.85rem, 2vw, 0.9rem)'
                                            : 'clamp(0.9rem, 2.2vw, 0.95rem)',
                                        color: style.color,
                                        fontWeight: detail.label === "Knowledge Sources" ? 500 : 400,
                                        fontStyle: detail.label === "Examples" ? 'italic' : 'normal',
                                        lineHeight: 1.5,
                                        flex: 1,
                                        whiteSpace: (detail.label === "Knowledge Sources" || detail.label === "Agents") ? 'nowrap' : undefined,
                                        textAlign: config.textAlign
                                      }}
                                    >
                                      {detail.label === "Examples" ? `"${item}"` : item}
                                    </Typography>
                                  </Box>
                                ))}
                              </Box>
                            </Box>
                          );
                        })}
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