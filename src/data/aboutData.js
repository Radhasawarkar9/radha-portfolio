import { PROFILE } from './profile.js';

/** The three "focus area" cards shown beside the About intro text. */
export const ABOUT_CARDS = [
  {
    icon: '🖥️',
    title: 'Full Stack Development',
    desc: 'Building end-to-end web apps with React, Node.js, MongoDB, and RESTful APIs — from responsive UI to server-side logic.',
    tags: [
      { label: 'React.js', teal: true },
      { label: 'Node.js', teal: true },
      { label: 'MongoDB', teal: true },
    ],
  },
  {
    icon: '🤖',
    title: 'AI & Automation',
    desc: 'Building AI-powered automation workflows and intelligent tools — from NLP-based multilingual applications to GPT-driven automation dashboards.',
    tags: [
      { label: 'Python', teal: true },
      { label: 'NLP', teal: true },
      { label: 'Automation', teal: true },
    ],
  },
  {
    icon: '📡',
    title: 'Electronics & Telecom',
    desc: 'Signals, circuits, embedded systems, and communication protocols — giving me a hardware-to-software perspective rare in most developers.',
    tags: [{ label: 'MATLAB' }, { label: 'C/C++' }, { label: 'DSP' }],
  },
];

/** Quick facts grid below the About intro paragraphs. */
export const ABOUT_META = [
  { key: 'Full Name', value: PROFILE.fullName },
  { key: 'Date of Birth', value: PROFILE.dob },
  { key: 'Email', value: PROFILE.email },
  { key: 'Phone', value: PROFILE.phone },
  { key: 'Location', value: PROFILE.location },
  { key: 'CGPA', value: PROFILE.cgpa },
];

/** "Current Role" callout shown under the focus-area cards. */
export const CURRENT_ROLE = {
  title: 'Full Stack Development Intern',
  sub: 'Royals Webtech Pvt. Ltd.',
  date: '🟢 Jan 2026 – Jul 2026 · Active',
};
