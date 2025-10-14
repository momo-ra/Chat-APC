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
  CloudDownload
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
    badge: 'Most Popular',
  },
  {
    icon: VideoCall,
    title: 'Video Consultation',
    description: 'Face-to-face sessions with senior engineers and solution architects',
    features: ['1-on-1 sessions', 'System review', 'Custom solutions', 'Follow-up reports'],
    availability: 'Book appointment',
    action: 'Schedule Call',
    color: { light: '#2563EB', dark: '#009BE4' },
  },
  {
    icon: Forum,
    title: 'Community Forum',
    description: 'Connect with other engineers and share knowledge and best practices',
    features: ['Expert answers', 'Code examples', 'Case studies', 'Peer discussions'],
    availability: 'Always open',
    action: 'Join Community',
    color: { light: '#7C3AED', dark: '#8B5CF6' },
  },
];

const resources = [
  {
    icon: LibraryBooks,
    title: 'Documentation Hub',
    description: 'Comprehensive guides, API references, and implementation tutorials',
    items: '500+ articles',
    color: { light: '#EA580C', dark: '#FB923C' },
  },
  {
    icon: School,
    title: 'Learning Center',
    description: 'Interactive courses and certification programs for all skill levels',
    items: '25+ courses',
    color: { light: '#DC2626', dark: '#EF4444' },
  },
  {
    icon: CloudDownload,
    title: 'Downloads',
    description: 'Software tools, templates, and configuration files',
    items: '100+ resources',
    color: { light: '#0891B2', dark: '#06B6D4' },
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
          y: 50,
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
            y: 40,
            opacity: 0,
            scale: 0.95,
            duration: 0.6,
            delay: index * 0.2,
            ease: 'power2.out',
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
            y: 30,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.1,
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
          y: 40,
          opacity: 0,
          duration: 0.8,
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
        py: 'clamp(4rem, 10vw, 8rem)',
        position: 'relative',
        background: isDark
          ? 'linear-gradient(135deg, rgba(31, 41, 55, 1) 0%, rgba(17, 24, 39, 1) 50%, rgba(10, 14, 46, 1) 100%)'
          : 'linear-gradient(135deg, rgba(248, 250, 252, 1) 0%, rgba(255, 255, 255, 1) 50%, rgba(240, 245, 251, 1) 100%)',
        overflow: 'hidden',
        transition: 'background 0.3s ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '600px',
          height: '600px',
          background: isDark
            ? 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '15%',
          right: '10%',
          width: '500px',
          height: '500px',
          background: isDark
            ? 'radial-gradient(circle, rgba(0, 155, 228, 0.12) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(0, 155, 228, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        },
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
            mb: { xs: 6, md: 8 },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: h2FontSize,
              fontWeight: 700,
              background: isDark
                ? 'linear-gradient(135deg, #FFFFFF 0%, #009BE4 50%, #8B5CF6 100%)'
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
            Expert Support When You Need It
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(71, 85, 105, 1)',
              maxWidth: '700px',
              mx: 'auto',
              lineHeight: 1.6,
              transition: 'color 0.3s ease',
            }}
          >
            From implementation to optimization, our team of certified engineers is here to ensure your success with ChatAPC
          </Typography>
        </Box>

        {/* Support Options */}
        <Box sx={{ mb: { xs: 8, md: 10 } }}>
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
                    elevation={isDark ? 0 : 20}
                    sx={{
                      height: '100%',
                      borderRadius: '20px',
                      background: isDark
                        ? 'rgba(31, 41, 55, 0.9)'
                        : 'rgba(255, 255, 255, 0.95)',
                      border: isDark
                        ? '1px solid rgba(75, 85, 99, 0.3)'
                        : 'none',
                      backdropFilter: 'blur(30px)',
                      position: 'relative',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-12px)',
                        boxShadow: isDark
                          ? `0 30px 80px ${option.color.dark}30`
                          : `0 30px 80px ${option.color.light}20`,
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
                        background: `linear-gradient(90deg, ${option.color[isDark ? 'dark' : 'light']} 0%, transparent 100%)`,
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        p: { xs: 4, md: 5 },
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        '@media (min-width: 960px) and (max-width: 1549px)': {
                          p: 4,
                        },
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
                            fontWeight: 600,
                            fontSize: '0.75rem',
                          }}
                        />
                      )}

                      {/* Icon */}
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: '16px',
                          background: `${option.color[isDark ? 'dark' : 'light']}20`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 3,
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <IconComponent
                          sx={{
                            fontSize: 32,
                            color: option.color[isDark ? 'dark' : 'light'],
                          }}
                        />
                      </Box>

                      {/* Title */}
                      <Typography
                        sx={{
                          fontSize: '1.3rem',
                          fontWeight: 700,
                          color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(30, 41, 59, 1)',
                          mb: 2,
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {option.title}
                      </Typography>

                      {/* Description */}
                      <Typography
                        sx={{
                          fontSize: '1rem',
                          color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(71, 85, 105, 1)',
                          lineHeight: 1.6,
                          mb: 3,
                          transition: 'color 0.3s ease',
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
                              gap: 1,
                              mb: 1,
                            }}
                          >
                            <Box
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                background: option.color[isDark ? 'dark' : 'light'],
                                flexShrink: 0,
                              }}
                            />
                            <Typography
                              sx={{
                                fontSize: '0.9rem',
                                color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(100, 116, 139, 1)',
                                transition: 'color 0.3s ease',
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
                          gap: 1,
                          mb: 3,
                        }}
                      >
                        <AccessTime
                          sx={{
                            fontSize: 16,
                            color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(100, 116, 139, 1)',
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: '0.85rem',
                            color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(100, 116, 139, 1)',
                            fontWeight: 500,
                            transition: 'color 0.3s ease',
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
                          py: 1.5,
                          fontSize: '1rem',
                          fontWeight: 600,
                          borderRadius: '12px',
                          background: `linear-gradient(135deg, ${option.color[isDark ? 'dark' : 'light']} 0%, ${option.color[isDark ? 'dark' : 'light']}CC 100%)`,
                          boxShadow: `0 8px 24px ${option.color[isDark ? 'dark' : 'light']}40`,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: `0 12px 32px ${option.color[isDark ? 'dark' : 'light']}50`,
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
        <Box sx={{ mb: { xs: 6, md: 8 } }}>
          <Typography
            sx={{
              fontSize: { xs: '1.5rem', md: '1.75rem' },
              fontWeight: 700,
              color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(30, 41, 59, 1)',
              mb: 2,
              textAlign: 'center',
              transition: 'color 0.3s ease',
            }}
          >
            Self-Service Resources
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1rem', md: '1.1rem' },
              color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(71, 85, 105, 1)',
              textAlign: 'center',
              maxWidth: '600px',
              mx: 'auto',
              mb: 6,
              transition: 'color 0.3s ease',
            }}
          >
            Explore our comprehensive library of resources designed to help you succeed
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
                    elevation={isDark ? 0 : 8}
                    sx={{
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
                      height: '100%',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        borderColor: resource.color[isDark ? 'dark' : 'light'],
                        boxShadow: isDark
                          ? `0 20px 60px ${resource.color.dark}30`
                          : `0 20px 60px ${resource.color.light}20`,
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
                        '@media (min-width: 960px) and (max-width: 1549px)': {
                          p: 3,
                        },
                      }}
                    >
                      {/* Icon */}
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: '12px',
                          background: `${resource.color[isDark ? 'dark' : 'light']}20`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 3,
                        }}
                      >
                        <IconComponent
                          sx={{
                            fontSize: 28,
                            color: resource.color[isDark ? 'dark' : 'light'],
                          }}
                        />
                      </Box>

                      {/* Title */}
                      <Typography
                        sx={{
                          fontSize: '1.2rem',
                          fontWeight: 600,
                          color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(30, 41, 59, 1)',
                          mb: 2,
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {resource.title}
                      </Typography>

                      {/* Description */}
                      <Typography
                        sx={{
                          fontSize: '0.95rem',
                          color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(71, 85, 105, 1)',
                          lineHeight: 1.5,
                          mb: 3,
                          flex: 1,
                          transition: 'color 0.3s ease',
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
                          fontWeight: 600,
                          fontSize: '0.85rem',
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
          elevation={isDark ? 0 : 20}
          sx={{
            borderRadius: '20px',
            background: isDark
              ? 'linear-gradient(135deg, rgba(31, 41, 55, 0.9) 0%, rgba(17, 24, 39, 0.9) 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
            border: isDark
              ? '1px solid rgba(75, 85, 99, 0.3)'
              : 'none',
            backdropFilter: 'blur(30px)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: isDark
                ? 'linear-gradient(90deg, #009BE4 0%, #8B5CF6 100%)'
                : 'linear-gradient(90deg, #2563EB 0%, #8B5CF6 100%)',
            },
          }}
        >
          <CardContent
            sx={{
              p: { xs: 6, md: 8 },
              textAlign: 'center',
              '@media (min-width: 960px) and (max-width: 1549px)': {
                p: 6,
              },
            }}
          >
            <Group
              sx={{
                fontSize: 48,
                color: isDark ? '#009BE4' : '#2563EB',
                mb: 3,
              }}
            />

            <Typography
              sx={{
                fontSize: { xs: '1.5rem', md: '1.75rem' },
                fontWeight: 700,
                color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(30, 41, 59, 1)',
                mb: 2,
                transition: 'color 0.3s ease',
              }}
            >
              Still Have Questions?
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(71, 85, 105, 1)',
                mb: 4,
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.6,
                transition: 'color 0.3s ease',
              }}
            >
              Our team of industrial automation experts is standing by to help you optimize your processes, 
              solve complex challenges, and achieve operational excellence with ChatAPC.
            </Typography>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: 3,
                mb: 4,
              }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<HeadsetMic />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  borderRadius: '12px',
                  background: isDark
                    ? 'linear-gradient(135deg, #009BE4 0%, #0EA5E9 100%)'
                    : 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                  boxShadow: isDark
                    ? '0 8px 32px rgba(0, 155, 228, 0.3)'
                    : '0 8px 32px rgba(37, 99, 235, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: isDark
                      ? '0 12px 40px rgba(0, 155, 228, 0.4)'
                      : '0 12px 40px rgba(37, 99, 235, 0.4)',
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
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  borderRadius: '12px',
                  borderColor: isDark ? 'rgba(0, 155, 228, 0.5)' : 'rgba(37, 99, 235, 0.5)',
                  color: isDark ? '#009BE4' : '#2563EB',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: isDark ? '#009BE4' : '#2563EB',
                    backgroundColor: isDark ? 'rgba(0, 155, 228, 0.1)' : 'rgba(37, 99, 235, 0.05)',
                    transform: 'translateY(-2px)',
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
                gap: 2,
                p: 3,
                borderRadius: '12px',
                background: isDark
                  ? 'rgba(17, 24, 39, 0.6)'
                  : 'rgba(248, 250, 252, 0.8)',
                border: isDark
                  ? '1px solid rgba(75, 85, 99, 0.3)'
                  : '1px solid rgba(226, 232, 240, 0.5)',
                maxWidth: '400px',
                mx: 'auto',
              }}
            >
              <AccessTime
                sx={{
                  fontSize: 24,
                  color: isDark ? '#10B981' : '#059669',
                }}
              />
              <Box>
                <Typography
                  sx={{
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 41, 59, 1)',
                    mb: 0.5,
                  }}
                >
                  Guaranteed Response
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.8rem',
                    color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(100, 116, 139, 1)',
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