'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Search, Zap, Code, Globe, GraduationCap, Briefcase, Palette, Video } from 'lucide-react';
import IdeaCard from '@/components/IdeaCard';
import Loader from '@/components/Loader';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface Idea {
  title: string;
  description: string;
  tags?: string[];
}

const MODES = [
  { id: 'Startup', label: 'Startup', icon: Zap },
  { id: 'Student', label: 'Student', icon: GraduationCap },
  { id: 'Business', label: 'Business', icon: Briefcase },
  { id: 'Africa Focus', label: 'Africa', icon: Globe },
  { id: 'Content Creator', label: 'Content', icon: Video },
  { id: 'Creative', label: 'Creative', icon: Palette },
];

const LANGUAGES = [
  { id: 'English', label: 'English', flag: '🇬🇧' },
  { id: 'Hausa', label: 'Hausa', flag: '🇳🇬' },
  { id: 'Yoruba', label: 'Yoruba', flag: '🇳🇬' },
  { id: 'Igbo', label: 'Igbo', flag: '🇳🇬' },
];

const SUGGESTIONS = [
  "Fintech app in Nigeria",
  "AI tool for students",
  "Business ideas for small towns",
  "Eco-friendly packaging"
];

export default function Home() {
  const [topic, setTopic] = useState('');
  const [mode, setMode] = useState('Startup');
  const [language, setLanguage] = useState('English');
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (e?: React.FormEvent, overrideTopic?: string) => {
    if (e) e.preventDefault();
    const searchTopic = overrideTopic || topic;
    if (!searchTopic.trim()) return;

    if (overrideTopic) setTopic(overrideTopic);

    setLoading(true);
    setError('');
    setIdeas([]);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: searchTopic, mode, language }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setIdeas(data.ideas);
    } catch (err: any) {
      setError(err.message || 'Failed to generate ideas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white selection:bg-blue-500/30 flex flex-col">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

      {/* Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 md:py-20 flex-grow flex flex-col items-center w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center mb-4 space-x-3">
            <div className="p-2.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg shadow-blue-500/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-gray-400">
              IdeaSpark AI
            </h1>
          </div>
          <p className="text-gray-400 max-w-lg mx-auto leading-relaxed">
            Helping students, creators, and entrepreneurs generate <span className="text-blue-200 font-medium">powerful ideas</span> instantly.
          </p>
        </motion.div>

        {/* Controls Section (Modes) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full flex flex-wrap justify-center gap-2 mb-8 max-w-3xl"
        >
          {MODES.map((m) => {
            const Icon = m.icon;
            const isActive = mode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                  isActive
                    ? "bg-blue-600/20 border-blue-500/50 text-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.2)] transform scale-105"
                    : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20 hover:text-gray-200"
                )}
              >
                <Icon size={14} className={isActive ? "text-blue-200" : "text-gray-500"} />
                <span>{m.label}</span>
              </button>
            )
          })}
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-2xl relative z-20 mb-6"
        >
          <form onSubmit={(e) => handleGenerate(e)} className="relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-40 group-hover:opacity-60 blur-lg transition duration-300"></div>
            <div className="relative flex items-center bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden p-1.5">
              <div className="pl-5 text-gray-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={`Enter a topic for ${mode.toLowerCase()}...`}
                className="w-full bg-transparent text-lg text-white placeholder-gray-500 px-4 py-4 focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading || !topic.trim()}
                className="px-6 md:px-8 py-3 md:py-4 bg-white text-gray-950 font-bold rounded-xl hover:bg-blue-50 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,255,255,0.1)] whitespace-nowrap"
              >
                {loading ? 'Thinking...' : 'Generate'}
              </button>
            </div>
          </form>

          {/* Language Selector */}
          <div className="flex justify-end mt-4">
            <div className="bg-white/5 backdrop-blur-md rounded-lg p-1 flex space-x-1 border border-white/10">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setLanguage(lang.id)}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center space-x-1.5",
                    language === lang.id
                      ? "bg-white/10 text-white shadow-sm border border-white/5"
                      : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                  )}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Suggestions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-16 max-w-2xl"
        >
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => handleGenerate(undefined, s)}
              className="text-xs text-gray-400 hover:text-blue-300 transition-colors bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 hover:border-blue-400/30 hover:bg-blue-400/5 cursor-pointer"
            >
              Try: "{s}"
            </button>
          ))}
        </motion.div>

        {/* Results Section */}
        <div className="w-full relative z-10 transition-all duration-500 min-h-[200px]">
          {loading && <Loader />}

          {error && (
            <div className="text-center text-red-400 bg-red-950/30 p-4 rounded-xl border border-red-500/20 animate-in fade-in slide-in-from-bottom-2">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {ideas.map((idea, index) => (
                <IdeaCard key={`${index}-${idea.title}`} idea={idea} index={index} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 bg-black/20 backdrop-blur-sm py-8 mt-auto relative z-10 transition-all">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mb-4 md:mb-0">
            <div className="flex items-center space-x-2">
              <Code size={14} />
              <span>Built with <strong>Next.js</strong>, <strong>Firebase</strong>, <strong>OpenAI</strong>, & <strong>Gemini API</strong></span>
            </div>
            <span className="hidden md:inline text-gray-700">|</span>
            <span>&copy; 2026 IdeaSpark AI</span>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6">
            <Link href="/about" className="hover:text-blue-400 transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-blue-400 transition-colors">Terms</Link>
            <span className="w-1 h-1 bg-gray-700 rounded-full hidden sm:block"></span>
            <span className="hover:text-white transition-colors cursor-default">Google Developer Community Project</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
