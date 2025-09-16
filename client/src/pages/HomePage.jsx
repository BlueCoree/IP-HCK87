import React, { useState } from 'react';
import {
    Menu, X, Home, Users, Sword, Map, BookOpen, Settings,
    Sparkles, Star, Shield, Zap, Eye, Heart, User, LogIn
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { Sidebar } from '../components/Sidebar';

export function HomePage(){
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('characters');
    const [isTransitioning, setIsTransitioning] = useState(false);
    const navigate = useNavigate();

    // Dummy data untuk karakter
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
        {
            id: 3,
            name: "Zhongli",
            element: "Geo",
            rarity: 5,
            weapon: "Polearm",
            region: "Liyue",
            image: "🌟",
            description: "Konsultan Wangsheng Funeral Parlor yang memiliki pengetahuan luas tentang sejarah."
        },
        {
            id: 4,
            name: "Raiden Shogun",
            element: "Electro",
            rarity: 5,
            weapon: "Polearm",
            region: "Inazuma",
            image: "⚡",
            description: "Penguasa Electro Archon dari Inazuma yang mengejar Eternity."
        },
        {
            id: 5,
            name: "Nahida",
            element: "Dendro",
            rarity: 5,
            weapon: "Catalyst",
            region: "Sumeru",
            image: "🌱",
            description: "Lesser Lord Kusanali, Dendro Archon yang bijaksana dari Sumeru."
        },
        {
            id: 6,
            name: "Furina",
            element: "Hydro",
            rarity: 5,
            weapon: "Sword",
            region: "Fontaine",
            image: "💧",
            description: "Hydro Archon dari Fontaine yang mencintai drama dan pertunjukan."
        },
        {
            id: 7,
            name: "Diluc",
            element: "Pyro",
            rarity: 5,
            weapon: "Claymore",
            region: "Mondstadt",
            image: "🔥",
            description: "Pemilik Dawn Winery dan vigilante malam yang melindungi Mondstadt."
        },
        {
            id: 8,
            name: "Kazuha",
            element: "Anemo",
            rarity: 5,
            weapon: "Sword",
            region: "Inazuma",
            image: "🍂",
            description: "Ronin yang gentle dengan kemampuan merasakan elemen dari angin."
        },
        {
            id: 9,
            name: "Ayaka",
            element: "Cryo",
            rarity: 5,
            weapon: "Sword",
            region: "Inazuma",
            image: "❄️",
            description: "Putri dari Klan Kamisato yang elegan dan berbakat dalam seni pedang."
        },
        {
            id: 10,
            name: "Ganyu",
            element: "Cryo",
            rarity: 5,
            weapon: "Bow",
            region: "Liyue",
            image: "🏔️",
            description: "Sekretaris Liyue Qixing yang merupakan Adeptus setengah qilin."
        }
    ];

    const news = [
        {
            id: 1,
            title: "Version 4.2: Masquerade of the Guilty",
            date: "Nov 8, 2023",
            image: "🎭",
            excerpt: "Jelajahi misteri Fontaine dengan karakter baru dan event menarik!"
        },
        {
            id: 2,
            title: "Event Terbaru: Ley Line Overflow",
            date: "Nov 1, 2023",
            image: "💎",
            excerpt: "Dapatkan double rewards dari Ley Line Blossoms selama periode event."
        },
        {
            id: 3,
            title: "Character Banner: Furina",
            date: "Oct 25, 2023",
            image: "🌊",
            excerpt: "Hydro Archon Furina kini tersedia dalam limited character banner!"
        }
    ];

    const getElementColor = (element) => {
        const colors = {
            Anemo: 'text-cyan-400 bg-cyan-400/20',
            Geo: 'text-yellow-500 bg-yellow-500/20',
            Electro: 'text-purple-400 bg-purple-400/20',
            Dendro: 'text-green-400 bg-green-400/20',
            Hydro: 'text-blue-400 bg-blue-400/20',
            Pyro: 'text-red-400 bg-red-400/20',
            Cryo: 'text-blue-200 bg-blue-200/20'
        };
        return colors[element] || 'text-gray-400 bg-gray-400/20';
    };

    const sidebarItems = [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'characters', label: 'Characters', icon: Users },
        { id: 'weapons', label: 'Weapons', icon: Sword },
        { id: 'maps', label: 'Maps', icon: Map },
        { id: 'guides', label: 'Guides', icon: BookOpen },
        { id: 'news', label: 'News', icon: Sparkles },
    ];

    const handleSectionChange = (sectionId) => {
        if (sectionId === activeSection) return;

        setIsTransitioning(true);
        setTimeout(() => {
            setActiveSection(sectionId);
            setIsTransitioning(false);
        }, 150);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-cyan-400/10 to-transparent animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-gradient-to-br from-purple-400/10 to-transparent animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400/10 to-transparent animate-pulse delay-2000"></div>
            </div>

            <div className="relative z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="text-white hover:text-cyan-400 transition-colors duration-200 lg:hidden cursor-pointer"
                        >
                            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-white font-bold text-xl">Teyvat Info Hub</span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button onClick={() => navigate('/login')} className="flex items-center space-x-2 px-4 py-2 text-blue-200 hover:text-white transition-colors duration-200 cursor-pointer">
                            <LogIn className="w-4 h-4" />
                            <span>Login</span>
                        </button>
                        <button onClick={() => navigate('/register')} className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg transition-all duration-200 cursor-pointer transform hover:scale-105">
                            <User className="w-4 h-4" />
                            <span>Register</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-1 relative">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    activeSection={activeSection}
                    handleSectionChange={handleSectionChange}
                />
                <div className="flex-1 h-[calc(100vh-64px)] overflow-y-auto">
                    <div className="p-6 lg:p-8">
                        <div className="mb-8">
                            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md rounded-3xl p-8 border border-white/10">
                                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
                                    Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Teyvat</span>
                                </h1>
                                <p className="text-blue-200 text-lg lg:text-xl mb-6 max-w-3xl">
                                    Jelajahi dunia Genshin Impact dengan informasi lengkap tentang karakter, senjata, peta, dan tips terbaru dari seluruh Teyvat.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 cursor-pointer transform hover:scale-105">
                                        <Sparkles className="w-5 h-5" />
                                        <span>Explore Characters</span>
                                    </button>
                                    <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all duration-200 border border-white/20 cursor-pointer transform hover:scale-105">
                                        Latest Updates
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={`transition-all duration-300 ${isTransitioning ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
                            {activeSection === 'home' && (
                                <div className="mb-8 animate-fade-in">
                                    <div className="text-center py-20">
                                        <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
                                            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Teyvat</span>
                                        </h1>
                                        <p className="text-blue-200 text-xl lg:text-2xl mb-8 max-w-4xl mx-auto">
                                            Your ultimate guide to the world of Genshin Impact. Discover characters, weapons, maps, and secrets of Teyvat.
                                        </p>
                                        <div className="flex flex-wrap justify-center gap-4">
                                            <button
                                                onClick={() => handleSectionChange('characters')}
                                                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 cursor-pointer transform hover:scale-105"
                                            >
                                                <Users className="w-5 h-5" />
                                                <span>Explore Characters</span>
                                            </button>
                                            <button
                                                onClick={() => handleSectionChange('news')}
                                                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all duration-200 border border-white/20 cursor-pointer transform hover:scale-105"
                                            >
                                                Latest Updates
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeSection === 'characters' && (
                                <div className="mb-8 animate-fade-in">
                                    <div className="flex items-center space-x-3 mb-6">
                                        <Users className="w-8 h-8 text-cyan-400" />
                                        <h2 className="text-3xl font-bold text-white">Characters</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {characters.map((character, index) => (
                                            <div
                                                key={character.id}
                                                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 group hover:scale-105 cursor-pointer"
                                                style={{ animationDelay: `${index * 0.1}s` }}
                                            >
                                                <div className="text-center mb-4">
                                                    <div className="text-6xl mb-3 transform group-hover:scale-110 transition-transform duration-300">{character.image}</div>
                                                    <h3 className="text-xl font-bold text-white mb-2">{character.name}</h3>
                                                    <div className="flex items-center justify-center space-x-2 mb-2">
                                                        <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${getElementColor(character.element)}`}>
                                                            {character.element}
                                                        </span>
                                                        <div className="flex text-yellow-400">
                                                            {[...Array(character.rarity)].map((_, i) => (
                                                                <Star key={i} className="w-3 h-3 fill-current" />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <p className="text-blue-200 text-sm mb-3">{character.weapon} • {character.region}</p>
                                                    <p className="text-blue-100 text-xs leading-relaxed">{character.description}</p>
                                                </div>

                                                <div className="flex space-x-2">
                                                    <button className="flex-1 px-3 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 text-cyan-400 rounded-lg text-sm font-semibold transition-all duration-200 border border-cyan-500/30 cursor-pointer transform hover:scale-105">
                                                        <Eye className="w-4 h-4 inline mr-1" />
                                                        View Details
                                                    </button>
                                                    <button className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 cursor-pointer transform hover:scale-110">
                                                        <Heart className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeSection === 'news' && (
                                <div className="mb-8 animate-fade-in">
                                    <div className="flex items-center space-x-3 mb-6">
                                        <Sparkles className="w-8 h-8 text-yellow-400" />
                                        <h2 className="text-3xl font-bold text-white">Latest News</h2>
                                    </div>

                                    <div className="space-y-6">
                                        {news.map((item, index) => (
                                            <div
                                                key={item.id}
                                                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-yellow-400/50 transition-all duration-300 cursor-pointer transform hover:scale-102"
                                                style={{ animationDelay: `${index * 0.2}s` }}
                                            >
                                                <div className="flex items-start space-x-4">
                                                    <div className="text-4xl transform hover:scale-110 transition-transform duration-300">{item.image}</div>
                                                    <div className="flex-1">
                                                        <h3 className="text-xl font-bold text-white mb-2 hover:text-yellow-400 transition-colors duration-200">{item.title}</h3>
                                                        <p className="text-yellow-400 text-sm mb-2">{item.date}</p>
                                                        <p className="text-blue-200 leading-relaxed">{item.excerpt}</p>
                                                        <button className="mt-4 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 hover:from-yellow-500/30 hover:to-orange-500/30 text-yellow-400 rounded-lg text-sm font-semibold transition-all duration-200 border border-yellow-500/30 cursor-pointer transform hover:scale-105">
                                                            Read More
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeSection === 'weapons' && (
                                <div className="mb-8 animate-fade-in">
                                    <div className="flex items-center space-x-3 mb-6">
                                        <Sword className="w-8 h-8 text-purple-400" />
                                        <h2 className="text-3xl font-bold text-white">Weapons</h2>
                                    </div>
                                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10 text-center">
                                        <Sword className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                                        <h3 className="text-xl font-bold text-white mb-2">Weapons Section</h3>
                                        <p className="text-blue-200">Coming soon! Explore all weapons in Teyvat.</p>
                                    </div>
                                </div>
                            )}

                            {activeSection === 'maps' && (
                                <div className="mb-8 animate-fade-in">
                                    <div className="flex items-center space-x-3 mb-6">
                                        <Map className="w-8 h-8 text-green-400" />
                                        <h2 className="text-3xl font-bold text-white">Maps</h2>
                                    </div>
                                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10 text-center">
                                        <Map className="w-16 h-16 text-green-400 mx-auto mb-4" />
                                        <h3 className="text-xl font-bold text-white mb-2">Interactive Maps</h3>
                                        <p className="text-blue-200">Coming soon! Explore all regions of Teyvat.</p>
                                    </div>
                                </div>
                            )}

                            {activeSection === 'guides' && (
                                <div className="mb-8 animate-fade-in">
                                    <div className="flex items-center space-x-3 mb-6">
                                        <BookOpen className="w-8 h-8 text-orange-400" />
                                        <h2 className="text-3xl font-bold text-white">Guides</h2>
                                    </div>
                                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10 text-center">
                                        <BookOpen className="w-16 h-16 text-orange-400 mx-auto mb-4" />
                                        <h3 className="text-xl font-bold text-white mb-2">Game Guides</h3>
                                        <p className="text-blue-200">Coming soon! Complete guides for all game content.</p>
                                    </div>
                                </div>
                            )}

                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-md rounded-xl p-6 border border-cyan-500/30 cursor-pointer transform hover:scale-105 transition-all duration-300">
                                <div className="flex items-center space-x-3">
                                    <Users className="w-8 h-8 text-cyan-400" />
                                    <div>
                                        <p className="text-cyan-400 font-semibold">Characters</p>
                                        <p className="text-white text-2xl font-bold">80+</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-xl p-6 border border-purple-500/30 cursor-pointer transform hover:scale-105 transition-all duration-300">
                                <div className="flex items-center space-x-3">
                                    <Sword className="w-8 h-8 text-purple-400" />
                                    <div>
                                        <p className="text-purple-400 font-semibold">Weapons</p>
                                        <p className="text-white text-2xl font-bold">200+</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-md rounded-xl p-6 border border-green-500/30 cursor-pointer transform hover:scale-105 transition-all duration-300">
                                <div className="flex items-center space-x-3">
                                    <Map className="w-8 h-8 text-green-400" />
                                    <div>
                                        <p className="text-green-400 font-semibold">Regions</p>
                                        <p className="text-white text-2xl font-bold">7</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-md rounded-xl p-6 border border-yellow-500/30 cursor-pointer transform hover:scale-105 transition-all duration-300">
                                <div className="flex items-center space-x-3">
                                    <BookOpen className="w-8 h-8 text-yellow-400" />
                                    <div>
                                        <p className="text-yellow-400 font-semibold">Guides</p>
                                        <p className="text-white text-2xl font-bold">50+</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};