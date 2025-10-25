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
    {
      step: '01',
      tagline: 'Natural Language',
      title: 'Ask in Plain Language',
      description: 'Anyone can ask questions naturally. No commands, no SQL, no scripting required. Just speak like you would to a colleague.',
      icon: QuestionAnswer,
      // Assign consistent color per step
      stepColor: getColor(colors.blue, isDark),
      details: [
        { 
          label: "Examples", 
          items: [
            'Why is the feed not increasing?',
            'Which constraints limited margin yesterday?',
            'What happens if I adjust reflux flow?',
          ] 
        }
      ]
    },
    {
      step: '02',
      tagline: 'AI Processing',
      title: 'AI Understands Context',
      description: 'ChatAPC uses advanced AI to interpret your question, understand the context, and select the right specialist agent for your needs.',
      icon: Psychology,
      stepColor: getColor(colors.blue, isDark),
      details: [
        { 
          label: "Key Capabilities", 
          items: [
            'Historical & live data context',
            'Process & equipment detection',
            'Smart agent selection'
          ] 
        }
      ]
    },
    {
      step: '03',
      tagline: 'Agent Activation',
      title: 'Specialized Agents Work',
      description: 'The AI activates specialized agents to analyze your data, each designed for specific types of industrial process questions.',
      icon: SmartToy,
      stepColor: getColor(colors.pink, isDark),
      details: [
        { 
          label: "Active Agents", 
          items: [
            'Visualize Agent',
            'Event Agent',
            'Advisor Agent',
            'Optimizer Agent'
          ] 
        }
      ]
    },
    {
      step: '04',
      tagline: 'Knowledge Access',
      title: 'Access Process Knowledge',
      description: 'Agents tap into your comprehensive process knowledge map, ensuring answers are contextual and accurate.',
      icon: Hub,
      stepColor: getColor(colors.green, isDark),
      details: [
        { 
          label: "Data Sources", 
          items: [
            'Live Process Data',
            'Historical Records',
            'Operating Procedures',
            'Expert Knowledge'
          ] 
        }
      ]
    },
    {
      step: '05',
      tagline: 'Insight Generation',
      title: 'Generate Insights',
      description: 'The system produces actionable artifacts with clear visualizations and comprehensive analysis.',
      icon: Description,
      stepColor: getColor(colors.blue, isDark),
      details: [
        { 
          label: "Deliverables", 
          items: [
            'Summary cards with recommendations',
            'Visual graphs and plots',
            'Root cause analysis',
            'Optimization suggestions'
          ] 
        }
      ]
    },
    {
      step: '06',
      tagline: 'Clear Communication',
      title: 'Plain Language Results',
      description: 'Complex technical insights are translated into clear, actionable recommendations that anyone can understand.',
      icon: ChatBubbleOutline,
      stepColor: getColor(colors.blue, isDark),
      details: [
        { 
          label: "Output Format", 
          items: [
            'Plain language narratives',
            'Step-by-step recommendations',
            'Clear next actions'
          ] 
        }
      ]
    }
  ];
};

const getStepDirection = (index: number) => (index % 2 === 0 ? 'left' : 'right');

