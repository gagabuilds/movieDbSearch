import { cn } from "../lib/utils"; // Adjust path as needed
import { StatusIndicator } from './StatusIndicator';

/**
 * Footer Component
 * - Provides a subtle, low-contrast footer section with a top border.
 * - Displays the system status via <StatusIndicator /> and the copyright.
 * - Uses 'border-white/5' for a minimal, sophisticated separator on dark themes.
 */
export const Footer = ({ className }: { className?: string }) => (
    <footer 
        className={cn(
            "mt-8 py-8 border-t border-white/5 text-center text-gray-600 text-sm", 
            className
        )}
    >
        <StatusIndicator />
        <p>© 2026 CineMatch AI. All rights reserved.</p>
    </footer>
);