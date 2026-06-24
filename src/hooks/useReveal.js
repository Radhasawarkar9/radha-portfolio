import { useEffect } from 'react';

/**
 * Replicates the original `trigReveal()` behaviour:
 * finds all `.rv`, `.rvL`, `.rvR` descendants of the given container ref,
 * removes any existing `.in` class, then observes each element and adds
 * `.in` back once it scrolls into view (one-shot per mount).
 *
 * Re-runs whenever `deps` change (e.g. on route change so each page
 * re-triggers its own reveal animation).
 */
export default function useReveal(containerRef, deps = []) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const els = container.querySelectorAll('.rv, .rvL, .rvR');
    els.forEach((el) => el.classList.remove('in'));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.04, rootMargin: '0px 0px -16px 0px' }
    );

    const timer = setTimeout(() => {
      els.forEach((el) => io.observe(el));
    }, 30);

    return () => {
      clearTimeout(timer);
      io.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
