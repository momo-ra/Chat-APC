import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Card, CardContent, Chip } from '@mui/material';
import { gsap } from 'gsap';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';
import { applySlideUp, applyStaggerAnimation } from '../shared/animationHelpers';

const layers = [
  {
    title: 'Data & Knowledge Layer',
    subtitle: 'Foundation',
    description: 'Connects to DCS, historian, and lab systems. Organizes process knowledge, lab data and control system into a knowledge map, linking variables, units, control loops, and relationships.',
    color: '#3B82F6',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
    icon: '01',
    features: ['DCS Integration', 'Historian Data', 'Knowledge Mapping', 'Tag Contextualization'],
  },
  {
    title: 'AI & Engineering Engine',
    subtitle: 'Intelligence',
    description: 'ChatAPC combines AI reasoning with engineering logic and physical relationships. It understands mass and energy balances, correlations, and constraints — validating insights with process fundamentals.',
    color: '#10B981',
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    icon: '02',
    features: ['AI Reasoning', 'Engineering Logic', 'Physical Models', 'Validation Engine'],
  },
  {
    title: 'Chat Interface',
    subtitle: 'Experience',
    description: 'Clear explanations in plain language. "Why" and "what-if" questions uncover causes, effects, and opportunities. Every answer traces back to the underlying data and engineering model.',
    color: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    icon: '03',
    features: ['Natural Language', 'Why Analysis', 'What-If Scenarios', 'Transparency'],
  },
];

