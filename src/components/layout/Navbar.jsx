import { NavLink, useNavigate } from 'react-router-dom';
import { NAV_LINKS, RESUME_PATH } from '../../data/navLinks.js';
import useTheme from '../../context/useTheme.js';
import useLoader from '../../context/useLoader.js';
import useScrollProgress from '../../hooks/useScrollProgress.js';

export default function Navbar({ mobOpen, setMobOpen, hamRef }) {
  const navigate = useNavigate();
  const { isLight, toggleTheme } = useTheme();
  const { replayLoader } = useLoader();
  const { scrolled } = useScrollProgress();

  const handleLogoClick = () => {
    replayLoader();
    navigate('/');
    setMobOpen(false);
  };

  return (
    <nav id="nav" className={scrolled ? 'scrolled' : ''} role="navigation" aria-label="Main navigation">
      <div
        className="logo"
        role="button"
        tabIndex={0}
        aria-label="Home"
        onClick={handleLogoClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleLogoClick();
        }}
      >
        RPS<span className="logo-dot">.</span>
      </div>

      <ul className="nav-links" role="list">
        {NAV_LINKS.map((link) => (
          <li key={link.path}>
            <NavLink to={link.path} end className={({ isActive }) => `nl${isActive ? ' act' : ''}`}>
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="nav-right">
        <button className="nav-cta" onClick={() => navigate(RESUME_PATH)}>
          ↓ Resume
        </button>
        <button className="theme-toggle" aria-label="Toggle dark/light mode" onClick={toggleTheme}>
          <span className="t-dark" aria-hidden={isLight}>
            🌙
          </span>
          <span className="t-light" aria-hidden={!isLight}>
            ☀️
          </span>
        </button>
        <button
          className={`ham${mobOpen ? ' on' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={mobOpen}
          ref={hamRef}
          onClick={(e) => {
            e.stopPropagation();
            setMobOpen((v) => !v);
          }}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
