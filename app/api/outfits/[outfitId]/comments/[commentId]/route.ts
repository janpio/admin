import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse, NextRequest } from "next/server";


export async function PATCH(
    req: Request,
    { params }: { params: { outfitId: string, commentId: string } }
) {
    const { outfitId, commentId } = params;
    const body = await req.json();
    const {userId} = auth();

    if(!outfitId || !commentId) {
        return new NextResponse("Outfit ID is required", { status: 400 });
    }

    const comment = await prisma.comment.findUnique({
        where: {
            userId: userId as string,
            id: commentId,
        }
    });

    if(!comment) return new NextResponse("Comment not found", { status: 404 });

    try {
        const editComment = await prisma.comment.updateMany({
            where: {
                id: commentId,
                outfitId: outfitId,
            },
            data: {
                ...body,
            }
        });

        return NextResponse.json(editComment);
    } catch (error) {
        console.log("Error editing comment: ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }

}


export async function DELETE(
    req: Request,
    { params }: { params: { outfitId: string, commentId: string } }
) {
    const { outfitId, commentId } = params;

    if(!outfitId || !commentId) {
        return new NextResponse("Outfit ID is required", { status: 400 });
    }

    try {
        const deleteComment = await prisma.comment.deleteMany({
            where: {
                id: commentId,
            }
        });

        return NextResponse.json(deleteComment);
    } catch (error) {
        console.log("Error deleting comment: ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}