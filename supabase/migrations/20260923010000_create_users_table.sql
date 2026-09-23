-- Migration: Create public.users table with mobile, full_name, email, gender, date_of_birth
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mobile VARCHAR(15) UNIQUE NOT NULL,
  full_name VARCHAR(150),
  email VARCHAR(150),
  gender VARCHAR(20),
  date_of_birth DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_mobile ON public.users(mobile);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
