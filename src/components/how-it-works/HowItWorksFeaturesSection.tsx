import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Card, CardContent, Button } from '@mui/material';
import { 
  BarChart, 
  Event, 
  Explore, 
  Science, 
  TrendingUp,
  ArrowForward,
  Visibility
} from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

gsap.registerPlugin(ScrollTrigger);

const directAccessFeatures = [
  {
    icon: BarChart,
    title: "Custom Graphs",
    description: "Build custom graphs and add variables for detailed analysis",
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
  },
  {
    icon: Event,
    title: "Event Definition",
    description: "Define new events and adjust thresholds for better monitoring",
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
  },
  {
    icon: Explore,
    title: "Knowledge Browsing",
    description: "Browse the knowledge map for equipment, tags, and documents",
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
  },
  {
    icon: Science,
    title: "Scenario Testing",
    description: "Run \"what if\" scenarios with the Process Advisor",
    gradient: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
  },
  {
    icon: TrendingUp,
    title: "Economic Analysis",
    description: "Adjust economics in the Profit Advisor for optimization",
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
  },
];

const whyItMattersSteps = [
  { number: "1", title: "Ask", description: "Natural language question" },
  { number: "2", title: "AI Understands", description: "Language processing" },
  { number: "3", title: "Agent Works", description: "Specialized analysis" },
  { number: "4", title: "Knowledge Map", description: "Context integration" },
  { number: "5", title: "Artifact", description: "Concrete output" },
  { number: "6", title: "Explanation", description: "Clear insights" },
];

