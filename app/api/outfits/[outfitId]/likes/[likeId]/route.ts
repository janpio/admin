import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

//remove like from outfit
export async function DELETE(
    req: Request,
    { params }: { params: { outfitId: string, likeId: string } }
) {
    const { outfitId, likeId } = params;

    try {
        const removeLike = await prisma.like.deleteMany({
            where: {
                id: likeId,
                outfitId: outfitId,
            }
        });

        return NextResponse.json(removeLike);
    } catch (error) {
        console.log("Error deleting like: ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
