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

// 🆕 دالة تغيير الـ favicon
const updateFavicon = (isDark: boolean) => {
  const faviconPath = isDark ? '/favicon-dark.png' : '/favicon-light.png';
  
  // غيّر كل الـ favicon links
  const iconLinks = document.querySelectorAll<HTMLLinkElement>(
    "link[rel='icon'], link[rel='shortcut icon'], link[rel='apple-touch-icon']"
  );
  
  iconLinks.forEach(link => {
    link.href = faviconPath;
  });
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preference, setPreferenceState] = useState<ThemePreference>(() => {
    const oldTheme = localStorage.getItem('theme') as ThemeMode | null;
    if (oldTheme) {
      localStorage.removeItem('theme');
      return 'system';
    }
    
    const savedPref = localStorage.getItem('themePreference') as ThemePreference | null;
    return savedPref || 'system';
  });

  const [mode, setMode] = useState<ThemeMode>(() => {
    const savedPref = localStorage.getItem('themePreference') as ThemePreference | null;
    
    if (savedPref === 'light' || savedPref === 'dark') {
      return savedPref;
    }
    
    return getSystemTheme();
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (preference === 'system') {
        const newMode = e.matches ? 'dark' : 'light';
        setMode(newMode);
        updateFavicon(newMode === 'dark'); // 🆕 غيّر الـ favicon
      }
    };

    if (preference === 'system') {
      const systemMode = getSystemTheme();
      setMode(systemMode);
      updateFavicon(systemMode === 'dark'); // 🆕 غيّر الـ favicon
    } else {
      setMode(preference);
      updateFavicon(preference === 'dark'); // 🆕 غيّر الـ favicon
    }

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [preference]);

  useEffect(() => {
    localStorage.setItem('themePreference', preference);
    document.documentElement.setAttribute('data-theme', mode);
    updateFavicon(mode === 'dark'); // 🆕 غيّر الـ favicon كل ما الـ mode يتغير
  }, [mode, preference]);

  const toggleTheme = () => {
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