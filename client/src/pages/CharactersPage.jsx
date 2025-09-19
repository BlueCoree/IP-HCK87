import { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { CharacterCard } from '../components/CharacterCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from '../store/menuCharacter';

export function CharactersPage() {
    const { data, loading, error, pagination } = useSelector(state => state.menu)
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    // const [sort, setSort] = useState(null)
    const [debouncedSearch, setDebouncedSearch] = useState(search)

    const handleChange = (event) => {
        // console.log(event)
        const { value } = event.target
        setSearch(value)
    }

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search)
        }, 800)

        return () => clearTimeout(handler)
    }, [search])

    useEffect(() => {
        dispatch(fetchCharacters({
            page: { number: page, size: 12 },
            search: debouncedSearch
        }))
    }, [page, debouncedSearch, dispatch])

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

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="px-3 py-2 rounded bg-gray-800 text-white w-full"
                    value={search}
                    onChange={handleChange}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {data.map((character) => (
                    <CharacterCard key={character.id} character={character} />
                ))}
            </div>

            <div className="flex justify-center mt-6 space-x-2">
                <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="cursor-pointer px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
                >
                    Prev
                </button>
                <span className="px-4 py-2 text-white">
                    Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                    onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                    disabled={page === pagination.totalPages}
                    className="cursor-pointer px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>

        </div>
    );
}