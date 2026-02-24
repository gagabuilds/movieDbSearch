import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SearchSection } from './components/SearchSection'
import { MovieCard } from './components/MovieCard'
import { type SearchState } from './types'
import { searchMovies } from './services/api'
import { Film, LogIn, Filter } from 'lucide-react'
import { TypingText } from './components/ui/TypingText'

function App() {
  const [searchState, setSearchState] = useState<SearchState>({
    isSearching: false,
    query: '',
    results: [],
    error: undefined,
  })

  // Mock initial featured movies or just empty state
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (query: string) => {
    setSearchState(prev => ({ ...prev, isSearching: true, query, error: undefined }))
    setHasSearched(true)

    try {
      const { movies } = await searchMovies(query);
      setSearchState(prev => ({
        ...prev,
        isSearching: false,
        results: movies,
        // We could store aiReason in state if we want to display it
      }))
    } catch (err) {
      setSearchState(prev => ({
        ...prev,
        isSearching: false,
        error: "Failed to fetch movies. Please try again."
      }))
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-purple-500/30">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        <header className="flex items-center justify-between mb-20">
          <div className="flex items-center gap-2">
            <Film className="w-8 h-8 text-purple-500" />
            <span className="text-xl font-bold tracking-tight">Cine<span className="text-purple-400">Match</span>.ai</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Discover</a>
            <a href="#" className="hover:text-white transition-colors">For You</a>
            <a href="#" className="hover:text-white transition-colors">About</a>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all hover:scale-105 active:scale-95">
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </button>
          </nav>
        </header>

        <main className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-3xl"
          >
            <div className="flex flex-col items-center mb-6">
              <TypingText
                text="Find your next cinematic journey"
                className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 justify-center"
                highlightWords={{ "cinematic": "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400", "journey": "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400" }}
              />
            </div>
            <p className="text-lg md:text-xl text-gray-400 font-light mb-12 max-w-2xl mx-auto">
              Describe the vibe, plot, or feeling you're looking for, and let our AI curate the perfect movie list for you.
            </p>

            <SearchSection onSearch={handleSearch} isSearching={searchState.isSearching} />
          </motion.div>

          <AnimatePresence>
            {hasSearched && (
              <motion.section
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="w-full mt-24"
              >
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                  <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    AI Recommended
                  </h2>

                  {/* Guided Navigation Controls */}
                  {!searchState.isSearching && !searchState.error && (
                    <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 w-full md:w-auto scrollbar-hide">
                      <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-200 text-xs font-medium border border-purple-500/30 whitespace-nowrap">
                        <Filter className="w-3 h-3" /> All Results
                      </button>
                      {["Top Rated", "Available on Stream", "Hidden Gems", "Sci-Fi"].map(tag => (
                        <button key={tag} className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium border border-white/5 transition-colors whitespace-nowrap">
                          {tag}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {searchState.isSearching ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((n) => (
                      <div key={n} className="aspect-[4/5] rounded-2xl bg-white/5 animate-pulse" />
                    ))}
                  </div>
                ) : searchState.error ? (
                  <div className="text-center py-20 text-red-400">{searchState.error}</div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {searchState.results.map((movie, index) => (
                      <MovieCard key={movie.id} movie={movie} index={index} />
                    ))}
                  </div>
                )}
              </motion.section>
            )}
          </AnimatePresence>
        </main>

        <footer className="mt-32 py-8 border-t border-white/5 text-center text-gray-600 text-sm">
          <p>© 2024 CineMatch AI. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

function Sparkles({ className }: { className?: string }) {
  // Simple SVG icon wrapper if not importing from lucide-react 
  // (though I imported it above, good practice to be safe or use lucide directly)
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  )
}

export default App
