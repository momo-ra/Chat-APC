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
  CardContent,
  Divider,
  Snackbar,
  Alert,
  Chip,
  MenuItem,
  CircularProgress
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  Person,
  Business,
  Message,
  Send,
  Work,
  Category
} from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useHubSpot } from '../../hooks/useHubSpot';

gsap.registerPlugin(ScrollTrigger);

const StylishContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();
  const { submitToHubSpot, isLoading, error: hubspotError, success: hubspotSuccess } = useHubSpot();
  
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    company: '',
    phone: '',
    jobtitle: '',
    industry: '',
    message: ''
  });
  const [toast, setToast] = useState<{open: boolean; severity: 'success' | 'error'; message: string}>(
    { open: false, severity: 'success', message: '' }
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
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

      // Form & info animation
      [formRef.current, infoRef.current].forEach((el, i) => {
        if (el) {
          gsap.from(el, {
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 24,
            duration: 0.6 + i * 0.1,
            ease: 'power2.out',
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    if (!formData.firstname.trim()) return { ok: false, msg: 'Please enter your first name.' };
    if (!formData.lastname.trim()) return { ok: false, msg: 'Please enter your last name.' };
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    if (!emailOk) return { ok: false, msg: 'Please enter a valid email address.' };
    if (!formData.message.trim()) return { ok: false, msg: 'Please write a short message.' };
    return { ok: true, msg: '' };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (!v.ok) {
      setToast({ open: true, severity: 'error', message: v.msg });
      return;
    }
    
    try {
      // Prepare data for HubSpot (matching the interface requirements)
      const hubspotData = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        phone: formData.phone || '',
        company: formData.company || '',
        jobtitle: formData.jobtitle || '',
        industry: formData.industry || '',
        message: formData.message, // Send as message field (required by HubSpot)
        plant_size: '',
        primary_challenge: formData.message, // Also send as primary_challenge for internal tracking
        current_systems: '',
        lead_status: 'new',
        lead_source: 'Contact Form'
      };

      const success = await submitToHubSpot(hubspotData);
      
      if (success) {
        setToast({ open: true, severity: 'success', message: 'Thanks! Your message has been sent successfully.' });
        setFormData({ 
          firstname: '', 
          lastname: '', 
          email: '', 
          company: '', 
          phone: '', 
          jobtitle: '',
          industry: '',
          message: '' 
        });
      } else {
        setToast({ open: true, severity: 'error', message: hubspotError || 'Failed to send message. Please try again.' });
      }
    } catch (err) {
      setToast({ open: true, severity: 'error', message: 'Something went wrong. Please try again.' });
    }
  };

  // Industry options for the dropdown
  const industries = [
    'Manufacturing',
    'Oil & Gas',
    'Chemical',
    'Pharmaceutical',
    'Food & Beverage',
    'Automotive',
    'Energy & Utilities',
    'Mining',
    'Aerospace',
    'Other'
  ];

  const contactInfo = [
    {
      icon: Email,
      title: 'Email',
      content: 'contact@chatapc.com',
      link: 'mailto:contact@chatapc.com',
      accent: '#8b5cf6', // violet
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+39 050 123 4567',
      link: 'tel:+390501234567',
      accent: '#22c55e', // green
    },
    {
      icon: LocationOn,
      title: 'Office',
      content: 'Via Impastato 1, 56122 Pisa, Italy',
      link: null,
      accent: '#06b6d4', // cyan
    }
  ];

  // الحل الكامل للـ autofill من الجذر
  const textFieldSx = {
    '& .MuiOutlinedInput-root': {
      background: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(248, 250, 252, 0.85)',
      borderRadius: '14px',
      backdropFilter: 'blur(12px)',
      transition: 'all 0.25s ease',
      '& fieldset': {
        border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(226, 232, 240, 0.9)',
        borderRadius: '14px',
      },
      '&:hover:not(.Mui-focused) fieldset': {
        border: isDark ? '1px solid rgba(99, 179, 237, 0.3)' : '1px solid rgba(37, 99, 235, 0.4)',
      },
      '&.Mui-focused fieldset': {
        border: isDark ? '2px solid rgba(99, 179, 237, 0.7)' : '2px solid rgba(37, 99, 235, 0.8)',
        boxShadow: isDark
          ? '0 0 0 4px rgba(59, 130, 246, 0.10)'
          : '0 0 0 4px rgba(37, 99, 235, 0.10)',
      },
    },
    '& .MuiInputLabel-root': {
      color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(71, 85, 105, 0.85)',
      '&.Mui-focused': {
        color: isDark ? '#63b3ed' : '#2563EB',
      },
    },
    '& .MuiInputBase-input': {
      color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 0.95)',
      // الحل النهائي: نلغي تماماً أي تأثير من المتصفح ونخليه شفاف
      '&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active': {
        WebkitBoxShadow: '0 0 0 1000px transparent inset !important',
        WebkitTextFillColor: isDark ? 'rgba(255, 255, 255, 0.95) !important' : 'rgba(15, 23, 42, 0.95) !important',
        caretColor: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 0.95)',
        transition: 'background-color 5000s ease-in-out 0s !important',
        boxShadow: 'none !important',
        backgroundColor: 'transparent !important',
        backgroundImage: 'none !important',
      },
    },
  } as const;

  return (
    <Box
      ref={sectionRef}
      data-section-theme={isDark ? 'dark' : 'light'}
      data-section-primary={isDark ? '#63b3ed' : '#2563EB'}
      sx={{
        width: '100%',
        py: { xs: 12, md: 18 },
        position: 'relative',
        overflow: 'hidden',
        background: 'transparent',
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
        {/* Header */}
        <Box ref={headerRef} sx={{ textAlign: 'center', mb: { xs: 8, md: 12 } }}>
          <Chip
            label="We reply within 24h"
            sx={{
              mb: 2,
              borderRadius: '999px',
              background: isDark ? 'rgba(99, 102, 241, 0.15)' : 'rgba(59, 130, 246, 0.12)',
              color: isDark ? '#c7d2fe' : '#1e40af',
              fontWeight: 600,
              letterSpacing: 0.2,
            }}
          />
          <Typography
            sx={{
              fontSize: { xs: '2.8rem', md: '4rem' },
              fontWeight: 800,
              letterSpacing: '-0.02em',
              background: isDark
                ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(99, 102, 241, 0.9) 100%)'
                : 'linear-gradient(135deg, rgba(30, 41, 59, 1) 0%, rgba(37, 99, 235, 0.85) 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2.5,
              lineHeight: 1.06,
            }}
          >
            Get in Touch
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.15rem', md: '1.35rem' },
              color: isDark ? 'rgba(255, 255, 255, 0.72)' : 'rgba(71, 85, 105, 0.9)',
              maxWidth: 720,
              mx: 'auto',
              fontWeight: 300,
              lineHeight: 1.65,
            }}
          >
            Ready to transform your industrial processes? Let's discuss how ChatAPC can help.
          </Typography>
        </Box>

        {/* Contact Form - Full Width */}
            <Card
              ref={formRef}
              elevation={0}
              sx={{
                background: isDark ? 'rgba(17, 24, 39, 0.65)' : 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(22px)',
                border: isDark ? '1px solid rgba(148, 163, 184, 0.18)' : '1px solid rgba(226, 232, 240, 0.7)',
                borderRadius: '22px',
                boxShadow: isDark ? '0 24px 60px rgba(0, 0, 0, 0.35)' : '0 24px 60px rgba(0, 0, 0, 0.08)',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            mb: { xs: 6, md: 8 },
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: isDark ? '0 28px 70px rgba(0,0,0,0.4)' : '0 28px 70px rgba(0,0,0,0.1)'
                }
              }}
            >
              <CardContent
                component="form"
                onSubmit={handleSubmit}
                sx={{ p: { xs: 3, md: 4 } }}
              >
                <Typography
                  sx={{
                    fontSize: '1.6rem',
                    fontWeight: 700,
                    color: isDark ? 'rgba(255, 255, 255, 0.98)' : 'rgba(30, 41, 59, 0.98)',
                    mb: 3.5,
                  }}
                >
                  Send us a message
                </Typography>

                <Grid container spacing={2.5}>
                  {/* First Name */}
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      name="firstname"
                      label="First Name"
                      placeholder="John"
                      value={formData.firstname}
                      onChange={handleInputChange}
                      required
                      autoComplete="given-name"
                      aria-label="First Name"
                      sx={textFieldSx}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person sx={{ color: isDark ? 'rgba(99, 179, 237, 0.8)' : 'rgba(37, 99, 235, 0.9)' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  {/* Last Name */}
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      name="lastname"
                      label="Last Name"
                      placeholder="Doe"
                      value={formData.lastname}
                      onChange={handleInputChange}
                      required
                      autoComplete="family-name"
                      aria-label="Last Name"
                      sx={textFieldSx}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person sx={{ color: isDark ? 'rgba(99, 179, 237, 0.8)' : 'rgba(37, 99, 235, 0.9)' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  {/* Email */}
                  <Grid item xs={12} sm={12} md={4}>
                    <TextField
                      fullWidth
                      name="email"
                      type="email"
                      label="Email Address"
                      placeholder="john.doe@company.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      autoComplete="email"
                      aria-label="Email Address"
                      sx={textFieldSx}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email sx={{ color: isDark ? 'rgba(99, 179, 237, 0.8)' : 'rgba(37, 99, 235, 0.9)' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  {/* Phone */}
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      name="phone"
                      type="tel"
                      label="Phone Number"
                      placeholder="+39 050 123 4567"
                      value={formData.phone}
                      onChange={handleInputChange}
                      autoComplete="tel"
                      aria-label="Phone Number"
                      sx={textFieldSx}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Phone sx={{ color: isDark ? 'rgba(99, 179, 237, 0.8)' : 'rgba(37, 99, 235, 0.9)' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  {/* Company */}
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      name="company"
                      label="Company"
                      placeholder="Your company name"
                      value={formData.company}
                      onChange={handleInputChange}
                      autoComplete="organization"
                      aria-label="Company"
                      sx={textFieldSx}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Business sx={{ color: isDark ? 'rgba(99, 179, 237, 0.8)' : 'rgba(37, 99, 235, 0.9)' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  {/* Job Title */}
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      name="jobtitle"
                      label="Job Title"
                      placeholder="Plant Manager"
                      value={formData.jobtitle}
                      onChange={handleInputChange}
                      autoComplete="organization-title"
                      aria-label="Job Title"
                      sx={textFieldSx}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Work sx={{ color: isDark ? 'rgba(99, 179, 237, 0.8)' : 'rgba(37, 99, 235, 0.9)' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  {/* Industry */}
                  <Grid item xs={12} sm={6} md={12}>
                    <TextField
                      fullWidth
                      select
                      name="industry"
                      label="Industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      aria-label="Industry"
                      sx={textFieldSx}
                      SelectProps={{
                        MenuProps: {
                          PaperProps: {
                            sx: {
                              mt: 1,
                              borderRadius: '14px',
                              background: isDark 
                                ? 'rgba(17, 24, 39, 0.95)' 
                                : 'rgba(255, 255, 255, 0.95)',
                              backdropFilter: 'blur(20px)',
                              border: isDark 
                                ? '1px solid rgba(148, 163, 184, 0.2)' 
                                : '1px solid rgba(226, 232, 240, 0.9)',
                              boxShadow: isDark 
                                ? '0 12px 40px rgba(0, 0, 0, 0.5)' 
                                : '0 12px 40px rgba(0, 0, 0, 0.15)',
                              '& .MuiList-root': {
                                py: 1,
                              },
                              '& .MuiMenuItem-root': {
                                px: 2,
                                py: 1.5,
                                mx: 1,
                                borderRadius: '10px',
                                fontSize: '0.95rem',
                                color: isDark 
                                  ? 'rgba(255, 255, 255, 0.9)' 
                                  : 'rgba(15, 23, 42, 0.9)',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                  background: isDark 
                                    ? 'rgba(99, 179, 237, 0.15)' 
                                    : 'rgba(37, 99, 235, 0.08)',
                                },
                                '&.Mui-selected': {
                                  background: isDark 
                                    ? 'rgba(99, 179, 237, 0.2)' 
                                    : 'rgba(37, 99, 235, 0.12)',
                                  color: isDark ? '#63b3ed' : '#2563EB',
                                  fontWeight: 600,
                                  '&:hover': {
                                    background: isDark 
                                      ? 'rgba(99, 179, 237, 0.25)' 
                                      : 'rgba(37, 99, 235, 0.15)',
                                  },
                                },
                                '& em': {
                                  color: isDark 
                                    ? 'rgba(255, 255, 255, 0.5)' 
                                    : 'rgba(71, 85, 105, 0.6)',
                                  fontStyle: 'normal',
                                },
                              },
                            },
                          },
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Category sx={{ color: isDark ? 'rgba(99, 179, 237, 0.8)' : 'rgba(37, 99, 235, 0.9)' }} />
                          </InputAdornment>
                        ),
                      }}
                    >
                      <MenuItem value="">
                        <em>Select your industry</em>
                      </MenuItem>
                      {industries.map((industry) => (
                        <MenuItem key={industry} value={industry}>
                          {industry}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  {/* Message */}
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
                      aria-label="Message"
                      sx={textFieldSx}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                            <Message sx={{ color: isDark ? 'rgba(99, 179, 237, 0.8)' : 'rgba(37, 99, 235, 0.9)' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3, opacity: isDark ? 0.2 : 0.5 }} />

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    endIcon={isLoading ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : <Send />}
                    disabled={isLoading}
                    sx={{
                      px: 4,
                      py: 1.5,
                      background: isDark
                        ? 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)'
                        : 'linear-gradient(135deg, #2563EB 0%, #7c3aed 100%)',
                      color: '#FFFFFF',
                      fontSize: '1rem',
                      fontWeight: 700,
                      borderRadius: '14px',
                      textTransform: 'none',
                      boxShadow: isDark
                        ? '0 10px 30px rgba(99, 102, 241, 0.35)'
                        : '0 10px 30px rgba(59, 130, 246, 0.28)',
                      transition: 'all 0.25s ease',
                      '&:hover:not(:disabled)': {
                        transform: 'translateY(-2px)',
                        boxShadow: isDark
                          ? '0 16px 40px rgba(99, 102, 241, 0.45)'
                          : '0 16px 40px rgba(59, 130, 246, 0.38)'
                      },
                      '&:disabled': {
                        opacity: 0.6,
                      }
                    }}
                  >
                    {isLoading ? 'Sending…' : 'Send Message'}
                  </Button>

                  <Typography sx={{ fontSize: 13, opacity: 0.7 }}>
                    By submitting, you agree to our privacy policy.
                  </Typography>
                </Box>
              </CardContent>
            </Card>

        {/* Contact Info Cards - Below Form */}
        <Box ref={infoRef}>
          <Grid container spacing={{ xs: 3, md: 4 }}>
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    component={info.link ? 'a' : 'div'}
                    href={info.link || undefined}
                    elevation={0}
                    sx={{
                      height: '100%',
                      minHeight: '110px',
                      display: 'flex',
                      alignItems: 'center',
                      background: isDark
                        ? 'rgba(17, 24, 39, 0.6)'
                        : 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(20px)',
                      border: isDark 
                        ? '1px solid rgba(148, 163, 184, 0.15)' 
                        : '1px solid rgba(226, 232, 240, 0.9)',
                      borderRadius: '18px',
                      p: 3,
                      textDecoration: 'none',
                      cursor: info.link ? 'pointer' : 'default',
                      transition: 'all 0.3s ease',
                      boxShadow: isDark 
                        ? '0 4px 20px rgba(0, 0, 0, 0.25)' 
                        : '0 4px 20px rgba(0, 0, 0, 0.05)',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: isDark 
                          ? '0 12px 40px rgba(0, 0, 0, 0.35)' 
                          : '0 12px 40px rgba(0, 0, 0, 0.08)',
                        borderColor: info.accent,
                      },
                    }}
                  >
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 2,
                      width: '100%',
                    }}>
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: '14px',
                          background: isDark
                            ? `linear-gradient(135deg, ${info.accent}20, ${info.accent}10)`
                            : `linear-gradient(135deg, ${info.accent}15, ${info.accent}08)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          transition: 'transform 0.3s ease',
                        }}
                      >
                        <IconComponent sx={{ fontSize: 28, color: info.accent }} />
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          sx={{
                            fontSize: '0.7rem',
                            color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(71, 85, 105, 0.6)',
                            mb: 0.3,
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: 1.5,
                          }}
                        >
                          {info.title}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: { xs: '0.95rem', md: '1.05rem' },
                            color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 0.95)',
                            fontWeight: 600,
                            lineHeight: 1.3,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {info.content}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
                );
              })}
          </Grid>
        </Box>
      </Container>

      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setToast((t) => ({ ...t, open: false }))}
          severity={toast.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default StylishContactSection;