import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'outline' | 'ghost' | 'glass';
    size?: 'default' | 'sm' | 'lg' | 'icon';
}

/**
 * Custom Button Component
 * - A polymorphic button with built-in state handling and cinematic styling.
 * - Key Features:
 * - 'active:scale-95': Adds a tactile "click" sensation without custom JS.
 * - Variants:
 * - 'glass': The signature style for CineMatch, using backdrop-blur and subtle borders.
 * - 'outline': High-visibility purple accents for secondary actions.
 * - ForwardRef: Enables seamless integration with libraries like Framer Motion or Tooltips.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'default', size = 'default', ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    // Base classes: Alignment, transitions, and touch feedback
                    "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200",
                    "disabled:pointer-events-none disabled:opacity-50 active:scale-95",
                    
                    // Variant Logic
                    variant === 'default' && "bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-500/20",
                    variant === 'outline' && "border border-purple-500/30 bg-purple-500/10 text-purple-200 hover:bg-purple-500/20",
                    variant === 'ghost'   && "hover:bg-white/10 text-gray-400 hover:text-white",
                    variant === 'glass'   && "bg-white/5 border border-white/10 text-white hover:bg-white/10 backdrop-blur-sm",

                    // Size Logic
                    size === 'default' && "h-10 px-4 py-2",
                    size === 'sm'      && "h-9 rounded-md px-3",
                    size === 'lg'      && "h-11 rounded-md px-8 text-base",
                    size === 'icon'    && "h-10 w-10",

                    className
                )}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }