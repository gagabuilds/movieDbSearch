import { useState } from 'react'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import MovieCard from './components/MovieCard'
import { searchMovies, type Movie } from './api'

function MovieSearchApp() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)

  async function handleSearch(query: string) {
    setLoading(true)
    setError('')
    setMovies([])
    setSearched(true)
    try {
      const res = await searchMovies(query)
      setMovies(res.movies)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Search failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className="main-content">
        <section className="hero">
          <h1 className="hero-title">Discover Your Next Favourite Film</h1>
          <p className="hero-subtitle">
            Search millions of movies by title, theme, or description using AI-powered similarity matching.
          </p>
          <SearchBar onSearch={handleSearch} loading={loading} />
        </section>

        {error && (
          <div className="search-error" role="alert">
            <strong>Error:</strong> {error}
          </div>
        )}

        {loading && (
          <div className="loading-grid" aria-busy="true" aria-label="Loading results">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton-card" />
            ))}
          </div>
        )}

        {!loading && searched && movies.length === 0 && !error && (
          <div className="no-results">
            <span className="no-results-icon">🎬</span>
            <p>No movies found. Try a different search.</p>
          </div>
        )}

        {!loading && movies.length > 0 && (
          <section className="results-section">
            <h2 className="results-heading">
              {movies.length} result{movies.length !== 1 ? 's' : ''} found
            </h2>
            <div className="movie-grid">
              {movies.map((movie) => (
                <MovieCard key={movie.tmdb_id} movie={movie} />
              ))}
            </div>
          </section>
        )}

        {!searched && (
          <div className="empty-state">
            <div className="empty-state-icon">🍿</div>
            <p>Start by typing a movie title or describe the kind of film you're looking for.</p>
          </div>
        )}
      </main>
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <MovieSearchApp />
    </AuthProvider>
  )
}

export default App
