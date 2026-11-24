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
  Leaf,
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
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#131916] text-[#222B26] dark:text-[#E4EBE7] font-sans selection:bg-[#3A604D] selection:text-white">
      
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 dark:bg-[#131916]/90 backdrop-blur-md border-b border-stone-200/80 dark:border-[#26332C] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#3A604D] via-[#4A725D] to-[#608B74] flex items-center justify-center text-white shadow-sm shadow-[#3A604D]/20 group-hover:scale-105 transition-transform">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-stone-900 dark:text-[#E4EBE7]">شُغل</span>
                <span className="text-[10px] font-bold text-[#2E5E44] dark:text-[#82C3A3] bg-[#EEF5F1] dark:bg-[#1A2820] px-2.5 py-0.5 rounded-full border border-[#D0E2D6] dark:border-[#2C4234]">
                  وظائف وتوظيف فوري
                </span>
              </div>
              <p className="text-[11px] text-stone-400 font-medium">Shoghl Jobs & Hiring</p>
            </div>
          </Link>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <a
              href={botLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#EEF5F1] dark:bg-[#1A2820] hover:bg-[#E2EEE6] dark:hover:bg-[#22352B] text-[#2E5E44] dark:text-[#82C3A3] border border-[#CCE0D5] dark:border-[#2E4738] text-xs font-bold transition-all shadow-xs"
            >
              <Bot className="w-4 h-4 text-[#2E7D59] dark:text-[#82C3A3]" />
              <span>نشر وظيفة عبر بوت واتساب 🤖</span>
            </a>

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#3A604D] hover:bg-[#47735D] active:scale-95 text-white text-xs font-black shadow-md shadow-[#3A604D]/20 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>أضف وظيفة الآن</span>
            </button>

            <ThemeToggle />
          </div>

        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-[#EBF2ED]/50 via-[#FAF8F5] to-[#FAF8F5] dark:from-[#1A2520]/50 dark:via-[#131916] dark:to-[#131916] border-b border-stone-200/80 dark:border-[#26332C]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF5F1] dark:bg-[#1C2C23] text-[#2E5E44] dark:text-[#82C3A3] text-xs font-bold border border-[#CCE0D5] dark:border-[#2E4738] mb-6 shadow-xs">
            <Leaf className="w-4 h-4 text-[#3A604D] dark:text-[#82C3A3]" />
            <span>منصة توظيف هادئة ومباشرة مربوطة بالواتساب</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-stone-900 dark:text-[#E8EFEA] tracking-tight leading-tight md:leading-snug mb-6">
            ابحث عن فرصتك القادمة، أو عيّن كفاءات لمشروعك <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2D4A3B] via-[#3A604D] to-[#608B74] dark:from-[#82C3A3] dark:via-[#A9D7BF] dark:to-[#E4EBE7]">
              بكل هدوء وسلاسة عبر الواتساب فوراً
            </span>
          </h1>

          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            تصفح أحدث الوظائف الشاغرة في السويس والقاهرة والإسكندرية والعمل عن بعد. تواصل مباشرة مع مسؤولي التوظيف والشركات دون وسيط أو نماذج معقدة بأجواء مريحة للعين.
          </p>

          {/* Quick Value Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-stone-600 dark:text-stone-300 mb-12 font-semibold">
            <div className="flex items-center gap-2 bg-white dark:bg-[#1B231F] px-4 py-2 rounded-2xl border border-stone-200 dark:border-[#2C3831] shadow-xs">
              <CheckCircle className="w-4 h-4 text-[#2E7D59] dark:text-[#82C3A3]" />
              <span>تقديم فوري بالواتساب</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-[#1B231F] px-4 py-2 rounded-2xl border border-stone-200 dark:border-[#2C3831] shadow-xs">
              <Zap className="w-4 h-4 text-[#C5A880]" />
              <span>وظائف محدثة يومياً</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-[#1B231F] px-4 py-2 rounded-2xl border border-stone-200 dark:border-[#2C3831] shadow-xs">
              <Bot className="w-4 h-4 text-[#3A604D] dark:text-[#82C3A3]" />
              <span>بوت نشر آلي ذكي</span>
            </div>
          </div>

          {/* Search & Filter Card */}
          <div className="bg-white dark:bg-[#1B231F] rounded-3xl p-4 sm:p-6 border border-stone-200/90 dark:border-[#2C3831] shadow-sm max-w-4xl mx-auto text-start">
            <form onSubmit={handleSearchSubmit} className="space-y-4">
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 text-stone-400 absolute right-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="ابحث بمسمى الوظيفة (كاشير، محاسب، مبيعات، مبرمج...) أو اسم الشركة"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full pr-12 pl-4 py-3.5 rounded-2xl border border-stone-200 dark:border-[#2C3831] bg-[#FAF8F5] dark:bg-[#131916] text-stone-900 dark:text-white placeholder:text-stone-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#3A604D]/50"
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-2xl bg-[#3A604D] hover:bg-[#47735D] active:scale-95 text-white font-black text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>بحث</span>
                </button>
              </div>

              {/* Filter Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-stone-500 mb-1">المدينة</label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-[#2C3831] bg-[#FAF8F5] dark:bg-[#131916] text-stone-800 dark:text-stone-200 font-medium focus:outline-none focus:ring-2 focus:ring-[#3A604D]/50"
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
                  <label className="block text-[11px] font-bold text-stone-500 mb-1">المجال / التصنيف</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-[#2C3831] bg-[#FAF8F5] dark:bg-[#131916] text-stone-800 dark:text-stone-200 font-medium focus:outline-none focus:ring-2 focus:ring-[#3A604D]/50"
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
                  <label className="block text-[11px] font-bold text-stone-500 mb-1">نوع الدوام</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-[#2C3831] bg-[#FAF8F5] dark:bg-[#131916] text-stone-800 dark:text-stone-200 font-medium focus:outline-none focus:ring-2 focus:ring-[#3A604D]/50"
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
            <h2 className="text-2xl font-black text-stone-900 dark:text-[#E4EBE7]">
              الوظائف الشاغرة المتاحة حالياً
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              {loading ? 'جاري تحميل الوظائف...' : `عرض ${jobs.length} فرصة متوافقة مع اختياراتك`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D59] animate-pulse"></span>
            <span className="text-xs font-bold text-[#2E7D59] dark:text-[#82C3A3]">
              فرص توظيف مفتوحة ومباشرة
            </span>
          </div>
        </div>

        {/* Loading / Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-72 rounded-3xl bg-stone-200/60 dark:bg-[#1B231F] animate-pulse"></div>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-[#1B231F] rounded-3xl border border-stone-200 dark:border-[#2C3831]">
            <Briefcase className="w-12 h-12 text-stone-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-stone-900 dark:text-white">لا توجد وظائف مطابقة لبحثك</h3>
            <p className="text-xs text-stone-500 mt-1 mb-6">جرّب تغيير فلاتر المدينة أو التصنيف، أو أضف وظيفة جديدة بنفسك.</p>
            <button
              onClick={() => {
                setSelectedCity('all');
                setSelectedCategory('all');
                setSelectedType('all');
                setKeyword('');
              }}
              className="px-6 py-2.5 rounded-2xl bg-[#EEF5F1] text-[#2E5E44] font-bold text-xs"
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

      {/* WhatsApp Bot Feature Banner - Calm Tea Garden / Deep Forest Aesthetic */}
      <section className="py-16 bg-gradient-to-br from-[#1B2B22] via-[#16231C] to-[#121B16] border-t border-b border-[#2E4537] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#283F32] text-[#8FD4B1] text-xs font-bold border border-[#3A5A48]">
                <Bot className="w-4 h-4" />
                <span>أتمتة ذكية بالكامل</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#F4F9F6]">
                هل أنت صاحب عمل؟ انشر وظيفتك فوراً برسالة واتساب واحدة!
              </h2>
              <p className="text-xs sm:text-sm text-[#C4D9CD] leading-relaxed">
                لا داعي لملء استمارات أو فتح لابتوب! أرسل رسالة نصية عادية بالوظيفة والراتب لرقم البوت، وسيقوم النظام الذكي بتنظيمها ونشرها على الموقع وإرسال الرابط لك في ثوانٍ.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="bg-[#1D2E24]/80 border border-[#2E4738] p-3 rounded-2xl">
                  <span className="font-bold text-[#8FD4B1] block mb-1">1. أرسل الرسالة</span>
                  <span className="text-[#A5BEB1] text-[11px]">مطلوب كاشير في السويس براتب 5000</span>
                </div>
                <div className="bg-[#1D2E24]/80 border border-[#2E4738] p-3 rounded-2xl">
                  <span className="font-bold text-[#8FD4B1] block mb-1">2. استخراج تلقائي</span>
                  <span className="text-[#A5BEB1] text-[11px]">البوت يفرز البيانات ويطلب تأكيدك</span>
                </div>
                <div className="bg-[#1D2E24]/80 border border-[#2E4738] p-3 rounded-2xl">
                  <span className="font-bold text-[#8FD4B1] block mb-1">3. نشر فوري</span>
                  <span className="text-[#A5BEB1] text-[11px]">رابط مباشر يبدأ استقبال المتقدمين</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 flex justify-center md:justify-end">
              <a
                href={botLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-5 rounded-2xl bg-[#2E7D59] hover:bg-[#378F67] text-white font-black text-sm shadow-lg shadow-[#2E7D59]/30 transition-all flex items-center gap-3 active:scale-95"
              >
                <MessageSquare className="w-6 h-6" />
                <span>تحدث مع بوت الوظائف 🤖</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#F5F2EB]/60 dark:bg-[#0F1411] border-t border-stone-200/80 dark:border-[#26332C] py-12 text-stone-600 dark:text-stone-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-stone-200 dark:border-[#26332C] pb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#3A604D] text-white flex items-center justify-center font-black">
                <Briefcase className="w-4 h-4" />
              </div>
              <span className="font-black text-stone-900 dark:text-[#E4EBE7] text-base">منصة شُغل للتوظيف</span>
            </div>
            <p className="text-stone-500 text-center sm:text-end text-[11px]">
              السويس • القاهرة • الإسكندرية • الجيزة • وظائف عن بُعد
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
            <p>© {new Date().getFullYear()} منصة شغل. جميع الحقوق محفوظة.</p>
            <p>منصة سحابية متخصصة في التوظيف السريع والربط المباشر مع أصحاب الأعمال.</p>
          </div>

          {/* Requested Dedicated Branding Line */}
          <div className="pt-4 border-t border-stone-200/80 dark:border-[#26332C] text-center text-xs text-stone-500 dark:text-stone-400">
            <span>تم التصميم والإنشاء بواسطة </span>
            <a
              href="https://ebnywep.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3A604D] dark:text-[#82C3A3] hover:underline font-bold underline-offset-4 transition-colors"
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
