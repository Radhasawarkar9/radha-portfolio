import Page from '../components/common/Page.jsx';
import SectionHeading from '../components/common/SectionHeading.jsx';
import ExperienceCard from '../components/common/ExperienceCard.jsx';
import { EXPERIENCE_ITEMS } from '../data/experience.js';

export default function Experience() {
  return (
    <Page id="experience" label="Experience">
      <div className="sec">
        <SectionHeading tag="Where I've Worked" title="WORK" emphasis="EXPERIENCE" />

        <div className="exp-tl">
          {EXPERIENCE_ITEMS.map((item, i) => (
            <ExperienceCard key={item.company + item.role} item={item} revealClass={`rv d${i + 1}`} />
          ))}
        </div>
      </div>
    </Page>
  );
}
