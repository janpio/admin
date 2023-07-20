import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse, NextRequest } from "next/server";


export async function GET(req: Request, { params }: { params: { outfitId: string } }) {
    const { outfitId } = params;

    try {
        const comments = await prisma.comment.findMany({
            where: {
                outfitId: outfitId
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return NextResponse.json(comments);
    } catch (error) {
        console.log("Error getting comments: ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function POST(req: NextRequest, { params }: { params: { outfitId: string } }) {
    const { outfitId } = params;
    const body = await req.json();

    if(!outfitId) {
        return new NextResponse("Outfit ID is required", { status: 400 });
    }

    if(!body.userId) {
        return new NextResponse("User ID is required", { status: 400 });
    }

    try {
        const createComment = await prisma.comment.create({
            data: {
                ...body,
                outfitId: outfitId,
            }
        });

        return NextResponse.json(createComment);
    } catch (error) {
        console.log("Error creating comment: ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}