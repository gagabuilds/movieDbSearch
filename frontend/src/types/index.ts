export interface Movie {
    id: string;
    title: string;
    description: string;
    rating: number;
    imageUrl?: string;
}

export interface SearchState {
    isSearching: boolean;
    query: string;
    results: Movie[];
    error?: string;
}
