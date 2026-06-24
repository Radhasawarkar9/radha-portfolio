import { Component } from 'react';

/**
 * Top-level error boundary.
 *
 * Catches render-time errors anywhere in the tree below it (including
 * a failed dynamic `import()` from a lazy-loaded route) and shows a
 * minimal, branded fallback instead of leaving the user with a blank
 * white screen. The only way out is a manual reload — which is exactly
 * the *intended* manual-refresh path, not an automatic one.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('Unhandled error in app tree:', error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            padding: '2rem',
            textAlign: 'center',
            background: '#050608',
            color: '#f5f5f5',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <h1 style={{ fontSize: '1.4rem', margin: 0, fontWeight: 600 }}>Something went wrong.</h1>
          <p style={{ opacity: 0.7, margin: 0, maxWidth: '32ch' }}>
            Please reload the page. If the problem continues, try again in a few minutes.
          </p>
          <button
            onClick={this.handleReload}
            style={{
              padding: '.6rem 1.4rem',
              borderRadius: '999px',
              border: '1px solid currentColor',
              background: 'transparent',
              color: 'inherit',
              cursor: 'pointer',
              fontSize: '.9rem',
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
