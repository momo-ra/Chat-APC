import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { ZoomIn, ZoomOut, ViewComfy } from '@mui/icons-material';
import { Panel } from 'reactflow';
import { useThemeMode } from '../../../contexts/ThemeContext';
import { themeConfig, getTextColor, withOpacity } from '../../shared/themeConfig';

const { borderRadius, transitions, shadows } = themeConfig;

interface GraphControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onAutoLayout: () => void;
}

export const GraphControls: React.FC<GraphControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onAutoLayout,
}) => {
  const { isDark } = useThemeMode();

  const buttonStyles = {
    width: { xs: 40, sm: 44 },
    height: { xs: 40, sm: 44 },
    backgroundColor: isDark 
      ? withOpacity('#1F2937', 0.95) 
      : withOpacity('#FFFFFF', 0.98),
    backdropFilter: 'blur(12px)',
    border: isDark 
      ? `1px solid ${withOpacity('#FFFFFF', 0.1)}` 
      : `1px solid ${withOpacity('#000000', 0.08)}`,
    boxShadow: shadows[isDark ? 'dark' : 'light'].md,
    '&:hover': {
      backgroundColor: isDark 
        ? withOpacity('#374151', 0.95) 
        : withOpacity('#F9FAFB', 1),
      transform: 'scale(1.05)',
      boxShadow: shadows[isDark ? 'dark' : 'light'].lg,
    },
    transition: transitions.allFast,
  };

  const iconColor = getTextColor('primary', isDark);

  return (
    <>
      <Panel position="top-right">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Tooltip title="Zoom In" placement="left">
            <IconButton onClick={onZoomIn} sx={buttonStyles}>
              <ZoomIn sx={{ color: iconColor, fontSize: 22 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Zoom Out" placement="left">
            <IconButton onClick={onZoomOut} sx={buttonStyles}>
              <ZoomOut sx={{ color: iconColor, fontSize: 22 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Auto Layout" placement="left">
            <IconButton onClick={onAutoLayout} sx={buttonStyles}>
              <ViewComfy sx={{ color: iconColor, fontSize: 22 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Panel>
    </>
  );
};
