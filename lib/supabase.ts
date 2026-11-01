import { createClient } from '@supabase/supabase-js';

// تم وضع الروابط مباشرة لتجاوز مشكلة البناء المسبق في Vercel
const supabaseUrl = 'https://gkcqthxmtfvasupxeyfg.supabase.co';
const supabaseAnonKey = 'sb_publishable_9_cc06hfh1HbnFrNH-B__A_QeQ5x1eZ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});
