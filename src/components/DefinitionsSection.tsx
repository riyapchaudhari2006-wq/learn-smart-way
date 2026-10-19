import React, { useState } from 'react';
import { BookMarked, Copy, Check, Eye, EyeOff, Award, Sparkles } from 'lucide-react';
import { Definition } from '../types';

interface DefinitionsSectionProps {
  definitions: Definition[];
  language: string;
}

export const DefinitionsSection: React.FC<DefinitionsSectionProps> = ({ definitions, language }) => {
  const [copied, setCopied] = useState(false);
  const [flashcardMode, setFlashcardMode] = useState(false);
  const [revealedIds, setRevealedIds] = useState<Record<number, boolean>>({});

  const handleCopy = () => {
    const text = definitions
      .map((d, i) => `${i + 1}. ${d.term}:\n${d.definition}\n${d.examNote ? `[Exam Tip: ${d.examNote}]` : ''}`)
      .join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleReveal = (index: number) => {
    setRevealedIds(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-amber-600/30 text-amber-400 flex items-center justify-center text-sm font-bold border border-amber-500/40">
              3
            </span>
            5 Core Definitions (Exam Must-Knows)
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Frequently asked 2-mark definitions in university semester exams & interviews.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFlashcardMode(!flashcardMode)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors ${
              flashcardMode
                ? 'bg-amber-600/30 border-amber-500 text-amber-300'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            {flashcardMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{flashcardMode ? 'Show All' : 'Self-Test Mode'}</span>
          </button>

          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-750 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copied ? 'Copied' : 'Copy 5 Definitions'}</span>
          </button>
        </div>
      </div>

      {/* Definitions Cards */}
      <div className="grid grid-cols-1 gap-3.5">
        {definitions.map((def, index) => {
          const isHidden = flashcardMode && !revealedIds[index];

          return (
            <div
              key={index}
              className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-amber-950 text-amber-400 border border-amber-800/80 flex items-center justify-center text-xs font-bold font-mono">
                    {index + 1}
                  </span>
                  <h4 className="font-bold text-white text-base text-indigo-300 group-hover:text-indigo-200">
                    {def.term}
                  </h4>
                </div>

                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-950/60 text-amber-400 border border-amber-800/60 flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  2-Mark Univ Target
                </span>
              </div>

              {/* Definition body */}
              {isHidden ? (
                <div className="pt-2">
                  <button
                    onClick={() => toggleReveal(index)}
                    className="w-full py-2 px-3 rounded-lg bg-slate-900 border border-dashed border-slate-700 text-xs text-slate-400 hover:text-amber-300 hover:border-amber-500/50 flex items-center justify-center gap-2 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Click to reveal definition & check recall</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2 pt-1 animate-fadeIn">
                  <p className="text-sm text-slate-200 leading-relaxed pl-1 border-l-2 border-indigo-500/60">
                    {def.definition}
                  </p>

                  {def.examNote && (
                    <div className="bg-slate-900/80 rounded-lg p-2 text-xs text-amber-200/90 flex items-center gap-1.5 border border-amber-950">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{def.examNote}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
