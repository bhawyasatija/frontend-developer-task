import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserPlus, Sparkles, ArrowRight, ArrowLeft, CheckCircle, Zap, Shield, BarChart3 } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { FadeIn } from '../components/animations/FadeIn';
import { useAuth } from '../context/AuthContext';

/**
 * Register Page - Premium Split-Screen Design
 * Multi-step form with animated transitions
 */
export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);

    const navigate = useNavigate();
    const { register } = useAuth();

    const validateStep1 = () => {
        const newErrors = {};

        if (!formData.name) {
            newErrors.name = 'Name is required';
        } else if (formData.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep1()) {
            setStep(2);
        }
    };

    const handleBack = () => {
        setStep(1);
        setErrors({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateStep2()) return;

        setLoading(true);

        try {
            const result = await register({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });

            if (result.success) {
                toast.success('Account created successfully! 🎉');
                navigate('/dashboard');
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
        { icon: Zap, title: 'Lightning Fast', desc: 'Instant updates and smooth performance' },
        { icon: Shield, title: 'Secure', desc: 'Enterprise-grade encryption' },
        { icon: BarChart3, title: 'Analytics', desc: 'Track your productivity' },
    ];

    const getPasswordStrength = () => {
        const password = formData.password;
        if (!password) return { width: '0%', color: 'bg-gray-500', text: '' };
        if (password.length < 6) return { width: '33%', color: 'bg-red-500', text: 'Weak' };
        if (password.length < 10) return { width: '66%', color: 'bg-amber-500', text: 'Good' };
        return { width: '100%', color: 'bg-emerald-500', text: 'Strong' };
    };

    const passwordStrength = getPasswordStrength();

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
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-rose-500">
                    {/* Animated Orbs */}
                    <motion.div
                        className="absolute top-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.3, 1],
                            x: [0, -40, 0],
                        }}
                        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="absolute bottom-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            y: [0, -30, 0],
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
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
                        Start your
                        <br />
                        <span className="text-white/90">productivity journey</span>
                    </motion.h1>

                    <motion.p
                        className="text-lg text-white/80 mb-10 max-w-md"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        Join thousands of professionals who've transformed the way they work.
                    </motion.p>

                    {/* Feature Cards */}
                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-4 p-4 rounded-xl bg-white/10 backdrop-blur border border-white/10"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 + i * 0.1 }}
                                whileHover={{ x: 8, backgroundColor: 'rgba(255,255,255,0.15)' }}
                            >
                                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                                    <feature.icon size={24} />
                                </div>
                                <div>
                                    <p className="font-semibold">{feature.title}</p>
                                    <p className="text-sm text-white/70">{feature.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        className="flex gap-8 mt-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                    >
                        <div>
                            <p className="text-3xl font-bold">10K+</p>
                            <p className="text-sm text-white/60">Active Users</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold">500K+</p>
                            <p className="text-sm text-white/60">Tasks Created</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold">4.9</p>
                            <p className="text-sm text-white/60">User Rating</p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Right Panel - Register Form */}
            <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-12 relative">
                {/* Background decorations for mobile */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none lg:hidden">
                    <motion.div
                        className="absolute top-1/4 -left-32 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 8, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 -right-32 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 6, repeat: Infinity }}
                    />
                </div>

                <FadeIn className="w-full max-w-md relative z-10">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
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
                            Create your account
                        </motion.h2>
                        <motion.p
                            className="text-[var(--text-secondary)]"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            Already have an account?{' '}
                            <Link to="/login" className="text-purple-500 hover:text-purple-400 font-medium">
                                Sign in
                            </Link>
                        </motion.p>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <div className="flex items-center gap-2">
                            <motion.div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${step >= 1
                                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                        : 'bg-[var(--bg-muted)] text-[var(--text-muted)]'
                                    }`}
                                animate={{ scale: step === 1 ? [1, 1.1, 1] : 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                {step > 1 ? <CheckCircle size={16} /> : '1'}
                            </motion.div>
                            <span className={`text-sm ${step >= 1 ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
                                Your info
                            </span>
                        </div>
                        <div className={`w-12 h-0.5 ${step > 1 ? 'bg-purple-500' : 'bg-[var(--bg-muted)]'} transition-colors`} />
                        <div className="flex items-center gap-2">
                            <motion.div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${step >= 2
                                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                        : 'bg-[var(--bg-muted)] text-[var(--text-muted)]'
                                    }`}
                                animate={{ scale: step === 2 ? [1, 1.1, 1] : 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                2
                            </motion.div>
                            <span className={`text-sm ${step >= 2 ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
                                Security
                            </span>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        {/* Step 1: Name & Email */}
                        <motion.div
                            initial={false}
                            animate={{
                                x: step === 1 ? 0 : -20,
                                opacity: step === 1 ? 1 : 0,
                                display: step === 1 ? 'block' : 'none'
                            }}
                            transition={{ duration: 0.3 }}
                            className="space-y-5"
                        >
                            <Input
                                label="Full Name"
                                name="name"
                                type="text"
                                icon={User}
                                value={formData.name}
                                onChange={handleChange}
                                error={errors.name}
                                placeholder="John Doe"
                                required
                            />

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

                            <Button
                                type="button"
                                variant="primary"
                                size="lg"
                                className="w-full"
                                onClick={handleNext}
                                icon={ArrowRight}
                                iconPosition="right"
                            >
                                Continue
                            </Button>
                        </motion.div>

                        {/* Step 2: Password */}
                        <motion.div
                            initial={false}
                            animate={{
                                x: step === 2 ? 0 : 20,
                                opacity: step === 2 ? 1 : 0,
                                display: step === 2 ? 'block' : 'none'
                            }}
                            transition={{ duration: 0.3 }}
                            className="space-y-5"
                        >
                            <div>
                                <Input
                                    label="Password"
                                    name="password"
                                    type="password"
                                    icon={Lock}
                                    value={formData.password}
                                    onChange={handleChange}
                                    error={errors.password}
                                    placeholder="Min. 6 characters"
                                    required
                                />
                                {formData.password && (
                                    <div className="mt-2">
                                        <div className="flex items-center justify-between text-xs mb-1">
                                            <span className="text-[var(--text-muted)]">Password strength</span>
                                            <span className={passwordStrength.color.replace('bg-', 'text-')}>{passwordStrength.text}</span>
                                        </div>
                                        <div className="h-1.5 bg-[var(--bg-muted)] rounded-full overflow-hidden">
                                            <motion.div
                                                className={`h-full ${passwordStrength.color} rounded-full`}
                                                initial={{ width: 0 }}
                                                animate={{ width: passwordStrength.width }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Input
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                icon={Lock}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                error={errors.confirmPassword}
                                placeholder="Confirm your password"
                                required
                            />

                            <div className="flex gap-3">
                                <Button
                                    type="button"
                                    variant="secondary"
                                    size="lg"
                                    onClick={handleBack}
                                    icon={ArrowLeft}
                                >
                                    Back
                                </Button>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="lg"
                                    className="flex-1"
                                    loading={loading}
                                    icon={UserPlus}
                                >
                                    Create Account
                                </Button>
                            </div>
                        </motion.div>
                    </form>

                    {/* Terms */}
                    <p className="text-center text-xs text-[var(--text-muted)] mt-8">
                        By creating an account, you agree to our{' '}
                        <Link to="/terms" className="text-purple-500 hover:underline">Terms of Service</Link>
                        {' '}and{' '}
                        <Link to="/privacy" className="text-purple-500 hover:underline">Privacy Policy</Link>
                    </p>
                </FadeIn>
            </div>
        </div>
    );
}
