import React, { useEffect, useRef, useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  TextField, 
  Button,
  Grid,
  InputAdornment,
  Card,
  CardContent
} from '@mui/material';
import { 
  Email, 
  Phone, 
  LocationOn, 
  Person,
  Business,
  Message,
  Send
} from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const StylishContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation - simpler
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power2.out',
        });
      }

      // Form animation - gentler
      if (formRef.current) {
        gsap.from(formRef.current, {
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power2.out',
        });
      }

      // Info animation - gentler
      if (infoRef.current) {
        gsap.from(infoRef.current, {
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power2.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: Email,
      title: 'Email',
      content: 'contact@chatapc.com',
      link: 'mailto:contact@chatapc.com',
      accent: '#FF6B6B',
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+39 050 123 4567',
      link: 'tel:+390501234567',
      accent: '#4ECDC4',
    },
    {
      icon: LocationOn,
      title: 'Office',
      content: 'Via Impastato 1, 56122 Pisa, Italy',
      link: null,
      accent: '#45B7D1',
    }
  ];

  const textFieldSx = {
    '& .MuiOutlinedInput-root': {
      background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(248, 250, 252, 0.8)',
      borderRadius: '12px',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease',
      '& fieldset': {
        border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(226, 232, 240, 0.8)',
        borderRadius: '12px',
      },
      '&:hover fieldset': {
        border: isDark ? '1px solid rgba(0, 155, 228, 0.4)' : '1px solid rgba(37, 99, 235, 0.5)',
      },
      '&.Mui-focused fieldset': {
        border: isDark ? '2px solid rgba(0, 155, 228, 0.6)' : '2px solid rgba(37, 99, 235, 0.7)',
        boxShadow: isDark 
          ? '0 0 0 3px rgba(0, 155, 228, 0.1)' 
          : '0 0 0 3px rgba(37, 99, 235, 0.1)',
      },
    },
    '& .MuiInputLabel-root': {
      color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(71, 85, 105, 0.8)',
      '&.Mui-focused': {
        color: isDark ? '#009BE4' : '#2563EB',
      },
    },
    '& .MuiInputBase-input': {
      color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(15, 23, 42, 0.9)',
    },
  };

  return (
    <Box
      ref={sectionRef}
      data-section-theme={isDark ? 'dark' : 'light'}
      data-section-primary={isDark ? '#009BE4' : '#2563EB'}
      sx={{
        width: '100%',
        py: { xs: 12, md: 18 },
        position: 'relative',
        overflow: 'hidden',
        background: isDark 
          ? 'radial-gradient(ellipse 120% 100% at 50% 0%, rgba(0, 155, 228, 0.03) 0%, #111827 40%, #111827 100%)'
          : 'radial-gradient(ellipse 120% 100% at 50% 0%, rgba(59, 130, 246, 0.015) 0%, #FFFFFF 40%, #FFFFFF 100%)',
        transition: 'background 0.3s ease',
        '@media (min-width: 960px) and (max-width: 1549px)': {
          py: 15,
        },
        '@media (min-width: 1550px)': {
          py: 18,
        },
      }}
    >
      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'relative', 
          zIndex: 1,
          px: { xs: 2, md: 3 },
          '@media (min-width: 960px) and (max-width: 1549px)': {
            maxWidth: '950px',
            px: 2.5,
          },
          '@media (min-width: 1550px)': {
            maxWidth: '1200px',
            px: 3,
          },
        }}
      >
        {/* Stylish Header */}
        <Box ref={headerRef} sx={{ 
          textAlign: 'center', 
          mb: { xs: 8, md: 12 },
          '@media (min-width: 960px) and (max-width: 1549px)': {
            mb: 10,
          },
        }}>
          <Typography
            sx={{
              fontSize: { xs: '2.8rem', md: '4rem' },
              fontWeight: 700,
              background: isDark
                ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(0, 155, 228, 0.8) 100%)'
                : 'linear-gradient(135deg, rgba(30, 41, 59, 1) 0%, rgba(37, 99, 235, 0.8) 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3,
              lineHeight: 1.1,
              '@media (min-width: 960px) and (max-width: 1549px)': {
                fontSize: '3.2rem',
              },
            }}
          >
            Get in Touch
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.2rem', md: '1.4rem' },
              color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(71, 85, 105, 0.8)',
              maxWidth: 600,
              mx: 'auto',
              fontWeight: 300,
              lineHeight: 1.6,
              '@media (min-width: 960px) and (max-width: 1549px)': {
                fontSize: '1.3rem',
                maxWidth: 550,
              },
            }}
          >
            Ready to transform your industrial processes? Let's discuss how ChatAPC can help.
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="stretch">
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Card
              ref={formRef}
              elevation={0}
              sx={{
                height: '100%',
                background: isDark 
                  ? 'rgba(31, 41, 55, 0.6)' 
                  : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(20px)',
                border: isDark 
                  ? '1px solid rgba(75, 85, 99, 0.3)' 
                  : '1px solid rgba(226, 232, 240, 0.6)',
                borderRadius: '20px',
                boxShadow: isDark 
                  ? '0 20px 50px rgba(0, 0, 0, 0.3)' 
                  : '0 20px 50px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s ease',
              }}
            >
              <CardContent 
                component="form"
                onSubmit={handleSubmit}
                sx={{ p: { xs: 3, md: 4 }, height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <Typography
                  sx={{
                    fontSize: '1.6rem',
                    fontWeight: 600,
                    color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(30, 41, 59, 0.95)',
                    mb: 4,
                    '@media (min-width: 960px) and (max-width: 1549px)': {
                      fontSize: '1.4rem',
                      mb: 3,
                    },
                  }}
                >
                  Send us a message
                </Typography>

                <Grid container spacing={2} sx={{ flex: 1, mb: 4 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="name"
                      label="Your Name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      sx={textFieldSx}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person sx={{ color: isDark ? 'rgba(0, 155, 228, 0.7)' : 'rgba(37, 99, 235, 0.7)' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="email"
                      type="email"
                      label="Email Address"
                      placeholder="your.email@company.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      sx={textFieldSx}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email sx={{ color: isDark ? 'rgba(0, 155, 228, 0.7)' : 'rgba(37, 99, 235, 0.7)' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="company"
                      label="Company"
                      placeholder="Your company name"
                      value={formData.company}
                      onChange={handleInputChange}
                      sx={textFieldSx}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Business sx={{ color: isDark ? 'rgba(0, 155, 228, 0.7)' : 'rgba(37, 99, 235, 0.7)' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="phone"
                      type="tel"
                      label="Phone Number"
                      placeholder="+39 050 123 4567"
                      value={formData.phone}
                      onChange={handleInputChange}
                      sx={textFieldSx}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Phone sx={{ color: isDark ? 'rgba(0, 155, 228, 0.7)' : 'rgba(37, 99, 235, 0.7)' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="message"
                      label="Message"
                      placeholder="Tell us about your industrial process challenges and how we can help..."
                      value={formData.message}
                      onChange={handleInputChange}
                      multiline
                      rows={4}
                      required
                      sx={textFieldSx}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                            <Message sx={{ color: isDark ? 'rgba(0, 155, 228, 0.7)' : 'rgba(37, 99, 235, 0.7)' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<Send />}
                  sx={{
                    alignSelf: 'flex-start',
                    px: 4,
                    py: 1.5,
                    background: isDark 
                      ? 'linear-gradient(135deg, #009BE4 0%, #0077B6 100%)'
                      : 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
                    color: '#FFFFFF',
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderRadius: '12px',
                    textTransform: 'none',
                    boxShadow: isDark 
                      ? '0 8px 30px rgba(0, 155, 228, 0.3)'
                      : '0 8px 30px rgba(37, 99, 235, 0.3)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: isDark 
                        ? 'linear-gradient(135deg, #0077B6 0%, #005A87 100%)'
                        : 'linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: isDark 
                        ? '0 12px 40px rgba(0, 155, 228, 0.4)'
                        : '0 12px 40px rgba(37, 99, 235, 0.4)',
                    },
                  }}
                >
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={5}>
            <Box
              ref={infoRef}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                height: '100%',
              }}
            >
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <Card
                    key={index}
                    component={info.link ? 'a' : 'div'}
                    href={info.link || undefined}
                    elevation={0}
                    sx={{
                      background: isDark 
                        ? 'rgba(31, 41, 55, 0.6)' 
                        : 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(20px)',
                      border: isDark 
                        ? '1px solid rgba(75, 85, 99, 0.3)' 
                        : '1px solid rgba(226, 232, 240, 0.6)',
                      borderRadius: '16px',
                      p: 3,
                      textDecoration: 'none',
                      cursor: info.link ? 'pointer' : 'default',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '3px',
                        background: `linear-gradient(90deg, ${info.accent} 0%, transparent 100%)`,
                        opacity: 0.8,
                      },
                      '&:hover': {
                        transform: info.link ? 'translateY(-4px)' : 'none',
                        border: `1px solid ${info.accent}40`,
                        boxShadow: `0 12px 40px ${info.accent}20`,
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: '12px',
                          background: `linear-gradient(135deg, ${info.accent}20 0%, ${info.accent}05 100%)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <IconComponent sx={{ 
                          fontSize: 24, 
                          color: info.accent,
                        }} />
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontSize: '0.875rem',
                            color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(71, 85, 105, 0.6)',
                            mb: 0.5,
                            fontWeight: 500,
                            textTransform: 'uppercase',
                            letterSpacing: 1,
                          }}
                        >
                          {info.title}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: '1.1rem',
                            color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 41, 59, 0.9)',
                            fontWeight: 500,
                          }}
                        >
                          {info.content}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                );
              })}

              {/* Business Hours Card */}
              <Card
                elevation={0}
                sx={{
                  mt: 'auto',
                  background: isDark 
                    ? `linear-gradient(135deg, rgba(0, 155, 228, 0.1) 0%, rgba(31, 41, 55, 0.8) 100%)`
                    : `linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(255, 255, 255, 0.9) 100%)`,
                  backdropFilter: 'blur(20px)',
                  border: isDark 
                    ? '1px solid rgba(0, 155, 228, 0.2)' 
                    : '1px solid rgba(37, 99, 235, 0.2)',
                  borderRadius: '16px',
                  p: 4,
                }}
              >
                <Typography
                  sx={{
                    fontSize: '1.2rem',
                    color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 41, 59, 0.9)',
                    mb: 2,
                    fontWeight: 600,
                  }}
                >
                  Business Hours
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.95rem',
                    color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(71, 85, 105, 0.7)',
                    lineHeight: 1.8,
                  }}
                >
                  Monday - Friday: 9:00 AM - 6:00 PM CET<br />
                  Saturday - Sunday: Closed<br />
                  <Box component="span" sx={{ 
                    color: isDark ? '#009BE4' : '#2563EB', 
                    fontWeight: 600,
                  }}>
                    24/7 Emergency Support Available
                  </Box>
                </Typography>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default StylishContactSection;