import { useRef, useState, type MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export function SpotlightButton({ children, onClick, className = "" }: { children: React.ReactNode; onClick?: () => void; className?: string }) {
    const radius = 100; // chang to make radius larger/smaller
    const [visible, setVisible] = useState(false);

    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        let { left, top } = currentTarget.getBoundingClientRect();

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
            className={`relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/20 px-8 py-3 text-sm font-medium text-white shadow-input backdrop-blur-3xl transition duration-200 group/btn hover:scale-105 active:scale-95 ${className}`}
        >
            <span className="absolute inset-0 block h-full w-full bg-[radial-gradient(var(--mask-size)_circle_at_var(--mouse-x)_var(--mouse-y),var(--purple-500),transparent_80%)] opacity-0 group-hover/btn:opacity-100" />
            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100" />
        </motion.button>
    );
}

export function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handlMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setIsFocused(true);
        setOpacity(1);
    };

    const handleBlur = () => {
        setIsFocused(false);
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handlMouseMove}
            onMouseEnter={() => setOpacity(1)}
            onMouseLeave={() => setOpacity(0)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 ${className}`}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity: opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(168,85,247,0.15), transparent 40%)`,
                }}
            />
            {/* Hidden focus indicator if needed, or just let isFocused drive logic implicitly through setOpacity */}
            {isFocused && <div className="absolute inset-0 pointer-events-none border-2 border-purple-500/20 rounded-xl" />}
            {children}
        </div>
    );
}
