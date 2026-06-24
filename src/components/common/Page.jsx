import { useRef } from 'react';
import useReveal from '../../hooks/useReveal.js';
import useLoader from '../../context/useLoader.js';

/**
 * Wraps every route's content. Applies the `.pg.active` enter animation
 * and (re)triggers the `.rv/.rvL/.rvR` scroll-reveal animations for its
 * children whenever the page mounts or the global loader finishes.
 */
export default function Page({ id, label, children }) {
  const ref = useRef(null);
  const { appReady } = useLoader();

  useReveal(ref, [appReady]);

  return (
    <section className="pg active" id={`pg-${id}`} aria-label={label} ref={ref}>
      {children}
    </section>
  );
}
