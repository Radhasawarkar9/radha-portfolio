import { useNavigate } from 'react-router-dom';
import Page from '../components/common/Page.jsx';

/**
 * Catch-all 404 page for any route that doesn't match — keeps the
 * navbar, cursor, and theming intact while offering a way back home.
 */
export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Page id="404" label="Page not found">
      <div className="sec nf-sec">
        <div className="rv nf-inner">
          <div className="sh-tag in nf-tag">404 · Not Found</div>
          <h2 className="nf-heading">
            PAGE NOT <em>FOUND</em>
          </h2>
          <p className="hero-bio nf-desc">
            The page you're looking for doesn't exist or may have moved. Let's get you back on track.
          </p>
          <div className="hero-actions nf-actions">
            <button className="btn btn-primary" onClick={() => navigate('/')}>
              Back to Home
            </button>
            <button className="btn btn-ghost" onClick={() => navigate('/contact')}>
              Contact Me →
            </button>
          </div>
        </div>
      </div>
    </Page>
  );
}
