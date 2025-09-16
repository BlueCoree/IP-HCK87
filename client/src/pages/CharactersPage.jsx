import React from 'react';
import { Users } from 'lucide-react';

export function CharactersPage() {
    const characters = [
        {
            id: 1,
            name: "Albedo",
            element: "Geo",
            rarity: 5,
            weapon: "Sword",
            region: "Mondstadt",
            image: "🧪",
            description: "Seorang alkemis genius yang bekerja sebagai Kapten Detasemen Investigasi Knights of Favonius."
        },
        {
            id: 2,
            name: "Venti",
            element: "Anemo",
            rarity: 5,
            weapon: "Bow",
            region: "Mondstadt",
            image: "🍃",
            description: "Bard yang bebas berkelana dengan identitas rahasia sebagai Barbatos, Archon Anemo."
        },
        // Add more characters as needed
    ];

    const getElementColor = (element) => {
        const colors = {
            Pyro: 'text-red-400 bg-red-400/20',
            Hydro: 'text-blue-400 bg-blue-400/20',
            Anemo: 'text-teal-400 bg-teal-400/20',
            Electro: 'text-purple-400 bg-purple-400/20',
            Dendro: 'text-green-400 bg-green-400/20',
            Geo: 'text-yellow-400 bg-yellow-400/20',
            Cryo: 'text-blue-200 bg-blue-200/20'
        };
        return colors[element] || 'text-gray-400 bg-gray-400/20';
    };

    return (
        <div className="p-6 lg:p-8">
            <div className="flex items-center space-x-3 mb-6">
                <Users className="w-8 h-8 text-cyan-400" />
                <h2 className="text-3xl font-bold text-white">Characters</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {characters.map((character) => (
                    <div
                        key={character.id}
                        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 transform transition-all duration-300 hover:scale-105 hover:bg-white/20"
                    >
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="text-4xl">{character.image}</div>
                            <div>
                                <h3 className="text-xl font-bold text-white">{character.name}</h3>
                                <div className={`text-sm px-2 py-1 rounded-full mt-1 inline-block ${getElementColor(character.element)}`}>
                                    {character.element}
                                </div>
                            </div>
                        </div>
                        <p className="text-blue-200 text-sm leading-relaxed mb-4">
                            {character.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-blue-200">
                                {character.weapon}
                            </span>
                            <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-blue-200">
                                {character.region}
                            </span>
                            <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400">
                                ★{character.rarity}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}