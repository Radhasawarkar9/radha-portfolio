import { memo } from 'react';

/**
 * Renders a row of small pill-shaped tags, e.g. technology badges on
 * project/certificate/experience cards. Pass `{ label, teal }` objects —
 * `teal: true` applies the highlighted `.tag-teal` variant.
 *
 * Memoized — it's rendered once per project/certificate/experience card
 * (often a dozen+ times per page) with the same array reference on every
 * re-render of its parent, so there's no reason to re-render it too.
 */
function TagList({ tags, className = '' }) {
  if (!tags || tags.length === 0) return null;
  return (
    <div className={className}>
      {tags.map((t) => (
        <span key={t.label} className={`tag${t.teal ? ' tag-teal' : ''}`}>
          {t.label}
        </span>
      ))}
    </div>
  );
}

export default memo(TagList);
