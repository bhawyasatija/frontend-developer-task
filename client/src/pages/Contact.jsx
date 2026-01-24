import { Mail } from 'lucide-react';
import { FadeIn } from '../components/animations/FadeIn';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function Contact() {
    return (
        <div className="min-h-screen pb-20">
            <div className="container mx-auto px-4 py-10 max-w-3xl">
                <FadeIn>
                    <h1 className="text-3xl font-bold mb-6">Contact</h1>
                    <Card padding="lg">
                        <div className="space-y-5">
                            <p className="text-[var(--text-secondary)]">
                                Need help or want to share feedback? Email us and we’ll get back to you.
                            </p>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                <a href="mailto:support@taskflow.app" className="inline-flex">
                                    <Button variant="primary" icon={Mail}>
                                        Email support@taskflow.app
                                    </Button>
                                </a>
                                <p className="text-sm text-[var(--text-muted)]">
                                    (Replace this address with your real support inbox.)
                                </p>
                            </div>
                        </div>
                    </Card>
                </FadeIn>
            </div>
        </div>
    );
}

