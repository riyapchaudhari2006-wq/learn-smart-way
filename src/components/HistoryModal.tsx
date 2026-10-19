import React from 'react';
import { X, History, Trash2, BookOpen, Clock } from 'lucide-react';
import { StudyMaterial } from '../types';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedMaterials: StudyMaterial[];
  onSelect: (material: StudyMaterial) => void;
  onClear: () => void;
  onDeleteOne: (index: number) => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  savedMaterials,
  onSelect,
  onClear,
  onDeleteOne
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl relative max-h-[85vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-600/30 text-amber-400 border border-amber-500/40 flex items-center justify-center">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Saved Lecture Kits</h3>
              <p className="text-xs text-slate-400">Stored in your browser local storage</p>
            </div>
          </div>

          {savedMaterials.length > 0 && (
            <button
              onClick={onClear}
              className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 hover:underline mr-8"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          )}
        </div>

        <div className="overflow-y-auto space-y-2.5 flex-1 pr-1">
          {savedMaterials.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-sm">
              <History className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No saved study kits yet. Generate material for any lecture and it will be saved here!</p>
            </div>
          ) : (
            savedMaterials.map((mat, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 flex items-center justify-between gap-3 group"
              >
                <div
                  onClick={() => {
                    onSelect(mat);
                    onClose();
                  }}
                  className="flex-1 cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-800">
                      {mat.subject}
                    </span>
                    <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                      {mat.language}
                    </span>
                    {mat.timestampGenerated && (
                      <span className="text-[10px] text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(mat.timestampGenerated).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-indigo-300 line-clamp-1">
                    {mat.videoTitle}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                    10 Bullets • 5 Definitions • 10 MCQs • 3 Viva Qs
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      onSelect(mat);
                      onClose();
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white text-xs font-medium"
                  >
                    Open
                  </button>
                  <button
                    onClick={() => onDeleteOne(idx)}
                    className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-slate-800"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
