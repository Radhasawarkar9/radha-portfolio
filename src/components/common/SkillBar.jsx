import { memo, useEffect, useRef, useState } from 'react';

/**
 * Animated skill progress bar. Width animates from 0 -> `pct`% shortly
 * after mount (mirrors the original `animBars()` behaviour, which ran
 * whenever the Skills/Resume page was navigated to).
 *
 * `variant="skills"` uses the larger Skills-page markup classes,
 * `variant="resume"` uses the more compact Resume-page classes.
 * Memoized since it's rendered repeatedly in a list with static props.
 */
function SkillBar({ name, pct, variant = 'skills', delay = 130 }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timeoutId;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            timeoutId = setTimeout(() => setWidth(pct), delay);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      clearTimeout(timeoutId);
    };
  }, [pct, delay]);

  if (variant === 'resume') {
    return (
      <div className="res-skill" ref={ref}>
        <div className="res-sk-top">
          <span className="res-sk-nm">{name}</span>
          <span className="res-sk-pc">{pct}%</span>
        </div>
        <div className="res-sk-bar">
          <div className="res-sk-fill" style={{ width: `${width}%` }} />
        </div>
      </div>
    );
  }

  return (
    <div className="sk-row" ref={ref}>
      <div className="sk-top">
        <span className="sk-name">{name}</span>
        <span className="sk-pct">{pct}%</span>
      </div>
      <div className="sk-track">
        <div className="sk-fill" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

export default memo(SkillBar);
