import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Calendar } from 'lucide-react';
import { type SearchState, type Movie } from '../types';
import { Sparkles } from './ui/Sparkles';
import { MovieBadge } from './ui/MovieBadge';
import { cn } from '../lib/utils';

interface ResultsSectionProps {
    searchState: SearchState;
    onSelectMovie: (movie: Movie) => void;
    className?: string;
}

/**
 * ResultsSection Component
 * - Displays a paginated list of AI-recommended movie results.
 * - Key Logic:
 * - 'useEffect': Automatically resets 'currentPage' to 1 whenever a new search is performed.
 * - Paginated Rendering: Slices the global result set based on 'PAGE_SIZE'.
 * - Background Bleed: Uses a low-opacity backdrop image ('opacity-20') with a 
 * left-to-right gradient to create an immersive card background.
 * - Responsive Handling: Swaps between small/large thumbnails and toggles genre 
 * visibility based on screen size.
 */
export const ResultsSection = ({ searchState, onSelectMovie, className }: ResultsSectionProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [prevResults, setPrevResults] = useState(searchState.results);
    const PAGE_SIZE = 5;

    // Reset pagination when results change during render (React recommended way to avoid effect cascades)
    if (searchState.results !== prevResults) {
        setPrevResults(searchState.results);
        setCurrentPage(1);
    }

    const totalPages = Math.ceil(searchState.results.length / PAGE_SIZE);
    const safePage = Math.max(1, Math.min(currentPage, totalPages));
    const paginatedResults = searchState.results.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={cn("w-full mt-8", className)}
        >
            {/* Header & Pagination Controls */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-2">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    AI Recommended
                </h2>

                {!searchState.isSearching && !searchState.error && searchState.results.length > PAGE_SIZE && (
                    <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 w-full md:w-auto scrollbar-hide">
                        {Array.from({ length: totalPages }).map((_, idx) => {
                            const pageNumber = idx + 1;
                            const rangeLabel = `${idx * PAGE_SIZE + 1}-${Math.min(pageNumber * PAGE_SIZE, searchState.results.length)}`;
                            return (
                                <button
                                    key={pageNumber}
                                    onClick={() => setCurrentPage(pageNumber)}
                                    className={cn(
                                        "px-2 py-1 rounded-lg whitespace-nowrap transition-colors text-xs font-medium border",
                                        safePage === pageNumber
                                            ? "bg-purple-500/20 text-purple-200 border-purple-500/30"
                                            : "bg-white/5 hover:bg-white/10 text-gray-300 border-white/5"
                                    )}
                                >
                                    {rangeLabel}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Loading / Error / Results States */}
            {searchState.isSearching ? (
                <div className="flex flex-col gap-3">
                    {[1, 2, 3].map((n) => (
                        <div key={n} className="h-24 w-full rounded-2xl bg-white/5 animate-pulse" />
                    ))}
                </div>
            ) : searchState.error ? (
                <div className="text-center py-10 text-red-400 bg-red-400/5 rounded-2xl border border-red-400/10">
                    {searchState.error}
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {paginatedResults.length === 0 ? (
                        <div className="text-center py-10 text-gray-500 border border-dashed border-white/10 rounded-2xl">
                            No movies matched your description.
                        </div>
                    ) : (
                        paginatedResults.map((movie, index) => {
                            const bgImage = movie.backdropUrl || movie.imageUrl;
                            return (
                                <motion.div
                                    key={movie.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => onSelectMovie(movie)}
                                    className={cn(
                                        "relative flex items-center overflow-hidden rounded-2xl border border-white/5 cursor-pointer group shadow-lg",
                                        "hover:border-purple-500/50 hover:shadow-purple-500/20 transition-all duration-300"
                                    )}
                                >
                                    {/* Immersive Background Layer */}
                                    <div className="absolute inset-0 z-0 pointer-events-none">
                                        {bgImage && (
                                            <img
                                                src={bgImage}
                                                alt=""
                                                className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
                                    </div>

                                    {/* Content Layer */}
                                    <div className="relative z-10 flex items-center gap-3 sm:gap-4 p-3 sm:p-4 w-full">
                                        {/* Thumbnail with Hover Zoom */}
                                        <div className="w-16 h-24 sm:w-24 sm:h-36 flex-shrink-0 rounded-xl overflow-hidden shadow-2xl border border-white/10">
                                            {movie.imageUrl ? (
                                                <img
                                                    src={movie.imageUrl}
                                                    alt={movie.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-white/5" />
                                            )}
                                        </div>

                                        <div className="flex-1 text-left py-1">
                                            <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-400 transition-colors drop-shadow-lg">
                                                {movie.title}
                                            </h3>

                                            {/* Badges Row */}
                                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1 mb-2">
                                                <MovieBadge icon={Star} text={`${movie.rating} Match`} variant="yellow" iconClassName="fill-current w-3.5 h-3.5" />
                                                {movie.voteAverage && <MovieBadge icon={Star} text={movie.voteAverage.toFixed(1)} variant="white" />}
                                                {movie.releaseYear && <MovieBadge icon={Calendar} text={movie.releaseYear} variant="blue" />}
                                            </div>

                                            <p className="text-[13px] sm:text-sm text-gray-300 line-clamp-2 leading-relaxed max-w-3xl drop-shadow-md">
                                                {movie.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })
                    )}
                </div>
            )}
        </motion.section>
    );
};