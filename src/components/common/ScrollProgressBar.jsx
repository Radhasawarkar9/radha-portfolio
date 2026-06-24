import useScrollProgress from '../../hooks/useScrollProgress.js';

/**
 * Thin gradient bar fixed to the top of the viewport showing how far
 * the user has scrolled down the current page.
 */
export default function ScrollProgressBar() {
  const { progress } = useScrollProgress();
  return <div id="sp" aria-hidden="true" style={{ width: `${progress}%` }} />;
}
