import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: Request, { params }: { params: { outfitId: string } }) {
    const { outfitId } = params;
    const likes = await prisma.like.findMany({
        where: {
            outfitId: outfitId
        }
    });

    return NextResponse.json(likes);
}


export async function POST(req: NextRequest, { params }: { params: { outfitId: string } }) {
    const { outfitId } = params;
    const body = await req.json();

    if(!outfitId) return new NextResponse("Outfit ID is required", { status: 400 });
    if(!body.userId) return new NextResponse("User ID is required", { status: 400 });

    try {
        const createLike = await prisma.like.create({
            data: {
                ...body,
                outfitId: outfitId,
            }
        });

        return NextResponse.json(createLike);
    } catch (error) {
        console.log("Error creating like: ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}