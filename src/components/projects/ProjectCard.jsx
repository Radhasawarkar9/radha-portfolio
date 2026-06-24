import { memo } from 'react';
import TagList from '../common/TagList.jsx';
import { ExternalLinkIcon, NoLinkIcon } from '../common/Icons.jsx';

/**
 * A single project card on the Projects page. Renders either a "View
 * Live" link (when `project.link` is set) or a disabled "No Live Demo"
 * pill, both pinned to the bottom of the card via flexbox.
 */
function ProjectCard({ project, revealClass }) {
  return (
    <article className={`pc ${revealClass}`}>
      <div className="pc-img">
        <img src={project.image} alt={`${project.title} screenshot`} className="project-img" loading="lazy" />
        <span className="pc-badge">{project.badge}</span>
      </div>
      <div className="pc-body">
        <h4>{project.title}</h4>
        <p>{project.desc}</p>
        <TagList tags={project.tags} className="pc-tags" />
        <div className="pc-btn-row">
          {project.link ? (
            <a
              className="pc-live-btn"
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} live site`}
            >
              <ExternalLinkIcon />
              View Live ↗
            </a>
          ) : (
            <span className="pc-live-btn pc-no-link" aria-label="No live demo available">
              <NoLinkIcon />
              No Live Demo
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default memo(ProjectCard);
