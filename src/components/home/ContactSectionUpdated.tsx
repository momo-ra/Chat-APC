import React, { useEffect, useRef, useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  TextField, 
  Button,
  Grid,
  InputAdornment
} from '@mui/material';
import { 
  Email, 
  Phone, 
  LocationOn, 
  Person,
  Business,
  Message
} from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
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
      if (formRef.current) {
        gsap.from(formRef.current, {
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          x: -60,
          duration: 0.8,
          ease: 'power3.out',
        });
      }

      if (infoRef.current) {
        gsap.from(infoRef.current, {
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          x: 60,
          duration: 0.8,
          ease: 'power3.out',
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
      link: 'mailto:contact@chatapc.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: LocationOn,
      title: 'Office',
      content: 'San Francisco, CA',
      link: null
    }
  ];

  const textFieldSx = {
    '& .MuiOutlinedInput-root': {
      background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
      borderRadius: 2,
      '& fieldset': {
        border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.15)',
      },
      '&:hover fieldset': {
        border: isDark ? '1px solid rgba(0, 155, 228, 0.3)' : '1px solid rgba(37, 99, 235, 0.4)',
      },
      '&.Mui-focused fieldset': {
        border: isDark ? '1px solid rgba(0, 155, 228, 0.5)' : '1px solid rgba(37, 99, 235, 0.6)',
      },
    },
    '& .MuiInputLabel-root': {
      color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
      '&.Mui-focused': {
        color: isDark ? '#009BE4' : '#2563EB',
      },
    },
    '& .MuiInputBase-input': {
      color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.87)',
    },
  };

  return (
    <Box
      ref={sectionRef}
      data-section-theme={isDark ? 'dark' : 'light'}
      data-section-primary={isDark ? '#009BE4' : '#2563EB'}
      sx={{
        width: '100%',
        py: { xs: 12, md: 16 },
        position: 'relative',
        zIndex: 2,
        background: isDark 
          ? 'linear-gradient(180deg, rgba(10, 14, 46, 0.5) 0%, rgba(0, 155, 228, 0.04) 50%, rgba(10, 14, 46, 0.6) 100%)'
          : 'transparent',
        borderTop: isDark ? '1px solid rgba(255, 255, 255, 0.04)' : '1px solid rgba(0, 0, 0, 0.06)',
        transition: 'background 0.3s ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isDark 
            ? 'radial-gradient(circle at 30% 50%, rgba(0, 155, 228, 0.08) 0%, transparent 50%)'
            : 'radial-gradient(circle at 30% 50%, rgba(37, 99, 235, 0.04) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <Typography
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 600,
              color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.9)',
              mb: 2,
              transition: 'color 0.3s ease',
            }}
          >
            Get in Touch
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
              maxWidth: 700,
              mx: 'auto',
              transition: 'color 0.3s ease',
            }}
          >
            Ready to transform your industrial processes? Let's talk about how ChatAPC can help.
          </Typography>
        </Box>

        <Grid container spacing={6} alignItems="stretch">
          <Grid item xs={12} md={7}>
            <Box
              ref={formRef}
              component="form"
              onSubmit={handleSubmit}
              sx={{
                background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px)',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
                borderRadius: 4,
                padding: { xs: 3, md: 4 },
                boxShadow: isDark ? '0 20px 60px rgba(0, 0, 0, 0.3)' : '0 8px 32px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography
                sx={{
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.9)',
                  mb: 3,
                  transition: 'color 0.3s ease',
                }}
              >
                Send us a message
              </Typography>

              <Grid container spacing={2} sx={{ flex: 1 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="name"
                    label="Your Name"
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
                sx={{
                  mt: 3,
                  padding: '14px 32px',
                  background: isDark 
                    ? 'linear-gradient(135deg, #009BE4 0%, #0084C7 100%)'
                    : 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: 500,
                  borderRadius: 2,
                  textTransform: 'none',
                  boxShadow: isDark 
                    ? '0 8px 24px rgba(0, 155, 228, 0.3)'
                    : '0 8px 24px rgba(37, 99, 235, 0.3)',
                  '&:hover': {
                    background: isDark 
                      ? 'linear-gradient(135deg, #0084C7 0%, #006FA9 100%)'
                      : 'linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%)',
                    boxShadow: isDark 
                      ? '0 12px 32px rgba(0, 155, 228, 0.4)'
                      : '0 12px 32px rgba(37, 99, 235, 0.4)',
                  },
                }}
              >
                Send Message
              </Button>
            </Box>
          </Grid>

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
                  <Box
                    key={index}
                    component={info.link ? 'a' : 'div'}
                    href={info.link || undefined}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 2,
                      padding: 3,
                      background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.8)',
                      border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      textDecoration: 'none',
                      cursor: info.link ? 'pointer' : 'default',
                      boxShadow: isDark ? 'none' : '0 4px 16px rgba(0, 0, 0, 0.06)',
                      '&:hover': {
                        background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.95)',
                        border: isDark ? '1px solid rgba(0, 155, 228, 0.2)' : '1px solid rgba(37, 99, 235, 0.2)',
                        transform: info.link ? 'translateY(-2px)' : 'none',
                        boxShadow: isDark ? 'none' : '0 8px 24px rgba(37, 99, 235, 0.12)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        background: isDark 
                          ? 'linear-gradient(135deg, rgba(0, 155, 228, 0.15) 0%, rgba(0, 155, 228, 0.05) 100%)'
                          : 'linear-gradient(135deg, rgba(37, 99, 235, 0.12) 0%, rgba(37, 99, 235, 0.04) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <IconComponent sx={{ 
                        fontSize: 24, 
                        color: isDark ? '#009BE4' : '#2563EB',
                        transition: 'color 0.3s ease',
                      }} />
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: '0.875rem',
                          color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.5)',
                          mb: 0.5,
                          fontWeight: 500,
                          textTransform: 'uppercase',
                          letterSpacing: 1,
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {info.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '1.05rem',
                          color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.87)',
                          fontWeight: 500,
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {info.content}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}

              <Box
                sx={{
                  mt: 'auto',
                  padding: 4,
                  background: isDark 
                    ? 'rgba(0, 155, 228, 0.05)' 
                    : 'rgba(37, 99, 235, 0.04)',
                  border: isDark 
                    ? '1px solid rgba(0, 155, 228, 0.15)' 
                    : '1px solid rgba(37, 99, 235, 0.12)',
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '1.1rem',
                    color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.87)',
                    mb: 2,
                    fontWeight: 500,
                    transition: 'color 0.3s ease',
                  }}
                >
                  Business Hours
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.95rem',
                    color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.65)',
                    lineHeight: 1.8,
                    transition: 'color 0.3s ease',
                  }}
                >
                  Monday - Friday: 9:00 AM - 6:00 PM PST<br />
                  Saturday - Sunday: Closed<br />
                  <Box component="span" sx={{ 
                    color: isDark ? '#009BE4' : '#2563EB', 
                    fontWeight: 500,
                    transition: 'color 0.3s ease',
                  }}>
                    24/7 Emergency Support Available
                  </Box>
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactSection;

