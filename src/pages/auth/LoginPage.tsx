import React, { useEffect, useRef, useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Container,
  Link,
  Divider,
  IconButton,
  InputAdornment
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { 
  Visibility, 
  VisibilityOff, 
  Email, 
  Lock,
  ArrowBack
} from '@mui/icons-material';
import { gsap } from 'gsap';
import { AppSidebar } from '../../components/layout';
import { sidebarItems } from '../../data/layout/sidebarData';
import { useThemeMode } from '../../contexts/ThemeContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { isDark } = useThemeMode();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial page load animation
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Header animation
      gsap.from(headerRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.6,
        delay: 0.2,
        ease: 'power3.out'
      });

      // Form animation
      gsap.from(formRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: 0.4,
        ease: 'power3.out'
      });
    }, containerRef);

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
    // Handle login logic here
    console.log('Login attempt:', formData);
    // For now, redirect to home page after login
    navigate('/');
  };

  const getTextFieldStyles = () => ({
    '& .MuiOutlinedInput-root': {
      background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
      borderRadius: 3,
      '& fieldset': {
        border: isDark 
          ? '1px solid rgba(255, 255, 255, 0.1)'
          : '1px solid rgba(0, 0, 0, 0.15)',
      },
      '&:hover fieldset': {
        border: isDark 
          ? '1px solid rgba(0, 155, 228, 0.3)'
          : '1px solid rgba(0, 155, 228, 0.4)',
      },
      '&.Mui-focused fieldset': {
        border: isDark 
          ? '1px solid rgba(0, 155, 228, 0.5)'
          : '1px solid rgba(0, 155, 228, 0.6)',
      },
    },
    '& .MuiInputLabel-root': {
      color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
    },
    '& .MuiInputBase-input': {
      color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.87)',
    },
  });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: isDark 
          ? 'linear-gradient(135deg, #0a0e2e 0%, #0d1842 50%, #0a0e2e 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 50%, #e2e8f0 100%)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.3s ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isDark
            ? 'radial-gradient(circle at 20% 20%, rgba(0, 155, 228, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(106, 17, 203, 0.08) 0%, transparent 50%)'
            : 'radial-gradient(circle at 20% 20%, rgba(0, 155, 228, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(37, 99, 235, 0.04) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      {/* Sidebar */}
      <AppSidebar items={sidebarItems} />

      {/* Main Content */}
      <Box
        ref={containerRef}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: { xs: 2, md: 4 },
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Container maxWidth="sm">
          {/* Back Button */}
          <Box sx={{ mb: 4 }}>
            <IconButton
              onClick={() => navigate('/')}
              sx={{
                color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                '&:hover': {
                  color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
                  backgroundColor: isDark 
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(0, 0, 0, 0.05)',
                },
              }}
            >
              <ArrowBack />
            </IconButton>
          </Box>

          {/* Header */}
          <Box ref={headerRef} sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                mb: 2,
                background: 'linear-gradient(135deg, #009BE4 0%, #6A11CB 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Welcome Back
            </Typography>
            <Typography
              sx={{
                fontSize: '1.1rem',
                color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                maxWidth: 400,
                mx: 'auto',
              }}
            >
              Sign in to your ChatAPC account to continue
            </Typography>
          </Box>

          {/* Login Form */}
          <Box
            ref={formRef}
            component="form"
            onSubmit={handleSubmit}
            sx={{
              background: isDark 
                ? 'rgba(255, 255, 255, 0.03)'
                : 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              border: isDark 
                ? '1px solid rgba(255, 255, 255, 0.1)'
                : '1px solid rgba(0, 0, 0, 0.08)',
              borderRadius: 4,
              padding: { xs: 3, md: 4 },
              boxShadow: isDark 
                ? '0 20px 60px rgba(0, 0, 0, 0.3)'
                : '0 20px 60px rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* Email Field */}
            <TextField
              fullWidth
              name="email"
              type="email"
              label="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
              sx={{
                mb: 3,
                ...getTextFieldStyles(),
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: '#009BE4' }} />
                  </InputAdornment>
                ),
              }}
            />

            {/* Password Field */}
            <TextField
              fullWidth
              name="password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
              sx={{
                mb: 4,
                ...getTextFieldStyles(),
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: '#009BE4' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ 
                        color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Forgot Password */}
            <Box sx={{ textAlign: 'right', mb: 3 }}>
              <Link
                component="button"
                onClick={() => console.log('Forgot password clicked')}
                sx={{
                  color: '#009BE4',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Forgot your password?
              </Link>
            </Box>

            {/* Login Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                background: 'linear-gradient(135deg, #009BE4 0%, #0077B6 100%)',
                color: '#fff',
                borderRadius: 3,
                padding: '16px',
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none',
                mb: 3,
                boxShadow: '0 8px 32px rgba(0, 155, 228, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'linear-gradient(135deg, #0077B6 0%, #005A87 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 40px rgba(0, 155, 228, 0.4)',
                },
              }}
            >
              Sign In
            </Button>

            {/* Divider */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Divider sx={{ 
                flex: 1, 
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.12)',
              }} />
              <Typography
                sx={{
                  color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                  px: 2,
                  fontSize: '0.9rem',
                }}
              >
                OR
              </Typography>
              <Divider sx={{ 
                flex: 1, 
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.12)',
              }} />
            </Box>

            {/* Sign Up Link */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                sx={{
                  color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                  fontSize: '0.95rem',
                }}
              >
                Don't have an account?{' '}
                <Link
                  component="button"
                  onClick={() => navigate('/signup')}
                  sx={{
                    color: '#009BE4',
                    textDecoration: 'none',
                    fontWeight: 500,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Sign up
                </Link>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LoginPage;
