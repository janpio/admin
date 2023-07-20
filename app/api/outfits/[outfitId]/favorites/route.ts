import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(req: Request, { params }: { params: { outfitId: string } }) {
    const { outfitId } = params;

    if(!outfitId) return new NextResponse("Outfit ID is required", { status: 400 });

    const favorites = await prisma.favorite.findMany({
        where: {
            outfitId: outfitId
        }
    });

    return NextResponse.json(favorites);
}


export async function POST(req: Request, { params }: { params: { outfitId: string } }) {
    const { outfitId } = params;
    const body = await req.json();

    if(!outfitId) return new NextResponse("Outfit ID is required", { status: 400 });
    if(!body.userId) return new NextResponse("User ID is required", { status: 400 });

    try {
        const createFavorite = await prisma.favorite.create({
            data: {
                ...body,
                outfitId: outfitId,
            }
        });

        return NextResponse.json(createFavorite);
    } catch (error) {
        console.log("Error creating favorite: ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}