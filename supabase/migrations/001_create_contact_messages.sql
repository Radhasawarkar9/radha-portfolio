-- ═══════════════════════════════════════════════════════════════════════════
-- Migration 001 — contact_messages
-- Run this ONCE in: Supabase Dashboard → SQL Editor → New query → Run
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.contact_messages (
  id         UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT         NOT NULL    CHECK (char_length(name)    BETWEEN 1 AND 100),
  email      TEXT         NOT NULL    CHECK (char_length(email)   <= 320),
  subject    TEXT                     CHECK (char_length(subject) <= 200),
  message    TEXT         NOT NULL    CHECK (char_length(message) BETWEEN 1 AND 2000),
  created_at TIMESTAMPTZ NOT NULL     DEFAULT now()
);

COMMENT ON TABLE  public.contact_messages            IS 'Portfolio contact form submissions';
COMMENT ON COLUMN public.contact_messages.name       IS 'Sender full name';
COMMENT ON COLUMN public.contact_messages.email      IS 'Sender email address';
COMMENT ON COLUMN public.contact_messages.subject    IS 'Optional message subject';
COMMENT ON COLUMN public.contact_messages.message    IS 'Message body (max 2 000 chars)';
COMMENT ON COLUMN public.contact_messages.created_at IS 'UTC submission timestamp';

-- Newest-first index for dashboard queries
CREATE INDEX IF NOT EXISTS contact_messages_created_at_idx
  ON public.contact_messages (created_at DESC);

-- ── Row Level Security ───────────────────────────────────────────────────────
-- Enabled so the anon/public key cannot touch this table at all.
-- The Netlify function uses the service_role key which bypasses RLS,
-- so no INSERT policy is required — the function is the only writer.
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- (No public policies — intentional. Service role only.)

-- ── Quick verify ─────────────────────────────────────────────────────────────
-- SELECT id, name, email, subject, created_at
-- FROM   public.contact_messages
-- ORDER  BY created_at DESC
-- LIMIT  10;
