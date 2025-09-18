import { Eye, Heart } from "lucide-react";
import { Link } from "react-router";

export function CharacterCard({ character }) {

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
        <div
            key={character.id}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 transform transition-all duration-300 hover:scale-105 hover:bg-white/20">

            <div className="w-full h-64 mb-3 flex justify-center items-center">
                <img
                    src={character.imageUrl}
                    alt={`Image ${character.name}`}
                    className="max-h-full max-w-full object-contain rounded-xl"
                />
            </div>

            <div>
                <h3 className="text-xl mb-2 font-bold text-white">{character.name}</h3>
                <div className={`text-sm px-2 py-1 mb-3 rounded-full mt-1 inline-block ${getElementColor(character.vision)}`}>
                    {character.vision}
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-blue-200">
                    {character.weaponType}
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-blue-200">
                    {character.nation}
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400">
                    ★{character.rarity}
                </span>
            </div>

            <div className="flex space-x-2 mt-4">
                <Link 
                    to={`/characters/${character.id}`}
                    className="cursor-pointer flex-1 px-3 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 text-cyan-400 rounded-lg text-sm font-semibold transition-all duration-200 border border-cyan-500/30 transform hover:scale-105 flex items-center justify-center"
                >
                    <Eye className="w-4 h-4 inline mr-1" />
                    Details
                </Link>
                <button className="cursor-pointer px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 transform hover:scale-110">
                    <Heart className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}