'use client';

import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Briefcase,
  DollarSign,
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
    : 'راتب مجزي ومزايا';

  return (
    <div className="bg-white dark:bg-[#1B231F] rounded-3xl p-6 border border-stone-200/90 dark:border-[#2C3831] shadow-xs hover:shadow-md hover:border-[#3A604D]/40 dark:hover:border-[#527A65]/40 transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Top Badges & Logo */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-13 h-13 rounded-2xl bg-[#F4F1EA] dark:bg-[#232D28] border border-stone-200 dark:border-[#2C3831] flex items-center justify-center text-2xl shadow-inner group-hover:scale-105 transition-transform">
              {job.companyLogo || '💼'}
            </div>
            <div>
              <span className="text-xs font-semibold text-stone-600 dark:text-stone-300 block mb-0.5">
                {job.company}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-stone-400">#{job.code}</span>
                {job.source === 'whatsapp_bot' && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#2E7D59] dark:text-[#82C3A3] bg-[#EEF5F1] dark:bg-[#1C2C23] px-2 py-0.5 rounded-full border border-[#CCE0D5] dark:border-[#2E4738]">
                    <Bot className="w-3 h-3" />
                    عبر بوت واتساب
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1.5">
            {job.urgent && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#B34535] dark:text-[#E89284] bg-[#FDF2F0] dark:bg-[#2C1917] px-2.5 py-0.5 rounded-full border border-[#F2D1CB] dark:border-[#4A2521]">
                <Zap className="w-3 h-3" />
                توظيف عاجل
              </span>
            )}
            {job.featured && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#9E6E2E] dark:text-[#DFB57A] bg-[#FAF3E8] dark:bg-[#2B2316] px-2 py-0.5 rounded-full border border-[#EDE0CC] dark:border-[#473720]">
                <Sparkles className="w-3 h-3" />
                مميزة
              </span>
            )}
          </div>
        </div>

        {/* Job Title */}
        <h3 className="text-base sm:text-lg font-black text-stone-900 dark:text-[#E4EBE7] mb-3 group-hover:text-[#3A604D] dark:group-hover:text-[#82C3A3] transition-colors leading-snug">
          <Link href={`/jobs/${job.slug}`}>{job.title}</Link>
        </h3>

        {/* Category & City Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600 dark:text-stone-300 mb-4">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#F5F2EB] dark:bg-[#222B26] font-medium text-stone-700 dark:text-stone-300">
            <MapPin className="w-3.5 h-3.5 text-[#3A604D] dark:text-[#82C3A3]" />
            {job.city} {job.district ? `• ${job.district}` : ''}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#F5F2EB] dark:bg-[#222B26] font-medium text-stone-700 dark:text-stone-300">
            <Briefcase className="w-3.5 h-3.5 text-[#735A3D] dark:text-[#C5A880]" />
            {job.type}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#EEF5F1] dark:bg-[#1C2C23] text-[#2E5E44] dark:text-[#90CFA8] font-medium border border-[#D5E6DC] dark:border-[#2C4234]">
            {job.category}
          </span>
        </div>

        {/* Salary */}
        <div className="bg-[#F8F6F0] dark:bg-[#151D19] border border-stone-200/80 dark:border-[#2A372F] rounded-2xl p-3 mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
            <DollarSign className="w-4 h-4 text-[#3A604D] dark:text-[#82C3A3]" />
            <span>الراتب المتوقع:</span>
          </div>
          <span className="text-xs font-black text-[#2E7D59] dark:text-[#82C3A3]">
            {salaryDisplay}
          </span>
        </div>
      </div>

      {/* Dual Actions */}
      <div className="space-y-2 pt-3 border-t border-stone-100 dark:border-[#2C3831]">
        <a
          href={applyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 rounded-2xl bg-[#2E7D59] hover:bg-[#378F67] active:scale-98 text-white font-black text-xs shadow-sm transition-all flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          <span>تقديم عبر الواتساب فوراً</span>
        </a>

        <Link
          href={`/jobs/${job.slug}`}
          className="w-full py-2.5 rounded-2xl bg-[#F5F2EB] dark:bg-[#222C27] hover:bg-[#EAE5DC] dark:hover:bg-[#2B3831] text-[#2B4738] dark:text-[#CCE2D6] font-bold text-xs border border-stone-200 dark:border-[#2E3C34] transition-colors flex items-center justify-center gap-1.5"
        >
          <span>تفاصيل وشروط الوظيفة</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
