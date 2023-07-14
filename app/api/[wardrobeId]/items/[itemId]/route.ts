import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req: Request, {params}: {params: {itemId: string}}){
    try {
        if(!params.itemId) {
            return new NextResponse("Bad Request", { status: 400 });
        }

        const item = await prisma.item.findUnique({
            where: {
                id: params.itemId,
            },
            include: {
                category: true,
                images: true,
                outfits: true,
            }
        });

        return NextResponse.json(item);
    } catch (error) {
        console.log("Error getting item: ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}


export async function PATCH(req: Request, {params}: {params: {wardrobeId: string; itemId: string}}){
    try {
        const {userId} = auth();
        const body = await req.json();
        if(!params.wardrobeId || !params.itemId) return new NextResponse("Bad Request", { status: 400 });
        if(!userId) return new NextResponse("Unauthorized", { status: 401 });

        const wardrobeOwner = await prisma.wardrobe.findFirst({
            where: {
                id: params.wardrobeId,
                userId: userId as string,
            }
        });

        if(!wardrobeOwner) return new NextResponse("Unauthorized", { status: 401 });

        await prisma.item.update({
            where: {
                id: params.itemId,
            },
            data: {
                ...body,
                isFeatured: body.isFeatured,
                isArchived: body.isArchived,
                images: {
                    deleteMany: {},
                }
            }
        });

        const item = await prisma.item.update({
            where: {
                id: params.itemId,
            },
            data: {
                images: {
                    createMany: {
                        data: [
                            ...body.images.map((image: {url:string}) => image)
                        ]
                    }
                }
            }
        });

        return NextResponse.json(item);
    } catch (error) {
        console.log("Error updating item: ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}


export async function DELETE(
    req: Request,
    { params }: { params: { wardrobeId: string; itemId: string } }
) {
    const {userId} = auth();
    if(!params.wardrobeId || !params.itemId) return new NextResponse("Bad Request", { status: 400 });
    if(!userId) return new NextResponse("Unauthorized", { status: 401 });

    try {
        const wardrobeOwner = await prisma.wardrobe.findFirst({
            where: {
                id: params.wardrobeId,
                userId: userId as string,
            }
        });

        if(!wardrobeOwner) return new NextResponse("Unauthorized", { status: 401 });

        const item = await prisma.item.deleteMany({
            where: {
                id: params.itemId,
            }
        });

        return NextResponse.json(item);

    } catch (error) {
        console.log("Error deleting item: ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}