import { motion } from 'framer-motion';
import { cn } from "../../lib/utils"

interface LimitSliderProps {
    limit: number;
    setLimit: (limit: number) => void;
    min?: number;
    max?: number;
    className?: string;
}

/**
 * LimitSlider Component
 * - Provides a granular control for the number of movie results returned by the AI.
 * - Key Features:
 * - Dynamic Value Display: Shows the current limit in a bold purple accent to 
 * match the 'CineMatch' brand identity.
 * - Performance-Ready: Uses a native HTML5 range input, styled with Tailwind's 
 * 'accent' property for cross-browser consistency.
 * - UX Rhythm: Included in the staggered entrance animation of the search section 
 * with a 0.3s delay.
 */
export const LimitSlider = ({ 
    limit, 
    setLimit, 
    min = 1, 
    max = 50, 
    className 
}: LimitSliderProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={cn(
                "flex flex-col items-center justify-center gap-2 mt-6 mb-4 w-full max-w-sm mx-auto",
                className
            )}
        >
            {/* Label and Value Preview */}
            <div className="flex w-full justify-between items-center text-sm px-2">
                <span className="text-gray-500 font-medium tracking-wide text-xs uppercase">
                    Max Results
                </span>
                <span className="text-purple-400 font-bold tabular-nums">
                    {limit}
                </span>
            </div>

            {/* Styled Native Range Input */}
            <input
                type="range"
                min={min}
                max={max}
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className={cn(
                    "w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer",
                    "accent-purple-500 hover:accent-purple-400",
                    "focus:outline-none focus:ring-2 focus:ring-purple-500/30",
                    "transition-all duration-200"
                )}
            />
        </motion.div>
    );
};