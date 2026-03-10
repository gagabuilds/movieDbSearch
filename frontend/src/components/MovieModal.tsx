import { XMarkIcon, StarIcon } from '@heroicons/react/24/solid'
import { type Movie } from './MovieCard'

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500'

interface MovieModalProps {
  movie: Movie | null
  onClose: () => void
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  if (!movie) return null

  const genres = movie.genre ?? movie.genres ?? []
  const backdropUrl = movie.backdrop_path
    ? `${TMDB_IMAGE_BASE}${movie.backdrop_path}`
    : null
  const posterUrl = movie.poster_path
    ? `${TMDB_IMAGE_BASE}${movie.poster_path}`
    : null

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={movie.title}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <XMarkIcon className="close-icon" aria-hidden="true" />
        </button>

        {backdropUrl && (
          <div className="modal-backdrop">
            <img src={backdropUrl} alt={`${movie.title} backdrop`} />
          </div>
        )}

        <div className="modal-body">
          <div className="modal-poster-section">
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={`${movie.title} poster`}
                className="modal-poster"
              />
            ) : (
              <div className="modal-no-poster">
                <span>No Image</span>
              </div>
            )}
          </div>

          <div className="modal-details">
            <h2 className="modal-title">{movie.title}</h2>
            {movie.tagline && (
              <p className="modal-tagline">"{movie.tagline}"</p>
            )}

            <div className="modal-meta">
              <span className="modal-year">{movie.release_year}</span>
              <span className="modal-rating">
                <StarIcon className="star-icon" aria-hidden="true" />
                {movie.vote_average.toFixed(1)}
                <span className="vote-count">({movie.vote_count.toLocaleString()} votes)</span>
              </span>
            </div>

            {genres.length > 0 && (
              <div className="modal-genres">
                {genres.map((g) => (
                  <span key={g} className="genre-tag">
                    {g}
                  </span>
                ))}
              </div>
            )}

            <p className="modal-overview">{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
