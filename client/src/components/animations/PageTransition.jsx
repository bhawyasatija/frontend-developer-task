import { motion } from 'framer-motion';

/**
 * Page Transition Wrapper
 * Adds smooth enter/exit animations to pages
 */
export default function PageTransition({ children, className = '' }) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{
                type: 'spring',
                stiffness: 100,
                damping: 20,
                duration: 0.4
            }}
        >
            {children}
        </motion.div>
    );
}
