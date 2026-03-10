const API_BASE = '/api';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

export interface Movie {
  title: string;
  tmdb_id: number;
  overview: string;
  tagline: string;
  poster_path: string | null;
  release_year: number;
  genre: string[];
  vote_average: number;
  vote_count: number;
  backdrop_path: string | null;
  similarity_score: number;
}

export interface SearchResponse {
  movies: Movie[];
}

export interface User {
  id: string;
  email: string;
  username: string;
  avatarUrl: string | null;
  isTwoFactorEnabled?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  message: string;
  access_token?: {
    access_token: string;
    user: Pick<User, 'id' | 'email' | 'username' | 'avatarUrl'>;
  };
  user?: User;
}

export function getPosterUrl(path: string | null): string | null {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE}${path}`;
}

export async function searchMovies(query: string, limit = 10): Promise<SearchResponse> {
  const params = new URLSearchParams({ q: query, limit: String(limit) });
  const res = await fetch(`${API_BASE}/search?${params}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Search failed' }));
    throw new Error((err as { message?: string }).message ?? 'Search failed');
  }
  return res.json() as Promise<SearchResponse>;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Login failed' }));
    throw new Error((err as { message?: string }).message ?? 'Login failed');
  }
  return res.json() as Promise<AuthResponse>;
}

export async function register(
  email: string,
  username: string,
  password: string,
): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, username, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Registration failed' }));
    throw new Error((err as { message?: string }).message ?? 'Registration failed');
  }
  return res.json() as Promise<AuthResponse>;
}

export async function getProfile(token: string): Promise<{ message: string; user: User }> {
  const res = await fetch(`${API_BASE}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch profile');
  }
  return res.json() as Promise<{ message: string; user: User }>;
}
