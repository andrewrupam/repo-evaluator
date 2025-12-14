"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ScoreCardProps {
    score: number;
    breakdown: {
        codeQuality: number;
        structure: number;
        documentation: number;
        testing: number;
        maintainability: number;
    };
}

export function ScoreCard({ score, breakdown }: ScoreCardProps) {
    const getScoreColor = (s: number) => {
        if (s >= 90) return "text-green-500";
        if (s >= 70) return "text-blue-500";
        if (s >= 50) return "text-yellow-500";
        return "text-red-500";
    };

    const getScoreRingColor = (s: number) => {
        if (s >= 90) return "stroke-green-500";
        if (s >= 70) return "stroke-blue-500";
        if (s >= 50) return "stroke-yellow-500";
        return "stroke-red-500";
    };

    return (
        <Card className="glass-card border-white/10 bg-black/40">
            <CardHeader>
                <CardTitle>Overall Score</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center gap-8">
                {/* Circular Progress */}
                <div className="relative h-40 w-40 flex-shrink-0">
                    <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                        <circle
                            className="stroke-gray-800"
                            strokeWidth="10"
                            fill="transparent"
                            r="40"
                            cx="50"
                            cy="50"
                        />
                        <motion.circle
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: score / 100 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className={cn(getScoreRingColor(score), "drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]")}
                            strokeWidth="10"
                            strokeLinecap="round"
                            fill="transparent"
                            r="40"
                            cx="50"
                            cy="50"
                            style={{
                                strokeDasharray: "251.2",
                                strokeDashoffset: "0",
                            }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className={cn("text-4xl font-bold", getScoreColor(score))}>
                            {score}
                        </span>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">
                            / 100
                        </span>
                    </div>
                </div>

                {/* Breakdown */}
                <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(breakdown).map(([key, value]) => (
                        <div key={key} className="space-y-1">
                            <div className="flex justify-between text-sm">
                                <span className="capitalize text-muted-foreground">
                                    {key.replace(/([A-Z])/g, " $1").trim()}
                                </span>
                                <span className="font-medium">{value}%</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-gray-800 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${value}%` }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className={cn(
                                        "h-full rounded-full",
                                        value >= 70 ? "bg-blue-500" : value >= 50 ? "bg-yellow-500" : "bg-red-500"
                                    )}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
