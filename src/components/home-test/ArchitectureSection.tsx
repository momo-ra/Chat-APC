import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Card, CardContent, Chip } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

gsap.registerPlugin(ScrollTrigger);

const layers = [
  {
    title: 'Data & Knowledge Layer',
    subtitle: 'Foundation',
    description: 'Connects to DCS, historian, and lab systems. Organizes process knowledge, lab data and control system into a knowledge map, linking variables, units, control loops, and relationships.',
    color: '#3B82F6',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
    icon: '01',
    features: ['DCS Integration', 'Historian Data', 'Knowledge Mapping', 'Tag Contextualization'],
  },
  {
    title: 'AI & Engineering Engine',
    subtitle: 'Intelligence',
    description: 'ChatAPC combines AI reasoning with engineering logic and physical relationships. It understands mass and energy balances, correlations, and constraints — validating insights with process fundamentals.',
    color: '#10B981',
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    icon: '02',
    features: ['AI Reasoning', 'Engineering Logic', 'Physical Models', 'Validation Engine'],
  },
  {
    title: 'Chat Interface',
    subtitle: 'Experience',
    description: 'Clear explanations in plain language. "Why" and "what-if" questions uncover causes, effects, and opportunities. Every answer traces back to the underlying data and engineering model.',
    color: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    icon: '03',
    features: ['Natural Language', 'Why Analysis', 'What-If Scenarios', 'Transparency'],
  },
];

