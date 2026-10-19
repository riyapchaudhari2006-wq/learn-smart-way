import React from 'react';
import { GraduationCap, BookOpen, Share2, Printer, Sparkles, History } from 'lucide-react';

interface HeaderProps {
  language: 'English' | 'Hinglish' | 'Hindi';
  onLanguageChange: (lang: 'English' | 'Hinglish' | 'Hindi') => void;
  onOpenHistory: () => void;
  onPrint: () => void;
  onShare: () => void;
  hasMaterial: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  onOpenHistory,
  onPrint,
  onShare,
  hasMaterial
}) => {
  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 px-4 lg:px-8 py-3 text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-emerald-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-amber-400 via-orange-300 to-emerald-400 bg-clip-text text-transparent">
                EnggPrep AI
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Indian Engg Syllabus
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              NPTEL • GATE • VTU • AKTU • SPPU • Anna Univ Lecture Study Companion
            </p>
          </div>
        </div>

        {/* Controls & Language */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-3">
          {/* Language Selector */}
          <div className="flex items-center bg-slate-800/90 border border-slate-700/80 rounded-lg p-1 text-xs">
            <span className="text-slate-400 px-2 font-medium flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              Language:
            </span>
            {(['English', 'Hinglish', 'Hindi'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => onLanguageChange(lang)}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  language === lang
                    ? 'bg-gradient-to-r from-indigo-600 to-emerald-600 text-white shadow-sm font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                }`}
                title={
                  lang === 'Hinglish'
                    ? 'Explanations in Hinglish, technical terms strictly in English'
                    : lang === 'Hindi'
                    ? 'Explanations in Hindi, technical terms strictly in English'
                    : 'Standard English'
                }
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={onOpenHistory}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors text-xs flex items-center gap-1.5"
              title="Saved Study Materials"
            >
              <History className="w-4 h-4 text-amber-400" />
              <span className="hidden md:inline">Saved</span>
            </button>

            {hasMaterial && (
              <>
                <button
                  onClick={onShare}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors text-xs flex items-center gap-1.5"
                  title="Share or Export for WhatsApp / Telegram study groups"
                >
                  <Share2 className="w-4 h-4 text-emerald-400" />
                  <span className="hidden md:inline">Share</span>
                </button>
                <button
                  onClick={onPrint}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white border border-indigo-500/40 transition-colors text-xs font-medium flex items-center gap-1.5"
                  title="Print or Save as PDF"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / PDF</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
