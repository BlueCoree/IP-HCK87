
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import {
    Menu, X, Home, Users, Sword, Map, BookOpen, Settings,
    Sparkles
} from 'lucide-react';

export function Sidebar({ sidebarOpen, setSidebarOpen }) {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('home');
    const location = useLocation();
    
    const sidebarItems = [
        { id: 'home', label: 'Home', icon: Home, path: '/' },
        { id: 'characters', label: 'Characters', icon: Users, path: '/characters' },
        { id: 'weapons', label: 'Weapons', icon: Sword, path: '/weapons' },
        { id: 'maps', label: 'Maps', icon: Map, path: '/maps' },
        { id: 'guides', label: 'Guides', icon: BookOpen, path: '/guides' },
        { id: 'news', label: 'News', icon: Sparkles, path: '/news' },
    ];

    useEffect(() => {
        const currentPath = location.pathname;
        const currentItem = sidebarItems.find(el => el.path === currentPath);
        if (currentItem) {
            setActiveSection(currentItem.id)
        }
    }, [location.pathname]);

    return (
        <>
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-30"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            <div className={`lg:static fixed top-0 left-0 h-screen w-64 bg-black/40 backdrop-blur-xl border-r border-white/10 transform transition-transform duration-300 lg:translate-x-0 z-50 ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                <div className="p-6">
                    <div className="flex justify-end lg:hidden mb-8">
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="text-white hover:text-cyan-400 transition-colors duration-200"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <nav className="space-y-2">
                        {sidebarItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setActiveSection(item.id);
                                        setSidebarOpen(false);
                                        navigate(item.path);
                                    }}
                                    className={`w-full flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
                                        activeSection === item.id
                                            ? 'bg-cyan-500/20 text-cyan-400'
                                            : 'text-white hover:bg-white/10'
                                    }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{item.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </div>
        </>
    );
}