import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import Button from '../components/ui/Button';
import { FadeIn } from '../components/animations/FadeIn';

/**
 * Home/Landing Page - Minimalistic & Calming Design
 * Clean, spacious, with soft colors and gentle animations
 */
export default function Home() {
    const features = [
        {
            title: 'Simple & Intuitive',
            description: 'A clean interface that lets you focus on what matters.',
        },
        {
            title: 'Stay Organized',
            description: 'Keep all your tasks in one beautiful place.',
        },
        {
            title: 'Track Progress',
            description: 'See your productivity grow over time.',
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Subtle gradient background */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-[var(--bg-primary)]" />
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
            </div>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        {/* Simple badge */}
                        <FadeIn delay={0.1}>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8">
                                <Sparkles size={16} className="text-indigo-400" />
                                <span className="text-sm text-indigo-400 font-medium">
                                    Simple task management
                                </span>
                            </div>
                        </FadeIn>

                        {/* Clean headline */}
                        <FadeIn delay={0.2}>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
                                Organize your work,
                                <br />
                                <span className="text-indigo-400">clear your mind</span>
                            </h1>
                        </FadeIn>

                        {/* Minimal subheadline */}
                        <FadeIn delay={0.3}>
                            <p className="text-lg text-[var(--text-secondary)] mb-10 max-w-xl mx-auto leading-relaxed">
                                A beautifully simple task manager designed to help you focus on what truly matters.
                            </p>
                        </FadeIn>

                        {/* CTA Buttons */}
                        <FadeIn delay={0.4}>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link to="/register">
                                    <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                                        Get Started Free
                                    </Button>
                                </Link>
                                <Link to="/login">
                                    <Button variant="ghost" size="lg">
                                        Sign In
                                    </Button>
                                </Link>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Clean Preview Image */}
                    <FadeIn delay={0.5}>
                        <motion.div
                            className="mt-20 max-w-4xl mx-auto"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            <div className="relative rounded-2xl overflow-hidden border border-[var(--border-color)] shadow-2xl shadow-indigo-500/10">
                                <img
                                    src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=700&fit=crop&q=80"
                                    alt="Task management dashboard"
                                    className="w-full h-auto"
                                />
                                {/* Subtle overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-60" />
                            </div>
                        </motion.div>
                    </FadeIn>
                </div>
            </section>

            {/* Features Section - Clean and Simple */}
            <section className="py-24">
                <div className="container mx-auto px-6 lg:px-8">
                    <FadeIn className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">
                            Why TaskFlow?
                        </h2>
                        <p className="text-[var(--text-secondary)] max-w-md mx-auto">
                            We believe productivity tools should be calm, not chaotic.
                        </p>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {features.map((feature, i) => (
                            <FadeIn key={i} delay={0.1 * i}>
                                <motion.div
                                    className="text-center p-8 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]"
                                    whileHover={{ y: -4, borderColor: 'rgba(99, 102, 241, 0.3)' }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mx-auto mb-5">
                                        <CheckCircle2 className="text-indigo-400" size={24} />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Simple CTA Section */}
            <section className="py-24">
                <div className="container mx-auto px-6 lg:px-8">
                    <FadeIn>
                        <div className="max-w-2xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-[var(--border-color)]">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                Ready to get started?
                            </h2>
                            <p className="text-[var(--text-secondary)] mb-8">
                                Join thousands of users who've simplified their workflow.
                            </p>
                            <Link to="/register">
                                <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                                    Create Free Account
                                </Button>
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Clean Footer */}
            <footer className="py-12 border-t border-[var(--border-color)]">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                <Sparkles className="text-white" size={16} />
                            </div>
                            <span className="font-semibold">TaskFlow</span>
                        </div>
                        <p className="text-sm text-[var(--text-muted)]">
                            © 2024 TaskFlow. Made with care.
                        </p>
                        <div className="flex gap-6 text-sm text-[var(--text-muted)]">
                            <Link to="/privacy" className="hover:text-[var(--text-primary)] transition-colors">Privacy</Link>
                            <Link to="/terms" className="hover:text-[var(--text-primary)] transition-colors">Terms</Link>
                            <Link to="/contact" className="hover:text-[var(--text-primary)] transition-colors">Contact</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
