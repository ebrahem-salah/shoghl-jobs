'use client';

import React, { useState } from 'react';
import { X, Briefcase, Building2, MapPin, DollarSign, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJobAdded: () => void;
}

export default function PostJobModal({ isOpen, onClose, onJobAdded }: PostJobModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    category: 'برمجة وتكنولوجيا المعلومات',
    city: 'السويس',
    district: '',
    type: 'دوام كامل',
    experienceLevel: 'متوسط',
    salaryMin: '',
    salaryMax: '',
    whatsappContact: '',
    description: '',
    urgent: false,
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          salaryMin: formData.salaryMin ? Number(formData.salaryMin) : 0,
          salaryMax: formData.salaryMax ? Number(formData.salaryMax) : 0,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'فشل إضافة الوظيفة');

      setSuccess(true);
      setTimeout(() => {
        onJobAdded();
        onClose();
        setSuccess(false);
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'حدث خطأ غير متوقع');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#FAF8F5] dark:bg-[#1B231F] rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-[#2C3831] shadow-2xl my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-[#25322B] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="text-xs font-bold text-[#2E5E44] dark:text-[#82C3A3] bg-[#EEF5F1] dark:bg-[#1A2820] px-3 py-1 rounded-full border border-[#CCE0D5] dark:border-[#2E4738]">
            أصحاب الأعمال والشركات 🌿
          </span>
          <h2 className="text-2xl font-black text-stone-900 dark:text-[#E4EBE7] mt-2">
            نشر إعلان وظيفة شاغرة
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            انشر وظيفتك فوراً واستقبل المتقدمين المؤهلين على الواتساب بنقرة واحدة
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-2xl bg-[#FDF2F0] dark:bg-[#2C1917] border border-[#F2D1CB] dark:border-[#4A2521] text-xs text-[#B34535] dark:text-[#E89284] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#EEF5F1] dark:bg-[#1A2820] flex items-center justify-center text-[#2E7D59] dark:text-[#82C3A3] mb-4 animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 dark:text-white">تم نشر الوظيفة بنجاح!</h3>
            <p className="text-xs text-stone-500 mt-1">أصبحت وظيفتك الآن حية ومتاحة للجميع على المنصة.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Title & Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">المسمى الوظيفي *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: محاسب عام، مطور ويب"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-[#2C3831] bg-white dark:bg-[#131916] text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3A604D]/50"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">اسم الشركة أو النشاط *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: شركة النور، مطعم الواحة"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-[#2C3831] bg-white dark:bg-[#131916] text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3A604D]/50"
                />
              </div>
            </div>

            {/* Category & City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">التصنيف *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-[#2C3831] bg-white dark:bg-[#131916] text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3A604D]/50"
                >
                  <option value="برمجة وتكنولوجيا المعلومات">برمجة وتكنولوجيا المعلومات</option>
                  <option value="محاسبة ومالية">محاسبة ومالية</option>
                  <option value="مبيعات وتسويق">مبيعات وتسويق</option>
                  <option value="مطاعم وضيافة">مطاعم وضيافة</option>
                  <option value="طب ورعاية صحية">طب ورعاية صحية</option>
                  <option value="تصميم وفنون رقمية">تصميم وفنون رقمية</option>
                  <option value="خدمة عملاء ودعم">خدمة عملاء ودعم</option>
                  <option value="تعليم وتدريب">تعليم وتدريب</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">المدينة *</label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-[#2C3831] bg-white dark:bg-[#131916] text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3A604D]/50"
                >
                  <option value="السويس">السويس</option>
                  <option value="القاهرة">القاهرة</option>
                  <option value="الجيزة">الجيزة</option>
                  <option value="الإسكندرية">الإسكندرية</option>
                  <option value="الإسماعيلية">الإسماعيلية</option>
                  <option value="بورسعيد">بورسعيد</option>
                  <option value="عن بُعد / Remote">عن بُعد / Remote</option>
                </select>
              </div>
            </div>

            {/* Type & WhatsApp */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">نوع الدوام</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-[#2C3831] bg-white dark:bg-[#131916] text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3A604D]/50"
                >
                  <option value="دوام كامل">دوام كامل</option>
                  <option value="دوام جزئي">دوام جزئي</option>
                  <option value="عن بُعد / Remote">عن بُعد / Remote</option>
                  <option value="عمل حر">عمل حر</option>
                  <option value="تدريب">تدريب</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">رقم واتساب لاستقبال السير الذاتية *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: 01096986091"
                  value={formData.whatsappContact}
                  onChange={(e) => setFormData({ ...formData, whatsappContact: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-[#2C3831] bg-white dark:bg-[#131916] text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3A604D]/50"
                />
              </div>
            </div>

            {/* Salaries */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">الراتب من (ج.م)</label>
                <input
                  type="number"
                  placeholder="مثال: 6000"
                  value={formData.salaryMin}
                  onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-[#2C3831] bg-white dark:bg-[#131916] text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3A604D]/50"
                />
              </div>
              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">الراتب إلى (ج.م)</label>
                <input
                  type="number"
                  placeholder="مثال: 9000"
                  value={formData.salaryMax}
                  onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-[#2C3831] bg-white dark:bg-[#131916] text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3A604D]/50"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">تفاصيل ومتطلبات الوظيفة *</label>
              <textarea
                required
                rows={4}
                placeholder="اكتب المهام، سنوات الخبرة المطلوبة، ومواعيد وساعات العمل..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-[#2C3831] bg-white dark:bg-[#131916] text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3A604D]/50"
              />
            </div>

            {/* Urgent Checkbox */}
            <label className="flex items-center gap-2 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={formData.urgent}
                onChange={(e) => setFormData({ ...formData, urgent: e.target.checked })}
                className="rounded text-[#B34535] focus:ring-[#B34535] w-4 h-4"
              />
              <span className="font-bold text-[#B34535] dark:text-[#E89284]">توظيف عاجل مطلوب خلال 48 ساعة</span>
            </label>

            {/* Submit Button */}
            <div className="pt-4 border-t border-stone-200 dark:border-[#2C3831]">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-[#3A604D] hover:bg-[#47735D] text-white font-black text-sm shadow-md shadow-[#3A604D]/20 transition-all disabled:opacity-50"
              >
                {loading ? 'جاري نشر الوظيفة...' : 'نشر الوظيفة على المنصة الآن 🌿'}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
