import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Typography,
  TextField,
  Grid,
  InputAdornment,
  Alert,
} from '@mui/material';
import { Person, Email, Business, Send } from '@mui/icons-material';
import { useThemeMode } from '../../contexts/ThemeContext';
import { getGradient, themeConfig } from '../shared/themeConfig';

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  company: string;
}

interface UserTourAccessDialogProps {
  open: boolean;
  onAccessGranted: () => void;
}

const HUBSPOT_CONFIG = {
  portalId: '146813965',
  formGuid: 'a0ae049f-1210-4515-afa2-8662e64d08d1',
  region: 'eu1',
};

export const UserTourAccessDialog: React.FC<UserTourAccessDialogProps> = ({
  open,
  onAccessGranted,
}) => {
  const { isDark } = useThemeMode();
  const { gradients } = themeConfig;

  const [formData, setFormData] = useState<FormData>({
    firstname: '',
    lastname: '',
    email: '',
    company: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError('');
  };

  const validateForm = (): string => {
    if (!formData.firstname.trim()) return 'Please enter your first name';
    if (!formData.lastname.trim()) return 'Please enter your last name';
    if (!formData.email.trim()) return 'Please enter your email';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Please enter a valid email';
    if (!formData.company.trim()) return 'Please enter your company';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      setFormError(error);
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    try {
      const hubspotPayload = {
        fields: [
          { name: 'firstname', value: formData.firstname.trim() },
          { name: 'lastname', value: formData.lastname.trim() },
          { name: 'email', value: formData.email.trim() },
          { name: 'company', value: formData.company.trim() },
        ],
        context: {
          pageUri: window.location.href,
          pageName: 'ChatAPC Product Tour',
        },
      };

      const response = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_CONFIG.portalId}/${HUBSPOT_CONFIG.formGuid}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(hubspotPayload),
        }
      );

      if (response.ok) {
        onAccessGranted();
        setFormData({ firstname: '', lastname: '', email: '', company: '' });
      } else {
        setFormError('Unable to submit. Please try again.');
      }
    } catch (error) {
      setFormError('Connection error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const secondaryTextColor = isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(71, 85, 105, 1)';

  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.8)',
      borderRadius: '10px',
      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      '& fieldset': {
        borderColor: isDark ? 'rgba(71, 85, 105, 0.4)' : 'rgba(203, 213, 225, 0.8)',
        borderWidth: '1.5px',
        transition: 'all 0.25s ease',
      },
      '&:hover': {
        backgroundColor: isDark ? 'rgba(30, 41, 59, 0.7)' : 'rgba(255, 255, 255, 0.95)',
        '& fieldset': {
          borderColor: isDark ? 'rgba(99, 102, 241, 0.5)' : 'rgba(59, 130, 246, 0.6)',
        },
      },
      '&.Mui-focused': {
        backgroundColor: isDark ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 1)',
        '& fieldset': {
          borderColor: isDark ? 'rgba(99, 102, 241, 0.8)' : 'rgba(37, 99, 235, 0.8)',
          borderWidth: '2px',
        },
      },
      '&.Mui-disabled': {
        backgroundColor: isDark ? 'rgba(30, 41, 59, 0.3)' : 'rgba(241, 245, 249, 0.6)',
        opacity: 0.6,
      },
    },
    '& .MuiInputLabel-root': {
      color: isDark ? 'rgba(203, 213, 225, 0.7)' : 'rgba(71, 85, 105, 0.8)',
      fontWeight: 500,
      fontSize: '0.95rem',
      '&.Mui-focused': {
        color: isDark ? 'rgba(147, 197, 253, 0.95)' : 'rgba(37, 99, 235, 0.9)',
        fontWeight: 600,
      },
    },
    '& .MuiInputBase-input': {
      color: isDark ? 'rgba(248, 250, 252, 0.95)' : 'rgba(15, 23, 42, 0.9)',
      fontSize: '0.95rem',
      fontWeight: 500,
      '&::placeholder': {
        color: isDark ? 'rgba(148, 163, 184, 0.5)' : 'rgba(100, 116, 139, 0.5)',
        opacity: 1,
      },
    },
  };

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
      disableEscapeKeyDown
      // إزالة الـ close على الـ backdrop عشان اليوزر مايقدرش يهرب من الفورم
      onClose={(event, reason) => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
          return;
        }
      }}
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: isDark
            ? 'linear-gradient(145deg, rgba(17, 24, 39, 0.98) 0%, rgba(30, 41, 59, 0.98) 100%)'
            : 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(249, 250, 251, 0.98) 100%)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${isDark ? 'rgba(99, 102, 241, 0.25)' : 'rgba(148, 163, 184, 0.2)'}`,
          boxShadow: isDark
            ? '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(99, 102, 241, 0.1) inset'
            : '0 25px 50px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.8) inset',
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
          backdropFilter: 'blur(2px)',
        },
      }}
    >
      <DialogContent sx={{ pt: 4, pb: 4, px: { xs: 3, sm: 4 } }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 1,
              fontSize: { xs: '1.5rem', sm: '1.75rem' },
              background: getGradient(gradients.blueToPurple, isDark),
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.01em',
            }}
          >
            Access Product Tour
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: secondaryTextColor,
              maxWidth: 420,
              mx: 'auto',
              fontSize: '0.95rem',
              lineHeight: 1.6,
              transition: 'color 0.3s ease',
            }}
          >
            Enter your details to explore the interactive ChatAPC demo
          </Typography>
        </Box>

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                name="firstname"
                label="First Name"
                placeholder="John"
                value={formData.firstname}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                autoComplete="given-name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person
                        sx={{
                          fontSize: 20,
                          color: isDark ? 'rgba(147, 197, 253, 0.7)' : 'rgba(37, 99, 235, 0.7)',
                          transition: 'color 0.2s ease',
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={textFieldStyles}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                name="lastname"
                label="Last Name"
                placeholder="Doe"
                value={formData.lastname}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                autoComplete="family-name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person
                        sx={{
                          fontSize: 20,
                          color: isDark ? 'rgba(147, 197, 253, 0.7)' : 'rgba(37, 99, 235, 0.7)',
                          transition: 'color 0.2s ease',
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={textFieldStyles}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                name="email"
                label="Work Email"
                type="email"
                placeholder="john.doe@company.com"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                autoComplete="email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email
                        sx={{
                          fontSize: 20,
                          color: isDark ? 'rgba(147, 197, 253, 0.7)' : 'rgba(37, 99, 235, 0.7)',
                          transition: 'color 0.2s ease',
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={textFieldStyles}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                name="company"
                label="Company"
                placeholder="Your Organization"
                value={formData.company}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                autoComplete="organization"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Business
                        sx={{
                          fontSize: 20,
                          color: isDark ? 'rgba(147, 197, 253, 0.7)' : 'rgba(37, 99, 235, 0.7)',
                          transition: 'color 0.2s ease',
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={textFieldStyles}
              />
            </Grid>
          </Grid>

          {/* Error Message */}
          {formError && (
            <Alert
              severity="error"
              sx={{
                mt: 2.5,
                py: 1,
                borderRadius: '10px',
                backgroundColor: isDark ? 'rgba(220, 38, 38, 0.15)' : 'rgba(254, 226, 226, 0.8)',
                border: `1px solid ${isDark ? 'rgba(239, 68, 68, 0.3)' : 'rgba(220, 38, 38, 0.2)'}`,
                '& .MuiAlert-icon': {
                  color: isDark ? 'rgba(248, 113, 113, 0.9)' : 'rgba(220, 38, 38, 0.9)',
                },
                '& .MuiAlert-message': {
                  color: isDark ? 'rgba(254, 202, 202, 0.95)' : 'rgba(127, 29, 29, 0.9)',
                  fontWeight: 500,
                },
              }}
            >
              {formError}
            </Alert>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isSubmitting}
            endIcon={isSubmitting ? <CircularProgress size={18} sx={{ color: '#fff' }} /> : <Send />}
            sx={{
              mt: 3.5,
              py: 1.5,
              fontWeight: 700,
              textTransform: 'none',
              fontSize: '1.05rem',
              borderRadius: '10px',
              letterSpacing: '0.3px',
              background: isDark
                ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.9) 0%, rgba(139, 92, 246, 0.9) 100%)'
                : 'linear-gradient(135deg, rgba(37, 99, 235, 1) 0%, rgba(59, 130, 246, 1) 100%)',
              boxShadow: isDark
                ? '0 10px 30px rgba(99, 102, 241, 0.4), 0 0 0 1px rgba(99, 102, 241, 0.2) inset'
                : '0 10px 30px rgba(37, 99, 235, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.3) inset',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover:not(:disabled)': {
                transform: 'translateY(-2px)',
                boxShadow: isDark
                  ? '0 15px 40px rgba(99, 102, 241, 0.5), 0 0 0 1px rgba(99, 102, 241, 0.3) inset'
                  : '0 15px 40px rgba(37, 99, 235, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.4) inset',
              },
              '&:active:not(:disabled)': {
                transform: 'translateY(0px)',
              },
              '&:disabled': {
                opacity: 0.6,
                background: isDark ? 'rgba(71, 85, 105, 0.5)' : 'rgba(148, 163, 184, 0.5)',
                boxShadow: 'none',
              },
            }}
          >
            {isSubmitting ? 'Submitting...' : 'Get Instant Access'}
          </Button>
        </Box>

      </DialogContent>
    </Dialog>
  );
};