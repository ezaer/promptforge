"use client";
import { supabase } from '@/lib/supabase';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function LoginPage() {
  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', direction: 'rtl' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>تسجيل الدخول إلى PromptForge</h2>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
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
  );
}
