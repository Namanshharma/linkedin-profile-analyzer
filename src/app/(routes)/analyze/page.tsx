"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Linkedin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";

// Form validation schema
const formSchema = z.object({
    profileUrl: z
        .string()
        .url("Please enter a valid URL")
        .regex(
            /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9\-_]+\/?$/,
            "Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/username)"
        ),
});

type FormValues = z.infer<typeof formSchema>;

export default function AnalyzePage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { profileUrl: "", },
    });

    async function onSubmit(values: FormValues) {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({ profileUrl: values.profileUrl }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to submit profile for analysis");
            }

            // Redirect to processing page with request ID
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
                            <Linkedin className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>
                    <CardTitle className="text-3xl">Analyze Your LinkedIn Profile</CardTitle>
                    <CardDescription className="text-lg">
                        Enter your public LinkedIn profile URL to get instant, actionable insights
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="profileUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>LinkedIn Profile URL</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="https://linkedin.com/in/yourusername"
                                                {...field}
                                                disabled={isLoading}
                                                className="font-mono text-sm"
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Example: https://linkedin.com/in/namansharma812/
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {error && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                                    <p className="text-sm text-red-600">{error}</p>
                                </div>
                            )}

                            <Button type="submit" disabled={isLoading} className="w-full">
                                {isLoading ? (
                                    <>
                                        <span className="mr-2">Submitting...</span>
                                        <span className="animate-spin">⏳</span>
                                    </>
                                ) : (
                                    "Analyze Profile"
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </main>
    );
}