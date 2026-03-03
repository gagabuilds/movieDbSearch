import { LogIn } from 'lucide-react';
import { Button } from './ui/Button';
import { cn } from "../lib/utils"; // Adjust path as needed
import logoUrl from '../assets/logo.svg';

/**
 * Global Header Component
 * - Navigation and brand identity layer.
 * - Features:
 * - 'z-10': Ensures the header stays above ambient background glows.
 * - Logo with custom drop-shadow for a "glowing" effect.
 * - Responsive navigation: 'hidden md:flex' hides menu items on mobile devices.
 * - Integration with a custom 'glass' variant Button.
 */
export const Header = ({ className }: { className?: string }) => (
    <header className={cn("flex items-center justify-between mb-8 relative z-10", className)}>
        {/* Brand Logo & Identity */}
        <div className="flex items-center gap-2">
            <img 
                src={logoUrl} 
                alt="CineMatch Logo" 
                className="w-8 h-8 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]" 
            />
            <span className="text-lg font-bold tracking-tight">
                Cine<span className="text-purple-400">Match</span>.ai
            </span>
        </div>

        {/* Navigation Links & Actions */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Discover</a>
            <a href="#" className="hover:text-white transition-colors">For You</a>
            <a href="#" className="hover:text-white transition-colors">About</a>
            
            <Button variant="glass" className="rounded-full gap-2 px-6">
                <LogIn className="w-4 h-4" />
                <span>Login</span>
            </Button>
        </nav>
    </header>
);