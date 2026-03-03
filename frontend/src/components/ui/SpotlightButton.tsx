import { useState, type MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "../../lib/utils";

/**
 * SpotlightButton Component
 * - A button that tracks the mouse position to render a dynamic radial gradient.
 * - Key Features:
 * - 'useMotionTemplate': Smoothly interpolates the gradient string as the mouse moves.
 * - 'active:scale-95': Provides tactile physical feedback on click.
 * - Masking: Uses a custom radial-gradient as a background to highlight the button 
 * edges only where the cursor is near.
 */
export function SpotlightButton({
    children,
    onClick,
    className
}: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string
}) {
    const radius = 100;
    const [visible, setVisible] = useState(false);

    // Framer Motion values update without triggering full React re-renders for performance
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.button
            style={{
                background: useMotionTemplate`
                    radial-gradient(
                        ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
                        var(--purple-500),
                        transparent 80%
                    )
                `,
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            onClick={onClick}
            className={cn(
                "relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/20",
                "px-8 py-3 text-sm font-medium text-white backdrop-blur-3xl transition duration-200",
                "group/btn hover:scale-105 active:scale-95 shadow-input",
                className
            )}
        >
            <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
                {children}
            </span>
            {/* Subtle horizontal shimmer effect */}
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100" />
        </motion.button>
    );
}
