import React from 'react';
import { cn } from '../../lib/utils';
import type { LucideIcon } from 'lucide-react';

export interface MovieBadgeProps {
    icon?: LucideIcon;
    text: React.ReactNode;
    variant?: 'yellow' | 'white' | 'blue' | 'purple';
    className?: string;
    iconClassName?: string;
}

/**
 * MovieBadge Component
 * - A high-density metadata tag for movie attributes (Ratings, Year, Genres).
 * - Key Features:
 * - Color System: Uses curated 'variantStyles' with 10% opacity backgrounds 
 * and 20% opacity borders for a subtle "glow" effect.
 * - Responsive Sizing: Automatically scales icon and text size between 
 * mobile and desktop viewports.
 * - Drop Shadows: Applies 'drop-shadow-md' to the text to ensure legibility 
 * over complex background artwork in the Hero or Modal sections.
 */
export const MovieBadge = ({
    icon: Icon,
    text,
    variant = 'white',
    className,
    iconClassName
}: MovieBadgeProps) => {

    // Centralized theme map for easy maintenance
    const variantStyles = {
        yellow: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",
        white: "bg-white/5 border-white/10 text-white/70",
        blue: "bg-blue-500/10 border-blue-500/20 text-blue-300",
        purple: "bg-purple-500/10 border-purple-500/20 text-purple-300"
    };

    return (
        <div className={cn(
            "flex items-center gap-1.5 px-2 py-0.5 rounded border transition-colors duration-300",
            variantStyles[variant],
            className
        )}>
            {/* Render icon only if provided; uses Icon component directly from props */}
            {Icon && (
                <Icon 
                    className={cn("w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0", iconClassName)} 
                    aria-hidden="true" 
                />
            )}
            
            <span className="font-medium text-[10px] sm:text-xs tracking-wide drop-shadow-md">
                {text}
            </span>
        </div>
    );
};