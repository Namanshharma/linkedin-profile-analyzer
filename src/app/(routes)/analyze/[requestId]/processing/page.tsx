"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export default function ProcessingPage() {
    const params = useParams();
    const requestId = params.requestId as string;
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate progress animation (will be replaced with real polling later)
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 95) {
                    clearInterval(interval);
                    return 95;
                }
                return prev + 5;
            });
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <main className="container mx-auto px-4 py-16 max-w-2xl">
            <Card>
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
                    </div>
                    <CardTitle className="text-2xl">Analyzing Your Profile</CardTitle>
                    <CardDescription>We&aposre extracting and analyzing your LinkedIn profile data </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center space-x-3"><Skeleton className="h-4 w-4 rounded-full" /><Skeleton className="h-4 w-32" /></div>
                        <div className="flex items-center space-x-3"><Skeleton className="h-4 w-4 rounded-full" /><Skeleton className="h-4 w-40" /></div>
                        <div className="flex items-center space-x-3"><Skeleton className="h-4 w-4 rounded-full" /><Skeleton className="h-4 w-36" /></div>
                    </div>

                    <p className="text-xs text-center text-muted-foreground">Request ID: {requestId}</p>
                </CardContent>
            </Card>
        </main>
    );
}