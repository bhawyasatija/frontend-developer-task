import { FadeIn } from '../components/animations/FadeIn';
import Card from '../components/ui/Card';

export default function Privacy() {
    return (
        <div className="min-h-screen pb-20">
            <div className="container mx-auto px-4 py-10 max-w-3xl">
                <FadeIn>
                    <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
                    <Card padding="lg">
                        <div className="space-y-4 text-[var(--text-secondary)]">
                            <p>
                                This is a demo privacy policy page for TaskFlow. Replace this content with your real
                                privacy policy before production use.
                            </p>
                            <p>
                                We store authentication tokens in your browser and send them to our API to access your
                                account and tasks.
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

