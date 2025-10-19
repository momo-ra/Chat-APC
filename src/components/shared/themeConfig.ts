/**
 * Unified Theme Configuration for ChatAPC
 * Central source of truth for ALL colors, gradients, shadows, spacing, and theme-related values
 * Used across all components for consistent styling
 */

export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  dark: string;
  light: string;
}

export interface ColorPalette {
  blue: ThemeColors;
  cyan: ThemeColors;
  green: ThemeColors;
  yellow: ThemeColors;
  pink: ThemeColors;
  purple: ThemeColors;
  neutral: {
    darkBackground: string;
    lightBackground: string;
    darkText: string;
    lightText: string;
    darkTextSecondary: string;
    lightTextSecondary: string;
    darkTextMuted: string;
    lightTextMuted: string;
    darkBorder: string;
    lightBorder: string;
    lightGray: string;
    darkGray: string;
  };
}

export interface GradientConfig {
  blue: ThemeColors;
  cyan: ThemeColors;
  green: ThemeColors;
  yellow: ThemeColors;
  pink: ThemeColors;
  purple: ThemeColors;
  blueToBlue: ThemeColors;
  blueToPurple: ThemeColors;
  blueToGreen: ThemeColors;
  pinkToOrange: ThemeColors;
  purpleToBlue: ThemeColors;
  multiColor: ThemeColors;
}

export interface BackgroundConfig {
  light: {
    primary: string;
    secondary: string;
    tertiary: string;
    gradient: string;
    radialBlue: string;
    radialPurple: string;
    radialGreen: string;
  };
  dark: {
    primary: string;
    secondary: string;
    tertiary: string;
    gradient: string;
    radialBlue: string;
    radialPurple: string;
    radialGreen: string;
  };
}

export interface ShadowConfig {
  light: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    blue: string;
    cyan: string;
    green: string;
    pink: string;
    purple: string;
  };
  dark: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    blue: string;
    cyan: string;
    green: string;
    pink: string;
    purple: string;
  };
}

export interface ButtonConfig {
  primary: {
    background: ThemeColors;
    backgroundHover: ThemeColors;
    text: ThemeColors;
    border: ThemeColors;
    borderHover: ThemeColors;
    shadow: ThemeColors;
    shadowHover: ThemeColors;
  };
  secondary: {
    background: ThemeColors;
    backgroundHover: ThemeColors;
    text: ThemeColors;
    border: ThemeColors;
    borderHover: ThemeColors;
    shadow: ThemeColors;
    shadowHover: ThemeColors;
  };
  outlined: {
    background: ThemeColors;
    backgroundHover: ThemeColors;
    text: ThemeColors;
    border: ThemeColors;
    borderHover: ThemeColors;
    shadow: ThemeColors;
    shadowHover: ThemeColors;
  };
}

export interface CardConfig {
  background: ThemeColors;
  backgroundHover: ThemeColors;
  border: ThemeColors;
  borderHover: ThemeColors;
  shadow: ThemeColors;
  shadowHover: ThemeColors;
}

export interface InputConfig {
  background: ThemeColors;
  backgroundFocus: ThemeColors;
  border: ThemeColors;
  borderFocus: ThemeColors;
  borderError: ThemeColors;
  text: ThemeColors;
  placeholder: ThemeColors;
}

export interface TypographyConfig {
  h1: {
    size: string;
    weight: number;
    lineHeight: number;
  };
  h2: {
    size: string;
    weight: number;
    lineHeight: number;
  };
  h3: {
    size: string;
    weight: number;
    lineHeight: number;
  };
  h4: {
    size: string;
    weight: number;
    lineHeight: number;
  };
  h5: {
    size: string;
    weight: number;
    lineHeight: number;
  };
  h6: {
    size: string;
    weight: number;
    lineHeight: number;
  };
  body: {
    size: string;
    weight: number;
    lineHeight: number;
  };
  bodyLarge: {
    size: string;
    weight: number;
    lineHeight: number;
  };
  bodySmall: {
    size: string;
    weight: number;
    lineHeight: number;
  };
}

export interface SpacingConfig {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  section: string;
  sectionMedium: string;
  container: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
}

