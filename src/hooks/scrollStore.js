/**
 * Tiny external store for window scroll position.
 *
 * Both the navbar and the scroll-progress bar need to know how far
 * the page has scrolled. Previously each one called its own copy of
 * `useScrollProgress`, which meant two independent `scroll` listeners
 * doing the same work and triggering their own re-renders on every
 * single scroll event (scroll events can fire dozens of times per
 * second during a fast swipe/fling).
 *
 * This module keeps exactly one listener for the whole app:
 *  - rAF-throttled, so bursts of scroll events collapse into at most
 *    one recompute per animation frame.
 *  - Equality-checked, so subscribers are only notified when the
 *    rounded progress value or the `scrolled` boolean actually changes.
 *  - Lazily started on first subscriber and torn down when the last
 *    one unsubscribes — nothing runs while no component cares.
 */

const SCROLLED_THRESHOLD = 24;

let state = { progress: 0, scrolled: false };
const listeners = new Set();
let rafId = null;
let started = false;

function computeState() {
  const scrollTop = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  return {
    progress: height > 0 ? Math.min(100, Math.max(0, (scrollTop / height) * 100)) : 0,
    scrolled: scrollTop > SCROLLED_THRESHOLD,
  };
}

function notify() {
  listeners.forEach((listener) => listener(state));
}

function handleScroll() {
  if (rafId !== null) return; // a recompute is already queued for this frame
  rafId = requestAnimationFrame(() => {
    rafId = null;
    const next = computeState();
    if (next.progress !== state.progress || next.scrolled !== state.scrolled) {
      state = next;
      notify();
    }
  });
}

function start() {
  if (started) return;
  started = true;
  state = computeState();
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleScroll, { passive: true });
}

function stop() {
  started = false;
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', handleScroll);
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

export function subscribeScroll(listener) {
  if (listeners.size === 0) start();
  listeners.add(listener);
  listener(state);

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) stop();
  };
}

export function getScrollState() {
  return state;
}
