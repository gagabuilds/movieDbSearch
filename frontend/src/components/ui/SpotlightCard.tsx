import { useRef, useState } from "react";
import { cn } from "../../lib/utils";

/**
 * SpotlightCard Component
 * - A container that illuminates its borders and background based on mouse proximity.
 * - Key Features:
 * - Proximity Lighting: Uses a large 600px radial gradient to "reveal" the card edges.
 * - Performance: Uses standard React state for coordinates (ideal for larger surface areas).
 * - Focus Support: Features 'onFocus' and 'onBlur' handlers for keyboard accessibility.
 */
export function SpotlightCard({
    children,
    className
}: {
    children: React.ReactNode;
    className?: string
}) {
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setOpacity(1)}
            onMouseLeave={() => setOpacity(0)}
            onFocus={() => { setIsFocused(true); setOpacity(1); }}
            onBlur={() => { setIsFocused(false); setOpacity(0); }}
            className={cn(
                "relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/50",
                "transition-all duration-300",
                className
            )}
        >
            {/* The Spotlight Overlay */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity: opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(168,85,247,0.15), transparent 40%)`,
                }}
            />

            {/* Focus Ring for Keyboard Navigation */}
            {isFocused && (
                <div className="absolute inset-0 pointer-events-none border-2 border-purple-500/20 rounded-xl animate-pulse" />
            )}

            <div className="relative z-10 h-full w-full">
                {children}
            </div>
        </div>
    );
}
