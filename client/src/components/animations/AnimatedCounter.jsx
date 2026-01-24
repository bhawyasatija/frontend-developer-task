import { motion, useSpring, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';

/**
 * Animated Counter Component
 * Counts up from 0 to target value with spring animation
 */
export default function AnimatedCounter({
    value,
    duration = 2,
    className = '',
    prefix = '',
    suffix = ''
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    const spring = useSpring(0, {
        stiffness: 50,
        damping: 30,
        duration: duration * 1000
    });

    const display = useTransform(spring, (current) =>
        Math.floor(current).toLocaleString()
    );

    useEffect(() => {
        if (isInView) {
            spring.set(value);
        }
    }, [isInView, spring, value]);

    return (
        <motion.span
            ref={ref}
            className={className}
        >
            {prefix}
            <motion.span>{display}</motion.span>
            {suffix}
        </motion.span>
    );
}
