# Unified Animation System

## Overview

All animations across the website now use a **unified animation system** defined in:
- `src/components/shared/animation.ts` - Animation configuration and presets
- `src/components/shared/animationHelpers.ts` - Helper functions to apply animations

## Benefits

✅ **Consistency** - All sections use the same animation timing, easing, and patterns
✅ **Maintainability** - Change animations in one place, affects entire site
✅ **Simplicity** - Clean, readable animation code
✅ **Performance** - Optimized GSAP animations with proper cleanup

## Configuration (`animation.ts`)

### Animation Presets
- `fadeIn` - Simple fade in
- `slideUp` - Slide up with fade
- `slideDown` - Slide down with fade
- `slideLeft` - Slide from right with fade
- `slideRight` - Slide from left with fade
- `scaleUp` - Scale up with fade
- `rotateIn` - Rotate in with fade

### Timing
- `fast`: 0.3s
- `medium`: 0.6s
- `slow`: 0.8s
- `verySlow`: 1.2s

### Easing
- `smooth`: power2.out
- `bounce`: back.out(1.7)
- `elastic`: elastic.out(1, 0.3)
- `sharp`: power3.out

### Stagger Delays
- `cards`: 0.2s
- `text`: 0.1s
- `listItems`: 0.1s

## Usage (`animationHelpers.ts`)

### Basic Entrance Animation

```tsx
import { applySlideUp } from '../shared/animationHelpers';

const headerRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const ctx = gsap.context(() => {
    applySlideUp(headerRef.current, {
      startTrigger: 'top 85%',
      delay: 0.2
    });
  }, sectionRef);

  return () => ctx.revert();
}, []);
```

### Staggered Animations (Cards, Lists)

```tsx
import { applyStaggerAnimation } from '../shared/animationHelpers';

const cardsRef = useRef<Array<HTMLDivElement | null>>([]);

useEffect(() => {
  const ctx = gsap.context(() => {
    applyStaggerAnimation(cardsRef.current, 'slideUp', {
      staggerDelay: 0.2,
      triggerElement: sectionRef.current,
    });
  }, sectionRef);

  return () => ctx.revert();
}, []);
```

### Card Grid Animation (Recommended for Cards)

```tsx
import { applyCardGridAnimation } from '../shared/animationHelpers';

const cardsRef = useRef<Array<HTMLDivElement | null>>([]);

useEffect(() => {
  const ctx = gsap.context(() => {
    applyCardGridAnimation(cardsRef.current, sectionRef.current);
  }, sectionRef);

  return () => ctx.revert();
}, []);
```

### Floating Animation (Continuous)

```tsx
import { applyFloatingAnimation } from '../shared/animationHelpers';

const floatingRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const ctx = gsap.context(() => {
    applyFloatingAnimation(floatingRef.current, {
      distance: 10,
      duration: 3,
      delay: 0
    });
  }, sectionRef);

  return () => ctx.revert();
}, []);
```

### Scale Animation

```tsx
import { applyScaleUp } from '../shared/animationHelpers';

const elementRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const ctx = gsap.context(() => {
    applyScaleUp(elementRef.current, {
      startTrigger: 'top 80%',
      delay: 0.3
    });
  }, sectionRef);

  return () => ctx.revert();
}, []);
```

## Currently Updated Sections

All **Home Page** sections now use the unified system:
- ✅ **HeroSearchSection** - Custom animations (kept as-is for unique design)
- ✅ **BenefitsSection** - Header, cards, and ROI animations
- ✅ **ArchitectureSection** - Header and layer cards
- ✅ **DemoVideoSection** - Header, video, and floating animations
- ✅ **TeamSection** - Header, company info, and stats
- ✅ **CTASection** - CTA card and floating elements

## Next Steps

To apply unified animations to other pages:

1. Import animation helpers:
   ```tsx
   import { applySlideUp, applyCardGridAnimation } from '../shared/animationHelpers';
   ```

2. Replace custom GSAP code with helper functions

3. Remove `ScrollTrigger` import if using helpers exclusively

4. Use consistent options:
   - Headers: `startTrigger: 'top 85%'`
   - Cards: `staggerDelay: 0.2`
   - Floating: `distance: 10-15`, `duration: 3-4`

## Customization

To change animations site-wide, edit `animation.ts`:
- Adjust timing values
- Change easing functions
- Modify movement distances
- Update stagger delays

All sections using the helpers will automatically update!

## Best Practices

1. **Always wrap animations in `gsap.context()`**
   ```tsx
   const ctx = gsap.context(() => {
     // animations here
   }, sectionRef);
   
   return () => ctx.revert();
   ```

2. **Use refs for animated elements**
   ```tsx
   const elementRef = useRef<HTMLDivElement>(null);
   ```

3. **Apply consistent trigger points**
   - Headers: `top 85%`
   - Content: `top 80-82%`
   - Footer elements: `top 90%`

4. **Use appropriate presets**
   - Titles/Headers: `slideUp`
   - Cards: `slideUp` with stagger
   - Floating elements: `applyFloatingAnimation`
   - CTAs: `scaleUp`

## Examples in Codebase

See these files for reference implementations:
- `src/components/home/BenefitsSection.tsx` - Cards with stagger
- `src/components/home/ArchitectureSection.tsx` - Simple slide animations
- `src/components/home/DemoVideoSection.tsx` - Video + floating
- `src/components/home/TeamSection.tsx` - Stats with stagger
- `src/components/home/CTASection.tsx` - Scale + floating elements

