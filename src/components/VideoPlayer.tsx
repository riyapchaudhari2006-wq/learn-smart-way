import React from 'react';
import { Youtube, ExternalLink, Clock, PlayCircle } from 'lucide-react';

interface VideoPlayerProps {
  videoId: string | null;
  title: string;
  channelOrInstructor?: string;
  subject?: string;
  targetExamContext?: string;
  currentSeekSecond?: number;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoId,
  title,
  channelOrInstructor,
  subject,
  targetExamContext,
  currentSeekSecond = 0
}) => {
  if (!videoId) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center text-slate-400">
        <Youtube className="w-12 h-12 mx-auto text-slate-600 mb-2" />
        <p className="text-sm">No video selected yet. Paste a link or select a curated lecture.</p>
      </div>
    );
  }

  // Build embed URL with start timestamp
  const embedSrc = `https://www.youtube.com/embed/${videoId}?autoplay=${currentSeekSecond > 0 ? 1 : 0}&start=${currentSeekSecond}&rel=0`;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      {/* Video embed */}
      <div className="relative pb-[56.25%] h-0 bg-black">
        <iframe
          src={embedSrc}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full border-0"
        />
      </div>

      {/* Video Details */}
      <div className="p-4 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {subject && (
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800">
              {subject}
            </span>
          )}
          {currentSeekSecond > 0 && (
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800 flex items-center gap-1">
              <PlayCircle className="w-3 h-3" />
              Playing at {Math.floor(currentSeekSecond / 60).toString().padStart(2, '0')}:{(currentSeekSecond % 60).toString().padStart(2, '0')}
            </span>
          )}
          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 hover:underline ml-auto"
          >
            <span>Open in YouTube</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <h3 className="font-bold text-white text-base md:text-lg leading-snug">
          {title}
        </h3>

        {channelOrInstructor && (
          <div className="text-xs text-slate-400 flex items-center gap-1">
            <span>Instructor/Channel:</span>
            <span className="text-slate-200 font-semibold">{channelOrInstructor}</span>
          </div>
        )}

        {targetExamContext && (
          <div className="bg-slate-800/60 rounded-xl p-2.5 border border-slate-700/60 text-xs text-indigo-200 flex items-start gap-2">
            <Clock className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">Exam Relevance: </span>
              <span>{targetExamContext}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
