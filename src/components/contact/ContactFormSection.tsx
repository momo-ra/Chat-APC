import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  TextField,
  Button,
  InputAdornment,
  Snackbar,
  Alert,
  Fade,
  CircularProgress,
  Slide,
} from '@mui/material';
import { Person, Email, Business, Send, Message } from '@mui/icons-material';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useHubSpot } from '../../hooks/useHubSpot';

const mainColor = '#2563EB'; // adjust to match your theme primary
const gradients = {
  blueToBlue: 'linear-gradient(90deg, #2563EB 0%, #3B82F6 100%)',
  blue: 'linear-gradient(90deg, #2563EB 0%, #2563EB 100%)',
};
const transitions = { allNormal: 'all 0.25s cubic-bezier(0.4,0,0.2,1) 0ms', normal: 'all 0.25s cubic-bezier(0.4,0,0.2,1) 0ms' };

const ContactFormSection: React.FC = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    company: '',
    message: ''
  });
  const [toast, setToast] = useState<{ open: boolean; severity: 'success' | 'error'; message: string }>({
    open: false, severity: 'success', message: ''
  });
  const { isDark } = useThemeMode();
  const { submitToHubSpot, isLoading, error: hubspotError } = useHubSpot();

  // Utility for TextField sx to match @ContactSection.tsx
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
        fontSize: { xs: '1rem', md: '1rem' },
        lineHeight: 1.4,
      },
      '& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & .MuiOutlinedInput-root:hover input:-webkit-autofill': {
        WebkitBoxShadow: `0 0 0 1000px ${isDark ? 'rgba(31, 41, 55, 0.6)' : 'rgba(255, 255, 255, 0.9)'} inset`,
        WebkitTextFillColor: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 41, 59, 1)',
        caretColor: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 41, 59, 1)',
        borderRadius: '12px',
        // Prevent Chrome from flashing default autofill background on hover/focus
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

  const getTextColor = (type: 'primary' | 'secondary', isDark: boolean) => {
    if (type === 'primary') {
      return isDark ? '#FFFFFF' : '#1E293B';
    }
    return isDark ? 'rgba(199,213,246,0.85)' : '#475569';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      const success = await submitToHubSpot({
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        company: formData.company,
        message: formData.message
      });

      if (success) {
        setToast({ open: true, severity: 'success', message: "Thanks! Your message has been sent successfully." });
        setFormData({
          firstname: '', lastname: '', email: '', company: '', message: ''
        });
      } else {
        setToast({ open: true, severity: 'error', message: hubspotError || 'Failed to send message. Please try again.' });
      }
    } catch (err) {
      setToast({ open: true, severity: 'error', message: 'Something went wrong. Please try again.' });
    }
  };

  // --- SNACKBAR LIKE @ContactSection.tsx ---
  // It should be 'fixed' and centered at the top of the viewport, not inside the form.
  // Remove custom slideDown animation.

  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        py: { xs: 8, md: 12 },
        pb: { xs: 10, md: 12 },
        position: 'relative',
        background: "transparent",
        transition: transitions.normal,
      }}
    >
      {/* Toast Notification - FIXED to top-center of page, like @ContactSection.tsx */}
      <Snackbar
        open={toast.open}
        autoHideDuration={5000}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        TransitionComponent={Slide}
        TransitionProps={{ direction: "down" } as any}
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 32 },
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: (theme) => theme.zIndex.snackbar + 10,
        }}
      >
        <Alert
          onClose={() => setToast((t) => ({ ...t, open: false }))}
          severity={toast.severity}
          variant="filled"
          sx={{
            width: '100%',
            borderRadius: 2, // flat 16px for consistency
            fontWeight: 500,
            boxShadow: '0 8px 24px rgba(30,41,59,0.06)'
          }}
        >
          {toast.message}
        </Alert>
      </Snackbar>

      <Container
        maxWidth="md"
        sx={{
          position: 'relative',
          zIndex: 1,
          px: { xs: 1.5, md: 4 },
        }}
      >
        {/* Header */}
        <Fade in={true} timeout={800}>
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.3rem' },
                fontWeight: 800,
                background: isDark
                  ? gradients.blueToBlue
                  : gradients.blueToBlue,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                lineHeight: 1.15,
                fontFamily: '"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
              }}
            >
              Let's Talk
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1.1rem', md: '1.23rem' },
                color: getTextColor('secondary', isDark),
                maxWidth: { xs: 380, md: 700 },
                mx: 'auto',
                fontWeight: 400,
                lineHeight: 1.6,
              }}
            >
              Ready to optimize your industrial processes? We're here to help you get started with ChatAPC.
            </Typography>
          </Box>
        </Fade>

        {/* Form */}
        <Fade in={true} timeout={1000}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              maxWidth: 700,
              mx: 'auto',
              mb: { xs: 8, md: 12 },
              borderRadius: '20px',
              background: "transparent",
              px: { xs: 1.5, md: 4 },
              py: { xs: 2.5, md: 5 },
              backdropFilter: 'blur(20px)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Grid container spacing={{ xs: 2, sm: 3 }}>
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
                      <InputAdornment position="start" sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
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
                      <InputAdornment position="start" sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
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
                      <InputAdornment position="start" sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
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
                      <InputAdornment position="start" sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
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
                  sx={textFieldSx}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    sx: { alignItems: 'flex-start' },
                    startAdornment: (
                      <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5, display: { xs: 'none', sm: 'inline-flex' } }}>
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
                    ? gradients.blueToBlue
                    : gradients.blueToBlue,
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
                    background: '#9CA3AF',
                  },
                }}
              >
                {isLoading ? 'Sending...' : 'Submit'}
              </Button>
            </Box>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default ContactFormSection;
