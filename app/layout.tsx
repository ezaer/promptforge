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
      <body style={{ margin: 0, padding: 0, fontFamily: "'Cairo', sans-serif", backgroundColor: '#0B1120', color: '#F8FAFC', minHeight: '100vh' }}>
        {children}
      </body>
    </html>
  );
}
