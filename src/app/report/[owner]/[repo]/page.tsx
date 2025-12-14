import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScoreCard } from "@/components/report/ScoreCard";
import { SummarySection } from "@/components/report/SummarySection";
import { RoadmapSection } from "@/components/report/RoadmapSection";
import { ParallaxBackground } from "@/components/landing/ParallaxBackground";
import { fetchRepoData } from "@/lib/github";
import { analyzeRepo } from "@/lib/gemini";
import { getMockAnalysis } from "@/lib/mock";
import Loading from "./loading";

interface PageProps {
    params: Promise<{
        owner: string;
        repo: string;
    }>;
}

export default async function ReportPage({ params }: PageProps) {
    const { owner, repo } = await params;

    // Fetch data
    const repoData = await fetchRepoData(owner, repo);

    if (!repoData) {
        notFound();
    }

    // Analyze
    let analysis = await analyzeRepo(repoData);

    // Fallback to mock data if analysis fails or API key is missing (for demo)
    if (!analysis) {
        console.warn("Analysis failed or API key missing, using mock data");
        analysis = getMockAnalysis();
    }

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
            <ParallaxBackground />

            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <Link href="/">
                        <Button variant="ghost" size="sm" className="gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Home
                        </Button>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href={repoData.url} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm" className="gap-2 bg-white/5 border-white/10 hover:bg-white/10">
                                <Github className="h-4 w-4" />
                                View on GitHub
                                <ExternalLink className="h-3 w-3 opacity-50" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 space-y-8">
                {/* Repo Header */}
                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                                {repoData.owner}/{repoData.name}
                            </h1>
                            <p className="text-muted-foreground mt-2 max-w-2xl">
                                {repoData.description || "No description provided."}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {repoData.language && (
                                <Badge variant="secondary" className="text-sm">
                                    {repoData.language}
                                </Badge>
                            )}
                            <Badge variant="outline" className="text-sm border-white/10">
                                {repoData.stars} Stars
                            </Badge>
                            <Badge variant="outline" className="text-sm border-white/10">
                                {repoData.forks} Forks
                            </Badge>
                        </div>
                    </div>
                </div>

                {/* Analysis Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Score & Roadmap */}
                    <div className="space-y-8 lg:col-span-1">
                        <ScoreCard score={analysis.score} breakdown={analysis.breakdown} />
                        <RoadmapSection roadmap={analysis.roadmap} />
                    </div>

                    {/* Right Column: Summary & Details */}
                    <div className="space-y-8 lg:col-span-2">
                        <SummarySection
                            summary={analysis.summary}
                            strengths={analysis.strengths}
                            weaknesses={analysis.weaknesses}
                        />

                        {/* Additional Stats Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="glass-card p-4 rounded-lg text-center">
                                <div className="text-2xl font-bold text-white">{repoData.openIssues}</div>
                                <div className="text-xs text-muted-foreground uppercase">Open Issues</div>
                            </div>
                            <div className="glass-card p-4 rounded-lg text-center">
                                <div className="text-2xl font-bold text-white">{repoData.commitFrequency}</div>
                                <div className="text-xs text-muted-foreground uppercase">Commits (30d)</div>
                            </div>
                            <div className="glass-card p-4 rounded-lg text-center">
                                <div className="text-2xl font-bold text-white">{(repoData.diskUsage / 1024).toFixed(1)}MB</div>
                                <div className="text-xs text-muted-foreground uppercase">Size</div>
                            </div>
                            <div className="glass-card p-4 rounded-lg text-center">
                                <div className="text-2xl font-bold text-white">{new Date(repoData.createdAt).getFullYear()}</div>
                                <div className="text-xs text-muted-foreground uppercase">Created</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
