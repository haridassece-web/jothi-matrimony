-- Jothi Matrimony OTP + users tables
-- Run this in Supabase SQL Editor.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.otp_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mobile VARCHAR(15) NOT NULL,
  otp_hash TEXT NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0,
  verified BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  verified_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS otp_verifications_mobile_created_idx
  ON public.otp_verifications (mobile, created_at DESC);

CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mobile VARCHAR(15) NOT NULL UNIQUE,
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(255),
  gender VARCHAR(20) NOT NULL,
  date_of_birth DATE NOT NULL,
  city VARCHAR(100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Backend uses a server-only Supabase key.
-- Keep these tables inaccessible to the browser unless you intentionally add
-- authenticated RLS policies later.
ALTER TABLE public.otp_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Service role full access policies
DROP POLICY IF EXISTS "Service role full access on users" ON public.users;
CREATE POLICY "Service role full access on users" ON public.users FOR ALL USING (true);

DROP POLICY IF EXISTS "Service role full access on otp_verifications" ON public.otp_verifications;
CREATE POLICY "Service role full access on otp_verifications" ON public.otp_verifications FOR ALL USING (true);

-- Cleanup function; run periodically from a scheduled job if desired.
CREATE OR REPLACE FUNCTION public.delete_expired_otps()
RETURNS VOID
LANGUAGE SQL
SECURITY DEFINER
AS $$
  DELETE FROM public.otp_verifications
  WHERE expires_at < NOW() - INTERVAL '1 day';
$$;
