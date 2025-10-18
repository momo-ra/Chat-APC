import React, { useEffect, useRef } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { useThemeMode } from '../../../contexts/ThemeContext';
import { themeConfig, getTextColor, getGradient } from '../../shared/themeConfig';

interface KnowledgeMapHeaderProps {
  h2FontSize: string;
  bodyFontSize: string;
}

export const KnowledgeMapHeader: React.FC<KnowledgeMapHeaderProps> = ({
  h2FontSize,
  bodyFontSize,
}) => {
  const { isDark } = useThemeMode();
  const headerRef = useRef<HTMLDivElement>(null);
  const { typography, gradients, colors } = themeConfig;

  useEffect(() => {
    if (!headerRef.current) return;
    const items = Array.from(headerRef.current.children);
    items.forEach((el, idx) => {
      (el as HTMLElement).style.opacity = '0';
      (el as HTMLElement).style.transform = 'translateY(30px)';
      setTimeout(() => {
        (el as HTMLElement).style.transition = 'all 0.6s ease-out';
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'translateY(0)';
      }, idx * 150);
    });
  }, []);

  return (
    <Box ref={headerRef} sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
      <Chip
        label="Interactive Knowledge Graph"
        sx={{
          mb: 2,
          fontSize: '0.875rem',
          fontWeight: 600,
          background: getGradient(gradients.blue, isDark),
          color: '#FFFFFF',
          px: 2,
        }}
      />
      <Typography
        variant="h2"
        sx={{
          fontSize: h2FontSize,
          fontWeight: typography.h2.weight,
          color: getTextColor('primary', isDark),
          mb: 2,
          lineHeight: typography.h2.lineHeight,
        }}
      >
        Navigate Your Process Knowledge
      </Typography>
      <Typography
        sx={{
          fontSize: bodyFontSize,
          color: getTextColor('secondary', isDark),
          maxWidth: '700px',
          mx: 'auto',
          lineHeight: typography.body.lineHeight,
        }}
      >
        Click on nodes to explore relationships between equipment, sensors, and control systems
      </Typography>
    </Box>
  );
};