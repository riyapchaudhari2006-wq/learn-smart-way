import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '15mb' }));

// Initialize GoogleGenAI SDK on server side with User-Agent telemetry
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build'
    }
  }
});

function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  return match ? match[1] : null;
}

// 1. YouTube Video Info extractor (OEmbed)
app.post('/api/extract-video-info', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'Video URL is required' });
    }

    const videoId = extractYouTubeId(url);
    if (!videoId) {
      return res.status(400).json({ error: 'Could not extract valid YouTube video ID from URL' });
    }

    let title = 'Engineering Lecture';
    let authorName = 'Engineering Instructor';
    let thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    try {
      const oembedRes = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
      if (oembedRes.ok) {
        const oembedData = await oembedRes.json();
        title = oembedData.title || title;
        authorName = oembedData.author_name || authorName;
        thumbnailUrl = oembedData.thumbnail_url || thumbnailUrl;
      }
    } catch {
      // Fallback to defaults
    }

    return res.json({
      videoId,
      title,
      authorName,
      thumbnailUrl,
      embedUrl: `https://www.youtube.com/embed/${videoId}`
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to extract video info';
    return res.status(500).json({ error: errorMsg });
  }
});

// 2. Study Material Generator with Gemini 3.8 Flash
app.post('/api/generate-study-material', async (req, res) => {
  try {
    const { videoUrl, transcript, topicTitle, language = 'English', customNotes } = req.body;

    if (!videoUrl && !transcript && !topicTitle) {
      return res.status(400).json({ error: 'Please provide a lecture video URL, title, or transcript content.' });
    }

    const videoId = videoUrl ? extractYouTubeId(videoUrl) : null;
    const selectedLanguage = (language === 'Hinglish' || language === 'Hindi') ? language : 'English';

    const systemInstruction = `You are a dedicated, high-calibre study assistant for Indian engineering students (studying for university semester exams like VTU, AKTU, SPPU, Mumbai University, Anna University, and competitive exams like GATE and technical campus placements).
You must analyze the provided lecture video and material and create high-yield study material.

STRICT CONSTRAINTS:
1. USE ONLY what is taught in the video / transcript / lecture notes provided. Do NOT hallucinate or add outside irrelevant facts that were not in the lecture.
2. Keep the language simple, direct, and easy to memorize for an engineering student.
3. LANGUAGE DIRECTIVE:
   - If language requested is 'English': Write clear, structured, technical English commonly used in Indian engineering textbooks and lecture notes.
   - If language requested is 'Hinglish': Write the explanations, summaries, and conversational viva answers in standard friendly Hinglish (e.g. "Is lecture mein hum seekhte hain ki...", "Jab CPU time quantum khatam hota hai tab context switch hota hai..."). BUT ALL TECHNICAL TERMS MUST BE STRICTLY IN ENGLISH (e.g., CPU Scheduling, Round Robin, Time Quantum, Preemption, Deadlock, Ready Queue, Turnaround Time, Pointers, Stack, Normalization, ACID Properties).
   - If language requested is 'Hindi': Write explanations in clear Hindi, BUT KEEP ALL TECHNICAL TERMS STRICTLY IN ENGLISH.
4. PRODUCE EXACTLY:
   - 10 bullet points for Summary (sequential, high-impact concepts from beginning to end of the lecture).
   - Key topics with timestamps (format: "mm:ss", e.g. "00:00", "03:15", "07:30") and one line description each. Estimate timestamps realistically based on the logical progression of the lecture if not explicitly supplied.
   - 5 important definitions (concise, exam-friendly definitions commonly asked for 2 marks in university exams).
   - 10 MCQs with 4 options each (options A, B, C, D), the correct answer index (0 for A, 1 for B, 2 for C, 3 for D), and a one-line crisp explanation.
   - 3 viva-style questions with short punchy answers (the kind external examiners ask during practical / lab oral exams).
   - Include a 2-minute exam hall lightning revision summary.`;

    const userPrompt = `Please create the complete study kit for this Indian engineering lecture:
Title / Topic: ${topicTitle || 'Engineering Lecture'}
${videoUrl ? `Video URL: ${videoUrl}` : ''}
${videoId ? `YouTube ID: ${videoId}` : ''}
Target Language: ${selectedLanguage}

LECTURE CONTENT / TRANSCRIPT / SYLLABUS NOTES:
"""
${transcript || customNotes || `Topic: ${topicTitle}. Analyze the standard curriculum lecture on this subject according to standard engineering university syllabus.`}
"""

Ensure exactly:
- summaryBullets: 10 strings
- keyTopics: array of objects with timestamp ("mm:ss"), seconds (number), topic (string), oneLineDescription (string)
- definitions: 5 objects with term (string), definition (string), examNote (string)
- mcqs: 10 objects with id (1 to 10), question (string), options (4 strings), correctAnswerIndex (0-3), explanation (string)
- vivaQuestions: 3 objects with id (1 to 3), question (string), shortAnswer (string), examinerTip (string)
- quickFormulaSheet: 3-5 items with name, formulaOrRule, significance
- twoMinuteRevision: 2-3 sentences lightning recap before entering the exam hall.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            videoTitle: { type: Type.STRING },
            subject: { type: Type.STRING },
            targetExamContext: { type: Type.STRING },
            language: { type: Type.STRING },
            summaryBullets: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            keyTopics: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  timestamp: { type: Type.STRING },
                  seconds: { type: Type.INTEGER },
                  topic: { type: Type.STRING },
                  oneLineDescription: { type: Type.STRING }
                },
                required: ['timestamp', 'seconds', 'topic', 'oneLineDescription']
              }
            },
            definitions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  term: { type: Type.STRING },
                  definition: { type: Type.STRING },
                  examNote: { type: Type.STRING }
                },
                required: ['term', 'definition', 'examNote']
              }
            },
            mcqs: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.INTEGER },
                  question: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  correctAnswerIndex: { type: Type.INTEGER },
                  explanation: { type: Type.STRING }
                },
                required: ['id', 'question', 'options', 'correctAnswerIndex', 'explanation']
              }
            },
            vivaQuestions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.INTEGER },
                  question: { type: Type.STRING },
                  shortAnswer: { type: Type.STRING },
                  examinerTip: { type: Type.STRING }
                },
                required: ['id', 'question', 'shortAnswer', 'examinerTip']
              }
            },
            quickFormulaSheet: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  formulaOrRule: { type: Type.STRING },
                  significance: { type: Type.STRING }
                },
                required: ['name', 'formulaOrRule', 'significance']
              }
            },
            twoMinuteRevision: { type: Type.STRING }
          },
          required: [
            'videoTitle',
            'subject',
            'summaryBullets',
            'keyTopics',
            'definitions',
            'mcqs',
            'vivaQuestions'
          ]
        }
      }
    });

    const textOutput = response.text || '{}';
    const parsedData = JSON.parse(textOutput);

    // Ensure metadata tags
    parsedData.language = selectedLanguage;
    if (videoUrl) parsedData.sourceUrl = videoUrl;
    parsedData.timestampGenerated = new Date().toISOString();

    return res.json(parsedData);
  } catch (err: unknown) {
    console.error('Error generating study material:', err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown generation error';
    return res.status(500).json({ error: errorMessage });
  }
});

// Dev vs Prod Vite Integration
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EnggPrep Server running on port ${PORT}`);
  });
}

startServer();
