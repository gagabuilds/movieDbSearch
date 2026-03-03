import { useState, useEffect } from "react";
import { cn } from "../lib/utils";

/**
 * StatusIndicator Component
 * - Connectivity badge for the CineMatch AI backend.
 * - Key Features:
 * - One-time Connectivity Check: Verifies backend availability on initial mount.
 * - Dynamic Visual States: 
 * - Online: Green dot with a pulsing 'animate-ping' radar effect.
 * - Local/Offline: Solid yellow dot indicating a fallback or disconnected state.
 * - Glassmorphism: Matches the global UI with 'backdrop-blur-sm' and 'bg-white/5'.
 */
export function StatusIndicator({ className }: { className?: string }) {
    const [isOnline, setIsOnline] = useState<boolean>(false);

    useEffect(() => {
        // Simple health check to verify backend availability
        fetch('/api/health')
            .then((res) => {
                setIsOnline(res.ok);
            })
            .catch(() => setIsOnline(false));
    }, []);
    
    return (
        <div className={cn(
            "inline-flex items-center gap-2 px-3 py-1.5 rounded-full",
            "bg-white/5 border border-white/10 text-xs font-medium text-gray-400",
            "backdrop-blur-sm transition-colors hover:bg-white/10 mb-4 mx-auto w-fit",
            className
        )}>
            {/* Status LED with Ping Effect */}
            <span className="relative flex h-2.5 w-2.5">
                {isOnline && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                )}
                <span
                    className={cn(
                        "relative inline-flex rounded-full h-2.5 w-2.5 shadow-sm transition-colors duration-500",
                        isOnline ? "bg-green-500" : "bg-yellow-500"
                    )}
                    title={isOnline ? 'Backend Connected' : 'Local Mode'}
                />
            </span>
            
            {/* Status Label */}
            <span className="tracking-wide">
                {isOnline ? 'System Online' : 'Local Mode'}
            </span>
        </div>
    );
}