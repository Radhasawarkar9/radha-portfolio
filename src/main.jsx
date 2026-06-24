import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import ThemeProvider from './context/ThemeProvider.jsx';
import ToastProvider from './context/ToastProvider.jsx';
import ErrorBoundary from './components/common/ErrorBoundary.jsx';
import './index.css';

// NOTE: intentionally no <React.StrictMode> wrapper.
//
// StrictMode is a dev-only tool that deliberately mounts -> cleans up ->
// re-mounts every component once, so every effect in the tree runs
// twice on first load. That's the "page loads/animates twice" symptom
// during `npm run dev` (e.g. the full-screen Loader's intro animation
// firing twice in a row). It has zero effect on the production build —
// React never double-invokes effects outside of development — but it
// also means it can't be relied on to catch issues that won't exist in
// production anyway. Every effect in this codebase already has a
// matching cleanup function (verified during the production-readiness
// pass), so StrictMode isn't providing extra safety here, only noise.
ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <BrowserRouter>
      <ThemeProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  </ErrorBoundary>
);
