import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function About() {
    return (
        <main className="min-h-screen bg-gray-950 text-white selection:bg-blue-500/30 font-sans">
            <div className="max-w-3xl mx-auto px-6 py-20">
                <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8 group">
                    <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">About IdeaSpark AI</h1>

                <div className="space-y-6 text-gray-300 leading-relaxed">
                    <p>
                        IdeaSpark AI is a cutting-edge creative tool designed to help students, entrepreneurs, and creators overcome writer's block and generate innovative concepts in seconds.
                    </p>
                    <p>
                        Built as a Google Developer Community Project, it leverages advanced Artificial Intelligence to understand context and deliver tailored ideas across various domains—from technology startups to local business ventures in Africa.
                    </p>
                    <p>
                        Our mission is to democratize creativity, making powerful brainstorming tools accessible to everyone, regardless of their technical background or location.
                    </p>
                </div>
            </div>
        </main>
    );
}
