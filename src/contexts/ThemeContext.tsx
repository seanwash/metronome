import { createContext, useEffect, useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { ThemeMode, Theme, ThemeColors } from '../types/theme';
import { lightTheme, darkTheme } from '../types/theme';

interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  colors: ThemeColors;
  customColors: Partial<ThemeColors> | null;
  setCustomColors: (colors: Partial<ThemeColors> | null) => void;
  resetToDefaults: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

const THEME_STORAGE_KEY = 'metronome-theme-mode';
const CUSTOM_COLORS_STORAGE_KEY = 'metronome-custom-colors';

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [customColors, setCustomColorsState] = useState<Partial<ThemeColors> | null>(null);
  const [systemPrefersDark, setSystemPrefersDark] = useState(false);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode;
    if (savedMode && ['light', 'dark', 'system'].includes(savedMode)) {
      setThemeModeState(savedMode);
    }

    const savedColors = localStorage.getItem(CUSTOM_COLORS_STORAGE_KEY);
    if (savedColors) {
      try {
        setCustomColorsState(JSON.parse(savedColors));
      } catch (error) {
        console.warn('Failed to parse saved custom colors:', error);
      }
    }
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemPrefersDark(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPrefersDark(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  };

  const setCustomColors = (colors: Partial<ThemeColors> | null) => {
    setCustomColorsState(colors);
    if (colors) {
      localStorage.setItem(CUSTOM_COLORS_STORAGE_KEY, JSON.stringify(colors));
    } else {
      localStorage.removeItem(CUSTOM_COLORS_STORAGE_KEY);
    }
  };

  const resetToDefaults = () => {
    setCustomColors(null);
  };

  // Determine effective theme
  const effectiveMode = themeMode === 'system' 
    ? (systemPrefersDark ? 'dark' : 'light')
    : themeMode;

  // Get base colors for the effective mode and merge with custom colors
  const colors: ThemeColors = useMemo(() => {
    const baseColors = effectiveMode === 'dark' ? darkTheme : lightTheme;
    return customColors 
      ? { ...baseColors, ...customColors }
      : baseColors;
  }, [effectiveMode, customColors]);

  const theme: Theme = {
    mode: effectiveMode,
    colors
  };

  // Apply CSS variables to document root
  useEffect(() => {
    const root = document.documentElement;
    
    Object.entries(colors).forEach(([key, value]) => {
      const cssVarName = `--theme-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      root.style.setProperty(cssVarName, value);
    });

    // Add theme mode class to body for additional styling if needed
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    document.body.classList.add(`theme-${effectiveMode}`);
  }, [colors, effectiveMode]);

  const value: ThemeContextType = {
    theme,
    themeMode,
    setThemeMode,
    colors,
    customColors,
    setCustomColors,
    resetToDefaults,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

