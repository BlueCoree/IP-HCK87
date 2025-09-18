import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

const WeaponDetailPage = () => {
  const { id } = useParams();
  const [weapon, setWeapon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeapon = async () => {
      try {
        const response = await axios({
            method: 'GET',
            url:`http://localhost:3000/weapons/${id}`
        });
        if (response.status !== 200) {
          throw new Error('Weapon not found');
        }
        setWeapon(response.data);
      } catch (error) {
        console.error('Error fetching weapon:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeapon();
  }, [id]);

  if (loading) {
    return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-cyan-500"></div>
        </div>

    );
  }

  if (!weapon) {
    return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-xl text-red-500">Weapon not found</div>
        </div>

    );
  }

  return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 bg-gray-900">
              <img 
                src={weapon.imageUrl} 
                alt={weapon.name}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="md:w-2/3 p-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-cyan-500">{weapon.name}</h1>
                <span className="px-4 py-2 rounded-full text-sm font-semibold bg-cyan-700 text-cyan-100">
                  {weapon.type}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-gray-400 text-sm">Rarity</p>
                  <p className="text-yellow-500 text-lg">{"★".repeat(weapon.rarity)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Base Attack</p>
                  <p className="text-white">{weapon.baseAttack}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-gray-400 text-sm">Sub Stat</p>
                  <p className="text-white text-lg">{(weapon.subStat)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Passive Name</p>
                  <p className="text-white">{weapon.passiveName}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="text-white text-lg">{(weapon.location)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Ascension Material</p>
                  <p className="text-white">{weapon.ascensionMaterial}</p>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-cyan-400 mb-2">Description</h2>
                <p className="text-gray-300">{weapon.passiveDesc}</p>
              </div>

              {weapon.AttScales && weapon.AttScales.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-cyan-400 mb-4">Attack Scaling</h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-gray-700 rounded-lg">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left text-cyan-300">Level</th>
                          <th className="px-4 py-2 text-left text-cyan-300">Base Attack</th>
                        </tr>
                      </thead>
                      <tbody>
                        {weapon.AttScales.map((scale, index) => (
                          <tr key={index} className="border-t border-gray-600">
                            <td className="px-4 py-2 text-gray-300">{scale.level}</td>
                            <td className="px-4 py-2 text-gray-300">{scale.attack}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {weapon.Upgrades && weapon.Upgrades.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-cyan-400 mb-4">Upgrade Materials</h2>
                  <div className="grid gap-4">
                    {weapon.Upgrades.map((upgrade, index) => (
                      <div key={index} className="bg-gray-700 p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-cyan-300 mb-2">Level {upgrade.level}</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-gray-400 text-sm">Materials</p>
                            <p className="text-gray-300">{upgrade.materials}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Mora Cost</p>
                            <p className="text-gray-300">{upgrade.moraCost.toLocaleString()}</p>
                          </div>
                        </div>
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

export default WeaponDetailPage;