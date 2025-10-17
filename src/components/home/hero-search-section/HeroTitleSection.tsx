import React, { useRef, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import gsap from 'gsap';

interface HeroTitleSectionProps {
  isDark: boolean;
  onAnimationComplete: () => void;
}

export const HeroTitleSection: React.FC<HeroTitleSectionProps> = ({
  isDark,
  onAnimationComplete,
}) => {
  const firstTitleRef = useRef<HTMLDivElement>(null);
  const secondTitleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    // Prevent multiple animations
    if (hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onAnimationComplete();
        },
      });

      const words = firstTitleRef.current?.querySelectorAll('[class^="word-"]');
      const isMobileView = window.innerWidth < 768;
      const isTabletView = window.innerWidth >= 768 && window.innerWidth < 1024;

      const startY = isMobileView
        ? window.innerHeight * 0.25
        : isTabletView
        ? window.innerHeight * 0.3
        : window.innerHeight * 0.35;

      const startScale = isMobileView ? 1.5 : isTabletView ? 1.8 : 2.2;
      const animationDuration = isMobileView ? 1.6 : 1.8;

      gsap.set([secondTitleRef.current, subtitleRef.current], {
        opacity: 0,
        y: isMobileView ? 40 : 60,
      });

      gsap.set(firstTitleRef.current, {
        y: startY,
        scale: startScale,
        opacity: 1,
        transformOrigin: 'center center',
      });

      gsap.set(words, {
        opacity: 0.3,
        filter: 'grayscale(100%) brightness(0.5)',
        y: 0,
      });

      tl.to(firstTitleRef.current, {
        y: 0,
        duration: animationDuration,
        ease: 'power2.out',
      })
        .to(
          words,
          {
            opacity: 1,
            filter: 'grayscale(0%) brightness(1)',
            duration: animationDuration * 0.9,
            stagger: isMobileView ? 0.08 : 0.1,
            ease: 'power2.inOut',
          },
          `-=${animationDuration * 0.9}`
        )
        .to({}, { duration: isMobileView ? 0.3 : 0.5 })
        .to(firstTitleRef.current, {
          scale: 1,
          duration: isMobileView ? 1 : 1.2,
          ease: 'power3.inOut',
        })
        .to(
          secondTitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
          },
          '-=0.5'
        )
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.4'
        )
        // Call onAnimationComplete early - before timeline finishes
        // This allows chat area to appear while titles are in final position
        .call(() => {
          onAnimationComplete();
        }, [], '-=0.2');
    });

    return () => {
      ctx.revert();
    };
  }, []); // Empty dependency array - only run once

  return (
    <>
      {/* Main Title with word-by-word animation */}
      <Box
        ref={firstTitleRef}
        sx={{
          fontSize: { xs: '1.6rem', sm: '2.4rem', md: '3.2rem' },
          fontWeight: 900,
          letterSpacing: '-0.02em',
          textAlign: 'center',
          position: 'relative',
          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          display: 'flex',
          gap: { xs: '0.25rem', sm: '0.4rem', md: '0.5rem' },
          justifyContent: 'center',
          flexWrap: 'wrap',
          transformStyle: 'preserve-3d',
          px: { xs: 1, sm: 2, md: 0 },
        }}
      >
        {['Chat', 'with', 'your', 'plant.'].map((word, index) => (
          <Box
            key={index}
            component="span"
            className={`word-${index}`}
            sx={{
              background: isDark
                ? 'linear-gradient(135deg, #009BE4 0%, #34D399 100%)'
                : 'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
            }}
          >
            {word}
          </Box>
        ))}
      </Box>

      <Typography
        ref={secondTitleRef}
        sx={{
          fontSize: { xs: '1.6rem', sm: '2.4rem', md: '3.2rem' },
          fontWeight: 900,
          background: isDark
            ? 'linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 50%, #E2E8F0 100%)'
            : 'linear-gradient(135deg, #0F172A 0%, #334155 50%, #475569 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
          mb: 2,
          textAlign: 'center',
          position: 'relative',
          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          px: { xs: 1, sm: 2, md: 0 },
        }}
      >
        Turn data into decisions.
      </Typography>

      <Typography
        ref={subtitleRef}
        sx={{
          fontSize: { xs: '0.95rem', sm: '1.15rem', md: '1.25rem' },
          fontWeight: 500,
          color: isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(15, 23, 42, 0.85)',
          lineHeight: 1.6,
          textAlign: 'center',
          maxWidth: '700px',
          margin: '0 auto 1rem auto',
          position: 'relative',
          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          px: { xs: 2, sm: 3, md: 0 },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-24px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '40px',
            height: '1px',
            background: isDark
              ? 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)'
              : 'linear-gradient(90deg, transparent 0%, rgba(15,23,42,0.4) 50%, transparent 100%)',
          },
        }}
      >
        <Box
          component="span"
          sx={{
            background: isDark
              ? 'linear-gradient(135deg, #009BE4 0%, #34D399 100%)'
              : 'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 600,
          }}
        >
          ChatAPC
        </Box>{' '}
        blends engineering expertise with AI to deliver clear, reliable insights —
        detecting issues early and revealing profit opportunities.
      </Typography>
    </>
  );
};