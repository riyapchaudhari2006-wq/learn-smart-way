import React from 'react';
import { Zap, Calculator, Clock, Sparkles } from 'lucide-react';
import { QuickFormulaOrRule } from '../types';

interface QuickRevisionSectionProps {
  quickFormulaSheet?: QuickFormulaOrRule[];
  twoMinuteRevision?: string;
}

export const QuickRevisionSection: React.FC<QuickRevisionSectionProps> = ({
  quickFormulaSheet,
  twoMinuteRevision
}) => {
  if (!twoMinuteRevision && (!quickFormulaSheet || quickFormulaSheet.length === 0)) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-indigo-950/40 via-slate-900 to-emerald-950/30 border border-indigo-900/50 rounded-2xl p-6 shadow-xl space-y-4">
      {/* 2-Minute Revision */}
      {twoMinuteRevision && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-amber-500/20 text-amber-400">
              <Zap className="w-4 h-4" />
            </span>
            <h4 className="font-bold text-white text-sm uppercase tracking-wide text-amber-300">
              2-Minute Last Minute Hall Revision
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
            {twoMinuteRevision}
          </p>
        </div>
      )}

      {/* Quick Formula / Rule Sheet */}
      {quickFormulaSheet && quickFormulaSheet.length > 0 && (
        <div className="space-y-2 pt-2">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-indigo-500/20 text-indigo-400">
              <Calculator className="w-4 h-4" />
            </span>
            <h4 className="font-bold text-white text-sm uppercase tracking-wide text-indigo-300">
              Formulas & Essential Rules
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {quickFormulaSheet.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 space-y-1"
              >
                <div className="text-xs font-semibold text-slate-300">
                  {item.name}
                </div>
                <div className="font-mono text-xs text-emerald-400 font-bold bg-slate-900/90 px-2 py-1 rounded border border-slate-800">
                  {item.formulaOrRule}
                </div>
                <div className="text-[11px] text-slate-400">
                  {item.significance}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
