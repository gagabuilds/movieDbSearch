export interface Movie {
    id: string;
    title: string;
    description: string;
    rating: number;
    imageUrl?: string;
    backdropUrl?: string;
    releaseYear?: number;
    genres?: string[] | string;
    voteAverage?: number;
    voteCount?: number;
}

export interface SearchState {
    isSearching: boolean;
    query: string;
    results: Movie[];
    error?: string;
}
