import Page from '../components/common/Page.jsx';
import SectionHeading from '../components/common/SectionHeading.jsx';
import TagList from '../components/common/TagList.jsx';
import { ABOUT_CARDS, ABOUT_META, CURRENT_ROLE } from '../data/aboutData.js';

export default function About() {
  return (
    <Page id="about" label="About Me">
      <div className="sec">
        <SectionHeading tag="Who I Am" title="ABOUT" emphasis="ME" />

        <div className="about-grid">
          <div className="about-intro rv d2">
            <p>
              I'm a <strong>final-year B.Tech ETC student</strong> at SB Jain Institute of Technology, Nagpur
              (graduating 2026), where I've built a strong foundation in electronics, communication systems, and
              software engineering.
            </p>
            <p>
              My work sits at the crossroads of <em>full-stack development</em> and{' '}
              <em>AI-powered automation</em> — I build interfaces and then make them smarter. I've completed
              multiple internships building AI-driven workflows, from multilingual NLP applications to
              GPT-powered automation dashboards.
            </p>
            <p>
              Currently completing a 6-month full-stack internship at Royals Webtech Pvt. Ltd., where I've
              shipped 3+ client-facing web applications. I aim to join an organization where I can grow as a
              security-conscious engineer.
            </p>

            <div className="about-meta rv d3">
              {ABOUT_META.map((item) => (
                <div className="am-item" key={item.key}>
                  <div className="am-k">{item.key}</div>
                  <div className="am-v">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rvR d2">
            <div className="about-cards">
              {ABOUT_CARDS.map((card) => (
                <div className="acard" key={card.title}>
                  <div className="acard-icon">{card.icon}</div>
                  <div className="acard-title">{card.title}</div>
                  <div className="acard-desc">{card.desc}</div>
                  <TagList tags={card.tags} className="acard-tags" />
                </div>
              ))}
            </div>

            <div className="exp-callout rv d4">
              <div className="exp-co-label">Current Role</div>
              <div className="exp-co-title">{CURRENT_ROLE.title}</div>
              <div className="exp-co-sub">{CURRENT_ROLE.sub}</div>
              <div className="exp-co-date">{CURRENT_ROLE.date}</div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
