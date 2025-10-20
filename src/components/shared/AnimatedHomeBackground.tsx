import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { useThemeMode } from '../../contexts/ThemeContext';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  alpha: number;
  reset: (width: number, height: number) => void;
  update: (width: number, height: number) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

interface Connection {
  particle1: Particle;
  particle2: Particle;
  distance: number;
  active: boolean;
  alpha: number;
  update: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

const CYAN_RGB = '0, 242, 254'; // #00f2fe
const BLUE_RGB = '18, 82, 185'; //rgb(18, 82, 185)

const CYAN_LINE = '#00f2fe';
const BLUE_LINE = 'rgb(18, 82, 185)';

const ParticleBackground: React.FC = () => {
  const { isDark } = useThemeMode();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Color logic depending on theme
    const PARTICLE_RGB = isDark ? CYAN_RGB : BLUE_RGB;
    const LINE_COLOR = isDark ? CYAN_LINE : BLUE_LINE;

    // Particle class
    const createParticle = (): Particle => {
      const particle = {
        x: 0,
        y: 0,
        size: 0,
        speedX: 0,
        speedY: 0,
        color: '',
        alpha: 0,
        reset: function(width: number, height: number) {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
          this.size = Math.random() * 2 + 2;
          this.speedX = Math.random() * 0.5 - 0.25;
          this.speedY = Math.random() * 0.5 - 0.25;
          // Use blue in light mode, cyan in dark mode
          this.color = `rgba(${PARTICLE_RGB}, ${Math.random() * 0.4 + 0.1})`;
          this.alpha = Math.random() * 0.5 + 0.2;
        },
        update: function(width: number, height: number) {
          this.x += this.speedX;
          this.y += this.speedY;

          if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
            this.reset(width, height);
          }
        },
        draw: function(ctx: CanvasRenderingContext2D) {
          ctx.save();
          ctx.globalAlpha = this.alpha;
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      };
      particle.reset(canvas.width, canvas.height);
      return particle;
    };

    // Connection class
    const createConnection = (p1: Particle, p2: Particle): Connection => {
      return {
        particle1: p1,
        particle2: p2,
        distance: 0,
        active: false,
        alpha: 0,
        update: function() {
          const dx = this.particle1.x - this.particle2.x;
          const dy = this.particle1.y - this.particle2.y;
          this.distance = Math.sqrt(dx * dx + dy * dy);
          // Increase segment: originally 150, now 240
          this.active = this.distance < 240;
          // Adjust alpha accordingly
          this.alpha = 0.1 * (1 - this.distance / 240);
        },
        draw: function(ctx: CanvasRenderingContext2D) {
          if (!this.active) return;

          ctx.save();
          ctx.globalAlpha = this.alpha;
          ctx.strokeStyle = LINE_COLOR;
          // Increase line width: originally 0.5, now 1.5
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(this.particle1.x, this.particle1.y);
          ctx.lineTo(this.particle2.x, this.particle2.y);
          ctx.stroke();
          ctx.restore();
        }
      };
    };

    // Create particles and connections
    const particles: Particle[] = [];
    const connections: Connection[] = [];
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        connections.push(createConnection(particles[i], particles[j]));
      }
    }

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      // Remove background color fill (leave transparent)
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Remove gradient overlay (no background fill at all)

      // Update and draw particles
      particles.forEach(particle => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
      });

      // Update and draw connections
      connections.forEach(connection => {
        connection.update();
        connection.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      particles.forEach(particle => {
        const dx = e.clientX - particle.x;
        const dy = e.clientY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          particle.speedX += dx * 0.0001;
          particle.speedY += dy * 0.0001;
        }
      });
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]); // Depend on theme change

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      />
    </Box>
  );
};

export default ParticleBackground;