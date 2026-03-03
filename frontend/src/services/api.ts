import type { Movie } from "../types";

export interface SearchResponse {
    movies: Movie[];
    aiReason?: string;
}

export async function searchMovies(query: string, limit: number = 10): Promise<SearchResponse> {
    if (!query.trim()) {
        return { movies: [] };
    }

    // Always use the Vite proxy in the browser so we bypass the self-signed 
    // certificate error (`ERR_CERT_AUTHORITY_INVALID`) automatically.
    const apiUrl = '/api';

    try {
        const response = await fetch(`${apiUrl}/search?q=${encodeURIComponent(query)}&limit=${limit}`);

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        const data = await response.json();

        // Map the python/nestjs response to the frontend Movie type
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const movies: Movie[] = (data.movies || []).map((m: any, index: number) => {
            const plot = m.overview || m.plot || "No description available";
            const imagePath = m.poster_path || m.url;
            let imageUrl = "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=2070&auto=format&fit=crop";
            if (imagePath) {
                if (imagePath.startsWith('/')) {
                    imageUrl = `https://image.tmdb.org/t/p/w500${imagePath}`;
                } else if (imagePath.startsWith('http') && (imagePath.endsWith('.jpg') || imagePath.endsWith('.png'))) {
                    imageUrl = imagePath;
                }
            }
            const matchScore = m.similarity_score !== undefined ? m.similarity_score : m.match_score;

            const backdropPath = m.backdrop_path;
            let backdropUrl;
            if (backdropPath) {
                if (backdropPath.startsWith('/')) {
                    backdropUrl = `https://image.tmdb.org/t/p/w1280${backdropPath}`;
                } else if (backdropPath.startsWith('http')) {
                    backdropUrl = backdropPath;
                }
            }

            return {
                id: `movie-${m.tmdb_id || index}`,
                title: m.title,
                description: plot,
                // Convert match score to a 10-point scale decimal rating
                rating : (matchScore !== null && matchScore !== undefined) ? parseFloat((Number(matchScore) * 10).toFixed(1)) : 8.0,
                imageUrl,
                backdropUrl,
                releaseYear: m.release_year,
                genres: m.genre,
                voteAverage: m.vote_average,
                voteCount: m.vote_count
            };
        });

        return {
            movies,
            aiReason: "Here are the best matches for your description."
        };
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
    }
}
