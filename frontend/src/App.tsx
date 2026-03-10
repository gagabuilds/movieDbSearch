import { useState, useEffect, useRef } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import MovieCard, { type Movie } from './components/MovieCard'
import MovieModal from './components/MovieModal'
import './App.css'

const API_URL = '/api'

function App() {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState<Movie[]>([])
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedMovie) {
        setSelectedMovie(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedMovie])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return

    setLoading(true)
    setError(null)
    setHasSearched(true)

    try {
      const res = await fetch(
        `${API_URL}/search?q=${encodeURIComponent(trimmed)}&limit=12`
      )
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.message ?? `Error ${res.status}`)
      }
      const data = await res.json()
      setMovies(data.movies ?? [])
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
      setMovies([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">🎬 MovieSearch</h1>
        <p className="app-subtitle">Discover movies using AI-powered semantic search</p>

        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-input-wrapper">
            <MagnifyingGlassIcon className="search-icon" aria-hidden="true" />
            <input
              ref={inputRef}
              type="text"
              className="search-input"
              placeholder='Search for a movie... e.g. "space adventure"'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Movie search query"
            />
          </div>
          <button
            type="submit"
            className="search-button"
            disabled={loading || !query.trim()}
          >
            {loading ? 'Searching…' : 'Search'}
          </button>
        </form>
      </header>

      <main className="app-main">
        {error && (
          <div className="error-banner" role="alert">
            ⚠️ {error}
          </div>
        )}

        {loading && (
          <div className="loading-state" aria-live="polite">
            <div className="spinner" aria-hidden="true" />
            <p>Finding movies…</p>
          </div>
        )}

        {!loading && hasSearched && movies.length === 0 && !error && (
          <div className="empty-state">
            <p>No movies found for "<strong>{query}</strong>".</p>
            <p>Try a different search term.</p>
          </div>
        )}

        {!loading && movies.length > 0 && (
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard
                key={movie.tmdb_id}
                movie={movie}
                onClick={setSelectedMovie}
              />
            ))}
          </div>
        )}

        {!hasSearched && !loading && (
          <div className="welcome-state">
            <p>Enter a query above to find movies using semantic search.</p>
          </div>
        )}
      </main>

      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  )
}

export default App
