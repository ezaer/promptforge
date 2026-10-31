export const dynamic = 'force-dynamic';
"use client";
import { supabase } from '@/lib/supabase';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div style={{ maxWidth: '420px', margin: '10vh auto', padding: '20px' }}>
      <Link href="/" style={{ color: '#94A3B8', textDecoration: 'none', display: 'block', marginBottom: '20px', fontSize: '14px' }}>← العودة للرئيسية</Link>
      <div style={{ backgroundColor: '#1E293B', padding: '40px', borderRadius: '24px', border: '1px solid #334155', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '24px' }}>تسجيل الدخول إلى <span style={{ color: '#60A5FA' }}>PromptForge</span></h2>
        <Auth
          supabaseClient={supabase}
          appearance={{ 
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#3B82F6',
                  brandAccent: '#8B5CF6',
                  inputBackground: '#0F172A',
                  inputText: '#F8FAFC',
                  inputBorder: '#334155',
                  inputBorderFocus: '#3B82F6',
                  inputBorderHover: '#475569',
                  messageText: '#F8FAFC',
                  anchorTextColor: '#60A5FA',
                },
                radii: { borderRadiusButton: '10px', inputBorderRadius: '10px' }
              }
            }
          }}
          theme="dark"
          providers={['google']}
          localization={{
            variables: {
              sign_in: { email_label: 'البريد الإلكتروني', password_label: 'كلمة المرور', button_label: 'تسجيل الدخول' },
              sign_up: { email_label: 'البريد الإلكتروني', password_label: 'كلمة المرور', button_label: 'إنشاء حساب جديد' }
            }
          }}
        />
      </div>
    </div>
  );
}
