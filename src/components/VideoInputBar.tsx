import React, { useState, useRef } from 'react';
import { Youtube, Sparkles, FileText, ChevronDown, ChevronUp, Play, Zap, AlertCircle, Upload, Check, FileCheck } from 'lucide-react';
import { PRESET_LECTURES } from '../data/presets';
import { PresetLecture } from '../types';

interface VideoInputBarProps {
  onGenerate: (data: {
    videoUrl?: string;
    transcript?: string;
    topicTitle?: string;
    language: 'English' | 'Hinglish' | 'Hindi';
  }) => Promise<void>;
  isLoading: boolean;
  selectedLanguage: 'English' | 'Hinglish' | 'Hindi';
  onLanguageChange: (lang: 'English' | 'Hinglish' | 'Hindi') => void;
  onSelectPreset: (preset: PresetLecture) => void;
}

export const VideoInputBar: React.FC<VideoInputBarProps> = ({
  onGenerate,
  isLoading,
  selectedLanguage,
  onLanguageChange,
  onSelectPreset
}) => {
  const [activeInputMode, setActiveInputMode] = useState<'url' | 'file'>('url');
  const [videoUrl, setVideoUrl] = useState('');
  const [topicTitle, setTopicTitle] = useState('');
  const [transcript, setTranscript] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    if (!topicTitle) {
      setTopicTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setTranscript(content);
      setShowAdvanced(true);
    };
    reader.readAsText(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!videoUrl.trim() && !transcript.trim() && !topicTitle.trim()) {
      setErrorMessage('Please enter a YouTube lecture link, upload a lecture file, or paste transcript text.');
      return;
    }

    try {
      await onGenerate({
        videoUrl: videoUrl.trim() || undefined,
        topicTitle: topicTitle.trim() || undefined,
        transcript: transcript.trim() || undefined,
        language: selectedLanguage
      });
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to generate study material');
    }
  };

  const handlePresetClick = (preset: PresetLecture) => {
    setVideoUrl(preset.videoUrl);
    setTopicTitle(preset.title);
    setTranscript(preset.transcriptSample);
    setUploadedFileName(null);
    onSelectPreset(preset);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Title & Guidance */}
      <div className="mb-4">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
          <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            Watch Lecture & Generate Exam Study Kit
          </h2>
          <div className="text-xs text-slate-400 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
            Strictly syllabus facts only • No outside hallucinations
          </div>
        </div>
        <p className="text-sm text-slate-400">
          Paste any YouTube lecture link (NPTEL, Gate Smashers, Abdul Bari, Neso Academy, etc.) or choose a curated syllabus preset below.
        </p>
      </div>

      {/* Preset Chips */}
      <div className="mb-5">
        <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Quick 1-Click Curated Lectures:</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {PRESET_LECTURES.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handlePresetClick(preset)}
              className="text-left shrink-0 bg-slate-800/90 hover:bg-slate-750 hover:border-indigo-500/60 border border-slate-700/70 rounded-xl p-2.5 transition-all text-xs max-w-[240px] group"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wide">
                  {preset.subject}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {preset.duration}
                </span>
              </div>
              <div className="font-semibold text-slate-200 group-hover:text-white line-clamp-1 mb-0.5">
                {preset.title}
              </div>
              <div className="text-[11px] text-slate-400 flex items-center justify-between">
                <span>{preset.channel}</span>
                <span className="text-indigo-400 group-hover:underline flex items-center gap-0.5 text-[10px]">
                  Load <Play className="w-2.5 h-2.5 fill-current" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Mode Switcher */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <button
            type="button"
            onClick={() => setActiveInputMode('url')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeInputMode === 'url'
                ? 'bg-red-600/20 text-red-400 border border-red-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Youtube className="w-3.5 h-3.5" />
            <span>YouTube Lecture URL</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveInputMode('file')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeInputMode === 'file'
                ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Lecture File (Transcript / SRT / Notes)</span>
          </button>
        </div>

        {activeInputMode === 'url' ? (
          /* Main YouTube URL input */
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Youtube className="w-4 h-4 text-red-500" />
                YouTube Lecture Video URL:
              </span>
              <span className="text-slate-400 font-normal">e.g. https://www.youtube.com/watch?v=A0h_p1yVn8E</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="Paste YouTube link here..."
                className="w-full bg-slate-950/80 border border-slate-700/90 rounded-xl px-4 py-3 pl-10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-sm font-mono"
              />
              <Youtube className="w-5 h-5 text-red-500/80 absolute left-3 top-3.5 pointer-events-none" />
              {videoUrl && (
                <button
                  type="button"
                  onClick={() => setVideoUrl('')}
                  className="absolute right-3 top-3 text-xs bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white px-2 py-1 rounded-md"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        ) : (
          /* File Upload input */
          <div className="space-y-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".txt,.srt,.vtt,.md,.json"
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-indigo-500/40 hover:border-indigo-500 bg-slate-950/60 hover:bg-indigo-950/10 rounded-xl p-6 text-center cursor-pointer transition-all group"
            >
              <Upload className="w-8 h-8 text-indigo-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-sm font-semibold text-white mb-1">
                {uploadedFileName ? (
                  <span className="text-emerald-400 flex items-center justify-center gap-1.5">
                    <FileCheck className="w-4 h-4" />
                    Loaded: {uploadedFileName}
                  </span>
                ) : (
                  'Click to upload Lecture Transcript, Subtitles (.srt, .vtt) or Notes (.txt)'
                )}
              </div>
              <p className="text-xs text-slate-400">
                Supports video subtitles, college lecture notes, and transcription exports
              </p>
            </div>
          </div>
        )}

        {/* Optional Title / Topic */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Lecture Topic or Subject (Optional if URL provided):
            </label>
            <input
              type="text"
              value={topicTitle}
              onChange={(e) => setTopicTitle(e.target.value)}
              placeholder="e.g. Operating Systems: Round Robin Scheduling"
              className="w-full bg-slate-950/80 border border-slate-700/90 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Study Material Language:
            </label>
            <div className="grid grid-cols-3 gap-2 bg-slate-950/80 p-1 rounded-xl border border-slate-700/90 text-xs">
              <button
                type="button"
                onClick={() => onLanguageChange('English')}
                className={`py-2 px-3 rounded-lg font-medium text-center transition-all ${
                  selectedLanguage === 'English'
                    ? 'bg-indigo-600 text-white shadow font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('Hinglish')}
                className={`py-2 px-3 rounded-lg font-medium text-center transition-all ${
                  selectedLanguage === 'Hinglish'
                    ? 'bg-amber-600 text-white shadow font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title="Hinglish explanation with English technical terms"
              >
                Hinglish
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('Hindi')}
                className={`py-2 px-3 rounded-lg font-medium text-center transition-all ${
                  selectedLanguage === 'Hindi'
                    ? 'bg-emerald-600 text-white shadow font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title="Hindi explanation with English technical terms"
              >
                Hindi
              </button>
            </div>
          </div>
        </div>

        {/* Collapsible Transcript / Notes Section */}
        <div>
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1.5 py-1"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{showAdvanced ? 'Hide' : 'Add or Paste'} Custom Lecture Transcript / Professor Notes (Optional)</span>
            {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showAdvanced && (
            <div className="mt-2 space-y-2 animate-fadeIn">
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Paste YouTube transcript text, subtitles (.srt), or your class notes here if you want high precision analysis..."
                rows={4}
                className="w-full bg-slate-950/80 border border-slate-700/90 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-xs font-mono leading-relaxed"
              />
              <p className="text-[11px] text-slate-400">
                Tip: Pasting the transcript allows Gemini to extract exact video timestamps and avoid any missing teacher commentary.
              </p>
            </div>
          )}
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="bg-red-950/50 border border-red-800/80 rounded-xl p-3 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white shadow-xl shadow-indigo-600/25 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2.5"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                <span>Analyzing Lecture Video & Generating Study Kit...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Generate Complete 5-Section Study Kit</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