export const HowItWorksFeaturesSection: React.FC = () => {
  const navigate = useNavigate();
  const { isDark } = useThemeMode();
  const { 
    containerMaxWidth, 
    containerPadding, 
    h2FontSize,
    bodyFontSize,
    sectionPadding 
  } = useResponsiveLayout();

  const sectionRef = useRef<HTMLDivElement>(null);
  const directAccessRef = useRef<HTMLDivElement>(null);
  const whyItMattersRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement[]>([]);
  const stepsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Direct access section animation
      if (directAccessRef.current) {
        gsap.from(directAccessRef.current, {
          scrollTrigger: {
            trigger: directAccessRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power2.out',
        });
      }

      // Features animation
      featuresRef.current.forEach((feature, index) => {
        if (feature) {
          gsap.from(feature, {
            scrollTrigger: {
              trigger: feature,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 30,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power2.out',
          });
        }
      });

      // Why it matters section
      if (whyItMattersRef.current) {
        gsap.from(whyItMattersRef.current, {
          scrollTrigger: {
            trigger: whyItMattersRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power2.out',
        });
      }

      // Steps animation with connecting lines
      stepsRef.current.forEach((step, index) => {
        if (step) {
          gsap.from(step, {
            scrollTrigger: {
              trigger: whyItMattersRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            delay: index * 0.15,
            ease: 'back.out(1.7)',
          });
        }
      });

      // CTA animation
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
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
        background: 'transparent',
        transition: 'background 0.3s ease',
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
        {/* Direct Agent Access Section */}
        <Box ref={directAccessRef} sx={{ mb: { xs: 8, md: 12 } }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: h2FontSize,
              fontWeight: 700,
              color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(17, 24, 39, 1)',
              mb: 2,
              textAlign: 'center',
            }}
          >
            Direct Agent Access
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', md: '1.125rem' },
              color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(75, 85, 99, 1)',
              textAlign: 'center',
              maxWidth: 600,
              mx: 'auto',
              mb: 6,
            }}
          >
            Power users can open agents directly for advanced functionality and deeper analysis.
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
              gap: 3,
            }}
          >
            {directAccessFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={index}
                  ref={(el) => {
                    if (el) featuresRef.current[index] = el as HTMLDivElement;
                  }}
                  elevation={isDark ? 0 : 6}
                  sx={{
                    backgroundColor: isDark ? 'rgba(31, 41, 55, 0.6)' : 'rgba(255, 255, 255, 0.9)',
                    border: isDark ? '1px solid rgba(55, 65, 81, 0.8)' : 'none',
                    borderRadius: 3,
                    position: 'relative',
                    overflow: 'hidden',
                    backdropFilter: 'blur(20px)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: 'center', position: 'relative' }}>
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 2,
                        background: feature.gradient,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                      }}
                    >
                      <IconComponent sx={{ fontSize: 28, color: 'white' }} />
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: '1.125rem',
                        fontWeight: 600,
                        color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(17, 24, 39, 1)',
                        mb: 1,
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(75, 85, 99, 1)',
                        lineHeight: 1.5,
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        </Box>

        {/* Why It Matters Section */}
        <Box ref={whyItMattersRef} sx={{ mb: { xs: 8, md: 12 } }}>
          <Card
            elevation={isDark ? 0 : 8}
            sx={{
              backgroundColor: isDark ? 'rgba(31, 41, 55, 0.6)' : 'rgba(255, 255, 255, 0.9)',
              border: isDark ? '1px solid rgba(55, 65, 81, 0.8)' : 'none',
              borderRadius: 4,
              backdropFilter: 'blur(20px)',
              overflow: 'visible',
              position: 'relative',
            }}
          >
            <CardContent sx={{ p: { xs: 4, md: 6 }, position: 'relative' }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: h2FontSize,
                  fontWeight: 700,
                  color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(17, 24, 39, 1)',
                  mb: 4,
                  textAlign: 'center',
                }}
              >
                Why It Matters
              </Typography>

              {/* Process Flow - Modern Vertical Timeline */}
              <Box
                sx={{
                  position: 'relative',
                  maxWidth: 600,
                  mx: 'auto',
                  mb: 6,
                }}
              >
                {/* Central Connecting Line */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: '50%',
                    top: 60,
                    bottom: 60,
                    width: 3,
                    background: isDark
                      ? 'linear-gradient(180deg, #009BE4 0%, #A855F7 50%, #EC4899 100%)'
                      : 'linear-gradient(180deg, #2563EB 0%, #8B5CF6 50%, #EC4899 100%)',
                    transform: 'translateX(-50%)',
                    borderRadius: '2px',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: -2,
                      background: 'inherit',
                      filter: 'blur(4px)',
                      opacity: 0.4,
                      borderRadius: '4px',
                    }
                  }}
                />

                {whyItMattersSteps.map((step, index) => (
                  <Box
                    key={index}
                    ref={(el) => {
                      if (el) stepsRef.current[index] = el as HTMLDivElement;
                    }}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 6,
                      position: 'relative',
                      '&:last-child': { mb: 0 },
                      // Alternate left and right positioning
                      flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
                    }}
                  >
                    {/* Step Content Card */}
                    <Box
                      sx={{
                        flex: 1,
                        maxWidth: 240,
                        background: isDark
                          ? 'linear-gradient(135deg, rgba(31, 41, 55, 0.9) 0%, rgba(55, 65, 81, 0.7) 100%)'
                          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(249, 250, 251, 0.9) 100%)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: 4,
                        p: 3,
                        border: isDark ? '1px solid rgba(75, 85, 99, 0.3)' : '1px solid rgba(229, 231, 235, 0.5)',
                        boxShadow: isDark 
                          ? '0 10px 40px rgba(0, 0, 0, 0.3)' 
                          : '0 10px 40px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: isDark 
                            ? '0 20px 60px rgba(0, 155, 228, 0.2)' 
                            : '0 20px 60px rgba(37, 99, 235, 0.15)',
                        },
                        // Connector line to center
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: '50%',
                          [index % 2 === 0 ? 'right' : 'left']: -20,
                          width: 40,
                          height: 2,
                          background: isDark
                            ? 'linear-gradient(90deg, transparent 0%, #009BE4 50%, transparent 100%)'
                            : 'linear-gradient(90deg, transparent 0%, #2563EB 50%, transparent 100%)',
                          transform: 'translateY(-50%)',
                        }
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(17, 24, 39, 1)',
                          mb: 1,
                          textAlign: index % 2 === 0 ? 'left' : 'right',
                        }}
                      >
                        {step.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(75, 85, 99, 1)',
                          fontSize: '0.9rem',
                          lineHeight: 1.4,
                          textAlign: index % 2 === 0 ? 'left' : 'right',
                        }}
                      >
                        {step.description}
                      </Typography>
                    </Box>

                    {/* Central Number Circle */}
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        background: isDark
                          ? 'linear-gradient(135deg, #009BE4 0%, #A855F7 100%)'
                          : 'linear-gradient(135deg, #2563EB 0%, #8B5CF6 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 800,
                        fontSize: '1.5rem',
                        position: 'relative',
                        zIndex: 2,
                        mx: 2,
                        boxShadow: isDark
                          ? '0 8px 32px rgba(0, 155, 228, 0.4)'
                          : '0 8px 32px rgba(37, 99, 235, 0.4)',
                        border: `4px solid ${isDark ? 'rgba(17, 24, 39, 1)' : 'rgba(255, 255, 255, 1)'}`,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.1)',
                          boxShadow: isDark
                            ? '0 12px 48px rgba(0, 155, 228, 0.6)'
                            : '0 12px 48px rgba(37, 99, 235, 0.6)',
                        }
                      }}
                    >
                      {step.number}
                    </Box>

                    {/* Spacer for opposite side */}
                    <Box sx={{ flex: 1, maxWidth: 240 }} />
                  </Box>
                ))}
              </Box>

              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(75, 85, 99, 1)',
                  textAlign: 'center',
                  lineHeight: 1.7,
                  mb: 2,
                }}
              >
                ChatAPC isn't a black box. You see how answers are created, interact with artifacts, and dive deeper whenever needed.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(17, 24, 39, 1)',
                  textAlign: 'center',
                  fontWeight: 600,
                }}
              >
                Transparent, actionable, and built for industrial operations teams.
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* CTA Section */}
        <Box ref={ctaRef} sx={{ textAlign: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<ArrowForward />}
              onClick={() => navigate('/demo')}
              sx={{
                px: 5,
                py: 2,
                fontSize: '1.125rem',
                fontWeight: 600,
                background: isDark
                  ? 'linear-gradient(135deg, #009BE4 0%, #A855F7 100%)'
                  : 'linear-gradient(135deg, #2563EB 0%, #8B5CF6 100%)',
                borderRadius: 3,
              }}
            >
              Get Started
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              startIcon={<Visibility />}
              onClick={() => navigate('/about')}
              sx={{
                px: 5,
                py: 2,
                fontSize: '1.125rem',
                fontWeight: 600,
                borderColor: isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(59, 130, 246, 0.5)',
                color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(59, 130, 246, 1)',
                borderRadius: 3,
              }}
            >
              Learn More
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};