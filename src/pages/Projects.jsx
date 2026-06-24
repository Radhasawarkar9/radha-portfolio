import Page from '../components/common/Page.jsx';
import SectionHeading from '../components/common/SectionHeading.jsx';
import ProjectCard from '../components/projects/ProjectCard.jsx';
import { PROJECTS } from '../data/projects.js';

export default function Projects() {
  return (
    <Page id="projects" label="Projects">
      <div className="sec">
        <SectionHeading tag="What I've Built" title="RECENT" emphasis="PROJECTS" />

        <div className="proj-grid">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} revealClass={`rv d${(i % 10) + 1}`} />
          ))}
        </div>
      </div>
    </Page>
  );
}
