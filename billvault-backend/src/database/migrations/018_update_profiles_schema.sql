-- =====================================================
-- 018_update_profiles_schema.sql
-- Purpose:
--   Improve the profiles table for production readiness.
--
-- Changes:
--   - Email becomes optional (OTP users may not have one)
--   - Add gender field
--   - Add onboarding_completed flag
--   - Improve data types
--   - Restrict provider values
-- =====================================================

BEGIN;

--------------------------------------------------------
-- 1. Email should be optional
--------------------------------------------------------
ALTER TABLE profiles
ALTER COLUMN email DROP NOT NULL;

--------------------------------------------------------
-- 2. Improve provider column
--------------------------------------------------------
ALTER TABLE profiles
ALTER COLUMN provider TYPE VARCHAR(20);

ALTER TABLE profiles
ADD CONSTRAINT profiles_provider_check
CHECK (
    provider IN ('google', 'phone', 'email')
);

--------------------------------------------------------
-- 3. Improve country
--------------------------------------------------------
ALTER TABLE profiles
ALTER COLUMN country TYPE CHAR(2);

--------------------------------------------------------
-- 4. Improve currency
--------------------------------------------------------
ALTER TABLE profiles
ALTER COLUMN currency TYPE CHAR(3);

--------------------------------------------------------
-- 5. Improve language
--------------------------------------------------------
ALTER TABLE profiles
ALTER COLUMN language TYPE VARCHAR(10);

--------------------------------------------------------
-- 6. Improve timezone
--------------------------------------------------------
ALTER TABLE profiles
ALTER COLUMN timezone TYPE VARCHAR(100);

--------------------------------------------------------
-- 7. Add gender
--------------------------------------------------------
ALTER TABLE profiles
ADD COLUMN gender VARCHAR(20);

ALTER TABLE profiles
ADD CONSTRAINT profiles_gender_check
CHECK (
    gender IN (
        'male',
        'female',
        'other',
        'prefer_not_to_say'
    )
);

--------------------------------------------------------
-- 8. Add onboarding flag
--------------------------------------------------------
ALTER TABLE profiles
ADD COLUMN onboarding_completed BOOLEAN
DEFAULT FALSE
NOT NULL;

COMMIT;