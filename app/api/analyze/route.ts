import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY; 
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
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

    const prompt = data.candidates[0].content.parts[0].text;
    return NextResponse.json({ prompt });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
