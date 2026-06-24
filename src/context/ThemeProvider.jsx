import { useCallback, useEffect, useMemo, useState } from 'react';
import ThemeContext from './ThemeContext.js';

const THEME_KEY = 'rps-theme';

function getInitialTheme() {
  try {
    return localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.body.classList.toggle('light', theme === 'light');
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* localStorage unavailable — ignore */
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  // Memoized so the Provider doesn't hand every consumer a brand-new
  // object identity on each render — without this, any re-render of
  // ThemeProvider (even one where `theme` hasn't changed) would cause
  // every component calling useTheme() to re-render too.
  const value = useMemo(
    () => ({
      theme,
      isLight: theme === 'light',
      toggleTheme,
    }),
    [theme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
