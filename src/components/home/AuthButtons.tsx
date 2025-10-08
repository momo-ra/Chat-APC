import React from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useThemeMode } from '../../contexts/ThemeContext';

const AuthButtons: React.FC = () => {
  const navigate = useNavigate();
  const { isDark } = useThemeMode();

  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' }, // Hidden on mobile
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '30px 48px',
        position: 'absolute', // Changed from relative to absolute
        top: 0,
        right: 0,
        zIndex: 10,
        background: 'transparent',
        pointerEvents: 'none', // Let scroll pass through
        '& > *': {
          pointerEvents: 'auto', // But keep buttons clickable
        },
      }}
    >
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          onClick={() => navigate('/login')}
          variant="text"
          sx={{
            padding: '10px 24px',
            border: '1px solid transparent',
            background: 'transparent',
            color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
            fontSize: '0.875rem',
            fontWeight: 400,
            borderRadius: 2,
            textTransform: 'none',
            transition: 'all 0.2s ease',
            '&:hover': {
              color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.9)',
              backgroundColor: isDark 
                ? 'rgba(255, 255, 255, 0.05)' 
                : 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          Sign In
        </Button>
        <Button
          onClick={() => navigate('/signup')}
          variant="outlined"
          sx={{
            padding: '10px 24px',
            border: isDark 
              ? '1px solid rgba(255, 255, 255, 0.15)' 
              : '1px solid rgba(0, 0, 0, 0.15)',
            background: 'transparent',
            color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
            fontSize: '0.875rem',
            fontWeight: 400,
            borderRadius: 2,
            textTransform: 'none',
            transition: 'all 0.2s ease',
            '&:hover': {
              color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.9)',
              borderColor: isDark 
                ? 'rgba(255, 255, 255, 0.25)' 
                : 'rgba(0, 0, 0, 0.3)',
              backgroundColor: isDark 
                ? 'rgba(255, 255, 255, 0.05)' 
                : 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default AuthButtons;

