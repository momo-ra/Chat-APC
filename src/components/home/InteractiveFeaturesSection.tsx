import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { gsap } from 'gsap';
import { useThemeMode } from '../../contexts/ThemeContext';

interface Feature {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  color: string;
}

const InteractiveFeaturesSection: React.FC = () => {
  const features: Feature[] = [
    {
      id: 'realtime',
      title: 'Real-Time Analysis',
      subtitle: 'Lightning fast insights',
      description: 'Monitor and analyze your process data in real-time with AI-powered insights. Get instant alerts and recommendations as conditions change.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=1000&fit=crop',
      color: '#009BE4',
    },
    {
      id: 'optimization',
      title: 'Process Optimization',
      subtitle: 'Maximize efficiency',
      description: 'Automatically identify optimization opportunities and implement advanced control strategies to improve yield and reduce waste.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=1000&fit=crop',
      color: '#2563EB',
    },
    {
      id: 'predictive',
      title: 'Predictive Maintenance',
      subtitle: 'Stay ahead of issues',
      description: 'Predict equipment failures before they happen using advanced machine learning models trained on your historical data.',
      image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=1000&fit=crop',
      color: '#7C3AED',
    },
    {
      id: 'dashboard',
      title: 'Custom Dashboards',
      subtitle: 'Your data, your way',
      description: 'Create personalized dashboards with drag-and-drop widgets. Visualize KPIs, trends, and insights that matter most to you.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=1000&fit=crop',
      color: '#059669',
    },
    {
      id: 'ai-assistant',
      title: 'AI Assistant',
      subtitle: 'Smart recommendations',
      description: 'Chat with your AI assistant to get instant answers, troubleshoot issues, and receive intelligent recommendations.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=1000&fit=crop',
      color: '#DC2626',
    },
  ];

  const [activeFeature, setActiveFeature] = useState<Feature>(features[0]);
  const imageRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();

  useEffect(() => {
    if (imageRef.current) {
      // Animate image change with better effect
      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0,
          scale: 0.92,
          rotateY: -10,
          y: 30,
        },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          y: 0,
          duration: 0.8,
          ease: 'power4.out',
        }
      );
    }
  }, [activeFeature]);

  const handleFeatureClick = (feature: Feature) => {
    if (feature.id !== activeFeature.id) {
      setActiveFeature(feature);
    }
  };

  return (
    <Box
      ref={sectionRef}
      data-section-theme={isDark ? 'dark' : 'light'}
      data-section-primary={activeFeature.color}
      sx={{
        width: '100%',
        minHeight: '100vh',
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'visible',
      }}
    >
      {/* Animated Background Layers */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse at 20% 30%, ${activeFeature.color}10 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, ${activeFeature.color}08 0%, transparent 50%)
          `,
          transition: 'opacity 0.8s ease',
          opacity: 0.4,
          zIndex: 0,
        }}
      />
      
      {/* Content Container with max-width */}
      <Box sx={{ 
        width: '100%', 
        maxWidth: '1350px',
        margin: '0 auto',
        px: { xs: 3, md: 6, lg: 8 },
        position: 'relative',
        zIndex: 1,
      }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            gap: { xs: 6, md: 8, lg: 10, xl: 12 },
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Left Side - Feature Buttons */}
          <Box
            sx={{
              flex: { xs: 1, lg: 0.65 },
              width: '100%',
              maxWidth: { xs: '100%', lg: '420px', xl: '450px' },
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
                fontWeight: 700,
                color: isDark ? '#FFFFFF' : '#0F172A',
                mb: 1.5,
                lineHeight: 1.2,
                transition: 'color 0.3s ease',
              }}
            >
              Experience the Power
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '0.9375rem', md: '1rem' },
                color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                mb: { xs: 3, md: 4 },
                lineHeight: 1.6,
                transition: 'color 0.3s ease',
              }}
            >
              Discover how ChatAPC transforms industrial process control with cutting-edge AI technology
            </Typography>

            {/* Feature Buttons */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
              }}
            >
              {features.map((feature) => (
                <Button
                  key={feature.id}
                  onClick={() => handleFeatureClick(feature)}
                  sx={{
                    width: '100%',
                    textAlign: 'left',
                    justifyContent: 'flex-start',
                    padding: '16px 20px',
                    borderRadius: 3,
                    textTransform: 'none',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    background:
                      activeFeature.id === feature.id
                        ? (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)')
                        : (isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)'),
                    backdropFilter: 'blur(10px)',
                    border:
                      activeFeature.id === feature.id
                        ? `2px solid ${feature.color}`
                        : (isDark ? '2px solid rgba(255, 255, 255, 0.1)' : '2px solid rgba(0, 0, 0, 0.08)'),
                    boxShadow:
                      activeFeature.id === feature.id
                        ? `
                          0 4px 16px -2px ${feature.color}40,
                          0 8px 32px -3px ${feature.color}30,
                          0 16px 48px -5px ${feature.color}20,
                          0 24px 64px -8px ${feature.color}10
                        `
                        : 'none',
                    '&:hover': {
                      background: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
                      transform: 'translateX(8px)',
                      boxShadow: `
                        0 4px 16px -2px ${feature.color}35,
                        0 8px 32px -3px ${feature.color}25,
                        0 16px 48px -5px ${feature.color}15,
                        0 24px 64px -8px ${feature.color}08
                      `,
                      borderColor: feature.color,
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '4px',
                      background: feature.color,
                      opacity: activeFeature.id === feature.id ? 1 : 0,
                      transition: 'opacity 0.3s ease',
                    },
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: { xs: '1rem', md: '1.125rem' },
                        fontWeight: 600,
                        color: isDark ? '#FFFFFF' : '#0F172A',
                        mb: 0.5,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {feature.title}
                      {activeFeature.id === feature.id && (
                        <Box
                          component="span"
                          sx={{
                            width: 7,
                            height: 7,
                            borderRadius: '50%',
                            background: feature.color,
                            display: 'inline-block',
                          }}
                        />
                      )}
                    </Typography>
                    {feature.subtitle && (
                      <Typography
                        sx={{
                          fontSize: '0.8125rem',
                          color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.5)',
                          fontWeight: 500,
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {feature.subtitle}
                      </Typography>
                    )}
                  </Box>
                </Button>
              ))}
            </Box>
          </Box>

          {/* Right Side - Feature Display */}
          <Box
            sx={{
              flex: { xs: 1, lg: 1.5 },
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            {/* Animated Background Circle */}
            <Box
              sx={{
                position: 'absolute',
                width: { xs: '300px', md: '400px', lg: '500px' },
                height: { xs: '300px', md: '400px', lg: '500px' },
                borderRadius: '50%',
                background: `radial-gradient(circle, ${activeFeature.color}12 0%, transparent 70%)`,
                filter: 'blur(60px)',
                transition: 'all 0.8s ease',
                zIndex: 0,
              }}
            />

            {/* Image Container */}
            <Box
              ref={imageRef}
              sx={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                maxWidth: { xs: '420px', sm: '550px', md: '750px', lg: '850px', xl: '950px' },
                aspectRatio: '16/10',
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: `
                  0 20px 60px -10px ${activeFeature.color}40,
                  0 30px 80px -20px ${activeFeature.color}30,
                  0 40px 100px -30px ${activeFeature.color}20,
                  0 0 0 1px ${activeFeature.color}25
                `,
                border: `3px solid ${activeFeature.color}`,
                background: '#000',
                perspective: '1000px',
                transformStyle: 'preserve-3d',
                transition: 'box-shadow 0.8s ease',
              }}
            >
              <Box
                component="img"
                src={activeFeature.image}
                alt={activeFeature.title}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />

              {/* Overlay with Feature Info */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: { xs: 2.5, md: 3.5 },
                  background: `linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 50%, transparent 100%)`,
                  backdropFilter: 'blur(12px)',
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: '1.125rem', md: '1.375rem' },
                    fontWeight: 700,
                    color: '#FFF',
                    mb: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                  }}
                >
                  {activeFeature.title}
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: activeFeature.color,
                      boxShadow: `0 0 10px ${activeFeature.color}`,
                    }}
                  />
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: '0.875rem', md: '0.9375rem' },
                    color: 'rgba(255, 255, 255, 0.85)',
                    lineHeight: 1.6,
                  }}
                >
                  {activeFeature.description}
                </Typography>
              </Box>
            </Box>

            {/* Decorative Elements */}
            <Box
              sx={{
                position: 'absolute',
                top: '5%',
                right: { xs: '-10%', md: '-15%' },
                width: { xs: '120px', md: '150px', lg: '180px' },
                height: { xs: '120px', md: '150px', lg: '180px' },
                borderRadius: '50%',
                background: `${activeFeature.color}08`,
                filter: 'blur(40px)',
                transition: 'all 0.8s ease',
                zIndex: 0,
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: '10%',
                left: { xs: '-10%', md: '-15%' },
                width: { xs: '100px', md: '130px', lg: '160px' },
                height: { xs: '100px', md: '130px', lg: '160px' },
                borderRadius: '50%',
                background: `${activeFeature.color}08`,
                filter: 'blur(40px)',
                transition: 'all 0.8s ease',
                zIndex: 0,
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InteractiveFeaturesSection;

