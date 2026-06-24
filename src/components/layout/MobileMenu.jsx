import { forwardRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { NAV_LINKS, RESUME_PATH } from '../../data/navLinks.js';
import useTheme from '../../context/useTheme.js';

const MobileMenu = forwardRef(function MobileMenu({ open, onClose }, ref) {
  const navigate = useNavigate();
  const { isLight, toggleTheme } = useTheme();

  return (
    <div className={`mob${open ? ' on' : ''}`} role="dialog" aria-label="Mobile navigation" ref={ref}>
      {NAV_LINKS.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          end
          className={({ isActive }) => `nl${isActive ? ' act' : ''}`}
          onClick={onClose}
        >
          {link.label}
        </NavLink>
      ))}
      <button
        className="mob-cta"
        onClick={() => {
          onClose();
          navigate(RESUME_PATH);
        }}
      >
        ↓ Resume
      </button>
      <div className="mob-theme-row">
        <button className="mob-theme-btn" aria-label="Toggle theme" onClick={toggleTheme}>
          <span className="t-dark" aria-hidden={isLight}>
            🌙
          </span>
          <span className="t-light" aria-hidden={!isLight}>
            ☀️
          </span>
        </button>
        <span className="mob-theme-label">{isLight ? 'Light Mode' : 'Dark Mode'}</span>
      </div>
    </div>
  );
});

export default MobileMenu;
