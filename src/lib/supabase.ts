import { createClient } from '@supabase/supabase-js';

// NOTE: In production you should set these env vars in Vercel's dashboard.
// For local development you can create a .env.local file.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://example.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'public-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
