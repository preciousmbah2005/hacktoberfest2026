-- Learn2Earn Supabase PostgreSQL Initial Migration
-- Supports Auth, Profiles, Career Pathways, Courses, Progress, Rewards, and Mobile Data Redemptions

-- 1. Profiles Table (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    target_pathway TEXT,
    streak_days INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow individual read" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Allow individual update" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- 2. Wallets Table (Learning Points and Data Redemptions)
CREATE TABLE IF NOT EXISTS public.wallets (
    student_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    points_balance INT NOT NULL DEFAULT 500,
    total_earned INT NOT NULL DEFAULT 500,
    total_redeemed INT NOT NULL DEFAULT 0,
    mobile_data_mb_redeemed INT NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow wallet read" ON public.wallets
    FOR SELECT USING (auth.uid() = student_id);

-- 3. Reward Packages (Available Mobile Data Offers)
CREATE TABLE IF NOT EXISTS public.reward_packages (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    provider TEXT NOT NULL,
    data_amount TEXT NOT NULL,
    points_cost INT NOT NULL,
    duration_days INT DEFAULT 30,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default telecom packages
INSERT INTO public.reward_packages (id, name, provider, data_amount, points_cost, duration_days, description)
VALUES 
    ('pkg_mtn_500mb', 'MTN Pulse 500MB Data', 'MTN', '500MB', 250, 14, 'Quick 500MB data bundle for learning and research.'),
    ('pkg_airtel_1gb', 'Airtel Smart 1GB Bundle', 'Airtel', '1GB', 450, 30, 'High-speed 1GB bundle for video lessons and tutorials.'),
    ('pkg_safaricom_2gb', 'Safaricom Tunukiwa 2GB', 'Safaricom', '2GB', 800, 30, 'Heavy 2GB bundle for full course modules and projects.'),
    ('pkg_glo_1_5gb', 'Glo Berekete 1.5GB Data', 'Glo', '1.5GB', 600, 30, 'Reliable 1.5GB bundle for studying on the go.'),
    ('pkg_vodafone_3gb', 'Vodafone Red 3GB Super Pack', 'Vodafone', '3GB', 1100, 30, 'Premium 3GB data pack for hackathons and coding practice.')
ON CONFLICT (id) DO NOTHING;

-- 4. Reward Transactions
CREATE TABLE IF NOT EXISTS public.reward_transactions (
    id TEXT PRIMARY KEY,
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('earned', 'redeemed')),
    description TEXT NOT NULL,
    points INT NOT NULL,
    status TEXT NOT NULL DEFAULT 'completed',
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.reward_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow transactions read" ON public.reward_transactions
    FOR SELECT USING (auth.uid() = student_id);

-- 5. Courses & Learning Modules
CREATE TABLE IF NOT EXISTS public.courses (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    total_modules INT DEFAULT 1,
    points_reward INT DEFAULT 100,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Student Course Enrollments & Progress
CREATE TABLE IF NOT EXISTS public.student_courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    course_id TEXT REFERENCES public.courses(id) ON DELETE CASCADE,
    progress_percentage INT DEFAULT 0,
    modules_completed INT DEFAULT 0,
    is_completed BOOLEAN DEFAULT FALSE,
    points_earned INT DEFAULT 0,
    last_accessed TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (student_id, course_id)
);

ALTER TABLE public.student_courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow student_courses read" ON public.student_courses
    FOR SELECT USING (auth.uid() = student_id);

-- 7. Career Orientation Assessments
CREATE TABLE IF NOT EXISTS public.career_assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    answers JSONB NOT NULL,
    recommendations JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. AI Chat Logs
CREATE TABLE IF NOT EXISTS public.ai_chat_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    course_id TEXT,
    user_message TEXT NOT NULL,
    assistant_response TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
