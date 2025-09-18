import { useEffect, useState } from 'react';
import { Menu, X, Sparkles, LogIn, User } from 'lucide-react';
import { Outlet, useNavigate } from 'react-router';
import { Sidebar } from '../components/Sidebar';

export function MainLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('access_token')

        if (token) {
            setUser({ token })
        }
    }, [])

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
                        {!user ? (
                            <>
                                <button onClick={() => navigate('/login')} className="flex items-center space-x-2 px-4 py-2 text-blue-200 hover:text-white transition-colors duration-200 cursor-pointer">
                                    <LogIn className="w-4 h-4" />
                                    <span>Login</span>
                                </button>
                                <button onClick={() => navigate('/register')} className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg transition-all duration-200 cursor-pointer transform hover:scale-105">
                                    <User className="w-4 h-4" />
                                    <span>Register</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <span className="text-white font-semibold">{user.username}</span>
                                <button
                                    onClick={() => {
                                        localStorage.removeItem("access_token");
                                        setUser(null);
                                        navigate('/');
                                    }}
                                    className="cursor-pointer flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                                >
                                    <X className="w-4 h-4 text-center" />
                                    <span>Logout</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-1 relative">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} user={user} />
                <div className="flex-1 h-[calc(100vh-64px)] overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}