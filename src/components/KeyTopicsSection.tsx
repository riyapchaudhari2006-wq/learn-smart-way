import React, { useState } from 'react';
import { Clock, Play, Copy, Check, Bookmark } from 'lucide-react';
import { KeyTopic } from '../types';

interface KeyTopicsSectionProps {
  keyTopics: KeyTopic[];
  onSeek: (seconds: number) => void;
  language: string;
}

export const KeyTopicsSection: React.FC<KeyTopicsSectionProps> = ({ keyTopics, onSeek, language }) => {
  const [copied, setCopied] = useState(false);
  const [activeSecond, setActiveSecond] = useState<number | null>(null);

  const handleCopy = () => {
    const text = keyTopics.map(t => `${t.timestamp} - ${t.topic}: ${t.oneLineDescription}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTimestampClick = (seconds: number) => {
    setActiveSecond(seconds);
    onSeek(seconds);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-emerald-600/30 text-emerald-400 flex items-center justify-center text-sm font-bold border border-emerald-500/40">
              2
            </span>
            Key Topics & Timestamps (Interactive Timeline)
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Click any timestamp (<Clock className="w-3 h-3 inline text-emerald-400" /> mm:ss) to jump the video directly to that exact explanation.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-750 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
          <span>{copied ? 'Copied' : 'Copy Timestamps'}</span>
        </button>
      </div>

      {/* Topics Timeline List */}
      <div className="space-y-2.5">
        {keyTopics.map((item, index) => {
          const isActive = activeSecond === item.seconds;
          return (
            <div
              key={index}
              className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isActive
                  ? 'bg-emerald-950/40 border-emerald-500/60 shadow-lg shadow-emerald-950/40'
                  : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start gap-3 flex-1">
                {/* Timestamp Button */}
                <button
                  onClick={() => handleTimestampClick(item.seconds)}
                  className="shrink-0 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-slate-700 hover:border-emerald-500 font-mono text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm group"
                  title={`Jump video to ${item.timestamp}`}
                >
                  <Play className="w-3 h-3 fill-current group-hover:scale-110 transition-transform" />
                  <span>{item.timestamp}</span>
                </button>

                <div className="space-y-0.5">
                  <h4 className="font-semibold text-white text-sm">
                    {item.topic}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.oneLineDescription}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleTimestampClick(item.seconds)}
                className="self-end sm:self-center text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1 font-medium group"
              >
                <span>Jump</span>
                <Play className="w-3 h-3" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
