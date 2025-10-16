import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    id: 1,
    title: "Why use ChatAPC?",
    subtitle: "AI-powered process control",
    description: "Analyze constraints and optimize operations in real-time with advanced process intelligence.",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  {
    id: 2,
    title: "Personalized AI for your plant operations",
    subtitle: "Smart automation insights",
    description: "Generate accurate process recommendations with AI trained on your specific operational data and constraints.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
  },
  {
    id: 3,
    title: "Increase efficiency across all operations",
    subtitle: "Continuous optimization",
    description: "AI-powered insights in plant operations and process control to make your processes truly stand out.",
    image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
  },
  {
    id: 4,
    title: "Real-time monitoring and control",
    subtitle: "Advanced analytics",
    description: "Monitor your process variables and control systems with intelligent recommendations for optimal performance.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
  }
];

const HorizontalScrollSlider = () => {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const slidesRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    const slider = sliderRef.current;
    const slides = slidesRef.current;

    if (!container || !slider || slides.length === 0) return;

    // Calculate total width needed for horizontal scroll
    const totalWidth = slides.length * window.innerWidth;
    
    // Set up horizontal scrolling
    const scrollTween = gsap.to(slider, {
      x: () => -(totalWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        snap: {
          snapTo: 1 / (slides.length - 1),
          duration: 0.5,
          delay: 0.1
        },
        end: () => `+=${totalWidth - window.innerWidth}`,
        onUpdate: (self) => {
          // Update progress indicator
          const progress = self.progress * 100;
          const indicators = container.querySelectorAll('.progress-dot');
          const activeIndex = Math.round(self.progress * (slides.length - 1));
          
          indicators.forEach((dot, index) => {
            if (index === activeIndex) {
              dot.classList.add('active');
            } else {
              dot.classList.remove('active');
            }
          });
        }
      }
    });

    // Parallax effect for images
    slides.forEach((slide, index) => {
      const image = slide.querySelector('.slide-image');
      const content = slide.querySelector('.slide-content');
      
      if (image) {
        gsap.to(image, {
          x: () => index * -200,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }

      // Animate content on scroll
      gsap.fromTo(content, 
        {
          opacity: 0,
          y: 50,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: slide,
            start: "left center",
            end: "right center",
            toggleActions: "play reverse play reverse",
            scrub: 1
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div style={{ background: '#f8fafc' }}>

      {/* Horizontal Scroll Container */}
      <div 
        ref={containerRef}
        style={{
          height: '100vh',
          overflow: 'hidden',
          position: 'relative',
          marginTop: '80px'
        }}
      >
        <div 
          ref={sliderRef}
          style={{
            display: 'flex',
            height: '100%',
            width: `${slides.length * 100}vw`
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              ref={el => slidesRef.current[index] = el}
              style={{
                width: '100vw',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                background: slide.gradient
              }}
            >
              {/* Background Image with Parallax */}
              <div 
                className="slide-image"
                style={{
                  position: 'absolute',
                  right: index % 2 === 0 ? '5%' : '5%',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '500px',
                  height: '400px',
                  borderRadius: '50px',
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                  zIndex: 2
                }}
              />

              {/* Content */}
              <div 
                className="slide-content"
                style={{
                  maxWidth: '600px',
                  padding: '0 5%',
                  zIndex: 3,
                  color: 'white',
                  marginLeft: index % 2 === 0 ? '5%' : 'auto',
                  marginRight: index % 2 === 0 ? 'auto' : '5%',
                  textAlign: index % 2 === 0 ? 'left' : 'right'
                }}
              >
                <h1 style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: '900',
                  lineHeight: '1.1',
                  marginBottom: '1rem',
                  textShadow: '0 4px 8px rgba(0,0,0,0.3)'
                }}>
                  {slide.title}
                </h1>
                
                <h2 style={{
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                  fontWeight: '600',
                  marginBottom: '1.5rem',
                  opacity: 0.9,
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}>
                  {slide.subtitle}
                </h2>
                
                <p style={{
                  fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                  lineHeight: '1.6',
                  opacity: 0.8,
                  marginBottom: '2rem',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}>
                  {slide.description}
                </p>

                <button style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  padding: '1rem 2rem',
                  borderRadius: '50px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.background = 'rgba(255, 255, 255, 0.3)';
                  (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.background = 'rgba(255, 255, 255, 0.2)';
                  (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
                }}
                >
                  Learn More
                </button>
              </div>

              {/* Decorative Elements */}
              <div style={{
                position: 'absolute',
                top: '20%',
                left: index % 2 === 0 ? '80%' : '10%',
                width: '100px',
                height: '100px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                filter: 'blur(2px)',
                animation: 'float 6s ease-in-out infinite'
              }} />
              
              <div style={{
                position: 'absolute',
                bottom: '30%',
                right: index % 2 === 0 ? '15%' : '70%',
                width: '150px',
                height: '150px',
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '30px',
                filter: 'blur(3px)',
                animation: 'float 8s ease-in-out infinite reverse'
              }} />
            </div>
          ))}
        </div>

        {/* Progress Indicators */}
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '0.5rem',
          zIndex: 10
        }}>
          {slides.map((_, index) => (
            <div
              key={index}
              className={`progress-dot ${index === 0 ? 'active' : ''}`}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
      </div>

      {/* Additional Content */}
      <div style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        background: 'white'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          marginBottom: '1rem',
          color: '#1e293b'
        }}>
          Ready to transform your operations?
        </h2>
        <p style={{
          fontSize: '1.25rem',
          color: '#64748b',
          marginBottom: '2rem',
          maxWidth: '600px',
          margin: '0 auto 2rem auto'
        }}>
          Join thousands of engineers who trust ChatAPC for process optimization
        </p>
        <button style={{
          background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
          color: 'white',
          border: 'none',
          padding: '1rem 2rem',
          borderRadius: '50px',
          fontWeight: '600',
          cursor: 'pointer',
          fontSize: '1.1rem',
          boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)'
        }}>
          Get Started Today
        </button>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .progress-dot.active {
          background: white !important;
          transform: scale(1.2);
        }
        
        .progress-dot:hover {
          background: rgba(255, 255, 255, 0.8);
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};

export default HorizontalScrollSlider;