/* eslint-disable */
/**
 * Google Apps Script — Portfolio Contact Form Email Notifier
 * ──────────────────────────────────────────────────────────
 * DEPLOY STEPS (one-time):
 *
 *   1. Open https://script.google.com → "New project"
 *   2. Rename the project → "Portfolio Email Notifier"
 *   3. Delete all code in Code.gs and paste this entire file
 *   4. Update RECIPIENT_EMAIL on the next line to your address
 *   5. Click Deploy → New deployment
 *        Type:            Web app
 *        Execute as:      Me
 *        Who has access:  Anyone
 *   6. Click Deploy → grant Gmail permissions when prompted
 *   7. Copy the "Web app URL" → this is GOOGLE_APPS_SCRIPT_URL
 *   8. Add it as an env var in Netlify dashboard and redeploy
 *
 * To update the script later: Deploy → Manage deployments → edit
 * the EXISTING deployment (a new one would change the URL).
 */

const RECIPIENT_EMAIL = 'sawarkarkhushi93@gmail.com'; // ← your email

// ─────────────────────────────────────────────────────────────────────────────

/** Called by the Netlify function via HTTP POST. */
function doPost(e) {
  try {
    const raw = e.postData?.contents;
    if (!raw) return _json({ error: 'Empty request body' });

    const { name, email, subject, message } = JSON.parse(raw);
    if (!name || !email || !message) {
      return _json({ error: 'Missing required fields: name, email, message' });
    }

    const subjectLine = subject
      ? `[Portfolio] ${subject} — from ${name}`
      : `[Portfolio] New message from ${name}`;

    const plainBody = [
      'New contact form submission from your portfolio:',
      '',
      `Name:    ${name}`,
      `Email:   ${email}`,
      `Subject: ${subject || '(not provided)'}`,
      '',
      'Message:',
      '─────────────────────────────────────',
      message,
      '─────────────────────────────────────',
      '',
      'Sent via Radha Sawarkar Portfolio',
      'https://portfolio-radha.netlify.app/',
    ].join('\n');

    const htmlBody = `
      <div style="font-family:Arial,sans-serif;max-width:580px;margin:0 auto;background:#f9f9f9;padding:32px;border-radius:8px">
        <div style="background:#050608;border-radius:6px;padding:20px 24px;margin-bottom:24px">
          <h2 style="color:#00d4aa;margin:0;font-size:18px;letter-spacing:0.04em">✉ New Portfolio Inquiry</h2>
        </div>
        <table style="width:100%;border-collapse:collapse;background:#fff;border-radius:6px;box-shadow:0 1px 4px rgba(0,0,0,.08)">
          <tr style="border-bottom:1px solid #eee">
            <td style="padding:12px 16px;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:.08em;width:80px">Name</td>
            <td style="padding:12px 16px;font-size:14px;color:#111;font-weight:600">${name}</td>
          </tr>
          <tr style="border-bottom:1px solid #eee">
            <td style="padding:12px 16px;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:.08em">Email</td>
            <td style="padding:12px 16px;font-size:14px">
              <a href="mailto:${email}" style="color:#00d4aa;text-decoration:none">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 16px;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:.08em">Subject</td>
            <td style="padding:12px 16px;font-size:14px;color:${subject ? '#111' : '#bbb'}">${subject || 'not provided'}</td>
          </tr>
        </table>
        <div style="margin-top:20px;background:#fff;border-radius:6px;padding:20px;box-shadow:0 1px 4px rgba(0,0,0,.08)">
          <p style="margin:0 0 10px;font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#888">Message</p>
          <div style="background:#f5f5f5;border-left:3px solid #00d4aa;padding:14px 16px;border-radius:4px;font-size:14px;line-height:1.7;color:#333;white-space:pre-wrap">${message}</div>
        </div>
        <p style="margin:20px 0 0;font-size:11px;color:#bbb;text-align:center">
          Sent via <a href="https://portfolio-radha.netlify.app/" style="color:#00d4aa;text-decoration:none">Radha Sawarkar Portfolio</a>
        </p>
      </div>`;

    GmailApp.sendEmail(RECIPIENT_EMAIL, subjectLine, plainBody, {
      htmlBody,
      replyTo: email,
      name:    'Portfolio Contact Form',
    });

    console.log(`[contact] Email sent — from: ${email}`);
    return _json({ success: true });

  } catch (err) {
    console.error('[contact] doPost error:', err.toString());
    return _json({ error: err.toString() });
  }
}

/** Health-check: open the web-app URL in a browser to confirm it's running. */
function doGet() {
  return _json({ status: 'ok', message: 'Portfolio Contact Notifier is running', recipient: RECIPIENT_EMAIL });
}

function _json(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
