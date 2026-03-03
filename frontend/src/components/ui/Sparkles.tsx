import { cn } from "../../lib/utils";

/**
 * Sparkles Icon Component
 * - A custom SVG representing the "AI/Magic" metaphor used throughout the app.
 * - Key Features:
 * - 'stroke="currentColor"': Allows the icon to inherit colors from Tailwind 
 * utility classes (e.g., 'text-purple-400').
 * - Geometry: A four-pointed star (diamond star) designed to look sharp 
 * and modern at small scales (16px - 24px).
 * - Performance: Minimal path data ensures near-instant rendering 
 * compared to loading an entire icon library.
 */
export function Sparkles({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]", className)}
        >
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        </svg>
    );
}