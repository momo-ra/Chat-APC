import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Button, Stack } from '@mui/material';
import { 
  BarChart, 
  Event, 
  Explore, 
  Science, 
  TrendingUp,
  ArrowForward,
  Visibility,
  PlayArrow,
  Settings
} from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

gsap.registerPlugin(ScrollTrigger);

// Color palette for consistency throughout the app
const PALETTE = {
  blue: { dark: '#60A5FA', light: '#3B82F6' },
  green: { dark: '#34D399', light: '#10B981' },
  yellow: { dark: '#FBBF24', light: '#F59E0B' },
  pink: { dark: '#F472B6', light: '#EC4899' },
};

const getColor = (isDark: boolean, colorObj: {dark: string, light: string}) =>
  isDark ? colorObj.dark : colorObj.light;

// Features using the palette for consistent experience
const getFeatures = (isDark: boolean) => [
  {
    icon: BarChart,
    title: "Custom Analytics",
    description: "Build custom graphs, dashboards, and reports with your plant data. Add variables, set time ranges, and create the exact analysis you need.",
    color: getColor(isDark, PALETTE.blue),
  },
  {
    icon: Event,
    title: "Smart Monitoring",
    description: "Define intelligent events, set dynamic thresholds, and get alerts that matter. Monitor what's critical to your operations.",
    color: getColor(isDark, PALETTE.green),
  },
  {
    icon: Science,
    title: "Scenario Testing",
    description: "Run comprehensive \"what if\" scenarios with the Advisor Agent. Test changes before implementation.",
    color: getColor(isDark, PALETTE.pink),
  },
  {
    icon: TrendingUp,
    title: "Economic Optimization",
    description: "Analyze economics in real-time with the Optimizer Agent. Optimize for maximum efficiency and profitability.",
    color: getColor(isDark, PALETTE.yellow),
  },
];

