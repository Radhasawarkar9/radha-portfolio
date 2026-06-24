import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import MobileMenu from './MobileMenu.jsx';
import ScrollToTop from '../common/ScrollToTop.jsx';

/**
 * Top-level page shell: fixed navbar, slide-down mobile menu, and the
 * routed page content inside `#wrap`. Handles closing the mobile menu
 * on outside click / Escape, and locking body scroll while it's open.
 */
export default function Layout() {
  const [mobOpen, setMobOpen] = useState(false);
  const mobRef = useRef(null);
  const hamRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = mobOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobOpen]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMobOpen(false);
    };
    const onClick = (e) => {
      if (!mobOpen) return;
      if (mobRef.current?.contains(e.target)) return;
      if (hamRef.current?.contains(e.target)) return;
      setMobOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('click', onClick);
    };
  }, [mobOpen]);

  return (
    <>
      <ScrollToTop />
      <Navbar mobOpen={mobOpen} setMobOpen={setMobOpen} hamRef={hamRef} />
      <MobileMenu open={mobOpen} onClose={() => setMobOpen(false)} ref={mobRef} />
      <main id="wrap">
        <Outlet />
      </main>
    </>
  );
}