export const ArchitectureSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsSliderRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement[]>([]);
  const bottomStatementRef = useRef<HTMLDivElement>(null);
  
  const { isDark } = useThemeMode();
  const { 
    h2FontSize, 
    bodyLargeFontSize, 
    containerMaxWidth,
    containerPadding,
    isMobile 
  } = useResponsiveLayout();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Normal header animation
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
      });

      // Horizontal scrolling for cards
      if (cardsContainerRef.current && cardsSliderRef.current) {
        const cardsContainer = cardsContainerRef.current;
        const cardsSlider = cardsSliderRef.current;
        
        // Calculate total scroll distance needed
        const scrollDistance = layers.length * window.innerHeight;
        
        // Use lighter scrub value for mobile for smoother performance
        const scrubValue = isMobile ? 0.5 : 1.5;
        
        ScrollTrigger.create({
          trigger: cardsContainer,
          start: "top top",
          end: `+=${scrollDistance}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: scrubValue,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(cardsSlider, {
              x: `${-progress * (layers.length - 1) * 100}vw`,
              force3D: true,
              willChange: 'transform',
            });
          }
        });

        // Individual card content animations - fixed timing
        const contentScrubValue = isMobile ? 0.8 : 2;
        
        layersRef.current.forEach((card, index) => {
          if (card) {
            const cardContent = card.querySelector('.card-content');
            if (cardContent) {
              ScrollTrigger.create({
                trigger: cardsContainer,
                start: "top top",
                end: `+=${scrollDistance}`,
                scrub: contentScrubValue,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                  const progress = self.progress;
                  
                  // Calculate when this specific card should be visible
                  // Each card is fully visible when it's in the center of the screen
                  const cardPosition = index / (layers.length - 1); // 0, 0.5, 1 for 3 cards
                  const cardRange = 0.2; // How much of the scroll each card is visible
                  
                  const cardStartProgress = Math.max(0, cardPosition - cardRange);
                  const cardEndProgress = Math.min(1, cardPosition + cardRange);
                  
                  let cardOpacity = 0;
                  let cardScale = 0.95;
                  let cardY = 30;
                  
                  if (progress >= cardStartProgress) {
                    if (progress <= cardPosition) {
                      // Fade in phase: from cardStartProgress to cardPosition
                      const fadeInProgress = (progress - cardStartProgress) / (cardPosition - cardStartProgress);
                      const easeProgress = 1 - Math.pow(1 - fadeInProgress, 3); // Ease out cubic
                      
                      cardOpacity = easeProgress;
                      cardScale = 0.95 + (easeProgress * 0.05);
                      cardY = 30 * (1 - easeProgress);
                    } else {
                      // Stay visible phase: after cardPosition, keep fully visible
                      cardOpacity = 1;
                      cardScale = 1;
                      cardY = 0;
                    }
                  }
                  
                  gsap.set(cardContent, {
                    opacity: cardOpacity,
                    scale: cardScale,
                    y: cardY,
                    force3D: true,
                  });
                }
              });
            }
          }
        });
      }

      // Normal bottom statement animation
      gsap.from(bottomStatementRef.current, {
        scrollTrigger: {
          trigger: bottomStatementRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [isDark, isMobile]); // Add isDark and isMobile to dependencies

  return (
    <Box
      ref={sectionRef}
      component="section"
      data-section-theme={isDark ? 'dark' : 'light'}
      sx={{
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        py: 'clamp(3rem, 8vw, 5rem)',
        position: 'relative',
        overflow: 'hidden',
        background: 'transparent',
        touchAction: 'pan-y',
        WebkitTouchCallout: 'none',
      }}
    >
      <Container 
        maxWidth="lg"
        sx={{
          maxWidth: containerMaxWidth,
          px: containerPadding,
        }}
      >
        {/* Section Header - stays normal */}
        <Box ref={headerRef} sx={{ textAlign: 'center', mb: 'clamp(3rem, 8vw, 5rem)', position: 'relative', zIndex: 2 }}>
          <Chip
            label="Architecture"
            sx={{
              fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
              fontWeight: 600,
              px: 3,
              py: 1,
              mb: 3,
              background: isDark
                ? 'linear-gradient(135deg, rgba(0, 155, 228, 0.12) 0%, rgba(139, 92, 246, 0.12) 100%)'
                : 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(139, 92, 246, 0.12) 100%)',
              color: isDark ? '#009BE4' : '#3B82F6',
              border: 'none',
              backdropFilter: 'blur(10px)',
              borderRadius: '50px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          />

          <Typography
            variant="h2"
            sx={{
              fontSize: h2FontSize,
              fontWeight: 800,
              lineHeight: 1.2,
              mb: 3,
              letterSpacing: '-0.01em',
            }}
          >
            <Box
              component="span"
              sx={{
                background: isDark
                  ? 'linear-gradient(135deg, #FFFFFF 0%, #CBD5E1 100%)'
                  : 'linear-gradient(135deg, #0F172A 0%, #475569 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: { xs: 'block', md: 'inline' },
                mb: { xs: 1, md: 0 },
              }}
            >
              Not just AI —{' '}
            </Box>
            <Box
              component="span"
              sx={{
                background: isDark
                  ? 'linear-gradient(135deg, #009BE4 0%, #10B981 100%)'
                  : 'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              process intelligence
            </Box>
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              fontSize: bodyLargeFontSize,
              color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(71, 85, 105, 1)',
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            ChatAPC combines rigorous chemical engineering with conversational AI. Deep process understanding meets intuitive interaction.
          </Typography>
        </Box>
      </Container>

      {/* Horizontal Scrolling Cards Container */}
      <Box
        ref={cardsContainerRef}
        sx={{
          height: '100vh',
          width: '100vw',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          willChange: 'transform',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <Box
          ref={cardsSliderRef}
          sx={{
            display: 'flex',
            width: `${layers.length * 100}vw`,
            height: '100%',
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
            WebkitTransform: 'translateZ(0)',
          }}
        >
          {layers.map((layer, index) => (
            <Box
              key={index}
              sx={{
                width: '100vw',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: containerPadding, // Use responsive padding
              }}
            >
              <Card
                ref={(el: HTMLDivElement | null) => {
                  if (el) layersRef.current[index] = el;
                }}
                elevation={0}
                sx={{
                  maxWidth: containerMaxWidth,
                  width: '100%',
                  background: isDark
                    ? `linear-gradient(145deg, rgba(30, 41, 59, 0.85) 0%, rgba(15, 23, 42, 0.95) 100%)`
                    : `linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 1) 100%)`,
                  backdropFilter: 'blur(24px) saturate(180%)',
                  border: isDark
                    ? `1px solid rgba(255, 255, 255, 0.08)`
                    : `1px solid rgba(0, 0, 0, 0.06)`,
                  borderRadius: 'clamp(20px, 4vw, 32px)',
                  overflow: 'visible',
                  position: 'relative',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isDark
                    ? `0 24px 48px -12px rgba(0, 0, 0, 0.5),
                       0 8px 16px -8px rgba(0, 0, 0, 0.4),
                       inset 0 1px 0 rgba(255, 255, 255, 0.05)`
                    : `0 24px 48px -12px rgba(0, 0, 0, 0.12),
                       0 8px 16px -8px rgba(0, 0, 0, 0.08),
                       inset 0 1px 0 rgba(255, 255, 255, 0.9)`,
                  // Decorative corner accents
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: `linear-gradient(90deg, 
                      ${layer.color}00 0%, 
                      ${layer.color}40 20%, 
                      ${layer.color}60 50%, 
                      ${layer.color}40 80%, 
                      ${layer.color}00 100%)`,
                    opacity: isDark ? 0.6 : 0.4,
                    transition: 'opacity 0.4s ease',
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: 'inherit',
                    padding: '1px',
                    background: `linear-gradient(135deg, 
                      ${layer.color}15 0%, 
                      transparent 50%, 
                      ${layer.color}10 100%)`,
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    opacity: 0,
                    transition: 'opacity 0.4s ease',
                    pointerEvents: 'none',
                  },
                  '&:hover': {
                    transform: isMobile ? 'none' : 'translateY(-8px) scale(1.01)',
                    border: isDark
                      ? `1px solid ${layer.color}40`
                      : `1px solid ${layer.color}35`,
                    boxShadow: isMobile 
                      ? isDark
                        ? `0 24px 48px -12px rgba(0, 0, 0, 0.5)`
                        : `0 24px 48px -12px rgba(0, 0, 0, 0.12)`
                      : isDark
                        ? `0 32px 64px -12px ${layer.color}25,
                           0 16px 32px -8px rgba(0, 0, 0, 0.5),
                           0 0 0 1px ${layer.color}20,
                           inset 0 1px 0 rgba(255, 255, 255, 0.08)`
                        : `0 32px 64px -12px ${layer.color}20,
                           0 16px 32px -8px rgba(0, 0, 0, 0.15),
                           0 0 0 1px ${layer.color}15,
                           inset 0 1px 0 rgba(255, 255, 255, 1)`,
                    '&::before': {
                      opacity: isDark ? 1 : 0.7,
                      height: '4px',
                    },
                    '&::after': {
                      opacity: 1,
                    },
                    '& .layer-icon': {
                      transform: isMobile ? 'none' : 'scale(1.08) rotate(2deg)',
                      boxShadow: isDark
                        ? `0 12px 24px -8px ${layer.color}30`
                        : `0 12px 24px -8px ${layer.color}25`,
                    },
                    '& .feature-dot': {
                      background: layer.color,
                      boxShadow: `0 0 8px ${layer.color}60`,
                      transform: 'scale(1.3)',
                    },
                    '& .layer-subtitle': {
                      textShadow: isDark ? `0 0 20px ${layer.color}40` : 'none',
                    },
                  },
                }}
              >
                <CardContent 
                  className="card-content"
                  sx={{ 
                    p: { xs: 3, sm: 4, md: 5 },
                    position: 'relative',
                    zIndex: 1,
                    // Subtle gradient overlay
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      borderRadius: 'inherit',
                      background: isDark
                        ? `radial-gradient(circle at 20% 20%, ${layer.color}03 0%, transparent 50%)`
                        : `radial-gradient(circle at 20% 20%, ${layer.color}02 0%, transparent 50%)`,
                      opacity: 1,
                      pointerEvents: 'none',
                      zIndex: -1,
                    },
                  }}
                >
                  {/* Decorative corner elements */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: { xs: 16, md: 24 },
                      right: { xs: 16, md: 24 },
                      width: { xs: 40, md: 60 },
                      height: { xs: 40, md: 60 },
                      borderTop: isDark ? `2px solid ${layer.color}15` : `2px solid ${layer.color}10`,
                      borderRight: isDark ? `2px solid ${layer.color}15` : `2px solid ${layer.color}10`,
                      borderTopRightRadius: '12px',
                      opacity: 0.6,
                      transition: 'all 0.4s ease',
                      pointerEvents: 'none',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: { xs: 16, md: 24 },
                      left: { xs: 16, md: 24 },
                      width: { xs: 40, md: 60 },
                      height: { xs: 40, md: 60 },
                      borderBottom: isDark ? `2px solid ${layer.color}15` : `2px solid ${layer.color}10`,
                      borderLeft: isDark ? `2px solid ${layer.color}15` : `2px solid ${layer.color}10`,
                      borderBottomLeftRadius: '12px',
                      opacity: 0.6,
                      transition: 'all 0.4s ease',
                      pointerEvents: 'none',
                    }}
                  />
                  
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 3, sm: 4 }, 
                    alignItems: { xs: 'center', sm: 'flex-start' },
                    textAlign: { xs: 'center', sm: 'left' },
                    position: 'relative',
                    zIndex: 2,
                  }}>
                    {/* Icon Number */}
                    <Box
                      className="layer-icon"
                      sx={{
                        minWidth: { xs: 80, sm: 100, md: 120 },
                        width: { xs: 80, sm: 100, md: 120 },
                        height: { xs: 80, sm: 100, md: 120 },
                        borderRadius: 'clamp(16px, 3vw, 24px)',
                        background: isDark
                          ? `linear-gradient(135deg, ${layer.color}18 0%, ${layer.color}10 50%, ${layer.color}05 100%)`
                          : `linear-gradient(135deg, ${layer.color}12 0%, ${layer.color}08 50%, ${layer.color}04 100%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        border: isDark
                          ? `2px solid ${layer.color}20`
                          : `2px solid ${layer.color}15`,
                        position: 'relative',
                        flexShrink: 0,
                        boxShadow: isDark
                          ? `0 8px 16px -4px ${layer.color}15, inset 0 1px 0 ${layer.color}20`
                          : `0 8px 16px -4px ${layer.color}10, inset 0 1px 0 ${layer.color}25`,
                        // Glow effect background
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          inset: '-2px',
                          borderRadius: 'inherit',
                          background: `radial-gradient(circle at 30% 30%, ${layer.color}20 0%, transparent 70%)`,
                          opacity: 0,
                          transition: 'opacity 0.4s ease',
                          zIndex: 0,
                        },
                        // Inner shine
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          top: '10%',
                          left: '10%',
                          right: '50%',
                          bottom: '50%',
                          borderRadius: 'inherit',
                          background: isDark
                            ? 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 100%)'
                            : 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, transparent 100%)',
                          opacity: 0.6,
                          zIndex: 1,
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
                          fontWeight: 800,
                          background: `linear-gradient(135deg, ${layer.color} 0%, ${layer.color}CC 100%)`,
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          textShadow: isDark ? `0 2px 12px ${layer.color}30` : 'none',
                          zIndex: 2,
                          position: 'relative',
                          transition: 'all 0.4s ease',
                        }}
                      >
                        {layer.icon}
                      </Typography>
                    </Box>
                    
                    {/* Content */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Box sx={{ mb: { xs: 2, md: 3 } }}>
                        <Typography
                          className="layer-subtitle"
                          sx={{
                            fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                            fontWeight: 700,
                            background: `linear-gradient(135deg, ${layer.color} 0%, ${layer.color}DD 100%)`,
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            mb: 1,
                            position: 'relative',
                            display: 'inline-block',
                            transition: 'all 0.4s ease',
                            '&::after': {
                              content: '""',
                              position: 'absolute',
                              bottom: '-4px',
                              left: 0,
                              width: '40px',
                              height: '2px',
                              background: `linear-gradient(90deg, ${layer.color} 0%, transparent 100%)`,
                              borderRadius: '2px',
                            },
                          }}
                        >
                          {layer.subtitle}
                        </Typography>
                        
                        <Typography
                          variant="h3"
                          sx={{
                            fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.875rem' },
                            fontWeight: 800,
                            color: isDark ? 'rgba(255, 255, 255, 0.98)' : 'rgba(15, 23, 42, 1)',
                            mb: { xs: 1.5, md: 2 },
                            lineHeight: 1.3,
                            letterSpacing: '-0.02em',
                            textShadow: isDark 
                              ? '0 2px 8px rgba(0, 0, 0, 0.3)'
                              : '0 1px 2px rgba(0, 0, 0, 0.05)',
                            position: 'relative',
                          }}
                        >
                          {layer.title}
                        </Typography>
                        
                        <Typography
                          variant="body1"
                          sx={{
                            fontSize: 'clamp(0.95rem, 2.5vw, 1.125rem)',
                            color: isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(71, 85, 105, 1)',
                            lineHeight: 1.7,
                            fontWeight: 400,
                            textShadow: isDark 
                              ? '0 1px 3px rgba(0, 0, 0, 0.2)'
                              : 'none',
                          }}
                        >
                          {layer.description}
                        </Typography>
                      </Box>

                      {/* Features */}
                      <Box
                        className="layer-features"
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                          gap: { xs: 1.5, sm: 2 },
                        }}
                      >
                        {layer.features.map((feature, featureIndex) => (
                          <Box
                            key={featureIndex}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1.5,
                              px: 1.5,
                              py: 1,
                              borderRadius: '8px',
                              background: isDark
                                ? 'rgba(255, 255, 255, 0.02)'
                                : 'rgba(248, 250, 252, 0.6)',
                              border: isDark
                                ? '1px solid rgba(255, 255, 255, 0.04)'
                                : '1px solid rgba(0, 0, 0, 0.03)',
                              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                              '&:hover': {
                                background: isDark
                                  ? `${layer.color}08`
                                  : `${layer.color}05`,
                                border: isDark
                                  ? `1px solid ${layer.color}15`
                                  : `1px solid ${layer.color}10`,
                                transform: 'translateX(4px)',
                              },
                            }}
                          >
                            <Box
                              className="feature-dot"
                              sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                background: isDark
                                  ? `linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 100%)`
                                  : `linear-gradient(135deg, rgba(71, 85, 105, 0.4) 0%, rgba(71, 85, 105, 0.2) 100%)`,
                                transition: 'all 0.3s ease',
                                flexShrink: 0,
                                position: 'relative',
                                '&::before': {
                                  content: '""',
                                  position: 'absolute',
                                  inset: '-2px',
                                  borderRadius: '50%',
                                  background: 'inherit',
                                  opacity: 0.3,
                                  filter: 'blur(2px)',
                                },
                              }}
                            />
                            <Typography
                              sx={{
                                fontSize: 'clamp(0.8rem, 2vw, 0.925rem)',
                                fontWeight: 600,
                                color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(71, 85, 105, 1)',
                                lineHeight: 1.4,
                                letterSpacing: '0.01em',
                              }}
                            >
                              {feature}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>

      <Container 
        maxWidth="lg"
        sx={{
          maxWidth: containerMaxWidth,
          px: containerPadding,
        }}
      >
        {/* Bottom Statement - stays normal */}
        <Box
          ref={bottomStatementRef}
          sx={{
            position: 'relative',
            zIndex: 2,
            mt: 'clamp(3rem, 8vw, 5rem)',
          }}
        >
          <Box
            sx={{
              p: { xs: 4, sm: 6, md: 8 },
              borderRadius: 'clamp(20px, 4vw, 28px)',
              background: isDark
                ? 'linear-gradient(135deg, rgba(0, 155, 228, 0.06) 0%, rgba(139, 92, 246, 0.06) 100%)'
                : 'linear-gradient(135deg, rgba(219, 234, 254, 0.4) 0%, rgba(237, 233, 254, 0.4) 100%)',
              backdropFilter: 'blur(16px)',
              border: isDark
                ? '1px solid rgba(255, 255, 255, 0.06)'
                : '1px solid rgba(0, 0, 0, 0.04)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Typography
              sx={{
                fontSize: 'clamp(1.125rem, 3vw, 1.375rem)',
                fontWeight: 600,
                color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(15, 23, 42, 1)',
                lineHeight: 1.6,
                maxWidth: 700,
                mx: 'auto',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <Box
                component="span"
                sx={{
                  background: isDark
                    ? 'linear-gradient(135deg, #009BE4 0%, #8B5CF6 100%)'
                    : 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 700,
                }}
              >
                Engineering rigor
              </Box>{' '}
              underpins conversational intelligence. Every recommendation is validated against
              fundamental process principles, ensuring stable, accurate, and predictable outcomes.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ArchitectureSection;