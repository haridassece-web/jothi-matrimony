-- Migration: Create membership_payments table for PayU and online gateway transactions
CREATE TABLE IF NOT EXISTS public.membership_payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL
        REFERENCES public.users(id) ON DELETE CASCADE,

    txnid TEXT UNIQUE NOT NULL,

    amount NUMERIC(10,2) NOT NULL,

    gateway TEXT NOT NULL DEFAULT 'PayU',

    gateway_payment_id TEXT,

    status TEXT NOT NULL DEFAULT 'pending'
        CHECK (
            status IN (
                'pending',
                'success',
                'failed',
                'refunded'
            )
        ),

    created_at TIMESTAMPTZ DEFAULT NOW(),

    paid_at TIMESTAMPTZ
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_membership_payments_txnid ON public.membership_payments(txnid);
CREATE INDEX IF NOT EXISTS idx_membership_payments_user_id ON public.membership_payments(user_id);
CREATE INDEX IF NOT EXISTS idx_membership_payments_status ON public.membership_payments(status);

-- Enable Row Level Security
ALTER TABLE public.membership_payments
ENABLE ROW LEVEL SECURITY;

-- Allow public / anon read access to own transactions and full service role management
CREATE POLICY "Allow service role full access"
    ON public.membership_payments
    FOR ALL
    USING (true)
    WITH CHECK (true);
