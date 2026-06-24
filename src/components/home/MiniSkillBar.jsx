import { memo, useEffect, useRef, useState } from 'react';

/**
 * Compact animated bar used inside the hero terminal's
 * `./skill-scan --all` output. Animates width from 0 -> pct% once
 * it scrolls into view. Memoized since it's rendered in a static list.
 */
function MiniSkillBar({ name, pct, delay = 130 }) {
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

  return (
    <div className="tmr" ref={ref}>
      <span className="tml to">{name}</span>
      <div className="tmt">
        <div className="tmf" style={{ width: `${width}%` }} />
      </div>
      <span className="tmp to">{pct}%</span>
    </div>
  );
}

export default memo(MiniSkillBar);
