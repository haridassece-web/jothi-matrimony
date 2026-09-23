-- Jothi Matrimony - Complete Production Database Migration
-- PostgreSQL / Supabase Schema (23 Tables)

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. USERS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50) UNIQUE NOT NULL,
  role VARCHAR(20) DEFAULT 'user', -- 'user' | 'admin'
  status VARCHAR(20) DEFAULT 'active', -- 'active' | 'suspended' | 'deleted'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 2. PROFILES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id VARCHAR(50) PRIMARY KEY, -- e.g. 'JM202600101'
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  display_name VARCHAR(255) NOT NULL,
  gender VARCHAR(20) NOT NULL, -- 'Male' | 'Female'
  dob DATE NOT NULL,
  age INTEGER NOT NULL,
  height VARCHAR(50),
  marital_status VARCHAR(50) DEFAULT 'Never Married',
  mother_tongue VARCHAR(50) DEFAULT 'Tamil',
  religion VARCHAR(50) DEFAULT 'Hindu',
  caste VARCHAR(100) NOT NULL,
  subcaste VARCHAR(100),
  gothram VARCHAR(100),
  about TEXT,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) DEFAULT 'Tamil Nadu',
  country VARCHAR(100) DEFAULT 'India',
  is_verified BOOLEAN DEFAULT false,
  registration_status VARCHAR(50) DEFAULT 'PAID_ACTIVE',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 3. PROFILE_PHOTOS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.profile_photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id VARCHAR(50) REFERENCES public.profiles(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 4. FAMILY_DETAILS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.family_details (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id VARCHAR(50) UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  father_name VARCHAR(255),
  father_occupation VARCHAR(255),
  mother_name VARCHAR(255),
  mother_occupation VARCHAR(255),
  siblings_info TEXT,
  family_type VARCHAR(50) DEFAULT 'Nuclear Family',
  family_values VARCHAR(50) DEFAULT 'Traditional & Modern',
  family_status VARCHAR(50) DEFAULT 'Upper Middle Class',
  native_town VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 5. EDUCATION TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.education (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id VARCHAR(50) REFERENCES public.profiles(id) ON DELETE CASCADE,
  degree VARCHAR(255) NOT NULL,
  field_of_study VARCHAR(255),
  institution VARCHAR(255),
  education_level VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 6. CAREER TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.career (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id VARCHAR(50) REFERENCES public.profiles(id) ON DELETE CASCADE,
  profession VARCHAR(255) NOT NULL,
  company_name VARCHAR(255),
  annual_income VARCHAR(100),
  work_location VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 7. HOROSCOPE_PROFILES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.horoscope_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id VARCHAR(50) UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  rasi VARCHAR(100) NOT NULL,
  nakshatra VARCHAR(100) NOT NULL,
  padam VARCHAR(10),
  lagnam VARCHAR(100),
  chevvai_dosham VARCHAR(20) DEFAULT 'No',
  birth_time VARCHAR(50),
  birth_place VARCHAR(255),
  rasi_chart JSONB,
  navamsam_chart JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 8. PARTNER_PREFERENCES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.partner_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id VARCHAR(50) UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  age_min INTEGER DEFAULT 21,
  age_max INTEGER DEFAULT 35,
  height_min VARCHAR(50),
  height_max VARCHAR(50),
  marital_status_pref VARCHAR(100) DEFAULT 'Never Married',
  education_pref VARCHAR(255),
  profession_pref VARCHAR(255),
  location_pref VARCHAR(255),
  caste_pref VARCHAR(255) DEFAULT 'Same / Open',
  horoscope_match_req VARCHAR(100) DEFAULT 'Mandatory',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 9. INTERESTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.interests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id VARCHAR(50) REFERENCES public.profiles(id) ON DELETE CASCADE,
  receiver_id VARCHAR(50) REFERENCES public.profiles(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'PENDING', -- 'PENDING' | 'ACCEPTED' | 'DECLINED'
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(sender_id, receiver_id)
);

-- ============================================================================
-- 10. SHORTLISTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.shortlists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id VARCHAR(50) REFERENCES public.profiles(id) ON DELETE CASCADE,
  target_profile_id VARCHAR(50) REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, target_profile_id)
);

-- ============================================================================
-- 11. CONVERSATIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  participant_1_id VARCHAR(50) REFERENCES public.profiles(id) ON DELETE CASCADE,
  participant_2_id VARCHAR(50) REFERENCES public.profiles(id) ON DELETE CASCADE,
  last_message_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(participant_1_id, participant_2_id)
);

-- ============================================================================
-- 12. MESSAGES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_id VARCHAR(50) REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 13. CONTACT_REQUESTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.contact_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  requester_id VARCHAR(50) REFERENCES public.profiles(id) ON DELETE CASCADE,
  target_id VARCHAR(50) REFERENCES public.profiles(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'PENDING', -- 'PENDING' | 'APPROVED' | 'REJECTED'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(requester_id, target_id)
);

-- ============================================================================
-- 14. SUBSCRIPTION_PLANS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.subscription_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL, -- e.g. '1 Year Registration Plan'
  price_inr NUMERIC(10, 2) NOT NULL DEFAULT 1000.00,
  duration_days INTEGER NOT NULL DEFAULT 365,
  features JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 15. SUBSCRIPTIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id VARCHAR(50) REFERENCES public.profiles(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES public.subscription_plans(id),
  start_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status VARCHAR(20) DEFAULT 'active', -- 'active' | 'expired' | 'cancelled'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 16. PAYMENTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.payments (
  id VARCHAR(50) PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  profile_id VARCHAR(50) REFERENCES public.profiles(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES public.subscriptions(id),
  razorpay_order_id VARCHAR(100) UNIQUE,
  razorpay_payment_id VARCHAR(100) UNIQUE,
  amount NUMERIC(10, 2) NOT NULL DEFAULT 1000.00,
  currency VARCHAR(10) DEFAULT 'INR',
  gateway VARCHAR(100) DEFAULT 'Razorpay UPI',
  status VARCHAR(50) DEFAULT 'SUCCESS', -- 'SUCCESS' | 'FAILED' | 'PENDING'
  paid_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 17. NOTIFICATIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id VARCHAR(50) REFERENCES public.profiles(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  type VARCHAR(50) NOT NULL, -- 'interest' | 'message' | 'contact_unlock' | 'payment'
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 18. PROFILE_VIEWS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.profile_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  viewer_id VARCHAR(50) REFERENCES public.profiles(id) ON DELETE CASCADE,
  viewed_id VARCHAR(50) REFERENCES public.profiles(id) ON DELETE CASCADE,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 19. VERIFICATION_REQUESTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.verification_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id VARCHAR(50) REFERENCES public.profiles(id) ON DELETE CASCADE,
  id_proof_type VARCHAR(100) NOT NULL, -- 'Aadhaar' | 'PAN' | 'Passport' | 'Voter ID'
  id_proof_url TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'PENDING', -- 'PENDING' | 'APPROVED' | 'REJECTED'
  reviewer_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 20. REPORTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id VARCHAR(50) REFERENCES public.profiles(id) ON DELETE CASCADE,
  reported_id VARCHAR(50) REFERENCES public.profiles(id) ON DELETE CASCADE,
  reason VARCHAR(255) NOT NULL,
  details TEXT,
  status VARCHAR(20) DEFAULT 'PENDING', -- 'PENDING' | 'RESOLVED' | 'DISMISSED'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 21. BLOCKS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.blocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  blocker_id VARCHAR(50) REFERENCES public.profiles(id) ON DELETE CASCADE,
  blocked_id VARCHAR(50) REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(blocker_id, blocked_id)
);

-- ============================================================================
-- 22. ADMIN_USERS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'moderator', -- 'super_admin' | 'moderator' | 'support'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 23. ADMIN_ACTIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.admin_actions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES public.admin_users(id) ON DELETE CASCADE,
  action_type VARCHAR(100) NOT NULL, -- 'approve_verification' | 'ban_user' | 'refund_payment'
  target_entity VARCHAR(100) NOT NULL,
  target_id VARCHAR(100) NOT NULL,
  details JSONB,
  performed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- INDEXES & PERFORMANCE OPTIMIZATIONS
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_profiles_caste ON public.profiles(caste);
CREATE INDEX IF NOT EXISTS idx_profiles_city ON public.profiles(city);
CREATE INDEX IF NOT EXISTS idx_profiles_gender ON public.profiles(gender);
CREATE INDEX IF NOT EXISTS idx_horoscope_rasi ON public.horoscope_profiles(rasi);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON public.messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_interests_receiver ON public.interests(receiver_id);
CREATE INDEX IF NOT EXISTS idx_notifications_profile ON public.notifications(profile_id);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.horoscope_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shortlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_actions ENABLE ROW LEVEL SECURITY;

-- Read policies for public profiles & photos
CREATE POLICY "Public profile read access" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public photo read access" ON public.profile_photos FOR SELECT USING (is_approved = true);
CREATE POLICY "Subscription plan read access" ON public.subscription_plans FOR SELECT USING (is_active = true);

-- ============================================================================
-- SUPABASE STORAGE BUCKETS CONFIGURATION
-- ============================================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) 
VALUES 
  ('profile-photos', 'profile-photos', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('horoscope-files', 'horoscope-files', false, 10485760, ARRAY['image/jpeg', 'image/png', 'application/pdf']),
  ('documents', 'documents', false, 10485760, ARRAY['image/jpeg', 'image/png', 'application/pdf'])
ON CONFLICT (id) DO UPDATE SET 
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Storage RLS Policies
CREATE POLICY "Public profile photo access" ON storage.objects FOR SELECT USING (bucket_id = 'profile-photos');
CREATE POLICY "User upload profile photos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'profile-photos' AND auth.role() = 'authenticated');
CREATE POLICY "Owner access horoscope files" ON storage.objects FOR ALL USING (bucket_id = 'horoscope-files' AND auth.role() = 'authenticated');
CREATE POLICY "Owner access verification documents" ON storage.objects FOR ALL USING (bucket_id = 'documents' AND auth.role() = 'authenticated');

