import Page from '../components/common/Page.jsx';
import SectionHeading from '../components/common/SectionHeading.jsx';
import SkillBar from '../components/common/SkillBar.jsx';
import TagList from '../components/common/TagList.jsx';
import { CORE_SKILLS, AI_AUTOMATION_TOOLS, DEV_TOOLS, SOFT_SKILLS } from '../data/skills.js';

const toTags = (labels, teal = false) => labels.map((label) => ({ label, teal }));

export default function Skills() {
  return (
    <Page id="skills" label="Technical Skills">
      <div className="sec">
        <SectionHeading tag="What I Know" title="TECHNICAL" emphasis="SKILLS" />

        <div className="skills-wrap">
          <div className="rvL d1">
            <div className="sk-section-label">Core Proficiencies</div>
            {CORE_SKILLS.map((skill) => (
              <SkillBar key={skill.name} name={skill.name} pct={skill.pct} variant="skills" />
            ))}
          </div>

          <div className="rvR d2">
            <div style={{ marginBottom: '2rem' }}>
              <div className="sk-section-label">AI &amp; Automation Tools</div>
              <TagList tags={toTags(AI_AUTOMATION_TOOLS, true)} className="chips" />
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <div className="sk-section-label">Dev Tools &amp; Platforms</div>
              <TagList tags={toTags(DEV_TOOLS)} className="chips" />
            </div>
            <div>
              <div className="sk-section-label">Soft Skills</div>
              <TagList tags={toTags(SOFT_SKILLS)} className="chips" />
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
