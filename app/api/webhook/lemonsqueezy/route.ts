import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    
    // التحقق من أن الحدث هو اشتراك جديد أو تجديد
    if (payload.meta.event_name === 'order_created' || payload.meta.event_name === 'subscription_created') {
      
      // استخراج معرف المستخدم من البيانات المخصصة (سنقوم بإرسالها من صفحة الأسعار)
      const userId = payload.meta.custom_data?.user_id;
      
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
