import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { wardrobeId: string } }
) {
    try {
        if(!params.wardrobeId) return new NextResponse("Bad Request", { status: 400 });
        const categories = await prisma.category.findMany({
            where: {
                wardrobeId: params.wardrobeId,
            }
        });

        return NextResponse.json(categories);
    } catch (error) {
        console.log("Error getting wardrobe category: ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function POST(
    req: Request,
    { params }: { params: { wardrobeId: string } }
) {

    const { userId } = auth();
    const body = await req.json();
    if(!params.wardrobeId) return new NextResponse("Bad Request", { status: 400 });

    try {
        const wardrobeOwner = await prisma.wardrobe.findFirst({
            where: {
                id: params.wardrobeId,
                userId: userId as string,
            }
        })

        if(!wardrobeOwner) return new NextResponse("Unauthorized", { status: 401 });

        const category = await prisma.category.create({
            data: {
                ...body,
                wardrobeId: params.wardrobeId,
            }
        });

        return NextResponse.json(category);
    } catch (error) {
        console.log("Error creating wardrobe category: ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}