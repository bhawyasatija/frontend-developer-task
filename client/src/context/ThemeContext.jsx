import { createContext, useContext, useEffect, useState } from 'react';

/**
 * Theme Context
 * Manages dark/light mode with localStorage persistence
 * and system preference detection
 */

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        // Check localStorage first
        const stored = localStorage.getItem('theme');
        if (stored) return stored;

        // Fall back to system preference
        if (typeof window !== 'undefined') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light';
        }
        return 'dark';
    });

    const [isTransitioning, setIsTransitioning] = useState(false);

    // Apply theme + persist preference
    useEffect(() => {
        const root = document.documentElement;

        // Start transition
        setIsTransitioning(true);

        // Apply theme class to html and body for full coverage
        if (theme === 'light') {
            root.classList.add('light');
            root.classList.remove('dark');
            document.body.classList.add('light');
            document.body.classList.remove('dark');
            // Helps native form controls match theme
            root.style.colorScheme = 'light';
        } else {
            root.classList.add('dark');
            root.classList.remove('light');
            document.body.classList.add('dark');
            document.body.classList.remove('light');
            root.style.colorScheme = 'dark';
        }

        // Save to localStorage
        localStorage.setItem('theme', theme);

        // End transition after animation
        const timer = setTimeout(() => setIsTransitioning(false), 400);
        return () => clearTimeout(timer);
    }, [theme]);

    // Listen for system preference changes
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (e) => {
            const stored = localStorage.getItem('theme');
            if (!stored) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const value = {
        theme,
        setTheme,
        toggleTheme,
        isDark: theme === 'dark',
        isTransitioning
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
