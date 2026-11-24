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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
            أصحاب الأعمال والشركات 🚀
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-2">
            نشر إعلان وظيفة شاغرة
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            انشر وظيفتك فوراً واستقبل المتقدمين المؤهلين على الواتساب بنقرة واحدة
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">تم نشر الوظيفة بنجاح!</h3>
            <p className="text-xs text-slate-500 mt-1">أصبحت وظيفتك الآن حية ومتاحة للجميع على المنصة.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Title & Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">المسمى الوظيفي *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: محاسب عام، مطور ويب"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">اسم الشركة أو النشاط *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: مطعم الشاذلي، شركة النور"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Category & City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">التصنيف *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">المدينة *</label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">نوع الدوام</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="دوام كامل">دوام كامل</option>
                  <option value="دوام جزئي">دوام جزئي</option>
                  <option value="عن بُعد / Remote">عن بُعد / Remote</option>
                  <option value="عمل حر">عمل حر</option>
                  <option value="تدريب">تدريب</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">رقم واتساب لاستقبال السير الذاتية *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: 01096986091"
                  value={formData.whatsappContact}
                  onChange={(e) => setFormData({ ...formData, whatsappContact: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Salaries */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">الراتب من (ج.م)</label>
                <input
                  type="number"
                  placeholder="مثال: 6000"
                  value={formData.salaryMin}
                  onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">الراتب إلى (ج.م)</label>
                <input
                  type="number"
                  placeholder="مثال: 9000"
                  value={formData.salaryMax}
                  onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">تفاصيل ومتطلبات الوظيفة *</label>
              <textarea
                required
                rows={4}
                placeholder="اكتب المهام، سنوات الخبرة المطلوبة، ومواعيد وساعات العمل..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Urgent Checkbox */}
            <label className="flex items-center gap-2 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={formData.urgent}
                onChange={(e) => setFormData({ ...formData, urgent: e.target.checked })}
                className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
              />
              <span className="font-bold text-rose-600 dark:text-rose-400">توظيف عاجل مطلوب خلال 48 ساعة</span>
            </label>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm shadow-xl shadow-blue-600/25 transition-all disabled:opacity-50"
              >
                {loading ? 'جاري نشر الوظيفة...' : 'نشر الوظيفة على المنصة الآن 🚀'}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
