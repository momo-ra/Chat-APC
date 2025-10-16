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

// Reorganized to 4 features for better grid balance
const directAccessFeatures = [
  {
    icon: BarChart,
    title: "Custom Analytics",
    description: "Build custom graphs, dashboards, and reports with your plant data. Add variables, set time ranges, and create the exact analysis you need.",
    color: '#3B82F6',
  },
  {
    icon: Event,
    title: "Smart Monitoring",
    description: "Define intelligent events, set dynamic thresholds, and get alerts that matter. Monitor what's critical to your operations.",
    color: '#10B981',
  },
  {
    icon: Science,
    title: "Scenario Testing",
    description: "Run comprehensive \"what if\" scenarios with the Process Advisor. Test changes before implementation.",
    color: '#EC4899',
  },
  {
    icon: TrendingUp,
    title: "Economic Optimization",
    description: "Analyze economics in real-time with the Profit Advisor. Optimize for maximum efficiency and profitability.",
    color: '#F59E0B',
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
                      ? 'linear-gradient(135deg, rgba(31, 41, 55, 0.8) 0%, rgba(55, 65, 81, 0.6) 100%)'
                      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(249, 250, 251, 0.8) 100%)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 3,
                    border: isDark 
                      ? '1px solid rgba(55, 65, 81, 0.6)' 
                      : '1px solid rgba(226, 232, 240, 0.8)',
                    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: `linear-gradient(90deg, ${feature.color} 0%, ${feature.color}aa 100%)`,
                      transform: 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 0.4s ease',
                    },
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      background: isDark 
                        ? 'linear-gradient(135deg, rgba(31, 41, 55, 0.95) 0%, rgba(55, 65, 81, 0.8) 100%)'
                        : 'linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(249, 250, 251, 0.95) 100%)',
                      boxShadow: `0 20px 60px -8px ${feature.color}40`,
                      border: `1px solid ${feature.color}50`,
                      '&::before': {
                        transform: 'scaleX(1)',
                      },
                      '& .feature-icon': {
                        background: feature.color,
                        transform: 'scale(1.05)',
                      }
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
                      background: `${feature.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      transition: 'all 0.4s ease',
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
                      ? 'linear-gradient(135deg, #009BE4 0%, #2563EB 100%)'
                      : 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
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
                      ? 'linear-gradient(135deg, #A855F7 0%, #8B5CF6 100%)'
                      : 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
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
                      ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                      : 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
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
                  ? 'linear-gradient(135deg, #009BE4 0%, #2563EB 100%)'
                  : 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                borderRadius: 2,
                minWidth: 180,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(37, 99, 235, 0.4)',
                },
              }}
            >
              Try Demo
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              startIcon={<Visibility />}
              onClick={() => navigate('/about')}
              sx={{
                px: 6,
                py: 2.5,
                fontSize: '1.125rem',
                fontWeight: 600,
                borderColor: isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(75, 85, 99, 0.4)',
                color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(75, 85, 99, 1)',
                borderRadius: 2,
                minWidth: 180,
                '&:hover': {
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(75, 85, 99, 0.6)',
                  background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(75, 85, 99, 0.05)',
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