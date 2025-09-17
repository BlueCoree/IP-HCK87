import { Eye, EyeOff, Shield, Sparkles, Sword, Zap } from "lucide-react"
import { useState } from "react"
import { showError } from "../helpers/alert"
import { useEffect } from "react"
import { useNavigate } from "react-router"


export function LoginPage() {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        try {
            setLoading(true)
            const { data } = await axios.post('http://localhost:3000/login', formData)
            localStorage.setItem('access_token', data.access_token)
            navigate('/')
        } catch (error) {
            console.log(error)
            showError(error)
        } finally {
            setLoading(false)
        }
    }

    async function handleCredentialResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);

        try {
            setLoading(true)
            const { data } = await axios.post('http://localhost:3000/login/google', { id_token: response.credential })
            localStorage.setItem('access_token', data.access_token)
            navigate('/')
        } catch (error) {
            console.log(error)
            showError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse
        });
        google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            { theme: "outline",  
            size: "medium",     
            shape: "circle",   
            type: "icon"}
        );
        // google.accounts.id.prompt();
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center py-4">
                <div className="w-6 h-6 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <>
            <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400/20 to-transparent animate-pulse"></div>
                    <div className="absolute top-3/4 right-1/4 w-24 h-24 rounded-full bg-gradient-to-br from-purple-400/20 to-transparent animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/6 w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400/20 to-transparent animate-pulse delay-2000"></div>
                    <div className="absolute bottom-1/4 right-1/3 w-20 h-20 rounded-full bg-gradient-to-br from-red-400/20 to-transparent animate-pulse delay-500"></div>
                    <div className="absolute top-20 left-20 animate-bounce">
                        <Sparkles className="w-8 h-8 text-yellow-300/60" />
                    </div>
                    <div className="absolute top-40 right-32 animate-bounce delay-1000">
                        <Sword className="w-6 h-6 text-blue-300/60" />
                    </div>
                    <div className="absolute bottom-32 left-32 animate-bounce delay-2000">
                        <Shield className="w-7 h-7 text-purple-300/60" />
                    </div>
                    <div className="absolute bottom-20 right-20 animate-bounce delay-500">
                        <Zap className="w-6 h-6 text-cyan-300/60" />
                    </div>
                </div>
                <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
                    <div className="w-full max-w-md">
                        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden">
                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-yellow-400 rounded-3xl blur opacity-20 animate-pulse"></div>
                            <div className="relative">
                                <div className="text-center mb-8">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl mb-4 shadow-lg">
                                        <Sparkles className="w-8 h-8 text-white" />
                                    </div>
                                    <h1 className="text-3xl font-bold text-white mb-2">
                                        Teyvat Info Hub
                                    </h1>
                                    <p className="text-blue-200 text-sm">
                                        Welcome back traveller!
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm font-medium text-blue-200">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                                        placeholder="traveler@teyvat.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="password" className="block text-sm font-medium text-blue-200">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                                            placeholder="Make strong password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-200 hover:text-white transition-colors duration-200"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>
                                <button
                                    onClick={handleSubmit}
                                    className="mt-5 w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-cyan-500/25 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2"
                                >
                                    <Sparkles className="w-5 h-5" />
                                    <span>Login</span>
                                </button>
                                <div className="text-center mt-5">
                                    <p className="text-blue-200 text-sm">
                                        Don't have an account?{" "}
                                        <a href="/register" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200">
                                            Register now
                                        </a>
                                    </p>
                                </div>
                                <div id="buttonDiv"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}