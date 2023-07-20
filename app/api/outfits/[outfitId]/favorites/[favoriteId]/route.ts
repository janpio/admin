import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    { params }: { params: { outfitId: string, favoriteId: string } }
){
    const { outfitId, favoriteId } = params;

    try {
        const removeFavorite = await prisma.favorite.deleteMany({
            where: {
                id: favoriteId,
                outfitId: outfitId,
            }
        });

        return NextResponse.json(removeFavorite);
    } catch (error) {
        console.log("Error deleting favorite: ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}