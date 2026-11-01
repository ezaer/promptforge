"use client";  
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

// رابط الدفع الخاص بك من Polar
const POLAR_CHECKOUT_URL = "https://buy.polar.sh/polar_cl_r3yyvLxm8Yf55sfUBe4ocnI8cb6ugahaa9wL50dChQ7";

export default function PricingPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
  }, []);

  const handleSubscribe = () => {
    if (!user) {
      alert('يرجى تسجيل الدخول أولاً للاشتراك');
      window.location.href = '/login';
      return;
    }
    
    // إضافة بريد المستخدم ومعرّفه إلى رابط الدفع
    const url = new URL(POLAR_CHECKOUT_URL);
    url.searchParams.append('checkout[email]', user.email);
    url.searchParams.append('checkout[custom][user_id]', user.id);
    url.searchParams.append('allow_discount_codes', 'true');
    window.location.href = url.toString();
  };

  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px', direction: 'rtl' }}>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <Link href="/" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '14px', display: 'inline-block', marginBottom: '20px' }}>← العودة للرئيسية</Link>
        <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '10px' }}>اختر الخطة المناسبة لك</h1>
        <p style={{ color: '#94A3B8', fontSize: '18px' }}>ابدأ مجاناً، وارتقِ عندما تحتاج إلى المزيد.</p>
      </div>

      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {/* الخطة المجانية */}
        <div style={{ flex: '1 1 300px', backgroundColor: '#1E293B', padding: '40px', borderRadius: '24px', border: '1px solid #334155', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>المجانية</h2>
          <p style={{ color: '#94A3B8', marginBottom: '20px' }}>للتجربة والاستكشاف</p>
          <div style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '20px' }}>$0<span style={{ fontSize: '16px', color: '#94A3B8', fontWeight: 'normal' }}>/شهر</span></div>
          
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 30px 0', lineHeight: '2', color: '#CBD5E1' }}>
            <li>✅ تحليل فيديو واحد شهرياً</li>
            <li>✅ توليد برومبت إنتاج كامل</li>
            <li>❌ بدون أولوية في المعالجة</li>
          </ul>
          
          <Link href="/" style={{ marginTop: 'auto', display: 'block', textAlign: 'center', padding: '14px', backgroundColor: '#334155', color: 'white', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>ابدأ الآن</Link>
        </div>

        {/* الخطة الاحترافية */}
        <div style={{ flex: '1 1 300px', backgroundColor: '#0F172A', padding: '40px', borderRadius: '24px', border: '2px solid #3B82F6', position: 'relative', display: 'flex', flexDirection: 'column', boxShadow: '0 0 30px rgba(59, 130, 246, 0.2)' }}>
          <div style={{ position: 'absolute', top: '-15px', right: '50%', transform: 'translateX(50%)', backgroundColor: '#3B82F6', color: 'white', padding: '5px 15px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>الأكثر شيوعاً</div>
          
          <h2 style={{ fontSize: '24px', marginBottom: '10px', color: '#60A5FA' }}>الاحترافية</h2>
          <p style={{ color: '#94A3B8', marginBottom: '20px' }}>لصناع المحتوى الجادين</p>
          <div style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '20px', background: 'linear-gradient(to right, #60A5FA, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>$19<span style={{ fontSize: '16px', color: '#94A3B8', fontWeight: 'normal' }}>/شهر</span></div>
          
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 30px 0', lineHeight: '2', color: '#CBD5E1' }}>
            <li>✅ 30 تحليل فيديو شهرياً</li>
            <li>✅ توليد برومبت إنتاج كامل</li>
            <li>✅ حفظ سجل التحليلات</li>
            <li>✅ دعم فني ذو أولوية</li>
          </ul>
          
          <button onClick={handleSubscribe} style={{ marginTop: 'auto', display: 'block', width: '100%', padding: '14px', background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>اشترك الآن</button>
        </div>
      </div>
    </main>
  );
}
