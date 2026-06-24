import { useState } from 'react';
import Page from '../components/common/Page.jsx';
import SkillBar from '../components/common/SkillBar.jsx';
import PdfModal from '../components/resume/PdfModal.jsx';
import { DownloadIcon, ExternalLinkIcon as ExternalIcon } from '../components/common/Icons.jsx';
import useToast from '../context/useToast.js';
import { PROFILE, RESUME_PATH, CV_PATH, RESUME_FILENAME, CV_FILENAME } from '../data/profile.js';
import { RESUME_SKILLS, RESUME_AI_CHIPS, RESUME_DEV_CHIPS, RESUME_SOFT_CHIPS } from '../data/skills.js';
import { EDUCATION, RESUME_PROJECTS, CERTIFICATIONS, RESUME_STATS } from '../data/resumeData.js';

function ChipRow({ items }) {
  return (
    <div className="rb-chips">
      {items.map((label) => (
        <span className="rb-chip" key={label}>
          {label}
        </span>
      ))}
    </div>
  );
}

function TimelineItem({ title, sub, date, desc }) {
  return (
    <div className="tl-item">
      <div className="tl-title">{title}</div>
      {sub && <div className="tl-sub">{sub}</div>}
      {date && <div className="tl-date">{date}</div>}
      {desc && <div className="tl-desc">{desc}</div>}
    </div>
  );
}

/**
 * Resume page: hero card with download/view actions, quick stats,
 * a two-column body (contact + tool chips on the left, skills /
 * education / projects / certifications timelines on the right),
 * and two PDF preview modals (Resume + CV).
 */
export default function Resume() {
  const toast = useToast();
  const [pdfModal, setPdfModal] = useState(null); // 'resume' | 'cv' | null

  const handleDownloadClick = (filename) => () => toast(`Downloading ${filename} …`);

  return (
    <Page id="resume" label="Resume">
      <div className="res-outer">
        <div className="res-hero rv">
          <div className="res-hero-inner">
            <div>
              <div className="sh-tag" style={{ marginBottom: '.6rem' }}>
                Resume &amp; CV
              </div>
              <div className="res-name">{PROFILE.fullName.toUpperCase()}</div>
              <div className="res-role">{PROFILE.role}</div>
              <div className="res-badges">
                <span className="res-badge">📍 {PROFILE.location}</span>
                <span className="res-badge">🎓 B.Tech ETC · 2026</span>
                <span className="res-badge">✉ {PROFILE.email}</span>
                <span className="res-badge">📞 {PROFILE.phone}</span>
              </div>
            </div>

            <div className="res-hero-right">
              <div className="dl-row" style={{ display: 'flex', gap: '.45rem', flexWrap: 'wrap' }}>
                <a
                  className="dl-btn-alt dba-cv-dl"
                  href={RESUME_PATH}
                  download={RESUME_FILENAME}
                  onClick={handleDownloadClick(RESUME_FILENAME)}
                >
                  <DownloadIcon />
                  Resume PDF
                </a>
                <a
                  className="dl-btn-alt dba-cv-dl"
                  href={CV_PATH}
                  download={CV_FILENAME}
                  onClick={handleDownloadClick(CV_FILENAME)}
                >
                  <DownloadIcon />
                  CV PDF
                </a>
                <button type="button" className="dl-btn-alt dba-res-view" onClick={() => setPdfModal('resume')}>
                  <ExternalIcon />
                  View Resume ↗
                </button>
                <button type="button" className="dl-btn-alt dba-cv-view" onClick={() => setPdfModal('cv')}>
                  <ExternalIcon />
                  View CV ↗
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="res-stats rv d1">
          {RESUME_STATS.map((stat) => (
            <div className="rs-card" key={stat.l}>
              <div className="rs-n">{stat.n}</div>
              <div className="rs-l">{stat.l}</div>
            </div>
          ))}
        </div>

        <div className="res-body">
          <div>
            <div className="rb rv d2">
              <div className="rb-head">Contact</div>
              <div className="ci-list">
                <div className="ci-item">
                  <span className="ci-ico">✉</span>
                  <div>
                    <div className="ci-k">Email</div>
                    <div className="ci-v">{PROFILE.email}</div>
                  </div>
                </div>
                <div className="ci-item">
                  <span className="ci-ico">📞</span>
                  <div>
                    <div className="ci-k">Phone</div>
                    <div className="ci-v">{PROFILE.phone}</div>
                  </div>
                </div>
                <div className="ci-item">
                  <span className="ci-ico">📍</span>
                  <div>
                    <div className="ci-k">Location</div>
                    <div className="ci-v">{PROFILE.location}</div>
                  </div>
                </div>
                <div className="ci-item">
                  <span className="ci-ico">🔗</span>
                  <div>
                    <div className="ci-k">LinkedIn</div>
                    <div className="ci-v">{PROFILE.linkedinLabel}</div>
                  </div>
                </div>
                <div className="ci-item">
                  <span className="ci-ico">🐙</span>
                  <div>
                    <div className="ci-k">GitHub</div>
                    <div className="ci-v">{PROFILE.githubLabel}</div>
                  </div>
                </div>
                <div className="ci-item">
                  <span className="ci-ico">🌐</span>
                  <div>
                    <div className="ci-k">Portfolio</div>
                    <div className="ci-v">portfolio-radha.netlify.app</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rb rv d3">
              <div className="rb-head">AI &amp; Automation</div>
              <ChipRow items={RESUME_AI_CHIPS} />
            </div>

            <div className="rb rv d4">
              <div className="rb-head">Dev Tools</div>
              <ChipRow items={RESUME_DEV_CHIPS} />
            </div>

            <div className="rb rv d5">
              <div className="rb-head">Soft Skills</div>
              <ChipRow items={RESUME_SOFT_CHIPS} />
            </div>
          </div>

          <div>
            <div className="rb rv d2">
              <div className="rb-head">Technical Skills</div>
              {RESUME_SKILLS.map((skill) => (
                <SkillBar key={skill.name} name={skill.name} pct={skill.pct} variant="resume" />
              ))}
            </div>

            <div className="rb rv d3">
              <div className="rb-head">Education</div>
              {EDUCATION.map((item) => (
                <TimelineItem key={item.title} {...item} />
              ))}
            </div>

            <div className="rb rv d4">
              <div className="rb-head">Key Projects</div>
              {RESUME_PROJECTS.map((item) => (
                <TimelineItem key={item.title} {...item} />
              ))}
            </div>

            <div className="rb rv d5">
              <div className="rb-head">Certifications</div>
              {CERTIFICATIONS.map((item) => (
                <TimelineItem key={item.title} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <PdfModal
        open={pdfModal === 'resume'}
        title="Resume — Radha Pandhari Sawarkar"
        subtitle="Resume PDF"
        path={RESUME_PATH}
        downloadName={RESUME_FILENAME}
        onClose={() => setPdfModal(null)}
      />
      <PdfModal
        open={pdfModal === 'cv'}
        title="CV — Radha Pandhari Sawarkar"
        subtitle="CV PDF"
        path={CV_PATH}
        downloadName={CV_FILENAME}
        onClose={() => setPdfModal(null)}
      />
    </Page>
  );
}
