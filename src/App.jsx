import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoaderProvider from './context/LoaderProvider.jsx';
import Loader from './components/common/Loader.jsx';
import CustomCursor from './components/common/CustomCursor.jsx';
import ScrollProgressBar from './components/common/ScrollProgressBar.jsx';
import Layout from './components/layout/Layout.jsx';
import Home from './pages/Home.jsx';

// Home is loaded eagerly (it's the initial route, so deferring it would
// only delay the very first paint). Every other route is code-split —
// its JS is fetched on demand the first time it's visited, so clicking
// a nav link only ever loads *that page's* chunk, not the whole app.
const About = lazy(() => import('./pages/About.jsx'));
const Skills = lazy(() => import('./pages/Skills.jsx'));
const Expertise = lazy(() => import('./pages/Expertise.jsx'));
const Experience = lazy(() => import('./pages/Experience.jsx'));
const Projects = lazy(() => import('./pages/Projects.jsx'));
const Certificates = lazy(() => import('./pages/Certificates.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const Resume = lazy(() => import('./pages/Resume.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

/**
 * Root application shell.
 *
 * - `LoaderProvider` drives the full-screen branded loader (shown on
 *   first load and replayed on logo click).
 * - `CustomCursor` + `ScrollProgressBar` are global, fixed-position UI
 *   rendered once at the top level — they never unmount on navigation.
 * - `Layout` renders the navbar / mobile menu and an `<Outlet>` for the
 *   routed page content, so only that `<Outlet>` content swaps on
 *   navigation; the navbar, cursor, scroll bar, and loader shell stay
 *   mounted the entire session.
 * - `Suspense` covers the lazy-loaded routes with a `null` fallback —
 *   on a normal connection the chunk resolves fast enough that no
 *   flash is visible, and it's only ever shown for a route that isn't
 *   the current one anyway.
 */
export default function App() {
  return (
    <LoaderProvider>
      <Loader />
      <CustomCursor />
      <ScrollProgressBar />
      <Suspense fallback={null}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/expertise" element={<Expertise />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </LoaderProvider>
  );
}
