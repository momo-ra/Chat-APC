import { createTheme } from '@mui/material/styles';

// ChatAPC Industrial Design System - MUI Theme
export const theme = createTheme({
  palette: {
    primary: {
      main: '#2563EB', // Modern Blue
      light: '#3B82F6',
      dark: '#1D4ED8',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#10B981', // Modern Green
      light: '#34D399',
      dark: '#059669',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F8FAFC', // Light gray background
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1E293B',
      secondary: '#64748B',
    },
    action: {
      hover: '#F1F5F9',
      selected: '#E0F2FE',
      disabled: '#E2E8F0',
    },
    grey: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          padding: '12px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.15)',
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)',
          },
        },
        outlined: {
          borderColor: '#2563EB',
          color: '#2563EB',
          '&:hover': {
            borderColor: '#1D4ED8',
            backgroundColor: 'rgba(37, 99, 235, 0.04)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(37, 99, 235, 0.1)',
          border: '1px solid rgba(37, 99, 235, 0.08)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 24px rgba(37, 99, 235, 0.15)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontWeight: 500,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#2563EB',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#2563EB',
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

// Custom gradient styles for specific components
export const gradientStyles = {
  hero: {
    background: 'linear-gradient(135deg, #2563EB 0%, #10B981 100%)',
  },
  section: {
    background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
  },
  card: {
    background: 'linear-gradient(145deg, #FFFFFF 0%, #F8FAFC 100%)',
  },
  cyan: {
    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
  },
};

// Animation keyframes
export const animations = {
  float: {
    '@keyframes float': {
      '0%, 100%': { transform: 'translateY(0px)' },
      '50%': { transform: 'translateY(-10px)' },
    },
  },
  pulseGlow: {
    '@keyframes pulseGlow': {
      '0%, 100%': { 
        boxShadow: '0 0 20px rgba(0, 155, 228, 0.3)',
      },
      '50%': { 
        boxShadow: '0 0 30px rgba(0, 155, 228, 0.5)',
      },
    },
  },
  slideUp: {
    '@keyframes slideUp': {
      from: {
        opacity: 0,
        transform: 'translateY(30px)',
      },
      to: {
        opacity: 1,
        transform: 'translateY(0)',
      },
    },
  },
};
