import { motion } from 'framer-motion';

/**
 * Glassmorphism Card Component
 * With hover glow and depth effects
 */
export default function Card({
    children,
    className = '',
    hover = true,
    glow = false,
    padding = 'md',
    onClick,
    ...props
}) {
    const paddings = {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    };

    return (
        <motion.div
            className={`
        relative rounded-2xl overflow-hidden
        bg-[var(--bg-card)] backdrop-blur-xl
        border border-[var(--border-color)]
        ${paddings[padding]}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
            onClick={onClick}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={hover ? {
                y: -4,
                borderColor: 'rgba(99, 102, 241, 0.5)',
                boxShadow: glow
                    ? '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px rgba(99, 102, 241, 0.2)'
                    : '0 20px 40px rgba(0, 0, 0, 0.3)',
            } : {}}
            {...props}
        >
            {/* Gradient overlay on hover */}
            {hover && (
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, transparent 50%)'
                    }}
                />
            )}

            {/* Glow effect */}
            {glow && (
                <motion.div
                    className="absolute -inset-px rounded-2xl -z-10"
                    animate={{
                        boxShadow: [
                            '0 0 20px rgba(99, 102, 241, 0.2)',
                            '0 0 40px rgba(99, 102, 241, 0.3)',
                            '0 0 20px rgba(99, 102, 241, 0.2)',
                        ]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                />
            )}

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
}
