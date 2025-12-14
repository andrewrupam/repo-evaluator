import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RoadmapStep } from "@/lib/types";
import { ArrowDown } from "lucide-react";

interface RoadmapSectionProps {
    roadmap: RoadmapStep[];
}

export function RoadmapSection({ roadmap }: RoadmapSectionProps) {
    const getPriorityColor = (p: string) => {
        switch (p.toLowerCase()) {
            case "high":
                return "destructive";
            case "medium":
                return "warning";
            case "low":
                return "secondary";
            default:
                return "default";
        }
    };

    return (
        <Card className="glass-card border-white/10 bg-black/40">
            <CardHeader>
                <CardTitle>Improvement Roadmap</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative space-y-8 pl-8 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-20px)] before:w-[2px] before:bg-gray-800">
                    {roadmap.map((step, index) => (
                        <div key={index} className="relative">
                            <div className="absolute -left-[29px] top-1 flex h-6 w-6 items-center justify-center rounded-full border border-gray-800 bg-background text-xs font-bold text-muted-foreground">
                                {index + 1}
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <h3 className="font-semibold text-lg text-white">{step.title}</h3>
                                    <Badge variant={getPriorityColor(step.priority) as any}>
                                        {step.priority} Priority
                                    </Badge>
                                </div>
                                <p className="text-muted-foreground">{step.description}</p>
                            </div>
                            {index < roadmap.length - 1 && (
                                <div className="absolute -left-[20px] -bottom-6 text-gray-800">
                                    <ArrowDown className="h-4 w-4" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
