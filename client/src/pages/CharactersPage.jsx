import React, { use, useEffect } from 'react';
import { Users } from 'lucide-react';
import { CharacterCard } from '../components/CharacterCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from '../store/menuCharacter';

export function CharactersPage() {
    const {data , loading, error} = useSelector( state => state.menu )
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCharacters())
    }, [])

    if (loading) {
    return (
      <div className="flex justify-center items-center py-4">
        <div className="w-6 h-6 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    )
  }
  console.log(data, '<<< fetch charaters') 
    return (
        <div className="p-6 lg:p-8">
            <div className="flex items-center space-x-3 mb-6">
                <Users className="w-8 h-8 text-cyan-400" />
                <h2 className="text-3xl font-bold text-white">Characters</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {data.map((character) => (
                    <CharacterCard key={data.id} character={character} />
                ))}
            </div>
        </div>
    );
}