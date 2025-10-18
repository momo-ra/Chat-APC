import React, { useRef, useState, useCallback } from 'react';
import { Box, IconButton } from '@mui/material';
import { Fullscreen } from '@mui/icons-material';
import { useThemeMode } from '../../contexts/ThemeContext';

export const DemoVideoSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Only manage fullscreen
  const handleFullscreen = useCallback(() => {
    if (containerRef.current) {
      if (!isFullscreen) {
        if (containerRef.current.requestFullscreen) {
          containerRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    }
  }, [isFullscreen]);

  // Sync state with fullscreenchange
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement === containerRef.current) {
        setIsFullscreen(true);
      } else {
        setIsFullscreen(false);
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Replace with your storyline or GIF source
  const demoSrc = "https://chatapc.storylane.io/demo/n2q3pvcx5mtt?embed=inline";

  return (
    <Box
      ref={containerRef}
      sx={{
        maxWidth: 800,
        mx: { xs: 2, sm: 2, md: 6 },
        my: { xs: 8, sm: 12 },
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: isDark
          ? '0 10px 32px rgba(0,0,0,0.7)'
          : '0 10px 32px rgba(0,0,0,0.1)',
        background: "transparent",
      }}
    >
      {/* Video or Demo (iframe, img, etc) */}
      <Box
        sx={{
          width: '100%',
          position: 'relative',
          aspectRatio: '16/9',
          background: "transparent",
        }}
      >
        <iframe
          src={demoSrc}
          title="Demo"
          allow="fullscreen"
          allowFullScreen
          loading="lazy"
          style={{
            border: 0,
            width: "100%",
            height: "100%",
            position: "absolute",
            left: 0,
            top: 0,
            background: "transparent",
            borderRadius: "12px",
          }}
        />
        {/* Fullscreen button moved to bottom right */}
        <IconButton
          onClick={handleFullscreen}
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            color: 'white',
            background: 'rgba(0,0,0,0.6)',
            zIndex: 10,
            '&:hover': {
              background: 'rgba(40,40,80,0.8)',
              transform: 'scale(1.08)',
            },
          }}
        >
          <Fullscreen />
        </IconButton>
      </Box>
    </Box>
  );
};

export default DemoVideoSection;