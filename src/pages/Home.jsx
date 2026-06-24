import { useNavigate } from 'react-router-dom';
import Page from '../components/common/Page.jsx';
import HeroTerminal from '../components/home/HeroTerminal.jsx';
import useTypewriter from '../hooks/useTypewriter.js';
import { HERO_PHRASES } from '../data/profile.js';
import { HERO_STATS } from '../data/resumeData.js';

export default function Home() {
  const navigate = useNavigate();
  const typed = useTypewriter(HERO_PHRASES);

  return (
    <Page id="home" label="Home">
      <div className="hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />

        <div className="hero-left">
          <div className="hero-avail rv">
            <span className="avail-dot" aria-hidden="true" />
            Open to Full-Time &amp; Internship Roles
          </div>

          <h1 className="hero-name rv d1">
            RADHA PANDHARI
            <span className="n-outline">Sawarkar</span>
          </h1>

          <div className="hero-role-wrap rv d2" aria-live="polite">
            <span style={{ color: 'var(--w3)' }}>./</span>
            <span className="hero-typed">{typed}</span>
            <span className="typed-cursor" aria-hidden="true" />
          </div>

          <p className="hero-bio rv d3">
            <strong>B.Tech ETC student (2026)</strong> at SB Jain Institute, Nagpur. I build full-stack web
            applications and bring them to life with AI — currently interning at{' '}
            <strong>Royals Webtech Pvt. Ltd.</strong> and building automation, NLP, and intelligent workflow
            projects on the side.
          </p>

          <div className="hero-actions rv d4">
            <button className="btn btn-primary" onClick={() => navigate('/projects')}>
              View Projects ↗
            </button>
            <button className="btn btn-ghost" onClick={() => navigate('/contact')}>
              Connect →
            </button>
          </div>

          <div className="hero-stats rv d5">
            {HERO_STATS.map((stat) => (
              <div key={stat.l}>
                <span className="stat-n">
                  {stat.n}
                  <span>{stat.suffix}</span>
                </span>
                <span className="stat-l">{stat.l}</span>
              </div>
            ))}
          </div>
        </div>

        <HeroTerminal />
      </div>
    </Page>
  );
}
