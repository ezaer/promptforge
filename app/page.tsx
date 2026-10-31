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
  const router = useRouter();

  useEffect(() => {
    // فحص الجلسة الحالية
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    // الاستماع لأي تغيير في حالة الدخول
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAnalyze = async () => {
    setLoading(true);
    setResult('');
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data.prompt);
    } catch (e: any) {
      setResult('حدث خطأ: ' + e.message);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (authLoading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>جاري التحميل...</div>;

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui', maxWidth: '600px', margin: '0 auto', direction: 'rtl' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>PromptForge</h1>
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '12px', color: '#666' }}>{user.email}</span>
            <button onClick={handleLogout} style={{ padding: '6px 12px', backgroundColor: '#ff4d4f', color: 'white', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>تسجيل خروج</button>
          </div>
        ) : (
          <Link href="/login" style={{ padding: '8px 16px', backgroundColor: '#333', color: 'white', borderRadius: '8px', textDecoration: 'none' }}>تسجيل الدخول</Link>
        )}
      </nav>
      
      {user ? (
        <>
          <p>أدخل رابط فيديو يوتيوب لتحليله وتوليد برومبت إنتاج:</p>
          <input 
            type="text" 
            value={url} 
            onChange={(e) => setUrl(e.target.value)} 
            placeholder="https://www.youtube.com/watch?v=..." 
            style={{ width: '100%', padding: '12px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '8px' }}
          />
          <button 
            onClick={handleAnalyze} 
            disabled={loading || !url} 
            style={{ width: '100%', padding: '12px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' }}
          >
            {loading ? 'جاري التحليل بالذكاء الاصطناعي...' : 'تحليل الفيديو'}
          </button>
          
          {result && (
            <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #eaeaea', borderRadius: '8px', backgroundColor: '#fafafa' }}>
              <h3>البرومبت الجاهز (قابل للنسخ):</h3>
              <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{result}</pre>
            </div>
          )}
        </>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '50px', padding: '20px', border: '1px dashed #ccc', borderRadius: '8px' }}>
          <h2>مرحباً بك في PromptForge</h2>
          <p>يجب عليك تسجيل الدخول أولاً لتتمكن من تحليل الفيديوهات.</p>
          <Link href="/login" style={{ display: 'inline-block', marginTop: '10px', padding: '12px 24px', backgroundColor: '#0070f3', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>تسجيل الدخول الآن</Link>
        </div>
      )}
    </main>
  );
}
