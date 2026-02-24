import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TypingTextProps {
    text: string;
    className?: string;
    duration?: number;
    highlightWords?: Record<string, string>; // word -> color class
}

export function TypingText({ text, className, duration = 0.05, highlightWords = {} }: TypingTextProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const words = text.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: duration, delayChildren: 0.04 * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 200,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 200,
            },
        },
    };

    return (
        <motion.h1
            ref={ref}
            style={{ display: "flex", flexWrap: "wrap" }}
            variants={container}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={className}
        >
            {words.map((word, index) => {
                const cleanWord = word.replace(/[^a-zA-Z0-9-]/g, "");
                const highlightClass = Object.keys(highlightWords).find(key =>
                    cleanWord.toLowerCase() === key.toLowerCase()
                ) ? highlightWords[Object.keys(highlightWords).find(key => cleanWord.toLowerCase() === key.toLowerCase())!] : "";

                return (
                    <motion.span variants={child} key={index} className={`mr-[0.25em] ${highlightClass}`}>
                        {word}
                    </motion.span>
                );
            })}
        </motion.h1>
    );
}
