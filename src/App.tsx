import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { VideoInputBar } from './components/VideoInputBar';
import { VideoPlayer } from './components/VideoPlayer';
import { SummarySection } from './components/SummarySection';
import { KeyTopicsSection } from './components/KeyTopicsSection';
import { DefinitionsSection } from './components/DefinitionsSection';
import { MCQQuizSection } from './components/MCQQuizSection';
import { VivaSection } from './components/VivaSection';
import { QuickRevisionSection } from './components/QuickRevisionSection';
import { ExportModal } from './components/ExportModal';
import { HistoryModal } from './components/HistoryModal';
import { PRESET_LECTURES, INITIAL_PRESET_MATERIALS, getPresetStudyMaterial } from './data/presets';
import { StudyMaterial, PresetLecture } from './types';
import {
  ListOrdered,
  Clock,
  BookMarked,
  HelpCircle,
  MessageSquare,
  Zap,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<'English' | 'Hinglish' | 'Hindi'>('English');
  const [currentVideoId, setCurrentVideoId] = useState<string | null>('A0h_p1yVn8E');
  const [currentPresetId, setCurrentPresetId] = useState<string | null>('os-round-robin');
  const [currentSeekSecond, setCurrentSeekSecond] = useState<number>(0);
  const [studyMaterial, setStudyMaterial] = useState<StudyMaterial | null>(
    INITIAL_PRESET_MATERIALS['os-round-robin']
  );
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'summary' | 'topics' | 'definitions' | 'mcqs' | 'viva' | 'revision'>('all');
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [savedMaterials, setSavedMaterials] = useState<StudyMaterial[]>([]);

  // Load saved materials from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('enggprep_saved_materials');
      if (stored) {
        setSavedMaterials(JSON.parse(stored));
      } else {
        // Initialize with default preset
        setSavedMaterials([INITIAL_PRESET_MATERIALS['os-round-robin']]);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleLanguageChange = (newLang: 'English' | 'Hinglish' | 'Hindi') => {
    setLanguage(newLang);
    if (currentPresetId) {
      const presetMat = getPresetStudyMaterial(currentPresetId, newLang);
      if (presetMat) {
        setStudyMaterial(presetMat);
        return;
      }
    }
    if (studyMaterial) {
      setStudyMaterial(prev => prev ? { ...prev, language: newLang } : null);
    }
  };

  const saveToHistory = (newMaterial: StudyMaterial) => {
    try {
      const updated = [newMaterial, ...savedMaterials.filter(m => m.videoTitle !== newMaterial.videoTitle)].slice(0, 20);
      setSavedMaterials(updated);
      localStorage.setItem('enggprep_saved_materials', JSON.stringify(updated));
    } catch {}
  };

  const handleClearHistory = () => {
    setSavedMaterials([]);
    localStorage.removeItem('enggprep_saved_materials');
  };

  const handleDeleteOneHistory = (index: number) => {
    const updated = savedMaterials.filter((_, i) => i !== index);
    setSavedMaterials(updated);
    localStorage.setItem('enggprep_saved_materials', JSON.stringify(updated));
  };

  const handleSeek = (seconds: number) => {
    setCurrentSeekSecond(seconds);
    // Smooth scroll to video player on mobile
    const videoEl = document.getElementById('video-player-container');
    if (videoEl && window.innerWidth < 1024) {
      videoEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPreset = (preset: PresetLecture) => {
    setCurrentPresetId(preset.id);
    setCurrentVideoId(preset.youtubeId);
    setCurrentSeekSecond(0);

    // If we have an instant cached material for this preset and language, show it immediately!
    const presetMat = getPresetStudyMaterial(preset.id, language);
    if (presetMat) {
      setStudyMaterial(presetMat);
    }
  };

  const handleGenerate = async (params: {
    videoUrl?: string;
    transcript?: string;
    topicTitle?: string;
    language: 'English' | 'Hinglish' | 'Hindi';
  }) => {
    setIsLoading(true);
    try {
      // 1. Try to extract video ID if URL provided
      if (params.videoUrl) {
        const match = params.videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
        if (match) {
          setCurrentVideoId(match[1]);
          setCurrentSeekSecond(0);
        }
      }

      // 2. Call server-side Gemini 3.8 Flash endpoint
      const response = await fetch('/api/generate-study-material', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          videoUrl: params.videoUrl,
          transcript: params.transcript,
          topicTitle: params.topicTitle,
          language: params.language
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate study material');
      }

      const generatedData: StudyMaterial = await response.json();
      setCurrentPresetId(null);
      setStudyMaterial(generatedData);
      saveToHistory(generatedData);
    } catch (err: unknown) {
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <Header
        language={language}
        onLanguageChange={handleLanguageChange}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onPrint={() => window.print()}
        onShare={() => setIsExportOpen(true)}
        hasMaterial={!!studyMaterial}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8 space-y-6">
        {/* Banner with guidelines */}
        <div className="bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-emerald-500/10 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <p className="font-semibold text-white">Strict Video Content Fidelity Guaranteed</p>
              <p className="text-slate-400">Uses only concepts taught in the lecture. No outside facts added. Simple language for engineering exam recall.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Active Mode: <strong className="text-emerald-400">{language}</strong>
            </span>
          </div>
        </div>

        {/* Video Input & Curated Presets Bar */}
        <div className="no-print">
          <VideoInputBar
            onGenerate={handleGenerate}
            isLoading={isLoading}
            selectedLanguage={language}
            onLanguageChange={handleLanguageChange}
            onSelectPreset={handleSelectPreset}
          />
        </div>

        {/* Video Player + Study Material Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Video Player & Exam Hall Quick Revision (Sticky on Desktop) */}
          <div id="video-player-container" className="lg:col-span-5 space-y-5 lg:sticky lg:top-20">
            <VideoPlayer
              videoId={currentVideoId}
              title={studyMaterial?.videoTitle || 'Lecture Video'}
              channelOrInstructor={studyMaterial?.channelOrInstructor}
              subject={studyMaterial?.subject}
              targetExamContext={studyMaterial?.targetExamContext}
              currentSeekSecond={currentSeekSecond}
            />

            {/* Quick Revision Card */}
            {studyMaterial && (
              <QuickRevisionSection
                quickFormulaSheet={studyMaterial.quickFormulaSheet}
                twoMinuteRevision={studyMaterial.twoMinuteRevision}
              />
            )}
          </div>

          {/* Right Column: 5 Study Kit Artifacts */}
          <div className="lg:col-span-7 space-y-6">
            {/* View Selector Tabs (Hidden in Print) */}
            <div className="no-print bg-slate-900 border border-slate-800 rounded-xl p-1.5 flex items-center gap-1 overflow-x-auto scrollbar-none text-xs">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  activeTab === 'all'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>All 5 Sections</span>
              </button>

              <button
                onClick={() => setActiveTab('summary')}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  activeTab === 'summary'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <ListOrdered className="w-3.5 h-3.5" />
                <span>1. Summary (10)</span>
              </button>

              <button
                onClick={() => setActiveTab('topics')}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  activeTab === 'topics'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>2. Timestamps</span>
              </button>

              <button
                onClick={() => setActiveTab('definitions')}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  activeTab === 'definitions'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <BookMarked className="w-3.5 h-3.5" />
                <span>3. Definitions (5)</span>
              </button>

              <button
                onClick={() => setActiveTab('mcqs')}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  activeTab === 'mcqs'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>4. MCQs (10)</span>
              </button>

              <button
                onClick={() => setActiveTab('viva')}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  activeTab === 'viva'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>5. Viva (3)</span>
              </button>
            </div>

            {/* When loading */}
            {isLoading && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin mx-auto" />
                <h3 className="text-base font-bold text-white">Analyzing Lecture Stream...</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Synthesizing 10 bullet points, extracting timestamp markers, formulating 5 core definitions, creating 10 exam MCQs, and 3 oral viva questions in {language}...
                </p>
              </div>
            )}

            {/* Study Material Content */}
            {!isLoading && studyMaterial && (
              <div className="space-y-6">
                {/* 1. Summary in 10 bullet points */}
                {(activeTab === 'all' || activeTab === 'summary') && (
                  <div className="print-break-inside-avoid">
                    <SummarySection
                      summaryBullets={studyMaterial.summaryBullets}
                      language={studyMaterial.language}
                    />
                  </div>
                )}

                {/* 2. Key topics with timestamps (mm:ss) and one line each */}
                {(activeTab === 'all' || activeTab === 'topics') && (
                  <div className="print-break-inside-avoid">
                    <KeyTopicsSection
                      keyTopics={studyMaterial.keyTopics}
                      onSeek={handleSeek}
                      language={studyMaterial.language}
                    />
                  </div>
                )}

                {/* 3. 5 important definitions */}
                {(activeTab === 'all' || activeTab === 'definitions') && (
                  <div className="print-break-inside-avoid">
                    <DefinitionsSection
                      definitions={studyMaterial.definitions}
                      language={studyMaterial.language}
                    />
                  </div>
                )}

                {/* 4. 10 MCQs with 4 options each, correct answer, and one-line explanation */}
                {(activeTab === 'all' || activeTab === 'mcqs') && (
                  <div className="print-break-inside-avoid">
                    <MCQQuizSection
                      mcqs={studyMaterial.mcqs}
                      language={studyMaterial.language}
                    />
                  </div>
                )}

                {/* 5. 3 viva-style questions with short answers */}
                {(activeTab === 'all' || activeTab === 'viva') && (
                  <div className="print-break-inside-avoid">
                    <VivaSection
                      vivaQuestions={studyMaterial.vivaQuestions}
                      language={studyMaterial.language}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="no-print border-t border-slate-900 bg-slate-950 py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            EnggPrep AI • Built for Indian Engineering Students (NPTEL, GATE, AKTU, VTU, SPPU, Mumbai Univ, Anna Univ)
          </p>
          <p className="text-slate-600">
            Always strictly faithful to lecture video explanations • English, Hinglish, & Hindi modes
          </p>
        </div>
      </footer>

      {/* Modals */}
      {studyMaterial && (
        <ExportModal
          isOpen={isExportOpen}
          onClose={() => setIsExportOpen(false)}
          material={studyMaterial}
        />
      )}

      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        savedMaterials={savedMaterials}
        onSelect={(mat) => {
          setStudyMaterial(mat);
          if (mat.sourceUrl) {
            const match = mat.sourceUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
            if (match) setCurrentVideoId(match[1]);
          }
        }}
        onClear={handleClearHistory}
        onDeleteOne={handleDeleteOneHistory}
      />
    </div>
  );
}
