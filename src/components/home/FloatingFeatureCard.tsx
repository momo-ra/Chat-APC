import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { gsap } from 'gsap';
import industrialImage from '../../assets/hero-industrial-ai.jpg';

interface FloatingFeatureCardProps {
  content: string;
  position: 'left-top' | 'right-top' | 'left-bottom' | 'right-bottom';
  delay?: number;
}

const positionStyles = {
  'left-top': { top: '10%', left: { xs: '5%', md: '18%' } },
  'right-top': { top: '15%', right: '5%' },
  'left-bottom': { bottom: '20%', left: { xs: '8%', md: '20%' } },
  'right-bottom': { bottom: '30%', right: '8%' },
};

const FloatingFeatureCard: React.FC<FloatingFeatureCardProps> = ({ 
  content, 
  position, 
  delay = 0 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      const isLeft = position.includes('left');
      
      gsap.fromTo(
        cardRef.current,
        {
          x: isLeft ? -120 : 100,
          opacity: 0,
          scale: 0.8,
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: delay,
          ease: 'power2.out',
        }
      );

      gsap.to(cardRef.current, {
        y: -50,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: delay,
      });
    }
  }, [position, delay]);

  return (
    <Box
      ref={cardRef}
      sx={{
        position: 'absolute',
        display: { xs: 'none', md: 'block' }, // Hide on mobile and tablet
        width: 300,
        height: 220,
        borderRadius: 2.5,
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        zIndex: 3,
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        opacity: 0.7,
        filter: 'blur(2px)',
        ...positionStyles[position],
        '&:hover': {
          opacity: 1,
          filter: 'blur(0px)',
          borderColor: 'rgba(0, 155, 228, 0.3)',
          boxShadow: '0 8px 28px rgba(0, 155, 228, 0.2)',
          transform: 'translateY(-5px) scale(1.08)',
        },
      }}
    >
      <Box
        component="img"
        src={industrialImage}
        alt="Industrial Process"
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </Box>
  );
};

export default FloatingFeatureCard;

