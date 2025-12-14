import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";

interface SummarySectionProps {
    summary: string;
    strengths: string[];
    weaknesses: string[];
}

export function SummarySection({ summary, strengths, weaknesses }: SummarySectionProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card border-white/10 bg-black/40 md:col-span-2">
                <CardHeader>
                    <CardTitle>Executive Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg leading-relaxed text-gray-300">{summary}</p>
                </CardContent>
            </Card>

            <Card className="glass-card border-white/10 bg-black/40 border-l-4 border-l-green-500/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-400">
                        <CheckCircle2 className="h-5 w-5" />
                        Strengths
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {strengths.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-300">
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            <Card className="glass-card border-white/10 bg-black/40 border-l-4 border-l-red-500/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-400">
                        <XCircle className="h-5 w-5" />
                        Areas for Improvement
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {weaknesses.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-300">
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 flex-shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
