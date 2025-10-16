// =============================================================================
// ANIMATION HELPERS - Apply unified animations using animation.ts config
// =============================================================================

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  animationPresets, 
  animationConfig, 
  staggerConfig,
  scrollTriggerConfig 
} from './animation';

gsap.registerPlugin(ScrollTrigger);

/**
 * Apply entrance animation with scroll trigger
 */
export const applyEntranceAnimation = (
  element: HTMLElement | null,
  preset: keyof typeof animationPresets = 'slideUp',
  options?: {
    delay?: number;
    startTrigger?: string;
    customProps?: gsap.TweenVars;
  }
) => {
  if (!element) return null;

  const animation = animationPresets[preset];
  const { delay = 0, startTrigger = 'top 85%', customProps = {} } = options || {};

  return gsap.fromTo(
    element,
    animation.from,
    {
      ...animation.to,
      duration: animation.duration,
      ease: animation.ease,
      delay,
      scrollTrigger: {
        trigger: element,
        start: startTrigger,
        toggleActions: 'play none none none',
      },
      ...customProps,
    }
  );
};

/**
 * Apply staggered entrance animation to multiple elements
 */
export const applyStaggerAnimation = (
  elements: Array<HTMLElement | null>,
  preset: keyof typeof animationPresets = 'slideUp',
  options?: {
    staggerDelay?: number;
    startTrigger?: string;
    triggerElement?: HTMLElement | null;
    customProps?: gsap.TweenVars;
  }
) => {
  const validElements = elements.filter(Boolean) as HTMLElement[];
  if (validElements.length === 0) return null;

  const animation = animationPresets[preset];
  const { 
    staggerDelay = staggerConfig.cards.delay, 
    startTrigger = 'top 82%',
    triggerElement = validElements[0],
    customProps = {}
  } = options || {};

  return gsap.fromTo(
    validElements,
    animation.from,
    {
      ...animation.to,
      duration: animation.duration,
      ease: animation.ease,
      stagger: staggerDelay,
      scrollTrigger: {
        trigger: triggerElement,
        start: startTrigger,
        toggleActions: 'play none none none',
      },
      ...customProps,
    }
  );
};

/**
 * Apply floating animation (continuous)
 */
export const applyFloatingAnimation = (
  element: HTMLElement | null,
  options?: {
    distance?: number;
    duration?: number;
    delay?: number;
  }
) => {
  if (!element) return null;

  const { 
    distance = animationConfig.movement.small,
    duration = 3,
    delay = 0 
  } = options || {};

  return gsap.to(element, {
    y: -distance,
    duration,
    delay,
    repeat: -1,
    yoyo: true,
    ease: 'power2.inOut',
  });
};

/**
 * Apply fade in animation
 */
export const applyFadeIn = (
  element: HTMLElement | null,
  options?: {
    delay?: number;
    duration?: number;
    startTrigger?: string;
  }
) => {
  return applyEntranceAnimation(element, 'fadeIn', options);
};

/**
 * Apply slide up animation
 */
export const applySlideUp = (
  element: HTMLElement | null,
  options?: {
    delay?: number;
    duration?: number;
    startTrigger?: string;
  }
) => {
  return applyEntranceAnimation(element, 'slideUp', options);
};

/**
 * Apply scale up animation
 */
export const applyScaleUp = (
  element: HTMLElement | null,
  options?: {
    delay?: number;
    duration?: number;
    startTrigger?: string;
  }
) => {
  return applyEntranceAnimation(element, 'scaleUp', options);
};

/**
 * Create timeline for complex sequences
 */
export const createAnimationTimeline = (
  triggerElement: HTMLElement | null,
  options?: {
    start?: string;
    toggleActions?: string;
  }
) => {
  const { start = 'top 80%', toggleActions = 'play none none none' } = options || {};

  return gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      start,
      toggleActions,
    },
  });
};

/**
 * Apply section header animation (title + subtitle pattern)
 */
export const applySectionHeaderAnimation = (
  containerElement: HTMLElement | null,
  options?: {
    titleSelector?: string;
    subtitleSelector?: string;
    startTrigger?: string;
  }
) => {
  if (!containerElement) return null;

  const { 
    titleSelector = '.section-title',
    subtitleSelector = '.section-subtitle',
    startTrigger = 'top 85%'
  } = options || {};

  const title = containerElement.querySelector(titleSelector) as HTMLElement;
  const subtitle = containerElement.querySelector(subtitleSelector) as HTMLElement;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: containerElement,
      start: startTrigger,
      toggleActions: 'play none none none',
    },
  });

  if (title) {
    tl.fromTo(
      title,
      { opacity: 0, y: animationConfig.movement.medium },
      {
        opacity: 1,
        y: 0,
        duration: animationConfig.duration.slow,
        ease: animationConfig.easing.smooth,
      }
    );
  }

  if (subtitle) {
    tl.fromTo(
      subtitle,
      { opacity: 0, y: animationConfig.movement.medium },
      {
        opacity: 1,
        y: 0,
        duration: animationConfig.duration.slow,
        ease: animationConfig.easing.smooth,
      },
      '-=0.4' // Slight overlap
    );
  }

  return tl;
};

/**
 * Apply card grid animation (common pattern)
 */
export const applyCardGridAnimation = (
  cards: Array<HTMLElement | null>,
  triggerElement: HTMLElement | null,
  options?: {
    preset?: keyof typeof animationPresets;
    staggerDelay?: number;
  }
) => {
  const { preset = 'slideUp', staggerDelay = staggerConfig.cards.delay } = options || {};
  
  return applyStaggerAnimation(cards, preset, {
    staggerDelay,
    triggerElement,
  });
};

