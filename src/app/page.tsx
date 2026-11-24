'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Search,
  MapPin,
  Bot,
  PlusCircle,
  Sparkles,
  Zap,
  CheckCircle,
  MessageSquare,
  Building2,
  TrendingUp,
  Layers,
  ArrowRight,
} from 'lucide-react';
import JobCard from '@/components/JobCard';
import PostJobModal from '@/components/PostJobModal';
import ThemeToggle from '@/components/ThemeToggle';
import { IJob, getWhatsAppBotSubmitLink } from '@/lib/jobHelpers';

export default function HomePage() {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filters state
  const [keyword, setKeyword] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const botLink = getWhatsAppBotSubmitLink('201096986091');

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (keyword) params.append('keyword', keyword);
      if (selectedCity !== 'all') params.append('city', selectedCity);
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      if (selectedType !== 'all') params.append('type', selectedType);

      const res = await fetch(`/api/jobs?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setJobs(data.jobs);
      }
    } catch (err) {
      console.error('Failed to fetch jobs', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [selectedCity, selectedCategory, selectedType]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-600/30 group-hover:scale-105 transition-transform">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">شُغل</span>
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
                  وظائف وتوظيف فوري
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Shoghl Jobs & Fast Hiring</p>
            </div>
          </Link>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <a
              href={botLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-xs font-bold transition-all shadow-xs"
            >
              <Bot className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>نشر وظيفة عبر بوت واتساب 🤖</span>
            </a>

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-95 text-white text-xs font-black shadow-lg shadow-blue-600/25 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>أضف وظيفة الآن</span>
            </button>

            <ThemeToggle />
          </div>

        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-blue-950/10 via-slate-50 to-slate-50 dark:from-blue-950/20 dark:via-slate-950 dark:to-slate-950 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-500/20 mb-6 shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>منصة التوظيف السريع الأولى المربوطة بالواتساب</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight md:leading-snug mb-6">
            ابحث عن وظيفتك القادمة، أو عيّن كفاءات لمشروعك <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-sky-400">
              في دقائق وتواصل بالواتساب فوراً
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            تصفح أحدث الوظائف الشاغرة في السويس والقاهرة والإسكندرية والعمل عن بعد. تواصل مباشرة مع مسؤولي التوظيف والشركات دون وسيط أو نماذج معقدة.
          </p>

          {/* Quick Value Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-slate-500 dark:text-slate-400 mb-12 font-semibold">
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>تقديم فوري بالواتساب</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>وظائف محدثة يومياً</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <Bot className="w-4 h-4 text-blue-500" />
              <span>بوت نشر آلي ذكي</span>
            </div>
          </div>

          {/* Search & Filter Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xl max-w-4xl mx-auto text-start">
            <form onSubmit={handleSearchSubmit} className="space-y-4">
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="ابحث بمسمى الوظيفة (كاشير، محاسب، مبيعات، مبرمج...) أو اسم الشركة"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full pr-12 pl-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-black text-xs sm:text-sm shadow-md shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>بحث</span>
                </button>
              </div>

              {/* Filter Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">المدينة</label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">كل المحافظات والمدن</option>
                    <option value="السويس">السويس</option>
                    <option value="القاهرة">القاهرة</option>
                    <option value="الجيزة">الجيزة</option>
                    <option value="الإسكندرية">الإسكندرية</option>
                    <option value="الإسماعيلية">الإسماعيلية</option>
                    <option value="بورسعيد">بورسعيد</option>
                    <option value="عن بُعد / Remote">عن بُعد / Remote</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">المجال / التصنيف</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">كل المجالات والتخصصات</option>
                    <option value="برمجة وتكنولوجيا المعلومات">برمجة وتكنولوجيا المعلومات</option>
                    <option value="محاسبة ومالية">محاسبة ومالية</option>
                    <option value="مبيعات وتسويق">مبيعات وتسويق</option>
                    <option value="مطاعم وضيافة">مطاعم وضيافة</option>
                    <option value="طب ورعاية صحية">طب ورعاية صحية</option>
                    <option value="تصميم وفنون رقمية">تصميم وفنون رقمية</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">نوع الدوام</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">كل أنواع الدوام</option>
                    <option value="دوام كامل">دوام كامل</option>
                    <option value="دوام جزئي">دوام جزئي</option>
                    <option value="عن بُعد / Remote">عن بُعد / Remote</option>
                    <option value="عمل حر">عمل حر</option>
                    <option value="تدريب">تدريب</option>
                  </select>
                </div>
              </div>

            </form>
          </div>

        </div>
      </section>

      {/* Jobs Grid Section */}
      <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              الوظائف الشاغرة المتاحة حالياً
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {loading ? 'جاري تحميل الوظائف...' : `عرض ${jobs.length} وظيفة متوافقة مع اختياراتك`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              فرص توظيف مفتوحة ومباشرة
            </span>
          </div>
        </div>

        {/* Loading / Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-72 rounded-3xl bg-slate-200/60 dark:bg-slate-800/50 animate-pulse"></div>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <Briefcase className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">لا توجد وظائف مطابقة لبحثك</h3>
            <p className="text-xs text-slate-500 mt-1 mb-6">جرّب تغيير فلاتر المدينة أو التصنيف، أو أضف وظيفة جديدة بنفسك.</p>
            <button
              onClick={() => {
                setSelectedCity('all');
                setSelectedCategory('all');
                setSelectedType('all');
                setKeyword('');
              }}
              className="px-6 py-2.5 rounded-2xl bg-blue-50 text-blue-600 font-bold text-xs"
            >
              إعادة ضبط الفلاتر
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.code} job={job} />
            ))}
          </div>
        )}

      </section>

      {/* WhatsApp Bot Feature Banner */}
      <section className="py-16 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border-t border-b border-emerald-500/20 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                <Bot className="w-4 h-4" />
                <span>أتمتة ذكية بالكامل</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black">
                هل أنت صاحب عمل؟ انشر وظيفتك فوراً برسالة واتساب واحدة!
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                لا داعي لملء استمارات أو فتح لابتوب! أرسل رسالة نصية عادية بالوظيفة والراتب لرقم البوت، وسيقوم الذكاء الاصطناعي بتنظيمها ونشرها على الموقع وإرسال الرابط لك في ثوانٍ.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-2xl">
                  <span className="font-bold text-emerald-400 block mb-1">1. أرسل الرسالة</span>
                  <span className="text-slate-400 text-[11px]">مطلوب كاشير في السويس براتب 5000</span>
                </div>
                <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-2xl">
                  <span className="font-bold text-emerald-400 block mb-1">2. استخراج تلقائي</span>
                  <span className="text-slate-400 text-[11px]">البوت يفرز البيانات ويطلب تأكيدك</span>
                </div>
                <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-2xl">
                  <span className="font-bold text-emerald-400 block mb-1">3. نشر فوري</span>
                  <span className="text-slate-400 text-[11px]">رابط مباشر يبدأ استقبال المتقدمين</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 flex justify-center md:justify-end">
              <a
                href={botLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/30 transition-all flex items-center gap-3 active:scale-95"
              >
                <MessageSquare className="w-6 h-6" />
                <span>تحدث مع بوت الوظائف 🤖</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-12 text-slate-600 dark:text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800/80 pb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black">
                <Briefcase className="w-4 h-4" />
              </div>
              <span className="font-black text-slate-900 dark:text-white text-base">منصة شُغل للتوظيف</span>
            </div>
            <p className="text-slate-500 text-center sm:text-end text-[11px]">
              السويس • القاهرة • الإسكندرية • الجيزة • وظائف عن بُعد
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>© {new Date().getFullYear()} منصة شغل. جميع الحقوق محفوظة.</p>
            <p>منصة سحابية متخصصة في التوظيف السريع والربط المباشر مع أصحاب الأعمال.</p>
          </div>

          {/* Requested Dedicated Branding Line */}
          <div className="pt-4 border-t border-slate-200/80 dark:border-slate-900 text-center text-xs text-slate-500 dark:text-slate-400">
            <span>تم التصميم والإنشاء بواسطة </span>
            <a
              href="https://ebnywep.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-500 font-bold underline underline-offset-4 transition-colors"
            >
              EbnyWep
            </a>
          </div>

        </div>
      </footer>

      {/* Post Job Modal */}
      <PostJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onJobAdded={fetchJobs}
      />

    </div>
  );
}
