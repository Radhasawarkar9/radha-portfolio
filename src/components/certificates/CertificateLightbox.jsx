import { useEffect, useRef, useState } from 'react';

/**
 * Full-screen certificate viewer with prev/next navigation, dot
 * indicators, keyboard arrow/Escape support, and touch swipe.
 *
 * Controlled component: `activeIndex` (index into `certs`, or `null` when
 * closed) and `onClose` are owned by the parent (Certificates page).
 */
export default function CertificateLightbox({ certs, activeIndex, onClose }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const touchX = useRef(0);

  const open = activeIndex !== null && activeIndex !== undefined;
  const cert = open ? certs[activeIndex] : null;
  const total = cert?.imgs?.length || 0;
  const hasNav = total > 1;

  // Reset to the first image whenever a new certificate is opened.
  useEffect(() => {
    setImgIdx(0);
    setLoaded(false);
    setImgError(false);
  }, [activeIndex]);

  const navigate = (dir) => {
    if (total < 2) return;
    setImgIdx((i) => (i + dir + total) % total);
    setLoaded(false);
    setImgError(false);
  };

  // Lock body scroll + keyboard navigation while open.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, total]);

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    const dx = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 48) navigate(dx > 0 ? 1 : -1);
  };

  return (
    <div
      className={`cert-lb${open ? ' open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Certificate viewer"
      aria-hidden={!open}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {cert && (
        <div className="cert-lb-inner">
          <div className="cert-lb-topbar">
            <div className="cert-lb-topbar-left">
              <span className="cert-lb-topbar-icon">{cert.icon}</span>
              <div>
                <div className="cert-lb-topbar-title">{cert.title}</div>
                <div className="cert-lb-topbar-org">{cert.org}</div>
              </div>
            </div>
            <div className="cert-lb-topbar-right">
              <span className="cert-lb-hint">
                <kbd>←</kbd>
                <kbd>→</kbd> navigate &nbsp;·&nbsp; <kbd>Esc</kbd> close
              </span>
              <button className="cert-lb-close" aria-label="Close" onClick={onClose}>
                ✕
              </button>
            </div>
          </div>

          <div className="cert-lb-img-wrap" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            {total === 0 || imgError ? (
              <div className="cert-lb-ph">
                <div className="ph-icon">{cert.icon}</div>
                <div className="ph-name">{cert.title}</div>
                <div className="ph-org">{cert.org}</div>
                {imgError ? (
                  <div className="ph-note">
                    ⚠ Image not found at:
                    <br />
                    <code style={{ fontSize: '9px', color: 'var(--teal)' }}>{cert.imgs[imgIdx]}</code>
                  </div>
                ) : (
                  <div className="ph-note">📁 Certificate image not added yet</div>
                )}
              </div>
            ) : (
              <img
                key={cert.imgs[imgIdx]}
                className={`cert-lb-img ${loaded ? 'loaded' : 'loading'}`}
                alt={cert.title}
                src={cert.imgs[imgIdx]}
                onLoad={() => setLoaded(true)}
                onError={() => setImgError(true)}
              />
            )}

            <button className="cert-lb-arr prev" aria-label="Previous image" hidden={!hasNav} onClick={() => navigate(-1)}>
              ←
            </button>
            <button className="cert-lb-arr next" aria-label="Next image" hidden={!hasNav} onClick={() => navigate(1)}>
              →
            </button>
          </div>

          <div className="cert-lb-infobar">
            <span className="cert-lb-date">{cert.date}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.8rem' }}>
              {hasNav && (
                <div className="cert-lb-dots-wrap">
                  {cert.imgs.map((_, i) => (
                    <button
                      key={i}
                      className={`cert-lb-dot${i === imgIdx ? ' active' : ''}`}
                      aria-label={`Image ${i + 1}`}
                      onClick={() => {
                        setImgIdx(i);
                        setLoaded(false);
                        setImgError(false);
                      }}
                    />
                  ))}
                </div>
              )}
              <span className="cert-lb-counter">{hasNav ? `${imgIdx + 1} / ${total}` : ''}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
