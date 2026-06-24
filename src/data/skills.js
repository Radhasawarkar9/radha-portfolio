/**
 * Core technical skills shown as animated progress bars on the
 * Skills page and (in a slightly different layout) on the Resume page.
 */
export const CORE_SKILLS = [
  { name: 'HTML5 & CSS3', pct: 90 },
  { name: 'JavaScript / React.js', pct: 85 },
  { name: 'AI & Automation Tools', pct: 80 },
  { name: 'Python', pct: 80 },
  { name: 'Node.js / MongoDB', pct: 72 },
  { name: 'C / C++', pct: 75 },
  { name: 'Java', pct: 70 },
  { name: 'SQL (MySQL / SQLite)', pct: 72 },
  { name: 'MATLAB', pct: 65 },
];

/** Subset of CORE_SKILLS shown on the Resume page sidebar. */
export const RESUME_SKILLS = CORE_SKILLS.filter((s) => s.name !== 'Java' && s.name !== 'MATLAB');

/** Skills shown as a mini terminal scan in the hero "profile.json" card. */
export const HERO_TERMINAL_SKILLS = [
  { name: 'React/JS', pct: 85 },
  { name: 'Python', pct: 80 },
  { name: 'AI Tools', pct: 80 },
  { name: 'Node.js', pct: 72 },
];

export const AI_AUTOMATION_TOOLS = [
  'n8n',
  'GPT-4 APIs',
  'NLP',
  'Flask',
  'Workflow Automation',
  'REST APIs',
];

export const DEV_TOOLS = ['Git & GitHub', 'VS Code', 'Netlify', 'Bootstrap', 'REST APIs', 'MATLAB', 'Figma', 'Linux Terminal'];

export const SOFT_SKILLS = [
  'Leadership',
  'Team Collaboration',
  'Problem-Solving',
  'Communication',
  'Critical Thinking',
  'Adaptability',
  'Time Management',
];

/** Compact chip lists shown on the Resume sidebar. */
export const RESUME_AI_CHIPS = ['n8n', 'GPT-4', 'NLP', 'Flask', 'Automation'];
export const RESUME_DEV_CHIPS = ['Git/GitHub', 'VS Code', 'Netlify', 'MATLAB', 'Figma'];
export const RESUME_SOFT_CHIPS = ['Leadership', 'Collaboration', 'Problem-Solving', 'Communication'];
