// src/app/(routes)/analyze/page.tsx - Simplified version
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Briefcase } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AnalyzePage() {
    const router = useRouter();
    const [profileUrl, setProfileUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function validateUrl(url: string): boolean {
        const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9\-_]+\/?$/;
        return linkedinRegex.test(url);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        if (!profileUrl) {
            setError("Please enter a LinkedIn profile URL");
            return;
        }
        if (!validateUrl(profileUrl)) {
            setError("Please enter a valid LinkedIn profile URL");
            return;
        }
        setIsLoading(true);

        try {
            const response = await fetch("/api/analyze", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ profileUrl }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to submit profile for analysis");
            }

            router.push(`/analyze/${data.requestId}/processing`);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className="container mx-auto px-4 py-16 max-w-2xl">
            <Card>
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-blue-100 rounded-full">
                            <Briefcase className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>
                    <CardTitle className="text-3xl">Analyze Your LinkedIn Profile</CardTitle>
                    <CardDescription className="text-lg">
                        Enter your public LinkedIn profile URL to get instant, actionable insights
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">LinkedIn Profile URL</label>
                            <Input
                                placeholder="https://linkedin.com/in/yourusername"
                                value={profileUrl}
                                onChange={(e) => setProfileUrl(e.target.value)}
                                disabled={isLoading}
                                className="font-mono text-sm"
                            />
                            <p className="text-sm text-muted-foreground">
                                Example: https://linkedin.com/in/yourusername/
                            </p>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                                <p className="text-sm text-red-600">{error}</p>
                            </div>
                        )}

                        <Button type="submit" disabled={isLoading} className="w-full">
                            {isLoading ? "Submitting..." : "Analyze Profile"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}