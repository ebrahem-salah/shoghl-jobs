// Client-safe job utility functions

export interface IJob {
  _id?: string;
  code: string;
  title: string;
  slug: string;
  company: string;
  companyLogo?: string;
  category: string;
  city: string;
  district?: string;
  type: string; // دوام كامل, دوام جزئي, عن بعد, تدريب, عمل حر
  experienceLevel: string; // حديث تخرج, متوسط, خبير
  salaryMin?: number;
  salaryMax?: number;
  currency: string;
  hideSalary?: boolean;
  description: string;
  requirements: string[];
  benefits: string[];
  whatsappContact: string;
  emailContact?: string;
  source: 'web' | 'whatsapp_bot';
  status: 'active' | 'closed' | 'pending';
  viewsCount: number;
  applicationsCount: number;
  featured?: boolean;
  urgent?: boolean;
  createdAt?: string;
}

// Generate prefilled WhatsApp job application link
export function getWhatsAppJobApplyLink(
  whatsappPhone: string,
  job: {
    code: string;
    title: string;
    company: string;
    city: string;
  }
): string {
  const cleanPhone = whatsappPhone.replace(/[^0-9]/g, '');
  const text = encodeURIComponent(
    `*طلب تقديم على وظيفة* 💼\n` +
    `*كود الوظيفة:* #${job.code}\n` +
    `*المسمى الوظيفي:* ${job.title}\n` +
    `*الشركة / جهة العمل:* ${job.company}\n` +
    `*الموقع:* ${job.city}\n\n` +
    `مرحباً، أود التقديم على هذه الوظيفة المعلنة على منصة شغل (Shoghl). مرفق نبذة عن خبراتي ومستعد لإرسال السيرة الذاتية.`
  );

  return `https://wa.me/${cleanPhone}?text=${text}`;
}

// Generate WhatsApp bot submission link
export function getWhatsAppBotSubmitLink(botPhone: string = '201096986091'): string {
  const cleanPhone = botPhone.replace(/[^0-9]/g, '');
  const text = encodeURIComponent(
    `مرحباً بوت منصة شغل 🤖\nأود نشر إعلان وظيفة جديدة على الموقع تلقائياً.`
  );
  return `https://wa.me/${cleanPhone}?text=${text}`;
}
