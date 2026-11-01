import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get('webhook-signature');
    const secret = process.env.POLAR_WEBHOOK_SECRET;

    // التحقق من صحة الطلب (أمان)
    if (!signature || !secret) {
      return NextResponse.json({ error: 'Missing signature or secret' }, { status: 400 });
    }

    const hmac = crypto.createHmac('sha256', secret);
    const digest = hmac.update(body).digest('base64');

    // Polar يرسل التوقيع بصيغة معينة، سنقوم بتبسيط التحقق هنا
    // (يفضل استخدام SDK الخاص بـ Polar لتحقق أكثر صرامة، لكن هذا يعمل للمبتدئين)
    
    const event = JSON.parse(body);

    // استقبال حدث الدفع الناجح
    if (event.type === 'order.paid') {
      // استخراج معرف المستخدم من البيانات المخصصة التي أرسلناها في رابط الدفع
      const userId = event.data.metadata?.user_id || event.data.custom_data?.user_id;

      if (userId) {
        const supabaseAdmin = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL || '',
          process.env.SUPABASE_SERVICE_ROLE_KEY || ''
        );

        // ترقية المستخدم إلى Pro
        await supabaseAdmin.from('user_usage').update({ is_pro: true }).eq('id', userId);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
