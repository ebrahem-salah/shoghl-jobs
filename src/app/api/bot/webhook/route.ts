import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Job from '@/models/Job';

// Helper to intelligently parse raw job announcement text into structured fields
function parseJobAnnouncement(text: string, senderPhone?: string) {
  let title = 'وظيفة شاغرة';
  let company = 'جهة عمل معتمدة';
  let city = 'القاهرة';
  let salaryMin = 0;
  let salaryMax = 0;
  let type = 'دوام كامل';
  let category = 'وظائف عامة وخدمات';
  let whatsappContact = senderPhone || '201096986091';

  // 1. Extract phone number
  const phoneMatch = text.match(/(01[0125][0-9]{8})/);
  if (phoneMatch) {
    whatsappContact = '20' + phoneMatch[1].slice(1);
  }

  // 2. Extract city
  const egyptianCities = ['السويس', 'القاهرة', 'الجيزة', 'الإسكندرية', 'الإسماعيلية', 'بورسعيد', 'المنصورة', 'طنطا', 'أسيوط', 'الشرقية', 'الزقازيق', 'عن بعد'];
  for (const c of egyptianCities) {
    if (text.includes(c)) {
      city = c;
      break;
    }
  }

  // 3. Extract Job Title (look for "مطلوب ...")
  const titleMatch = text.match(/مطلوب\s+([\u0600-\u06FF\s]{3,35})(?:\s+في|\s+بمرتب|\s+براتب|\s+دوام|\s+خبرة|\s+للعمل|$)/i);
  if (titleMatch) {
    title = titleMatch[1].trim();
  }

  // 4. Extract Category
  if (/مبرمج|مطور|برمجة|ويب|سوفت|تطبيق|nextjs|react|python/i.test(text)) {
    category = 'برمجة وتكنولوجيا المعلومات';
  } else if (/محاسب|حسابات|ضرائب|مالي/i.test(text)) {
    category = 'محاسبة ومالية';
  } else if (/مبيعات|تسويق|سوشيال|ماركتينج|كول سنتر|خدمة عملاء/i.test(text)) {
    category = 'مبيعات وتسويق';
  } else if (/شيف|كاشير|صالة|مطعم|باريستا|ويتر|مطبخ/i.test(text)) {
    category = 'مطاعم وضيافة';
  } else if (/صيدلي|طبيب|تمريض|دكتور|عيادة|معمل/i.test(text)) {
    category = 'طب ورعاية صحية';
  } else if (/عقار|عقارات|فيلات|وسيط/i.test(text)) {
    category = 'عقارات واستثمار';
  } else if (/مصمم|جرافيك|فيديو|مونتير/i.test(text)) {
    category = 'تصميم وفنون رقمية';
  }

  // 5. Extract Salary
  const salaryMatch = text.match(/(?:مرتب|راتب|بمرتب|براتب)\s*(?:من)?\s*(\d{3,6})(?:\s*(?:إلى|الي|-)\s*(\d{3,6}))?/i);
  if (salaryMatch) {
    salaryMin = parseInt(salaryMatch[1], 10);
    salaryMax = salaryMatch[2] ? parseInt(salaryMatch[2], 10) : salaryMin;
  }

  // 6. Extract Type
  if (/عن بعد|أونلاين|ريموت/i.test(text)) {
    type = 'عن بُعد / Remote';
  } else if (/جزئي|بارت تايم/i.test(text)) {
    type = 'دوام جزئي';
  } else if (/حر|فريلانسر/i.test(text)) {
    type = 'عمل حر';
  }

  return {
    title,
    company,
    city,
    category,
    salaryMin,
    salaryMax,
    type,
    whatsappContact,
    description: text,
  };
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    const rawText = body.text || body.message || body.body || '';
    const sender = body.sender || body.from || '';

    if (!rawText || rawText.trim().length < 10) {
      return NextResponse.json(
        {
          success: false,
          message: 'نص الإعلان قصير جداً. يرجى إرسال تفاصيل الوظيفة متضمنة المسمى والمدينة ورقم التواصل.',
        },
        { status: 400 }
      );
    }

    const parsed = parseJobAnnouncement(rawText, sender);
    const code = `BOT-${Math.floor(1000 + Math.random() * 9000)}`;
    const baseSlug = (parsed.title + '-' + parsed.city)
      .toLowerCase()
      .replace(/[^a-z0-9\u0600-\u06FF]+/g, '-')
      .replace(/^-+|-+$/g, '');
    const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const newJob = await Job.create({
      code,
      title: parsed.title,
      slug,
      company: parsed.company,
      companyLogo: '🤖',
      category: parsed.category,
      city: parsed.city,
      type: parsed.type,
      experienceLevel: 'متوسط',
      salaryMin: parsed.salaryMin,
      salaryMax: parsed.salaryMax,
      currency: 'ج.م',
      hideSalary: parsed.salaryMin === 0,
      description: parsed.description,
      requirements: ['تم استيراد تفاصيل الوظيفة وتأكيدها عبر بوت واتساب إبني ويب.'],
      benefits: ['تقديم وتواصل فوري عبر الواتساب بنقرة واحدة.'],
      whatsappContact: parsed.whatsappContact,
      source: 'whatsapp_bot',
      status: 'active',
      featured: false,
      urgent: true,
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://jobs.ebnywep.com';
    const jobUrl = `${appUrl}/jobs/${slug}`;

    const replyMessage =
      `🎉 *تم نشر وظيفتك بنجاح على منصة شغل!* 🚀\n\n` +
      `📋 *كود الوظيفة:* #${code}\n` +
      `💼 *المسمى:* ${parsed.title}\n` +
      `📍 *المدينة:* ${parsed.city}\n` +
      `🏷️ *التصنيف:* ${parsed.category}\n` +
      (parsed.salaryMin > 0 ? `💰 *الراتب:* ${parsed.salaryMin.toLocaleString('ar-EG')} ج.م\n` : '') +
      `\n🔗 *رابط إعلانك المباشر للمشاركة:* \n${jobUrl}\n\n` +
      `سيتواصل معك المتقدمون عبر الواتساب مباشرة. بالتوفيق! ✨`;

    return NextResponse.json({
      success: true,
      message: 'Job parsed and published successfully via WhatsApp Bot',
      jobCode: code,
      jobUrl,
      replyMessage,
      job: newJob,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'فشل معالجة رسالة البوت' },
      { status: 500 }
    );
  }
}
