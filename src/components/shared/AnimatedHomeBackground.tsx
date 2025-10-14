import React, { useEffect, useRef } from 'react';
import { Box, styled } from '@mui/material';
import { gsap } from 'gsap';
import { useThemeMode } from '../../contexts/ThemeContext';
import { getHomeBackground } from './pageBackgrounds';

// Styled animated orb components with MUI
const FloatingOrb = styled(Box)<{ 
  variant: 'orb1' | 'orb2' | 'orb3' | 'pulse';
  isDark: boolean; 
}>(({ variant, isDark }) => ({
  position: 'absolute',
  pointerEvents: 'none',
  zIndex: 1,
  borderRadius: '50%',
  willChange: 'transform, opacity',
  
  // Different configurations for each orb
  ...(variant === 'orb1' && {
    top: '10%',
    left: '20%',
    width: '400px',
    height: '400px',
    background: isDark 
      ? 'radial-gradient(circle, rgba(0, 155, 228, 0.12) 0%, rgba(0, 155, 228, 0.06) 40%, transparent 70%)'
      : 'radial-gradient(circle, rgba(0, 155, 228, 0.08) 0%, rgba(0, 155, 228, 0.03) 40%, transparent 70%)',
    animation: 'floatingOrb1 20s ease-in-out infinite',
    '@media (max-width: 768px)': {
      width: '250px',
      height: '250px',
      left: '10%',
    },
  }),
  
  ...(variant === 'orb2' && {
    top: '60%',
    right: '15%',
    width: '300px',
    height: '500px',
    background: isDark
      ? 'radial-gradient(ellipse, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.04) 50%, transparent 70%)'
      : 'radial-gradient(ellipse, rgba(139, 92, 246, 0.06) 0%, rgba(139, 92, 246, 0.02) 50%, transparent 70%)',
    animation: 'floatingOrb2 25s ease-in-out infinite reverse',
    '@media (max-width: 768px)': {
      width: '200px',
      height: '300px',
      right: '10%',
    },
  }),
  
  ...(variant === 'orb3' && {
    top: '30%',
    right: '25%',
    width: '250px',
    height: '350px',
    background: isDark
      ? 'radial-gradient(ellipse, rgba(23, 27, 131, 0.08) 0%, rgba(23, 27, 131, 0.03) 40%, transparent 60%)'
      : 'radial-gradient(ellipse, rgba(23, 27, 131, 0.05) 0%, rgba(23, 27, 131, 0.02) 40%, transparent 60%)',
    animation: 'floatingOrb3 30s ease-in-out infinite',
    '@media (max-width: 768px)': {
      width: '150px',
      height: '200px',
      right: '20%',
    },
  }),
  
  ...(variant === 'pulse' && {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    height: '200px',
    background: isDark
      ? 'radial-gradient(ellipse, rgba(59, 130, 246, 0.06) 0%, rgba(59, 130, 246, 0.02) 50%, transparent 80%)'
      : 'radial-gradient(ellipse, rgba(59, 130, 246, 0.04) 0%, rgba(59, 130, 246, 0.015) 50%, transparent 80%)',
    animation: 'pulseGlow 8s ease-in-out infinite',
    '@media (max-width: 768px)': {
      width: '400px',
      height: '150px',
    },
  }),
}));

// Global animation styles
const animationStyles = `
  @keyframes floatingOrb1 {
    0%, 100% { 
      transform: translate(0px, 0px) scale(1); 
      opacity: 0.8; 
    }
    33% { 
      transform: translate(30px, -20px) scale(1.1); 
      opacity: 1; 
    }
    66% { 
      transform: translate(-20px, 10px) scale(0.9); 
      opacity: 0.9; 
    }
  }
  
  @keyframes floatingOrb2 {
    0%, 100% { 
      transform: translate(0px, 0px) rotate(0deg); 
      opacity: 0.7; 
    }
    50% { 
      transform: translate(-25px, -15px) rotate(180deg); 
      opacity: 1; 
    }
  }
  
  @keyframes floatingOrb3 {
    0%, 100% { 
      transform: translate(0px, 0px) scale(1) rotate(0deg); 
      opacity: 0.6; 
    }
    25% { 
      transform: translate(15px, -30px) scale(1.2) rotate(90deg); 
      opacity: 0.9; 
    }
    50% { 
      transform: translate(-10px, -15px) scale(0.8) rotate(180deg); 
      opacity: 0.7; 
    }
    75% { 
      transform: translate(20px, 10px) scale(1.1) rotate(270deg); 
      opacity: 1; 
    }
  }
  
  @keyframes pulseGlow {
    0%, 100% { 
      transform: translate(-50%, -50%) scale(1); 
      opacity: 0.5; 
    }
    50% { 
      transform: translate(-50%, -50%) scale(1.05); 
      opacity: 0.8; 
    }
  }
  
  @keyframes subtleFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes gentlePulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.6; }
  }
`;

interface AnimatedHomeBackgroundProps {
  children: React.ReactNode;
  variant?: 'default' | 'spectacular' | 'magical';
  enableAnimations?: boolean;
}

