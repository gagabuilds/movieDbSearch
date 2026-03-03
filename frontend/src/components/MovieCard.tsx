import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { Movie } from "../types";
import { SpotlightCard } from "./ui/SpotlightCard";
import { cn } from "../lib/utils";

/**
 * MovieCard Component
 * - Individual card display for search results with immersive hover effects.
 * - Interaction Features:
 * - Staggered Animation: Uses 'index * 0.1' delay so cards pop in one by one.
 * - Image Zoom: 'group-hover:scale-110' creates depth on interaction.
 * - Smart Overlay: A gradient overlay darkens on hover to improve text readability.
 * - Progressive Disclosure: The description is hidden by default ('opacity-0') 
 * and slides up/fades in only when the user hovers over the card.
 */
export function MovieCard({
    movie,
    index,
    className
}: {
    movie: Movie;
    index: number;
    className?: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={cn("h-full", className)}
        >
            <SpotlightCard className={cn(
                "group h-full bg-white/5 backdrop-blur-sm relative overflow-hidden",
                "border-white/10 hover:border-white/20 transition-all duration-300"
            )}>
                {/* Poster Image Container */}
                <div className="aspect-[4/5] w-full overflow-hidden">
                    {movie.imageUrl ? (
                        <img
                            src={movie.imageUrl}
                            alt={movie.title}
                            className={cn(
                                "h-full w-full object-cover",
                                "transition-transform duration-700 ease-out group-hover:scale-110"
                            )}
                        />
                    ) : (
                        <div className="h-full w-full bg-gradient-to-br from-purple-500/20 to-blue-500/20" />
                    )}

                    {/* Dark gradient for text legibility */}
                    <div className={cn(
                        "absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent",
                        "opacity-70 transition-opacity duration-300 group-hover:opacity-90"
                    )} />
                </div>

                {/* Content Overlay */}
                <div className={cn(
                    "absolute bottom-0 left-0 right-0 p-6",
                    "translate-y-4 transform transition-transform duration-300",
                    "group-hover:translate-y-0"
                )}>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors duration-300">
                        {movie.title}
                    </h3>

                    <div className="flex items-center gap-1 mb-2 text-yellow-400">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm font-medium text-white/90">{movie.rating}</span>
                    </div>

                    {/* Hidden description that reveals on hover */}
                    <p className={cn(
                        "text-sm text-gray-300 line-clamp-2",
                        "opacity-0 group-hover:opacity-100",
                        "transition-all duration-300 delay-100"
                    )}>
                        {movie.description}
                    </p>
                </div>
            </SpotlightCard>
        </motion.div>
    );
}