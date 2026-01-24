import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';

/**
 * Premium Input Component
 * With top labels, validation states, and password toggle
 */
export default function Input({
    label,
    type = 'text',
    error,
    success,
    icon: Icon,
    className = '',
    value,
    onChange,
    onBlur,
    required = false,
    disabled = false,
    placeholder,
    ...props
}) {
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    // Determine border color based on state
    const getBorderClass = () => {
        if (error) return 'border-red-500 focus:border-red-500';
        if (success) return 'border-emerald-500 focus:border-emerald-500';
        if (focused) return 'border-indigo-500';
        return 'border-[var(--border-color)]';
    };

    return (
        <div className={`${className}`}>
            {/* Label - Always on top */}
            {label && (
                <label
                    className={`
                        block text-sm font-medium mb-2 transition-colors
                        ${error ? 'text-red-400' : success ? 'text-emerald-400' : 'text-[var(--text-secondary)]'}
                    `}
                >
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}

            {/* Input container */}
            <div className="relative">
                {/* Left icon */}
                {Icon && (
                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focused ? 'text-indigo-400' : 'text-[var(--text-muted)]'}`}>
                        <Icon size={18} />
                    </div>
                )}

                {/* Input field */}
                <motion.input
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setFocused(true)}
                    onBlur={(e) => {
                        setFocused(false);
                        onBlur?.(e);
                    }}
                    disabled={disabled}
                    placeholder={placeholder}
                    className={`
                        w-full h-[52px] bg-[var(--bg-muted)] rounded-xl
                        text-[var(--text-primary)] text-base
                        border-2 transition-all duration-200 outline-none
                        ${Icon ? 'pl-12' : 'pl-4'}
                        ${isPassword ? 'pr-12' : 'pr-4'}
                        ${getBorderClass()}
                        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                        placeholder:text-[var(--text-muted)]
                    `}
                    whileFocus={{
                        boxShadow: error
                            ? '0 0 0 4px rgba(239, 68, 68, 0.15)'
                            : success
                                ? '0 0 0 4px rgba(16, 185, 129, 0.15)'
                                : '0 0 0 4px rgba(99, 102, 241, 0.15)'
                    }}
                    {...props}
                />

                {/* Password toggle */}
                {isPassword && (
                    <motion.button
                        type="button"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </motion.button>
                )}

                {/* Status icons */}
                {(error || success) && !isPassword && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        {error && <AlertCircle size={18} className="text-red-500" />}
                        {success && <CheckCircle size={18} className="text-emerald-500" />}
                    </div>
                )}
            </div>

            {/* Error/Success message */}
            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -8, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -8, height: 0 }}
                        className="text-red-400 text-sm mt-2 flex items-center gap-1"
                    >
                        <AlertCircle size={14} />
                        {error}
                    </motion.p>
                )}
                {success && (
                    <motion.p
                        initial={{ opacity: 0, y: -8, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -8, height: 0 }}
                        className="text-emerald-400 text-sm mt-2 flex items-center gap-1"
                    >
                        <CheckCircle size={14} />
                        {success}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}
