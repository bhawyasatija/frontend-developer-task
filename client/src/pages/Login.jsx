import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, LogIn, Sparkles, ArrowRight, CheckCircle, Users, Zap, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { FadeIn } from '../components/animations/FadeIn';
import { useAuth } from '../context/AuthContext';

/**
 * Login Page - Premium Split-Screen Design
 * Inspired by Notion, Linear, and Stripe auth pages
 */
export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const from = location.state?.from?.pathname || '/dashboard';

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            const result = await login(formData);

            if (result.success) {
                toast.success('Welcome back! 🎉');
                navigate(from, { replace: true });
            } else {
                toast.error(result.error);
            }
        } catch {
            toast.error('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const features = [
        { icon: Zap, text: 'Lightning fast performance' },
        { icon: Shield, text: 'Enterprise-grade security' },
        { icon: Users, text: 'Trusted by 10,000+ users' },
    ];

    return (
        <div className="min-h-screen flex">
            {/* Left Panel - Brand Showcase */}
            <motion.div
                className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                {/* Animated Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
                    {/* Animated Orbs */}
                    <motion.div
                        className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            x: [0, 50, 0],
                            y: [0, -30, 0],
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.3, 1],
                            x: [0, -40, 0],
                            y: [0, 40, 0],
                        }}
                        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 180, 360],
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20 text-white">
                    {/* Logo */}
                    <motion.div
                        className="flex items-center gap-3 mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                            <Sparkles className="text-white" size={24} />
                        </div>
                        <span className="text-2xl font-bold">TaskFlow</span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        className="text-4xl xl:text-5xl font-bold mb-6 leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Welcome back to
                        <br />
                        <span className="text-white/90">productivity paradise</span>
                    </motion.h1>

                    <motion.p
                        className="text-lg text-white/80 mb-10 max-w-md"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        Pick up right where you left off. Your tasks, your way, beautifully organized.
                    </motion.p>

                    {/* Features */}
                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 + i * 0.1 }}
                            >
                                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                                    <feature.icon size={20} />
                                </div>
                                <span className="text-white/90">{feature.text}</span>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Testimonial */}
                    <motion.div
                        className="mt-16 p-6 rounded-2xl bg-white/10 backdrop-blur border border-white/10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <p className="text-white/90 mb-4 italic">
                            "TaskFlow transformed how I manage my daily workflow. The interface is absolutely stunning!"
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center font-bold">
                                S
                            </div>
                            <div>
                                <p className="font-semibold">Sarah Chen</p>
                                <p className="text-sm text-white/60">Product Designer at Google</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Right Panel - Login Form */}
            <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-12 relative">
                {/* Background decorations for mobile */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none lg:hidden">
                    <motion.div
                        className="absolute top-1/4 -left-32 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 8, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 -right-32 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 6, repeat: Infinity }}
                    />
                </div>

                <FadeIn className="w-full max-w-md relative z-10">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <Sparkles className="text-white" size={20} />
                        </div>
                        <span className="text-xl font-bold gradient-text">TaskFlow</span>
                    </div>

                    {/* Header */}
                    <div className="text-center lg:text-left mb-8">
                        <motion.h2
                            className="text-2xl lg:text-3xl font-bold mb-2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            Sign in to your account
                        </motion.h2>
                        <motion.p
                            className="text-[var(--text-secondary)]"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            Don't have an account?{' '}
                            <Link to="/register" className="text-indigo-500 hover:text-indigo-400 font-medium">
                                Sign up free
                            </Link>
                        </motion.p>
                    </div>

                    {/* Form */}
                    <motion.form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Input
                            label="Email address"
                            name="email"
                            type="email"
                            icon={Mail}
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                            placeholder="you@example.com"
                            required
                        />

                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            icon={Lock}
                            value={formData.password}
                            onChange={handleChange}
                            error={errors.password}
                            placeholder="Enter your password"
                            required
                        />

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        className="peer sr-only"
                                    />
                                    <div className="w-5 h-5 rounded-md border-2 border-[var(--border-color)] bg-[var(--bg-muted)] peer-checked:bg-indigo-500 peer-checked:border-indigo-500 transition-all flex items-center justify-center">
                                        <CheckCircle size={12} className="text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                                    </div>
                                </div>
                                <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                                    Remember me
                                </span>
                            </label>
                            <a
                                href="mailto:support@taskflow.app?subject=TaskFlow%20Password%20Help"
                                className="text-sm text-indigo-500 hover:text-indigo-400 font-medium transition-colors"
                            >
                                Need help signing in?
                            </a>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="w-full"
                            loading={loading}
                            icon={ArrowRight}
                            iconPosition="right"
                        >
                            Sign In
                        </Button>
                    </motion.form>

                    {/* Footer */}
                    <p className="text-center text-xs text-[var(--text-muted)] mt-8">
                        By signing in, you agree to our{' '}
                        <Link to="/terms" className="text-indigo-500 hover:underline">Terms of Service</Link>
                        {' '}and{' '}
                        <Link to="/privacy" className="text-indigo-500 hover:underline">Privacy Policy</Link>
                    </p>
                </FadeIn>
            </div>
        </div>
    );
}
