import { useEffect, useState } from 'react';
import { subscribeScroll, getScrollState } from './scrollStore.js';

/**
 * Tracks page scroll progress (0-100) and whether the page has been
 * scrolled past a small threshold (used to toggle the navbar's
 * "scrolled" background state).
 *
 * Backed by a single shared scroll listener (see scrollStore.js) —
 * every component calling this hook subscribes to the same store
 * instead of attaching its own `scroll` event listener.
 */
export default function useScrollProgress() {
  const [state, setState] = useState(getScrollState);

  useEffect(() => subscribeScroll(setState), []);

  return state;
}
