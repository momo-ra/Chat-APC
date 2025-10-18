import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Grid, Card, CardContent } from '@mui/material';
import { TrendingUp, AccessTime, School } from '@mui/icons-material';
import { gsap } from 'gsap';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';
import { applySlideUp, applyCardGridAnimation, applyScaleUp } from '../shared/animationHelpers';
import { 
  themeConfig, 
  getColor, 
  getGradient, 
  getTextColor,
  getCardStyles,
  withOpacity 
} from '../shared/themeConfig';

const getBenefits = (isDark: boolean) => {
  const { colors, gradients } = themeConfig;
  const greenColor = getColor(colors.green, isDark);
  const blueColor = getColor(colors.blue, isDark);
  const purpleColor = getColor(colors.purple, isDark);
  
  return [
    {
      icon: TrendingUp,
      title: 'Hidden Margin',
      description: 'Finds constraints and inefficiencies automatically.',
      detail: 'Typical plants add $1M-$4M+ per year. Continuous optimization identifies profit opportunities others miss.',
      color: greenColor,
      gradient: getGradient(gradients.green, isDark),
    },
    {
      icon: AccessTime,
      title: 'Time Saved',
      description: 'Replaces hours of manual trend-hunting with instant answers.',
      detail: 'Get insights in seconds, not hours. Focus on decisions instead of data collection.',
      color: blueColor,
      gradient: getGradient(gradients.blue, isDark),
    },
    {
      icon: School,
      title: 'Knowledge Retention',
      description: 'Captures and shares expertise across all shifts.',
      detail: 'Plant knowledge stays accessible. New engineers and operators learn faster with AI-guided insights.',
      color: purpleColor,
      gradient: getGradient(gradients.purple, isDark),
    },
  ];
};

