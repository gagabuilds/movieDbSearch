import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "../../lib/utils";

interface TypingTextProps {
    text: string;
    className?: string;
    duration?: number;
    delay?: number;
    highlightWords?: Record<string, string>;
}

/**
 * TypingText Component
 * - An advanced text animator that "types" words onto the screen using physics-based transitions.
 * - Key Features:
 * - 'useInView': Triggers the animation only when the text enters the viewport.
 * - Staggered Reveal: Uses 'staggerChildren' to create a progressive reveal effect.
 * - Word Highlighting: Allows specific words to be targeted with custom CSS classes 
 * (e.g., gradients or glows) via the 'highlightWords' prop.
 * - Physics: Custom 'spring' settings (damping/stiffness) create a fluid, high-end feel.
 */
export function TypingText({ 
    text, 
    className, 
    duration = 0.05, 
    delay = 0,
    highlightWords = {} 
}: TypingTextProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const words = text.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { 
                staggerChildren: duration, 
                delayChildren: delay + 0.04 
            },
        },
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                damping: 20,   // Higher damping = less "bounce", more "fluid"
                stiffness: 80, // Lower stiffness = slower movement
                mass: 0.8      // Lower mass makes it feel lighter
            },
        },
        hidden: {
            opacity: 0,
            y: 15, // Reduced for a subtler slide-up
        },
    };

    return (
        <motion.h1
            ref={ref}
            style={{ display: "flex", flexWrap: "wrap" }}
            variants={container}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={cn("leading-tight", className)}
        >
            {words.map((word, index) => {
                // Remove punctuation to find matches in the highlight dictionary
                const cleanWord = word.replace(/[^a-zA-Z0-9-]/g, "");
                const highlightKey = Object.keys(highlightWords).find(key =>
                    cleanWord.toLowerCase() === key.toLowerCase()
                );
                const highlightClass = highlightKey ? highlightWords[highlightKey] : "";

                return (
                    <motion.span 
                        variants={child} 
                        key={`${word}-${index}`} 
                        className={cn("mr-[0.25em] inline-block", highlightClass)}
                    >
                        {word}
                    </motion.span>
                );
            })}
        </motion.h1>
    );
}