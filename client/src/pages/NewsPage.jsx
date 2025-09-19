import { Sparkles } from 'lucide-react';

export function NewsPage() {
    return (
        <div className="p-6 lg:p-8">
            <div className="flex items-center space-x-3 mb-6">
                <Sparkles className="w-8 h-8 text-yellow-400" />
                <h2 className="text-3xl font-bold text-white">News</h2>
            </div>
            <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                    <div className="flex items-start space-x-4">
                        <div className="text-4xl">📰</div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-2 hover:text-yellow-400 transition-colors duration-200">
                                Latest Game Updates
                            </h3>
                            <p className="text-yellow-400 text-sm mb-2">September 16, 2025</p>
                            <p className="text-blue-200 leading-relaxed">
                                Stay tuned for the latest updates and news from Teyvat!
                            </p>
                            <button className="mt-4 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 hover:from-yellow-500/30 hover:to-orange-500/30 text-yellow-400 rounded-lg text-sm font-semibold transition-all duration-200 border border-yellow-500/30 cursor-pointer transform hover:scale-105">
                                Read More
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}