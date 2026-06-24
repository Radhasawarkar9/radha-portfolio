import Page from '../components/common/Page.jsx';
import SectionHeading from '../components/common/SectionHeading.jsx';
import { EXPERTISE_ITEMS } from '../data/expertise.js';

export default function Expertise() {
  return (
    <Page id="expertise" label="Expertise">
      <div className="sec">
        <SectionHeading tag="What I Do" title="MY" emphasis="EXPERTISE" />

        <div className="exp-grid">
          {EXPERTISE_ITEMS.map((item, i) => (
            <div className={`ec rv d${i + 1}`} key={item.num}>
              <div className="ec-num">{item.num}</div>
              <div className="ec-bar" />
              <span className="ec-icon">{item.icon}</span>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}
