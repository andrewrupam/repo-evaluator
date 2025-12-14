import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
            <div className="relative">
                <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20 blur-xl" />
                <Loader2 className="h-16 w-16 animate-spin text-primary relative z-10" />
            </div>
            <h2 className="mt-8 text-2xl font-bold tracking-tight text-white">
                Analyzing Repository...
            </h2>
            <p className="mt-2 text-muted-foreground max-w-md animate-pulse">
                Our AI is reading your code, checking best practices, and generating a personalized roadmap. This may take up to 30 seconds.
            </p>
        </div>
    );
}
