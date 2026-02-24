import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Loader2, Sparkles } from "lucide-react";

export function SearchSection({ onSearch, isSearching }: { onSearch: (query: string) => void; isSearching: boolean }) {
    const [query, setQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto mt-12 mb-8 relative z-10 px-4">
            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`relative group rounded-3xl overflow-hidden transition-all duration-300 ${isFocused ? 'ring-2 ring-purple-500/50 shadow-[0_0_40px_-10px_rgba(168,85,247,0.4)]' : 'shadow-lg hover:shadow-2xl hover:shadow-purple-500/10'}`}
            >
                <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-3xl" />

                <div className="relative flex items-center h-16 sm:h-20 px-6">
                    <Search className={`w-6 h-6 mr-4 transition-colors ${isFocused ? 'text-purple-400' : 'text-gray-400'}`} />

                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Describe the movie you're looking for..."
                        className="w-full bg-transparent border-none outline-none text-white text-lg placeholder-gray-500 font-light"
                    />

                    <div className="flex items-center gap-2">
                        {isSearching ? (
                            <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
                        ) : (
                            <button
                                type="submit"
                                disabled={!query.trim()}
                                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50 group-hover:scale-105 active:scale-95"
                            >
                                <Sparkles className={`w-5 h-5 ${query.trim() ? 'text-purple-400' : 'text-gray-600'}`} />
                            </button>
                        )}
                    </div>
                </div>
            </motion.form>

            {/* Suggestions or Examples - "Motion Primitive" vibe */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap justify-center gap-2 mt-4 text-sm text-gray-500"
            >
                <span className="mr-2">Try:</span>
                {["Space travel survival", "Mind-bending sci-fi", "Cyberpunk revolution"].map((term) => (
                    <button
                        key={term}
                        onClick={() => { setQuery(term); onSearch(term); }}
                        className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 hover:text-purple-300 transition-colors border border-transparent hover:border-purple-500/20 text-xs sm:text-sm"
                    >
                        {term}
                    </button>
                ))}
            </motion.div>
        </div>
    );
}