export const HowItWorksProcessSection: React.FC = () => {
  const { isDark } = useThemeMode();
  const { 
    containerMaxWidth, 
    containerPadding, 
    sectionPadding 
  } = useResponsiveLayout();
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Get unified theme values
  const { colors, typography, animations, borderRadius, transitions } = themeConfig;
  const paletteBlue = getColor(colors.blue, isDark);
  const baseText = getTextColor('primary', isDark);
  const mutedText = getTextColor('muted', isDark);
  const lineBaseColor = withOpacity(paletteBlue, isDark ? 0.25 : 0.19);
  
  const processSteps = getProcessSteps(isDark);

  useEffect(() => {
    const ctx = gsap.context(() => {
      stepsRef.current.forEach((step) => {
        if (!step) return;
        const content = step.querySelector('.step-content');
        const detailItems = step.querySelectorAll('.detail-item');
        
        gsap.set(content, { opacity: 0, y: 30 });
        gsap.set(detailItems, { opacity: 0, y: 15 });
      });

      stepsRef.current.forEach((step) => {
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
              duration: animations.duration.normal,
              ease: animations.easing.sharp,
            }).to(detailItems, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.08,
              ease: animations.easing.sharp,
            }, '-=0.4');
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [animations]);

  // Consistent card background for mobile
  const getMobileCardBackground = () =>
    isDark
      ? withOpacity(colors.neutral.darkBackground, 0.94)
      : withOpacity(colors.neutral.lightBackground, 0.98);

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        py: sectionPadding,
        background: "transparent",
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
        <Box sx={{ textAlign: 'center', mb: 'clamp(3rem, 8vw, 6rem)' }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              fontWeight: typography.h2.weight,
              color: baseText,
              mb: 'clamp(1rem, 3vw, 2rem)',
              lineHeight: typography.h2.lineHeight,
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
              fontWeight: typography.h6.weight,
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
            const isLeft = direction === 'left';
            // Use step's assigned color consistently
            const stepColor = step.stepColor;

            return (
              <Box
                key={index}
                ref={(el: HTMLDivElement) => { stepsRef.current[index] = el; }}
                sx={{ position: 'relative', width: '100%' }}
              >
                {/* Desktop Timeline */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: '50%',
                    top: -48,
                    transform: 'translateX(-50%)',
                    width: '2px',
                    height: 'calc(50% - 4rem)',
                    background: lineBaseColor,
                    display: { xs: 'none', md: 'block' },
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    left: '50%',
                    bottom: 0,
                    transform: 'translateX(-50%)',
                    width: '2px',
                    height: 'calc(50% - 4rem)',
                    background: lineBaseColor,
                    display: { xs: 'none', md: 'block' },
                  }}
                />

                {/* Step Number */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '7rem',
                    fontWeight: 800,
                    color: baseText,
                    lineHeight: 0.8,
                    top: 'calc(50% - 4rem)',
                    userSelect: 'none',
                    display: { xs: 'none', md: 'block' },
                    opacity: 0.6,
                  }}
                >
                  {step.step}
                </Box>

                {/* Content */}
                <Box
                  className="step-content"
                  sx={{
                    width: '100%',
                    background: {
                      xs: getMobileCardBackground(),
                      md: 'transparent',
                    },
                    borderRadius: { xs: borderRadius.xl, md: 0 },
                    border: {
                      xs: `1px solid ${withOpacity(stepColor, 0.2)}`,
                      md: 'none',
                    },
                    backdropFilter: { xs: 'blur(20px)', md: 'none' },
                    boxShadow: {
                      xs: 'none',
                      md: 'none',
                    },
                    ...(isLeft
                      ? { width: { md: '40%' }, mr: { md: 'auto' }, pr: { md: 3 }, textAlign: { md: 'left' } }
                      : { width: { md: '40%' }, ml: { md: 'auto' }, pl: { md: 3 }, textAlign: { md: 'right' } })
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
                        borderRadius: borderRadius.lg,
                        // Use consistent stepColor for icon background
                        background: `linear-gradient(135deg, ${stepColor} 0%, ${withOpacity(stepColor, 0.7)} 100%)`,
                        boxShadow: 'none',
                      }}
                    >
                      <IconComponent 
                        sx={{ 
                          fontSize: 'clamp(28px, 7vw, 36px)', 
                          color: '#FFFFFF' 
                        }} 
                      />
                    </Box>
                    <Box
                      sx={{
                        px: 'clamp(1rem, 3vw, 1.5rem)',
                        py: 'clamp(0.5rem, 2vw, 0.75rem)',
                        borderRadius: borderRadius.md,
                        // Use consistent stepColor for badge
                        background: withOpacity(stepColor, 0.1),
                        border: `1px solid ${withOpacity(stepColor, 0.3)}`
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 'clamp(0.7rem, 2vw, 0.85rem)',
                          fontWeight: 700,
                          color: stepColor,
                          letterSpacing: '0.1em',
                        }}
                      >
                        STEP {step.step}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Main Content */}
                  <Box sx={{ p: { xs: 'clamp(1.5rem, 4vw, 2rem)', md: 0 }, pt: { xs: 0 } }}>
                    <Typography
                      variant="overline"
                      sx={{
                        fontSize: 'clamp(0.7rem, 1.8vw, 0.75rem)',
                        fontWeight: 600,
                        // Use consistent stepColor
                        color: stepColor,
                        letterSpacing: '0.15em',
                        mb: 'clamp(0.75rem, 2vw, 1rem)',
                        display: 'block',
                        textTransform: 'uppercase',
                      }}
                    >
                      {step.tagline}
                    </Typography>
                    <Typography
                      variant="h3"
                      sx={{
                        fontSize: { xs: 'clamp(1.5rem, 5vw, 2rem)', md: '2.5rem' },
                        fontWeight: typography.h3.weight,
                        color: baseText,
                        mb: 'clamp(1rem, 3vw, 1.5rem)',
                        lineHeight: typography.h3.lineHeight,
                      }}
                    >
                      {step.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
                        color: getTextColor('secondary', isDark),
                        lineHeight: typography.body.lineHeight,
                        mb: step.details?.length ? 'clamp(1.5rem, 3vw, 2rem)' : 0,
                      }}
                    >
                      {step.description}
                    </Typography>

                    {/* Details */}
                    {step.details?.map((detail, detailIdx) => {
                      const isExamples = detail.label === "Examples";

                      return (
                        <Box key={detailIdx}>
                          <Typography
                            sx={{
                              fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                              fontWeight: 600,
                              // Use consistent stepColor
                              color: stepColor,
                              mb: 'clamp(0.75rem, 2vw, 1rem)',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                              textAlign: { xs: 'left', md: isLeft ? 'left' : 'right' },
                            }}
                          >
                            {detail.label}
                          </Typography>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                            }}
                          >
                            {detail.items.map((item, idx) => (
                              <Box
                                key={idx}
                                className="detail-item"
                                sx={{
                                  px: 'clamp(0.85rem, 2.5vw, 1.1rem)',
                                  py: 'clamp(0.5rem, 1.5vw, 0.65rem)',
                                  borderRadius: { 
                                    xs: `0 ${borderRadius.md} ${borderRadius.md} 0`, 
                                    md: isLeft ? `0 ${borderRadius.md} ${borderRadius.md} 0` : `${borderRadius.md} 0 0 ${borderRadius.md}` 
                                  },
                                  borderLeft: { 
                                    xs: `3px solid ${stepColor}`, 
                                    md: isLeft ? `3px solid ${stepColor}` : 'none' 
                                  },
                                  borderRight: { 
                                    md: isLeft ? 'none' : `3px solid ${stepColor}` 
                                  },
                                  // Use consistent stepColor
                                  background: withOpacity(stepColor, 0.08),
                                  color: getTextColor('secondary', isDark),
                                  fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                                  lineHeight: 1.5,
                                  fontStyle: isExamples ? 'italic' : 'normal',
                                  transition: transitions.allFast,
                                  textAlign: { xs: 'left', md: isLeft ? 'left' : 'right' },
                                  '&:hover': {
                                    background: withOpacity(stepColor, 0.15),
                                    transform: isLeft ? 'translateX(4px)' : 'translateX(-4px)',
                                  },
                                }}
                              >
                                {isExamples ? `"${item}"` : item}
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      );
                    })}
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