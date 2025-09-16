import { Eye, EyeOff, Shield, Sparkles, Sword, Zap } from "lucide-react"
import { useState } from "react"


export function RegisterPage() {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        favoriteElement: ''
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const elements = [
        { value: 'anemo', label: 'Anemo', color: 'text-cyan-400' },
        { value: 'geo', label: 'Geo', color: 'text-yellow-600' },
        { value: 'electro', label: 'Electro', color: 'text-purple-400' },
        { value: 'dendro', label: 'Dendro', color: 'text-green-400' },
        { value: 'hydro', label: 'Hydro', color: 'text-blue-400' },
        { value: 'pyro', label: 'Pyro', color: 'text-red-400' },
        { value: 'cryo', label: 'Cryo', color: 'text-blue-200' }
    ];

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
                                        Join with Teyvat now!
                                    </p>
                                </div>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label htmlFor="username" className="block text-sm font-medium text-blue-200">
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            id="username"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                                            placeholder="Masukkan username Anda"
                                        />
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
                                                placeholder="Buat password yang kuat"
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
                                    <div className="space-y-2">
                                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-blue-200">
                                            Confirm Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                                                placeholder="Ulangi password Anda"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-200 hover:text-white transition-colors duration-200"
                                            >
                                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="favoriteElement" className="block text-sm font-medium text-blue-200">
                                            Favourite Element
                                        </label>
                                        <select
                                            id="favoriteElement"
                                            name="favoriteElement"
                                            value={formData.favoriteElement}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                                        >
                                            <option value="" className="bg-slate-800 text-white">Pilih elemen favorit Anda</option>
                                            {elements.map((element) => (
                                                <option key={element.value} value={element.value} className="bg-slate-800 text-white">
                                                    {element.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <button
                                        onClick={handleSubmit}
                                        className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-cyan-500/25 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2"
                                    >
                                        <Sparkles className="w-5 h-5" />
                                        <span>Register</span>
                                    </button>
                                    <div className="text-center">
                                        <p className="text-blue-200 text-sm">
                                            You have an account?{" "}
                                            <a href="/login" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200">
                                                Login now
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}