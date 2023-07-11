import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function GET(
    req: Request,
  { params }: { params: { categoryId: string } }
){
    try {
        if(!params.categoryId) return new NextResponse("Bad Request", { status: 400 });
        const category = await prisma.category.findUnique({
            where: {
                id: params.categoryId,
            }
        });

        return NextResponse.json(category);
    } catch (error) {
        console.log("Error getting category: ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
  { params }: { params: { wardrobeId: string; categoryId: string} }
){
    const {userId} = auth();
    const body = await req.json();

    try {
        if(!userId) return new NextResponse("Unauthorized", { status: 401 });
        if(!params.categoryId || !params.wardrobeId) return new NextResponse("Bad Request", { status: 400 });

        const wardrobeOwner = await prisma.wardrobe.findFirst({
            where: {
                id: params.wardrobeId,
                userId: userId as string,
            }
        });

        if(!wardrobeOwner) return new NextResponse("Unauthorized", { status: 401 });

        const category = await prisma.category.updateMany({
            where: { 
               id: params.categoryId,
            }, 
            data: {
                ...body,
            }
        })

        return NextResponse.json(category);
    } catch (error) {
        console.log("Error updating category: ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { wardrobeId: string; categoryId: string}}
){
    const {userId} = auth();
    if(!userId) return new NextResponse("Unauthorized", { status: 401 });
    if(!params.categoryId || !params.wardrobeId) return new NextResponse("Bad Request", { status: 400 });

    try {
        const wardrobeOwner = await prisma.wardrobe.findFirst({
            where: {
                id: params.wardrobeId,
                userId: userId as string,
            }
        });

        if(!wardrobeOwner) return new NextResponse("Unauthorized", { status: 401 });

        const category = await prisma.category.deleteMany({
            where: {
                id: params.categoryId,
            }
        });

        return NextResponse.json(category);
    } catch (error) {
        console.log("Error deleting category: ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}