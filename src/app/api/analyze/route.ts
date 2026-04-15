import { prisma } from "@/src/lib/db/prisma";
import { linkedInUrlSchema } from "@/src/lib/validators/url.validator";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validationResult = linkedInUrlSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json({
                error: 'Invalid LinkedIn profile URL',
                details: validationResult.error.format(),
            }, { status: 400 });
        }

        const { profileUrl } = validationResult.data;
        const analysisRequest = await prisma.analysisRequest.create({
            data: {
                profileUrl,
                status: 'pending',
            },
        })

        return NextResponse.json({
            success: true,
            requestId: analysisRequest.id,
            profileUrl: analysisRequest.profileUrl,
            status: analysisRequest.status,
            createdAt: analysisRequest.createdAt,
            message: 'Analysis request created successfully.',
        }, { status: 201 });

    } catch (error) {
        console.error('Error processing analysis request:', error);
        return NextResponse.json({
            error: 'An error occurred while processing the analysis request.',
            message: error instanceof Error ? error.message : 'Unknown error',
        }, { status: 500 });
    }
}