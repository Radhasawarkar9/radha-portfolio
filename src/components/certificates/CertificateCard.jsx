import { memo, useState } from 'react';
import { ViewIcon } from '../common/Icons.jsx';

/**
 * A single certificate card. Clicking anywhere on the card (or the
 * "View Certificate" button) opens the CertificateLightbox at this
 * certificate's index. Falls back to a styled placeholder if the cover
 * image fails to load.
 *
 * Memoized — the Certificates page re-renders every time the lightbox
 * opens/closes (setActiveIndex), which would otherwise re-render every
 * card in the grid even though none of their props changed.
 */
function CertificateCard({ cert, index, onOpen, revealClass }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`ccard ${revealClass}`}
      onClick={() => onOpen(index)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onOpen(index);
      }}
    >
      <div className="ccard-img">
        {!imgError ? (
          <img
            src={cert.cover}
            alt={`${cert.title} cover`}
            className="ccard-cover"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="ccard-img-ph">
            <div className="ccard-ph-icon">{cert.icon}</div>
            <div className="ccard-ph-txt">Certificate Image</div>
          </div>
        )}
      </div>
      <div className="ccard-accent" />
      <div className="ccard-body">
        <div className="ccard-title">{cert.title}</div>
        <div className="ccard-org">{cert.org}</div>
        <div className="ccard-date">{cert.date}</div>
        <div className="ccard-view-row">
          <button
            className="ccard-view-btn-full"
            aria-label={`View ${cert.title} certificate`}
            onClick={(e) => {
              e.stopPropagation();
              onOpen(index);
            }}
          >
            <ViewIcon />
            View Certificate
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(CertificateCard);
