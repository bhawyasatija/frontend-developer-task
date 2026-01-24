import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Save, Camera } from 'lucide-react';
import toast from 'react-hot-toast';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { FadeIn } from '../components/animations/FadeIn';
import { useAuth } from '../context/AuthContext';

/**
 * Profile Page
 * User profile view and edit
 */
export default function Profile() {
    const { user, updateProfile } = useAuth();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        bio: user?.bio || ''
    });
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await updateProfile(formData);
            if (result.success) {
                toast.success('Profile updated! 🎉');
                setEditing(false);
            } else {
                toast.error(result.error);
            }
        } catch {
            toast.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="min-h-screen pb-20">
            <div className="container mx-auto px-4 py-8 max-w-2xl">
                <FadeIn>
                    <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>

                    <Card padding="lg">
                        {/* Avatar Section */}
                        <div className="flex flex-col items-center mb-8">
                            <motion.div
                                className="relative"
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <motion.button
                                    className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-color)] flex items-center justify-center"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Camera size={14} />
                                </motion.button>
                            </motion.div>
                            <h2 className="mt-4 text-xl font-semibold">{user?.name}</h2>
                            <p className="text-[var(--text-muted)]">{user?.email}</p>
                        </div>

                        {/* Profile Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-6">
                                <Input
                                    label="Full Name"
                                    name="name"
                                    icon={User}
                                    value={formData.name}
                                    onChange={handleChange}
                                    disabled={!editing}
                                    required
                                />

                                <Input
                                    label="Email"
                                    type="email"
                                    icon={Mail}
                                    value={user?.email || ''}
                                    disabled
                                />

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[var(--text-secondary)]">
                                        Bio
                                    </label>
                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        disabled={!editing}
                                        placeholder="Tell us about yourself..."
                                        className="w-full p-4 bg-[var(--bg-muted)] border border-[var(--border-color)] rounded-xl text-sm resize-none h-24 focus:border-indigo-500 focus:outline-none transition-colors disabled:opacity-50"
                                    />
                                </div>
                            </div>

                            {/* Account Info */}
                            <div className="pt-6 border-t border-[var(--border-color)]">
                                <h3 className="text-sm font-medium text-[var(--text-muted)] mb-4">Account Information</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-[var(--text-muted)]">Member since</span>
                                        <p className="font-medium">
                                            {user?.createdAt
                                                ? new Date(user.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })
                                                : 'N/A'
                                            }
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-[var(--text-muted)]">Account status</span>
                                        <p className="font-medium text-emerald-500">Active</p>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-4">
                                {editing ? (
                                    <>
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            className="flex-1"
                                            onClick={() => {
                                                setEditing(false);
                                                setFormData({ name: user?.name || '', bio: user?.bio || '' });
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            className="flex-1"
                                            loading={loading}
                                            icon={Save}
                                        >
                                            Save Changes
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        type="button"
                                        variant="primary"
                                        className="w-full"
                                        onClick={() => setEditing(true)}
                                    >
                                        Edit Profile
                                    </Button>
                                )}
                            </div>
                        </form>
                    </Card>
                </FadeIn>
            </div>
        </div>
    );
}
