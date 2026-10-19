export interface KeyTopic {
  timestamp: string; // e.g. "02:15"
  seconds: number;   // e.g. 135
  topic: string;
  oneLineDescription: string;
}

export interface Definition {
  term: string;
  definition: string;
  examNote?: string;
}

export interface MCQ {
  id: number;
  question: string;
  options: [string, string, string, string];
  correctAnswerIndex: number; // 0, 1, 2, or 3
  explanation: string;
}

export interface VivaQuestion {
  id: number;
  question: string;
  shortAnswer: string;
  examinerTip?: string;
}

export interface QuickFormulaOrRule {
  name: string;
  formulaOrRule: string;
  significance: string;
}

export interface StudyMaterial {
  videoTitle: string;
  channelOrInstructor?: string;
  subject: string;
  targetExamContext: string;
  language: 'English' | 'Hinglish' | 'Hindi';
  summaryBullets: string[]; // exactly 10 bullet points
  keyTopics: KeyTopic[];    // timestamps + one line each
  definitions: Definition[]; // 5 important definitions
  mcqs: MCQ[];              // 10 MCQs
  vivaQuestions: VivaQuestion[]; // 3 viva questions
  quickFormulaSheet?: QuickFormulaOrRule[];
  twoMinuteRevision?: string;
  timestampGenerated?: string;
  sourceUrl?: string;
}

export interface PresetLecture {
  id: string;
  title: string;
  subject: string;
  channel: string;
  youtubeId: string;
  videoUrl: string;
  duration: string;
  description: string;
  badge: string;
  transcriptSample: string;
}
