'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  CheckCircle,
  MessageSquare,
  ArrowRight,
  Share2,
  Building2,
  Sparkles,
  Bot,
  Zap,
} from 'lucide-react';
import { IJob, getWhatsAppJobApplyLink } from '@/lib/jobHelpers';

export default function JobDetailsPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();

  const [job, setJob] = useState<IJob | null>(null);
  const [relatedJobs, setRelatedJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;
    const fetchJob = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/jobs/${slug}`);
        const data = await res.json();
        if (data.success) {
          setJob(data.job);
          setRelatedJobs(data.relatedJobs || []);
        } else {
          setError(data.message || 'الوظيفة غير موجودة');
        }
      } catch (err: any) {
        setError(err.message || 'فشل تحميل بيانات الوظيفة');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-slate-500 font-bold">جاري تحميل تفاصيل الوظيفة...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 text-center">
        <div className="max-w-md bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <Briefcase className="w-12 h-12 text-slate-400 mx-auto" />
          <h2 className="text-xl font-black text-slate-900 dark:text-white">عذراً، الوظيفة غير متاحة</h2>
          <p className="text-xs text-slate-500">{error || 'قد يكون تم إغلاق باب التقديم أو تم حذف الإعلان.'}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة لكافة الوظائف</span>
          </Link>
        </div>
      </div>
    );
  }

  const applyLink = getWhatsAppJobApplyLink(job.whatsappContact, {
    code: job.code,
    title: job.title,
    company: job.company,
    city: job.city,
  });

  const salaryDisplay = job.hideSalary
    ? 'راتب تنافسي يحدد بالمقابلة'
    : job.salaryMin && job.salaryMax
    ? `${job.salaryMin.toLocaleString('ar-EG')} - ${job.salaryMax.toLocaleString('ar-EG')} ${job.currency}`
    : job.salaryMin
    ? `يبدأ من ${job.salaryMin.toLocaleString('ar-EG')} ${job.currency}`
    : 'راتب مجزي';

  const shareText = encodeURIComponent(`فرصة عمل: ${job.title} في ${job.company} (${job.city})\nقدم الآن عبر الرابط:\n${typeof window !== 'undefined' ? window.location.href : ''}`);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">
            <ArrowRight className="w-4 h-4" />
            <span>العودة لجميع الوظائف</span>
          </Link>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/?text=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-500 hover:border-emerald-500 transition-colors"
              title="مشاركة عبر الواتساب"
            >
              <Share2 className="w-4 h-4" />
            </a>

            <a
              href={applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>تقديم بالواتساب</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Details Column (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Header Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600/10 to-indigo-600/10 border border-blue-500/20 flex items-center justify-center text-3xl shadow-inner">
                    {job.companyLogo || '💼'}
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-snug">
                      {job.title}
                    </h1>
                    <p className="text-sm font-bold text-slate-600 dark:text-slate-300 mt-1">
                      {job.company}
                    </p>
                  </div>
                </div>

                <span className="text-xs font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-xl">
                  #{job.code}
                </span>
              </div>

              {/* Meta Pills */}
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  {job.city} {job.district ? `(${job.district})` : ''}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300">
                  <Briefcase className="w-4 h-4 text-indigo-500" />
                  {job.type}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 font-bold">
                  {job.category}
                </span>
                {job.urgent && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 font-bold border border-rose-200 dark:border-rose-800">
                    <Zap className="w-3.5 h-3.5" />
                    توظيف عاجل
                  </span>
                )}
                {job.source === 'whatsapp_bot' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-200 dark:border-emerald-800">
                    <Bot className="w-3.5 h-3.5" />
                    منشور عبر بوت واتساب
                  </span>
                )}
              </div>
            </div>

            {/* Description & Overview */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>وصف الوظيفة والمهام المطلوبة</span>
              </h2>
              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {job.description}
              </div>
            </div>

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h2 className="text-base font-black text-slate-900 dark:text-white">
                  المؤهلات والشروط
                </h2>
                <div className="space-y-2.5">
                  {job.requirements.map((req, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h2 className="text-base font-black text-slate-900 dark:text-white">
                  المزايا والحوافز
                </h2>
                <div className="space-y-2.5">
                  {job.benefits.map((ben, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>{ben}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Sidebar Action Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6 sticky top-24">
            
            {/* Quick Apply Card */}
            <div className="bg-gradient-to-b from-blue-950/20 to-white dark:to-slate-900 rounded-3xl p-6 border border-blue-500/30 shadow-lg space-y-6">
              
              <div>
                <span className="text-[11px] font-bold text-slate-400 block mb-1">الراتب المتوقع</span>
                <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                  {salaryDisplay}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">الخبرة المطلوبة:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{job.experienceLevel}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">نظام العمل:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{job.type}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">طريقة التقديم:</span>
                  <span className="font-bold text-emerald-600">واتساب مباشر</span>
                </div>
              </div>

              {/* Apply Button */}
              <a
                href={applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-black text-sm shadow-xl shadow-emerald-600/25 transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                <span>قدم سيرتك الذاتية عبر الواتساب</span>
              </a>

              <p className="text-[11px] text-center text-slate-400 leading-relaxed">
                ستفتح لك محادثة واتساب رسمية ومجهزة مسبقاً بكود الوحدة لتسليم الـ CV مباشرة.
              </p>

            </div>

            {/* Related Jobs */}
            {relatedJobs.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <h3 className="text-xs font-black text-slate-900 dark:text-white">وظائف مشابهة قد تهمك:</h3>
                <div className="space-y-2">
                  {relatedJobs.map((rj) => (
                    <Link
                      key={rj.code}
                      href={`/jobs/${rj.slug}`}
                      className="block p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-slate-100 dark:border-slate-800 transition-colors"
                    >
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{rj.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">{rj.company} • {rj.city}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-8 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} منصة شغل. جميع الحقوق محفوظة.</p>
        <p className="pt-3 border-t border-slate-200/60 dark:border-slate-900 mt-3">
          <span>تم التصميم والإنشاء بواسطة </span>
          <a
            href="https://ebnywep.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 font-bold underline underline-offset-4"
          >
            EbnyWep
          </a>
        </p>
      </footer>

    </div>
  );
}
