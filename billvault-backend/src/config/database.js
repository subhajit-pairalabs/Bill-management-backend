const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY; // using service role for backend admin tasks if needed, or anon key. Wait, they said SUPABASE_SECRET_KEY.

if (!supabaseUrl) {
    throw new Error("Missing required environment variable: SUPABASE_URL");
}
if (!supabaseKey) {
    throw new Error("Missing required environment variable: SUPABASE_SECRET_KEY");
}
if (!process.env.SUPABASE_PUBLISHABLE_KEY) {
    throw new Error("Missing required environment variable: SUPABASE_PUBLISHABLE_KEY");
}
if (!process.env.SUPABASE_JWKS_URL) {
    throw new Error("Missing required environment variable: SUPABASE_JWKS_URL");
}

const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

module.exports = { supabase };