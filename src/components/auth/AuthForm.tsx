import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography,
  InputAdornment,
  IconButton
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  Email, 
  Lock,
  Person
} from '@mui/icons-material';

interface AuthFormProps {
  type: 'login' | 'signup';
  onSubmit: (data: any) => void;
  loading?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit, loading = false }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isLogin = type === 'login';

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      {/* Name Fields - Only for Signup */}
      {!isLogin && (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            name="firstName"
            label="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            sx={{
              flex: 1,
              '& .MuiOutlinedInput-root': {
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '4px',
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
          <TextField
            name="lastName"
            label="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            sx={{
              flex: 1,
              '& .MuiOutlinedInput-root': {
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '4px',
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
          />
        </Box>
      )}

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
          '& .MuiOutlinedInput-root': {
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '4px',
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
          '& .MuiOutlinedInput-root': {
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '4px',
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
              <Lock sx={{ color: 'rgba(0, 155, 228, 0.7)' }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Confirm Password Field - Only for Signup */}
      {!isLogin && (
        <TextField
          fullWidth
          name="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          label="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '4px',
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
                <Lock sx={{ color: 'rgba(0, 155, 228, 0.7)' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                  sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
        sx={{
          background: 'linear-gradient(135deg, #009BE4 0%, #0077B6 100%)',
          color: '#fff',
              borderRadius: '4px',
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
          '&:disabled': {
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'rgba(255, 255, 255, 0.3)',
          },
        }}
      >
        {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
      </Button>
    </Box>
  );
};

export default AuthForm;
