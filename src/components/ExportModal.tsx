import React, { useState } from 'react';
import { X, Copy, Check, Download, Printer, Share2, FileText, Send } from 'lucide-react';
import { StudyMaterial } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  material: StudyMaterial;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, material }) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  if (!isOpen) return null;

  const generateWhatsAppText = () => {
    let text = `📚 *${material.videoTitle}* - Lecture Study Notes\n`;
    text += `🎯 Subject: ${material.subject} | Language: ${material.language}\n\n`;

    text += `📌 *1. SUMMARY (10 Points):*\n`;
    material.summaryBullets.forEach((b, i) => {
      text += `${i + 1}. ${b}\n`;
    });
    text += `\n`;

    text += `⏱️ *2. KEY TOPICS WITH TIMESTAMPS:*\n`;
    material.keyTopics.forEach(t => {
      text += `• [${t.timestamp}] ${t.topic}: ${t.oneLineDescription}\n`;
    });
    text += `\n`;

    text += `📖 *3. 5 CORE DEFINITIONS (2-Mark Target):*\n`;
    material.definitions.forEach((d, i) => {
      text += `*${i + 1}. ${d.term}*:\n${d.definition}\n`;
    });
    text += `\n`;

    text += `📝 *4. 10 PRACTICE MCQs:*\n`;
    material.mcqs.forEach((m, i) => {
      text += `Q${i + 1}. ${m.question}\n`;
      m.options.forEach((opt, oIdx) => {
        text += `   (${['A', 'B', 'C', 'D'][oIdx]}) ${opt}\n`;
      });
      text += `   👉 Ans: (${['A', 'B', 'C', 'D'][m.correctAnswerIndex]}) ${m.options[m.correctAnswerIndex]}\n`;
      text += `   💡 Explanation: ${m.explanation}\n\n`;
    });

    text += `🗣️ *5. 3 VIVA QUESTIONS (Oral Lab Exam):*\n`;
    material.vivaQuestions.forEach((v, i) => {
      text += `Q${i + 1}: ${v.question}\n`;
      text += `Ans: ${v.shortAnswer}\n`;
      if (v.examinerTip) text += `Tip: ${v.examinerTip}\n`;
      text += `\n`;
    });

    if (material.twoMinuteRevision) {
      text += `⚡ *2-MINUTE HALL REVISION:*\n${material.twoMinuteRevision}\n\n`;
    }

    text += `Generated via EnggPrep AI - Indian Engineering Study Companion`;
    return text;
  };

  const handleCopyWhatsApp = () => {
    const text = generateWhatsAppText();
    navigator.clipboard.writeText(text);
    setCopiedType('whatsapp');
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleDownloadMarkdown = () => {
    let md = `# ${material.videoTitle}\n\n`;
    md += `**Subject:** ${material.subject}  \n`;
    md += `**Language:** ${material.language}  \n`;
    if (material.targetExamContext) md += `**Exam Target:** ${material.targetExamContext}  \n`;
    md += `\n---\n\n`;

    md += `## 1. Summary (10 Bullet Points)\n\n`;
    material.summaryBullets.forEach((b, i) => {
      md += `${i + 1}. ${b}\n`;
    });
    md += `\n`;

    md += `## 2. Key Topics & Timestamps\n\n`;
    md += `| Timestamp | Topic | Summary |\n|---|---|---|\n`;
    material.keyTopics.forEach(t => {
      md += `| **${t.timestamp}** | ${t.topic} | ${t.oneLineDescription} |\n`;
    });
    md += `\n`;

    md += `## 3. 5 Important Definitions\n\n`;
    material.definitions.forEach((d, i) => {
      md += `### ${i + 1}. ${d.term}\n\n> ${d.definition}\n\n`;
      if (d.examNote) md += `*Exam Note: ${d.examNote}*\n\n`;
    });

    md += `## 4. 10 Practice MCQs\n\n`;
    material.mcqs.forEach((m, i) => {
      md += `#### Q${i + 1}. ${m.question}\n\n`;
      m.options.forEach((opt, oIdx) => {
        md += `- **(${['A', 'B', 'C', 'D'][oIdx]})** ${opt}\n`;
      });
      md += `\n**Correct Answer:** (${['A', 'B', 'C', 'D'][m.correctAnswerIndex]}) ${m.options[m.correctAnswerIndex]}  \n`;
      md += `**Explanation:** ${m.explanation}\n\n`;
    });

    md += `## 5. 3 Viva-Style Oral Exam Questions\n\n`;
    material.vivaQuestions.forEach((v, i) => {
      md += `**Q${i + 1}: ${v.question}**\n\n`;
      md += `- **Answer:** ${v.shortAnswer}\n`;
      if (v.examinerTip) md += `- **Examiner Tip:** ${v.examinerTip}\n`;
      md += `\n`;
    });

    if (material.twoMinuteRevision) {
      md += `## ⚡ 2-Minute Last Minute Hall Revision\n\n${material.twoMinuteRevision}\n\n`;
    }

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${material.videoTitle.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 30)}_StudyMaterial.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/40 flex items-center justify-center">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Share & Export Study Material</h3>
            <p className="text-xs text-slate-400">Export for WhatsApp study groups, print as PDF, or save Markdown</p>
          </div>
        </div>

        <div className="space-y-3">
          {/* WhatsApp Study Group Export */}
          <button
            onClick={handleCopyWhatsApp}
            className="w-full p-3.5 rounded-xl bg-slate-950/70 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/60 transition-all flex items-center justify-between text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center">
                <Send className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white group-hover:text-emerald-300">
                  Copy WhatsApp / Telegram Study Group Message
                </div>
                <div className="text-xs text-slate-400">
                  Formatted with emojis, bold headings, 10 bullets, 5 definitions, 10 MCQs & 3 Viva Qs.
                </div>
              </div>
            </div>
            {copiedType === 'whatsapp' ? (
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <Check className="w-4 h-4" /> Copied!
              </span>
            ) : (
              <Copy className="w-4 h-4 text-slate-400 group-hover:text-white" />
            )}
          </button>

          {/* Markdown Download */}
          <button
            onClick={handleDownloadMarkdown}
            className="w-full p-3.5 rounded-xl bg-slate-950/70 hover:bg-slate-850 border border-slate-800 hover:border-indigo-500/60 transition-all flex items-center justify-between text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-950 text-indigo-400 border border-indigo-800 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white group-hover:text-indigo-300">
                  Download as Markdown (.md)
                </div>
                <div className="text-xs text-slate-400">
                  Clean GitHub/Notion/Obsidian ready markdown file.
                </div>
              </div>
            </div>
            <Download className="w-4 h-4 text-slate-400 group-hover:text-white" />
          </button>

          {/* Direct Print */}
          <button
            onClick={() => {
              onClose();
              window.print();
            }}
            className="w-full p-3.5 rounded-xl bg-slate-950/70 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/60 transition-all flex items-center justify-between text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-950 text-amber-400 border border-amber-800 flex items-center justify-center">
                <Printer className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white group-hover:text-amber-300">
                  Print Notes / Save as PDF
                </div>
                <div className="text-xs text-slate-400">
                  Formatted for clean paper printing or lab record filing.
                </div>
              </div>
            </div>
            <Printer className="w-4 h-4 text-slate-400 group-hover:text-white" />
          </button>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
