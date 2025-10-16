import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Card, CardContent, Grid, Button, Chip } from '@mui/material';
import { 
  HeadsetMic, 
  QuestionAnswer, 
  School,
  LibraryBooks,
  VideoCall,
  Forum,
  ArrowForward,
  AccessTime,
  Group,
  CloudDownload,
  Rocket,
  TrendingUp
} from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

gsap.registerPlugin(ScrollTrigger);

const supportOptions = [
  {
    icon: HeadsetMic,
    title: 'Live Technical Support',
    description: 'Get instant help from our certified process control engineers',
    features: ['24/7 availability', 'Screen sharing', 'Remote diagnostics', 'Priority queue'],
    availability: 'Available now',
    action: 'Start Chat',
    color: { light: '#059669', dark: '#10B981' },
    gradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    darkGradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    badge: 'Most Popular',
  },
  {
    icon: VideoCall,
    title: 'Video Consultation',
    description: 'Face-to-face sessions with senior engineers and solution architects',
    features: ['1-on-1 sessions', 'System review', 'Custom solutions', 'Follow-up reports'],
    availability: 'Book appointment',
    action: 'Schedule Call',
    color: { light: '#2563EB', dark: '#3B82F6' },
    gradient: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
    darkGradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
  },
  {
    icon: Forum,
    title: 'Community Forum',
    description: 'Connect with other engineers and share knowledge and best practices',
    features: ['Expert answers', 'Code examples', 'Case studies', 'Peer discussions'],
    availability: 'Always open',
    action: 'Join Community',
    color: { light: '#7C3AED', dark: '#8B5CF6' },
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
    darkGradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
  },
];

const resources = [
  {
    icon: LibraryBooks,
    title: 'Documentation Hub',
    description: 'Comprehensive guides, API references, and implementation tutorials',
    items: '500+ articles',
    color: { light: '#EA580C', dark: '#FB923C' },
    gradient: 'linear-gradient(135deg, #EA580C 0%, #DC2626 100%)',
    darkGradient: 'linear-gradient(135deg, #FB923C 0%, #EA580C 100%)',
  },
  {
    icon: School,
    title: 'Learning Center',
    description: 'Interactive courses and certification programs for all skill levels',
    items: '25+ courses',
    color: { light: '#DC2626', dark: '#EF4444' },
    gradient: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
    darkGradient: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
  },
  {
    icon: CloudDownload,
    title: 'Downloads',
    description: 'Software tools, templates, and configuration files',
    items: '100+ resources',
    color: { light: '#0891B2', dark: '#06B6D4' },
    gradient: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)',
    darkGradient: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
  },
];

const ContactSupportSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const supportRef = useRef<HTMLDivElement[]>([]);
  const resourcesRef = useRef<HTMLDivElement[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();
  const { 
    h2FontSize,
    containerMaxWidth,
    containerPadding 
  } = useResponsiveLayout();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      }

      // Support options animation
      supportRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            y: 60,
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'back.out(1.7)',
          });
        }
      });

      // Resources animation
      resourcesRef.current.forEach((resource, index) => {
        if (resource) {
          gsap.from(resource, {
            scrollTrigger: {
              trigger: resource,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            y: 40,
            opacity: 0,
            scale: 0.95,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power2.out',
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
          y: 50,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
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
        py: { xs: 10, md: 14 },
        position: 'relative',
        background: isDark
          ? 'radial-gradient(ellipse 80% 50% at 30% 0%, rgba(139, 92, 246, 0.15) 0%, transparent 70%), radial-gradient(ellipse 70% 40% at 70% 100%, rgba(59, 130, 246, 0.12) 0%, transparent 70%), linear-gradient(135deg, #0F1419 0%, #1A202C 50%, #0F1419 100%)'
          : 'radial-gradient(ellipse 80% 50% at 30% 0%, rgba(139, 92, 246, 0.08) 0%, transparent 70%), radial-gradient(ellipse 70% 40% at 70% 100%, rgba(59, 130, 246, 0.06) 0%, transparent 70%), linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 50%, #FFFFFF 100%)',
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
          opacity: isDark ? 0.03 : 0.02,
          filter: isDark 
            ? 'brightness(0.3) contrast(1.4) saturate(1.5)'
            : 'brightness(1.8) contrast(0.7) saturate(1.2)',
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
            ? 'linear-gradient(135deg, rgba(15, 20, 25, 0.96) 0%, rgba(26, 32, 44, 0.94) 50%, rgba(15, 20, 25, 0.96) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.97) 50%, rgba(255, 255, 255, 0.98) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        },
      }}
    >
      <Container 
        maxWidth="lg"
        sx={{
          maxWidth: containerMaxWidth,
          px: containerPadding,
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Section Header */}
        <Box
          ref={headerRef}
          sx={{
            textAlign: 'center',
            mb: { xs: 10, md: 12 },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: h2FontSize,
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
            Expert Support When You Need It
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.15rem', md: '1.3rem' },
              color: isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(71, 85, 105, 1)',
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.7,
              fontWeight: 400,
            }}
          >
            From implementation to optimization, our team of certified engineers is here to ensure your success with{' '}
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
            </Box>{' '}
            at every step of your journey.
          </Typography>
        </Box>

        {/* Support Options */}
        <Box sx={{ mb: { xs: 10, md: 12 } }}>
          <Grid container spacing={{ xs: 4, md: 6 }}>
            {supportOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <Grid
                  item
                  xs={12}
                  md={4}
                  key={index}
                  ref={(el) => {
                    if (el) supportRef.current[index] = el as HTMLDivElement;
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
                      position: 'relative',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: isDark
                        ? '0 25px 80px rgba(0, 0, 0, 0.3)'
                        : '0 25px 80px rgba(0, 0, 0, 0.1)',
                      '&:hover': {
                        transform: 'translateY(-16px) scale(1.02)',
                        borderColor: option.color[isDark ? 'dark' : 'light'],
                        boxShadow: isDark
                          ? `0 40px 120px ${option.color.dark}30, 0 0 0 1px ${option.color.dark}20`
                          : `0 40px 120px ${option.color.light}20, 0 0 0 1px ${option.color.light}15`,
                        '&::before': {
                          opacity: 1,
                          transform: 'scale(1)',
                        },
                        '& .icon-container': {
                          background: isDark ? option.darkGradient : option.gradient,
                          transform: 'scale(1.1) rotate(5deg)',
                        },
                        '& .icon': {
                          color: '#FFFFFF',
                          transform: 'scale(1.15)',
                        },
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '6px',
                        background: isDark ? option.darkGradient : option.gradient,
                        opacity: 0,
                        transform: 'scale(0.8)',
                        transformOrigin: 'center',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        borderRadius: '24px 24px 0 0',
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        p: { xs: 4, md: 5 },
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                      }}
                    >
                      {/* Badge */}
                      {option.badge && (
                        <Chip
                          label={option.badge}
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            background: 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)',
                            color: 'white',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
                          }}
                        />
                      )}

                      {/* Icon */}
                      <Box
                        className="icon-container"
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: '20px',
                          background: `${option.color[isDark ? 'dark' : 'light']}15`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 4,
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      >
                        <IconComponent
                          className="icon"
                          sx={{
                            fontSize: 40,
                            color: option.color[isDark ? 'dark' : 'light'],
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          }}
                        />
                      </Box>

                      {/* Title */}
                      <Typography
                        sx={{
                          fontSize: '1.4rem',
                          fontWeight: 800,
                          color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(30, 41, 59, 1)',
                          mb: 3,
                          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        }}
                      >
                        {option.title}
                      </Typography>

                      {/* Description */}
                      <Typography
                        sx={{
                          fontSize: '1rem',
                          color: isDark ? 'rgba(255, 255, 255, 0.75)' : 'rgba(71, 85, 105, 1)',
                          lineHeight: 1.6,
                          mb: 4,
                          fontWeight: 500,
                        }}
                      >
                        {option.description}
                      </Typography>

                      {/* Features */}
                      <Box sx={{ mb: 4, flex: 1 }}>
                        {option.features.map((feature, featureIndex) => (
                          <Box
                            key={featureIndex}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 2,
                              mb: 1.5,
                            }}
                          >
                            <Box
                              sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                background: option.color[isDark ? 'dark' : 'light'],
                                flexShrink: 0,
                              }}
                            />
                            <Typography
                              sx={{
                                fontSize: '0.9rem',
                                color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(100, 116, 139, 1)',
                                fontWeight: 600,
                              }}
                            >
                              {feature}
                            </Typography>
                          </Box>
                        ))}
                      </Box>

                      {/* Availability */}
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          mb: 4,
                          p: 2,
                          borderRadius: '12px',
                          background: isDark
                            ? 'rgba(17, 24, 39, 0.6)'
                            : 'rgba(248, 250, 252, 0.8)',
                          border: isDark
                            ? '1px solid rgba(75, 85, 99, 0.3)'
                            : '1px solid rgba(226, 232, 240, 0.5)',
                        }}
                      >
                        <AccessTime
                          sx={{
                            fontSize: 20,
                            color: option.color[isDark ? 'dark' : 'light'],
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: '0.9rem',
                            color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(100, 116, 139, 1)',
                            fontWeight: 700,
                          }}
                        >
                          {option.availability}
                        </Typography>
                      </Box>

                      {/* Action Button */}
                      <Button
                        variant="contained"
                        endIcon={<ArrowForward />}
                        fullWidth
                        sx={{
                          py: 2,
                          fontSize: '1rem',
                          fontWeight: 700,
                          borderRadius: '16px',
                          background: isDark ? option.darkGradient : option.gradient,
                          boxShadow: `0 12px 32px ${option.color[isDark ? 'dark' : 'light']}40`,
                          transition: 'all 0.3s ease',
                          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: `0 16px 40px ${option.color[isDark ? 'dark' : 'light']}50`,
                          },
                        }}
                      >
                        {option.action}
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        {/* Resources Section */}
        <Box sx={{ mb: { xs: 8, md: 10 } }}>
          <Typography
            sx={{
              fontSize: { xs: '1.6rem', md: '1.8rem' },
              fontWeight: 800,
              color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(30, 41, 59, 1)',
              mb: 2,
              textAlign: 'center',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            Self-Service Resources
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1rem', md: '1.15rem' },
              color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(71, 85, 105, 1)',
              textAlign: 'center',
              maxWidth: '700px',
              mx: 'auto',
              mb: 8,
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            Explore our comprehensive library of resources designed to help you succeed and excel 
            with industrial process optimization
          </Typography>

          <Grid container spacing={{ xs: 3, md: 4 }}>
            {resources.map((resource, index) => {
              const IconComponent = resource.icon;
              return (
                <Grid
                  item
                  xs={12}
                  md={4}
                  key={index}
                  ref={(el) => {
                    if (el) resourcesRef.current[index] = el as HTMLDivElement;
                  }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      borderRadius: '20px',
                      background: isDark
                        ? 'rgba(31, 41, 55, 0.9)'
                        : 'rgba(255, 255, 255, 0.95)',
                      border: isDark
                        ? '1px solid rgba(75, 85, 99, 0.3)'
                        : '1px solid rgba(226, 232, 240, 0.6)',
                      backdropFilter: 'blur(20px)',
                      cursor: 'pointer',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      height: '100%',
                      '&:hover': {
                        transform: 'translateY(-12px) scale(1.02)',
                        borderColor: resource.color[isDark ? 'dark' : 'light'],
                        boxShadow: isDark
                          ? `0 25px 80px ${resource.color.dark}30, 0 0 0 1px ${resource.color.dark}20`
                          : `0 25px 80px ${resource.color.light}20, 0 0 0 1px ${resource.color.light}15`,
                        '& .icon-container': {
                          background: isDark ? resource.darkGradient : resource.gradient,
                          transform: 'scale(1.05) rotate(3deg)',
                        },
                        '& .icon': {
                          color: '#FFFFFF',
                          transform: 'scale(1.1)',
                        },
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        p: { xs: 3, md: 4 },
                        textAlign: 'center',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      {/* Icon */}
                      <Box
                        className="icon-container"
                        sx={{
                          width: 72,
                          height: 72,
                          borderRadius: '18px',
                          background: `${resource.color[isDark ? 'dark' : 'light']}15`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 3,
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <IconComponent
                          className="icon"
                          sx={{
                            fontSize: 36,
                            color: resource.color[isDark ? 'dark' : 'light'],
                            transition: 'all 0.3s ease',
                          }}
                        />
                      </Box>

                      {/* Title */}
                      <Typography
                        sx={{
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(30, 41, 59, 1)',
                          mb: 2,
                          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        }}
                      >
                        {resource.title}
                      </Typography>

                      {/* Description */}
                      <Typography
                        sx={{
                          fontSize: '1rem',
                          color: isDark ? 'rgba(255, 255, 255, 0.75)' : 'rgba(71, 85, 105, 1)',
                          lineHeight: 1.6,
                          mb: 3,
                          flex: 1,
                          fontWeight: 500,
                        }}
                      >
                        {resource.description}
                      </Typography>

                      {/* Items Count */}
                      <Chip
                        label={resource.items}
                        sx={{
                          backgroundColor: `${resource.color[isDark ? 'dark' : 'light']}15`,
                          color: resource.color[isDark ? 'dark' : 'light'],
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          border: `1px solid ${resource.color[isDark ? 'dark' : 'light']}30`,
                          px: 1,
                        }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        {/* CTA Section */}
        <Card
          ref={ctaRef}
          elevation={0}
          sx={{
            borderRadius: '24px',
            background: isDark
              ? 'linear-gradient(135deg, rgba(31, 41, 55, 0.9) 0%, rgba(17, 24, 39, 0.9) 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
            border: isDark
              ? '1px solid rgba(75, 85, 99, 0.3)'
              : '1px solid rgba(226, 232, 240, 0.6)',
            backdropFilter: 'blur(30px)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: isDark
              ? '0 32px 120px rgba(0, 0, 0, 0.4)'
              : '0 32px 120px rgba(0, 0, 0, 0.1)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: isDark
                ? 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)'
                : 'linear-gradient(90deg, #2563EB 0%, #8B5CF6 100%)',
            },
          }}
        >
          <CardContent
            sx={{
              p: { xs: 6, md: 8 },
              textAlign: 'center',
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '20px',
                background: isDark
                  ? 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)'
                  : 'linear-gradient(135deg, #2563EB 0%, #8B5CF6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 4,
                boxShadow: isDark
                  ? '0 12px 32px rgba(59, 130, 246, 0.3)'
                  : '0 12px 32px rgba(37, 99, 235, 0.2)',
              }}
            >
              <Group sx={{ fontSize: 40, color: '#FFFFFF' }} />
            </Box>

            <Typography
              sx={{
                fontSize: { xs: '1.6rem', md: '1.8rem' },
                fontWeight: 800,
                color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(30, 41, 59, 1)',
                mb: 3,
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            >
              Still Have Questions?
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: '1rem', md: '1.15rem' },
                color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(71, 85, 105, 1)',
                mb: 6,
                maxWidth: '700px',
                mx: 'auto',
                lineHeight: 1.7,
                fontWeight: 400,
              }}
            >
              Our team of industrial automation experts is standing by to help you optimize your processes, 
              solve complex challenges, and achieve operational excellence with{' '}
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
                flexWrap: 'wrap',
                gap: 4,
                mb: 6,
              }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<HeadsetMic />}
                sx={{
                  px: 6,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  borderRadius: '16px',
                  background: isDark
                    ? 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)'
                    : 'linear-gradient(135deg, #2563EB 0%, #8B5CF6 100%)',
                  boxShadow: isDark
                    ? '0 12px 40px rgba(59, 130, 246, 0.4)'
                    : '0 12px 40px rgba(37, 99, 235, 0.3)',
                  transition: 'all 0.3s ease',
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: isDark
                      ? '0 16px 50px rgba(59, 130, 246, 0.5)'
                      : '0 16px 50px rgba(37, 99, 235, 0.4)',
                  },
                }}
              >
                Start Live Chat
              </Button>

              <Button
                variant="outlined"
                size="large"
                startIcon={<VideoCall />}
                sx={{
                  px: 6,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  borderRadius: '16px',
                  borderColor: isDark ? 'rgba(59, 130, 246, 0.5)' : 'rgba(37, 99, 235, 0.5)',
                  color: isDark ? '#3B82F6' : '#2563EB',
                  borderWidth: '2px',
                  transition: 'all 0.3s ease',
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  '&:hover': {
                    borderColor: isDark ? '#3B82F6' : '#2563EB',
                    backgroundColor: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(37, 99, 235, 0.05)',
                    transform: 'translateY(-3px)',
                    borderWidth: '2px',
                  },
                }}
              >
                Book Video Call
              </Button>
            </Box>

            {/* Response Time Guarantee */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 3,
                p: 4,
                borderRadius: '16px',
                background: isDark
                  ? 'rgba(17, 24, 39, 0.6)'
                  : 'rgba(248, 250, 252, 0.8)',
                border: isDark
                  ? '1px solid rgba(75, 85, 99, 0.3)'
                  : '1px solid rgba(226, 232, 240, 0.5)',
                maxWidth: '500px',
                mx: 'auto',
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '12px',
                  background: isDark
                    ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                    : 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: isDark
                    ? '0 8px 25px rgba(16, 185, 129, 0.3)'
                    : '0 8px 25px rgba(5, 150, 105, 0.2)',
                }}
              >
                <AccessTime sx={{ fontSize: 28, color: '#FFFFFF' }} />
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 41, 59, 1)',
                    mb: 0.5,
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  }}
                >
                  Guaranteed Response
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.9rem',
                    color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(100, 116, 139, 1)',
                    fontWeight: 600,
                  }}
                >
                  &lt; 24 hours for all inquiries
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default ContactSupportSection;