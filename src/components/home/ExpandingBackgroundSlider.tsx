import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Clone yourself",
    subtitle: "Unlimited possibilities",
    description: "Create AI-powered digital versions of yourself for personalized content at scale"
  },
  {
    id: 2,
    title: "Scale your presence", 
    subtitle: "Be everywhere at once",
    description: "Reach thousands of customers with personalized AI interactions that feel authentic"
  },
  {
    id: 3,
    title: "Automate engagement",
    subtitle: "24/7 availability", 
    description: "Provide consistent, high-quality customer interactions around the clock"
  },
  {
    id: 4,
    title: "Personalize at scale",
    subtitle: "One-to-many becomes one-to-one",
    description: "Deliver personalized experiences to every customer without scaling your team"
  }
];

const ExpandingBackgroundSlider: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const background = backgroundRef.current;
    const video = videoRef.current;
    const slider = sliderRef.current;

    if (!container || !background || !video || !slider) return;

    // Calculate scroll distance needed (slower scrolling)
    const scrollDistance = slides.length * window.innerHeight * 1.5; // Made 1.5x longer for slower effect

    // Main timeline with proper scroll synchronization
    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: `+=${scrollDistance}`,
      pin: true,
      scrub: 1, // Made slower (was 0.5)
      onUpdate: (self) => {
        const progress = self.progress;
        
        // Phase 1: Background expansion (0% to 40% of scroll)
        if (progress <= 0.4) {
          const expansionProgress = progress / 0.4; // 0 to 1
          
          // Calculate scale to fill entire screen
          const minScale = 1;
          const maxScale = Math.max(
            window.innerWidth / 400,
            window.innerHeight / 400
          ) + 2; // Extra padding to ensure full coverage
          
          const currentScale = minScale + (expansionProgress * (maxScale - minScale));
          
          gsap.set(background, {
            scale: currentScale,
            borderRadius: `${200 * (1 - expansionProgress)}px`
          });

          // Video stays normal during expansion
          gsap.set(video, {
            opacity: 1,
            scale: 1,
            y: 0
          });

          // Hide slider during expansion
          gsap.set(slider, {
            opacity: 0,
            x: '0vw'
          });
        }
        // Phase 2: Video moves up and disappears (40% to 60% of scroll)
        else if (progress <= 0.6) {
          const videoExitProgress = (progress - 0.4) / 0.2; // 0 to 1
          
          // Background stays fully expanded
          const maxScale = Math.max(
            window.innerWidth / 400,
            window.innerHeight / 400
          ) + 2;
          
          gsap.set(background, {
            scale: maxScale,
            borderRadius: '0px'
          });

          // Video moves up and fades out
          gsap.set(video, {
            opacity: 1 - videoExitProgress,
            scale: 1 - (videoExitProgress * 0.3),
            y: -window.innerHeight * videoExitProgress * 0.8 // Move up off screen
          });

          // Hide slider during video exit
          gsap.set(slider, {
            opacity: 0,
            x: '0vw'
          });
        }
        // Phase 3: Content sliding (60% to 100% of scroll)
        else {
          // Background stays fully expanded
          const maxScale = Math.max(
            window.innerWidth / 400,
            window.innerHeight / 400
          ) + 2;
          
          gsap.set(background, {
            scale: maxScale,
            borderRadius: '0px'
          });

          // Video is completely gone
          gsap.set(video, {
            opacity: 0,
            scale: 0.7,
            y: -window.innerHeight * 0.8
          });

          // Show and slide content
          const contentProgress = (progress - 0.6) / 0.4; // Normalize to 0-1 for remaining 40%
          gsap.set(slider, {
            opacity: 1,
            x: `${-contentProgress * (slides.length - 1) * 100}vw`
          });
        }
      }
    });

    // Individual slide content animations - updated for new phase timing
    slidesRef.current.forEach((slide: HTMLDivElement, index: number) => {
      if (slide) {
        const slideContent = slide.querySelector('.slide-content');
        if (slideContent) {
          const slideStartProgress = 0.6 + (index * 0.1); // Each slide gets 10% of remaining scroll
          const slideEndProgress = slideStartProgress + 0.1;
          
          ScrollTrigger.create({
            trigger: container,
            start: `${slideStartProgress * 100}% top`,
            end: `${slideEndProgress * 100}% top`,
            scrub: 1.5, // Made slower
            onUpdate: (self) => {
              const slideProgress = self.progress;
              gsap.set(slideContent, {
                opacity: Math.sin(slideProgress * Math.PI), // Fade in and out
                scale: 0.85 + (Math.sin(slideProgress * Math.PI) * 0.15),
                y: 30 * (1 - Math.sin(slideProgress * Math.PI))
              });
            }
          });
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div style={{ 
      height: `${(slides.length + 1) * 100}vh`, // Extra height for scrolling
      position: 'relative'
    }}>
      {/* Main Container */}
      <div 
        ref={containerRef}
        style={{
          height: '100vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: '#f8fafc'
        }}
      >
        {/* Expanding Background */}
        <div
          ref={backgroundRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '400px',
            height: '400px',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
            borderRadius: '200px',
            transform: 'translate(-50%, -50%)',
            transformOrigin: 'center center',
            zIndex: 1
          }}
        />

        {/* Video Container */}
        <div
          ref={videoRef}
          style={{
            position: 'relative',
            zIndex: 3,
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            background: '#000'
          }}
        >
          <div style={{
            width: '100%',
            height: '100%',
            background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '64px',
              height: '64px',
              background: 'rgba(255,255,255,0.95)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              color: '#8b5cf6',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
            }}>
              ▶
            </div>
          </div>
        </div>

        {/* Horizontal Sliding Content */}
        <div
          ref={sliderRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${slides.length * 100}vw`,
            height: '100%',
            display: 'flex',
            zIndex: 2,
            opacity: 0
          }}
        >
          {slides.map((slide: Slide, index: number) => (
            <div
              key={slide.id}
              ref={(el: HTMLDivElement | null) => {
                if (el) slidesRef.current[index] = el;
              }}
              style={{
                width: '100vw',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              <div 
                className="slide-content"
                style={{
                  textAlign: 'center',
                  color: 'white',
                  maxWidth: '700px',
                  padding: '0 3rem'
                }}
              >
                <h1 style={{
                  fontSize: 'clamp(3rem, 6vw, 5rem)',
                  fontWeight: '900',
                  lineHeight: '0.9',
                  marginBottom: '1.5rem',
                  textShadow: '0 4px 12px rgba(0,0,0,0.5)',
                  letterSpacing: '-0.02em'
                }}>
                  {slide.title}
                </h1>
                
                <h2 style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: '600',
                  marginBottom: '2rem',
                  opacity: 0.9,
                  textShadow: '0 2px 8px rgba(0,0,0,0.5)'
                }}>
                  {slide.subtitle}
                </h2>
                
                <p style={{
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                  lineHeight: '1.6',
                  opacity: 0.85,
                  marginBottom: '3rem',
                  textShadow: '0 2px 6px rgba(0,0,0,0.5)',
                  maxWidth: '600px',
                  margin: '0 auto 3rem auto'
                }}>
                  {slide.description}
                </p>

                <button style={{
                  background: 'rgba(255, 255, 255, 0.25)',
                  color: 'white',
                  border: '2px solid rgba(255, 255, 255, 0.4)',
                  padding: '1.2rem 2.5rem',
                  borderRadius: '50px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                  const target = e.target as HTMLButtonElement;
                  target.style.background = 'rgba(255, 255, 255, 0.35)';
                  target.style.transform = 'translateY(-3px)';
                  target.style.boxShadow = '0 12px 32px rgba(0,0,0,0.4)';
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                  const target = e.target as HTMLButtonElement;
                  target.style.background = 'rgba(255, 255, 255, 0.25)';
                  target.style.transform = 'translateY(0)';
                  target.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)';
                }}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpandingBackgroundSlider;