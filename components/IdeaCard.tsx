'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Sparkles, Lightbulb } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Idea {
    title: string;
    description: string;
    tags?: string[];
}

export default function IdeaCard({ idea, index }: { idea: Idea; index: number }) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`${idea.title}\n${idea.description}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={cn(
                "bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-xl",
                "hover:shadow-2xl hover:border-blue-500/30 transition-all group relative overflow-hidden"
            )}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                        <span className="text-4xl font-bold text-white/10 select-none">
                            {String(index + 1).padStart(2, '0')}
                        </span>
                        <div>
                            <h3 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors">
                                {idea.title}
                            </h3>
                        </div>
                    </div>
                    <button
                        onClick={copyToClipboard}
                        className="text-white/40 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                        title="Copy idea"
                    >
                        {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                    </button>
                </div>

                <p className="text-gray-300 leading-relaxed text-sm flex-grow">
                    {idea.description}
                </p>

                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-blue-300/60 font-medium">
                    <div className="flex items-center space-x-1">
                        <Sparkles size={12} />
                        <span className="uppercase tracking-wider">AI Generated</span>
                    </div>
                    {idea.tags && idea.tags.length > 0 && (
                        <span className="px-2 py-1 bg-white/5 rounded-md text-gray-400">
                            {idea.tags[0]}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
