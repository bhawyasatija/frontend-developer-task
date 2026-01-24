import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    User,
    Camera,
    Mail,
    Save,
    Moon,
    Sun,
    Bell,
    Shield,
    Palette,
    Check
} from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import { FadeIn } from '../components/animations/FadeIn';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import api from '../services/api';

/**
 * Settings Page - Profile & Preferences
 * Clean, organized settings with profile picture upload
 */
export default function Settings() {
    const { user, updateProfile } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [loading, setLoading] = useState(false);
    const [profileData, setProfileData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        bio: user?.bio || '',
        avatar: user?.avatar || ''
    });

    // Avatar options using UI Avatars API
    const avatarStyles = [
        { bg: '6366f1', color: 'ffffff' },
        { bg: 'ec4899', color: 'ffffff' },
        { bg: '10b981', color: 'ffffff' },
        { bg: 'f59e0b', color: 'ffffff' },
        { bg: '8b5cf6', color: 'ffffff' },
        { bg: '06b6d4', color: 'ffffff' },
    ];

    const getAvatarUrl = (name, bg, color) => {
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'User')}&background=${bg}&color=${color}&size=128&bold=true`;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handleAvatarSelect = (bg, color) => {
        const url = getAvatarUrl(profileData.name, bg, color);
        setProfileData(prev => ({ ...prev, avatar: url }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await updateProfile({
                name: profileData.name,
                bio: profileData.bio,
                avatar: profileData.avatar
            });

            if (result.success) {
                toast.success('Profile updated successfully!');
            } else {
                toast.error(result.error);
            }
        } catch {
            toast.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const settingsSections = [
        {
            title: 'Notifications',
            description: 'Manage how you receive updates',
            icon: Bell,
            options: [
                { label: 'Email notifications', enabled: true },
                { label: 'Task reminders', enabled: true },
                { label: 'Weekly summary', enabled: false },
            ]
        },
        {
            title: 'Privacy',
            description: 'Control your data and visibility',
            icon: Shield,
            options: [
                { label: 'Profile visible to team', enabled: true },
                { label: 'Show activity status', enabled: true },
            ]
        }
    ];

    return (
        <div className="min-h-screen pb-20">
            {/* Subtle background */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-[var(--bg-primary)]" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            </div>

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Header */}
                <FadeIn className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Settings</h1>
                    <p className="text-[var(--text-secondary)]">
                        Manage your account and preferences
                    </p>
                </FadeIn>

                <div className="grid gap-6">
                    {/* Profile Section */}
                    <FadeIn delay={0.1}>
                        <Card>
                            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[var(--border-color)]">
                                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                                    <User className="text-indigo-400" size={20} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold">Profile</h2>
                                    <p className="text-sm text-[var(--text-muted)]">Your personal information</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit}>
                                {/* Avatar Selection */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
                                        Profile Picture
                                    </label>
                                    <div className="flex items-center gap-6">
                                        {/* Current Avatar */}
                                        <div className="relative">
                                            <img
                                                src={profileData.avatar || getAvatarUrl(profileData.name, '6366f1', 'ffffff')}
                                                alt="Profile"
                                                className="w-20 h-20 rounded-2xl object-cover border-2 border-[var(--border-color)]"
                                            />
                                            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">
                                                <Camera size={12} className="text-white" />
                                            </div>
                                        </div>

                                        {/* Avatar Options */}
                                        <div>
                                            <p className="text-sm text-[var(--text-muted)] mb-2">Choose a style</p>
                                            <div className="flex gap-2">
                                                {avatarStyles.map((style, i) => (
                                                    <motion.button
                                                        key={i}
                                                        type="button"
                                                        onClick={() => handleAvatarSelect(style.bg, style.color)}
                                                        className={`w-10 h-10 rounded-xl overflow-hidden border-2 transition-all ${profileData.avatar?.includes(style.bg)
                                                                ? 'border-indigo-500 scale-110'
                                                                : 'border-transparent hover:border-[var(--border-color)]'
                                                            }`}
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        <img
                                                            src={getAvatarUrl(profileData.name, style.bg, style.color)}
                                                            alt={`Avatar style ${i + 1}`}
                                                            className="w-full h-full"
                                                        />
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Form Fields */}
                                <div className="grid gap-4 mb-6">
                                    <Input
                                        label="Full Name"
                                        name="name"
                                        value={profileData.name}
                                        onChange={handleChange}
                                        icon={User}
                                        placeholder="Your name"
                                    />

                                    <Input
                                        label="Email"
                                        name="email"
                                        type="email"
                                        value={profileData.email}
                                        disabled
                                        icon={Mail}
                                        placeholder="Email cannot be changed"
                                    />

                                    <div>
                                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                            Bio
                                        </label>
                                        <textarea
                                            name="bio"
                                            value={profileData.bio}
                                            onChange={handleChange}
                                            placeholder="Tell us a bit about yourself..."
                                            className="w-full p-4 bg-[var(--bg-muted)] border-2 border-[var(--border-color)] rounded-xl text-sm resize-none h-24 focus:border-indigo-500 focus:outline-none transition-colors text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    variant="primary"
                                    icon={Save}
                                    loading={loading}
                                >
                                    Save Changes
                                </Button>
                            </form>
                        </Card>
                    </FadeIn>

                    {/* Appearance Section */}
                    <FadeIn delay={0.2}>
                        <Card>
                            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[var(--border-color)]">
                                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                                    <Palette className="text-purple-400" size={20} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold">Appearance</h2>
                                    <p className="text-sm text-[var(--text-muted)]">Customize your experience</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {theme === 'dark' ? (
                                        <Moon className="text-indigo-400" size={20} />
                                    ) : (
                                        <Sun className="text-amber-400" size={20} />
                                    )}
                                    <div>
                                        <p className="font-medium">Theme</p>
                                        <p className="text-sm text-[var(--text-muted)]">
                                            Currently using {theme} mode
                                        </p>
                                    </div>
                                </div>
                                <motion.button
                                    onClick={toggleTheme}
                                    className={`relative w-14 h-8 rounded-full p-1 transition-colors ${theme === 'dark' ? 'bg-indigo-500' : 'bg-gray-300'
                                        }`}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <motion.div
                                        className="w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center"
                                        animate={{ x: theme === 'dark' ? 22 : 0 }}
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    >
                                        {theme === 'dark' ? (
                                            <Moon size={12} className="text-indigo-500" />
                                        ) : (
                                            <Sun size={12} className="text-amber-500" />
                                        )}
                                    </motion.div>
                                </motion.button>
                            </div>
                        </Card>
                    </FadeIn>

                    {/* Other Settings */}
                    {settingsSections.map((section, i) => (
                        <FadeIn key={section.title} delay={0.3 + i * 0.1}>
                            <Card>
                                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[var(--border-color)]">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                                        <section.icon className="text-emerald-400" size={20} />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold">{section.title}</h2>
                                        <p className="text-sm text-[var(--text-muted)]">{section.description}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {section.options.map((option, j) => (
                                        <div key={j} className="flex items-center justify-between">
                                            <span className="text-sm">{option.label}</span>
                                            <motion.button
                                                className={`relative w-12 h-7 rounded-full p-1 transition-colors ${option.enabled ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'
                                                    }`}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <motion.div
                                                    className="w-5 h-5 rounded-full bg-white shadow-sm flex items-center justify-center"
                                                    animate={{ x: option.enabled ? 18 : 0 }}
                                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                                >
                                                    {option.enabled && <Check size={10} className="text-emerald-500" />}
                                                </motion.div>
                                            </motion.button>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </div>
    );
}
