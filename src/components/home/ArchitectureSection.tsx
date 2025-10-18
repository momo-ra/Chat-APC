import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Card, CardContent, Chip } from '@mui/material';
import { gsap } from 'gsap';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';
import { applySlideUp, applyStaggerAnimation } from '../shared/animationHelpers';
import { 
  themeConfig, 
  getColor, 
  getGradient, 
  getTextColor,
  getCardStyles,
  withOpacity 
} from '../shared/themeConfig';

const getLayers = (isDark: boolean) => {
  const { colors, gradients } = themeConfig;
  
  return [
    {
      title: 'Data & Knowledge Layer',
      subtitle: 'Foundation',
      description: 'Connects to DCS, historian, and lab systems. Organizes process knowledge, lab data and control system into a knowledge map, linking variables, units, control loops, and relationships.',
      color: getColor(colors.blue, isDark),
      gradient: getGradient(gradients.blue, isDark),
      icon: '01',
      features: ['DCS Integration', 'Historian Data', 'Knowledge Mapping', 'Tag Contextualization'],
    },
    {
      title: 'AI & Engineering Engine',
      subtitle: 'Intelligence',
      description: 'ChatAPC combines AI reasoning with engineering logic and physical relationships. It understands mass and energy balances, correlations, and constraints — validating insights with process fundamentals.',
      color: getColor(colors.green, isDark),
      gradient: getGradient(gradients.green, isDark),
      icon: '02',
      features: ['AI Reasoning', 'Engineering Logic', 'Physical Models', 'Validation Engine'],
    },
    {
      title: 'Chat Interface',
      subtitle: 'Experience',
      description: 'Clear explanations in plain language. "Why" and "what-if" questions uncover causes, effects, and opportunities. Every answer traces back to the underlying data and engineering model.',
      color: getColor(colors.purple, isDark),
      gradient: getGradient(gradients.purple, isDark),
      icon: '03',
      features: ['Natural Language', 'Why Analysis', 'What-If Scenarios', 'Transparency'],
    },
  ];
};

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
    sectionPadding,
    isMobile 
  } = useResponsiveLayout();

  // Get unified theme values
  const { colors, gradients, typography, borderRadius, transitions, shadows } = themeConfig;
  const layers = getLayers(isDark);
  const cardStyles = getCardStyles(isDark, 'default');

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
        py: sectionPadding,
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
        <Box 
          ref={headerRef} 
          sx={{ 
            textAlign: 'center', 
            mb: 'clamp(3rem, 8vw, 5rem)', 
            position: 'relative', 
            zIndex: 2 
          }}
        >
          <Chip
            label="Architecture"
            sx={{
              fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
              fontWeight: 600,
              px: 3,
              py: 1,
              mb: 3,
              background: isDark
                ? `linear-gradient(135deg, ${withOpacity(getColor(colors.blue, true), 0.12)} 0%, ${withOpacity(getColor(colors.blue, true), 0.12)} 100%)`
                : `linear-gradient(135deg, ${withOpacity(getColor(colors.blue, false), 0.12)} 0%, ${withOpacity(getColor(colors.blue, false), 0.12)} 100%)`,
              color: getColor(isDark ? colors.blue : colors.blue, isDark),
              border: 'none',
              backdropFilter: 'blur(10px)',
              borderRadius: borderRadius.full,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          />

          <Typography
            variant="h2"
            sx={{
              fontSize: h2FontSize,
              fontWeight: typography.h2.weight,
              lineHeight: typography.h2.lineHeight,
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
                background: getGradient(gradients.blueToBlue, isDark),
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
              color: getTextColor('secondary', isDark),
              maxWidth: 600,
              mx: 'auto',
              lineHeight: typography.bodyLarge.lineHeight,
              fontWeight: typography.bodyLarge.weight,
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
                background: cardStyles.background,
                backdropFilter: 'blur(16px)',
                border: cardStyles.border,
                borderRadius: borderRadius.xl,
                overflow: 'hidden',
                position: 'relative',
                transition: transitions.allNormal,
                '&:hover': {
                  transform: isMobile ? 'none' : 'translateY(-4px)',
                  border: isDark
                    ? `1px solid ${withOpacity(layer.color, 0.19)}`
                    : `1px solid ${withOpacity(layer.color, 0.15)}`,
                  boxShadow: isMobile 
                    ? 'none'
                    : isDark
                      ? `0 20px 40px -12px ${withOpacity(layer.color, 0.06)}`
                      : `0 20px 40px -12px ${withOpacity(layer.color, 0.07)}`,
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
                  alignItems: { 
                    xs: 'flex-start', // <-- left align on mobile
                    sm: 'flex-start' 
                  },
                  textAlign: { 
                    xs: 'left',   // <-- left align on mobile
                    sm: 'left' 
                  },
                }}>
                  {/* Icon Number */}
                  <Box
                    className="layer-icon"
                    sx={{
                      minWidth: { xs: 80, sm: 100, md: 120 },
                      width: { xs: 80, sm: 100, md: 120 },
                      height: { xs: 80, sm: 100, md: 120 },
                      borderRadius: borderRadius.lg,
                      background: isDark
                        ? `linear-gradient(135deg, ${withOpacity(layer.color, 0.07)} 0%, ${withOpacity(layer.color, 0.03)} 100%)`
                        : `linear-gradient(135deg, ${withOpacity(layer.color, 0.05)} 0%, ${withOpacity(layer.color, 0.02)} 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: transitions.normal,
                      border: isDark
                        ? `1px solid ${withOpacity(layer.color, 0.08)}`
                        : `1px solid ${withOpacity(layer.color, 0.07)}`,
                      position: 'relative',
                      flexShrink: 0,
                      ml: { xs: 0, sm: 0 }, // remove default margin for mobile
                    }}
                  >
                    {/* To keep icon left-align on mobile but centered on desktop */}
                    <Typography
                      sx={{
                        fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
                        fontWeight: 800,
                        color: layer.color,
                        zIndex: 1,
                        mx: { xs: 0, sm: 'auto' }, // no horizontal margin on mobile, auto (center) on sm+
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
                          fontSize: typography.h3.size,
                          fontWeight: typography.h3.weight,
                          color: getTextColor('primary', isDark),
                          mb: { xs: 1.5, md: 2 },
                          lineHeight: typography.h3.lineHeight,
                        }}
                      >
                        {layer.title}
                      </Typography>
                      
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: 'clamp(0.95rem, 2.5vw, 1.125rem)',
                          color: getTextColor('secondary', isDark),
                          lineHeight: typography.body.lineHeight,
                          fontWeight: typography.body.weight,
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
                              borderRadius: borderRadius.full,
                              background: isDark
                                ? withOpacity('#FFFFFF', 0.3)
                                : withOpacity(colors.neutral.darkGray, 0.3),
                              transition: transitions.normal,
                              flexShrink: 0,
                            }}
                          />
                          <Typography
                            sx={{
                              fontSize: typography.bodySmall.size,
                              fontWeight: 500,
                              color: getTextColor('muted', isDark),
                              lineHeight: typography.bodySmall.lineHeight,
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
              borderRadius: borderRadius.xl,
              background: isDark
                ? `linear-gradient(135deg, ${withOpacity(getColor(colors.cyan, true), 0.06)} 0%, ${withOpacity(getColor(colors.purple, true), 0.06)} 100%)`
                : `linear-gradient(135deg, ${withOpacity(getColor(colors.blue, false), 0.04)} 0%, ${withOpacity(getColor(colors.purple, false), 0.04)} 100%)`,
              backdropFilter: 'blur(16px)',
              border: cardStyles.border,
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Typography
              sx={{
                fontSize: 'clamp(1.125rem, 3vw, 1.375rem)',
                fontWeight: 600,
                color: getTextColor('primary', isDark),
                lineHeight: typography.bodyLarge.lineHeight,
                maxWidth: 700,
                mx: 'auto',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <Box
                component="span"
                sx={{
                  background: getGradient(gradients.blueToBlue, isDark),
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