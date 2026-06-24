import MiniSkillBar from './MiniSkillBar.jsx';
import { HERO_TERMINAL_SKILLS } from '../../data/skills.js';
import { PROFILE } from '../../data/profile.js';

/**
 * The "radha@devbox:~$" terminal card shown on the right side of
 * the hero section, including a faux `cat profile.json` and a
 * `./skill-scan --all` output with animated mini progress bars.
 */
export default function HeroTerminal() {
  return (
    <div className="hero-right rv d3">
      <div className="term">
        <div className="term-bar">
          <div className="tdot r" />
          <div className="tdot y" />
          <div className="tdot g" />
          <span className="term-title">radha@devbox:~$</span>
        </div>
        <div className="term-body">
          <span className="tl">
            <span className="tp">❯</span> <span className="tc">cat profile.json</span>
          </span>
          <span className="tl to">
            <span className="tb">"name"</span>: <span className="tg">"{PROFILE.fullName}"</span>,
          </span>
          <span className="tl to">
            <span className="tb">"role"</span>: <span className="tg">"Full Stack + AI"</span>,
          </span>
          <span className="tl to">
            <span className="tb">"status"</span>: <span className="ta">"Open to Hire"</span>,
          </span>
          <span className="tl to">
            <span className="tb">"cgpa"</span>: <span className="tg">"{PROFILE.cgpa}"</span>
          </span>
          <span className="tl" style={{ marginTop: '.4rem' }}>
            <span className="tp">❯</span> <span className="tc">./skill-scan --all</span>
          </span>
          <div style={{ marginTop: '.3rem' }}>
            {HERO_TERMINAL_SKILLS.map((s) => (
              <MiniSkillBar key={s.name} name={s.name} pct={s.pct} />
            ))}
          </div>
          <span className="tl" style={{ marginTop: '.5rem' }}>
            <span className="tp">❯</span> <span className="tc">ping recruiter.io</span>
          </span>
          <span className="tl to">
            <span className="tg">✔</span> Packets sent — <span className="ta">awaiting reply...</span>
          </span>
        </div>
      </div>
    </div>
  );
}
