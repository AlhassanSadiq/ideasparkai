import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function Privacy() {
    return (
        <main className="min-h-screen bg-gray-950 text-white selection:bg-blue-500/30 font-sans">
            <div className="max-w-3xl mx-auto px-6 py-20">
                <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8 group">
                    <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

                <div className="space-y-6 text-gray-300 leading-relaxed text-sm">
                    <p>Last updated: February 2026</p>

                    <h2 className="text-xl font-semibold text-white mt-8">1. Information We Collect</h2>
                    <p>
                        We do not collect personal data. IdeaSpark AI is a tool for generating ideas. The topics you enter are sent to our AI provider to generate results but are not permanently stored by us.
                    </p>

                    <h2 className="text-xl font-semibold text-white mt-8">2. Third-Party Services</h2>
                    <p>
                        We use third-party AI services (such as OpenAI and Google Gemini) to process your requests. Please refer to their respective privacy policies for how they handle data processing.
                    </p>

                    <h2 className="text-xl font-semibold text-white mt-8">3. Cookies</h2>
                    <p>
                        We may use standard cookies to ensure the website functions correctly and to improve user experience.
                    </p>

                    <h2 className="text-xl font-semibold text-white mt-8">4. Contact</h2>
                    <p>
                        If you have questions about this policy, please contact us via the community channels.
                    </p>
                </div>
            </div>
        </main>
    );
}
