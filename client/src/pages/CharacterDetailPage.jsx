import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

const CharacterDetailPage = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axios({
            method: 'GET',
            url: `http://localhost:3000/characters/${id}`
        });
        if (response.status !== 200) {
          throw new Error('Character not found');
        }
        setCharacter(response.data);
      } catch (error) {
        console.error('Error fetching character:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  if (loading) {
    return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-cyan-500"></div>
        </div>

    );
  }

  if (!character) {
    return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-xl text-red-500">Character not found</div>
        </div>

    );
  }

  return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 bg-gray-900">
              <img 
                src={character.imageUrl} 
                alt={character.name}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="md:w-2/3 p-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-cyan-500">{`${character.name} ${character.title ? (character.title) : null}`}</h1>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  character.vision === 'Pyro' ? 'bg-red-700 text-red-100' :
                  character.vision === 'Hydro' ? 'bg-blue-700 text-blue-100' :
                  character.vision === 'Anemo' ? 'bg-green-700 text-green-100' :
                  character.vision === 'Electro' ? 'bg-purple-700 text-purple-100' :
                  character.vision === 'Dendro' ? 'bg-emerald-700 text-emerald-100' :
                  character.vision === 'Cryo' ? 'bg-cyan-700 text-cyan-100' :
                  character.vision === 'Geo' ? 'bg-yellow-700 text-yellow-100' :
                  'bg-gray-700 text-gray-100'
                }`}>
                  {character.vision}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-gray-400 text-sm">Rarity</p>
                  <p className="text-yellow-500 text-lg">{"★".repeat(character.rarity)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Weapon Type</p>
                  <p className="text-white">{character.weaponType}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-gray-400 text-sm">Region</p>
                  <p className="text-white text-lg">{character.nation}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Gender</p>
                  <p className="text-white">{character.gender}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-gray-400 text-sm">Constellation</p>
                  <p className="text-white text-lg">{character.constellation}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Birthday</p>
                  <p className="text-white">{character.birthday}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-gray-400 text-sm">Release</p>
                  <p className="text-white text-lg">{character.release}</p>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-cyan-400 mb-2">Description</h2>
                <p className="text-gray-300">{character.description}</p>
              </div>

              {character.Talents && character.Talents.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-cyan-400 mb-4">Talents</h2>
                  <div className="grid gap-4">
                    {character.Talents.map((talent, index) => (
                      <div key={index} className="bg-gray-700 p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-cyan-300 mb-2">{talent.name}</h3>
                        <p className="text-gray-300">{talent.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default CharacterDetailPage;