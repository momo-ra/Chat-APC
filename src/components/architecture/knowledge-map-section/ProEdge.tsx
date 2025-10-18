import React from 'react';
import { getBezierPath } from 'reactflow';
import type { EdgeProps } from 'reactflow';
import { themeConfig, getColor } from '../../shared/themeConfig';
import { useThemeMode } from '../../../contexts/ThemeContext';

export const ProEdge: React.FC<EdgeProps> = (props) => {
  const { isDark } = useThemeMode();
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    markerEnd,
  } = props;

  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const gradId = `edge-grad-${id}`;
  const shadowId = `edge-shadow-${id}`;
  const primaryColor = getColor(themeConfig.colors.blue, isDark);
  const cyanColor = getColor(themeConfig.colors.cyan, isDark);

  return (
    <g>
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={cyanColor} stopOpacity={0.7} />
          <stop offset="100%" stopColor={primaryColor} />
        </linearGradient>
        <filter id={shadowId} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow 
            dx="0" 
            dy="2" 
            stdDeviation="2" 
            floodColor="#000" 
            floodOpacity={isDark ? 0.3 : 0.18} 
          />
        </filter>
      </defs>
      <path
        d={edgePath}
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth={2.5}
        strokeLinecap="round"
        filter={`url(#${shadowId})`}
        markerEnd={markerEnd}
      />
    </g>
  );
};