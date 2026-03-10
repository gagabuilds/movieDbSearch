import { StarIcon } from '@heroicons/react/20/solid'

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500'

export interface Movie {
  title: string
  tmdb_id: number
  overview: string
  tagline?: string
  poster_path: string | null
  release_year: number
  genre?: string[]
  genres?: string[]
  vote_average: number
  vote_count: number
  backdrop_path: string | null
  similarity_score?: number
}

interface MovieCardProps {
  movie: Movie
  onClick: (movie: Movie) => void
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  const genres = movie.genre ?? movie.genres ?? []
  const posterUrl = movie.poster_path
    ? `${TMDB_IMAGE_BASE}${movie.poster_path}`
    : null

  return (
    <div
      className="movie-card"
      onClick={() => onClick(movie)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(movie)}
    >
      <div className="movie-card-poster">
        {posterUrl ? (
          <img src={posterUrl} alt={`${movie.title} poster`} loading="lazy" />
        ) : (
          <div className="movie-card-no-poster">
            <span>No Image</span>
          </div>
        )}
      </div>
      <div className="movie-card-info">
        <h3 className="movie-card-title">{movie.title}</h3>
        <div className="movie-card-meta">
          <span className="movie-card-year">{movie.release_year}</span>
          <span className="movie-card-rating">
            <StarIcon className="star-icon" aria-hidden="true" />
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
        {genres.length > 0 && (
          <div className="movie-card-genres">
            {genres.slice(0, 3).map((g) => (
              <span key={g} className="genre-tag">
                {g}
              </span>
            ))}
          </div>
        )}
        <p className="movie-card-overview">{movie.overview}</p>
      </div>
    </div>
  )
}
