import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;
    const authHeader = req.headers.get('Authorization');

    if (!authHeader) {
      return NextResponse.json({ error: 'يجب تسجيل الدخول أولاً' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    
    // التحقق من هوية المستخدم
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
      { global: { headers: { Authorization: `Bearer ${token}` } } }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'جلسة غير صالحة. يرجى إعادة تسجيل الدخول.' }, { status: 401 });
    }

    // استخدام المفتاح السري لإدارة العداد
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    );

    // فحص العداد
    let { data: usage } = await supabaseAdmin.from('user_usage').select('*').eq('id', user.id).single();
    
    if (!usage) {
      // مستخدم جديد، ننشئ له سجلاً
      await supabaseAdmin.from('user_usage').insert({ id: user.id, analysis_count: 0 });
      usage = { analysis_count: 0 };
    }

    if (usage.analysis_count >= 1) {
      return NextResponse.json({ error: 'لقد استنفدت تحليلك المجاني. يرجى الترقية للاستمرار.' }, { status: 403 });
    }

    // استدعاء Gemini
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: "أنت خبير إنتاج فيديو. حلل هذا الفيديو واكتب لي برومبت إنتاج كامل لفيديو جديد أصلي مستوحى من بنيته (لا تنسخه). وضح التغييرات الجوهرية (الشخصية، المكان، الأسلوب). اكتب النتيجة باللغة العربية." },
            { file_data: { file_uri: url } }
          ]
        }]
      })
    });

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message || "فشل التحليل");
    }

    // زيادة العداد بعد نجاح التحليل
    await supabaseAdmin.from('user_usage').update({ analysis_count: usage.analysis_count + 1 }).eq('id', user.id);

    const prompt = data.candidates[0].content.parts[0].text;
    return NextResponse.json({ prompt });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
