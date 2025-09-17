import React from 'react';
import { Users } from 'lucide-react';
import { CharacterCard } from '../components/CharacterCard';

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
    ];

    return (
        <div className="p-6 lg:p-8">
            <div className="flex items-center space-x-3 mb-6">
                <Users className="w-8 h-8 text-cyan-400" />
                <h2 className="text-3xl font-bold text-white">Characters</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {characters.map((character) => (
                    <CharacterCard character={character} />
                ))}
            </div>
        </div>
    );
}