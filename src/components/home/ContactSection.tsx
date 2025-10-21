import React, { useRef, useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  TextField,
  Button,
  Grid,
  InputAdornment,
  Snackbar,
  Alert,
  CircularProgress,
  Slide,
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
import { 
  themeConfig, 
  getColor, 
  getGradient, 
  getTextColor,
} from '../shared/themeConfig';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  applyStaggerAnimation,
  applyEntranceAnimation,
} from '../shared/animationHelpers';
import { animationConfig, staggerConfig } from '../shared/animation';

gsap.registerPlugin(ScrollTrigger);

const ModernContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const contactCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const { isDark } = useThemeMode();
  const { submitToHubSpot, isLoading, error: hubspotError } = useHubSpot();
  const { containerMaxWidth, containerPadding } = useResponsiveLayout();

  const { colors, gradients, typography, borderRadius, transitions } = themeConfig;
  const mainColor = getColor(colors.blue, isDark);
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        const children = Array.from(headerRef.current.children) as HTMLElement[];
        children.forEach((child, index) => {
          applyEntranceAnimation(child, 'fadeIn', {
            delay: index * animationConfig.delay.short,
            startTrigger: 'top 85%',
          });
        });
      }

      if (formRef.current) {
        applyEntranceAnimation(formRef.current, 'slideUp', {
          delay: animationConfig.delay.medium,
          startTrigger: 'top 85%',
        });
      }

      const validCards = contactCardsRef.current.filter(Boolean) as HTMLElement[];
      if (validCards.length > 0) {
        applyStaggerAnimation(validCards, 'slideUp', {
          staggerDelay: staggerConfig.listItems.delay,
          startTrigger: 'top 85%',
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

  const textFieldSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      background: isDark ? 'rgba(31, 41, 55, 0.6)' : 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      transition: transitions.allNormal,
      '& fieldset': {
        borderColor: isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(226, 232, 240, 0.8)',
      },
      '&:hover fieldset': {
        borderColor: isDark ? 'rgba(59, 130, 246, 0.5)' : 'rgba(37, 99, 235, 0.5)',
      },
      '&.Mui-focused fieldset': {
        borderColor: isDark ? '#3B82F6' : '#2563EB',
        borderWidth: '2px',
      },
      '& input, & textarea': {
        color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 41, 59, 1)',
        fontSize: '1rem',
      },
      '& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & .MuiOutlinedInput-root:hover input:-webkit-autofill': {
        WebkitBoxShadow: `0 0 0 1000px ${isDark ? 'rgba(31, 41, 55, 0.6)' : 'rgba(255, 255, 255, 0.9)'} inset`,
        WebkitTextFillColor: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 41, 59, 1)',
        caretColor: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 41, 59, 1)',
        borderRadius: '12px',
        transition: 'background-color 9999s ease-out 0s, color 0s',
      },
    },
    '& .MuiInputLabel-root': {
      color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(100, 116, 139, 1)',
      fontWeight: 500,
      '&.Mui-focused': {
        color: isDark ? '#3B82F6' : '#2563EB',
      },
    },
  };

  const contactInfo = [
    {
      icon: Email,
      title: 'EMAIL',
      content: 'info@chatapc.ai',
      link: 'mailto:info@chatapc.ai',
    },
    {
      icon: Phone,
      title: 'PHONE',
      content: '(+39) 0506201704',
      link: 'tel:+390506201704',
    },
    {
      icon: LocationOn,
      title: 'OUR OFFICE LOCATION',
      content: 'Via Impastato 1, 56122 Pisa, Italy',
      link: "https://maps.app.goo.gl/UuWcPb5tgVcvtEb9A",
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
        background: "transparent",
        transition: transitions.normal,
      }}
    >
      {/* Toast Notification - positioned relative to section */}
      <Snackbar
        open={toast.open}
        autoHideDuration={5000}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        TransitionComponent={Slide}
        TransitionProps={{ direction: "down" } as any}
        sx={{
          position: 'absolute',
          top: { xs: '16px', md: '24px' },
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: (theme) => theme.zIndex.snackbar + 10,
          '& .MuiSnackbarContent-root, & .MuiAlert-root': {
            animation: 'slideDown 0.4s ease-out',
          },
          '@keyframes slideDown': {
            '0%': {
              transform: 'translateY(-100%)',
              opacity: 0,
            },
            '100%': {
              transform: 'translateY(0)',
              opacity: 1,
            },
          },
        }}
      >
        <Alert
          onClose={() => setToast((t) => ({ ...t, open: false }))}
          severity={toast.severity}
          variant="filled"
          sx={{
            width: '100%',
            borderRadius: borderRadius.lg,
            fontWeight: 500,
            boxShadow: '0 8px 24px rgba(30,41,59,0.06)'
          }}
        >
          {toast.message}
        </Alert>
      </Snackbar>

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
          <Typography
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 800,
              color:isDark
                ? getGradient(gradients.blueToBlue, isDark)
                : getGradient(gradients.blueToBlue, isDark),
              mb: 2,
              lineHeight: 1.2,
              background: isDark
                  ? getGradient(gradients.blueToBlue, isDark)
                  : getGradient(gradients.blue, isDark),
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
            }}
          >
            Let's Talk
          </Typography>
          <Typography
            sx={{
              fontSize: typography.bodyLarge.size,
              color: getTextColor('secondary', isDark),
              maxWidth: 700,
              mx: 'auto',
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            Ready to optimize your industrial processes? We're here to help you get started with ChatAPC.
          </Typography>
        </Box>

        {/* Form */}
        <Box
          ref={formRef}
          component="form"
          onSubmit={handleSubmit}
          sx={{
            maxWidth: 700,
            mx: 'auto',
            mb: { xs: 8, md: 12 },
          }}
        >
          <Grid container spacing={3}>
            {/* First Name & Last Name */}
            <Grid item xs={12} sm={6}>
              <Typography
                sx={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: getTextColor('primary', isDark),
                  mb: 1,
                }}
              >
                First Name *
              </Typography>
              <TextField
                fullWidth
                name="firstname"
                placeholder="John"
                value={formData.firstname}
                onChange={handleInputChange}
                required
                autoComplete="given-name"
                sx={textFieldSx}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: mainColor, fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                sx={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: getTextColor('primary', isDark),
                  mb: 1,
                }}
              >
                Last Name *
              </Typography>
              <TextField
                fullWidth
                name="lastname"
                placeholder="Smith"
                value={formData.lastname}
                onChange={handleInputChange}
                required
                autoComplete="family-name"
                sx={textFieldSx}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: mainColor, fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12} sm={6}>
              <Typography
                sx={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: getTextColor('primary', isDark),
                  mb: 1,
                }}
              >
                Email *
              </Typography>
              <TextField
                fullWidth
                name="email"
                type="email"
                placeholder="john.smith@company.com"
                value={formData.email}
                onChange={handleInputChange}
                required
                autoComplete="email"
                sx={textFieldSx}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: mainColor, fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Company */}
            <Grid item xs={12} sm={6}>
              <Typography
                sx={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: getTextColor('primary', isDark),
                  mb: 1,
                }}
              >
                Company *
              </Typography>
              <TextField
                fullWidth
                name="company"
                placeholder="Your company name"
                value={formData.company}
                onChange={handleInputChange}
                required
                autoComplete="organization"
                sx={textFieldSx}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Business sx={{ color: mainColor, fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Message */}
            <Grid item xs={12}>
              <Typography
                sx={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: getTextColor('primary', isDark),
                  mb: 1,
                }}
              >
                Message *
              </Typography>
              <TextField
                fullWidth
                name="message"
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
                      <Message sx={{ color: mainColor, fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              endIcon={isLoading ? <CircularProgress size={18} sx={{ color: '#fff' }} /> : <Send />}
              disabled={isLoading}
              sx={{
                py: 1.75,
                px: 6,
                fontWeight: 700,
                fontSize: '1.1rem',
                background: isDark
                  ? getGradient(gradients.blueToBlue, isDark)
                  : getGradient(gradients.blueToBlue, isDark),
                color: '#FFFFFF',
                borderRadius: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                boxShadow: isDark
                  ? '0 8px 32px rgba(59, 130, 246, 0.3)'
                  : '0 8px 32px rgba(37, 99, 235, 0.3)',
                transition: transitions.allNormal,
                '&:hover:not(:disabled)': {
                  transform: 'translateY(-2px)',
                  boxShadow: isDark
                    ? '0 12px 40px rgba(59, 130, 246, 0.4)'
                    : '0 12px 40px rgba(37, 99, 235, 0.4)',
                },
                '&:disabled': {
                  opacity: 0.7,
                  background: colors.neutral.darkGray,
                },
              }}
            >
              {isLoading ? 'Sending...' : 'Submit'}
            </Button>
          </Box>
        </Box>

        {/* Contact Cards */}
        <Grid container spacing={4}>
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon;
            return (
              <Grid item xs={12} md={4} key={index}>
                <Box
                  ref={(el) => contactCardsRef.current[index] = el as HTMLDivElement}
                  component={info.link ? 'a' : 'div'}
                  href={info.link || undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    textAlign: 'center',
                    textDecoration: 'none',
                    cursor: info.link ? 'pointer' : 'default',
                    transition: transitions.allNormal,
                    '&:hover': {
                      transform: 'translateY(-8px)',
                    },
                  }}
                >
                  {/* Icon Circle */}
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: '50%',
                      background: isDark
                        ? getGradient(gradients.blueToBlue, isDark)
                        : getGradient(gradients.blueToBlue, isDark),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      boxShadow: isDark
                        ? '0 8px 32px rgba(59, 130, 246, 0.3)'
                        : '0 8px 32px rgba(37, 99, 235, 0.3)',
                      transition: transitions.allNormal,
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: isDark
                          ? '0 12px 40px rgba(59, 130, 246, 0.4)'
                          : '0 12px 40px rgba(37, 99, 235, 0.4)',
                      },
                    }}
                  >
                    <IconComponent sx={{ fontSize: 40, color: '#FFFFFF' }} />
                  </Box>

                  {/* Title */}
                  <Typography
                    sx={{
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: getTextColor('primary', isDark),
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      mb: 1.5,
                    }}
                  >
                    {info.title}
                  </Typography>

                  {/* Content */}
                  <Typography
                    sx={{
                      fontSize: '1rem',
                      color: getTextColor('secondary', isDark),
                      fontWeight: 400,
                      lineHeight: 1.6,
                    }}
                  >
                    {info.content}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default ModernContactSection;