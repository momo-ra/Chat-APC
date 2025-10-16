import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Card, CardContent, Grid } from '@mui/material';
import { 
  Phone, 
  Email, 
  MessageOutlined,
  Engineering,
  StarBorder
} from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

gsap.registerPlugin(ScrollTrigger);

const quickContactItems = [
  {
    icon: Phone,
    title: 'Call Us',
    description: '+1 (555) 123-4567',
    subtext: 'Mon-Fri 8AM-6PM EST',
    color: { light: '#059669', dark: '#10B981' },
    action: 'tel:+15551234567',
    gradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    darkGradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
  },
  {
    icon: Email,
    title: 'Email Us',
    description: 'hello@alphapc.com',
    subtext: 'We reply within 24 hours',
    color: { light: '#2563EB', dark: '#3B82F6' },
    action: 'mailto:hello@alphapc.com',
    gradient: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
    darkGradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
  },
  {
    icon: MessageOutlined,
    title: 'Live Chat',
    description: 'Start a conversation',
    subtext: 'Available during business hours',
    color: { light: '#8B5CF6', dark: '#A855F7' },
    action: '#',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    darkGradient: 'linear-gradient(135deg, #A855F7 0%, #8B5CF6 100%)',
  },
];

const ContactHeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const { isDark } = useThemeMode();
  const { 
    h1FontSize, 
    bodyLargeFontSize,
    heroMaxWidth,
    containerPadding 
  } = useResponsiveLayout();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      if (contentRef.current) {
        tl.from(contentRef.current.children, {
          y: 80,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
        }, 0);
      }

      cardsRef.current.forEach((card, index) => {
        if (card) {
          tl.from(card, {
            y: 60,
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'back.out(1.7)',
          }, 0.8);
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
        background: isDark
          ? 'radial-gradient(ellipse 80% 50% at 20% -20%, rgba(139, 92, 246, 0.15) 0%, transparent 60%), radial-gradient(ellipse 80% 50% at 80% 120%, rgba(0, 155, 228, 0.12) 0%, transparent 60%), linear-gradient(135deg, #0F1419 0%, #1A202C 50%, #0F1419 100%)'
          : 'radial-gradient(ellipse 80% 50% at 20% -20%, rgba(59, 130, 246, 0.08) 0%, transparent 60%), radial-gradient(ellipse 80% 50% at 80% 120%, rgba(16, 185, 129, 0.06) 0%, transparent 60%), linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 50%, #FFFFFF 100%)',
        overflow: 'hidden',
        transition: 'background 0.3s ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=1920&q=60')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: isDark ? 0.05 : 0.03,
          filter: isDark 
            ? 'brightness(0.4) contrast(1.2) saturate(1.3)'
            : 'brightness(1.6) contrast(0.8) saturate(1.1)',
          zIndex: 0,
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isDark 
            ? 'linear-gradient(135deg, rgba(15, 20, 25, 0.95) 0%, rgba(26, 32, 44, 0.92) 50%, rgba(15, 20, 25, 0.95) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.96) 50%, rgba(255, 255, 255, 0.98) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        },
      }}
    >
      <Container 
        maxWidth="lg"
        sx={{
          maxWidth: heroMaxWidth,
          px: containerPadding,
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Box
          ref={contentRef}
          sx={{
            textAlign: 'center',
            mb: { xs: 8, md: 12 },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: h1FontSize,
              fontWeight: 800,
              background: isDark
                ? 'linear-gradient(135deg, #FFFFFF 0%, #3B82F6 30%, #8B5CF6 70%, #EC4899 100%)'
                : 'linear-gradient(135deg, #1E293B 0%, #2563EB 30%, #8B5CF6 70%, #DC2626 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textFillColor: 'transparent',
              mb: 4,
              lineHeight: 1.1,
              position: 'relative',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-16px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '4px',
                background: isDark
                  ? 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)'
                  : 'linear-gradient(90deg, #2563EB 0%, #8B5CF6 100%)',
                borderRadius: '6px',
                opacity: 0.8,
              },
            }}
          >
            Let's Transform Your Operations Together
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontSize: bodyLargeFontSize,
              color: isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(71, 85, 105, 1)',
              maxWidth: '900px',
              mx: 'auto',
              mb: 3,
              lineHeight: 1.7,
              fontWeight: 400,
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            Ready to revolutionize your industrial processes with AI? Our world-class experts are standing by 
            to help you optimize operations, eliminate bottlenecks, and achieve unprecedented efficiency with{' '}
            <Box component="span" sx={{
              background: isDark 
                ? 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)'
                : 'linear-gradient(135deg, #2563EB 0%, #8B5CF6 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 600,
            }}>
              ChatAPC
            </Box>.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: { xs: 3, md: 6 },
              mt: 6,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                px: 3,
                py: 1.5,
                borderRadius: '12px',
                background: isDark
                  ? 'rgba(31, 41, 55, 0.7)'
                  : 'rgba(255, 255, 255, 0.9)',
                border: isDark
                  ? '1px solid rgba(75, 85, 99, 0.3)'
                  : '1px solid rgba(226, 232, 240, 0.6)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <Engineering sx={{ 
                fontSize: 24, 
                color: isDark ? '#3B82F6' : '#2563EB' 
              }} />
              <Box>
                <Typography sx={{ 
                  fontSize: '0.9rem', 
                  fontWeight: 600,
                  color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 41, 59, 1)',
                  mb: 0.5,
                }}>
                  Expert Support
                </Typography>
                <Typography sx={{ 
                  fontSize: '0.85rem',
                  color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(100, 116, 139, 1)',
                }}>
                  24-hour response guarantee
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                px: 3,
                py: 1.5,
                borderRadius: '12px',
                background: isDark
                  ? 'rgba(31, 41, 55, 0.7)'
                  : 'rgba(255, 255, 255, 0.9)',
                border: isDark
                  ? '1px solid rgba(75, 85, 99, 0.3)'
                  : '1px solid rgba(226, 232, 240, 0.6)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <StarBorder sx={{ 
                fontSize: 24, 
                color: isDark ? '#F59E0B' : '#D97706' 
              }} />
              <Box>
                <Typography sx={{ 
                  fontSize: '0.9rem', 
                  fontWeight: 600,
                  color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 41, 59, 1)',
                  mb: 0.5,
                }}>
                  Trusted by
                </Typography>
                <Typography sx={{ 
                  fontSize: '0.85rem',
                  color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(100, 116, 139, 1)',
                }}>
                  500+ industrial leaders
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Grid container spacing={{ xs: 4, md: 6 }}>
          {quickContactItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Grid
                item
                xs={12}
                md={4}
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el as HTMLDivElement;
                }}
              >
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    borderRadius: '24px',
                    background: isDark
                      ? 'rgba(31, 41, 55, 0.9)'
                      : 'rgba(255, 255, 255, 0.95)',
                    border: isDark
                      ? '1px solid rgba(75, 85, 99, 0.3)'
                      : '1px solid rgba(226, 232, 240, 0.6)',
                    backdropFilter: 'blur(30px)',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-16px) scale(1.02)',
                      borderColor: item.color[isDark ? 'dark' : 'light'],
                      boxShadow: isDark
                        ? `0 32px 100px ${item.color.dark}40, 0 0 0 1px ${item.color.dark}30`
                        : `0 32px 100px ${item.color.light}25, 0 0 0 1px ${item.color.light}20`,
                      '&::before': {
                        opacity: 1,
                        transform: 'scale(1)',
                      },
                      '& .icon-container': {
                        background: isDark ? item.darkGradient : item.gradient,
                        transform: 'scale(1.1) rotate(5deg)',
                      },
                      '& .icon': {
                        color: '#FFFFFF',
                        transform: 'scale(1.1)',
                      },
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '6px',
                      background: isDark ? item.darkGradient : item.gradient,
                      opacity: 0,
                      transform: 'scale(0.8)',
                      transformOrigin: 'center',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      borderRadius: '24px 24px 0 0',
                    },
                  }}
                  onClick={() => {
                    if (item.action.startsWith('tel:') || item.action.startsWith('mailto:')) {
                      window.location.href = item.action;
                    }
                  }}
                >
                  <CardContent
                    sx={{
                      p: { xs: 4, md: 5 },
                      textAlign: 'center',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      className="icon-container"
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '20px',
                        background: `${item.color[isDark ? 'dark' : 'light']}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 3,
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '20px',
                          background: `${item.color[isDark ? 'dark' : 'light']}10`,
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                        },
                      }}
                    >
                      <IconComponent
                        className="icon"
                        sx={{
                          fontSize: 40,
                          color: item.color[isDark ? 'dark' : 'light'],
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          zIndex: 1,
                        }}
                      />
                    </Box>

                    <Typography
                      sx={{
                        fontSize: '1.4rem',
                        fontWeight: 700,
                        color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(30, 41, 59, 1)',
                        mb: 2,
                        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: '1.15rem',
                        fontWeight: 600,
                        color: item.color[isDark ? 'dark' : 'light'],
                        mb: 2,
                        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      }}
                    >
                      {item.description}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: '0.95rem',
                        color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(100, 116, 139, 1)',
                        lineHeight: 1.5,
                        fontWeight: 500,
                      }}
                    >
                      {item.subtext}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* Enhanced Location Badge */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: { xs: 8, md: 12 },
            gap: 3,
            p: 4,
            borderRadius: '20px',
            background: isDark
              ? 'rgba(31, 41, 55, 0.8)'
              : 'rgba(255, 255, 255, 0.9)',
            border: isDark
              ? '1px solid rgba(75, 85, 99, 0.3)'
              : '1px solid rgba(226, 232, 240, 0.6)',
            backdropFilter: 'blur(30px)',
            maxWidth: '600px',
            mx: 'auto',
            boxShadow: isDark
              ? '0 20px 60px rgba(0, 0, 0, 0.3)'
              : '0 20px 60px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: '16px',
              background: isDark
                ? 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)'
                : 'linear-gradient(135deg, #2563EB 0%, #8B5CF6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: isDark
                ? '0 12px 32px rgba(59, 130, 246, 0.3)'
                : '0 12px 32px rgba(37, 99, 235, 0.2)',
            }}
          >
            <Engineering sx={{ fontSize: 32, color: '#FFFFFF' }} />
          </Box>
          <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography
              sx={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(30, 41, 59, 1)',
                mb: 0.5,
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            >
              Alpha Process Control Headquarters
            </Typography>
            <Typography
              sx={{
                fontSize: '1rem',
                color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(71, 85, 105, 1)',
                fontWeight: 500,
              }}
            >
              Houston, Texas • Industrial Heart of America
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactHeroSection;