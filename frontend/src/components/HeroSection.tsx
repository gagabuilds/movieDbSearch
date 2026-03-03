import { motion } from 'framer-motion';
import { TypingText } from './ui/TypingText';
import { SearchSection } from './SearchSection';
import { cn } from '../lib/utils';

interface HeroSectionProps {
    onSearch: (query: string, limit: number) => void;
    isSearching: boolean;
    className?: string; // Added for flexibility
}

/**
 * Hero Section Component
 * - Acts as the primary landing interface for the movie search.
 * - Animation Choreography:
 * 1. Parent 'motion.div' slides up and fades in (0s - 1.2s).
 * 2. First 'TypingText' line starts immediately.
 * 3. Second 'TypingText' line begins after 0.8s for a conversational flow.
 * 4. Description and SearchBar fade in last (1.4s - 1.8s) to keep focus on the title.
 * - Styling: Uses 'bg-clip-text' to create high-contrast white and purple/blue gradients.
 */
export const HeroSection = ({ onSearch, isSearching, className }: HeroSectionProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className={cn("text-center max-w-3xl mx-auto", className)}
        >
            <div className="flex flex-col items-center mb-4">
                {/* Part 1: Animates immediately */}
                <TypingText
                    text="Find your next"
                    duration={0.1}
                    className={cn(
                        "text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight justify-center leading-[1.1]",
                        "bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60"
                    )}
                />

                {/* Part 2: Starts with a delay for visual rhythm */}
                <TypingText
                    text="cinematic journey"
                    duration={0.12}
                    delay={0.8}
                    className={cn(
                        "text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight justify-center leading-[1.1]",
                        "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
                    )}
                />
            </div>

            {/* Description: Fades in after titles finish (approx 1.8s delay) */}
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 1 }}
                className="text-sm sm:text-base text-gray-400 font-light mb-8 max-w-2xl mx-auto px-4 leading-relaxed"
            >
                Describe the vibe, plot, or feeling you're looking for, and let our AI curate the perfect movie list for you.
            </motion.p>

            {/* Search Input: Scales in slightly after the main text */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 }}
            >
                <SearchSection onSearch={onSearch} isSearching={isSearching} />
            </motion.div>
        </motion.div>
    );
};