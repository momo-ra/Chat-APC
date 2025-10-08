import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useThemeMode } from "../../contexts/ThemeContext";
import firstPart from "../../assets/first-part.png";
import secondPart from "../../assets/second-part.png";
import thirdPart from "../../assets/third-part.png";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const [showSecondPart, setShowSecondPart] = useState(false);
  
  // Determine if we should use dark mode
  const isDark = useThemeMode().isDark;

  useEffect(() => {
    // Show second part (text) after 1 second
    const secondPartTimer = setTimeout(() => {
      setShowSecondPart(true);
    }, 1000);

    // Start exit animation after 3 seconds
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 3000);

    // Complete and remove splash screen after exit animation
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3700);

    return () => {
      clearTimeout(secondPartTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <Box
      className={isExiting ? "animate-fade-out" : "animate-fade-in"}
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        transition: 'background 0.3s ease',
        background: isDark 
          ? "linear-gradient(135deg, hsl(219, 27%, 14%) 0%, hsl(219, 25%, 20%) 100%)"
          : "linear-gradient(135deg, hsl(0, 0%, 98%) 0%, hsl(210, 40%, 96%) 100%)",
      }}
      role="status"
      aria-label="Loading ChatAPC"
      data-theme={isDark ? 'dark' : 'light'}
    >
      {/* Ambient Glow Effects */}
      <Box
        className="animate-ambient-glow"
        sx={{
          position: 'absolute',
          left: '30%',
          top: '50%',
          height: '384px',
          width: '384px',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          filter: 'blur(96px)',
          background: isDark
            ? "radial-gradient(circle, hsla(237, 58%, 42%, 0.15) 0%, transparent 70%)"
            : "radial-gradient(circle, hsla(237, 58%, 42%, 0.08) 0%, transparent 70%)",
        }}
      />
      <Box
        className="animate-ambient-glow"
        sx={{
          position: 'absolute',
          left: '70%',
          top: '50%',
          height: '384px',
          width: '384px',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          filter: 'blur(96px)',
          background: isDark
            ? "radial-gradient(circle, hsla(197, 100%, 50%, 0.15) 0%, transparent 70%)"
            : "radial-gradient(circle, hsla(197, 100%, 50%, 0.08) 0%, transparent 70%)",
          animationDelay: '4s',
        }}
      />

      {/* Subtle Grid Pattern */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.3,
          backgroundImage: isDark
            ? "radial-gradient(circle, rgba(255, 255, 255, 0.03) 1px, transparent 1px)"
            : "radial-gradient(circle, rgba(0, 0, 0, 0.03) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Floating Particles */}
      {[...Array(10)].map((_, i) => (
        <Box
          key={i}
          className={i % 2 === 0 ? "animate-float" : "animate-float-alt"}
          sx={{
            position: 'absolute',
            height: '4px',
            width: '4px',
            borderRadius: '50%',
            filter: 'blur(2px)',
            background: isDark 
              ? "hsla(197, 100%, 50%, 0.3)" 
              : "hsla(197, 100%, 50%, 0.2)",
            left: `${30 + Math.random() * 40}%`,
            top: `${30 + Math.random() * 40}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${4 + i * 0.5}s`,
          }}
        />
      ))}

      {/* Main Content Container */}
      <Box sx={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {/* Logo Animation - Three Parts Combined */}
        <Box sx={{ position: 'relative', mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0 }}>
          {/* Left Side: First Part and Third Part Stacked Vertically */}
          <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {/* Third Part - Top Right Shape with Spin Animation (delayed) */}
            <Box
              sx={{
                position: 'absolute',
                top: '-24px',
                right: '-32px',
                animation: 'spinInBounce 1.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
                filter: 'drop-shadow(0 0 40px hsla(197, 100%, 50%, 0.5))',
              }}
            >
              <Box
                component="img"
                src={thirdPart}
                alt="Logo Top Right Shape"
                sx={{
                  height: { xs: '40px', md: '56px', lg: '72px' },
                  width: 'auto',
                }}
              />
            </Box>
            
            {/* First Part - Bottom Left Shapes with Spin Animation */}
            <Box
              sx={{
                position: 'relative',
                animation: 'spinInElastic 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
                filter: 'drop-shadow(0 0 40px hsla(197, 100%, 50%, 0.5))',
              }}
            >
              <Box
                component="img"
                src={firstPart}
                alt="Logo Left Bottom Shapes"
                sx={{
                  height: { xs: '96px', md: '128px', lg: '160px' },
                  width: 'auto',
                }}
              />
            </Box>
          </Box>

          {/* Right Side: Second Part - Text with Fade In and Slide from Right */}
          <Box
            className={showSecondPart ? "animate-slideInText" : ""}
            sx={{
              position: 'relative',
              opacity: showSecondPart ? 1 : 0,
              transform: showSecondPart ? 'translateX(0)' : 'translateX(48px)',
              filter: 'drop-shadow(0 0 30px hsla(197, 100%, 50%, 0.4))',
            }}
          >
            <Box
              component="img"
              src={secondPart}
              alt="Chat Text"
              sx={{
                height: { xs: '96px', md: '128px', lg: '160px' },
                width: 'auto',
              }}
            />
          </Box>

          {/* Glow effect that pulses behind */}
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '384px',
              height: '384px',
              background: 'linear-gradient(90deg, hsl(237, 58%, 42%), hsl(197, 100%, 50%), hsl(237, 58%, 42%))',
              backgroundSize: '200% 100%',
              filter: 'blur(96px)',
              borderRadius: '50%',
              zIndex: -1,
              animation: 'pulseGlow 2s ease-in-out infinite',
              opacity: 0.2,
            }}
          />
        </Box>

        {/* Tagline */}
        <Typography
          className="animate-fade-in-up"
          sx={{
            mb: 5,
            fontSize: { xs: '1rem', md: '1.125rem' },
            letterSpacing: '0.1em',
            color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(71, 85, 105, 0.7)',
            animationDelay: '1.3s',
            animationFillMode: 'both',
          }}
        >
          Industrial AI Platform
        </Typography>

        {/* Loading Indicator - Animated Dots */}
        <Box
          className="animate-fade-in"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1.5,
            animationDelay: '1.7s',
            animationFillMode: 'both',
          }}
        >
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              className="animate-dot-pulse"
              sx={{
                height: '8px',
                width: '8px',
                borderRadius: '50%',
                background: 'hsl(197, 100%, 50%)',
                boxShadow: isDark 
                  ? "0 0 10px hsla(197, 100%, 50%, 0.5)" 
                  : "0 0 8px hsla(197, 100%, 50%, 0.3)",
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Custom Animations */}
      <style>{`
        @keyframes spinInElastic {
          0% {
            transform: rotate(-45deg) scale(0) translateY(20px);
            opacity: 0;
            filter: blur(10px) drop-shadow(0 0 40px hsla(197, 100%, 50%, 0));
          }
          40% {
            transform: rotate(180deg) scale(0.8);
            opacity: 0.7;
            filter: blur(5px) drop-shadow(0 0 60px hsla(197, 100%, 50%, 0.8));
          }
          70% {
            transform: rotate(340deg) scale(1.08);
            filter: blur(0px) drop-shadow(0 0 50px hsla(197, 100%, 50%, 0.6));
          }
          85% {
            transform: rotate(355deg) scale(0.98);
          }
          100% {
            transform: rotate(360deg) scale(1) translateY(0);
            opacity: 1;
            filter: blur(0px) drop-shadow(0 0 40px hsla(197, 100%, 50%, 0.5));
          }
        }

        @keyframes spinInBounce {
          0% {
            transform: rotate(45deg) scale(0) translate(30px, -30px);
            opacity: 0;
            filter: blur(10px) drop-shadow(0 0 40px hsla(197, 100%, 50%, 0));
          }
          25% {
            opacity: 0;
          }
          45% {
            transform: rotate(-200deg) scale(0.7) translate(10px, -10px);
            opacity: 0.8;
            filter: blur(4px) drop-shadow(0 0 60px hsla(197, 100%, 50%, 0.9));
          }
          75% {
            transform: rotate(-350deg) scale(1.12);
            filter: blur(0px) drop-shadow(0 0 55px hsla(197, 100%, 50%, 0.7));
          }
          90% {
            transform: rotate(-365deg) scale(0.96);
          }
          100% {
            transform: rotate(-360deg) scale(1) translate(0, 0);
            opacity: 1;
            filter: blur(0px) drop-shadow(0 0 40px hsla(197, 100%, 50%, 0.5));
          }
        }

        @keyframes slideInText {
          0% {
            transform: translateX(50px) scale(0.9);
            opacity: 0;
            filter: blur(8px) drop-shadow(0 0 30px hsla(197, 100%, 50%, 0));
          }
          60% {
            transform: translateX(-5px) scale(1.02);
            filter: blur(2px) drop-shadow(0 0 40px hsla(197, 100%, 50%, 0.6));
          }
          80% {
            transform: translateX(2px) scale(0.99);
          }
          100% {
            transform: translateX(0) scale(1);
            opacity: 1;
            filter: blur(0px) drop-shadow(0 0 30px hsla(197, 100%, 50%, 0.4));
          }
        }

        .animate-slideInText {
          animation: slideInText 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }

        @keyframes pulseGlow {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.15;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 0.25;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>
    </Box>
  );
};

export default SplashScreen;
