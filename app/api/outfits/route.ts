import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse, NextRequest } from "next/server";


export async function GET(req: NextRequest) {
    const outfits = await prisma.outfit.findMany({
        orderBy: {
            createdAt: "desc",
        }
    });

    return NextResponse.json(outfits);
}


export async function POST(req: Request) {
    //protect route
    const { userId } = auth();
    if(!userId) return new NextResponse("Unauthorized", {status: 401});

    const body = await req.json();

    try {
       const createOutfit = await prisma.outfit.create({
        data: {
            ...body,
            userId,
        }
       });

         return NextResponse.json(createOutfit);
    } catch (error) {
        console.log("CREATE OUTFIT ERROR: ", error);
    }
}