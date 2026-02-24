import type { Movie } from "../types";

export interface SearchResponse {
    movies: Movie[];
    aiReason?: string;
}

const MOCKED_MOVIES: Movie[] = [
    {
        id: "1",
        title: "Inception",
        description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        rating: 8.8,
        imageUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: "2",
        title: "Interstellar",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        rating: 8.6,
        imageUrl: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=2713&auto=format&fit=crop"
    },
    {
        id: "3",
        title: "The Matrix",
        description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        rating: 8.7,
        imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2670&auto=format&fit=crop"
    }
];

export async function searchMovies(query: string): Promise<SearchResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (!query.trim()) {
        return { movies: [] };
    }

    // Basic mock filtering
    const filtered = MOCKED_MOVIES.filter(m =>
        m.title.toLowerCase().includes(query.toLowerCase()) ||
        m.description.toLowerCase().includes(query.toLowerCase())
    );

    // If no direct match, return all just for demo to show "AI matching"
    const results = filtered.length > 0 ? filtered : MOCKED_MOVIES;

    return {
        movies: results,
        aiReason: filtered.length === 0 ? "Showing these recommendations based on similar themes..." : "Here are the best matches for your description."
    };
}
