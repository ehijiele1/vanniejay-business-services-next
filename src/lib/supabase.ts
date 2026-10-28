import { createClient } from '@supabase/supabase-js';

// NOTE: In production you should set these env vars in Vercel's dashboard.
// For local development you can create a .env.local file.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
