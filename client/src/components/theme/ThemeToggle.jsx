import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

/**
 * Animated Theme Toggle
 * Sun/Moon morph animation with smooth transitions
 */
export default function ThemeToggle({ className = '' }) {
    const { isDark, toggleTheme, isTransitioning } = useTheme();

    return (
        <motion.button
            className={`relative p-2.5 rounded-xl glass-card cursor-pointer ${className}`}
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isTransitioning}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {/* Glow effect */}
            <motion.div
                className="absolute inset-0 rounded-xl"
                animate={{
                    boxShadow: isDark
                        ? '0 0 20px rgba(99, 102, 241, 0.3)'
                        : '0 0 20px rgba(251, 191, 36, 0.3)'
                }}
                transition={{ duration: 0.3 }}
            />

            {/* Icon container */}
            <div className="relative w-5 h-5">
                {/* Sun icon */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center text-amber-400"
                    initial={false}
                    animate={{
                        scale: isDark ? 0 : 1,
                        rotate: isDark ? -90 : 0,
                        opacity: isDark ? 0 : 1
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                    <Sun size={20} />
                </motion.div>

                {/* Moon icon */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center text-indigo-400"
                    initial={false}
                    animate={{
                        scale: isDark ? 1 : 0,
                        rotate: isDark ? 0 : 90,
                        opacity: isDark ? 1 : 0
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                    <Moon size={20} />
                </motion.div>
            </div>

            {/* Ripple effect on click */}
            <motion.span
                className="absolute inset-0 rounded-xl"
                initial={{ scale: 0, opacity: 0.3 }}
                animate={{ scale: 0, opacity: 0.3 }}
                whileTap={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    background: isDark
                        ? 'radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)'
                }}
            />
        </motion.button>
    );
}
