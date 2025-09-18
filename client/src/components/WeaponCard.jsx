import { Star, Sword } from "lucide-react";

export function WeaponCard({ weapon }) {

    const getRarityColor = (rarity) => {
        const colors = {
            5: 'text-yellow-400',
            4: 'text-purple-400',
            3: 'text-blue-400',
            2: 'text-green-400',
            1: 'text-gray-400'
        };
        return colors[rarity] || 'text-gray-400';
    };

    return (
        <div
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 group hover:scale-105 transform"
        >
            <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-300 flex justify-center items-center">
                <img className="h-32 w-32 object-contain rounded-xl" src={weapon.imageUrl} alt={`Weapon ${weapon.name}`} />
            </div>
            <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-200">
                    {weapon.name}
                </h3>

                <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-lg border border-cyan-500/30">
                        {weapon.type}
                    </span>
                    <div className={`flex ${getRarityColor(weapon.rarity)}`}>
                        {[...Array(weapon.rarity)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                    </div>
                </div>

                <div className="flex justify-between items-center mb-3">
                    <span className="text-blue-200 text-sm">ATK: {weapon.baseAttack}</span>
                    <span className="text-cyan-400 text-sm">{weapon.subStat}</span>
                </div>
            </div>

            <div className="mt-4">
                <button className="w-full px-3 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 text-cyan-400 rounded-lg text-sm font-semibold transition-all duration-200 border border-cyan-500/30 transform hover:scale-105">
                    <Sword className="w-4 h-4 inline mr-1" />
                    View Details
                </button>
            </div>
        </div>
    );
}