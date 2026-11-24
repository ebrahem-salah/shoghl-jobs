'use client';

import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Sparkles,
  MessageSquare,
  ArrowLeft,
  Bot,
  Zap,
} from 'lucide-react';
import { IJob, getWhatsAppJobApplyLink } from '@/lib/jobHelpers';

interface JobCardProps {
  job: IJob;
}

export default function JobCard({ job }: JobCardProps) {
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

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Top Badges & Logo */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-blue-600/10 to-indigo-600/10 border border-blue-500/20 flex items-center justify-center text-2xl shadow-inner group-hover:scale-105 transition-transform">
              {job.companyLogo || '💼'}
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-0.5">
                {job.company}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-slate-400">#{job.code}</span>
                {job.source === 'whatsapp_bot' && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/60">
                    <Bot className="w-3 h-3" />
                    عبر بوت واتساب
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1.5">
            {job.urgent && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2.5 py-0.5 rounded-full border border-rose-200 dark:border-rose-800 animate-pulse">
                <Zap className="w-3 h-3" />
                توظيف عاجل
              </span>
            )}
            {job.featured && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                <Sparkles className="w-3 h-3" />
                مميزة
              </span>
            )}
          </div>
        </div>

        {/* Job Title */}
        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
          <Link href={`/jobs/${job.slug}`}>{job.title}</Link>
        </h3>

        {/* Category & City Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-300 mb-4">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 font-medium">
            <MapPin className="w-3.5 h-3.5 text-blue-500" />
            {job.city} {job.district ? `• ${job.district}` : ''}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 font-medium">
            <Briefcase className="w-3.5 h-3.5 text-indigo-500" />
            {job.type}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-medium">
            {job.category}
          </span>
        </div>

        {/* Salary */}
        <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800/80 rounded-2xl p-3 mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <DollarSign className="w-4 h-4 text-emerald-500" />
            <span>الراتب المتوقع:</span>
          </div>
          <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
            {salaryDisplay}
          </span>
        </div>
      </div>

      {/* Dual Actions */}
      <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800/80">
        <a
          href={applyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-black text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          <span>تقديم عبر الواتساب فوراً</span>
        </a>

        <Link
          href={`/jobs/${job.slug}`}
          className="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
        >
          <span>تفاصيل الوظيفة الكاملة</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
