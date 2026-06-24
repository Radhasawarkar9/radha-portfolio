import { useState } from 'react';
import Page from '../components/common/Page.jsx';
import SectionHeading from '../components/common/SectionHeading.jsx';
import CertificateCard from '../components/certificates/CertificateCard.jsx';
import CertificateLightbox from '../components/certificates/CertificateLightbox.jsx';
import { CERTIFICATES } from '../data/certificates.js';

export default function Certificates() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <Page id="certs" label="Certificates">
      <div className="sec">
        <SectionHeading tag="Credentials &amp; Training" title="MY" emphasis="CERTIFICATES" />

        <div className="cert-cards-grid">
          {CERTIFICATES.map((cert, i) => (
            <CertificateCard
              key={cert.title}
              cert={cert}
              index={i}
              onOpen={setActiveIndex}
              revealClass={`rv d${(i % 6) + 1}`}
            />
          ))}
        </div>
      </div>

      <CertificateLightbox certs={CERTIFICATES} activeIndex={activeIndex} onClose={() => setActiveIndex(null)} />
    </Page>
  );
}
