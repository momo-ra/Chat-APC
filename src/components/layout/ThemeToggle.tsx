import React from 'react';
import { IconButton, Tooltip, Box, useMediaQuery, useTheme } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import { useThemeMode } from '../../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { isDark, preference, setPreference } = useThemeMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Hide in mobile as it's now in the sidebar
  if (isMobile) {
    return null;
  }

  const handleToggle = () => {
    // Cycle: light → dark → system
    if (preference === 'light') {
      setPreference('dark');
    } else if (preference === 'dark') {
      setPreference('system');
    } else {
      setPreference('light');
    }
  };

  const getTooltipText = () => {
    if (preference === 'light') return 'Switch to Dark Mode';
    if (preference === 'dark') return 'Switch to System';
    return 'Switch to Light Mode';
  };

  const getIcon = () => {
    if (preference === 'system') {
      return <SettingsBrightnessIcon sx={{ fontSize: 20, color: '#9333EA' }} />;
    }
    return isDark ? (
      <LightModeIcon sx={{ fontSize: 20, color: '#FDB813' }} />
    ) : (
      <DarkModeIcon sx={{ fontSize: 20, color: '#475569' }} />
    );
  };

  return (
    <Tooltip title={getTooltipText()}>
      <IconButton
        onClick={handleToggle}
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: 1400,
          width: 52,
          height: 52,
          backgroundColor: isDark 
            ? 'rgba(255, 255, 255, 0.08)' 
            : 'rgba(0, 0, 0, 0.04)',
          backdropFilter: 'blur(10px)',
          border: isDark 
            ? '1px solid rgba(255, 255, 255, 0.15)' 
            : '1px solid rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: isDark 
              ? 'rgba(255, 255, 255, 0.12)' 
              : 'rgba(0, 0, 0, 0.08)',
            transform: 'scale(1.08)',
            borderColor: isDark
              ? 'rgba(255, 255, 255, 0.25)'
              : 'rgba(0, 0, 0, 0.15)',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.3s ease',
          }}
        >
          {getIcon()}
        </Box>
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;

