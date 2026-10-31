import Link from 'next/link';

export default function RefundPage() {
  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', direction: 'rtl', lineHeight: '1.8', color: '#CBD5E1' }}>
      <Link href="/" style={{ color: '#60A5FA', textDecoration: 'none' }}>← العودة للرئيسية</Link>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', marginTop: '20px' }}>سياسة الاسترداد</h1>
      <p style={{ color: '#94A3B8', marginBottom: '30px' }}>آخر تحديث: نوفمبر 2026</p>

      <h2 style={{ color: 'white', marginTop: '30px' }}>1. طبيعة المنتج الرقمي</h2>
      <p>نظراً لأن PromptForge هو منتج رقمي يعتمد على استهلاك موارد الذكاء الاصطناعي (تكلفة لكل تحليل)، فإننا لا نقدم استرداداً كاملاً بعد استهلاك الخدمة.</p>

      <h2 style={{ color: 'white', marginTop: '30px' }}>2. ضمان استرداد الأموال</h2>
      <p>نقدم ضمان استرداد كامل خلال <strong>7 أيام</strong> من تاريخ الاشتراك الأول، بشرط ألا تكون قد استهلكت أكثر من تحليلين. يمكنك التواصل معنا لطلب الاسترداد.</p>

      <h2 style={{ color: 'white', marginTop: '30px' }}>3. إلغاء الاشتراك</h2>
      <p>يمكنك إلغاء اشتراكك الشهري في أي وقت من لوحة تحكم Lemon Squeezy. لن يتم تجديد الاشتراك، وستحتفظ بالوصول حتى نهاية الشهر المدفوع.</p>
    </main>
  );
}
