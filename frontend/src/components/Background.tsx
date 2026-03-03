import { cn } from "../lib/utils"; // Adjust this path to where your cn function lives

/**
 * Ambient Background Component
 * - Creates a cinematic "Glassmorphism" effect using blurred radial gradients.
 * - Key Features:
 * - 'fixed inset-0': Locks the background to the viewport during scrolls.
 * - 'pointer-events-none': Ensures the background doesn't block clicks on buttons/inputs.
 * - 'blur-[120px]': Softens colored circles into ambient glows for a high-end UI feel.
 */
export const Background = ({ className }: { className?: string }) => (
  <div className={cn("fixed inset-0 z-0 pointer-events-none", className)}>
    {/* Top-left purple glow */}
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px]" />
    
    {/* Bottom-right blue glow */}
    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
  </div>
);