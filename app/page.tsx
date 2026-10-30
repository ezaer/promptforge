"use client";
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

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

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui', maxWidth: '600px', margin: '0 auto', direction: 'rtl' }}>
      <h1>PromptForge</h1>
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
    </main>
  );
}
