import React, { useState } from 'react';
import { ListOrdered, Copy, Check, Volume2, Sparkles } from 'lucide-react';

interface SummarySectionProps {
  summaryBullets: string[];
  language: string;
}

export const SummarySection: React.FC<SummarySectionProps> = ({ summaryBullets, language }) => {
  const [copied, setCopied] = useState(false);
  const [isReading, setIsReading] = useState(false);

  const handleCopy = () => {
    const text = summaryBullets.map((b, i) => `${i + 1}. ${b}`).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleRead = () => {
    if (!('speechSynthesis' in window)) return;

    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }

    const textToRead = summaryBullets.join('. ');
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 1.0;
    utterance.onend = () => setIsReading(false);
    utterance.onerror = () => setIsReading(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsReading(true);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-indigo-600/30 text-indigo-400 flex items-center justify-center text-sm font-bold border border-indigo-500/40">
              1
            </span>
            Lecture Summary (10 High-Yield Bullet Points)
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Carefully curated strictly from the lecture video • Language: <span className="text-slate-200 font-semibold">{language}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          {'speechSynthesis' in window && (
            <button
              onClick={handleToggleRead}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                isReading
                  ? 'bg-amber-600/30 border-amber-500/50 text-amber-300'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-750'
              }`}
              title="Listen to summary"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{isReading ? 'Stop Reading' : 'Listen'}</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-750 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copied ? 'Copied' : 'Copy Bullets'}</span>
          </button>
        </div>
      </div>

      {/* Bullets List */}
      <div className="grid grid-cols-1 gap-3">
        {summaryBullets.map((bullet, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/80 hover:border-slate-700/80 transition-colors group"
          >
            <span className="shrink-0 w-6 h-6 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800 flex items-center justify-center text-xs font-bold group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              {index + 1}
            </span>
            <p className="text-sm text-slate-200 leading-relaxed pt-0.5">
              {bullet}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
