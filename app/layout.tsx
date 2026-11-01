export const dynamic = 'force-dynamic';

import './globals.css';

export const metadata = {
  title: 'PromptForge | AI Production Prompts',
  description: 'Generate original video production prompts from YouTube links.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;800&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0, fontFamily: "'Cairo', sans-serif", backgroundColor: '#0B1120', color: '#F8FAFC', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        
        <div style={{ flex: 1 }}>
          {children}
        </div>

        <footer style={{ marginTop: 'auto', padding: '20px', textAlign: 'center', borderTop: '1px solid #1E293B', backgroundColor: '#0B1120' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', fontSize: '14px' }}>
            <a href="/terms" style={{ color: '#94A3B8', textDecoration: 'none' }}>شروط الخدمة</a>
            <a href="/privacy" style={{ color: '#94A3B8', textDecoration: 'none' }}>سياسة الخصوصية</a>
            <a href="/refund" style={{ color: '#94A3B8', textDecoration: 'none' }}>سياسة الاسترداد</a>
          </div>
          <p style={{ color: '#475569', fontSize: '12px', marginTop: '15px' }}>© 2026 PromptForge. جميع الحقوق محفوظة.</p>
        </footer>

      </body>
    </html>
  );
}
