import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Card, 
  CardContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Grid,
  Fade
} from '@mui/material';
import { Send, CheckCircle } from '@mui/icons-material';
import { useThemeMode } from '../../contexts/ThemeContext';

const industries = [
  'Oil & Gas',
  'Chemical Processing',
  'Manufacturing',
  'Food & Beverage',
  'Power Generation',
  'Pharmaceuticals',
  'Other',
];

const ContactFormSection: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    industry: '',
    message: '',
    privacy: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isDark } = useThemeMode();

  const handleInputChange = (field: string) => (event: any) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleCheckboxChange = (field: string) => (event: any) => {
    setFormData({
      ...formData,
      [field]: event.target.checked,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
  };

  const getFieldStyles = (isDark: boolean) => ({
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      background: isDark ? 'rgba(31, 41, 55, 0.6)' : 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease',
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
    },
    '& .MuiInputLabel-root': {
      color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(100, 116, 139, 1)',
      fontWeight: 500,
      '&.Mui-focused': {
        color: isDark ? '#3B82F6' : '#2563EB',
      },
    },
  });

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
        background: isDark
          ? 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59, 130, 246, 0.1) 0%, transparent 60%), linear-gradient(135deg, #0F1419 0%, #1A202C 50%, #0F1419 100%)'
          : 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59, 130, 246, 0.05) 0%, transparent 60%), linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 50%, #FFFFFF 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=1920&q=60')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: isDark ? 0.03 : 0.02,
          zIndex: 0,
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isDark 
            ? 'rgba(15, 20, 25, 0.95)'
            : 'rgba(255, 255, 255, 0.98)',
          zIndex: 1,
          pointerEvents: 'none',
        },
      }}
    >
      <Container 
        maxWidth="md" 
        sx={{ 
          px: { xs: 3, md: 4 },
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Header */}
        <Fade in={true} timeout={800}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.2rem' },
                fontWeight: 800,
                background: isDark
                  ? 'linear-gradient(135deg, #FFFFFF 0%, #3B82F6 50%, #8B5CF6 100%)'
                  : 'linear-gradient(135deg, #1E293B 0%, #2563EB 50%, #8B5CF6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 3,
                lineHeight: 1.1,
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            >
              Let's Start a Conversation
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(71, 85, 105, 1)',
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.6,
                fontWeight: 400,
              }}
            >
              Ready to transform your industrial operations? Tell us about your challenges 
              and we'll show you what's possible.
            </Typography>
          </Box>
        </Fade>

        {/* Contact Form */}
        <Fade in={true} timeout={1000}>
          <Card
            elevation={0}
            sx={{
              borderRadius: '20px',
              background: isDark
                ? 'rgba(31, 41, 55, 0.8)'
                : 'rgba(255, 255, 255, 0.95)',
              border: isDark
                ? '1px solid rgba(75, 85, 99, 0.3)'
                : '1px solid rgba(226, 232, 240, 0.5)',
              backdropFilter: 'blur(20px)',
              boxShadow: isDark
                ? '0 25px 60px rgba(0, 0, 0, 0.3)'
                : '0 25px 60px rgba(0, 0, 0, 0.08)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: isDark
                  ? 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)'
                  : 'linear-gradient(90deg, #2563EB 0%, #8B5CF6 100%)',
              },
            }}
          >
            <CardContent sx={{ p: { xs: 4, md: 6 } }}>
              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  {/* Name Fields */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      fullWidth
                      label="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange('firstName')}
                      sx={getFieldStyles(isDark)}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      fullWidth
                      label="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange('lastName')}
                      sx={getFieldStyles(isDark)}
                    />
                  </Grid>

                  {/* Contact Fields */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      fullWidth
                      type="email"
                      label="Business Email"
                      value={formData.email}
                      onChange={handleInputChange('email')}
                      sx={getFieldStyles(isDark)}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      type="tel"
                      label="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange('phone')}
                      sx={getFieldStyles(isDark)}
                    />
                  </Grid>

                  {/* Company Fields */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      fullWidth
                      label="Company Name"
                      value={formData.company}
                      onChange={handleInputChange('company')}
                      sx={getFieldStyles(isDark)}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel
                        sx={{
                          color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(100, 116, 139, 1)',
                          fontWeight: 500,
                          '&.Mui-focused': {
                            color: isDark ? '#3B82F6' : '#2563EB',
                          },
                        }}
                      >
                        Industry
                      </InputLabel>
                      <Select
                        value={formData.industry}
                        onChange={handleInputChange('industry')}
                        sx={{
                          borderRadius: '12px',
                          background: isDark ? 'rgba(31, 41, 55, 0.6)' : 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(10px)',
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
                          '& .MuiSelect-select': {
                            color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 41, 59, 1)',
                            fontSize: '1rem',
                          },
                        }}
                      >
                        {industries.map((industry) => (
                          <MenuItem key={industry} value={industry}>
                            {industry}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Message */}
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      multiline
                      rows={4}
                      label="Tell us about your project"
                      value={formData.message}
                      onChange={handleInputChange('message')}
                      placeholder="What challenges are you facing? What are your goals? Any specific requirements we should know about?"
                      sx={getFieldStyles(isDark)}
                    />
                  </Grid>

                  {/* Privacy Checkbox */}
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          required
                          checked={formData.privacy}
                          onChange={handleCheckboxChange('privacy')}
                          sx={{
                            color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(100, 116, 139, 1)',
                            '&.Mui-checked': {
                              color: isDark ? '#3B82F6' : '#2563EB',
                            },
                          }}
                        />
                      }
                      label={
                        <Typography
                          sx={{
                            fontSize: '0.95rem',
                            color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(71, 85, 105, 1)',
                            fontWeight: 500,
                          }}
                        >
                          I agree to the Privacy Policy and Terms of Service *
                        </Typography>
                      }
                    />
                  </Grid>

                  {/* Submit Button */}
                  <Grid item xs={12}>
                    <Box 
                      sx={{ 
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 3,
                        mt: 2,
                      }}
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={isSubmitting}
                        endIcon={<Send />}
                        sx={{
                          px: 8,
                          py: 2,
                          fontSize: '1.1rem',
                          fontWeight: 700,
                          borderRadius: '12px',
                          background: isDark
                            ? 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)'
                            : 'linear-gradient(135deg, #2563EB 0%, #8B5CF6 100%)',
                          boxShadow: isDark
                            ? '0 8px 32px rgba(59, 130, 246, 0.3)'
                            : '0 8px 32px rgba(37, 99, 235, 0.3)',
                          transition: 'all 0.3s ease',
                          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                          '&:hover:not(:disabled)': {
                            transform: 'translateY(-2px)',
                            boxShadow: isDark
                              ? '0 12px 40px rgba(59, 130, 246, 0.4)'
                              : '0 12px 40px rgba(37, 99, 235, 0.4)',
                          },
                          '&:disabled': {
                            opacity: 0.7,
                          },
                        }}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>

                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(100, 116, 139, 1)',
                        }}
                      >
                        <CheckCircle sx={{ fontSize: 20 }} />
                        <Box>
                          <Typography sx={{ 
                            fontSize: '0.9rem',
                            fontWeight: 600,
                          }}>
                            Quick Response
                          </Typography>
                          <Typography sx={{ 
                            fontSize: '0.8rem',
                            opacity: 0.8,
                          }}>
                            Within 24 hours
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
};

export default ContactFormSection;