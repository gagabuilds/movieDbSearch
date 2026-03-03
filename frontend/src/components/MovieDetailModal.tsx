import { motion } from 'framer-motion';
import { X, Star, Calendar, Tag } from 'lucide-react';
import type { Movie } from '../types';
import { MovieBadge } from './ui/MovieBadge';
import { cn } from '../lib/utils';

interface MovieDetailModalProps {
    movie: Movie | null;
    onClose: () => void;
    className?: string;
}

/**
 * MovieDetailModal Component
 * - An immersive, full-screen modal providing detailed movie information.
 * - Key Features:
 * - Backdrop Blur: 'backdrop-blur-md' on the overlay focuses attention on the modal.
 * - Event Handling: 'e.stopPropagation()' on the inner container prevents the modal 
 * from closing when clicking inside the content area.
 * - Physics-based Animation: Uses 'spring' transition for a snappy, natural feel.
 * - Layered UI: Combines a backdrop image ('mix-blend-screen') with a 
 * content-first foreground for a cinematic depth effect.
 */
export const MovieDetailModal = ({ movie, onClose, className }: MovieDetailModalProps) => {
    if (!movie) return null;

    const bgImage = movie.backdropUrl || movie.imageUrl;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
                "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md",
                className
            )}
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 30 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-5xl relative bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            >
                {/* Close Button: Higher Z-index and backdrop blur for visibility over artwork */}
                <button
                    onClick={onClose}
                    className={cn(
                        "absolute top-4 right-4 z-50 p-2 rounded-full text-white/70 hover:text-white transition-all",
                        "bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/10"
                    )}
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="relative w-full aspect-[4/3] sm:aspect-video max-h-[85vh]">
                    {/* Background Artwork Layer */}
                    {bgImage ? (
                        <img
                            src={bgImage}
                            alt={`${movie.title} Backdrop`}
                            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen"
                        />
                    ) : (
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-900/40 to-blue-900/40" />
                    )}

                    {/* Gradient Overlay: Ensures text is readable regardless of the image behind it */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />

                    {/* Content Layer: Poster + Text */}
                    <div className="absolute inset-0 flex flex-col sm:flex-row items-end p-6 sm:p-10 gap-6 sm:gap-10">
                        {/* High-Resolution Thumbnail */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="hidden sm:block flex-shrink-0 w-40 lg:w-56 aspect-[2/3] rounded-xl overflow-hidden border border-white/20 shadow-2xl relative group"
                        >
                            {movie.imageUrl ? (
                                <img
                                    src={movie.imageUrl}
                                    alt={movie.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            ) : (
                                <div className="w-full h-full bg-purple-900/30 flex items-center justify-center">
                                    <span className="text-white/30 text-xs text-center px-4">No Poster Available</span>
                                </div>
                            )}
                        </motion.div>

                        {/* Title, Badges, and Synopsis */}
                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex-1 w-full"
                        >
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                                {movie.title}
                            </h2>

                            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 text-sm font-medium">
                                <MovieBadge
                                    icon={Star}
                                    text={`${movie.rating} AI Match`}
                                    variant="yellow"
                                    className="px-3 py-1.5 rounded-full shadow-lg text-sm"
                                    iconClassName="fill-current w-4 h-4"
                                />

                                {typeof movie.voteAverage === 'number' && (
                                    <MovieBadge
                                        icon={Star}
                                        text={`${movie.voteAverage.toFixed(1)} / 10 User Rating`}
                                        variant="white"
                                        className="px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md text-sm"
                                        iconClassName="w-4 h-4"
                                    />
                                )}

                                {movie.releaseYear && (
                                    <MovieBadge
                                        icon={Calendar}
                                        text={movie.releaseYear}
                                        variant="blue"
                                        className="px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md text-sm"
                                        iconClassName="w-4 h-4"
                                    />
                                )}

                                {movie.genres && (
                                    <MovieBadge
                                        icon={Tag}
                                        text={Array.isArray(movie.genres) ? movie.genres.join(', ') : movie.genres}
                                        variant="purple"
                                        className="px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md text-sm"
                                        iconClassName="w-4 h-4"
                                    />
                                )}
                            </div>

                            <div className="bg-black/40 backdrop-blur-md p-5 rounded-xl border border-white/5">
                                <h3 className="text-white/60 text-xs uppercase tracking-wider mb-2 font-semibold">Synopsis</h3>
                                <p className="text-gray-300 leading-relaxed text-sm sm:text-base max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pr-2">
                                    {movie.description}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};