import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeMode = 'light' | 'dark';
type ThemePreference = 'light' | 'dark' | 'system';

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
  isDark: boolean;
  preference: ThemePreference;
  setPreference: (pref: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getSystemTheme = (): ThemeMode => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preference, setPreferenceState] = useState<ThemePreference>(() => {
    // Migration: Check old 'theme' key first
    const oldTheme = localStorage.getItem('theme') as ThemeMode | null;
    if (oldTheme) {
      localStorage.removeItem('theme'); // Clean up old key
      return 'system'; // Reset to system preference for existing users
    }
    
    const savedPref = localStorage.getItem('themePreference') as ThemePreference | null;
    return savedPref || 'system';
  });

  const [mode, setMode] = useState<ThemeMode>(() => {
    const savedPref = localStorage.getItem('themePreference') as ThemePreference | null;
    
    if (savedPref === 'light' || savedPref === 'dark') {
      return savedPref;
    }
    
    // Default to system preference
    return getSystemTheme();
  });

  useEffect(() => {
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if preference is set to 'system'
      if (preference === 'system') {
        setMode(e.matches ? 'dark' : 'light');
      }
    };

    // Update mode when preference changes
    if (preference === 'system') {
      setMode(getSystemTheme());
    } else {
      setMode(preference);
    }

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [preference]);

  useEffect(() => {
    // Save preference to localStorage
    localStorage.setItem('themePreference', preference);
    
    // Update document class for global styling
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode, preference]);

  const toggleTheme = () => {
    // Toggle between light and dark (sets manual preference)
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setPreferenceState(newMode);
    setMode(newMode);
  };

  const setPreference = (pref: ThemePreference) => {
    setPreferenceState(pref);
  };

  const isDark = mode === 'dark';

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, isDark, preference, setPreference }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeMode must be used within a ThemeProvider');
  }
  return context;
};

