import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Loader2, Sparkles } from "lucide-react";
import { Button } from "./ui/Button";
import { LimitSlider } from "./ui/LimitSlider";
import { cn } from "../lib/utils";

interface SearchSectionProps {
    onSearch: (query: string, limit: number) => void; 
    isSearching: boolean;
    className?: string;
}

/**
 * SearchSection Component
 * - The primary input interface with integrated AI-suggestion shortcuts.
 * - Key Features:
 * - Dynamic Glow: Uses 'isFocused' to toggle a purple outer glow and ring.
 * - Glassmorphism: Combines 'bg-gray-900/40' with 'backdrop-blur-xl' for a frosted-glass effect.
 * - Input State Handling: Manages query strings and search limits (via <LimitSlider />).
 * - Suggested Queries: One-click buttons that instantly trigger a search, 
 * lowering the "blank slate" friction for new users.
 */
export function SearchSection({ onSearch, isSearching, className }: SearchSectionProps) {
    const [query, setQuery] = useState("");
    const [limit, setLimit] = useState(10);
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim(), limit);
        }
    };

    return (
        <div className={cn("w-full max-w-3xl mx-auto mt-4 mb-2 relative z-10 px-4", className)}>
            {/* Main Search Input Form */}
            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={cn(
                    "relative group rounded-3xl overflow-hidden transition-all duration-300",
                    isFocused
                        ? "ring-2 ring-purple-500/50 shadow-[0_0_40px_-10px_rgba(168,85,247,0.4)]"
                        : "shadow-lg hover:shadow-2xl hover:shadow-purple-500/10"
                )}
            >
                {/* Background Layer with Blur */}
                <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-3xl" />

                <div className="relative flex items-center h-12 sm:h-14 px-4">
                    <Search className={cn(
                        "w-5 h-5 mr-3 transition-colors duration-300",
                        isFocused ? "text-purple-400" : "text-gray-400"
                    )} />

                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Describe the movie you're looking for..."
                        className="w-full bg-transparent border-none outline-none text-white text-base placeholder-gray-500 font-light"
                    />

                    {/* Action Button / Loading Spinner */}
                    <div className="flex items-center gap-2">
                        {isSearching ? (
                            <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
                        ) : (
                            <Button
                                type="submit"
                                variant="glass"
                                size="icon"
                                disabled={!query.trim()}
                                className="rounded-full hover:scale-105 active:scale-95 transition-all"
                            >
                                <Sparkles className={cn(
                                    "w-4 h-4 transition-colors",
                                    query.trim() ? "text-purple-400" : "text-gray-600"
                                )} />
                            </Button>
                        )}
                    </div>
                </div>
            </motion.form>

            {/* Slider for result limit */}
            <LimitSlider limit={limit} setLimit={setLimit} />

            {/* Suggestion Chips */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap justify-center gap-2 mt-4 text-sm text-gray-500"
            >
                <span className="flex items-center text-xs uppercase tracking-widest text-gray-600 font-semibold mr-1">
                    Try:
                </span>
                {["Space survival", "Neon Cyberpunk", "Parallel Universe Thriller", "Gothic Victorian Horror", "Cozy Ghibli vibes"].map((term) => (
                    <Button
                        key={term}
                        variant="glass"
                        onClick={() => { 
                            setQuery(term); 
                            onSearch(term, limit); 
                        }}
                        className={cn(
                            "rounded-full text-xs sm:text-sm h-8 px-4 font-normal text-gray-400 border-white/5",
                            "hover:text-purple-300 hover:border-purple-500/20 hover:bg-purple-500/5 transition-all"
                        )}
                    >
                        {term}
                    </Button>
                ))}
            </motion.div>
        </div>
    );
}