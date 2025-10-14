import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Card, CardContent, Grid } from '@mui/material';
import { 
  Phone, 
  Email, 
  LocationOn, 
  Schedule,
  MessageOutlined,
  Engineering
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
  },
  {
    icon: Email,
    title: 'Email Us',
    description: 'hello@alphapc.com',
    subtext: 'We reply within 24 hours',
    color: { light: '#2563EB', dark: '#009BE4' },
    action: 'mailto:hello@alphapc.com',
  },
  {
    icon: MessageOutlined,
    title: 'Live Chat',
    description: 'Start a conversation',
    subtext: 'Available during business hours',
    color: { light: '#8B5CF6', dark: '#A855F7' },
    action: '#',
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

      // Animate content elements
      if (contentRef.current) {
        tl.from(contentRef.current.children, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
        }, 0);
      }

      // Animate contact cards
      cardsRef.current.forEach((card, index) => {
        if (card) {
          tl.from(card, {
            y: 40,
            opacity: 0,
            scale: 0.95,
            duration: 0.6,
            delay: index * 0.15,
            ease: 'power2.out',
          }, 0.6);
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
        py: 'clamp(4rem, 10vw, 8rem)',
        position: 'relative',
        background: isDark
          ? 'linear-gradient(135deg, rgba(10, 14, 46, 1) 0%, rgba(17, 24, 39, 1) 100%)'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(248, 250, 252, 1) 100%)',
        overflow: 'hidden',
        transition: 'background 0.3s ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '15%',
          right: '10%',
          width: '500px',
          height: '500px',
          background: isDark
            ? 'radial-gradient(circle, rgba(0, 155, 228, 0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '20%',
          left: '5%',
          width: '400px',
          height: '400px',
          background: isDark
            ? 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container 
        maxWidth="lg"
        sx={{
          maxWidth: heroMaxWidth,
          px: containerPadding,
        }}
      >
        {/* Hero Content */}
        <Box
          ref={contentRef}
          sx={{
            textAlign: 'center',
            mb: { xs: 6, md: 8 },
          }}
        >
          {/* Main Heading */}
          <Typography
            variant="h1"
            sx={{
              fontSize: h1FontSize,
              fontWeight: 700,
              background: isDark
                ? 'linear-gradient(135deg, #FFFFFF 0%, #009BE4 50%, #A855F7 100%)'
                : 'linear-gradient(135deg, #1E293B 0%, #2563EB 50%, #8B5CF6 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textFillColor: 'transparent',
              mb: 3,
              lineHeight: 1.2,
              transition: 'all 0.3s ease',
            }}
          >
            Let's Build Something Amazing Together
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="h2"
            sx={{
              fontSize: bodyLargeFontSize,
              color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(71, 85, 105, 1)',
              maxWidth: '800px',
              mx: 'auto',
              mb: 2,
              lineHeight: 1.6,
              fontWeight: 400,
              transition: 'color 0.3s ease',
            }}
          >
            Ready to transform your industrial operations with AI? Our experts are here to help you optimize processes, 
            identify constraints, and unlock unprecedented efficiency.
          </Typography>

          {/* Business Hours & Response Time */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: { xs: 2, md: 4 },
              mt: 4,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(100, 116, 139, 1)',
              }}
            >
              <Schedule sx={{ fontSize: 20 }} />
              <Typography sx={{ fontSize: '0.9rem', fontWeight: 500 }}>
                Business Hours: Mon-Fri 8AM-6PM EST
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(100, 116, 139, 1)',
              }}
            >
              <Engineering sx={{ fontSize: 20 }} />
              <Typography sx={{ fontSize: '0.9rem', fontWeight: 500 }}>
                24-hour response guarantee
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Quick Contact Cards */}
        <Grid container spacing={{ xs: 3, md: 4 }}>
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
                  elevation={isDark ? 0 : 12}
                  sx={{
                    height: '100%',
                    borderRadius: '16px',
                    background: isDark
                      ? 'rgba(31, 41, 55, 0.8)'
                      : 'rgba(255, 255, 255, 0.95)',
                    border: isDark
                      ? '1px solid rgba(75, 85, 99, 0.3)'
                      : 'none',
                    backdropFilter: 'blur(20px)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-12px)',
                      borderColor: item.color[isDark ? 'dark' : 'light'],
                      boxShadow: isDark
                        ? `0 25px 80px ${item.color.dark}30`
                        : `0 25px 80px ${item.color.light}20`,
                      '&::before': {
                        opacity: 1,
                      },
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: `linear-gradient(90deg, ${item.color[isDark ? 'dark' : 'light']} 0%, transparent 100%)`,
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
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
                      p: { xs: 3, md: 4 },
                      textAlign: 'center',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      '@media (min-width: 960px) and (max-width: 1549px)': {
                        p: 3,
                      },
                    }}
                  >
                    {/* Icon */}
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        background: `${item.color[isDark ? 'dark' : 'light']}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 3,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <IconComponent
                        sx={{
                          fontSize: 32,
                          color: item.color[isDark ? 'dark' : 'light'],
                        }}
                      />
                    </Box>

                    {/* Title */}
                    <Typography
                      sx={{
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(30, 41, 59, 1)',
                        mb: 1,
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {item.title}
                    </Typography>

                    {/* Description */}
                    <Typography
                      sx={{
                        fontSize: '1.1rem',
                        fontWeight: 500,
                        color: item.color[isDark ? 'dark' : 'light'],
                        mb: 2,
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {item.description}
                    </Typography>

                    {/* Subtext */}
                    <Typography
                      sx={{
                        fontSize: '0.9rem',
                        color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(100, 116, 139, 1)',
                        lineHeight: 1.5,
                        transition: 'color 0.3s ease',
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

        {/* Location Badge */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: { xs: 6, md: 8 },
            gap: 2,
            p: 3,
            borderRadius: '16px',
            background: isDark
              ? 'rgba(31, 41, 55, 0.6)'
              : 'rgba(255, 255, 255, 0.7)',
            border: isDark
              ? '1px solid rgba(75, 85, 99, 0.3)'
              : '1px solid rgba(226, 232, 240, 0.5)',
            backdropFilter: 'blur(20px)',
            maxWidth: '500px',
            mx: 'auto',
          }}
        >
          <LocationOn
            sx={{
              fontSize: 28,
              color: isDark ? '#009BE4' : '#2563EB',
            }}
          />
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              sx={{
                fontSize: '1.1rem',
                fontWeight: 600,
                color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(30, 41, 59, 1)',
                mb: 0.5,
                transition: 'color 0.3s ease',
              }}
            >
              Alpha Process Control Headquarters
            </Typography>
            <Typography
              sx={{
                fontSize: '0.95rem',
                color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(71, 85, 105, 1)',
                transition: 'color 0.3s ease',
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