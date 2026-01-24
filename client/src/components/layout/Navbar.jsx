import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, LogIn, LogOut, Menu, Settings, Sparkles, User, X } from 'lucide-react';
import ThemeToggle from '../theme/ThemeToggle';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

/**
 * Navbar - Clean, Minimalistic Design
 * Fixed spacing issues and cleaner layout
 */
export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navLinks = [
        { name: 'Home', path: '/' },
    ];

    const authLinks = isAuthenticated ? [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Settings', path: '/settings', icon: Settings },
    ] : [];

    return (
        <>
            <motion.nav
                className={`
                    fixed top-0 left-0 right-0 z-50
                    transition-all duration-300
                    ${scrolled ? 'py-3' : 'py-4'}
                `}
                style={{
                    background: scrolled ? 'var(--bg-glass)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(20px)' : 'none',
                    WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
                    borderBottom: scrolled ? '1px solid var(--border-color)' : 'none',
                }}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            >
                <div className="container mx-auto px-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/">
                        <motion.div
                            className="flex items-center gap-2"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                <Sparkles className="text-white" size={18} />
                            </div>
                            <span className="text-lg font-bold">TaskFlow</span>
                        </motion.div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {/* Nav Links */}
                        {navLinks.map((link) => (
                            <Link key={link.path} to={link.path}>
                                <motion.span
                                    className={`
                                        px-3 py-2 rounded-lg text-sm font-medium
                                        transition-colors duration-200
                                        ${location.pathname === link.path
                                            ? 'text-[var(--text-primary)] bg-[var(--bg-muted)]'
                                            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                        }
                                    `}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {link.name}
                                </motion.span>
                            </Link>
                        ))}

                        {/* Auth Links */}
                        {authLinks.map((link) => (
                            <Link key={link.path} to={link.path}>
                                <motion.span
                                    className={`
                                        px-3 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-1.5
                                        transition-colors duration-200
                                        ${location.pathname === link.path
                                            ? 'text-[var(--text-primary)] bg-[var(--bg-muted)]'
                                            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                        }
                                    `}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <link.icon size={15} />
                                    {link.name}
                                </motion.span>
                            </Link>
                        ))}

                        {/* Separator */}
                        <div className="w-px h-6 bg-[var(--border-color)] mx-2" />

                        {/* Theme Toggle */}
                        <ThemeToggle />

                        {/* Auth Buttons */}
                        <div className="flex items-center gap-2 ml-2">
                            {isAuthenticated ? (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    icon={LogOut}
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            ) : (
                                <>
                                    <Link to="/login">
                                        <Button variant="ghost" size="sm">
                                            Sign In
                                        </Button>
                                    </Link>
                                    <Link to="/register">
                                        <Button variant="primary" size="sm">
                                            Get Started
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden items-center gap-2">
                        <ThemeToggle />
                        <motion.button
                            className="p-2 rounded-lg bg-[var(--bg-muted)] border border-[var(--border-color)]"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <motion.div
                className={`
                    fixed inset-0 z-40 md:hidden
                    ${mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}
                `}
                initial={false}
                animate={mobileMenuOpen ? { opacity: 1 } : { opacity: 0 }}
            >
                {/* Backdrop */}
                <motion.div
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={() => setMobileMenuOpen(false)}
                />

                {/* Menu Panel */}
                <motion.div
                    className="absolute top-16 left-4 right-4 bg-[var(--bg-secondary)] p-5 rounded-2xl border border-[var(--border-color)] shadow-xl"
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={mobileMenuOpen
                        ? { opacity: 1, y: 0, scale: 1 }
                        : { opacity: 0, y: -20, scale: 0.95 }
                    }
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                >
                    <div className="flex flex-col gap-1">
                        {[...navLinks, ...authLinks].map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`
                                    flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors
                                    ${location.pathname === link.path
                                        ? 'text-[var(--text-primary)] bg-[var(--bg-muted)]'
                                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-muted)]'
                                    }
                                `}
                            >
                                {link.icon && <link.icon size={18} />}
                                {link.name}
                            </Link>
                        ))}

                        <hr className="border-[var(--border-color)] my-3" />

                        {isAuthenticated ? (
                            <Button
                                variant="ghost"
                                icon={LogOut}
                                onClick={handleLogout}
                                className="w-full justify-center"
                            >
                                Logout
                            </Button>
                        ) : (
                            <div className="flex flex-col gap-2">
                                <Link to="/login">
                                    <Button variant="secondary" className="w-full">
                                        Sign In
                                    </Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="primary" className="w-full">
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
}
