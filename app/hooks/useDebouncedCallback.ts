import { useRef, useCallback } from "react";

export const useDebouncedCallback = <T extends (...args: any[]) => void>(callback: T, delay: number) => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isCooldown = useRef(false);

    return useCallback((...args: Parameters<T>) => {
        if (!isCooldown.current) {
            // Execute the function immediately
            callback(...args);
            isCooldown.current = true;

            // Set cooldown period
            timeoutRef.current = setTimeout(() => {
                isCooldown.current = false;
            }, delay);
        }
    }, [callback, delay]);
};