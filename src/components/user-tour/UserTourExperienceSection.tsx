import React, { useEffect, useRef } from 'react';
import { Box, Button, CircularProgress, Container, Typography } from '@mui/material';
import { gsap } from 'gsap';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';
import { applyEntranceAnimation } from '../shared/animationHelpers';

interface UserTourExperienceSectionProps {
  scriptLoaded: boolean;
  scriptError: string | null;
  onOpenFullscreen: () => void;
}

export const UserTourExperienceSection: React.FC<UserTourExperienceSectionProps> = ({
  scriptLoaded,
  scriptError,
  onOpenFullscreen,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const embedRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  const { isDark } = useThemeMode();
  const {
    containerMaxWidth,
    containerPadding,
    sectionPadding,
  } = useResponsiveLayout();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (scriptError && errorRef.current) {
        applyEntranceAnimation(errorRef.current, 'slideUp', {
          startTrigger: 'top 88%',
        });
      }

      if (scriptLoaded && !scriptError) {
        applyEntranceAnimation(buttonRef.current, 'slideUp', {
          startTrigger: 'top 85%',
        });
        applyEntranceAnimation(embedRef.current, 'scaleUp', {
          delay: 0.12,
          startTrigger: 'top 82%',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [scriptLoaded, scriptError]);

  const secondaryTextColor = isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(71, 85, 105, 1)';
  const embedBackgroundColor = isDark ? 'rgba(11, 12, 41, 0.82)' : 'rgba(255, 255, 255, 1)';
  const embedBorderColor = isDark ? 'rgba(99, 102, 241, 0.35)' : 'rgba(148, 163, 184, 0.35)';

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        py: sectionPadding,
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <Container
        disableGutters
        sx={{
          width: '100%',
          maxWidth: containerMaxWidth,
          px: containerPadding,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {/* Loading State - فقط لما السكريبت بيحمل */}
        {!scriptLoaded && !scriptError && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              py: 4,
            }}
          >
            <CircularProgress
              sx={{
                color: isDark ? 'rgba(147, 197, 253, 1)' : 'rgba(37, 99, 235, 1)',
              }}
              size={28}
            />
            <Typography
              variant="body2"
              sx={{
                color: secondaryTextColor,
                transition: 'color 0.3s ease',
              }}
            >
              Loading interactive tour...
            </Typography>
          </Box>
        )}

        {/* Error State */}
        {scriptError && (
          <Box
            ref={errorRef}
            sx={{
              py: 3,
              px: 4,
              borderRadius: 2,
              backgroundColor: isDark
                ? 'rgba(220, 38, 38, 0.15)'
                : 'rgba(254, 226, 226, 0.8)',
              border: `1px solid ${isDark ? 'rgba(239, 68, 68, 0.3)' : 'rgba(220, 38, 38, 0.2)'}`,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: isDark ? 'rgba(248, 113, 113, 0.95)' : 'rgba(127, 29, 29, 0.9)',
                fontWeight: 500,
              }}
            >
              We couldn't load the tour right now. Please refresh the page or try again later.
            </Typography>
          </Box>
        )}

        {/* Fullscreen Button - يظهر دايماً بعد ما السكريبت يحمل */}
        {scriptLoaded && !scriptError && (
          <Box
            ref={buttonRef}
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', md: 'flex-end' },
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={onOpenFullscreen}
              disabled={!scriptLoaded || !!scriptError}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: '8px',
                px: 3,
                py: 1,
                borderWidth: '1.5px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderWidth: '1.5px',
                  transform: 'translateY(-2px)',
                  boxShadow: isDark
                    ? '0 8px 20px rgba(99, 102, 241, 0.3)'
                    : '0 8px 20px rgba(37, 99, 235, 0.25)',
                },
              }}
            >
              View Fullscreen
            </Button>
          </Box>
        )}

        {/* Storylane Embed - يظهر دايماً بشكل واضح */}
        {scriptLoaded && !scriptError && (
          <Box
            ref={embedRef}
            className="sl-embed"
            sx={{
              position: 'relative',
              width: '100%',
              borderRadius: { xs: 1, sm: 1.5, md: 2 },
              overflow: 'hidden',
              boxShadow: isDark
                ? '0px 12px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(99, 102, 241, 0.2) inset'
                : '0px 12px 32px rgba(15, 23, 42, 0.18), 0 0 0 1px rgba(255, 255, 255, 0.8) inset',
              border: `1px solid ${embedBorderColor}`,
              backgroundColor: embedBackgroundColor,
              aspectRatio: '100 / 69.14',
              transition: 'all 0.3s ease',
              '@supports not (aspect-ratio: 100 / 69.14)': {
                height: 0,
                paddingBottom: '69.14%',
              },
              '&:hover': {
                boxShadow: isDark
                  ? '0px 16px 50px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(99, 102, 241, 0.3) inset'
                  : '0px 16px 40px rgba(15, 23, 42, 0.22), 0 0 0 1px rgba(255, 255, 255, 0.9) inset',
              },
              '& iframe': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100% !important',
                height: '100% !important',
                border: 'none',
                boxSizing: 'border-box',
              },
            }}
          >
            <iframe
              loading="lazy"
              className="sl-demo"
              src="https://chatapc.storylane.io/demo/meeuyf6dbalg?embed=inline"
              title="ChatAPC Storylane Tour"
              name="sl-embed"
              allow="fullscreen"
              allowFullScreen
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};