export const ArchitectureSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement[]>([]);
  const bottomStatementRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();
  const { 
    h2FontSize, 
    bodyLargeFontSize, 
    containerMaxWidth,
    containerPadding,
    isMobile 
  } = useResponsiveLayout();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      applySlideUp(headerRef.current);

      // Animate layers with stagger
      applyStaggerAnimation(layersRef.current, 'slideUp', {
        triggerElement: sectionRef.current,
      });

      // Animate bottom statement
      applySlideUp(bottomStatementRef.current);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      component="section"
      data-section-theme={isDark ? 'dark' : 'light'}
      sx={{
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        py: 'clamp(3rem, 8vw, 5rem)',
        position: 'relative',
        overflow: 'hidden',
        background: 'transparent',
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
        <Box ref={headerRef} sx={{ textAlign: 'center', mb: 'clamp(3rem, 8vw, 5rem)', position: 'relative', zIndex: 2 }}>
          <Chip
            label="Architecture"
            sx={{
              fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
              fontWeight: 600,
              px: 3,
              py: 1,
              mb: 3,
              background: isDark
                ? 'linear-gradient(135deg, rgba(0, 155, 228, 0.12) 0%, rgba(139, 92, 246, 0.12) 100%)'
                : 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(139, 92, 246, 0.12) 100%)',
              color: isDark ? '#009BE4' : '#3B82F6',
              border: 'none',
              backdropFilter: 'blur(10px)',
              borderRadius: '50px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          />

          <Typography
            variant="h2"
            sx={{
              fontSize: h2FontSize,
              fontWeight: 800,
              lineHeight: 1.2,
              mb: 3,
              letterSpacing: '-0.01em',
            }}
          >
            <Box
              component="span"
              sx={{
                background: isDark
                  ? 'linear-gradient(135deg, #FFFFFF 0%, #CBD5E1 100%)'
                  : 'linear-gradient(135deg, #0F172A 0%, #475569 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: { xs: 'block', md: 'inline' },
                mb: { xs: 1, md: 0 },
              }}
            >
              Not just AI —{' '}
            </Box>
            <Box
              component="span"
              sx={{
                background: isDark
                  ? 'linear-gradient(135deg, #009BE4 0%, #10B981 100%)'
                  : 'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              process intelligence
            </Box>
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              fontSize: bodyLargeFontSize,
              color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(71, 85, 105, 1)',
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            ChatAPC combines rigorous chemical engineering with conversational AI. Deep process understanding meets intuitive interaction.
          </Typography>
        </Box>

        {/* Architecture Layers */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 'clamp(1.5rem, 4vw, 2.5rem)', 
          mb: 'clamp(3rem, 8vw, 5rem)', 
          position: 'relative', 
          zIndex: 2 
        }}>
          {layers.map((layer, index) => (
            <Card
              key={index}
              ref={(el) => {
                if (el) layersRef.current[index] = el as HTMLDivElement;
              }}
              elevation={0}
              sx={{
                background: isDark
                  ? 'linear-gradient(145deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.8) 100%)'
                  : 'linear-gradient(145deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.95) 100%)',
                backdropFilter: 'blur(16px)',
                border: isDark
                  ? '1px solid rgba(255, 255, 255, 0.06)'
                  : '1px solid rgba(0, 0, 0, 0.04)',
                borderRadius: 'clamp(20px, 4vw, 28px)',
                overflow: 'hidden',
                position: 'relative',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: isMobile ? 'none' : 'translateY(-4px)',
                  border: isDark
                    ? `1px solid ${layer.color}30`
                    : `1px solid ${layer.color}25`,
                  boxShadow: isMobile 
                    ? 'none'
                    : isDark
                      ? `0 20px 40px -12px ${layer.color}10`
                      : `0 20px 40px -12px ${layer.color}12`,
                  '& .layer-icon': {
                    transform: isMobile ? 'none' : 'scale(1.05)',
                  },
                  '& .feature-dot': {
                    background: layer.color,
                  },
                },
              }}
            >
              <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: { xs: 3, sm: 4 }, 
                  alignItems: { xs: 'center', sm: 'flex-start' },
                  textAlign: { xs: 'center', sm: 'left' },
                }}>
                  {/* Icon Number */}
                  <Box
                    className="layer-icon"
                    sx={{
                      minWidth: { xs: 80, sm: 100, md: 120 },
                      width: { xs: 80, sm: 100, md: 120 },
                      height: { xs: 80, sm: 100, md: 120 },
                      borderRadius: 'clamp(16px, 3vw, 24px)',
                      background: isDark
                        ? `linear-gradient(135deg, ${layer.color}12 0%, ${layer.color}08 100%)`
                        : `linear-gradient(135deg, ${layer.color}08 0%, ${layer.color}04 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                      border: isDark
                        ? `1px solid ${layer.color}15`
                        : `1px solid ${layer.color}12`,
                      position: 'relative',
                      flexShrink: 0,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
                        fontWeight: 800,
                        color: layer.color,
                        zIndex: 1,
                      }}
                    >
                      {layer.icon}
                    </Typography>
                  </Box>
                  
                  {/* Content */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box sx={{ mb: { xs: 2, md: 3 } }}>
                      <Typography
                        sx={{
                          fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                          fontWeight: 600,
                          color: layer.color,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          mb: 1,
                        }}
                      >
                        {layer.subtitle}
                      </Typography>
                      
                      <Typography
                        variant="h3"
                        sx={{
                          fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
                          fontWeight: 700,
                          color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 1)',
                          mb: { xs: 1.5, md: 2 },
                          lineHeight: 1.3,
                        }}
                      >
                        {layer.title}
                      </Typography>
                      
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: 'clamp(0.95rem, 2.5vw, 1.125rem)',
                          color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(71, 85, 105, 1)',
                          lineHeight: 1.6,
                          fontWeight: 400,
                        }}
                      >
                        {layer.description}
                      </Typography>
                    </Box>

                    {/* Features */}
                    <Box
                      className="layer-features"
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                        gap: { xs: 1.5, sm: 2 },
                      }}
                    >
                      {layer.features.map((feature, featureIndex) => (
                        <Box
                          key={featureIndex}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                          }}
                        >
                          <Box
                            className="feature-dot"
                            sx={{
                              width: 6,
                              height: 6,
                              borderRadius: '50%',
                              background: isDark
                                ? 'rgba(255, 255, 255, 0.3)'
                                : 'rgba(71, 85, 105, 0.3)',
                              transition: 'background 0.3s ease',
                              flexShrink: 0,
                            }}
                          />
                          <Typography
                            sx={{
                              fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                              fontWeight: 500,
                              color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(100, 116, 139, 1)',
                              lineHeight: 1.4,
                            }}
                          >
                            {feature}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Bottom Statement */}
        <Box
          ref={bottomStatementRef}
          sx={{
            position: 'relative',
            zIndex: 2,
          }}
        >
          <Box
            sx={{
              p: { xs: 4, sm: 6, md: 8 },
              borderRadius: 'clamp(20px, 4vw, 28px)',
              background: isDark
                ? 'linear-gradient(135deg, rgba(0, 155, 228, 0.06) 0%, rgba(139, 92, 246, 0.06) 100%)'
                : 'linear-gradient(135deg, rgba(219, 234, 254, 0.4) 0%, rgba(237, 233, 254, 0.4) 100%)',
              backdropFilter: 'blur(16px)',
              border: isDark
                ? '1px solid rgba(255, 255, 255, 0.06)'
                : '1px solid rgba(0, 0, 0, 0.04)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Typography
              sx={{
                fontSize: 'clamp(1.125rem, 3vw, 1.375rem)',
                fontWeight: 600,
                color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(15, 23, 42, 1)',
                lineHeight: 1.6,
                maxWidth: 700,
                mx: 'auto',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <Box
                component="span"
                sx={{
                  background: isDark
                    ? 'linear-gradient(135deg, #009BE4 0%, #8B5CF6 100%)'
                    : 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 700,
                }}
              >
                Engineering rigor
              </Box>{' '}
              underpins conversational intelligence. Every recommendation is validated against
              fundamental process principles, ensuring stable, accurate, and predictable outcomes.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ArchitectureSection;