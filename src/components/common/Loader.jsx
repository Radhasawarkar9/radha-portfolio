import { useEffect, useState } from 'react';
import useLoader from '../../context/useLoader.js';

const BAR_DURATION = 1600; // ms — width 0 -> 100%
const HOLD_DURATION = 1850; // ms — before starting fade out
const FADE_DURATION = 480; // ms — fade-out transition

/**
 * Full-screen branded loader shown on first load (and replayed when the
 * logo is clicked). Mirrors the original `runLoader()` timeline:
 * bar animates to 100% over ~1.6s, holds, then fades out.
 */
export default function Loader() {
  const { playKey, markReady } = useLoader();
  const [stage, setStage] = useState('show'); // 'show' | 'out' | 'hidden'
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    setStage('show');
    setBarWidth(0);

    let raf1, raf2;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setBarWidth(100));
    });

    const holdTimer = setTimeout(() => {
      setStage('out');
    }, HOLD_DURATION);

    const hideTimer = setTimeout(() => {
      setStage('hidden');
      markReady();
    }, HOLD_DURATION + FADE_DURATION);

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      clearTimeout(holdTimer);
      clearTimeout(hideTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playKey]);

  return (
    <div
      id="ldr"
      role="status"
      aria-label="Loading"
      aria-hidden={stage === 'hidden' ? 'true' : undefined}
      className={stage === 'out' ? 'out' : stage === 'show' ? 'show' : ''}
    >
      <div className="ldr-grid" aria-hidden="true">
        <div className="ldr-sq" />
        <div className="ldr-sq teal" />
        <div className="ldr-sq teal" />
        <div className="ldr-sq" />
      </div>
      <div className="ldr-name">
        <span className="ln1">RADHA PANDHARI</span>
        <span className="ln2">Sawarkar</span>
        <span className="ln3">PORTFOLIO</span>
      </div>
      <div className="ldr-tag">Full Stack · AI &amp; Automation · ETC</div>
      <div className="ldr-bar-wrap">
        <div
          className="ldr-bar"
          style={{
            width: `${barWidth}%`,
            transition: barWidth === 0 ? 'none' : `width ${BAR_DURATION}ms cubic-bezier(0.16,1,0.3,1)`,
          }}
        />
      </div>
    </div>
  );
}
