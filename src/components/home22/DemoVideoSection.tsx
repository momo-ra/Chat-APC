import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Container, IconButton, Fab } from '@mui/material';
import { PlayArrow, Pause, Visibility, Fullscreen, VolumeUp, VolumeOff } from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

gsap.registerPlugin(ScrollTrigger);

export const DemoVideoSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const { 
    h2FontSize, 
    bodyLargeFontSize, 
    containerMaxWidth,
    containerPadding,
    isMobile 
  } = useResponsiveLayout();

  // YouTube video ID
  const YOUTUBE_VIDEO_ID = 'OnVBarmGnek';

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating animation for the video container
      if (videoRef.current && !isPlaying) {
        gsap.to(videoRef.current, {
          y: -10,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut',
        });
      }

      // Section entrance animation
      if (sectionRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        });

        tl.from(sectionRef.current.querySelector('.section-header'), {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power3.out',
        })
        .from(sectionRef.current.querySelector('.video-container'), {
          opacity: 0,
          scale: 0.9,
          duration: 1,
          ease: 'back.out(1.7)',
        }, 0.3);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isPlaying]);

  // Handle play/pause
  const handlePlayPause = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      if (isPlaying) {
        // Send pause command to YouTube iframe
        iframe.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      } else {
        // Send play command to YouTube iframe
        iframe.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        if (!hasStartedPlaying) {
          setHasStartedPlaying(true);
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle mute/unmute
  const handleMuteToggle = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      if (isMuted) {
        iframe.contentWindow?.postMessage('{"event":"command","func":"unMute","args":""}', '*');
      } else {
        iframe.contentWindow?.postMessage('{"event":"command","func":"mute","args":""}', '*');
      }
      setIsMuted(!isMuted);
    }
  };

  // Handle fullscreen
  const handleFullscreen = () => {
    if (playerContainerRef.current) {
      if (!isFullscreen) {
        if (playerContainerRef.current.requestFullscreen) {
          playerContainerRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  // Handle mouse movement to show/hide controls
  const handleMouseMove = () => {
    setShowControls(true);
    setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  return (
    <Box
      ref={sectionRef}
      component="section"
      data-section-theme={isDark ? 'dark' : 'light'}
      sx={{
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        py: 'clamp(2.5rem, 8vw, 4rem)',
        position: 'relative',
        overflow: 'hidden',
        background: isDark
          ? 'radial-gradient(ellipse 120% 100% at 50% 0%, rgba(0, 155, 228, 0.035) 0%, #111827 40%, #111827 100%)'
          : 'radial-gradient(ellipse 120% 100% at 50% 0%, rgba(59, 130, 246, 0.02) 0%, #FFFFFF 40%, #FFFFFF 100%)',
      }}
    >
      <Container 
        maxWidth="lg"
        sx={{
          maxWidth: containerMaxWidth,
          px: containerPadding,
        }}
      >
        <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          {/* Header */}
          <Box className="section-header" sx={{ mb: 8 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 3,
                py: 1,
                borderRadius: '50px',
                background: isDark
                  ? 'linear-gradient(135deg, rgba(0, 155, 228, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)'
                  : 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                border: isDark
                  ? '1px solid rgba(0, 155, 228, 0.2)'
                  : '1px solid rgba(59, 130, 246, 0.2)',
                mb: 4,
                backdropFilter: 'blur(10px)',
              }}
            >
              <Visibility sx={{ fontSize: 16, color: isDark ? '#009BE4' : '#3B82F6' }} />
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: isDark ? '#009BE4' : '#3B82F6',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Live Demo
              </Typography>
            </Box>

            <Typography
              variant="h2"
              sx={{
                fontSize: h2FontSize,
                fontWeight: 800,
                background: isDark
                  ? 'linear-gradient(135deg, #FFFFFF 0%, #009BE4 100%)'
                  : 'linear-gradient(135deg, #0F172A 0%, #3B82F6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 3,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              ChatAPC in action
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                fontSize: bodyLargeFontSize,
                color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(75, 85, 99, 1)',
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.7,
                fontWeight: 400,
              }}
            >
              Instant answers to the questions engineers ask every day. Get clarity on process constraints, shift events, and profit opportunities.
            </Typography>
          </Box>

          {/* Custom Video Player */}
          <Box
            ref={videoRef}
            className="video-container"
            sx={{
              position: 'relative',
              maxWidth: 800,
              mx: 'auto',
              perspective: '1000px',
            }}
          >
            <Box
              ref={playerContainerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setShowControls(isPlaying ? false : true)}
              sx={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16/9',
                borderRadius: '24px',
                overflow: 'hidden',
                background: '#000',
                boxShadow: isDark
                  ? '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.05)'
                  : '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.8)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: isPlaying ? (showControls ? 'default' : 'none') : 'pointer',
                '&:hover': {
                  transform: isPlaying ? 'none' : 'translateY(-8px)',
                  boxShadow: isDark
                    ? '0 35px 70px -12px rgba(0, 155, 228, 0.3)'
                    : '0 35px 70px -12px rgba(59, 130, 246, 0.3)',
                },
              }}
            >
              {/* YouTube Embed */}
              <iframe
                ref={iframeRef}
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?enablejsapi=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0&playsinline=1`}
                title="ChatAPC Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  pointerEvents: isPlaying ? 'auto' : 'none',
                }}
              />

              {/* Initial Overlay - only shows before first play */}
              {!hasStartedPlaying && (
                <Box
                  onClick={handlePlayPause}
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.1)), url(https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    cursor: 'pointer',
                    zIndex: 10,
                  }}
                >
                  {/* Play Button */}
                  <IconButton
                    sx={{
                      width: { xs: 80, md: 100 },
                      height: { xs: 80, md: 100 },
                      background: isDark
                        ? 'linear-gradient(135deg, rgba(0, 155, 228, 0.95) 0%, rgba(139, 92, 246, 0.95) 100%)'
                        : 'linear-gradient(135deg, rgba(59, 130, 246, 0.95) 0%, rgba(139, 92, 246, 0.95) 100%)',
                      backdropFilter: 'blur(20px)',
                      border: '3px solid rgba(255, 255, 255, 0.3)',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        background: isDark
                          ? 'linear-gradient(135deg, #009BE4 0%, #8B5CF6 100%)'
                          : 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
                      },
                    }}
                  >
                    <PlayArrow sx={{ 
                      fontSize: { xs: 32, md: 40 }, 
                      color: 'white', 
                      ml: 1,
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                    }} />
                  </IconButton>
                </Box>
              )}

              {/* Custom Controls */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.8))',
                  p: 2,
                  transform: showControls ? 'translateY(0)' : 'translateY(100%)',
                  transition: 'transform 0.3s ease',
                  zIndex: 20,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {/* Play/Pause Button */}
                  <IconButton
                    onClick={handlePlayPause}
                    sx={{
                      color: 'white',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.2)',
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    {isPlaying ? <Pause /> : <PlayArrow />}
                  </IconButton>

                  {/* Volume Button */}
                  <IconButton
                    onClick={handleMuteToggle}
                    sx={{
                      color: 'white',
                      '&:hover': {
                        color: isDark ? '#009BE4' : '#3B82F6',
                      },
                    }}
                  >
                    {isMuted ? <VolumeOff /> : <VolumeUp />}
                  </IconButton>

                  {/* Spacer */}
                  <Box sx={{ flex: 1 }} />

                  {/* Video Title */}
                  <Typography
                    sx={{
                      color: 'white',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      display: { xs: 'none', sm: 'block' },
                    }}
                  >
                    ChatAPC Interactive Demo
                  </Typography>

                  {/* Fullscreen Button */}
                  <IconButton
                    onClick={handleFullscreen}
                    sx={{
                      color: 'white',
                      '&:hover': {
                        color: isDark ? '#009BE4' : '#3B82F6',
                      },
                    }}
                  >
                    <Fullscreen />
                  </IconButton>
                </Box>
              </Box>

              {/* Custom Labels - only show before first play */}
              {!hasStartedPlaying && (
                <>
                  {/* Demo Label */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 20,
                      right: 20,
                      px: 3,
                      py: 1,
                      borderRadius: '50px',
                      background: 'rgba(0, 0, 0, 0.8)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      zIndex: 15,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: 'white',
                      }}
                    >
                      Interactive Demo
                    </Typography>
                  </Box>

                  {/* Duration */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 20,
                      left: 20,
                      px: 2,
                      py: 0.5,
                      borderRadius: '8px',
                      background: 'rgba(0, 0, 0, 0.8)',
                      backdropFilter: 'blur(5px)',
                      zIndex: 15,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: 'white',
                      }}
                    >
                      5:42
                    </Typography>
                  </Box>
                </>
              )}
            </Box>

            {/* Floating Elements */}
            <Box
              sx={{
                position: 'absolute',
                top: -20,
                left: -20,
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: isDark
                  ? 'linear-gradient(135deg, #009BE4 0%, #00D4AA 100%)'
                  : 'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)',
                opacity: 0.6,
                filter: 'blur(1px)',
                animation: 'float 6s ease-in-out infinite',
                '@keyframes float': {
                  '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                  '50%': { transform: 'translateY(-20px) rotate(180deg)' },
                },
              }}
            />

            <Box
              sx={{
                position: 'absolute',
                bottom: -30,
                right: -30,
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: isDark
                  ? 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)'
                  : 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
                opacity: 0.4,
                filter: 'blur(2px)',
                animation: 'float 8s ease-in-out infinite reverse',
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default DemoVideoSection;