export const HowItWorksFeaturesSection: React.FC = () => {
  const navigate = useNavigate();
  const { isDark } = useThemeMode();
  const { 
    containerMaxWidth, 
    containerPadding, 
    h2FontSize,
    sectionPadding 
  } = useResponsiveLayout();

  const directAccessFeatures = getFeatures(isDark);

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const featureItemsRef = useRef<HTMLDivElement[]>([]);

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
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
        });
      }

      // Features animation
      featureItemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.from(item, {
            scrollTrigger: {
              trigger: featuresRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 40,
            duration: 0.7,
            delay: index * 0.15,
            ease: 'power2.out',
          });
        }
      });

      // Process section animation
      if (processRef.current) {
        gsap.from(processRef.current.children, {
          scrollTrigger: {
            trigger: processRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        });
      }

      // CTA animation
      if (ctaRef.current) {
        gsap.from(ctaRef.current.children, {
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 20,
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
        {/* Main Header */}
        <Box 
          ref={headerRef} 
          sx={{ 
            textAlign: 'center', 
            mb: { xs: 8, md: 12 },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: h2FontSize,
              fontWeight: 700,
              color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(17, 24, 39, 1)',
              mb: 3,
              lineHeight: 1.2,
            }}
          >
            Advanced Agent Access
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1.125rem', md: '1.375rem' },
              color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(75, 85, 99, 1)',
              lineHeight: 1.6,
              maxWidth: 700,
              mx: 'auto',
            }}
          >
            Skip the chat and go straight to specialized AI agents designed for process engineers
          </Typography>
        </Box>

        {/* Features Section - Now with 4 items for better balance */}
        <Box ref={featuresRef} sx={{ mb: { xs: 12, md: 16 } }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
              gap: { xs: 4, md: 6 },
              maxWidth: 1000,
              mx: 'auto',
            }}
          >
            {directAccessFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Box
                  key={index}
                  ref={(el) => {
                    if (el) featureItemsRef.current[index] = el as HTMLDivElement;
                  }}
                  sx={{
                    position: 'relative',
                    p: { xs: 4, md: 5 },
                    background: isDark 
                      ? 'linear-gradient(135deg, rgba(31, 41, 55, 0.85) 0%, rgba(55, 65, 81, 0.7) 100%)'
                      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.97) 0%, rgba(249, 250, 251, 0.92) 100%)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 3,
                    border: isDark 
                      ? `1px solid ${feature.color}80` 
                      : `1px solid ${feature.color}30`,
                    transition: 'box-shadow 0.3s ease, border 0.3s ease, background 0.3s ease',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    '&:hover': {
                      boxShadow: `0 8px 32px -4px ${feature.color}55`,
                      border: `1.5px solid ${feature.color}`,
                      background: isDark
                        ? `linear-gradient(135deg, ${feature.color}22 0%, rgba(55, 65, 81, 0.92) 100%)`
                        : `linear-gradient(135deg, #fff 0%, ${feature.color}0A 100%)`,
                    },
                  }}
                >
                  {/* Icon */}
                  <Box
                    className="feature-icon"
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      background: `${feature.color}25`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      transition: 'background 0.3s ease',
                    }}
                  >
                    <IconComponent 
                      sx={{ 
                        fontSize: 28, 
                        color: feature.color,
                        transition: 'color 0.3s ease',
                      }} 
                    />
                  </Box>

                  {/* Content */}
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(17, 24, 39, 1)',
                      mb: 2,
                      lineHeight: 1.3,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  
                  <Typography
                    variant="body1"
                    sx={{
                      color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(75, 85, 99, 1)',
                      lineHeight: 1.6,
                      fontSize: '1rem',
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Simple Process Explanation */}
        <Box ref={processRef} sx={{ mb: { xs: 12, md: 16 } }}>
          <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 700,
                color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(17, 24, 39, 1)',
                mb: 4,
              }}
            >
              How It Works
            </Typography>

            <Stack 
              direction={{ xs: 'column', md: 'row' }} 
              spacing={4} 
              sx={{ 
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 6 
              }}
            >
              <Box sx={{ textAlign: 'center', flex: 1 }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: isDark
                      ? `linear-gradient(135deg, ${PALETTE.blue.dark} 0%, ${PALETTE.blue.dark}99 100%)`
                      : `linear-gradient(135deg, ${PALETTE.blue.light} 0%, ${PALETTE.blue.light}BB 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    color: 'white',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                  }}
                >
                  1
                </Box>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: isDark ? 'white' : 'black' }}>
                  Ask or Access
                </Typography>
                <Typography variant="body2" sx={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(75,85,99,1)' }}>
                  Chat naturally or open agents directly
                </Typography>
              </Box>

              <ArrowForward sx={{ 
                fontSize: 32, 
                color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(156,163,175,1)',
                display: { xs: 'none', md: 'block' },
                transform: { xs: 'rotate(90deg)', md: 'none' }
              }} />

              <Box sx={{ textAlign: 'center', flex: 1 }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: isDark
                      ? `linear-gradient(135deg, ${PALETTE.pink.dark} 0%, ${PALETTE.pink.dark}99 100%)`
                      : `linear-gradient(135deg, ${PALETTE.pink.light} 0%, ${PALETTE.pink.light}BB 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    color: 'white',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                  }}
                >
                  2
                </Box>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: isDark ? 'white' : 'black' }}>
                  AI Processes
                </Typography>
                <Typography variant="body2" sx={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(75,85,99,1)' }}>
                  Specialized agents analyze your data
                </Typography>
              </Box>

              <ArrowForward sx={{ 
                fontSize: 32, 
                color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(156,163,175,1)',
                display: { xs: 'none', md: 'block' },
                transform: { xs: 'rotate(90deg)', md: 'none' }
              }} />

              <Box sx={{ textAlign: 'center', flex: 1 }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: isDark
                      ? `linear-gradient(135deg, ${PALETTE.green.dark} 0%, ${PALETTE.green.dark}99 100%)`
                      : `linear-gradient(135deg, ${PALETTE.green.light} 0%, ${PALETTE.green.light}BB 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    color: 'white',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                  }}
                >
                  3
                </Box>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: isDark ? 'white' : 'black' }}>
                  Get Results
                </Typography>
                <Typography variant="body2" sx={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(75,85,99,1)' }}>
                  Actionable insights and recommendations
                </Typography>
              </Box>
            </Stack>

            <Typography
              variant="body1"
              sx={{
                fontSize: '1.25rem',
                color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(75, 85, 99, 1)',
                lineHeight: 1.6,
                fontStyle: 'italic',
              }}
            >
              "No black boxes. Every insight is transparent, explainable, and actionable."
            </Typography>
          </Box>
        </Box>

        {/* Simple CTA */}
        <Box ref={ctaRef} sx={{ textAlign: 'center' }}>
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: '1.75rem', md: '2.25rem' },
              fontWeight: 700,
              color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(17, 24, 39, 1)',
              mb: 4,
            }}
          >
            Ready to Get Started?
          </Typography>

          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={3} 
            sx={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<PlayArrow />}
              onClick={() => navigate('/demo')}
              sx={{
                px: 6,
                py: 2.5,
                fontSize: '1.125rem',
                fontWeight: 600,
                background: isDark
                  ? `linear-gradient(135deg, ${PALETTE.blue.dark} 0%, ${PALETTE.blue.dark}CC 100%)`
                  : `linear-gradient(135deg, ${PALETTE.blue.light} 0%, ${PALETTE.blue.light}99 100%)`,
                borderRadius: 2,
                minWidth: 180,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: `0 8px 25px ${getColor(isDark, PALETTE.blue)}44`,
                },
              }}
            >
              Try Demo
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              startIcon={<Visibility />}
              onClick={() => navigate('/company/about')}
              sx={{
                px: 6,
                py: 2.5,
                fontSize: '1.125rem',
                fontWeight: 600,
                borderColor: isDark ? `${PALETTE.blue.dark}88` : `${PALETTE.blue.light}66`,
                color: isDark ? 'rgba(255, 255, 255, 0.9)' : `${PALETTE.blue.light}`,
                borderRadius: 2,
                minWidth: 180,
                '&:hover': {
                  borderColor: isDark ? `${PALETTE.blue.dark}` : `${PALETTE.blue.light}`,
                  background: isDark ? `${PALETTE.blue.dark}15` : `${PALETTE.blue.light}10`,
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Learn More
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};