import React, { useEffect, useRef, useState } from 'react';
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
  Chip
} from '@mui/material';
import { 
  Send, 
  CheckCircle, 
  Business,
  Engineering,
  Speed,
  Psychology
} from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

gsap.registerPlugin(ScrollTrigger);

const inquiryTypes = [
  { value: 'demo', label: 'Request Demo', icon: Speed },
  { value: 'consultation', label: 'Technical Consultation', icon: Engineering },
  { value: 'enterprise', label: 'Enterprise Sales', icon: Business },
  { value: 'ai-implementation', label: 'AI Implementation', icon: Psychology },
];

const companySizes = [
  '1-50 employees',
  '51-200 employees',
  '201-1000 employees',
  '1000+ employees',
];

const industries = [
  'Oil & Gas',
  'Chemical Processing',
  'Pharmaceuticals',
  'Food & Beverage',
  'Power Generation',
  'Mining & Metals',
  'Pulp & Paper',
  'Water Treatment',
  'Other',
];

const ContactFormSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const typesRef = useRef<HTMLDivElement[]>([]);
  const [selectedType, setSelectedType] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    jobTitle: '',
    phone: '',
    industry: '',
    companySize: '',
    message: '',
    newsletter: false,
    privacy: false,
  });
  const { isDark } = useThemeMode();
  const { 
    h2FontSize,
    containerMaxWidth,
    containerPadding 
  } = useResponsiveLayout();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Form animation
      if (formRef.current) {
        gsap.from(formRef.current, {
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      }

      // Inquiry types animation
      typesRef.current.forEach((type, index) => {
        if (type) {
          gsap.from(type, {
            scrollTrigger: {
              trigger: type,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power2.out',
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Form submitted:', { ...formData, inquiryType: selectedType });
  };

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        py: 'clamp(3rem, 8vw, 6rem)',
        background: isDark
          ? 'linear-gradient(180deg, rgba(17, 24, 39, 1) 0%, rgba(31, 41, 55, 1) 100%)'
          : 'linear-gradient(180deg, rgba(248, 250, 252, 1) 0%, rgba(255, 255, 255, 1) 100%)',
        position: 'relative',
        transition: 'background 0.3s ease',
      }}
    >
      <Container 
        maxWidth="lg"
        sx={{
          maxWidth: containerMaxWidth,
          px: containerPadding,
        }}
      >
        {/* Section Header */}
        <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 6, md: 8 },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: h2FontSize,
              fontWeight: 700,
              color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(30, 41, 59, 1)',
              mb: 3,
              lineHeight: 1.2,
              transition: 'color 0.3s ease',
            }}
          >
            Tell Us About Your Project
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(71, 85, 105, 1)',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6,
              transition: 'color 0.3s ease',
            }}
          >
            Share your challenges, and we'll show you how ChatAPC can transform your operations
          </Typography>
        </Box>

        {/* Inquiry Types */}
        <Box
          sx={{
            mb: { xs: 6, md: 8 },
          }}
        >
          <Typography
            sx={{
              fontSize: '1.2rem',
              fontWeight: 600,
              color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 41, 59, 1)',
              mb: 3,
              textAlign: 'center',
              transition: 'color 0.3s ease',
            }}
          >
            What brings you here today?
          </Typography>

          <Grid container spacing={{ xs: 2, md: 3 }}>
            {inquiryTypes.map((type, index) => {
              const IconComponent = type.icon;
              const isSelected = selectedType === type.value;
              return (
                <Grid
                  item
                  xs={6}
                  md={3}
                  key={type.value}
                  ref={(el) => {
                    if (el) typesRef.current[index] = el as HTMLDivElement;
                  }}
                >
                  <Card
                    elevation={isDark ? 0 : 4}
                    sx={{
                      cursor: 'pointer',
                      borderRadius: '12px',
                      background: isSelected 
                        ? (isDark 
                          ? 'linear-gradient(135deg, rgba(0, 155, 228, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)'
                          : 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)')
                        : (isDark 
                          ? 'rgba(31, 41, 55, 0.8)'
                          : 'rgba(255, 255, 255, 0.95)'),
                      border: isSelected
                        ? (isDark ? '2px solid #009BE4' : '2px solid #2563EB')
                        : (isDark ? '1px solid rgba(75, 85, 99, 0.3)' : '1px solid rgba(226, 232, 240, 1)'),
                      backdropFilter: 'blur(20px)',
                      transition: 'all 0.3s ease',
                      height: '100%',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        borderColor: isDark ? '#009BE4' : '#2563EB',
                      },
                    }}
                    onClick={() => setSelectedType(type.value)}
                  >
                    <CardContent
                      sx={{
                        p: { xs: 2, md: 3 },
                        textAlign: 'center',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '@media (min-width: 960px) and (max-width: 1549px)': {
                          p: 2.5,
                        },
                      }}
                    >
                      <IconComponent
                        sx={{
                          fontSize: { xs: 32, md: 36 },
                          color: isSelected 
                            ? (isDark ? '#009BE4' : '#2563EB')
                            : (isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(100, 116, 139, 1)'),
                          mb: 2,
                          transition: 'color 0.3s ease',
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: { xs: '0.9rem', md: '1rem' },
                          fontWeight: 600,
                          color: isSelected
                            ? (isDark ? '#009BE4' : '#2563EB')
                            : (isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 41, 59, 1)'),
                          textAlign: 'center',
                          lineHeight: 1.3,
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {type.label}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        {/* Contact Form */}
        <Card
          ref={formRef}
          elevation={isDark ? 0 : 16}
          sx={{
            borderRadius: '20px',
            background: isDark
              ? 'rgba(31, 41, 55, 0.9)'
              : 'rgba(255, 255, 255, 0.95)',
            border: isDark
              ? '1px solid rgba(75, 85, 99, 0.3)'
              : 'none',
            backdropFilter: 'blur(30px)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: -2,
              left: -2,
              right: -2,
              bottom: -2,
              background: isDark
                ? 'linear-gradient(135deg, rgba(0, 155, 228, 0.3) 0%, rgba(139, 92, 246, 0.3) 100%)'
                : 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
              borderRadius: '20px',
              opacity: 0,
              zIndex: -1,
              transition: 'opacity 0.3s ease',
            },
            '&:hover::before': {
              opacity: 0.5,
            },
          }}
        >
          <CardContent
            sx={{
              p: { xs: 4, md: 6 },
              '@media (min-width: 960px) and (max-width: 1549px)': {
                p: 5,
              },
            }}
          >
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
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        background: isDark ? 'rgba(17, 24, 39, 0.8)' : 'rgba(248, 250, 252, 0.8)',
                        '& fieldset': {
                          borderColor: isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(226, 232, 240, 1)',
                        },
                        '&:hover fieldset': {
                          borderColor: isDark ? '#009BE4' : '#2563EB',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: isDark ? '#009BE4' : '#2563EB',
                        },
                        '& input': {
                          color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 41, 59, 1)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(100, 116, 139, 1)',
                        '&.Mui-focused': {
                          color: isDark ? '#009BE4' : '#2563EB',
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    fullWidth
                    label="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange('lastName')}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        background: isDark ? 'rgba(17, 24, 39, 0.8)' : 'rgba(248, 250, 252, 0.8)',
                        '& fieldset': {
                          borderColor: isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(226, 232, 240, 1)',
                        },
                        '&:hover fieldset': {
                          borderColor: isDark ? '#009BE4' : '#2563EB',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: isDark ? '#009BE4' : '#2563EB',
                        },
                        '& input': {
                          color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 41, 59, 1)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(100, 116, 139, 1)',
                        '&.Mui-focused': {
                          color: isDark ? '#009BE4' : '#2563EB',
                        },
                      },
                    }}
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
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        background: isDark ? 'rgba(17, 24, 39, 0.8)' : 'rgba(248, 250, 252, 0.8)',
                        '& fieldset': {
                          borderColor: isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(226, 232, 240, 1)',
                        },
                        '&:hover fieldset': {
                          borderColor: isDark ? '#009BE4' : '#2563EB',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: isDark ? '#009BE4' : '#2563EB',
                        },
                        '& input': {
                          color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 41, 59, 1)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(100, 116, 139, 1)',
                        '&.Mui-focused': {
                          color: isDark ? '#009BE4' : '#2563EB',
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="tel"
                    label="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange('phone')}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        background: isDark ? 'rgba(17, 24, 39, 0.8)' : 'rgba(248, 250, 252, 0.8)',
                        '& fieldset': {
                          borderColor: isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(226, 232, 240, 1)',
                        },
                        '&:hover fieldset': {
                          borderColor: isDark ? '#009BE4' : '#2563EB',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: isDark ? '#009BE4' : '#2563EB',
                        },
                        '& input': {
                          color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 41, 59, 1)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(100, 116, 139, 1)',
                        '&.Mui-focused': {
                          color: isDark ? '#009BE4' : '#2563EB',
                        },
                      },
                    }}
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
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        background: isDark ? 'rgba(17, 24, 39, 0.8)' : 'rgba(248, 250, 252, 0.8)',
                        '& fieldset': {
                          borderColor: isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(226, 232, 240, 1)',
                        },
                        '&:hover fieldset': {
                          borderColor: isDark ? '#009BE4' : '#2563EB',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: isDark ? '#009BE4' : '#2563EB',
                        },
                        '& input': {
                          color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 41, 59, 1)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(100, 116, 139, 1)',
                        '&.Mui-focused': {
                          color: isDark ? '#009BE4' : '#2563EB',
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Job Title"
                    value={formData.jobTitle}
                    onChange={handleInputChange('jobTitle')}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        background: isDark ? 'rgba(17, 24, 39, 0.8)' : 'rgba(248, 250, 252, 0.8)',
                        '& fieldset': {
                          borderColor: isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(226, 232, 240, 1)',
                        },
                        '&:hover fieldset': {
                          borderColor: isDark ? '#009BE4' : '#2563EB',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: isDark ? '#009BE4' : '#2563EB',
                        },
                        '& input': {
                          color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 41, 59, 1)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(100, 116, 139, 1)',
                        '&.Mui-focused': {
                          color: isDark ? '#009BE4' : '#2563EB',
                        },
                      },
                    }}
                  />
                </Grid>

                {/* Industry & Company Size */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel
                      sx={{
                        color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(100, 116, 139, 1)',
                        '&.Mui-focused': {
                          color: isDark ? '#009BE4' : '#2563EB',
                        },
                      }}
                    >
                      Industry
                    </InputLabel>
                    <Select
                      value={formData.industry}
                      onChange={handleInputChange('industry')}
                      sx={{
                        borderRadius: '8px',
                        background: isDark ? 'rgba(17, 24, 39, 0.8)' : 'rgba(248, 250, 252, 0.8)',
                        '& fieldset': {
                          borderColor: isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(226, 232, 240, 1)',
                        },
                        '&:hover fieldset': {
                          borderColor: isDark ? '#009BE4' : '#2563EB',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: isDark ? '#009BE4' : '#2563EB',
                        },
                        '& .MuiSelect-select': {
                          color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 41, 59, 1)',
                        },
                        '& .MuiSelect-icon': {
                          color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(100, 116, 139, 1)',
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

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel
                      sx={{
                        color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(100, 116, 139, 1)',
                        '&.Mui-focused': {
                          color: isDark ? '#009BE4' : '#2563EB',
                        },
                      }}
                    >
                      Company Size
                    </InputLabel>
                    <Select
                      value={formData.companySize}
                      onChange={handleInputChange('companySize')}
                      sx={{
                        borderRadius: '8px',
                        background: isDark ? 'rgba(17, 24, 39, 0.8)' : 'rgba(248, 250, 252, 0.8)',
                        '& fieldset': {
                          borderColor: isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(226, 232, 240, 1)',
                        },
                        '&:hover fieldset': {
                          borderColor: isDark ? '#009BE4' : '#2563EB',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: isDark ? '#009BE4' : '#2563EB',
                        },
                        '& .MuiSelect-select': {
                          color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 41, 59, 1)',
                        },
                        '& .MuiSelect-icon': {
                          color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(100, 116, 139, 1)',
                        },
                      }}
                    >
                      {companySizes.map((size) => (
                        <MenuItem key={size} value={size}>
                          {size}
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
                    rows={5}
                    label="Tell us about your challenges and goals"
                    value={formData.message}
                    onChange={handleInputChange('message')}
                    placeholder="What process optimization challenges are you facing? What are your key objectives? Any specific requirements or constraints we should know about?"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        background: isDark ? 'rgba(17, 24, 39, 0.8)' : 'rgba(248, 250, 252, 0.8)',
                        '& fieldset': {
                          borderColor: isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(226, 232, 240, 1)',
                        },
                        '&:hover fieldset': {
                          borderColor: isDark ? '#009BE4' : '#2563EB',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: isDark ? '#009BE4' : '#2563EB',
                        },
                        '& textarea': {
                          color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 41, 59, 1)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(100, 116, 139, 1)',
                        '&.Mui-focused': {
                          color: isDark ? '#009BE4' : '#2563EB',
                        },
                      },
                    }}
                  />
                </Grid>

                {/* Checkboxes */}
                <Grid item xs={12}>
                  <Box sx={{ mt: 2, mb: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.newsletter}
                          onChange={handleCheckboxChange('newsletter')}
                          sx={{
                            color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(100, 116, 139, 1)',
                            '&.Mui-checked': {
                              color: isDark ? '#009BE4' : '#2563EB',
                            },
                          }}
                        />
                      }
                      label={
                        <Typography
                          sx={{
                            fontSize: '0.9rem',
                            color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(71, 85, 105, 1)',
                          }}
                        >
                          Subscribe to our newsletter for the latest industrial AI insights
                        </Typography>
                      }
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          required
                          checked={formData.privacy}
                          onChange={handleCheckboxChange('privacy')}
                          sx={{
                            color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(100, 116, 139, 1)',
                            '&.Mui-checked': {
                              color: isDark ? '#009BE4' : '#2563EB',
                            },
                          }}
                        />
                      }
                      label={
                        <Typography
                          sx={{
                            fontSize: '0.9rem',
                            color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(71, 85, 105, 1)',
                          }}
                        >
                          I agree to the Privacy Policy and Terms of Service *
                        </Typography>
                      }
                    />
                  </Box>
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 2,
                      mt: 2,
                    }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      endIcon={<Send />}
                      sx={{
                        px: 6,
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        borderRadius: '12px',
                        background: isDark
                          ? 'linear-gradient(135deg, #009BE4 0%, #0EA5E9 100%)'
                          : 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                        boxShadow: isDark
                          ? '0 8px 32px rgba(0, 155, 228, 0.3)'
                          : '0 8px 32px rgba(37, 99, 235, 0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: isDark
                            ? '0 12px 40px rgba(0, 155, 228, 0.4)'
                            : '0 12px 40px rgba(37, 99, 235, 0.4)',
                          background: isDark
                            ? 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)'
                            : 'linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%)',
                        },
                      }}
                    >
                      Send Message
                    </Button>

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(100, 116, 139, 1)',
                      }}
                    >
                      <CheckCircle sx={{ fontSize: 16 }} />
                      <Typography sx={{ fontSize: '0.85rem' }}>
                        We'll respond within 24 hours
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>

        {/* Selected Inquiry Type Display */}
        {selectedType && (
          <Box
            sx={{
              mt: 4,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Chip
              label={`Inquiry: ${inquiryTypes.find(t => t.value === selectedType)?.label}`}
              color="primary"
              sx={{
                fontSize: '0.9rem',
                fontWeight: 600,
                px: 2,
                py: 1,
                background: isDark
                  ? 'linear-gradient(135deg, rgba(0, 155, 228, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)'
                  : 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                color: isDark ? '#009BE4' : '#2563EB',
              }}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ContactFormSection;