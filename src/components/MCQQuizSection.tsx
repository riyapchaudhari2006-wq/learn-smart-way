import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RefreshCw, Eye, Award, Copy, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MCQ } from '../types';

interface MCQQuizSectionProps {
  mcqs: MCQ[];
  language: string;
}

export const MCQQuizSection: React.FC<MCQQuizSectionProps> = ({ mcqs, language }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showAllExplanations, setShowAllExplanations] = useState(false);
  const [copied, setCopied] = useState(false);

  const optionLetters = ['A', 'B', 'C', 'D'];

  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    if (selectedAnswers[questionIndex] !== undefined) return; // already answered

    const updated = {
      ...selectedAnswers,
      [questionIndex]: optionIndex
    };
    setSelectedAnswers(updated);

    // Calculate score
    const answeredCount = Object.keys(updated).length;
    if (answeredCount === mcqs.length) {
      let correctCount = 0;
      mcqs.forEach((mcq, idx) => {
        if (updated[idx] === mcq.correctAnswerIndex) correctCount++;
      });

      if (correctCount >= 8) {
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {}
      }
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowAllExplanations(false);
  };

  const handleCopy = () => {
    const text = mcqs.map((m, i) => {
      const opts = m.options.map((opt, oIdx) => `   (${optionLetters[oIdx]}) ${opt}`).join('\n');
      return `Q${i + 1}. ${m.question}\n${opts}\nCorrect: (${optionLetters[m.correctAnswerIndex]}) ${m.options[m.correctAnswerIndex]}\nExplanation: ${m.explanation}`;
    }).join('\n\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Compute live score
  const answeredTotal = Object.keys(selectedAnswers).length;
  const correctTotal = mcqs.filter((m, idx) => selectedAnswers[idx] === m.correctAnswerIndex).length;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-indigo-600/30 text-indigo-400 flex items-center justify-center text-sm font-bold border border-indigo-500/40">
              4
            </span>
            10 Practice MCQs (Quiz & GATE Pattern)
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            4 options each • 1 correct answer • 1-line crisp explanation based solely on the lecture.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAllExplanations(!showAllExplanations)}
            className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{showAllExplanations ? 'Hide Answer Key' : 'Reveal All Answers'}</span>
          </button>

          {answeredTotal > 0 && (
            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-750 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copied ? 'Copied' : 'Copy 10 MCQs'}</span>
          </button>
        </div>
      </div>

      {/* Live Score Banner */}
      <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <Award className="w-4 h-4 text-amber-400" />
          <span className="font-semibold text-white">Your Quiz Score:</span>
          <span className="font-mono text-sm font-bold text-emerald-400">
            {correctTotal} / {answeredTotal > 0 ? answeredTotal : 10}
          </span>
          <span className="text-slate-400">({answeredTotal} of 10 answered)</span>
        </div>

        {answeredTotal === 10 && (
          <div className="font-semibold text-xs px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
            {correctTotal >= 9 ? '🔥 Outstanding! GATE Ready!' : correctTotal >= 6 ? '👍 Good Job! Revise tricky points.' : '⚡ Review summary bullets & retry!'}
          </div>
        )}
      </div>

      {/* MCQs List */}
      <div className="space-y-4">
        {mcqs.map((mcq, qIdx) => {
          const userAnswer = selectedAnswers[qIdx];
          const hasAnswered = userAnswer !== undefined;
          const isCorrect = userAnswer === mcq.correctAnswerIndex;
          const showAnswer = hasAnswered || showAllExplanations;

          return (
            <div
              key={mcq.id || qIdx}
              className={`p-4 rounded-xl border transition-all ${
                hasAnswered
                  ? isCorrect
                    ? 'bg-emerald-950/20 border-emerald-800/60'
                    : 'bg-red-950/20 border-red-800/60'
                  : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {/* Question */}
              <div className="flex items-start gap-2.5 mb-3">
                <span className="shrink-0 w-6 h-6 rounded-md bg-slate-800 text-slate-300 font-mono text-xs font-bold flex items-center justify-center">
                  Q{qIdx + 1}
                </span>
                <p className="font-semibold text-white text-sm leading-snug pt-0.5">
                  {mcq.question}
                </p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-8">
                {mcq.options.map((option, optIdx) => {
                  const isSelected = userAnswer === optIdx;
                  const isThisCorrect = optIdx === mcq.correctAnswerIndex;

                  let optionClass = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-750 hover:bg-slate-850';

                  if (showAnswer) {
                    if (isThisCorrect) {
                      optionClass = 'bg-emerald-950/70 border-emerald-500/80 text-emerald-200 font-semibold shadow-sm';
                    } else if (isSelected && !isThisCorrect) {
                      optionClass = 'bg-red-950/70 border-red-500/80 text-red-200 line-through';
                    } else {
                      optionClass = 'bg-slate-900/50 border-slate-800/50 text-slate-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={hasAnswered}
                      onClick={() => handleSelectOption(qIdx, optIdx)}
                      className={`text-left p-2.5 rounded-lg border text-xs transition-all flex items-start gap-2 ${optionClass}`}
                    >
                      <span className="shrink-0 w-5 h-5 rounded font-mono font-bold text-[11px] flex items-center justify-center bg-slate-800/80 text-slate-400">
                        {optionLetters[optIdx]}
                      </span>
                      <span className="pt-0.5 flex-1">{option}</span>
                      {showAnswer && isThisCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      )}
                      {showAnswer && isSelected && !isThisCorrect && (
                        <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* One-Line Explanation */}
              {showAnswer && (
                <div className="mt-3 ml-8 p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-300 flex items-start gap-2 animate-fadeIn">
                  <span className="font-bold text-emerald-400 shrink-0">Explanation:</span>
                  <p className="leading-relaxed">{mcq.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
