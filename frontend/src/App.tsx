import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { type SearchState, type Movie } from './types';
import { searchMovies } from './services/api';
import {
  Background,
  Header,
  HeroSection,
  ResultsSection,
  MovieDetailModal,
  Footer
} from './components';

function App() {
    /**
     * This is a single object that tracks everything related to the search:
     * 1. isSearching: A boolean (true/false) to show a loading spinner.
     * 2. query: The text the user typed.
     * 3. results: An array of movie data returned from the API.
     * 4. error: A message to show if something goes wrong.
     */ 
    const [searchState, setSearchState] = useState<SearchState>({
    isSearching: false,
    query: '',
    results: [],
    error: undefined,
  });

  /** 
   * Stores the data for a specific movie when you click on it (used to open the modal).
  */
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  /**
   * A simple flag to know if the user has performed at least one search yet 
   * (prevents showing an empty results section on page load)
   */
  const [hasSearched, setHasSearched] = useState(false);

  /**
   * This is an async function that talks to the outside world. Here is the step-by-step logic:
   * Loading State: It immediately sets isSearching to true so the UI can react.
   * API Call: It calls searchMovies(query, limit). Note the use of await, which pauses the function until the data comes back.
   * Success: If the movies arrive, it saves them into the results state.
   * Error Handling: The try...catch block ensures that if the internet dies or the API fails, the app doesn't crash; it just shows a "Failed to fetch" message.
   */
  const handleSearch = async (query: string, limit: number) => {
    setSearchState((prev: SearchState) => ({ ...prev, isSearching: true, query, error: undefined }));
    setHasSearched(true);

    try {
      const { movies } = await searchMovies(query, limit);
      setSearchState((prev: SearchState) => ({
        ...prev,
        isSearching: false,
        results: movies,
      }));
    } catch {
      setSearchState((prev: SearchState) => ({
        ...prev,
        isSearching: false,
        error: "Failed to fetch movies. Please try again."
      }));
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-purple-500/30">
      <Background />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        <Header />

        <main className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
          <HeroSection onSearch={handleSearch} isSearching={searchState.isSearching} />

          <AnimatePresence>
            {hasSearched && (
              <ResultsSection
                searchState={searchState}
                onSelectMovie={setSelectedMovie}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {selectedMovie && (
              <MovieDetailModal
                movie={selectedMovie}
                onClose={() => setSelectedMovie(null)}
              />
            )}
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