export const BenefitsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const roiRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();
  const {
    h2FontSize,
    bodyLargeFontSize,
    containerMaxWidth,
    containerPadding,
    sectionPadding
  } = useResponsiveLayout();

  // Get unified theme values
  const { colors, gradients, typography, borderRadius, transitions, shadows } = themeConfig;
  const benefits = getBenefits(isDark);
  const cardStyles = getCardStyles(isDark, 'default');

  // Unified animation system
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      applySlideUp(headerRef.current, { startTrigger: 'top 90%' });

      // Animate cards with stagger
      applyCardGridAnimation(cardsRef.current, sectionRef.current);

      // Animate ROI statement
      applyScaleUp(roiRef.current, {
        delay: 0.25,
        startTrigger: 'top 90%'
      });
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
            mb: 'clamp(2rem, 8vw, 3rem)', 
            position: 'relative', 
            zIndex: 2 
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: h2FontSize,
              fontWeight: typography.h2.weight,
              background: isDark
                ? 'linear-gradient(135deg, #FFFFFF 0%, #CBD5E1 100%)'
                : 'linear-gradient(135deg, #0F172A 0%, #475569 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 4,
              letterSpacing: '-0.02em',
              lineHeight: typography.h2.lineHeight,
            }}
          >
            Transform operations into
            <Box 
              component="span" 
              sx={{
                background: isDark
                  ? getGradient(gradients.blueToBlue, true)
                  : getGradient(gradients.blueToBlue, false),
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'block',
              }}
            >
              continuous improvement
            </Box>
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: bodyLargeFontSize,
              color: getTextColor('secondary', isDark),
              maxWidth: 700,
              mx: 'auto',
              lineHeight: typography.bodyLarge.lineHeight,
              fontWeight: typography.bodyLarge.weight,
            }}
          >
            ChatAPC monitors your process and detects issues early. Clear explanations turn daily operations into continuous improvement — delivering real results for process teams.
          </Typography>
        </Box>

        {/* Benefits Cards */}
        <Grid 
          container 
          spacing={4} 
          sx={{ 
            mb: 'clamp(2rem, 10vw, 4rem)', 
            position: 'relative', 
            zIndex: 2 
          }}
        >
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  ref={(el) => { cardsRef.current[index] = el; }}
                  elevation={0}
                  sx={{
                    height: '100%',
                    position: 'relative',
                    background: cardStyles.background,
                    backdropFilter: 'blur(20px)',
                    border: cardStyles.border,
                    borderRadius: borderRadius.xl,
                    overflow: 'visible',
                    transition: transitions.allNormal,
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: isDark
                        ? `0 4px 18px -4px ${withOpacity(benefit.color, 0.13)}`
                        : `0 8px 18px -4px ${withOpacity(benefit.color, 0.11)}`,
                      transform: 'translateY(-4px) scale(1.025)',
                      border: isDark
                        ? `1px solid ${withOpacity(benefit.color, 0.2)}`
                        : `1px solid ${withOpacity(benefit.color, 0.13)}`,
                    },
                  }}
                >
                  <CardContent 
                    sx={{ 
                      p: 5, 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column' 
                    }}
                  >
                    {/* Icon */}
                    <Box
                      className="benefit-icon"
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: borderRadius.lg,
                        background: withOpacity(benefit.color, 0.1),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 4,
                        transition: transitions.normal,
                        position: 'relative',
                        boxShadow: isDark
                          ? `0 2px 16px 0 ${withOpacity(benefit.color, 0.13)}`
                          : `0 2px 16px 0 ${withOpacity(benefit.color, 0.1)}`,
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          inset: 0,
                          borderRadius: borderRadius.lg,
                          background: benefit.gradient,
                          opacity: 0.13,
                          transition: transitions.normal,
                        },
                      }}
                    >
                      <IconComponent 
                        sx={{ 
                          fontSize: 40, 
                          color: benefit.color, 
                          zIndex: 1 
                        }} 
                      />
                    </Box>

                    {/* Content */}
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="h4"
                        sx={{
                          fontSize: typography.h4.size,
                          fontWeight: typography.h4.weight,
                          color: getTextColor('primary', isDark),
                          mb: 2,
                          lineHeight: typography.h4.lineHeight,
                        }}
                      >
                        {benefit.title}
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{
                          color: getTextColor('secondary', isDark),
                          mb: 3,
                          fontWeight: 500,
                          lineHeight: typography.body.lineHeight,
                        }}
                      >
                        {benefit.description}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: getTextColor('muted', isDark),
                          lineHeight: typography.bodySmall.lineHeight,
                          fontSize: typography.bodySmall.size,
                        }}
                      >
                        {benefit.detail}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* ROI Statement */}
        <Box
          ref={roiRef}
          sx={{
            textAlign: 'center',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              px: { xs: 2, sm: 4, md: 8 },
              py: { xs: 2, sm: 3, md: 4 },
              borderRadius: borderRadius.full,
              background: isDark
                ? `linear-gradient(135deg, ${withOpacity(getColor(colors.cyan, true), 0.09)} 0%, ${withOpacity(getColor(colors.purple, true), 0.1)} 100%)`
                : `linear-gradient(135deg, ${withOpacity(getColor(colors.blue, false), 0.08)} 0%, ${withOpacity(getColor(colors.purple, false), 0.1)} 100%)`,
              backdropFilter: 'blur(20px)',
              border: isDark
                ? `2px solid ${withOpacity('#FFFFFF', 0.08)}`
                : `2px solid ${withOpacity('#000000', 0.045)}`,
              boxShadow: isDark
                ? shadows.dark.xl
                : shadows.light.xl,
              width: { xs: '100%', md: 'auto' },
              maxWidth: { xs: '100%', sm: 420, md: 'none' },
              mx: { xs: 'auto', md: 0 },
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: '1.04rem', sm: '1.22rem', md: 'clamp(1.20rem, 2.5vw, 1.65rem)' },
                fontWeight: 700,
                background: isDark
                  ? getGradient(gradients.blueToBlue, true)
                  : getGradient(gradients.blueToBlue, false),
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textAlign: 'center',
                lineHeight: { xs: 1.36, sm: 1.24, md: 1.15 },
                wordBreak: 'break-word',
                width: '100%',
              }}
            >
              ROI in as little as a few weeks — typically under 6 months
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default BenefitsSection;