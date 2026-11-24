'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('saas_theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);

    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('saas_theme', nextTheme);

    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  if (!mounted) {
    return <div className="w-9 h-9 rounded-xl bg-stone-100 dark:bg-[#1E2722]" />;
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="p-2.5 rounded-xl bg-[#F4F1EA] hover:bg-[#EAE5DC] dark:bg-[#1E2722] dark:hover:bg-[#25322B] text-stone-700 dark:text-stone-200 transition-colors flex items-center justify-center border border-stone-200 dark:border-[#2C3831]"
      title={theme === 'dark' ? 'التبديل إلى الوضع النهاري الهادئ' : 'التبديل إلى الوضع الليلي الطبيعي'}
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-[#D8B47C]" />
      ) : (
        <Moon className="w-4 h-4 text-stone-600" />
      )}
    </button>
  );
}
