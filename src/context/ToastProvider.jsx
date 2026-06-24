import { useCallback, useEffect, useRef, useState } from 'react';
import ToastContext from './ToastContext.js';

export default function ToastProvider({ children }) {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);

  // Stable function reference (not an object), so there's nothing to
  // memoize beyond useCallback itself — consumers won't re-render
  // unless they actually call showToast.
  const showToast = useCallback((msg, duration = 3600) => {
    setMessage(msg);
    setVisible(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setVisible(false), duration);
  }, []);

  // ToastProvider sits at the app root and effectively never unmounts,
  // but clear the pending timer on unmount anyway so a stray toast
  // can't fire setState after the tree is gone.
  useEffect(() => () => clearTimeout(timerRef.current), []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div id="toast" role="alert" aria-live="polite" className={visible ? 'show' : ''}>
        {message}
      </div>
    </ToastContext.Provider>
  );
}
