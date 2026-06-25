/**
 * Netlify Serverless Function — contact
 * Route: POST /.netlify/functions/contact
 *
 * Pipeline:
 *   1. Parse & validate the form payload server-side
 *   2. Insert a row into Supabase via REST API (service_role key — bypasses RLS)
 *   3. POST to Google Apps Script for email notification (AWAITED)
 *
 * Environment variables (set in Netlify dashboard → Site configuration → Environment variables):
 *   SUPABASE_URL           https://<project-id>.supabase.co
 *   SUPABASE_SERVICE_KEY   service_role secret key (never used client-side)
 *   GOOGLE_APPS_SCRIPT_URL Deployed GAS web-app URL (optional but recommended)
 */

const EMAIL_RE    = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME    = 100;
const MAX_EMAIL   = 320;
const MAX_SUBJECT = 200;
const MAX_MESSAGE = 2000;

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const json = (body, statusCode = 200) => ({
  statusCode,
  headers: { ...CORS, 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

// ─────────────────────────────────────────────────────────────────────────────

export const handler = async (event) => {
  // CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  // Parse body
  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return json({ error: 'Invalid request body — expected JSON' }, 400);
  }

  // Sanitise & truncate
  const name    = String(payload.name    ?? '').trim().slice(0, MAX_NAME);
  const email   = String(payload.email   ?? '').trim().slice(0, MAX_EMAIL);
  const subject = String(payload.subject ?? '').trim().slice(0, MAX_SUBJECT);
  const message = String(payload.message ?? '').trim().slice(0, MAX_MESSAGE);

  // Server-side validation
  if (!name || !email || !message) {
    return json({ error: 'Name, email and message are required' }, 400);
  }
  if (!EMAIL_RE.test(email)) {
    return json({ error: 'Invalid email address' }, 400);
  }

  // Guard: env vars must exist before we attempt any external call
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('[contact] Missing SUPABASE_URL or SUPABASE_SERVICE_KEY');
    return json({ error: 'Server configuration error — please contact the site owner' }, 500);
  }

  // ── 1. Insert into Supabase ──────────────────────────────────────────────
  let dbRes;
  try {
    dbRes = await fetch(`${supabaseUrl}/rest/v1/contact_messages`, {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'apikey':        supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Prefer':        'return=minimal',
      },
      body: JSON.stringify({ name, email, subject: subject || null, message }),
    });
  } catch (err) {
    console.error('[contact] Supabase network error:', err.message);
    return json({ error: 'Database unavailable — please try again shortly' }, 502);
  }

  if (!dbRes.ok) {
    const errText = await dbRes.text().catch(() => '');
    console.error('[contact] Supabase insert failed:', dbRes.status, errText);
    return json({ error: 'Failed to save your message — please try again' }, 500);
  }

  // ── 2. Email notification via Google Apps Script (AWAITED — must finish
  //       before the Lambda response is sent, or Netlify freezes the
  //       execution context and kills this request mid-flight) ─────────────
  const gasUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  if (gasUrl) {
    try {
      const gasRes = await fetch(gasUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });
      if (!gasRes.ok) {
        const errText = await gasRes.text().catch(() => '');
        console.error('[contact] GAS responded with error:', gasRes.status, errText);
      }
    } catch (err) {
      console.error('[contact] GAS email notification failed (non-fatal):', err.message);
    }
  } else {
    console.warn('[contact] GOOGLE_APPS_SCRIPT_URL not set — email notification skipped');
  }

  // ── Success ──────────────────────────────────────────────────────────────
  return json({ success: true, message: 'Message received — Radha will be in touch soon!' });
};
