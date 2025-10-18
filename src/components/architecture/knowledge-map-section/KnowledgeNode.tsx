import React, { useState } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { Handle, Position } from 'reactflow';
import { useThemeMode } from '../../../contexts/ThemeContext';
import { themeConfig, getTextColor, withOpacity } from '../../shared/themeConfig';

const { borderRadius, transitions } = themeConfig;

interface KnowledgeNodeProps {
  data: {
    label: string;
    icon: React.ComponentType<any>;
    color: string;
    size: 'medium' | 'large' | 'xlarge';
    type?: string;
  };
  selected: boolean;
}

export const KnowledgeNode: React.FC<KnowledgeNodeProps> = ({ data, selected }) => {
  const { isDark } = useThemeMode();
  const [isHovered, setIsHovered] = useState(false);

  const nodeColor = data.color;
  const IconComponent = data.icon;
  const size = 110; // NODE_SIZE
  const iconSize = 40;

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        width: size,
        height: size,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      {/* Hidden handles */}
      <Handle 
        type="target" 
        position={Position.Top} 
        id="top" 
        style={{ opacity: 0, width: 0, height: 0, border: 0, background: 'transparent', pointerEvents: 'none' }} 
      />
      <Handle 
        type="source" 
        position={Position.Bottom} 
        id="bottom" 
        style={{ opacity: 0, width: 0, height: 0, border: 0, background: 'transparent', pointerEvents: 'none' }} 
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        id="right" 
        style={{ opacity: 0, width: 0, height: 0, border: 0, background: 'transparent', pointerEvents: 'none' }} 
      />
      <Handle 
        type="target" 
        position={Position.Left} 
        id="left" 
        style={{ opacity: 0, width: 0, height: 0, border: 0, background: 'transparent', pointerEvents: 'none' }} 
      />

      {/* Glow Effect */}
      <Box
        sx={{
          position: 'absolute',
          inset: -12,
          borderRadius: borderRadius.full,
          opacity: selected ? 1 : isHovered ? 0.8 : 0,
          transition: transitions.normal,
          filter: 'blur(8px)',
          zIndex: 0,
        }}
      />

      {/* Main Circle */}
      <Box
        sx={{
          width: '100%',
          height: '100%',
          borderRadius: borderRadius.full,
          background: isDark
            ? `linear-gradient(135deg, ${withOpacity(nodeColor, 0.13)} 0%, ${withOpacity(nodeColor, 0.06)} 100%)`
            : `linear-gradient(135deg, ${withOpacity(nodeColor, 0.09)} 0%, ${withOpacity(nodeColor, 0.03)} 100%)`,
          border: selected
            ? `3px solid ${nodeColor}`
            : isHovered
            ? `2px solid ${nodeColor}`
            : isDark
            ? `2px solid ${withOpacity(nodeColor, 0.25)}`
            : `2px solid ${withOpacity(nodeColor, 0.19)}`,
          boxShadow: selected
            ? `0 0 0 4px ${withOpacity(nodeColor, 0.19)}, 0 12px 32px rgba(0,0,0,0.25)`
            : isHovered
            ? `0 0 0 3px ${withOpacity(nodeColor, 0.13)}, 0 8px 24px rgba(0,0,0,0.2)`
            : '0 4px 16px rgba(0,0,0,0.12)',
          transition: transitions.normal,
          transform: isHovered ? 'scale(1.08)' : selected ? 'scale(1.05)' : 'scale(1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          position: 'relative',
          zIndex: 1,
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Icon Container */}
        <Box
          sx={{
            width: iconSize,
            height: iconSize,
            borderRadius: borderRadius.full,
            background: nodeColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 6px 20px ${withOpacity(nodeColor, 0.31)}`,
            transition: transitions.normal,
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          }}
        >
          {IconComponent && (
            <IconComponent
              sx={{
                fontSize: iconSize * 0.6,
                color: '#FFFFFF',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
              }}
            />
          )}
        </Box>

        {/* Label */}
        <Typography
          sx={{
            fontSize: data.size === 'xlarge' ? '0.95rem' : data.size === 'large' ? '0.85rem' : '0.75rem',
            fontWeight: 700,
            color: getTextColor('primary', isDark),
            textAlign: 'center',
            maxWidth: size - 24,
            lineHeight: 1.2,
            textShadow: isDark ? '0 1px 2px rgba(0,0,0,0.3)' : 'none',
            px: 1,
          }}
        >
          {data.label}
        </Typography>
      </Box>
    </Box>
  );
};
