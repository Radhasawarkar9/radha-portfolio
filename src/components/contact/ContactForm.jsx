import { useEffect, useRef, useState } from 'react';
import useToast from '../../context/useToast.js';
import { PROFILE } from '../../data/profile.js';

const EMAIL_RE        = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SEND_DELAY      = 900;   // minimum "Sending…" duration (ms) — prevents flicker on fast connections
const RESET_DELAY     = 5000;  // auto-clear form after success (ms)
const RIPPLE_DURATION = 600;

/**
 * Contact form — wired to the Netlify serverless function at
 * POST /.netlify/functions/contact, which:
 *   1. Saves the submission to Supabase (contact_messages table)
 *   2. Fires an email notification via Google Apps Script
 *
 * UI is identical to the original:
 *   • Inline ✔ on valid blur  •  Character counter (warn/over)
 *   • Ripple on submit click  •  idle → sending → done → auto-reset
 *   • Copy Email clipboard button with toast fallback
 */
export default function ContactForm() {
  const toast = useToast();

  const [name,    setName]    = useState('');
  const [email,   setEmail]   = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [nameValid,  setNameValid]  = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [status,   setStatus]   = useState({ msg: '', type: '' });
  const [btnState, setBtnState] = useState('idle'); // idle | sending | done
  const [copied,   setCopied]   = useState(false);
  const [ripples,  setRipples]  = useState([]);

  const resetTimer   = useRef(null);
  const copyTimer    = useRef(null);
  const rippleTimers = useRef(new Set());
  const abortCtrl    = useRef(null);

  useEffect(() => {
    const rt = rippleTimers.current;
    return () => {
      clearTimeout(resetTimer.current);
      clearTimeout(copyTimer.current);
      abortCtrl.current?.abort();
      rt.forEach((id) => clearTimeout(id));
      rt.clear();
    };
  }, []);

  const charCount = message.length;
  const charClass = charCount >= 500 ? ' over' : charCount > 450 ? ' warn' : '';

  const resetForm = () => {
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setNameValid(false);
    setEmailValid(false);
    setStatus({ msg: '', type: '' });
    setBtnState('idle');
  };

  const addRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id   = Date.now() + Math.random();
    setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    const timerId = setTimeout(() => {
      setRipples((r) => r.filter((rp) => rp.id !== id));
      rippleTimers.current.delete(timerId);
    }, RIPPLE_DURATION);
    rippleTimers.current.add(timerId);
  };

  const handleSubmit = async (e) => {
    addRipple(e);

    const n   = name.trim();
    const em  = email.trim();
    const sub = subject.trim();
    const msg = message.trim();

    // Client-side validation (mirrors server for instant feedback)
    if (!n || !em || !msg) {
      setStatus({ msg: '⚠ Please fill in name, email and message.', type: 'err' });
      return;
    }
    if (!EMAIL_RE.test(em)) {
      setStatus({ msg: '⚠ Please enter a valid email address.', type: 'err' });
      return;
    }

    setBtnState('sending');
    setStatus({ msg: '', type: '' });

    abortCtrl.current?.abort();
    abortCtrl.current = new AbortController();

    try {
      // Promise.all keeps "Sending…" visible for at least SEND_DELAY ms
      // even on a fast connection — avoids a jarring flash.
      const [res] = await Promise.all([
        fetch('/.netlify/functions/contact', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ name: n, email: em, subject: sub, message: msg }),
          signal:  abortCtrl.current.signal,
        }),
        new Promise((resolve) => setTimeout(resolve, SEND_DELAY)),
      ]);

      // Safely parse JSON — fall back to {} on parse error
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || `Server error (${res.status})`);
      }

      setBtnState('done');
      setStatus({ msg: '✓ Message delivered! Radha will get back to you soon.', type: 'ok' });

      clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => {
        resetForm();
        toast('Form cleared — ready for a new message.');
      }, RESET_DELAY);
    } catch (err) {
      if (err.name === 'AbortError') return; // component unmounted mid-flight
      setBtnState('idle');
      setStatus({
        msg:  `⚠ ${err.message || 'Send failed — please email directly or try again.'}`,
        type: 'err',
      });
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      toast(`Email: ${PROFILE.email}`);
    }
  };

  return (
    <div className="ct-form">
      <div className="cf-row">
        <div className={`fg${nameValid ? ' valid' : ''}`}>
          <label htmlFor="cf-name">Your Name *</label>
          <input
            type="text"
            id="cf-name"
            className="fi"
            placeholder="Aarav Sharma"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setNameValid(name.trim().length > 1)}
          />
          <div className="fline" />
          <span className="fvalid">✔</span>
        </div>

        <div className={`fg${emailValid ? ' valid' : ''}`}>
          <label htmlFor="cf-email">Email Address *</label>
          <input
            type="email"
            id="cf-email"
            className="fi"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setEmailValid(EMAIL_RE.test(email.trim()))}
          />
          <div className="fline" />
          <span className="fvalid">✔</span>
        </div>
      </div>

      <div className="fg">
        <label htmlFor="cf-sub">Subject</label>
        <input
          type="text"
          id="cf-sub"
          className="fi"
          placeholder="Job Opportunity / Collaboration / Inquiry"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <div className="fline" />
      </div>

      <div className="fg">
        <label htmlFor="cf-msg">Message *</label>
        <textarea
          id="cf-msg"
          className="ft"
          placeholder="Hi Radha, I'd love to connect about…"
          maxLength={500}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="fline" />
        <div className={`fchar${charClass}`}>{charCount} / 500</div>
      </div>

      <div className="cf-submit-row">
        <button
          type="button"
          className={`cf-btn${btnState === 'sending' ? ' sending' : ''}${btnState === 'done' ? ' done' : ''}`}
          onClick={handleSubmit}
          disabled={btnState === 'sending'}
          aria-busy={btnState === 'sending'}
        >
          <span>
            {btnState === 'sending' ? 'Sending…' : btnState === 'done' ? 'Sent!' : 'Send Message'}
          </span>
          <span>
            {btnState === 'sending' ? '' : btnState === 'done' ? '✔' : '→'}
          </span>
          {ripples.map((r) => (
            <span key={r.id} className="ripple" style={{ left: r.x, top: r.y }} />
          ))}
        </button>

        <button
          type="button"
          className={`cf-copy${copied ? ' copied' : ''}`}
          onClick={handleCopy}
        >
          {copied ? 'Copied! ✔' : 'Copy Email'}
        </button>
      </div>

      <span
        className={`cf-status${status.msg ? ' vis' : ''}${status.type ? ' ' + status.type : ''}`}
        role="alert"
        aria-live="polite"
      >
        {status.msg}
      </span>
    </div>
  );
}
