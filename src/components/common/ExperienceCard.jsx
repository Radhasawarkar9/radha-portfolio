import { memo } from 'react';
import TagList from './TagList.jsx';

/**
 * A single work/internship/leadership entry on the Experience timeline.
 * Memoized since it's rendered in a list with stable, static props.
 */
function ExperienceCard({ item, revealClass }) {
  return (
    <div className={`exp-item ${revealClass}`}>
      <div className="exp-item-head">
        <div>
          <div className="exp-company">{item.company}</div>
          <div className="exp-role">{item.role}</div>
        </div>
        <span className="exp-date">{item.date}</span>
      </div>
      <ul>
        {item.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
      <TagList tags={item.tags} className="pc-tags" />
    </div>
  );
}

export default memo(ExperienceCard);
