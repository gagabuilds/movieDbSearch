import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { Movie } from "../types";
import { SpotlightCard } from "./ui/Spotlight";

export function MovieCard({ movie, index }: { movie: Movie; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="h-full"
        >
            <SpotlightCard className="group h-full bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20">
                <div className="aspect-[4/5] w-full overflow-hidden">
                    {movie.imageUrl ? (
                        <img
                            src={movie.imageUrl}
                            alt={movie.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className="h-full w-full bg-gradient-to-br from-purple-500/20 to-blue-500/20" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 transform transition-transform duration-300 group-hover:translate-y-0">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">
                        {movie.title}
                    </h3>

                    <div className="flex items-center gap-1 mb-2 text-yellow-400">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm font-medium">{movie.rating}</span>
                    </div>

                    <p className="text-sm text-gray-300 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        {movie.description}
                    </p>
                </div>
            </SpotlightCard>
        </motion.div>
    );
}
