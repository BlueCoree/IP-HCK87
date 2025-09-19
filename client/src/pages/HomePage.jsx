import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router';

export function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="p-6 lg:p-8">
            <div className="text-center py-20">
                <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
                    Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Teyvat</span>
                </h1>
                <p className="text-blue-200 text-xl lg:text-2xl mb-8 max-w-4xl mx-auto">
                    Your ultimate guide to the world of Genshin Impact. Discover characters, weapons, maps, and secrets of Teyvat.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <button
                        onClick={() => navigate('/characters')}
                        className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 cursor-pointer transform hover:scale-105"
                    >
                        <Sparkles className="w-5 h-5" />
                        <span>Explore Characters</span>
                    </button>
                    {/* <button
                        onClick={() => navigate('/news')}
                        className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all duration-200 border border-white/20 cursor-pointer transform hover:scale-105"
                    >
                        Latest Updates
                    </button> */}
                </div>
            </div>
        </div>
    );
}