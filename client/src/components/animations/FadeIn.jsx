import { motion } from 'framer-motion';

/**
 * Fade In Animation Wrapper
 * Reusable component for staggered fade-in effects
 */
export function FadeIn({
    children,
    delay = 0,
    duration = 0.5,
    direction = 'up',
    className = ''
}) {
    const directions = {
        up: { y: 20 },
        down: { y: -20 },
        left: { x: 20 },
        right: { x: -20 },
        none: {}
    };

    return (
        <motion.div
            className={className}
            initial={{
                opacity: 0,
                ...directions[direction]
            }}
            animate={{
                opacity: 1,
                x: 0,
                y: 0
            }}
            transition={{
                duration,
                delay,
                ease: 'easeOut'
            }}
        >
            {children}
        </motion.div>
    );
}

/**
 * Staggered Container
 * Parent component for staggered children animations
 */
export function StaggerContainer({
    children,
    staggerDelay = 0.1,
    className = ''
}) {
    return (
        <motion.div
            className={className}
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: staggerDelay
                    }
                }
            }}
        >
            {children}
        </motion.div>
    );
}

/**
 * Staggered Item
 * Child component for staggered animations
 */
export function StaggerItem({ children, className = '' }) {
    return (
        <motion.div
            className={className}
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.5,
                        ease: 'easeOut'
                    }
                }
            }}
        >
            {children}
        </motion.div>
    );
}

export default FadeIn;
