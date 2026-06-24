import Page from '../components/common/Page.jsx';
import SectionHeading from '../components/common/SectionHeading.jsx';
import ContactForm from '../components/contact/ContactForm.jsx';
import { LinkedInIcon, GitHubIcon, GlobeIcon } from '../components/common/Icons.jsx';
import { PROFILE } from '../data/profile.js';

export default function Contact() {
  return (
    <Page id="contact" label="Contact">
      <div className="sec">
        <SectionHeading tag="Get In Touch" title="CONTACT" emphasis="ME" />

        <div className="contact-split">
          <div className="rv d2 ct-left">
            <p>
              Actively seeking entry-level roles in{' '}
              <strong style={{ color: 'var(--w1)' }}>full-stack engineering</strong>,{' '}
              <strong style={{ color: 'var(--w1)' }}>software development</strong>, or{' '}
              <strong style={{ color: 'var(--w1)' }}>AI &amp; automation</strong>. Open to full-time, internship, and
              freelance opportunities across India.
            </p>

            <a href={`mailto:${PROFILE.email}`} className="ct-email">
              <span>✉</span> {PROFILE.email}
            </a>

            <div className="soc-links">
              <a href={PROFILE.linkedinUrl} className="soc-link" target="_blank" rel="noopener noreferrer">
                <LinkedInIcon />
                LinkedIn — {PROFILE.linkedinLabel}
                <span className="soc-link-end">Connect ↗</span>
              </a>
              <a href={PROFILE.githubUrl} className="soc-link" target="_blank" rel="noopener noreferrer">
                <GitHubIcon />
                GitHub — {PROFILE.githubLabel}
                <span className="soc-link-end">View Code ↗</span>
              </a>
              <a href={PROFILE.portfolioUrl} className="soc-link" target="_blank" rel="noopener noreferrer">
                <GlobeIcon />
                Portfolio — {PROFILE.portfolioLabel}
                <span className="soc-link-end">Visit ↗</span>
              </a>
            </div>
          </div>

          <div className="rvR d2">
            <div className="cf-avail">
              <div className="cf-avail-top">
                <span className="cf-avail-dot" />
                <span className="cf-avail-status">Open to Opportunities</span>
              </div>
              <div className="cf-avail-title">Let's Build Something Together</div>
              <div className="cf-avail-desc">
                Looking for full-time, internship, or freelance roles in web development and AI-powered
                applications. Response time: within 24 hours.
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </div>
    </Page>
  );
}
