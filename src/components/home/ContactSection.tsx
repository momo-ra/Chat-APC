import React, { useRef, useState, useEffect } from 'react';
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
  Snackbar,
  Alert,
  Chip,
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
} from '@mui/icons-material';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useHubSpot } from '../../hooks/useHubSpot';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';
// Correctly import and use the animation functions
import { applySectionHeaderAnimation } from '../shared/animationHelpers';

const ModernContactSection: React.FC = () => {
  // refs for different animated sections
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  // Apply animation using useEffect and appropriate animation utility
  useEffect(() => {
    // Check if the function exists in animation module
    if (typeof applySectionHeaderAnimation === "function") {
      applySectionHeaderAnimation(headerRef.current, {
        titleSelector: '.section-title',
        subtitleSelector: '.section-subtitle',
        startTrigger: 'top 85%'
      });
    }
  }, []);

  const { isDark } = useThemeMode();
  const { submitToHubSpot, isLoading, error: hubspotError } = useHubSpot();
  const { containerMaxWidth, containerPadding } = useResponsiveLayout();

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    company: '',
    message: ''
  });

  const [toast, setToast] = useState<{open: boolean; severity: 'success' | 'error'; message: string}>(
    { open: false, severity: 'success', message: '' }
  );

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
    if (!formData.company.trim()) return { ok: false, msg: 'Please enter your company.' };
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
      const hubspotData = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        phone: '',
        company: formData.company,
        jobtitle: '',
        industry: '',
        message: formData.message,
        plant_size: '',
        primary_challenge: formData.message,
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
          message: ''
        });
      } else {
        setToast({ open: true, severity: 'error', message: hubspotError || 'Failed to send message. Please try again.' });
      }
    } catch (err) {
      setToast({ open: true, severity: 'error', message: 'Something went wrong. Please try again.' });
    }
  };

  const colors = {
    primary: isDark ? '#60A5FA' : '#3B82F6',
    accent: isDark ? '#009BE4' : '#171B83',
    cardBg: isDark ? 'rgba(31, 41, 55, 0.6)' : 'rgba(255, 255, 255, 0.8)',
    cardBorder: isDark ? '1px solid rgba(75, 85, 99, 0.3)' : '1px solid rgba(226, 232, 240, 0.8)',
    inputBg: isDark ? 'rgba(17, 24, 39, 0.4)' : 'rgba(248, 250, 252, 0.8)',
    textPrimary: isDark ? '#F9FAFB' : '#111827',
    textSecondary: isDark ? 'rgba(209, 213, 219, 0.8)' : 'rgba(71, 85, 105, 0.9)',
  };

  const textFieldSx = {
    '& .MuiOutlinedInput-root': {
      background: colors.inputBg,
      borderRadius: '12px',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)',
      '& fieldset': {
        border: isDark 
          ? '1px solid rgba(75, 85, 99, 0.3)' 
          : '1px solid rgba(203, 213, 225, 0.5)',
        borderRadius: '12px',
      },
      '&:hover fieldset': {
        borderColor: isDark ? 'rgba(96, 165, 250, 0.4)' : 'rgba(59, 130, 246, 0.4)',
      },
      '&.Mui-focused fieldset': {
        borderColor: colors.primary,
        borderWidth: '2px',
      },
      '& input:-webkit-autofill': {
        WebkitBoxShadow: `0 0 0 1000px ${colors.inputBg} inset`,
        WebkitTextFillColor: isDark ? '#E5E7EB' : '#1F2937',
        borderRadius: '12px',
      },
    },
    '& .MuiInputLabel-root': {
      color: isDark ? 'rgba(156, 163, 175, 0.9)' : 'rgba(100, 116, 139, 0.9)',
      fontWeight: 500,
      '&.Mui-focused': {
        color: colors.primary,
        fontWeight: 600,
      },
    },
    '& .MuiInputBase-input': {
      color: isDark ? '#F3F4F6' : '#1F2937',
      fontSize: '1rem',
    },
  };

  const contactInfo = [
    {
      icon: Email,
      title: 'Email',
      content: 'contact@chatapc.com',
      link: 'mailto:contact@chatapc.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+39 050 123 4567',
      link: 'tel:+390501234567',
    },
    {
      icon: LocationOn,
      title: 'Office',
      content: 'Via Impastato 1, 56122 Pisa, Italy',
      link: null,
    }
  ];

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        width: '100%',
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        background: "transparent",
        transition: 'background 0.3s ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '10%',
          left: '-5%',
          width: '500px',
          height: '500px',
          background: isDark
            ? 'radial-gradient(circle, rgba(0, 155, 228, 0.08) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          borderRadius: '50%',
          filter: 'blur(60px)',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '15%',
          right: '-5%',
          width: '450px',
          height: '450px',
          background: isDark
            ? 'radial-gradient(circle, rgba(96, 165, 250, 0.06) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(23, 27, 131, 0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
          borderRadius: '50%',
          filter: 'blur(60px)',
        },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 1,
          maxWidth: containerMaxWidth,
          px: containerPadding,
        }}
      >
        {/* Header */}
        <Box ref={headerRef} sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Chip
            label="Available 24/7"
            sx={{
              mb: 2.5,
              borderRadius: '20px',
              background: isDark 
                ? 'rgba(96, 165, 250, 0.1)' 
                : 'rgba(59, 130, 246, 0.08)',
              color: colors.primary,
              fontWeight: 600,
              fontSize: '0.875rem',
              px: 1,
              border: `1px solid ${isDark ? 'rgba(96, 165, 250, 0.2)' : 'rgba(59, 130, 246, 0.15)'}`,
            }}
          />
          <Typography
            sx={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              background: isDark
                ? 'linear-gradient(135deg, #FFFFFF 0%, #60A5FA 100%)'
                : 'linear-gradient(135deg, #1F2937 0%, #3B82F6 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
              lineHeight: 1.1,
            }}
          >
            Let's Talk
          </Typography>
          <Typography
            sx={{
              fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
              color: colors.textSecondary,
              maxWidth: 650,
              mx: 'auto',
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            Ready to optimize your industrial processes? We're here to help you get started with ChatAPC.
          </Typography>
        </Box>

        {/* Form and Contact Cards Grid */}
        <Grid
          container
          spacing={{ xs: 3, md: 4 }}
          alignItems="stretch"
        >
          {/* Form Card */}
          <Grid item xs={12} md={7}>
            <Card
              ref={formCardRef}
              elevation={0}
              sx={{
                height: '100%',
                minHeight: { xs: 'auto', md: '580px' },
                background: colors.cardBg,
                border: colors.cardBorder,
                borderRadius: '16px',
                backdropFilter: 'blur(20px)',
                boxShadow: isDark
                  ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                  : '0 4px 20px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: isDark
                    ? '0 12px 40px rgba(0, 155, 228, 0.2)'
                    : '0 8px 32px rgba(59, 130, 246, 0.15)',
                  transform: 'translateY(-2px)',
                }
              }}
            >
              <CardContent
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  p: { xs: 3, md: 4 },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    mb: 3,
                    color: colors.textPrimary,
                  }}
                >
                  Send us a message
                </Typography>

                <Grid container spacing={2.5}>
                  {/* First Name & Last Name */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="firstname"
                      label="First Name"
                      placeholder="John"
                      value={formData.firstname}
                      onChange={handleInputChange}
                      required
                      autoComplete="given-name"
                      sx={textFieldSx}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person sx={{ color: colors.primary, fontSize: 20 }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="lastname"
                      label="Last Name"
                      placeholder="Smith"
                      value={formData.lastname}
                      onChange={handleInputChange}
                      required
                      autoComplete="family-name"
                      sx={textFieldSx}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person sx={{ color: colors.primary, fontSize: 20 }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  {/* Email */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="email"
                      type="email"
                      label="Email Address"
                      placeholder="john.smith@company.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      autoComplete="email"
                      sx={textFieldSx}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email sx={{ color: colors.primary, fontSize: 20 }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  {/* Company */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="company"
                      label="Company"
                      placeholder="Your company name"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      autoComplete="organization"
                      sx={textFieldSx}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Business sx={{ color: colors.primary, fontSize: 20 }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  {/* Message */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="message"
                      label="Message"
                      placeholder="Tell us about your challenges and how we can help..."
                      value={formData.message}
                      onChange={handleInputChange}
                      multiline
                      rows={4}
                      required
                      sx={textFieldSx}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                            <Message sx={{ color: colors.primary, fontSize: 20 }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>

                {/* Submit Button */}
                <Box sx={{ mt: 'auto', pt: 3 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    endIcon={isLoading ? <CircularProgress size={18} sx={{ color: '#fff' }} /> : <Send />}
                    disabled={isLoading}
                    sx={{
                      py: 1.5,
                      px: 4,
                      fontWeight: 600,
                      fontSize: '1.05rem',
                      background: isDark
                        ? 'linear-gradient(135deg, #009BE4 0%, #60A5FA 100%)'
                        : 'linear-gradient(135deg, #3B82F6 0%, #171B83 100%)',
                      color: '#FFFFFF',
                      borderRadius: '12px',
                      textTransform: 'none',
                      boxShadow: isDark
                        ? '0 8px 24px rgba(0, 155, 228, 0.3)'
                        : '0 8px 24px rgba(59, 130, 246, 0.3)',
                      transition: 'all 0.3s ease',
                      '&:hover:not(:disabled)': {
                        background: isDark
                          ? 'linear-gradient(135deg, #00A8F3 0%, #70B0FF 100%)'
                          : 'linear-gradient(135deg, #2563EB 0%, #0F1654 100%)',
                        transform: 'translateY(-2px)',
                        boxShadow: isDark
                          ? '0 12px 32px rgba(0, 155, 228, 0.4)'
                          : '0 12px 32px rgba(59, 130, 246, 0.4)',
                      },
                      '&:disabled': {
                        opacity: 0.6,
                        background: isDark ? '#374151' : '#9CA3AF',
                      },
                    }}
                  >
                    {isLoading ? 'Sending...' : 'Send Message'}
                  </Button>
                  <Typography 
                    sx={{ 
                      fontSize: '0.8rem', 
                      color: isDark ? 'rgba(156, 163, 175, 0.7)' : 'rgba(100, 116, 139, 0.7)',
                      textAlign: 'center',
                      mt: 1.5,
                    }}
                  >
                    We'll respond within 24 hours
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Contact Info Cards */}
          <Grid item xs={12} md={5}>
            <Box
              ref={cardsContainerRef}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                height: '100%',
                minHeight: { xs: 'auto', md: '580px' },
                justifyContent: 'space-between',
              }}
            >
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <Card
                    key={index}
                    className="contact-info-card"
                    component={info.link ? 'a' : 'div'}
                    href={info.link || undefined}
                    elevation={0}
                    sx={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      background: colors.cardBg,
                      border: colors.cardBorder,
                      borderRadius: '14px',
                      backdropFilter: 'blur(20px)',
                      textDecoration: 'none',
                      cursor: info.link ? 'pointer' : 'default',
                      px: { xs: 2.5, md: 3 },
                      py: { xs: 2.5, md: 3 },
                      boxShadow: isDark
                        ? '0 4px 16px rgba(0, 0, 0, 0.2)'
                        : '0 2px 12px rgba(0, 0, 0, 0.06)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateX(4px)',
                        borderColor: colors.primary,
                        boxShadow: isDark
                          ? `0 8px 24px ${colors.primary}30`
                          : `0 4px 20px ${colors.primary}20`,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '12px',
                        background: isDark
                          ? `${colors.primary}15`
                          : `${colors.primary}10`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <IconComponent sx={{ fontSize: 24, color: colors.primary }} />
                    </Box>
                    <Box sx={{ ml: 2.5, flex: 1, minWidth: 0 }}>
                      <Typography
                        sx={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: isDark ? 'rgba(156, 163, 175, 0.8)' : 'rgba(100, 116, 139, 0.8)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          mb: 0.25,
                        }}
                      >
                        {info.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '1rem',
                          color: colors.textPrimary,
                          fontWeight: 500,
                          lineHeight: 1.4,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {info.content}
                      </Typography>
                    </Box>
                  </Card>
                );
              })}
            </Box>
          </Grid>
        </Grid>

        {/* Toast Notification */}
        <Snackbar
          open={toast.open}
          autoHideDuration={5000}
          onClose={() => setToast((t) => ({ ...t, open: false }))}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setToast((t) => ({ ...t, open: false }))}
            severity={toast.severity}
            variant="filled"
            sx={{ 
              width: '100%',
              borderRadius: '12px',
              fontWeight: 500,
            }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default ModernContactSection;