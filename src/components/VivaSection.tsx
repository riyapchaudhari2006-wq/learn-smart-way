import React, { useState } from 'react';
import { MessageSquare, Eye, EyeOff, Copy, Check, Lightbulb, UserCheck } from 'lucide-react';
import { VivaQuestion } from '../types';

interface VivaSectionProps {
  vivaQuestions: VivaQuestion[];
  language: string;
}

export const VivaSection: React.FC<VivaSectionProps> = ({ vivaQuestions, language }) => {
  const [revealedIds, setRevealedIds] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState(false);

  const toggleAnswer = (index: number) => {
    setRevealedIds(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleCopy = () => {
    const text = vivaQuestions.map((v, i) => {
      return `Viva Q${i + 1}: ${v.question}\nAnswer: ${v.shortAnswer}\n${v.examinerTip ? `Examiner Tip: ${v.examinerTip}` : ''}`;
    }).join('\n\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-rose-600/30 text-rose-400 flex items-center justify-center text-sm font-bold border border-rose-500/40">
              5
            </span>
            3 External Viva-Style Questions & Model Answers
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Short, punchy answers designed to impress the external examiner during practical & oral lab exams.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-750 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
          <span>{copied ? 'Copied' : 'Copy Viva Q&A'}</span>
        </button>
      </div>

      {/* Viva Q&A Cards */}
      <div className="space-y-4">
        {vivaQuestions.map((viva, index) => {
          const isRevealed = !!revealedIds[index];

          return (
            <div
              key={viva.id || index}
              className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3 transition-all"
            >
              {/* Question */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <span className="shrink-0 w-6 h-6 rounded bg-rose-950 text-rose-400 border border-rose-800 font-mono text-xs font-bold flex items-center justify-center">
                    V{index + 1}
                  </span>
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-rose-400/90 uppercase tracking-wide flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5" />
                      External Examiner Asks:
                    </span>
                    <h4 className="text-sm font-bold text-white leading-snug">
                      {viva.question}
                    </h4>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleAnswer(index)}
                  className={`shrink-0 px-2.5 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-colors ${
                    isRevealed
                      ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                      : 'bg-rose-950/60 border-rose-700/60 text-rose-300 hover:bg-rose-900/60'
                  }`}
                >
                  {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{isRevealed ? 'Hide' : 'Reveal Answer'}</span>
                </button>
              </div>

              {/* Revealed Answer */}
              {isRevealed ? (
                <div className="pl-8 space-y-2 animate-fadeIn">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs sm:text-sm text-emerald-200/95 leading-relaxed border-l-2 border-l-emerald-500">
                    <span className="font-bold text-emerald-400 block mb-1">
                      Ideal Oral Answer (Speak this with confidence):
                    </span>
                    {viva.shortAnswer}
                  </div>

                  {viva.examinerTip && (
                    <div className="flex items-start gap-2 text-xs text-amber-300/90 bg-amber-950/30 p-2.5 rounded-lg border border-amber-900/40">
                      <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-amber-200">Examiner Pro-Tip: </span>
                        <span>{viva.examinerTip}</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="pl-8">
                  <p className="text-xs text-slate-400 italic">
                    Think or speak your oral answer aloud first, then click "Reveal Answer" to check your readiness.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
