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

gsap.registerPlugin(ScrollTrigger);

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate form
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

      // Animate info
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
    // Handle form submission here
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

  return (
    <Box
      ref={sectionRef}
      data-section-theme="dark"
      sx={{
        width: '100%',
        py: { xs: 12, md: 16 },
        position: 'relative',
        zIndex: 2,
        background: 'linear-gradient(180deg, rgba(10, 14, 46, 0.5) 0%, rgba(0, 155, 228, 0.04) 50%, rgba(10, 14, 46, 0.6) 100%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.04)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 50%, rgba(0, 155, 228, 0.08) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <Typography
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 600,
              color: 'rgba(255, 255, 255, 0.95)',
              mb: 2,
            }}
          >
            Get in Touch
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              color: 'rgba(255, 255, 255, 0.6)',
              maxWidth: 700,
              mx: 'auto',
            }}
          >
            Ready to transform your industrial processes? Let's talk about how ChatAPC can help.
          </Typography>
        </Box>

        <Grid container spacing={6} alignItems="stretch">
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Box
              ref={formRef}
              component="form"
              onSubmit={handleSubmit}
              sx={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 4,
                padding: { xs: 3, md: 4 },
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography
                sx={{
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.95)',
                  mb: 3,
                }}
              >
                Send us a message
              </Typography>

              <Grid container spacing={2} sx={{ flex: 1 }}>
                {/* Name Field */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="name"
                    label="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: 2,
                        '& fieldset': {
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                        },
                        '&:hover fieldset': {
                          border: '1px solid rgba(0, 155, 228, 0.3)',
                        },
                        '&.Mui-focused fieldset': {
                          border: '1px solid rgba(0, 155, 228, 0.5)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                      '& .MuiInputBase-input': {
                        color: 'rgba(255, 255, 255, 0.9)',
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person sx={{ color: 'rgba(0, 155, 228, 0.7)' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* Email Field */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="email"
                    type="email"
                    label="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: 2,
                        '& fieldset': {
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                        },
                        '&:hover fieldset': {
                          border: '1px solid rgba(0, 155, 228, 0.3)',
                        },
                        '&.Mui-focused fieldset': {
                          border: '1px solid rgba(0, 155, 228, 0.5)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                      '& .MuiInputBase-input': {
                        color: 'rgba(255, 255, 255, 0.9)',
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: 'rgba(0, 155, 228, 0.7)' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* Company Field */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="company"
                    label="Company"
                    value={formData.company}
                    onChange={handleInputChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: 2,
                        '& fieldset': {
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                        },
                        '&:hover fieldset': {
                          border: '1px solid rgba(0, 155, 228, 0.3)',
                        },
                        '&.Mui-focused fieldset': {
                          border: '1px solid rgba(0, 155, 228, 0.5)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                      '& .MuiInputBase-input': {
                        color: 'rgba(255, 255, 255, 0.9)',
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Business sx={{ color: 'rgba(0, 155, 228, 0.7)' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* Phone Field */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="phone"
                    label="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: 2,
                        '& fieldset': {
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                        },
                        '&:hover fieldset': {
                          border: '1px solid rgba(0, 155, 228, 0.3)',
                        },
                        '&.Mui-focused fieldset': {
                          border: '1px solid rgba(0, 155, 228, 0.5)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                      '& .MuiInputBase-input': {
                        color: 'rgba(255, 255, 255, 0.9)',
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone sx={{ color: 'rgba(0, 155, 228, 0.7)' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* Message Field */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="message"
                    label="Message"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: 2,
                        '& fieldset': {
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                        },
                        '&:hover fieldset': {
                          border: '1px solid rgba(0, 155, 228, 0.3)',
                        },
                        '&.Mui-focused fieldset': {
                          border: '1px solid rgba(0, 155, 228, 0.5)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                      '& .MuiInputBase-input': {
                        color: 'rgba(255, 255, 255, 0.9)',
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 2 }}>
                          <Message sx={{ color: 'rgba(0, 155, 228, 0.7)' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  background: 'linear-gradient(135deg, #009BE4 0%, #0077B6 100%)',
                  color: '#fff',
                  borderRadius: 3,
                  padding: '16px',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  boxShadow: '0 8px 32px rgba(0, 155, 228, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #0077B6 0%, #005A87 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 40px rgba(0, 155, 228, 0.4)',
                  },
                }}
              >
                Send Message
              </Button>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={5}>
            <Box ref={infoRef} sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Typography
                sx={{
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.95)',
                }}
              >
                Contact Information
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
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
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      textDecoration: 'none',
                      cursor: info.link ? 'pointer' : 'default',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(0, 155, 228, 0.2)',
                        transform: info.link ? 'translateY(-2px)' : 'none',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        background: 'rgba(0, 155, 228, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Icon sx={{ fontSize: 24, color: '#009BE4' }} />
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: '0.9rem',
                          color: 'rgba(255, 255, 255, 0.5)',
                          mb: 0.5,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {info.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '1.1rem',
                          color: 'rgba(255, 255, 255, 0.9)',
                          fontWeight: 500,
                        }}
                      >
                        {info.content}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
              </Box>

              {/* Additional Info */}
              <Box
                sx={{
                  mt: 'auto',
                  padding: 4,
                  background: 'rgba(0, 155, 228, 0.05)',
                  border: '1px solid rgba(0, 155, 228, 0.15)',
                  borderRadius: 3,
                }}
              >
                <Typography
                  sx={{
                    fontSize: '1.1rem',
                    color: 'rgba(255, 255, 255, 0.9)',
                    mb: 2,
                    fontWeight: 500,
                  }}
                >
                  Business Hours
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.95rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: 1.8,
                  }}
                >
                  Monday - Friday: 9:00 AM - 6:00 PM PST<br />
                  Saturday - Sunday: Closed<br />
                  <Box component="span" sx={{ color: '#009BE4', fontWeight: 500 }}>
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

