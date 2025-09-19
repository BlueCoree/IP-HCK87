import { useNavigate, Link } from 'react-router';
import { Trash2, Info, Sparkle } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from '../api/axios';

const API_URL = '/collections';

export function CollectionPage() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [loadingRecommendation, setLoadingRecommendation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCollections();
  }, []);

  async function fetchCollections() {
    try {
      setLoading(true);
      const { data } = await axios.get(API_URL);
      setCollections(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching collections:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
      setError('Failed to load collections');
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteCharacter(characterId) {
    try {
      await axios.delete(`${API_URL}/character/${characterId}`);
      await fetchCollections();
    } catch (error) {
      console.error('Error removing character:', error);
      setError('Failed to remove character');
    }
  }

  async function getRecommendation() {
    try {
      setLoadingRecommendation(true);
      const { data } = await axios.get('/recommendation');
      setRecommendation(data);
      setError(null);
    } catch (error) {
      console.error('Error getting recommendation:', error);
      setError('Failed to get AI recommendation');
    } finally {
      setLoadingRecommendation(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-6 h-6 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-cyan-400">My Collection</h1>
          <button
            onClick={getRecommendation}
            className={`cursor-pointer px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg transition flex items-center gap-2 ${
              loadingRecommendation 
                ? 'opacity-75 cursor-wait'
                : 'hover:from-purple-600 hover:to-indigo-700'
            }`}
            disabled={loadingRecommendation}
          >
            {loadingRecommendation ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>AI is thinking...</span>
              </>
            ) : (
              <>
                <Sparkle className="w-5 h-5" />
                <span>Get AI Recommendation</span>
              </>
            )}
          </button>
        </div>

        {recommendation && (
          <div className="mb-8 bg-gradient-to-r from-purple-900/50 to-indigo-900/50 rounded-xl p-6 border border-purple-500/20">
            <h2 className="text-xl font-semibold text-purple-300 mb-4 flex items-center gap-2">
              <Sparkle className="w-5 h-5" />
              AI Recommended Character
            </h2>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3">
                <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={recommendation.character.imageUrl} 
                      alt={recommendation.character.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-purple-300 mb-1">
                      {recommendation.character.name}
                    </h3>
                    <div className="text-sm text-gray-400">
                      {recommendation.character.element} • {recommendation.character.weaponType}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <div className="bg-gray-800/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-purple-300 mb-3">Why This Character?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {recommendation.recommendation}
                  </p>
                  <div className="mt-4">
                    <Link
                      to={`/characters/${recommendation.character.id}`}
                      className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-200 transition"
                    >
                      <Info className="w-4 h-4" />
                      View Character Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {collections.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">No characters in your collection yet</div>
            <Link 
              to="/characters" 
              className="inline-flex items-center px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition"
            >
              Browse Characters
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {collections.map((collection) => (
              collection.Character && (
                <div key={collection.Character.id} className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-cyan-500/10 transition">
                  <div className="aspect-square overflow-hidden relative group">
                    <img 
                      src={collection.Character.imageUrl} 
                      alt={collection.Character.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity">
                      <Link
                        to={`/characters/${collection.Character.id}`}
                        className="p-2 bg-cyan-500/80 rounded-full hover:bg-cyan-500 transition"
                      >
                        <Info className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => handleDeleteCharacter(collection.Character.id)}
                        className="cursor-pointer p-2 bg-red-500/80 rounded-full hover:bg-red-500 transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-cyan-300 mb-1">
                      {collection.Character.name}
                    </h3>
                    <div className="text-sm text-gray-400">
                      {collection.Character.element} • {collection.Character.weaponType}
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
}