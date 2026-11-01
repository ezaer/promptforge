export const dynamic = 'force-dynamic';

"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [limitReached, setLimitReached] = useState(false);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleAnalyze = async () => {
    setLoading(true);
    setResult('');
    setLimitReached(false);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('يجب تسجيل الدخول أولاً');

      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + session.access_token
        },
        body: JSON.stringify({ url })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        if (res.status === 403) {
          setLimitReached(true);
          throw new Error(data.error);
        }
        throw new Error(data.error || 'حدث خطأ ما');
      }
      
      setResult(data.prompt);
    } catch (e: any) {
      if (!e.message.includes('استنفدت')) {
        setResult('حدث خطأ: ' + e.message);
      }
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    alert('تم نسخ البرومبت بنجاح!');
  };

  if (authLoading) return <div style={{ textAlign: 'center', marginTop: '20vh', fontSize: '20px', color: '#3B82F6' }}>جاري التحميل...</div>;

  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      {/* قائمة علوية متجاوبة */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', padding: '15px', backgroundColor: '#1E293B', borderRadius: '16px', border: '1px solid #334155', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '35px', height: '35px', backgroundColor: '#3B82F6', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px' }}>⚡</div>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '800', background: 'linear-gradient(to right, #60A5FA, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>PromptForge</h1>
        </div>
        
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <Link href="/pricing" style={{ padding: '6px 12px', backgroundColor: '#3B82F6', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '12px' }}>💎 الأسعار</Link>
            <span style={{ fontSize: '12px', color: '#94A3B8', display: 'none', sm: { display: 'inline' } } as any}>{user.email}</span>
            <button onClick={handleLogout} style={{ padding: '6px 12px', backgroundColor: 'transparent', color: '#EF4444', border: '1px solid #EF4444', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}>خروج</button>
          </div>
        ) : (
          <Link href="/login" style={{ padding: '8px 16px', backgroundColor: '#3B82F6', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>تسجيل الدخول</Link>
        )}
      </nav>

      {user ? (
        <div style={{ backgroundColor: '#1E293B', padding: '30px 20px', borderRadius: '24px', border: '1px solid #334155', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '10px', fontSize: '24px' }}>حلل الفيديو، واصنع محتوى أفضل</h2>
          <p style={{ textAlign: 'center', color: '#94A3B8', marginBottom: '30px', fontSize: '14px' }}>ضع رابط فيديو يوتيوب، وسيقوم الذكاء الاصطناعي باستخراج البنية وكتابة برومبت إنتاج جديد لك.</p>
          
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <input 
              type="text" 
              value={url} 
              onChange={(e) => setUrl(e.target.value)} 
              placeholder="https://www.youtube.com/watch?v=..." 
              style={{ width: '100%', padding: '14px 16px', backgroundColor: '#0F172A', border: '2px solid #334155', borderRadius: '12px', color: '#F8FAFC', fontSize: '14px', outline: 'none' }}
            />
          </div>
          
          <button 
            onClick={handleAnalyze} 
            disabled={loading || !url} 
            style={{ width: '100%', padding: '14px', background: loading ? '#334155' : 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: loading ? 'none' : '0 10px 20px -10px #3B82F6' }}
          >
            {loading ? '⏳ جاري التحليل...' : '✨ تحليل الفيديو وتوليد البرومبت'}
          </button>

          <div style={{ textAlign: 'center', marginTop: '15px' }}>
            <Link href="/pricing" style={{ color: '#60A5FA', fontSize: '13px', textDecoration: 'underline' }}>تحتاج المزيد من التحليلات؟ عرض الخطط والأسعار</Link>
          </div>

          {limitReached && (
            <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#7F1D1D', borderRadius: '12px', border: '1px solid #EF4444', textAlign: 'center' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#FCA5A5', fontSize: '16px' }}>لقد استنفدت تحليلك المجاني</h3>
              <p style={{ color: '#FECACA', fontSize: '13px', marginBottom: '15px' }}>للحصول على تحليلات إضافية، يرجى ترقية حسابك.</p>
              <Link href="/pricing" style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: '#EF4444', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>ترقية الحساب الآن</Link>
            </div>
          )}

          {result && (
            <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#0F172A', borderRadius: '16px', border: '1px solid #3B82F6' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3 style={{ margin: 0, color: '#60A5FA', fontSize: '16px' }}>البرومبت الجاهز:</h3>
                <button onClick={copyToClipboard} style={{ padding: '6px 12px', backgroundColor: '#1E293B', color: '#F8FAFC', border: '1px solid #475569', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}>📋 نسخ</button>
              </div>
              <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', lineHeight: '1.6', color: '#E2E8F0', margin: 0, fontSize: '13px' }}>{result}</pre>
            </div>
          )}
        </div>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '50px', padding: '40px 20px', backgroundColor: '#1E293B', borderRadius: '24px', border: '1px solid #334155' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '15px' }}>مرحباً بك في PromptForge</h2>
          <p style={{ color: '#94A3B8', marginBottom: '30px', fontSize: '14px' }}>يجب عليك تسجيل الدخول أولاً لتتمكن من استخدام أداة التحليل.</p>
          <Link href="/login" style={{ display: 'inline-block', padding: '14px 28px', background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)', color: 'white', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px' }}>تسجيل الدخول الآن</Link>
        </div>
      )}
    </main>
  );
}
