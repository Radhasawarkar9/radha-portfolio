import { useCallback, useMemo, useState } from 'react';
import LoaderContext from './LoaderContext.js';

/**
 * Drives the full-screen branded loader.
 *
 * `appReady` flips true exactly once, after the first load finishes,
 * and never resets — so page-to-page navigation never re-triggers the
 * loader. `playKey` only changes when `replayLoader()` is called (the
 * logo click), which is the *only* thing that replays the loader after
 * first load.
 */
export default function LoaderProvider({ children }) {
  const [appReady, setAppReady] = useState(false);
  const [playKey, setPlayKey] = useState(0);

  const markReady = useCallback(() => setAppReady(true), []);
  const replayLoader = useCallback(() => setPlayKey((k) => k + 1), []);

  const value = useMemo(
    () => ({ appReady, playKey, markReady, replayLoader }),
    [appReady, playKey, markReady, replayLoader]
  );

  return <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>;
}
