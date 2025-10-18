import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

interface CosmicParticlesOverlayProps {
  isDark?: boolean;
  particleCount?: number;
  speedMultiplier?: number;
}

/**
 * Cosmic Particles Overlay Component - Optimized Version
 * طبقة جسيمات محسّنة للأداء تتحرك فوق أي خلفية
 */
const CosmicParticlesOverlay: React.FC<CosmicParticlesOverlayProps> = ({ 
  isDark = true,
  particleCount,
  speedMultiplier = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<any[]>([]);
  const animationFrameRef = useRef<number>();

  // Color configurations for light and dark modes
  const colors = {
    dark: [
      'rgba(0, 155, 228, 0.7)',   // Cyan #009BE4
      'rgba(139, 92, 246, 0.7)',  // Purple
      'rgba(59, 130, 246, 0.7)'   // Blue
    ],
    light: [
      'rgba(37, 99, 235, 0.6)',   // Blue #2563EB
      'rgba(139, 92, 246, 0.6)',  // Purple
      'rgba(59, 130, 246, 0.6)'   // Light Blue
    ]
  };

  const currentColors = isDark ? colors.dark : colors.light;

  // Particle Class - Optimized
  class Particle {
    x: number;
    y: number;
    size: number;
    speed: number;
    colorIndex: number;
    alpha: number;
    drift: number;
    canvasWidth: number;
    canvasHeight: number;
    fadeThreshold: number;

    constructor(canvasWidth: number, canvasHeight: number) {
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.fadeThreshold = canvasHeight * 0.5;
      this.reset();
    }

    reset() {
      this.x = Math.random() * this.canvasWidth;
      this.y = this.canvasHeight + Math.random() * 50;
      this.size = Math.random() * 2.5 + 0.8; // Larger particles
      this.speed = (Math.random() * 0.4 + 0.6) * speedMultiplier; // Slightly slower for smoother flow
      this.colorIndex = Math.floor(Math.random() * currentColors.length);
      this.alpha = 1;
      this.drift = (Math.random() - 0.5) * 0.15; // More horizontal movement
    }

    update() {
      this.y -= this.speed;
      this.x += this.drift;

      // Optimized fade calculation - starts fading later for longer trails
      if (this.y < this.fadeThreshold) {
        this.alpha = Math.pow(this.y / this.fadeThreshold, 0.7); // Smoother fade
      }

      // Reset when off screen
      if (this.y < -50 || this.alpha <= 0.05) {
        this.reset();
      }
    }

    draw(ctx: CanvasRenderingContext2D) {
      const color = currentColors[this.colorIndex];
      const colorWithAlpha = color.replace(/[\d.]+\)$/, `${this.alpha * 0.8})`); // More visible
      
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      
      // Enhanced glow for better visibility
      ctx.shadowBlur = 8;
      ctx.shadowColor = colorWithAlpha;
      ctx.fillStyle = colorWithAlpha;
      ctx.fill();
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { 
      alpha: true,
      desynchronized: true // Better performance
    });
    if (!ctx) return;

    let animationId: number;

    // Resize canvas to fill container
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio, 2); // Limit DPR for performance
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      ctx.scale(dpr, dpr);
      
      // Increased particle count for continuous flow
      const count = particleCount || Math.floor((rect.width * rect.height) / 2500);
      
      // Reinitialize particles
      particlesRef.current = [];
      for (let i = 0; i < count; i++) {
        particlesRef.current.push(new Particle(rect.width, rect.height));
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Optimized animation loop
    let lastTime = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      animationId = requestAnimationFrame(animate);

      // Frame rate limiting
      const deltaTime = currentTime - lastTime;
      if (deltaTime < frameInterval) return;
      
      lastTime = currentTime - (deltaTime % frameInterval);

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Batch rendering
      ctx.shadowBlur = 0; // Reset shadow once
      
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);
      }
      
      ctx.shadowBlur = 0; // Reset after all particles
    };

    animate(0);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isDark, particleCount, speedMultiplier]);

  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 2,
        pointerEvents: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          willChange: 'transform', // Hardware acceleration hint
        }}
      />
    </Box>
  );
};

export default CosmicParticlesOverlay;