export interface BorderRadiusConfig {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

export interface TransitionConfig {
  fast: string;
  normal: string;
  slow: string;
  allFast: string;
  allNormal: string;
  allSlow: string;
}

export interface AnimationConfig {
  duration: {
    fast: number;
    normal: number;
    slow: number;
  };
  easing: {
    easeOut: string;
    easeInOut: string;
    sharp: string;
    bounce: string;
  };
  stagger: number;
}

// ============================================================
// CORE COLOR PALETTE
// ============================================================

export const COLORS: ColorPalette = {
  // Primary Blue - Main brand color
  blue: {
    dark: '#60A5FA',   // Lighter blue for dark mode
    light: '#3B82F6',  // Standard blue for light mode
  },
  
  // Cyan - Secondary brand color
  cyan: {
    dark: '#22D3EE',
    light: '#009BE4',
  },
  
  // Green - Success, optimization
  green: {
    dark: '#34D399',
    light: '#10B981',
  },
  
  // Yellow - Warning, economics
  yellow: {
    dark: '#FBBF24',
    light: '#F59E0B',
  },
  
  // Pink - Accent, scenario testing
  pink: {
    dark: '#F472B6',
    light: '#EC4899',
  },
  
  // Purple - Advanced features
  purple: {
    dark: '#A78BFA',
    light: '#8B5CF6',
  },
  
  // Neutral Colors
  neutral: {
    darkBackground: '#1E293B',
    lightBackground: '#FFFFFF',
    darkText: '#FFFFFF',
    lightText: '#1E293B',
    darkTextSecondary: 'rgba(255, 255, 255, 0.85)',
    lightTextSecondary: '#475569',
    darkTextMuted: 'rgba(255, 255, 255, 0.7)',
    lightTextMuted: '#64748B',
    darkBorder: 'rgba(55, 65, 81, 1)',
    lightBorder: 'rgba(226, 232, 240, 1)',
    lightGray: '#CBD5E1',
    darkGray: '#64748B',
  },
};

// ============================================================
// GRADIENTS
// ============================================================

export const GRADIENTS: GradientConfig = {
  blue: {
    light: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
    dark: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)',
  },
  cyan: {
    light: 'linear-gradient(135deg, #009BE4 0%, #0077B6 100%)',
    dark: 'linear-gradient(135deg, #22D3EE 0%, #009BE4 100%)',
  },
  green: {
    light: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    dark: 'linear-gradient(135deg, #34D399 0%, #10B981 100%)',
  },
  yellow: {
    light: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    dark: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
  },
  pink: {
    light: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
    dark: 'linear-gradient(135deg, #F472B6 0%, #EC4899 100%)',
  },
  purple: {
    light: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    dark: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
  },
  blueToBlue: {
    light: 'linear-gradient(200deg, #2563EB 0%, #1D4ED8 100%)',
    dark: 'linear-gradient(200deg, #3B82F6 0%, #2563EB 100%)',
  },
  blueToPurple: {
    light: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
    dark: 'linear-gradient(135deg, #60A5FA 0%, #A78BFA 100%)',
  },
  blueToGreen: {
    light: 'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)',
    dark: 'linear-gradient(135deg, #60A5FA 0%, #34D399 100%)',
  },
  pinkToOrange: {
    light: 'linear-gradient(135deg, #EC4899 0%, #F59E0B 100%)',
    dark: 'linear-gradient(135deg, #F472B6 0%, #FBBF24 100%)',
  },
  purpleToBlue: {
    light: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
    dark: 'linear-gradient(135deg, #A78BFA 0%, #60A5FA 100%)',
  },
  multiColor: {
    light: 'linear-gradient(135deg, #0F172A 0%, #1E40AF 25%, #7C3AED 50%, #DC2626 75%, #0F172A 100%)',
    dark: 'linear-gradient(135deg, #FFFFFF 0%, #60A5FA 25%, #A78BFA 50%, #F472B6 75%, #FFFFFF 100%)',
  },
};

// ============================================================
// BACKGROUNDS
// ============================================================

export const BACKGROUNDS: BackgroundConfig = {
  light: {
    primary: '#FFFFFF',
    secondary: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 50%, #FFFFFF 100%)',
    tertiary: 'linear-gradient(180deg, #FFFFFF 0%, #FEFEFE 30%, #FCFCFC 70%, #FAFAFA 100%)',
    gradient: 'linear-gradient(180deg, rgba(249, 250, 251, 1) 0%, rgba(255, 255, 255, 1) 50%, rgba(249, 250, 251, 1) 100%)',
    radialBlue: 'radial-gradient(ellipse at center top, rgba(59, 130, 246, 0.05) 0%, transparent 50%)',
    radialPurple: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, rgba(139, 92, 246, 0.02) 50%, transparent 70%)',
    radialGreen: 'radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 70%)',
  },
  dark: {
    primary: 'linear-gradient(to bottom, #0a0e2e 0%, #0d1842 50%, #0a0e2e 100%)',
    secondary: 'linear-gradient(180deg, rgba(17, 24, 39, 1) 0%, rgba(31, 41, 55, 1) 50%, rgba(17, 24, 39, 1) 100%)',
    tertiary: 'linear-gradient(135deg, rgba(31, 41, 55, 0.85) 0%, rgba(55, 65, 81, 0.7) 100%)',
    gradient: 'linear-gradient(180deg, rgba(17, 24, 39, 1) 0%, rgba(31, 41, 55, 1) 50%, rgba(17, 24, 39, 1) 100%)',
    radialBlue: 'radial-gradient(ellipse at center top, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
    radialPurple: 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, rgba(168, 85, 247, 0.04) 50%, transparent 70%)',
    radialGreen: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.03) 50%, transparent 70%)',
  },
};

