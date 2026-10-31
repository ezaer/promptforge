import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', direction: 'rtl', lineHeight: '1.8', color: '#CBD5E1' }}>
      <Link href="/" style={{ color: '#60A5FA', textDecoration: 'none' }}>← العودة للرئيسية</Link>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', marginTop: '20px' }}>سياسة الخصوصية</h1>
      <p style={{ color: '#94A3B8', marginBottom: '30px' }}>آخر تحديث: نوفمبر 2026</p>

      <h2 style={{ color: 'white', marginTop: '30px' }}>1. البيانات التي نجمعها</h2>
      <p>نحن نجمع فقط الحد الأدنى من البيانات: بريدك الإلكتروني (لتسجيل الدخول وإدارة حسابك)، ومعرف المستخدم (لحفظ رصيد تحليلاتك).</p>

      <h2 style={{ color: 'white', marginTop: '30px' }}>2. الفيديوهات والملفات</h2>
      <p><strong>نحن لا نخزن الفيديوهات الأصلية نهائياً.</strong> نحن نستخدم واجهات برمجية رسمية (مثل Gemini API) لتحليل الفيديو، ولا نقوم بتنزيله أو تخزينه على خوادمنا.</p>

      <h2 style={{ color: 'white', marginTop: '30px' }}>3. مشاركة البيانات</h2>
      <p>نحن لا نبيع بياناتك لأي طرف ثالث. نستخدم خدمات موثوقة لتشغيل المنصة (Supabase للاستضافة وقاعدة البيانات، Google لتحليل الفيديو، Lemon Squeezy للدفع).</p>

      <h2 style={{ color: 'white', marginTop: '30px' }}>4. حقوقك (GDPR)</h2>
      <p>لديك الحق في طلب نسخة من بياناتك، أو طلب حذف حسابك وبياناتك بالكامل. يمكنك القيام بذلك عبر التواصل معنا أو من إعدادات الحساب.</p>
    </main>
  );
}
