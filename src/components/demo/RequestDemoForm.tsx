import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Snackbar,
  Alert,
  InputAdornment,
  Slide,
  Fade,
  CircularProgress,
} from '@mui/material';
import { Person, Email, Business, Send } from '@mui/icons-material';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useHubSpot } from '../../hooks/useHubSpot';

type ToastState = {
  open: boolean;
  severity: 'success' | 'error';
  message: string;
};

const initialFormState = {
  firstname: '',
  lastname: '',
  company: '',
  email: '',
};

const RequestDemoForm: React.FC = () => {
  const { isDark } = useThemeMode();
  const { submitToHubSpot, isLoading, error: hubspotError } = useHubSpot();
  const [formData, setFormData] = useState(initialFormState);
  const [toast, setToast] = useState<ToastState>({
    open: false,
    severity: 'success',
    message: '',
  });

  const textFieldSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      background: isDark ? 'rgba(31, 41, 55, 0.6)' : 'rgba(255, 255, 255, 0.94)',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
      '& fieldset': {
        borderColor: isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(226, 232, 240, 0.8)',
      },
      '&:hover fieldset': {
        borderColor: isDark ? 'rgba(59, 130, 246, 0.55)' : 'rgba(37, 99, 235, 0.55)',
      },
      '&.Mui-focused fieldset': {
        borderColor: isDark ? '#3B82F6' : '#2563EB',
        borderWidth: '2px',
      },
      '& input, & textarea': {
        color: isDark ? 'rgba(255, 255, 255, 0.92)' : '#1E293B',
        fontSize: '1rem',
      },
      '& input:-webkit-autofill': {
        WebkitBoxShadow: `0 0 0 1000px ${isDark ? 'rgba(31, 41, 55, 0.6)' : 'rgba(255, 255, 255, 0.94)'} inset`,
        WebkitTextFillColor: isDark ? 'rgba(255, 255, 255, 0.92)' : '#1E293B',
      },
    },
    '& .MuiInputLabel-root': {
      color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#64748B',
      fontWeight: 500,
      '&.Mui-focused': {
        color: isDark ? '#60A5FA' : '#2563EB',
      },
    },
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    if (!formData.firstname.trim()) return 'Please enter your first name.';
    if (!formData.lastname.trim()) return 'Please enter your last name.';
    if (!formData.company.trim()) return 'Please enter your company.';
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    if (!emailOk) return 'Please enter a valid work email.';
    return '';
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validationMessage = validate();
    if (validationMessage) {
      setToast({ open: true, severity: 'error', message: validationMessage });
      return;
    }

    const payload = {
      firstname: formData.firstname.trim(),
      lastname: formData.lastname.trim(),
      email: formData.email.trim(),
      phone: '',
      company: formData.company.trim(),
      jobtitle: '',
      industry: '',
      message: 'Request a demo from the ChatAPC website.',
      plant_size: '',
      primary_challenge: '',
      current_systems: '',
      website: '',
      lead_status: 'new',
      lead_source: 'Request Demo Form',
    };

    const success = await submitToHubSpot(payload, {
      formGuid: 'a0ae049f-1210-4515-afa2-8662e64d08d1',
      portalId: '146813965',
      region: 'eu1',
      pageName: 'ChatAPC Demo Request',
      pageUri: window.location.href,
    });

    if (success) {
      setToast({
        open: true,
        severity: 'success',
        message: 'Thanks! A member of the ChatAPC team will reach out shortly to schedule your demo.',
      });
      setFormData(initialFormState);
    } else {
      setToast({
        open: true,
        severity: 'error',
        message: hubspotError || 'Unable to submit your request right now. Please try again.',
      });
    }
  };

  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        py: { xs: 8, md: 12 },
        background: 'transparent',
        transition: 'background 0.3s ease',
        position: 'relative',
      }}
    >
      <Snackbar
        open={toast.open}
        autoHideDuration={5000}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        TransitionComponent={Slide}
        TransitionProps={{ direction: 'down' } as any}
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 32 },
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: (theme) => theme.zIndex.snackbar + 10,
        }}
      >
        <Alert
          onClose={() => setToast((prev) => ({ ...prev, open: false }))}
          severity={toast.severity}
          variant="filled"
          sx={{
            borderRadius: 2,
            fontWeight: 500,
            boxShadow: '0 8px 24px rgba(15, 23, 42, 0.12)',
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
        <Fade in timeout={800}>
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.45rem', md: '3.2rem' },
                fontWeight: 800,
                background: 'linear-gradient(90deg, #2563EB 0%, #3B82F6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1.15,
                mb: 2,
                letterSpacing: '-0.01em',
              }}
            >
              Request a Live ChatAPC Demo
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1.05rem', md: '1.2rem' },
                color: isDark ? 'rgba(226, 232, 240, 0.72)' : '#475569',
                maxWidth: 720,
                mx: 'auto',
                lineHeight: 1.65,
              }}
            >
              Share your contact details and we&apos;ll coordinate a tailored walkthrough of ChatAPC for your operations team.
            </Typography>
          </Box>
        </Fade>

        <Fade in timeout={1000}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              maxWidth: 720,
              mx: 'auto',
              background: isDark ? 'rgba(15, 23, 42, 0.65)' : 'rgba(255, 255, 255, 0.96)',
              borderRadius: '20px',
              px: { xs: 2, md: 5 },
              py: { xs: 3, md: 5 },
              boxShadow: isDark
                ? '0 18px 45px rgba(15, 23, 42, 0.55)'
                : '0 18px 45px rgba(15, 23, 42, 0.12)',
              backdropFilter: 'blur(14px)',
            }}
          >
            <Grid container spacing={{ xs: 2, sm: 3 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="firstname"
                  label="First Name *"
                  placeholder="Alex"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  required
                  autoComplete="given-name"
                  sx={textFieldSx}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
                        <Person sx={{ color: '#2563EB', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="lastname"
                  label="Last Name *"
                  placeholder="Martinez"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  required
                  autoComplete="family-name"
                  sx={textFieldSx}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
                        <Person sx={{ color: '#2563EB', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="company"
                  label="Company *"
                  placeholder="Your organization"
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                  autoComplete="organization"
                  sx={textFieldSx}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
                        <Business sx={{ color: '#2563EB', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="email"
                  label="Work Email *"
                  type="email"
                  placeholder="alex.martinez@company.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  autoComplete="email"
                  sx={textFieldSx}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
                        <Email sx={{ color: '#2563EB', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: { xs: 4, md: 5 } }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isLoading}
                endIcon={
                  isLoading ? (
                    <CircularProgress size={18} sx={{ color: '#fff' }} />
                  ) : (
                    <Send />
                  )
                }
                sx={{
                  py: 1.75,
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  borderRadius: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.6px',
                  background: 'linear-gradient(90deg, #2563EB 0%, #3B82F6 100%)',
                  boxShadow: isDark
                    ? '0 16px 40px rgba(37, 99, 235, 0.38)'
                    : '0 18px 42px rgba(37, 99, 235, 0.32)',
                  '&:hover:not(:disabled)': {
                    transform: 'translateY(-2px)',
                    boxShadow: isDark
                      ? '0 20px 45px rgba(37, 99, 235, 0.45)'
                      : '0 22px 50px rgba(37, 99, 235, 0.4)',
                  },
                  '&:disabled': {
                    opacity: 0.75,
                    background: '#9CA3AF',
                  },
                }}
              >
                {isLoading ? 'Submitting...' : 'Request Demo'}
              </Button>
            </Box>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default RequestDemoForm;