// ============================================================
// SHADOWS
// ============================================================

export const SHADOWS: ShadowConfig = {
  light: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    blue: '0 8px 32px rgba(59, 130, 246, 0.2)',
    cyan: '0 8px 32px rgba(0, 155, 228, 0.15)',
    green: '0 8px 32px rgba(16, 185, 129, 0.2)',
    pink: '0 8px 32px rgba(236, 72, 153, 0.2)',
    purple: '0 8px 32px rgba(139, 92, 246, 0.2)',
  },
  dark: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.4)',
    blue: '0 8px 32px rgba(96, 165, 250, 0.3)',
    cyan: '0 8px 32px rgba(34, 211, 238, 0.25)',
    green: '0 8px 32px rgba(52, 211, 153, 0.3)',
    pink: '0 8px 32px rgba(244, 114, 182, 0.3)',
    purple: '0 8px 32px rgba(167, 139, 250, 0.3)',
  },
};

// ============================================================
// BUTTONS
// ============================================================

export const BUTTONS: ButtonConfig = {
  primary: {
    background: {
      light: GRADIENTS.blue.light,
      dark: GRADIENTS.blue.dark,
    },
    backgroundHover: {
      light: GRADIENTS.blueToPurple.light,
      dark: GRADIENTS.blueToPurple.dark,
    },
    text: {
      light: '#FFFFFF',
      dark: '#FFFFFF',
    },
    border: {
      light: 'transparent',
      dark: 'transparent',
    },
    borderHover: {
      light: 'transparent',
      dark: 'transparent',
    },
    shadow: {
      light: SHADOWS.light.blue,
      dark: SHADOWS.dark.blue,
    },
    shadowHover: {
      light: '0 12px 40px rgba(59, 130, 246, 0.4)',
      dark: '0 12px 40px rgba(96, 165, 250, 0.5)',
    },
  },
  secondary: {
    background: {
      light: GRADIENTS.purple.light,
      dark: GRADIENTS.purple.dark,
    },
    backgroundHover: {
      light: GRADIENTS.purpleToBlue.light,
      dark: GRADIENTS.purpleToBlue.dark,
    },
    text: {
      light: '#FFFFFF',
      dark: '#FFFFFF',
    },
    border: {
      light: 'transparent',
      dark: 'transparent',
    },
    borderHover: {
      light: 'transparent',
      dark: 'transparent',
    },
    shadow: {
      light: SHADOWS.light.purple,
      dark: SHADOWS.dark.purple,
    },
    shadowHover: {
      light: '0 12px 40px rgba(139, 92, 246, 0.4)',
      dark: '0 12px 40px rgba(167, 139, 250, 0.5)',
    },
  },
  outlined: {
    background: {
      light: 'rgba(255, 255, 255, 0.8)',
      dark: 'rgba(255, 255, 255, 0.05)',
    },
    backgroundHover: {
      light: 'rgba(255, 255, 255, 0.95)',
      dark: 'rgba(255, 255, 255, 0.1)',
    },
    text: {
      light: COLORS.blue.light,
      dark: 'rgba(255, 255, 255, 0.9)',
    },
    border: {
      light: 'rgba(59, 130, 246, 0.4)',
      dark: 'rgba(255, 255, 255, 0.25)',
    },
    borderHover: {
      light: 'rgba(59, 130, 246, 0.6)',
      dark: 'rgba(255, 255, 255, 0.4)',
    },
    shadow: {
      light: 'transparent',
      dark: 'transparent',
    },
    shadowHover: {
      light: 'transparent',
      dark: 'transparent',
    },
  },
};

// ============================================================
// CARDS
// ============================================================

