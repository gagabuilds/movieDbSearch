import { StarIcon } from '@heroicons/react/24/solid';
import { type Movie, getPosterUrl } from '../api';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = getPosterUrl(movie.poster_path);
  const rating = movie.vote_average.toFixed(1);
  const match = Math.round(movie.similarity_score * 100);

  return (
    <article className="movie-card">
      <div className="movie-poster-wrap">
        {posterUrl ? (
          <img
            className="movie-poster"
            src={posterUrl}
            alt={`${movie.title} poster`}
            loading="lazy"
          />
        ) : (
          <div className="movie-poster-placeholder">
            <span>🎬</span>
          </div>
        )}
        <div className="movie-match-badge" title="Similarity match">
          {match}% match
        </div>
      </div>

      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-meta">
          <span className="movie-year">{movie.release_year}</span>
          <span className="movie-rating">
            <StarIcon className="star-icon" aria-hidden="true" />
            {rating}
            <span className="vote-count">({movie.vote_count.toLocaleString()})</span>
          </span>
        </div>

        {movie.tagline && <p className="movie-tagline">"{movie.tagline}"</p>}

        <p className="movie-overview">{movie.overview}</p>

        {movie.genre.length > 0 && (
          <div className="movie-genres">
            {movie.genre.map((g) => (
              <span key={g} className="genre-tag">
                {g}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
