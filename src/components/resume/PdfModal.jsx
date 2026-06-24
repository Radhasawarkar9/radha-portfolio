import { useEffect } from 'react';

/**
 * Full-screen PDF viewer modal. Renders the given PDF in an <iframe>
 * with a top bar showing title/subtitle, a direct download link, and a
 * close button. Closes on Escape, backdrop click, or the close button,
 * and locks body scroll while open.
 */
export default function PdfModal({ open, title, subtitle, path, downloadName, onClose }) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  return (
    <div
      className={`pdf-modal${open ? ' open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Document viewer"
      aria-hidden={!open}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="pdf-modal-bar">
        <div>
          <div className="pdf-modal-title">{title}</div>
          <div className="pdf-modal-sub">{subtitle}</div>
        </div>
        <div className="pdf-modal-actions">
          <a className="pdf-modal-open" href={path} target="_blank" rel="noopener noreferrer">
            Open ↗
          </a>
          <a className="pdf-modal-dl" href={path} download={downloadName}>
            ↓ Download
          </a>
          <button className="pdf-modal-close" aria-label="Close" onClick={onClose}>
            ✕
          </button>
        </div>
      </div>
      <div className="pdf-modal-body">
        {open && path ? <iframe className="pdf-modal-iframe" src={path} title={title} /> : null}
      </div>
    </div>
  );
}
