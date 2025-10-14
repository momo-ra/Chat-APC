import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Grid, Card, CardContent } from '@mui/material';
import { 
  LocationOn, 
  Phone, 
  Email, 
  Schedule,
  Business,
  Support,
  Groups,
  Engineering
} from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: LocationOn,
    title: 'Headquarters',
    details: [
      'Alpha Process Control',
      '1500 Industrial Blvd, Suite 200',
      'Houston, TX 77032',
      'United States',
    ],
    color: { light: '#2563EB', dark: '#009BE4' },
  },
  {
    icon: Phone,
    title: 'Phone & Fax',
    details: [
      'Main: +1 (555) 123-4567',
      'Sales: +1 (555) 123-4568',
      'Support: +1 (555) 123-4569',
      'Fax: +1 (555) 123-4570',
    ],
    color: { light: '#059669', dark: '#10B981' },
  },
  {
    icon: Email,
    title: 'Email Contacts',
    details: [
      'General: hello@alphapc.com',
      'Sales: sales@alphapc.com',
      'Support: support@alphapc.com',
      'Careers: careers@alphapc.com',
    ],
    color: { light: '#DC2626', dark: '#EF4444' },
  },
  {
    icon: Schedule,
    title: 'Business Hours',
    details: [
      'Monday - Friday: 8:00 AM - 6:00 PM',
      'Saturday: 9:00 AM - 2:00 PM',
      'Sunday: Closed',
      'Emergency Support: 24/7',
    ],
    color: { light: '#7C3AED', dark: '#8B5CF6' },
  },
];

const departments = [
  {
    icon: Business,
    title: 'Sales & Business Development',
    description: 'Enterprise solutions, pricing, and partnership inquiries',
    contact: 'sales@alphapc.com',
    phone: '+1 (555) 123-4568',
    color: { light: '#2563EB', dark: '#009BE4' },
  },
  {
    icon: Support,
    title: 'Technical Support',
    description: '24/7 technical assistance and troubleshooting',
    contact: 'support@alphapc.com',
    phone: '+1 (555) 123-4569',
    color: { light: '#059669', dark: '#10B981' },
  },
  {
    icon: Engineering,
    title: 'Professional Services',
    description: 'Implementation, consulting, and custom development',
    contact: 'services@alphapc.com',
    phone: '+1 (555) 123-4571',
    color: { light: '#EA580C', dark: '#FB923C' },
  },
  {
    icon: Groups,
    title: 'Training & Education',
    description: 'Workshops, certification programs, and learning resources',
    contact: 'training@alphapc.com',
    phone: '+1 (555) 123-4572',
    color: { light: '#7C3AED', dark: '#8B5CF6' },
  },
];

const ContactInfoSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const infoCardsRef = useRef<HTMLDivElement[]>([]);
  const deptCardsRef = useRef<HTMLDivElement[]>([]);
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

      // Info cards animation
      infoCardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            y: 40,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power2.out',
          });
        }
      });

      // Department cards animation
      deptCardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            y: 40,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.15,
            ease: 'power2.out',
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
      sx={{
        py: 'clamp(3rem, 8vw, 6rem)',
        background: isDark
          ? 'linear-gradient(180deg, rgba(31, 41, 55, 1) 0%, rgba(17, 24, 39, 1) 100%)'
          : 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(248, 250, 252, 1) 100%)',
        position: 'relative',
        transition: 'background 0.3s ease',
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
              color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(30, 41, 59, 1)',
              mb: 3,
              lineHeight: 1.2,
              transition: 'color 0.3s ease',
            }}
          >
            Get In Touch
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(71, 85, 105, 1)',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6,
              transition: 'color 0.3s ease',
            }}
          >
            Multiple ways to reach our team of industrial automation experts
          </Typography>
        </Box>

        {/* Contact Information Cards */}
        <Grid container spacing={{ xs: 3, md: 4 }} sx={{ mb: { xs: 6, md: 8 } }}>
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon;
            return (
              <Grid
                item
                xs={12}
                md={6}
                lg={3}
                key={index}
                ref={(el) => {
                  if (el) infoCardsRef.current[index] = el as HTMLDivElement;
                }}
              >
                <Card
                  elevation={isDark ? 0 : 8}
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
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      borderColor: info.color[isDark ? 'dark' : 'light'],
                      boxShadow: isDark
                        ? `0 20px 60px ${info.color.dark}30`
                        : `0 20px 60px ${info.color.light}20`,
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
                      background: `linear-gradient(90deg, ${info.color[isDark ? 'dark' : 'light']} 0%, transparent 100%)`,
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      p: { xs: 3, md: 4 },
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
                        background: `${info.color[isDark ? 'dark' : 'light']}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <IconComponent
                        sx={{
                          fontSize: 28,
                          color: info.color[isDark ? 'dark' : 'light'],
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
                      {info.title}
                    </Typography>

                    {/* Details */}
                    <Box sx={{ flex: 1 }}>
                      {info.details.map((detail, detailIndex) => (
                        <Typography
                          key={detailIndex}
                          sx={{
                            fontSize: '0.9rem',
                            color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(71, 85, 105, 1)',
                            lineHeight: 1.6,
                            mb: 0.5,
                            transition: 'color 0.3s ease',
                          }}
                        >
                          {detail}
                        </Typography>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* Department Contacts */}
        <Box
          sx={{
            mb: { xs: 4, md: 6 },
          }}
        >
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
            Specialized Departments
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
            Connect directly with the right team for your specific needs
          </Typography>

          <Grid container spacing={{ xs: 3, md: 4 }}>
            {departments.map((dept, index) => {
              const IconComponent = dept.icon;
              return (
                <Grid
                  item
                  xs={12}
                  md={6}
                  key={index}
                  ref={(el) => {
                    if (el) deptCardsRef.current[index] = el as HTMLDivElement;
                  }}
                >
                  <Card
                    elevation={isDark ? 0 : 6}
                    sx={{
                      height: '100%',
                      borderRadius: '12px',
                      background: isDark
                        ? 'rgba(31, 41, 55, 0.6)'
                        : 'rgba(255, 255, 255, 0.9)',
                      border: isDark
                        ? '1px solid rgba(75, 85, 99, 0.3)'
                        : '1px solid rgba(226, 232, 240, 0.5)',
                      backdropFilter: 'blur(20px)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-6px)',
                        borderColor: dept.color[isDark ? 'dark' : 'light'],
                        background: isDark
                          ? 'rgba(31, 41, 55, 0.8)'
                          : 'rgba(255, 255, 255, 1)',
                        boxShadow: isDark
                          ? `0 15px 40px ${dept.color.dark}25`
                          : `0 15px 40px ${dept.color.light}15`,
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        p: { xs: 3, md: 4 },
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        '@media (min-width: 960px) and (max-width: 1549px)': {
                          p: 3,
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 3,
                          mb: 3,
                        }}
                      >
                        {/* Icon */}
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '8px',
                            background: `${dept.color[isDark ? 'dark' : 'light']}20`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <IconComponent
                            sx={{
                              fontSize: 24,
                              color: dept.color[isDark ? 'dark' : 'light'],
                            }}
                          />
                        </Box>

                        {/* Title and Description */}
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            sx={{
                              fontSize: '1.1rem',
                              fontWeight: 600,
                              color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(30, 41, 59, 1)',
                              mb: 1,
                              transition: 'color 0.3s ease',
                            }}
                          >
                            {dept.title}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: '0.9rem',
                              color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(71, 85, 105, 1)',
                              lineHeight: 1.5,
                              transition: 'color 0.3s ease',
                            }}
                          >
                            {dept.description}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Contact Details */}
                      <Box
                        sx={{
                          pt: 3,
                          mt: 'auto',
                          borderTop: isDark 
                            ? '1px solid rgba(75, 85, 99, 0.3)'
                            : '1px solid rgba(226, 232, 240, 0.5)',
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: '0.85rem',
                            color: dept.color[isDark ? 'dark' : 'light'],
                            fontWeight: 600,
                            mb: 0.5,
                          }}
                        >
                          {dept.contact}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: '0.85rem',
                            color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(100, 116, 139, 1)',
                            transition: 'color 0.3s ease',
                          }}
                        >
                          {dept.phone}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        {/* Emergency Contact */}
        <Card
          elevation={isDark ? 0 : 12}
          sx={{
            borderRadius: '16px',
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
                ? 'linear-gradient(90deg, #DC2626 0%, #EF4444 100%)'
                : 'linear-gradient(90deg, #DC2626 0%, #B91C1C 100%)',
            },
          }}
        >
          <CardContent
            sx={{
              p: { xs: 4, md: 6 },
              textAlign: 'center',
              '@media (min-width: 960px) and (max-width: 1549px)': {
                p: 5,
              },
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: isDark
                  ? 'linear-gradient(135deg, rgba(220, 38, 38, 0.2) 0%, rgba(239, 68, 68, 0.2) 100%)'
                  : 'linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(239, 68, 68, 0.1) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
              }}
            >
              <Phone
                sx={{
                  fontSize: 32,
                  color: isDark ? '#EF4444' : '#DC2626',
                }}
              />
            </Box>

            <Typography
              sx={{
                fontSize: { xs: '1.3rem', md: '1.5rem' },
                fontWeight: 700,
                color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(30, 41, 59, 1)',
                mb: 2,
                transition: 'color 0.3s ease',
              }}
            >
              24/7 Emergency Support
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(71, 85, 105, 1)',
                mb: 3,
                maxWidth: '500px',
                mx: 'auto',
                transition: 'color 0.3s ease',
              }}
            >
              Critical system issues? Our emergency response team is available around the clock 
              to minimize downtime and protect your operations.
            </Typography>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: 3,
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Phone sx={{ fontSize: 20, color: isDark ? '#EF4444' : '#DC2626' }} />
                <Typography
                  sx={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: isDark ? '#EF4444' : '#DC2626',
                  }}
                >
                  +1 (555) 911-HELP
                </Typography>
              </Box>

              <Typography
                sx={{
                  fontSize: '0.9rem',
                  color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(100, 116, 139, 1)',
                  fontWeight: 500,
                }}
              >
                Average response time: &lt; 15 minutes
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default ContactInfoSection;