import { useEffect, useRef } from 'react';

const HOVER_SELECTOR =
  'a, button, [role="button"], [data-pg], input, textarea, .ec, .pc, .ccard, .acard, ' +
  '.soc-link, .exp-item, .theme-toggle, .pc-live-btn, .ccard-view-btn-full';

/**
 * Renders the two-part custom cursor (dot + trailing ring) and wires up
 * the global listeners that drive its position and hover/click states.
 * Automatically hidden on touch devices via CSS (`@media (hover:none)`).
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Skip entirely on touch / coarse-pointer devices — there's no
    // mouse to track, and attaching these listeners just wastes cycles
    // and can cause a flash of the cursor dot on the first tap.
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -200;
    let my = -200;
    let rx = -200;
    let ry = -200;
    let rafId;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;
    };

    const loop = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    const onOver = (e) => {
      if (e.target.closest(HOVER_SELECTOR)) document.body.classList.add('ch');
    };
    const onOut = (e) => {
      if (e.target.closest(HOVER_SELECTOR)) document.body.classList.remove('ch');
    };
    const onDown = () => document.body.classList.add('cc');
    const onUp = () => document.body.classList.remove('cc');
    const onLeave = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };
    const onEnter = () => {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  return (
    <>
      <div id="cd" ref={dotRef} aria-hidden="true" />
      <div id="cr" ref={ringRef} aria-hidden="true" />
    </>
  );
}
