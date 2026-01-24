import { motion } from 'framer-motion';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import { Toaster } from 'react-hot-toast';

/**
 * Main Layout Component
 * Wraps pages with navbar and page transitions
 */
export default function Layout() {
    const location = useLocation();

    return (
        <div className="min-h-screen relative">
            {/* Toast notifications */}
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: 'var(--bg-elevated)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '12px',
                        padding: '16px',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                    },
                    success: {
                        iconTheme: {
                            primary: '#22c55e',
                            secondary: 'white',
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: '#ef4444',
                            secondary: 'white',
                        },
                    },
                }}
            />

            {/* Navbar */}
            <Navbar />

            {/* Page Content with Transitions */}
            <motion.main
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                    duration: 0.3,
                    ease: 'easeInOut'
                }}
                className="pt-20"
            >
                <Outlet />
            </motion.main>

            {/* Footer */}
            <footer className="mt-auto py-8 border-t border-[var(--border-color)]">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-[var(--text-muted)] text-sm">
                            © 2024 TaskFlow. Built with ❤️ for productivity.
                        </p>
                        <div className="flex items-center gap-6">
                            <Link to="/privacy" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-sm transition-colors">
                                Privacy
                            </Link>
                            <Link to="/terms" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-sm transition-colors">
                                Terms
                            </Link>
                            <Link to="/contact" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-sm transition-colors">
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
