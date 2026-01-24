import { FadeIn } from '../components/animations/FadeIn';
import Card from '../components/ui/Card';

export default function Terms() {
    return (
        <div className="min-h-screen pb-20">
            <div className="container mx-auto px-4 py-10 max-w-3xl">
                <FadeIn>
                    <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
                    <Card padding="lg">
                        <div className="space-y-4 text-[var(--text-secondary)]">
                            <p>
                                This is a demo terms page for TaskFlow. Replace this content with your real terms of
                                service before production use.
                            </p>
                            <p>
                                By using TaskFlow, you agree to use the service responsibly and not attempt to abuse or
                                disrupt the platform.
                            </p>
                            <p className="text-sm text-[var(--text-muted)]">
                                Last updated: {new Date().toLocaleDateString()}
                            </p>
                        </div>
                    </Card>
                </FadeIn>
            </div>
        </div>
    );
}