export const CARDS: CardConfig = {
  background: {
    light: 'rgba(255, 255, 255, 0.97)',
    dark: 'linear-gradient(135deg, rgba(31, 41, 55, 0.85) 0%, rgba(55, 65, 81, 0.7) 100%)',
  },
  backgroundHover: {
    light: '#FFFFFF',
    dark: 'linear-gradient(135deg, rgba(31, 41, 55, 0.95) 0%, rgba(55, 65, 81, 0.85) 100%)',
  },
  border: {
    light: 'rgba(226, 232, 240, 1)',
    dark: 'rgba(55, 65, 81, 1)',
  },
  borderHover: {
    light: 'rgba(59, 130, 246, 0.4)',
    dark: 'rgba(96, 165, 250, 0.5)',
  },
  shadow: {
    light: '0 4px 20px rgba(0, 0, 0, 0.08)',
    dark: '0 4px 20px rgba(0, 0, 0, 0.4)',
  },
  shadowHover: {
    light: '0 20px 50px rgba(59, 130, 246, 0.15)',
    dark: '0 20px 50px rgba(96, 165, 250, 0.25)',
  },
};

// ============================================================
// INPUTS
// ============================================================

export const INPUTS: InputConfig = {
  background: {
    light: '#FFFFFF',
    dark: 'rgba(31, 41, 55, 0.6)',
  },
  backgroundFocus: {
    light: '#FFFFFF',
    dark: 'rgba(31, 41, 55, 0.8)',
  },
  border: {
    light: 'rgba(203, 213, 225, 1)',
    dark: 'rgba(55, 65, 81, 1)',
  },
  borderFocus: {
    light: COLORS.blue.light,
    dark: COLORS.blue.dark,
  },
  borderError: {
    light: '#DC2626',
    dark: '#EF4444',
  },
  text: {
    light: COLORS.neutral.lightText,
    dark: COLORS.neutral.darkText,
  },
  placeholder: {
    light: COLORS.neutral.lightTextMuted,
    dark: COLORS.neutral.darkTextMuted,
  },
};

// ============================================================
// TYPOGRAPHY
// ============================================================

export const TYPOGRAPHY: TypographyConfig = {
  h1: {
    size: 'clamp(2.5rem, 5vw, 4.5rem)',
    weight: 800,
    lineHeight: 1.1,
  },
  h2: {
    size: 'clamp(2rem, 4vw, 3.5rem)',
    weight: 700,
    lineHeight: 1.2,
  },
  h3: {
    size: 'clamp(1.75rem, 3.5vw, 2.5rem)',
    weight: 700,
    lineHeight: 1.2,
  },
  h4: {
    size: 'clamp(1.5rem, 2.5vw, 2rem)',
    weight: 700,
    lineHeight: 1.3,
  },
  h5: {
    size: 'clamp(1.25rem, 2vw, 1.5rem)',
    weight: 600,
    lineHeight: 1.3,
  },
  h6: {
    size: 'clamp(1.1rem, 1.8vw, 1.25rem)',
    weight: 600,
    lineHeight: 1.4,
  },
  body: {
    size: 'clamp(1rem, 1.5vw, 1.125rem)',
    weight: 400,
    lineHeight: 1.6,
  },
  bodyLarge: {
    size: 'clamp(1.125rem, 2vw, 1.5rem)',
    weight: 400,
    lineHeight: 1.7,
  },
  bodySmall: {
    size: 'clamp(0.875rem, 1.2vw, 1rem)',
    weight: 400,
    lineHeight: 1.5,
  },
};

// ============================================================
// SPACING
// ============================================================

export const SPACING: SpacingConfig = {
  xs: 0.5,   // 4px
  sm: 1,     // 8px
  md: 2,     // 16px
  lg: 3,     // 24px
  xl: 4,     // 32px
  xxl: 6,    // 48px
  section: 'clamp(3rem, 8vw, 5rem)',
  sectionMedium: 'clamp(2.5rem, 7vw, 3.5rem)',
  container: {
    xs: 2,     // 16px mobile
    sm: 2,
    md: 2.5,   // 20px medium with sidebar
    lg: 2.5,
    xl: 3,     // 24px large with sidebar
  },
};

// ============================================================
// BORDER RADIUS
// ============================================================

export const BORDER_RADIUS: BorderRadiusConfig = {
  xs: '2px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '20px',
  full: '9999px',
};

// ============================================================
// TRANSITIONS
// ============================================================

export const TRANSITIONS: TransitionConfig = {
  fast: '0.15s ease',
  normal: '0.3s ease',
  slow: '0.5s ease',
  allFast: 'all 0.15s ease',
  allNormal: 'all 0.3s ease',
  allSlow: 'all 0.5s ease',
};

// ============================================================
// ANIMATIONS (GSAP)
// ============================================================

