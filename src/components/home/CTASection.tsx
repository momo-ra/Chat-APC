import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Button, Card, CardContent } from '@mui/material';
import { ArrowForward, PlayArrow, ChatBubbleOutline } from '@mui/icons-material';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';
import { applyScaleUp, applyStaggerAnimation, applyFloatingAnimation } from '../shared/animationHelpers';

export const CTASection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement[]>([]);
  const navigate = useNavigate();
  const { isDark } = useThemeMode();
  const { 
    h1FontSize, 
    bodyLargeFontSize, 
    containerMaxWidth,
    containerPadding 
  } = useResponsiveLayout();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main CTA animation with scale
      applyScaleUp(ctaRef.current, { startTrigger: 'top 80%' });

      // CTA content stagger animation
      const ctaContent = ctaRef.current?.querySelector('.cta-content');
      if (ctaContent) {
        const children = Array.from(ctaContent.children) as HTMLElement[];
        applyStaggerAnimation(children, 'slideUp', {
          staggerDelay: 0.15,
          startTrigger: 'top 80%',
          triggerElement: ctaRef.current,
          customProps: { delay: 0.4 },
        });
      }

      // Floating elements continuous animation
      floatingElementsRef.current.forEach((element, index) => {
        if (element) {
          applyFloatingAnimation(element, {
            distance: 15,
            duration: 4 + index,
            delay: index * 0.5,
          });
        }
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
        py: 'clamp(3rem, 10vw, 5rem)',
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
        <Box ref={ctaRef} sx={{ position: 'relative', zIndex: 2 }}>
          {/* Floating Decorative Elements */}
          <Box
            ref={(el) => {
              if (el) floatingElementsRef.current[0] = el as HTMLDivElement;
            }}
            sx={{
              position: 'absolute',
              top: -40,
              left: -20,
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: isDark
                ? 'linear-gradient(135deg, #009BE4 0%, #3B82F6 100%)'
                : 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
              opacity: 0.1,
              filter: 'blur(2px)',
              display: { xs: 'none', md: 'block' },
            }}
          />

          <Box
            ref={(el) => {
              if (el) floatingElementsRef.current[1] = el as HTMLDivElement;
            }}
            sx={{
              position: 'absolute',
              top: -60,
              right: -40,
              width: 120,
              height: 120,
              borderRadius: '50%',
              background: isDark
                ? 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)'
                : 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
              opacity: 0.08,
              filter: 'blur(3px)',
              display: { xs: 'none', md: 'block' },
            }}
          />

          <Box
            ref={(el) => {
              if (el) floatingElementsRef.current[2] = el as HTMLDivElement;
            }}
            sx={{
              position: 'absolute',
              bottom: -30,
              left: 100,
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: isDark
                ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                : 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              opacity: 0.12,
              filter: 'blur(1px)',
              display: { xs: 'none', md: 'block' },
            }}
          />

          {/* Main CTA Card */}
          <Card
            elevation={0}
            sx={{
              position: 'relative',
              background: isDark
                ? 'linear-gradient(145deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 50%, rgba(15, 23, 42, 0.9) 100%)'
                : 'linear-gradient(145deg, rgba(15, 23, 42, 1) 0%, rgba(30, 41, 59, 1) 50%, rgba(15, 23, 42, 1) 100%)',
              borderRadius: '40px',
              border: isDark
                ? '2px solid rgba(255, 255, 255, 0.08)'
                : '2px solid rgba(0, 0, 0, 0.05)',
              backdropFilter: 'blur(20px)',
              overflow: 'visible',
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                borderRadius: '40px',
                background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.02) 50%, transparent 70%)',
                pointerEvents: 'none',
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                inset: -2,
                borderRadius: '40px',
                background: isDark
                  ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)'
                  : 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 50%, rgba(236, 72, 153, 0.05) 100%)',
                filter: 'blur(20px)',
                zIndex: -1,
                opacity: 0.5,
              },
            }}
          >
            <CardContent
              className="cta-content"
              sx={{ 
                p: { xs: 6, md: 10 }, 
                textAlign: 'center',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {/* Main Headline */}
              <Typography
                variant="h1"
                sx={{
                  fontSize: h1FontSize,
                  fontWeight: 900,
                  color: 'white',
                  mb: 4,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                }}
              >
                Ready to see{' '}
                <Box
                  component="span"
                  sx={{
                    background: 'linear-gradient(135deg, #009BE4 0%, #00D4AA 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  ChatAPC
                </Box>{' '}
                in action?
              </Typography>
              
              <Typography
                variant="body1"
                sx={{
                  fontSize: bodyLargeFontSize,
                  color: 'rgba(203, 213, 225, 1)',
                  mb: 8,
                  maxWidth: 700,
                  mx: 'auto',
                  lineHeight: 1.6,
                  fontWeight: 300,
                }}
              >
                Let's discuss how ChatAPC helps your plant run smoother, smarter, and safer. See real results on your data.
              </Typography>
              
              {/* CTA Buttons */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 3,
                  justifyContent: 'center',
                  alignItems: 'center',
                  mb: 6,
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/demo')}
                  startIcon={<PlayArrow />}
                  endIcon={
                    <ArrowForward 
                      sx={{ 
                        transition: 'transform 0.3s ease',
                        '.MuiButton-root:hover &': {
                          transform: 'translateX(4px)',
                        }
                      }} 
                    />
                  }
                  sx={{
                    px: 6,
                    py: 3,
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #009BE4 0%, #3B82F6 100%)',
                    borderRadius: '20px',
                    boxShadow: '0 20px 40px rgba(0, 155, 228, 0.4)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    textTransform: 'none',
                    minWidth: 220,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #0284C7 0%, #1D4ED8 100%)',
                      boxShadow: '0 25px 50px rgba(0, 155, 228, 0.6)',
                      transform: 'translateY(-4px) scale(1.02)',
                    },
                    '&:active': {
                      transform: 'translateY(-2px) scale(0.98)',
                    },
                  }}
                >
                  Go To Demo
                </Button>
                
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/company/contact')}
                  startIcon={<ChatBubbleOutline />}
                  sx={{
                    px: 'clamp(1.5rem, 4vw, 2rem)',
                    py: 'clamp(0.75rem, 2vw, 1rem)',
                    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                    fontWeight: 700,
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '20px',
                    borderWidth: 2,
                    backdropFilter: 'blur(10px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    textTransform: 'none',
                    minWidth: 220,
                    '&:hover': {
                      borderColor: 'rgba(255, 255, 255, 0.4)',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      transform: 'translateY(-4px) scale(1.02)',
                      boxShadow: '0 20px 40px rgba(255, 255, 255, 0.1)',
                    },
                    '&:active': {
                      transform: 'translateY(-2px) scale(0.98)',
                    },
                  }}
                >
                  Talk to Our Team
                </Button>
              </Box>

              {/* Bottom Tagline */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                  opacity: 0.8,
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 1,
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
                  }}
                />
                <Typography
                  sx={{
                    fontSize: '0.95rem',
                    color: 'rgba(203, 213, 225, 0.8)',
                    fontStyle: 'italic',
                    fontWeight: 400,
                  }}
                >
                  Made by process engineers for process engineers
                </Typography>
                <Box
                  sx={{
                    width: 40,
                    height: 1,
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default CTASection;