export const AnimatedHomeBackground: React.FC<AnimatedHomeBackgroundProps> = ({
  children,
  variant = 'default',
  enableAnimations = true,
}) => {
  const { isDark } = useThemeMode();
  const containerRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Inject animation styles
    const styleElement = document.createElement('style');
    styleElement.textContent = animationStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  useEffect(() => {
    if (!enableAnimations) return;

    const ctx = gsap.context(() => {
      // Enhanced GSAP animations for extra smoothness
      orbsRef.current.forEach((orb, index) => {
        if (orb) {
          // Add subtle hover effect on user interaction
          orb.addEventListener('mouseenter', () => {
            gsap.to(orb, {
              scale: 1.1,
              opacity: 1,
              duration: 0.3,
              ease: 'power2.out',
            });
          });
          
          orb.addEventListener('mouseleave', () => {
            gsap.to(orb, {
              scale: 1,
              opacity: 0.8,
              duration: 0.3,
              ease: 'power2.out',
            });
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [enableAnimations]);

  // Get the appropriate background based on variant
  const getBackgroundStyle = () => {
    switch (variant) {
      case 'spectacular':
        return {
          background: isDark
            ? `/* Energy Vortex Dark */
               conic-gradient(from 45deg at 30% 30%, 
                 rgba(0, 155, 228, 0.2) 0deg, 
                 rgba(23, 27, 131, 0.15) 90deg, 
                 rgba(139, 92, 246, 0.12) 180deg, 
                 rgba(59, 130, 246, 0.18) 270deg, 
                 rgba(0, 155, 228, 0.2) 360deg
               ),
               radial-gradient(ellipse 800px 600px at 70% 70%, rgba(139, 92, 246, 0.08) 0%, transparent 60%),
               linear-gradient(145deg, #0a0e2e 0%, #111827 40%, #0f1419 60%, #0a0e2e 100%)`
            : `/* Energy Vortex Light */
               conic-gradient(from 45deg at 30% 30%, 
                 rgba(0, 155, 228, 0.06) 0deg, 
                 rgba(23, 27, 131, 0.04) 90deg, 
                 rgba(139, 92, 246, 0.03) 180deg, 
                 rgba(59, 130, 246, 0.05) 270deg, 
                 rgba(0, 155, 228, 0.06) 360deg
               ),
               radial-gradient(ellipse 800px 600px at 70% 70%, rgba(139, 92, 246, 0.025) 0%, transparent 60%),
               linear-gradient(145deg, #ffffff 0%, #f8fafc 40%, #fafbfe 60%, #ffffff 100%)`
        };
      case 'magical':
        return {
          background: isDark
            ? `/* Quantum Field Dark */
               radial-gradient(ellipse 1000px 300px at 50% 0%, rgba(0, 155, 228, 0.25) 0%, rgba(0, 155, 228, 0.12) 20%, transparent 60%),
               radial-gradient(ellipse 600px 800px at 85% 50%, rgba(23, 27, 131, 0.2) 0%, transparent 55%),
               radial-gradient(ellipse 500px 700px at 15% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 60%),
               linear-gradient(180deg, #060a1f 0%, #0a0e2e 25%, #111827 50%, #0a0e2e 75%, #060a1f 100%)`
            : `/* Quantum Field Light */
               radial-gradient(ellipse 1000px 300px at 50% 0%, rgba(0, 155, 228, 0.08) 0%, rgba(0, 155, 228, 0.04) 20%, transparent 60%),
               radial-gradient(ellipse 600px 800px at 85% 50%, rgba(23, 27, 131, 0.05) 0%, transparent 55%),
               radial-gradient(ellipse 500px 700px at 15% 80%, rgba(139, 92, 246, 0.04) 0%, transparent 60%),
               linear-gradient(180deg, #ffffff 0%, #fafbff 25%, #ffffff 50%, #fafbff 75%, #ffffff 100%)`
        };
      default:
        return {
          background: getHomeBackground(isDark)
        };
    }
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        ...getBackgroundStyle(),
        transition: 'background 0.3s ease',
      }}
    >
      {/* Animated floating orbs - only if animations are enabled */}
      {enableAnimations && (
        <>
          <FloatingOrb
            ref={(el) => { if (el) orbsRef.current[0] = el as HTMLDivElement; }}
            variant="orb1"
            isDark={isDark}
          />
          <FloatingOrb
            ref={(el) => { if (el) orbsRef.current[1] = el as HTMLDivElement; }}
            variant="orb2"
            isDark={isDark}
          />
          <FloatingOrb
            ref={(el) => { if (el) orbsRef.current[2] = el as HTMLDivElement; }}
            variant="orb3"
            isDark={isDark}
          />
          <FloatingOrb
            ref={(el) => { if (el) orbsRef.current[3] = el as HTMLDivElement; }}
            variant="pulse"
            isDark={isDark}
          />
        </>
      )}
      
      {/* Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          minHeight: '100vh',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};