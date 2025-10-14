// =============================================================================
// UNIFIED ANIMATION SYSTEM
// =============================================================================
// Edit this file once to change all animations across the project

// ANIMATION CONSTANTS
export const animationConfig = {
    // TIMING
    duration: {
      fast: 0.3,
      medium: 0.6,
      slow: 0.8,
      verySlow: 1.2,
    },
    
    // DELAYS
    delay: {
      none: 0,
      short: 0.1,
      medium: 0.2,
      long: 0.4,
    },
    
    // EASING
    easing: {
      smooth: 'power2.out',
      bounce: 'back.out(1.7)',
      elastic: 'elastic.out(1, 0.3)',
      sharp: 'power3.out',
    },
    
    // DISTANCES
    movement: {
      small: 15,
      medium: 30,
      large: 50,
      extraLarge: 80,
    }
  };
  
  // COMMON ANIMATION PRESETS
  export const animationPresets = {
    // FADE IN
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
      duration: animationConfig.duration.medium,
      ease: animationConfig.easing.smooth,
    },
    
    // SLIDE UP
    slideUp: {
      from: { 
        opacity: 0, 
        y: animationConfig.movement.medium 
      },
      to: { 
        opacity: 1, 
        y: 0 
      },
      duration: animationConfig.duration.slow,
      ease: animationConfig.easing.smooth,
    },
    
    // SLIDE DOWN
    slideDown: {
      from: { 
        opacity: 0, 
        y: -animationConfig.movement.medium 
      },
      to: { 
        opacity: 1, 
        y: 0 
      },
      duration: animationConfig.duration.slow,
      ease: animationConfig.easing.smooth,
    },
    
    // SLIDE LEFT
    slideLeft: {
      from: { 
        opacity: 0, 
        x: animationConfig.movement.large 
      },
      to: { 
        opacity: 1, 
        x: 0 
      },
      duration: animationConfig.duration.slow,
      ease: animationConfig.easing.smooth,
    },
    
    // SLIDE RIGHT
    slideRight: {
      from: { 
        opacity: 0, 
        x: -animationConfig.movement.large 
      },
      to: { 
        opacity: 1, 
        x: 0 
      },
      duration: animationConfig.duration.slow,
      ease: animationConfig.easing.smooth,
    },
    
    // SCALE UP
    scaleUp: {
      from: { 
        opacity: 0, 
        scale: 0.9 
      },
      to: { 
        opacity: 1, 
        scale: 1 
      },
      duration: animationConfig.duration.medium,
      ease: animationConfig.easing.bounce,
    },
    
    // ROTATE IN
    rotateIn: {
      from: { 
        opacity: 0, 
        rotation: -10 
      },
      to: { 
        opacity: 1, 
        rotation: 0 
      },
      duration: animationConfig.duration.slow,
      ease: animationConfig.easing.smooth,
    },
  };
  
  // STAGGER ANIMATIONS
  export const staggerConfig = {
    // CARDS STAGGER
    cards: {
      delay: animationConfig.delay.medium,
      duration: animationConfig.duration.slow,
      ease: animationConfig.easing.smooth,
    },
    
    // TEXT STAGGER (for multiple text elements)
    text: {
      delay: animationConfig.delay.short,
      duration: animationConfig.duration.medium,
      ease: animationConfig.easing.smooth,
    },
    
    // LIST ITEMS STAGGER
    listItems: {
      delay: animationConfig.delay.short,
      duration: animationConfig.duration.medium,
      ease: animationConfig.easing.smooth,
    },
  };
  
  // FLOATING ANIMATIONS (continuous)
  export const floatingAnimations = {
    // SUBTLE FLOAT
    subtle: {
      y: -animationConfig.movement.small,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
    },
    
    // MEDIUM FLOAT
    medium: {
      y: -animationConfig.movement.medium,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
    },
    
    // ROTATION FLOAT
    rotate: {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: 'none',
    },
  };
  
  // HOVER ANIMATIONS
  export const hoverAnimations = {
    // LIFT UP
    liftUp: {
      y: -8,
      duration: animationConfig.duration.fast,
      ease: animationConfig.easing.smooth,
    },
    
    // SCALE
    scale: {
      scale: 1.02,
      duration: animationConfig.duration.fast,
      ease: animationConfig.easing.smooth,
    },
    
    // GLOW
    glow: {
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
      duration: animationConfig.duration.fast,
      ease: animationConfig.easing.smooth,
    },
  };
  
  // SCROLL TRIGGER SETTINGS
  export const scrollTriggerConfig = {
    // STANDARD ENTRANCE
    entrance: {
      trigger: 'element', // will be replaced with actual element
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
    
    // SCRUB ANIMATION
    scrub: {
      trigger: 'element',
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 1,
    },
    
    // TIMELINE REVEAL
    timelineReveal: {
      trigger: 'element',
      start: 'top 85%',
      end: 'bottom 15%',
      scrub: 1,
    },
  };
  
  // PAGE-SPECIFIC ANIMATION SEQUENCES
  export const pageAnimations = {
    // HERO SECTION SEQUENCE
    hero: {
      content: {
        ...animationPresets.slideUp,
        delay: 0,
      },
      title: {
        ...animationPresets.slideUp,
        delay: animationConfig.delay.medium,
        duration: animationConfig.duration.medium,
      },
      subtitle: {
        ...animationPresets.scaleUp,
        delay: animationConfig.delay.long,
      },
      description: {
        ...animationPresets.fadeIn,
        delay: animationConfig.delay.long + 0.2,
      },
    },
    
    // CARDS SECTION SEQUENCE
    cards: {
      stagger: staggerConfig.cards,
      individual: animationPresets.slideUp,
      hover: {
        ...hoverAnimations.liftUp,
        ...hoverAnimations.scale,
      },
    },
    
    // TIMELINE SECTION SEQUENCE
    timeline: {
      line: {
        from: { scaleY: 0 },
        to: { scaleY: 1 },
        transformOrigin: 'top',
        ease: 'none',
      },
      cards: {
        stagger: staggerConfig.cards,
        individual: {
          from: { 
            opacity: 0, 
            x: (index: number) => index % 2 === 0 ? -animationConfig.movement.large : animationConfig.movement.large 
          },
          to: { opacity: 1, x: 0 },
          duration: animationConfig.duration.slow,
          ease: animationConfig.easing.smooth,
        },
      },
      items: {
        stagger: staggerConfig.listItems,
        individual: animationPresets.slideUp,
      },
    },
  };
  
  // HELPER FUNCTIONS
  export const createStaggerAnimation = (
    elements: HTMLElement[],
    preset: keyof typeof animationPresets,
    staggerDelay: number = staggerConfig.cards.delay
  ) => {
    const animation = animationPresets[preset];
    
    elements.forEach((element, index) => {
      if (element) {
        // Return GSAP animation object
        return {
          element,
          from: animation.from,
          to: animation.to,
          duration: animation.duration,
          ease: animation.ease,
          delay: index * staggerDelay,
        };
      }
    });
  };
  
  export const createFloatingAnimation = (
    element: HTMLElement,
    type: keyof typeof floatingAnimations = 'subtle',
    delayOffset: number = 0
  ) => {
    const animation = floatingAnimations[type];
    
    return {
      element,
      ...animation,
      delay: delayOffset,
    };
  };
  
  // QUICK ACCESS FUNCTIONS
  export const getHeroAnimations = () => pageAnimations.hero;
  export const getCardsAnimations = () => pageAnimations.cards;
  export const getTimelineAnimations = () => pageAnimations.timeline;