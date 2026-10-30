export const metadata = {
  title: 'PromptForge',
  description: 'AI Video Production Prompt Generator',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