export const ANIMATIONS: AnimationConfig = {
  duration: {
    fast: 0.4,
    normal: 0.8,
    slow: 1.2,
  },
  easing: {
    easeOut: 'power3.out',
    easeInOut: 'power2.inOut',
    sharp: 'power2.out',
    bounce: 'back.out(1.7)',
  },
  stagger: 0.15,
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Get color based on theme mode
 */
export const getColor = (colorObj: ThemeColors, isDark: boolean): string => {
  return isDark ? colorObj.dark : colorObj.light;
};

/**
 * Get gradient based on theme mode
 */
export const getGradient = (gradientObj: ThemeColors, isDark: boolean): string => {
  return isDark ? gradientObj.dark : gradientObj.light;
};

/**
 * Get background based on theme mode
 */
export const getBackground = (bgType: keyof BackgroundConfig['light'], isDark: boolean): string => {
  return isDark ? BACKGROUNDS.dark[bgType] : BACKGROUNDS.light[bgType];
};

/**
 * Get shadow based on theme mode
 */
export const getShadow = (shadowType: keyof ShadowConfig['light'], isDark: boolean): string => {
  return isDark ? SHADOWS.dark[shadowType] : SHADOWS.light[shadowType];
};

/**
 * Get text color based on theme mode
 */
export const getTextColor = (variant: 'primary' | 'secondary' | 'muted', isDark: boolean): string => {
  if (variant === 'primary') {
    return isDark ? COLORS.neutral.darkText : COLORS.neutral.lightText;
  }
  if (variant === 'secondary') {
    return isDark ? COLORS.neutral.darkTextSecondary : COLORS.neutral.lightTextSecondary;
  }
  return isDark ? COLORS.neutral.darkTextMuted : COLORS.neutral.lightTextMuted;
};

/**
 * Get border color based on theme mode
 */
export const getBorderColor = (isDark: boolean): string => {
  return isDark ? COLORS.neutral.darkBorder : COLORS.neutral.lightBorder;
};

/**
 * Create color with opacity
 */
export const withOpacity = (color: string, opacity: number): string => {
  // Convert hex to rgba if needed
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  // If already rgba, replace opacity
  if (color.startsWith('rgba')) {
    return color.replace(/[\d.]+\)$/g, `${opacity})`);
  }
  return color;
};

/**
 * Get button styles based on variant and theme mode
 */
export const getButtonStyles = (
  variant: 'primary' | 'secondary' | 'outlined',
  isDark: boolean,
  state: 'default' | 'hover' = 'default'
) => {
  const config = BUTTONS[variant];
  
  if (state === 'hover') {
    return {
      background: getColor(config.backgroundHover, isDark),
      border: config.borderHover ? getColor(config.borderHover, isDark) : undefined,
      shadow: config.shadowHover ? getColor(config.shadowHover, isDark) : undefined,
      text: typeof config.text === 'string' ? config.text : getColor(config.text, isDark),
    };
  }
  
  return {
    background: getColor(config.background, isDark),
    border: config.border ? getColor(config.border, isDark) : undefined,
    shadow: config.shadow ? getColor(config.shadow, isDark) : undefined,
    text: typeof config.text === 'string' ? config.text : getColor(config.text, isDark),
  };
};

/**
 * Get card styles based on theme mode and state
 */
export const getCardStyles = (
  isDark: boolean,
  state: 'default' | 'hover' = 'default'
) => {
  if (state === 'hover') {
    return {
      background: getColor(CARDS.backgroundHover, isDark),
      border: getColor(CARDS.borderHover, isDark),
      shadow: getColor(CARDS.shadowHover, isDark),
    };
  }
  
  return {
    background: getColor(CARDS.background, isDark),
    border: getColor(CARDS.border, isDark),
    shadow: getColor(CARDS.shadow, isDark),
  };
};

// ============================================================
// EXPORT ALL
// ============================================================

export const themeConfig = {
  colors: COLORS,
  gradients: GRADIENTS,
  backgrounds: BACKGROUNDS,
  shadows: SHADOWS,
  buttons: BUTTONS,
  cards: CARDS,
  inputs: INPUTS,
  typography: TYPOGRAPHY,
  spacing: SPACING,
  borderRadius: BORDER_RADIUS,
  transitions: TRANSITIONS,
  animations: ANIMATIONS,
  helpers: {
    getColor,
    getGradient,
    getBackground,
    getShadow,
    getTextColor,
    getBorderColor,
    withOpacity,
    getButtonStyles,
    getCardStyles,
  },
};

export default themeConfig;