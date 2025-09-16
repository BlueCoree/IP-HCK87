import React from 'react';
import { BookOpen } from 'lucide-react';

export function GuidesPage() {
    return (
        <div className="p-6 lg:p-8">
            <div className="flex items-center space-x-3 mb-6">
                <BookOpen className="w-8 h-8 text-orange-400" />
                <h2 className="text-3xl font-bold text-white">Guides</h2>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10 text-center">
                <BookOpen className="w-16 h-16 text-orange-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Game Guides</h3>
                <p className="text-blue-200">Coming soon! Strategy guides and tutorials for all content.</p>
            </div>
        </div>
    );
}