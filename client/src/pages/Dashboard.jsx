import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
    Plus,
    CheckCircle2,
    Clock,
    Loader2,
    Zap,
    Calendar,
    Trash2,
    Search,
    Filter,
    X,
    Settings,
    TrendingUp,
    Target,
} from 'lucide-react';
import toast from 'react-hot-toast';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import { SkeletonStats, SkeletonTaskCard } from '../components/ui/Skeleton';
import { FadeIn, StaggerContainer, StaggerItem } from '../components/animations/FadeIn';
import AnimatedCounter from '../components/animations/AnimatedCounter';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

/**
 * Dashboard Page - Clean, Minimalistic Design
 * Better spacing, cleaner header, more widgets
 */
export default function Dashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        priority: 'medium'
    });
    const [creating, setCreating] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterPriority, setFilterPriority] = useState('all');
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            await Promise.all([fetchProfile(), fetchTasks()]);
            setLoading(false);
        };
        load();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await api.get('/user/profile');
            setProfile(response.data.data.user);
        } catch {
            setProfile(null);
        }
    };

    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks');
            setTasks(response.data.data.tasks);
            setStats(response.data.data.stats);
        } catch {
            toast.error('Failed to load tasks');
        }
    };

    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {
            const matchesSearch = searchQuery === '' ||
                task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
            const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
            return matchesSearch && matchesStatus && matchesPriority;
        });
    }, [tasks, searchQuery, filterStatus, filterPriority]);

    const handleCreateTask = async (e) => {
        e.preventDefault();
        if (!newTask.title.trim()) {
            toast.error('Please enter a task title');
            return;
        }
        setCreating(true);
        try {
            const response = await api.post('/tasks', newTask);
            setTasks(prev => [response.data.data.task, ...prev]);
            setStats(prev => ({ ...prev, pending: (prev?.pending || 0) + 1 }));
            setModalOpen(false);
            setNewTask({ title: '', description: '', priority: 'medium' });
            toast.success('Task created!');
        } catch {
            toast.error('Failed to create task');
        } finally {
            setCreating(false);
        }
    };

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            await api.put(`/tasks/${taskId}`, { status: newStatus });
            setTasks(prev => prev.map(task =>
                task._id === taskId ? { ...task, status: newStatus } : task
            ));
            await fetchTasks();
            toast.success('Task updated!');
        } catch {
            toast.error('Failed to update task');
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await api.delete(`/tasks/${taskId}`);
            setTasks(prev => prev.filter(task => task._id !== taskId));
            await fetchTasks();
            toast.success('Task deleted');
        } catch {
            toast.error('Failed to delete task');
        }
    };

    const clearFilters = () => {
        setSearchQuery('');
        setFilterStatus('all');
        setFilterPriority('all');
    };

    const hasActiveFilters = searchQuery || filterStatus !== 'all' || filterPriority !== 'all';

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 18) return 'Good afternoon';
        return 'Good evening';
    };

    const totalTasks = (stats?.pending || 0) + (stats?.['in-progress'] || 0) + (stats?.completed || 0);
    const completionRate = totalTasks > 0 ? Math.round((stats?.completed || 0) / totalTasks * 100) : 0;

    const statCards = [
        {
            label: 'Pending',
            value: stats?.pending || 0,
            icon: Clock,
            color: 'text-amber-400',
            bg: 'bg-amber-500/10',
        },
        {
            label: 'In Progress',
            value: stats?.['in-progress'] || 0,
            icon: Loader2,
            color: 'text-blue-400',
            bg: 'bg-blue-500/10',
        },
        {
            label: 'Completed',
            value: stats?.completed || 0,
            icon: CheckCircle2,
            color: 'text-emerald-400',
            bg: 'bg-emerald-500/10',
        },
        {
            label: 'Completion',
            value: completionRate,
            suffix: '%',
            icon: TrendingUp,
            color: 'text-purple-400',
            bg: 'bg-purple-500/10',
        },
    ];

    const getPriorityStyles = (priority) => {
        switch (priority) {
            case 'high': return { bg: 'bg-red-500/10', text: 'text-red-400' };
            case 'medium': return { bg: 'bg-amber-500/10', text: 'text-amber-400' };
            case 'low': return { bg: 'bg-emerald-500/10', text: 'text-emerald-400' };
            default: return { bg: 'bg-gray-500/10', text: 'text-gray-400' };
        }
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case 'completed': return { bg: 'bg-emerald-500/10', text: 'text-emerald-400', dot: 'bg-emerald-500' };
            case 'in-progress': return { bg: 'bg-blue-500/10', text: 'text-blue-400', dot: 'bg-blue-500' };
            default: return { bg: 'bg-amber-500/10', text: 'text-amber-400', dot: 'bg-amber-500' };
        }
    };

    const userName = (profile?.name || user?.name || 'User').split(' ')[0];
    const avatarUrl = profile?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.name || user?.name || 'User')}&background=6366f1&color=ffffff&size=128&bold=true`;

    return (
        <div className="min-h-screen pb-20">
            {/* Subtle background */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-[var(--bg-primary)]" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/3 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            </div>

            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Clean Header */}
                <FadeIn className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <img
                                src={avatarUrl}
                                alt="Profile"
                                className="w-14 h-14 rounded-2xl object-cover border-2 border-[var(--border-color)]"
                            />
                            <div>
                                <h1 className="text-2xl font-bold">
                                    {getGreeting()}, <span className="text-indigo-400">{userName}</span>
                                </h1>
                                <p className="text-sm text-[var(--text-muted)]">
                                    {totalTasks} total tasks • {stats?.completed || 0} completed
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Link to="/settings">
                                <Button variant="ghost" size="sm" icon={Settings}>
                                    Settings
                                </Button>
                            </Link>
                            <Button variant="primary" size="sm" icon={Plus} onClick={() => setModalOpen(true)}>
                                New Task
                            </Button>
                        </div>
                    </div>
                </FadeIn>

                {/* Stats Grid */}
                {loading ? (
                    <SkeletonStats />
                ) : (
                    <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8" staggerDelay={0.05}>
                        {statCards.map((stat, i) => (
                            <StaggerItem key={i}>
                                <Card className="p-5">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                                            <stat.icon className={stat.color} size={22} />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold">
                                                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                                            </div>
                                            <div className="text-xs text-[var(--text-muted)]">{stat.label}</div>
                                        </div>
                                    </div>
                                </Card>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                )}

                {/* Quick Actions Widget */}
                <FadeIn delay={0.2} className="mb-8">
                    <Card className="p-5">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                                    <Target className="text-indigo-400" size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Quick Actions</h3>
                                    <p className="text-xs text-[var(--text-muted)]">Get things done faster</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button variant="secondary" size="sm" onClick={() => setModalOpen(true)}>
                                + Add Task
                            </Button>
                            <Button variant="secondary" size="sm" onClick={() => setFilterStatus('pending')}>
                                View Pending
                            </Button>
                            <Button variant="secondary" size="sm" onClick={() => setFilterStatus('in-progress')}>
                                View In Progress
                            </Button>
                            <Button variant="secondary" size="sm" onClick={() => setFilterStatus('completed')}>
                                View Completed
                            </Button>
                        </div>
                    </Card>
                </FadeIn>

                {/* Search and Filter */}
                <FadeIn delay={0.3} className="mb-6">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-11 pl-11 pr-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:border-indigo-500 focus:outline-none transition-colors placeholder:text-[var(--text-muted)]"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                        <Button
                            variant={showFilters ? 'primary' : 'secondary'}
                            icon={Filter}
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            Filters
                            {hasActiveFilters && <span className="ml-1 w-2 h-2 rounded-full bg-indigo-400" />}
                        </Button>
                    </div>

                    {/* Filter Panel */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="flex flex-wrap gap-4 mt-4 p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                                    <div className="flex-1 min-w-[140px]">
                                        <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Status</label>
                                        <select
                                            value={filterStatus}
                                            onChange={(e) => setFilterStatus(e.target.value)}
                                            className="w-full h-10 px-3 rounded-lg bg-[var(--bg-muted)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:border-indigo-500 focus:outline-none"
                                        >
                                            <option value="all">All</option>
                                            <option value="pending">Pending</option>
                                            <option value="in-progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </div>
                                    <div className="flex-1 min-w-[140px]">
                                        <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Priority</label>
                                        <select
                                            value={filterPriority}
                                            onChange={(e) => setFilterPriority(e.target.value)}
                                            className="w-full h-10 px-3 rounded-lg bg-[var(--bg-muted)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:border-indigo-500 focus:outline-none"
                                        >
                                            <option value="all">All</option>
                                            <option value="high">High</option>
                                            <option value="medium">Medium</option>
                                            <option value="low">Low</option>
                                        </select>
                                    </div>
                                    {hasActiveFilters && (
                                        <div className="flex items-end">
                                            <Button variant="ghost" size="sm" onClick={clearFilters}>
                                                Clear
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </FadeIn>

                {/* Tasks Section */}
                <FadeIn delay={0.4}>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">
                            {hasActiveFilters ? 'Filtered Tasks' : 'Your Tasks'}
                        </h2>
                        <span className="text-sm text-[var(--text-muted)]">
                            {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
                        </span>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[1, 2, 3].map(i => <SkeletonTaskCard key={i} />)}
                        </div>
                    ) : filteredTasks.length === 0 ? (
                        <Card className="text-center py-16">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="max-w-sm mx-auto"
                            >
                                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
                                    {hasActiveFilters ? <Search className="text-indigo-400" size={28} /> : <Zap className="text-indigo-400" size={28} />}
                                </div>
                                <h3 className="text-lg font-semibold mb-2">
                                    {hasActiveFilters ? 'No matching tasks' : 'No tasks yet'}
                                </h3>
                                <p className="text-sm text-[var(--text-muted)] mb-6">
                                    {hasActiveFilters ? 'Try adjusting your filters' : 'Create your first task to get started'}
                                </p>
                                {hasActiveFilters ? (
                                    <Button variant="secondary" onClick={clearFilters}>Clear Filters</Button>
                                ) : (
                                    <Button variant="primary" icon={Plus} onClick={() => setModalOpen(true)}>Create Task</Button>
                                )}
                            </motion.div>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredTasks.map((task) => {
                                const priorityStyles = getPriorityStyles(task.priority);
                                const statusStyles = getStatusStyles(task.status);

                                return (
                                    <motion.div
                                        key={task._id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        whileHover={{ y: -2 }}
                                    >
                                        <Card className="h-full p-5">
                                            <div className="flex items-start justify-between mb-3">
                                                <h3 className="font-medium line-clamp-1 flex-1 pr-2">
                                                    {task.title}
                                                </h3>
                                                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${priorityStyles.bg} ${priorityStyles.text}`}>
                                                    {task.priority}
                                                </span>
                                            </div>

                                            <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-2 min-h-[40px]">
                                                {task.description || 'No description'}
                                            </p>

                                            <div className="flex items-center gap-2 mb-4">
                                                <span className={`flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-full ${statusStyles.bg} ${statusStyles.text}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${statusStyles.dot}`} />
                                                    {task.status}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2 pt-3 border-t border-[var(--border-color)]">
                                                <select
                                                    value={task.status}
                                                    onChange={(e) => handleStatusChange(task._id, e.target.value)}
                                                    className="flex-1 text-xs bg-[var(--bg-muted)] border border-[var(--border-color)] rounded-lg px-2 py-2 focus:outline-none focus:border-indigo-500 text-[var(--text-primary)]"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="in-progress">In Progress</option>
                                                    <option value="completed">Completed</option>
                                                </select>
                                                <motion.button
                                                    onClick={() => handleDeleteTask(task._id)}
                                                    className="p-2 rounded-lg hover:bg-red-500/10 text-[var(--text-muted)] hover:text-red-400 transition-colors"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <Trash2 size={16} />
                                                </motion.button>
                                            </div>

                                            {task.dueDate && (
                                                <div className="flex items-center gap-1.5 mt-3 text-xs text-[var(--text-muted)]">
                                                    <Calendar size={12} />
                                                    {new Date(task.dueDate).toLocaleDateString()}
                                                </div>
                                            )}
                                        </Card>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </FadeIn>
            </div>

            {/* Create Task Modal */}
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Create Task"
                size="md"
            >
                <form onSubmit={handleCreateTask} className="space-y-5">
                    <Input
                        label="Title"
                        value={newTask.title}
                        onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="What needs to be done?"
                        required
                    />

                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                            Description
                        </label>
                        <textarea
                            value={newTask.description}
                            onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Add details..."
                            className="w-full p-3 bg-[var(--bg-muted)] border border-[var(--border-color)] rounded-xl text-sm resize-none h-24 focus:border-indigo-500 focus:outline-none transition-colors text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                            Priority
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {['low', 'medium', 'high'].map((priority) => {
                                const styles = getPriorityStyles(priority);
                                const isSelected = newTask.priority === priority;
                                return (
                                    <motion.button
                                        key={priority}
                                        type="button"
                                        onClick={() => setNewTask(prev => ({ ...prev, priority }))}
                                        className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-all border ${isSelected
                                            ? `${styles.bg} ${styles.text} border-current`
                                            : 'bg-[var(--bg-muted)] text-[var(--text-muted)] border-transparent hover:border-[var(--border-color)]'
                                            }`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex gap-3 pt-3">
                        <Button
                            type="button"
                            variant="secondary"
                            className="flex-1"
                            onClick={() => setModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            className="flex-1"
                            loading={creating}
                            icon={Plus}
                        >
                            Create
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
