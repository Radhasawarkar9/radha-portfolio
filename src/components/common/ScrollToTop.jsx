import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Smoothly scrolls the window back to the top whenever the route
 * changes — replicates the `window.scrollTo({ top: 0, behavior: 'smooth' })`
 * call inside the original `goTo()` SPA navigation function.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}
